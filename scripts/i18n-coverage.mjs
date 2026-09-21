// Which blog posts are actually localised, and where does a locale fall back
// to English? The overlay is a plain spread, so a post missing from a locale
// file silently renders the English body under translated navigation — which
// is exactly what the audit found and what nobody notices from the outside.
import { POSTS } from '../data/blog.js';

const LOCALES = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'ko'];
const maps = {};
for (const l of LOCALES) maps[l] = (await import(`../data/blog/translations/${l}.js`)).default.posts || {};

const FIELDS = ['title', 'excerpt', 'body', 'faqs'];
const rows = [];
for (const p of POSTS) {
  const row = { slug: p.slug, blocks: p.body?.length ?? 0 };
  for (const l of LOCALES) {
    const t = maps[l][p.slug];
    if (!t) { row[l] = '--'; continue; }
    row[l] = FIELDS.map((f) => (t[f] ? f[0].toUpperCase() : '.')).join('');
  }
  rows.push(row);
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('slug', 52), pad('blk', 4), LOCALES.map((l) => pad(l, 5)).join(''));
console.log('-'.repeat(52 + 4 + LOCALES.length * 5 + 1));
for (const r of rows) {
  console.log(pad(r.slug, 52), pad(r.blocks, 4), LOCALES.map((l) => pad(r[l], 5)).join(''));
}
console.log('\nkey: T=title E=excerpt B=body F=faqs  "." = missing  "--" = no overlay at all');

const missingBody = [];
for (const p of POSTS) for (const l of LOCALES) {
  const t = maps[l][p.slug];
  if (!t || !t.body) missingBody.push(`${p.slug} [${l}]`);
}
console.log(`\nposts x locales with NO translated body: ${missingBody.length} of ${POSTS.length * LOCALES.length}`);
const bySlug = {};
for (const m of missingBody) { const s = m.split(' ')[0]; bySlug[s] = (bySlug[s] || 0) + 1; }
for (const [s, n] of Object.entries(bySlug)) console.log(`  ${pad(s, 52)} missing in ${n}/7`);
