#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// Blog translation via Aliyun Machine Translation API
// ─────────────────────────────────────────────────────────────────────────
//
// What it does:
//   Reads data/blog.js (English source-of-truth), translates every text
//   field (title, excerpt, category, readTime, body blocks) into each of
//   the 7 non-EN locales, and writes data/blog/translations/{locale}.js.
//
// How to run:
//   1. Put credentials in .env.local at repo root:
//        ALI_ACCESS_KEY_ID=...
//        ALI_ACCESS_KEY_SECRET=...
//   2. Install the Aliyun SDK (one-time):
//        npm install --save-dev @alicloud/alimt20181012 @alicloud/openapi-client @alicloud/tea-util
//   3. Run:
//        node scripts/translate-blog-aliyun.mjs
//      Or to limit to a single locale:
//        node scripts/translate-blog-aliyun.mjs --locale it
//      Or to limit to a single post (useful for testing):
//        node scripts/translate-blog-aliyun.mjs --locale it --post six-step-manufacturing-process
//      Or to retranslate everything (default skips already-translated):
//        node scripts/translate-blog-aliyun.mjs --force
//
// Progressive writes:
//   The output file is rewritten after EACH post completes, so if the
//   script crashes mid-way you don't lose progress. Re-running picks up
//   from where it left off.
//
// Cost estimate (Aliyun general MT, ~$0.05 per 1,000 characters):
//   10 posts × ~30,000 chars per post × 7 locales = ~2.1M chars ≈ $105 USD.
//   Pricing as of 2026-05; verify in Aliyun console before running.
//
// Rate limiting:
//   Aliyun MT defaults to 50 QPS for personal accounts. We sleep 50ms
//   between calls (= 20 req/s) to stay well under that.
//
// ─────────────────────────────────────────────────────────────────────────

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// ── Tiny .env.local loader (no external dep) ─────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const ENV_FILE = path.join(REPO_ROOT, '.env.local');

if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
    if (!m) continue;
    const [, k, v] = m;
    // Strip surrounding quotes if present
    const stripped = v.replace(/^["']|["']$/g, '');
    if (!process.env[k]) process.env[k] = stripped;
  }
}

const AK_ID = process.env.ALI_ACCESS_KEY_ID;
const AK_SECRET = process.env.ALI_ACCESS_KEY_SECRET;

if (!AK_ID || !AK_SECRET) {
  console.error('✗ Missing ALI_ACCESS_KEY_ID / ALI_ACCESS_KEY_SECRET');
  console.error('  Put them in .env.local at the repo root.');
  process.exit(1);
}

// ── Parse CLI args ───────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const ONLY_LOCALE = argv.includes('--locale')
  ? argv[argv.indexOf('--locale') + 1]
  : null;
const ONLY_POST = argv.includes('--post')
  ? argv[argv.indexOf('--post') + 1]
  : null;
const FORCE = argv.includes('--force');

// ── Aliyun SDK (lazy-imported so the script can show its help text even
//    before the SDK is installed) ──────────────────────────────────────
// The CJS interop is tricky: Aliyun SDKs are published as CJS, so when
// Node ESM imports them, the entire `module.exports` ends up wrapped
// under `.default`. That object contains BOTH:
//   - `default`: the actual client class (Alimt)
//   - `TranslateGeneralRequest`: the request type
// We resolve in two steps below.
let alimtClient;
let AlimtNs; // namespace { default: Alimt, TranslateGeneralRequest: ... }
async function getClient() {
  if (alimtClient) return alimtClient;
  const mod = await import('@alicloud/alimt20181012');
  // CJS-via-ESM gives us { default: <module.exports> }. Inside there is
  // { default: AlimtClass, TranslateGeneralRequest, ... }.
  AlimtNs = mod.default || mod;
  const Alimt = AlimtNs.default || AlimtNs;
  const openapi = await import('@alicloud/openapi-client');
  const Config = (openapi.default && openapi.default.Config) || openapi.Config;
  const cfg = new Config({
    accessKeyId: AK_ID,
    accessKeySecret: AK_SECRET,
    endpoint: 'mt.cn-hangzhou.aliyuncs.com',
  });
  alimtClient = new Alimt(cfg);
  return alimtClient;
}

// Aliyun BCP-47 language codes — most match Next.js locale strings,
// but a few diverge (ja → ja, ko → ko are fine; ZH variants differ).
const ALIYUN_LANG = {
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  ja: 'ja',
  ko: 'ko',
};

const NON_EN_LOCALES = Object.keys(ALIYUN_LANG);

// ── Translate one string (with retry on rate-limit) ─────────────────────
async function translate(text, targetLocale) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  const client = await getClient();
  // TranslateGeneralRequest lives on the namespace alongside `default`
  const TranslateGeneralRequest = AlimtNs.TranslateGeneralRequest;
  const req = new TranslateGeneralRequest({
    formatType: 'text',
    sourceLanguage: 'en',
    targetLanguage: ALIYUN_LANG[targetLocale],
    sourceText: text,
    scene: 'general',
  });

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const resp = await client.translateGeneral(req);
      const translated = resp?.body?.data?.translated;
      if (!translated) {
        throw new Error('No translation in response: ' + JSON.stringify(resp?.body));
      }
      return translated;
    } catch (err) {
      const msg = err?.message || String(err);
      // Throttling or transient — back off and retry
      if (/throttl|qps|too many requests|timeout/i.test(msg) && attempt < MAX_RETRIES) {
        await sleep(500 * attempt);
        continue;
      }
      // Final attempt: rethrow
      if (attempt === MAX_RETRIES) throw err;
    }
  }
}

// ── Rate-limit helper ──────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TRANSLATION_DELAY_MS = 50; // ~20 QPS, well under Aliyun's 50 QPS limit

// ── Translate a body block (recurses into items, headers, rows, stats) ─
async function translateBlock(block, locale) {
  const out = { type: block.type };
  // Preserve non-text fields verbatim
  if (block.src) out.src = block.src;
  if (block.num != null) out.num = block.num;
  if (block.suffix) out.suffix = block.suffix; // " days", "%" etc — usually translation-neutral

  // Translate the text-bearing fields
  if (block.text) {
    out.text = await translate(block.text, locale);
    await sleep(TRANSLATION_DELAY_MS);
  }
  if (block.caption) {
    out.caption = await translate(block.caption, locale);
    await sleep(TRANSLATION_DELAY_MS);
  }
  if (block.label) {
    out.label = await translate(block.label, locale);
    await sleep(TRANSLATION_DELAY_MS);
  }
  if (Array.isArray(block.items)) {
    out.items = [];
    for (const item of block.items) {
      if (typeof item === 'string') {
        out.items.push(await translate(item, locale));
        await sleep(TRANSLATION_DELAY_MS);
      } else {
        // stats items: { num, suffix?, label }
        const t = { ...item };
        if (item.label) {
          t.label = await translate(item.label, locale);
          await sleep(TRANSLATION_DELAY_MS);
        }
        out.items.push(t);
      }
    }
  }
  if (Array.isArray(block.headers)) {
    out.headers = [];
    for (const h of block.headers) {
      out.headers.push(await translate(h, locale));
      await sleep(TRANSLATION_DELAY_MS);
    }
  }
  if (Array.isArray(block.rows)) {
    out.rows = [];
    for (const row of block.rows) {
      const trow = [];
      for (const cell of row) {
        trow.push(await translate(cell, locale));
        await sleep(TRANSLATION_DELAY_MS);
      }
      out.rows.push(trow);
    }
  }
  return out;
}

// ── Translate one post → an overlay object ─────────────────────────────
async function translatePost(post, locale) {
  const out = {};
  out.title    = await translate(post.title,    locale); await sleep(TRANSLATION_DELAY_MS);
  out.excerpt  = await translate(post.excerpt,  locale); await sleep(TRANSLATION_DELAY_MS);
  out.category = await translate(post.category, locale); await sleep(TRANSLATION_DELAY_MS);
  out.readTime = await translate(post.readTime, locale); await sleep(TRANSLATION_DELAY_MS);

  out.body = [];
  for (let i = 0; i < post.body.length; i++) {
    process.stdout.write(`\r    block ${i + 1}/${post.body.length}`);
    out.body.push(await translateBlock(post.body[i], locale));
  }
  process.stdout.write('\n');
  return out;
}

// ── Load existing overlay (so we can resume from partial state) ────────
async function loadExistingOverlay(locale) {
  const file = path.join(REPO_ROOT, 'data', 'blog', 'translations', `${locale}.js`);
  try {
    const mod = await import(pathToFileURL(file).href + '?t=' + Date.now());
    return mod.default || { posts: {}, categories: {} };
  } catch {
    return { posts: {}, categories: {} };
  }
}

// ── Write the overlay file (called progressively, after each post) ─────
function writeOverlay(locale, data) {
  const file = path.join(REPO_ROOT, 'data', 'blog', 'translations', `${locale}.js`);
  const header = `// ${LOCALE_NAMES[locale]} blog translations. Generated by scripts/translate-blog-aliyun.mjs.
// To regenerate, run: node scripts/translate-blog-aliyun.mjs --locale ${locale}

`;
  const body = `export default ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(file, header + body, 'utf8');
}

const LOCALE_NAMES = {
  es: 'Spanish', fr: 'French', de: 'German', it: 'Italian',
  pt: 'Portuguese', ja: 'Japanese', ko: 'Korean',
};

// ── Main ───────────────────────────────────────────────────────────────
async function main() {
  // Read POSTS by dynamic-importing data/blog.js
  const blogModule = await import(pathToFileURL(path.join(REPO_ROOT, 'data', 'blog.js')).href);
  const POSTS = blogModule.POSTS;
  const CATEGORIES = blogModule.CATEGORIES || [];

  const targetLocales = ONLY_LOCALE ? [ONLY_LOCALE] : NON_EN_LOCALES;
  const targetPosts = ONLY_POST ? POSTS.filter((p) => p.slug === ONLY_POST) : POSTS;

  if (ONLY_POST && targetPosts.length === 0) {
    console.error(`✗ No post found with slug "${ONLY_POST}"`);
    process.exit(1);
  }

  console.log(`Aliyun MT blog translator`);
  console.log(`  locales: ${targetLocales.join(', ')}`);
  console.log(`  posts:   ${targetPosts.length}/${POSTS.length}`);
  console.log(`  force:   ${FORCE}`);
  console.log('');

  for (const locale of targetLocales) {
    if (!ALIYUN_LANG[locale]) {
      console.warn(`! Unknown locale "${locale}" — skipping`);
      continue;
    }
    console.log(`──────────── ${LOCALE_NAMES[locale]} (${locale}) ────────────`);

    const overlay = await loadExistingOverlay(locale);
    if (!overlay.posts) overlay.posts = {};
    if (!overlay.categories) overlay.categories = {};

    // Translate category names (Process, Materials, etc.)
    const uniqueCats = [...new Set(POSTS.map((p) => p.category))]
      .filter((c) => c && c !== 'All');
    for (const cat of uniqueCats) {
      if (!FORCE && overlay.categories[cat]) continue;
      overlay.categories[cat] = await translate(cat, locale);
      await sleep(TRANSLATION_DELAY_MS);
    }
    writeOverlay(locale, overlay);

    // Translate each post (progressively saving after each)
    for (let i = 0; i < targetPosts.length; i++) {
      const post = targetPosts[i];
      console.log(`  [${i + 1}/${targetPosts.length}] ${post.slug}`);
      if (!FORCE && overlay.posts[post.slug]?.body?.length === post.body.length) {
        console.log('    (already translated, skipping — use --force to redo)');
        continue;
      }
      const t0 = Date.now();
      overlay.posts[post.slug] = await translatePost(post, locale);
      writeOverlay(locale, overlay); // progressive save
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`    ✓ ${dt}s`);
    }

    console.log('');
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('FATAL', err?.stack || err);
  process.exit(1);
});
