#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// Category FAQ translation via Aliyun Machine Translation API
// ─────────────────────────────────────────────────────────────────────────
//
// Reads data/category-faqs/en.js (English source-of-truth — 17 categories
// × 5 Q&A each), translates every text field (sectionTitle, sectionSub,
// q, a) into each of the 7 non-EN locales, and writes the overlay file
// data/category-faqs/{locale}.js.
//
// Run:
//   node scripts/translate-category-faqs-aliyun.mjs
//   node scripts/translate-category-faqs-aliyun.mjs --locale it
//   node scripts/translate-category-faqs-aliyun.mjs --locale it --category watch-jewelry
//   node scripts/translate-category-faqs-aliyun.mjs --force
//
// Progressive saves after each category. Skips already-translated by
// default; pass --force to retranslate.
//
// Cost estimate:
//   17 categories × ~600 chars average × 7 locales ≈ 71K chars ≈ $4 USD
//   (Aliyun general MT, ~$0.05 per 1,000 chars).
// ─────────────────────────────────────────────────────────────────────────

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const ENV_FILE = path.join(REPO_ROOT, '.env.local');

if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
    if (!m) continue;
    const [, k, v] = m;
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

const argv = process.argv.slice(2);
const ONLY_LOCALE = argv.includes('--locale')
  ? argv[argv.indexOf('--locale') + 1]
  : null;
const ONLY_CATEGORY = argv.includes('--category')
  ? argv[argv.indexOf('--category') + 1]
  : null;
const FORCE = argv.includes('--force');

// ── Aliyun SDK (same CJS-via-ESM dance as the blog script) ──────────────
let alimtClient;
let AlimtNs;
async function getClient() {
  if (alimtClient) return alimtClient;
  const mod = await import('@alicloud/alimt20181012');
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

const ALIYUN_LANG = {
  es: 'es', fr: 'fr', de: 'de', it: 'it',
  pt: 'pt', ja: 'ja', ko: 'ko',
};
const NON_EN_LOCALES = Object.keys(ALIYUN_LANG);

const LOCALE_NAMES = {
  es: 'Spanish', fr: 'French', de: 'German', it: 'Italian',
  pt: 'Portuguese', ja: 'Japanese', ko: 'Korean',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TRANSLATION_DELAY_MS = 50; // ~20 QPS

async function translate(text, targetLocale) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  const client = await getClient();
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
      if (/throttl|qps|too many requests|timeout/i.test(msg) && attempt < MAX_RETRIES) {
        await sleep(500 * attempt);
        continue;
      }
      if (attempt === MAX_RETRIES) throw err;
    }
  }
}

// ── Translate one category's FAQ block ─────────────────────────────────
async function translateFaq(faq, locale) {
  const out = { items: [] };
  out.sectionTitle = await translate(faq.sectionTitle, locale);
  await sleep(TRANSLATION_DELAY_MS);
  out.sectionSub = await translate(faq.sectionSub, locale);
  await sleep(TRANSLATION_DELAY_MS);
  for (let i = 0; i < faq.items.length; i++) {
    process.stdout.write(`\r    Q ${i + 1}/${faq.items.length}`);
    const it = faq.items[i];
    const tQ = await translate(it.q, locale);
    await sleep(TRANSLATION_DELAY_MS);
    const tA = await translate(it.a, locale);
    await sleep(TRANSLATION_DELAY_MS);
    out.items.push({ q: tQ, a: tA });
  }
  process.stdout.write('\n');
  return out;
}

// ── Load existing overlay (resume from partial state) ──────────────────
async function loadExistingOverlay(locale) {
  const file = path.join(REPO_ROOT, 'data', 'category-faqs', `${locale}.js`);
  try {
    const mod = await import(pathToFileURL(file).href + '?t=' + Date.now());
    return mod.FAQS || {};
  } catch {
    return {};
  }
}

function writeOverlay(locale, data) {
  const file = path.join(REPO_ROOT, 'data', 'category-faqs', `${locale}.js`);
  const header = `// Category FAQs — ${LOCALE_NAMES[locale]} overlay.
// Generated by scripts/translate-category-faqs-aliyun.mjs.
// To regenerate: node scripts/translate-category-faqs-aliyun.mjs --locale ${locale}
// Categories missing here fall back to English copy via index.js.

`;
  const body = `export const FAQS = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(file, header + body, 'utf8');
}

async function main() {
  const en = await import(
    pathToFileURL(path.join(REPO_ROOT, 'data', 'category-faqs', 'en.js')).href
  );
  const EN_FAQS = en.FAQS;
  const categorySlugs = Object.keys(EN_FAQS);

  const targetLocales = ONLY_LOCALE ? [ONLY_LOCALE] : NON_EN_LOCALES;
  const targetCategories = ONLY_CATEGORY
    ? categorySlugs.filter((s) => s === ONLY_CATEGORY)
    : categorySlugs;

  if (ONLY_CATEGORY && targetCategories.length === 0) {
    console.error(`✗ No category found with slug "${ONLY_CATEGORY}"`);
    process.exit(1);
  }

  console.log(`Aliyun MT category-FAQ translator`);
  console.log(`  locales:    ${targetLocales.join(', ')}`);
  console.log(`  categories: ${targetCategories.length}/${categorySlugs.length}`);
  console.log(`  force:      ${FORCE}`);
  console.log('');

  for (const locale of targetLocales) {
    if (!ALIYUN_LANG[locale]) {
      console.warn(`! Unknown locale "${locale}" — skipping`);
      continue;
    }
    console.log(`──────────── ${LOCALE_NAMES[locale]} (${locale}) ────────────`);
    const overlay = await loadExistingOverlay(locale);

    for (let i = 0; i < targetCategories.length; i++) {
      const slug = targetCategories[i];
      console.log(`  [${i + 1}/${targetCategories.length}] ${slug}`);
      if (
        !FORCE &&
        overlay[slug]?.items?.length === EN_FAQS[slug].items.length
      ) {
        console.log('    (already translated, skipping — use --force to redo)');
        continue;
      }
      const t0 = Date.now();
      overlay[slug] = await translateFaq(EN_FAQS[slug], locale);
      writeOverlay(locale, overlay);
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
