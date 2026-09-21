// Adds localized seoTitle / seoDescription to data/categories/translations/<locale>.js.
//
// The category page already prefers ctMeta.seoTitle / ctMeta.seoDescription over
// the English source (app/[locale]/products/[slug]/page.js), so these keys are
// all that stand between 119 localized category URLs and an English SERP snippet.
// Body copy for these pages was already translated — only the two fields a buyer
// actually reads in search results were still falling back.
//
// Surgical text insert after each `'<slug>': {` line rather than re-serialising
// the module, so the diff shows only the added lines.
//
// Usage: node scripts/merge-category-seo.mjs <locale>
//   reads  tmp-i18n/cat-<locale>.json   { "<slug>": { seoTitle, seoDescription } }

import { readFileSync, writeFileSync } from 'node:fs';

const locale = process.argv[2];
if (!locale) { console.error('usage: node scripts/merge-category-seo.mjs <locale>'); process.exit(1); }

const target = `data/categories/translations/${locale}.js`;
let src = readFileSync(target, 'utf8');
const data = JSON.parse(readFileSync(`tmp-i18n/cat-${locale}.json`, 'utf8'));

// A JS single-quoted string literal: escape backslashes and quotes, and keep
// the source one line per field so the file stays greppable.
const lit = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

let added = 0, skipped = [];
for (const [slug, v] of Object.entries(data)) {
  if (!v.seoTitle || !v.seoDescription) { skipped.push(`${slug}: incomplete`); continue; }
  const anchor = `  '${slug}': {\n`;
  const at = src.indexOf(anchor);
  if (at === -1) { skipped.push(`${slug}: block not found`); continue; }
  const blockEnd = src.indexOf('\n  },', at);
  if (src.slice(at, blockEnd).includes('seoTitle:')) { skipped.push(`${slug}: already present`); continue; }
  const insert = `    seoTitle: ${lit(v.seoTitle)},\n    seoDescription: ${lit(v.seoDescription)},\n`;
  src = src.slice(0, at + anchor.length) + insert + src.slice(at + anchor.length);
  added++;
}
writeFileSync(target, src);
console.log(`${locale}: ${added} categories given seoTitle/seoDescription`);
for (const s of skipped) console.log(`  skipped ${s}`);
