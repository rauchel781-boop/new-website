// Splices one translated post into data/blog/translations/<locale>.js.
//
// Surgical text insert rather than re-serialising the whole module: these
// files are ~240 KB each and a full rewrite would produce a 1.7 MB diff of
// pure reformatting. Inserting right after `"posts": {` keeps the diff to
// the block actually being added.
//
// Usage: node merge-closure-i18n.mjs <locale>
//   reads  tmp-i18n/<locale>.json
//   writes data/blog/translations/<locale>.js

import { readFileSync, writeFileSync } from 'node:fs';

const SLUG = 'wooden-box-closure-types-compared';
const locale = process.argv[2];
if (!locale) { console.error('usage: node merge-closure-i18n.mjs <locale>'); process.exit(1); }

const target = `data/blog/translations/${locale}.js`;
const src = readFileSync(target, 'utf8');

if (src.includes(SLUG)) {
  console.error(`${locale}: already contains ${SLUG} - refusing to insert twice.`);
  process.exit(1);
}

const post = JSON.parse(readFileSync(`tmp-i18n/${locale}.json`, 'utf8'));

// Sanity: the shape must match the English source or the page will render
// a half-translated article without complaining.
if (!post.title || !post.excerpt || !Array.isArray(post.body)) {
  console.error(`${locale}: missing title/excerpt/body`); process.exit(1);
}
if (post.body.length !== 47) {
  console.error(`${locale}: expected 47 body blocks, got ${post.body.length}`); process.exit(1);
}
if (!post.faqs || !Array.isArray(post.faqs.items) || post.faqs.items.length !== 8) {
  console.error(`${locale}: expected 8 FAQ items`); process.exit(1);
}

const anchor = '"posts": {';
const at = src.indexOf(anchor);
if (at === -1) { console.error(`${locale}: could not find "posts": {`); process.exit(1); }

const body = JSON.stringify(post, null, 2)
  .split('\n')
  .map((line, i) => (i === 0 ? line : '    ' + line))
  .join('\n');

const insert = `\n    ${JSON.stringify(SLUG)}: ${body},`;
const out = src.slice(0, at + anchor.length) + insert + src.slice(at + anchor.length);
writeFileSync(target, out);

console.log(`${locale}: inserted (${post.body.length} blocks, ${post.faqs.items.length} FAQs)`);
