// Splices one translated post into data/blog/translations/<locale>.js.
// Generalised from the closure-article version so each remaining article can
// reuse it: pass the slug and the locale.
//
// Surgical text insert after `"posts": {` rather than re-serialising the
// module — these files are ~250 KB each and a full rewrite would bury the
// real change in a diff of pure reformatting.
//
// Usage: node scripts/merge-post-i18n.mjs <slug> <locale>
//   reads  tmp-i18n/<slug>-<locale>.json
//   checks it against tmp-i18n/<slug>-en.json
//   writes data/blog/translations/<locale>.js

import { readFileSync, writeFileSync } from 'node:fs';

const [slug, locale] = process.argv.slice(2);
if (!slug || !locale) { console.error('usage: node scripts/merge-post-i18n.mjs <slug> <locale>'); process.exit(1); }

const target = `data/blog/translations/${locale}.js`;
const src = readFileSync(target, 'utf8');
if (src.includes(`"${slug}"`)) { console.error(`${locale}: already contains ${slug} - refusing to insert twice.`); process.exit(1); }

const en = JSON.parse(readFileSync(`tmp-i18n/${slug}-en.json`, 'utf8'));
const post = JSON.parse(readFileSync(`tmp-i18n/${slug}-${locale}.json`, 'utf8'));

const fail = (m) => { console.error(`${locale}: ${m}`); process.exit(1); };
if (!post.title || !post.excerpt || !post.category || !post.readTime) fail('missing title/excerpt/category/readTime');
if (!Array.isArray(post.body)) fail('body is not an array');
if (post.body.length !== en.body.length) fail(`expected ${en.body.length} body blocks, got ${post.body.length}`);

// Structure must match the English source exactly; only the words may differ.
const types = (b) => b.map((x) => x.type).join(',');
if (types(post.body) !== types(en.body)) fail('block type sequence differs from English');
for (let i = 0; i < en.body.length; i++) {
  const a = en.body[i], b = post.body[i];
  if (a.type === 'img' && a.src !== b.src) fail(`block ${i}: image path changed`);
  if (a.type === 'table') {
    if (b.headers?.length !== a.headers.length) fail(`block ${i}: table header count differs`);
    if (b.rows?.length !== a.rows.length) fail(`block ${i}: table row count differs`);
    for (let r = 0; r < a.rows.length; r++)
      if (b.rows[r].length !== a.rows[r].length) fail(`block ${i}: table row ${r} cell count differs`);
  }
  // Identical text usually means a block was left untranslated — but some short
  // headings are genuinely the same word in several languages ("Conclusion" in
  // French, "Design" in German), so only flag strings long enough that a real
  // translation could not coincide.
  if (a.text && a.text === b.text && a.text.length > 25) fail(`block ${i} (${a.type}) is still English: "${a.text.slice(0, 40)}..."`);
}
const enLinks = (JSON.stringify(en.body).match(/\]\(([^)]+)\)/g) || []).sort().join(',');
const ptLinks = (JSON.stringify(post.body).match(/\]\(([^)]+)\)/g) || []).sort().join(',');
if (enLinks !== ptLinks) fail('link targets differ from English');
if (en.faqs && (post.faqs?.items?.length !== en.faqs.items.length)) fail('FAQ count differs');

const anchor = '"posts": {';
const at = src.indexOf(anchor);
if (at === -1) fail('could not find "posts": {');

const body = JSON.stringify(post, null, 2).split('\n').map((l, i) => (i === 0 ? l : '    ' + l)).join('\n');
writeFileSync(target, src.slice(0, at + anchor.length) + `\n    ${JSON.stringify(slug)}: ${body},` + src.slice(at + anchor.length));
console.log(`${locale}: inserted ${slug} (${post.body.length} blocks)`);
