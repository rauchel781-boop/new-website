// Overwrites existing seoTitle / seoDescription values in a locale's category
// translation file. Companion to merge-category-seo.mjs, which only inserts.
// Used to tighten descriptions that ran past the length Google renders.
//
// Usage: node scripts/update-category-seo.mjs <locale>
//   reads tmp-i18n/cat-<locale>-fix.json  { "<slug>": { seoDescription?, seoTitle? } }

import { readFileSync, writeFileSync } from 'node:fs';

const locale = process.argv[2];
if (!locale) { console.error('usage: node scripts/update-category-seo.mjs <locale>'); process.exit(1); }

const target = `data/categories/translations/${locale}.js`;
let src = readFileSync(target, 'utf8');
const data = JSON.parse(readFileSync(`tmp-i18n/cat-${locale}-fix.json`, 'utf8'));

const lit = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

let n = 0, miss = [];
for (const [slug, v] of Object.entries(data)) {
  const anchor = `  '${slug}': {\n`;
  const at = src.indexOf(anchor);
  if (at === -1) { miss.push(`${slug}: block not found`); continue; }
  const end = src.indexOf('\n  },', at);
  let block = src.slice(at, end);
  let touched = false;
  for (const field of ['seoTitle', 'seoDescription']) {
    if (!v[field]) continue;
    const re = new RegExp(`(    ${field}: )'(?:[^'\\\\]|\\\\.)*',`);
    if (!re.test(block)) { miss.push(`${slug}.${field}: not present`); continue; }
    block = block.replace(re, `$1${lit(v[field])},`);
    touched = true;
  }
  if (touched) { src = src.slice(0, at) + block + src.slice(end); n++; }
}
writeFileSync(target, src);
console.log(`${locale}: ${n} categories updated`);
for (const m of miss) console.log(`  ${m}`);
