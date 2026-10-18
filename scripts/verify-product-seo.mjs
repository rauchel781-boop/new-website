// Before rebuilding: node scripts/verify-product-seo.mjs --capture
// After rebuilding: node scripts/verify-product-seo.mjs [--live]
// Verify edited search snippets against rendered HTML and the prior build.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { PRODUCT_SEO_DESCRIPTIONS } from '../data/product-seo.js';
import { isNonBoxProduct } from '../data/non-box-products.js';

const locales = ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'ko'];
const out = 'audits/seo-2026-10-18';
const root = '.next/server/app';
const decode = s => (s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
function parse(html) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => Object.fromEntries([...m[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(x => [x[1], decode(x[2])])));
  const meta = name => tags.find(t => t.name === name || t.property === name)?.content;
  return {
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]),
    description: meta('description'),
    ogDescription: meta('og:description'),
    twitterDescription: meta('twitter:description'),
    canonical: decode(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]),
    robots: meta('robots'),
    googlebot: meta('googlebot'),
  };
}
const catalog = new Map();
for (const file of fs.readdirSync('data/products').filter(f => f.endsWith('.js'))) {
  const { PRODUCTS } = await import(pathToFileURL(path.resolve('data/products', file)).href);
  for (const [slug, product] of Object.entries(PRODUCTS)) catalog.set(`${file.slice(0, -3)}/${slug}`, product);
}
const edited = PRODUCT_SEO_DESCRIPTIONS.en;
const seen = new Set();
for (const [route, description] of Object.entries(edited)) {
  assert.ok(catalog.has(route), `Unknown product: ${route}`);
  assert.ok(!isNonBoxProduct(catalog.get(route).slug), `Excluded product: ${route}`);
  assert.ok(description.length >= 150 && description.length <= 160, `${route}: ${description.length} characters`);
  assert.match(description, /Request a|request a/, `${route}: inquiry CTA`);
  assert.ok(!seen.has(description), `Duplicate edited description: ${route}`);
  seen.add(description);
}
const snapshot = {};
for (const locale of locales) for (const route of catalog.keys()) {
  const pathname = `${locale}/products/${route}`;
  snapshot[pathname] = parse(fs.readFileSync(path.join(root, pathname + '.html'), 'utf8'));
}
fs.mkdirSync(out, { recursive: true });
if (process.argv.includes('--capture')) {
  fs.writeFileSync(`${out}/product-seo-before.json`, JSON.stringify(snapshot, null, 2));
  console.log(`Captured ${Object.keys(snapshot).length} product metadata baselines.`);
} else {
  const before = JSON.parse(fs.readFileSync(`${out}/product-seo-before.json`, 'utf8'));
  let changed = 0, unchanged = 0;
  const englishDescriptions = new Map();
  for (const [pathname, rendered] of Object.entries(snapshot)) {
    const [locale, , ...parts] = pathname.split('/');
    const route = parts.join('/');
    const prior = before[pathname];
    assert.ok(prior, `Missing baseline: ${pathname}`);
    const wanted = locale === 'en' ? edited[route] : undefined;
    if (wanted) {
      assert.notEqual(prior.description, wanted, `${pathname}: description must be changed`);
      for (const key of ['description', 'ogDescription', 'twitterDescription']) assert.equal(rendered[key], wanted, `${pathname}: ${key}`);
      for (const key of ['title', 'canonical', 'robots', 'googlebot']) assert.equal(rendered[key], prior[key], `${pathname}: preserve ${key}`);
      changed++;
    } else {
      assert.deepEqual(rendered, prior, `${pathname}: preserve localized or untouched product metadata`);
      unchanged++;
    }
    if (locale === 'en' && !isNonBoxProduct(catalog.get(route).slug)) {
      assert.ok(rendered.description, `${pathname}: description present`);
      assert.ok(!englishDescriptions.has(rendered.description), `${pathname}: duplicate with ${englishDescriptions.get(rendered.description)}`);
      englishDescriptions.set(rendered.description, pathname);
    }
  }
  assert.equal(changed, Object.keys(edited).length);
  const result = { checkedAt: new Date().toISOString(), changedEnglishProducts: changed, preservedProductPages: unchanged, totalProductPages: Object.keys(snapshot).length, uniqueIndexableEnglishDescriptions: englishDescriptions.size, edits: Object.entries(edited).map(([route, description]) => ({ route: `/en/products/${route}`, characters: description.length, description })) };
  fs.writeFileSync(`${out}/product-seo-checks.json`, JSON.stringify(result, null, 2));
  console.log(`PASS: ${changed} new product descriptions; ${unchanged} product pages preserved; ${englishDescriptions.size} unique indexable English descriptions.`);
  if (process.argv.includes('--live')) {
    const routes = locales.flatMap(locale => Object.keys(edited).map(route => `${locale}/products/${route}`));
    const pages = [];
    let cursor = 0;
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (cursor < routes.length) {
        const index = cursor++;
        const pathname = routes[index];
        const url = `https://www.custom-woodenbox.com/${pathname}`;
        try {
          const response = await fetch(url, { headers: { 'cache-control': 'no-cache', pragma: 'no-cache' }, signal: AbortSignal.timeout(25000) });
          const actual = parse(await response.text());
          pages[index] = { url, status: response.status, matches: response.status === 200 && JSON.stringify(actual) === JSON.stringify(snapshot[pathname]), actual };
        } catch (error) { pages[index] = { url, matches: false, error: error.message }; }
      }
    }));
    const live = { checkedAt: new Date().toISOString(), checkedAtShanghai: new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', dateStyle: 'short', timeStyle: 'medium' }).format(new Date()), checked: pages.length, matched: pages.filter(p => p.matches).length, passed: pages.every(p => p.matches), pages };
    fs.writeFileSync(`${out}/product-seo-live-checks.json`, JSON.stringify(live, null, 2));
    console.log(JSON.stringify({ ...live, pages: undefined, failures: pages.filter(p => !p.matches).map(({ actual, ...p }) => p) }, null, 2));
    if (!live.passed) process.exitCode = 1;
  }
}
