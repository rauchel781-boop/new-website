import { POSTS } from '../data/blog.js';
const LOCALES = ['es','fr','de','it','pt','ja','ko'];
const maps = {};
for (const l of LOCALES) maps[l] = (await import(`../data/blog/translations/${l}.js`)).default.posts || {};

let withFaq = 0, units = 0, pages = 0;
const rows = [];
for (const p of POSTS) {
  const n = p.faqs?.items?.length || 0;
  if (!n) continue;
  withFaq++;
  const missing = LOCALES.filter((l) => !maps[l][p.slug]?.faqs);
  if (missing.length) { units += n * missing.length; pages += missing.length; rows.push([p.slug, n, missing.join(',')]); }
}
console.log(`English posts carrying FAQs: ${withFaq} of ${POSTS.length}`);
console.log(`Pages rendering an English FAQ block under translated chrome: ${pages}`);
console.log(`Q&A pairs to translate to close it: ${units}\n`);
for (const [s, n, m] of rows) console.log(`  ${String(s).padEnd(56)} ${n} FAQs  missing: ${m}`);
