// Where does a non-English page still publish the English Title/Description?
// Those two fields are what a buyer sees in the SERP and what an AI engine
// quotes back, so they matter more per byte than body copy.
import { CATEGORIES } from '../data/categories.js';
import { POSTS } from '../data/blog.js';

const LOCALES = ['es','fr','de','it','pt','ja','ko'];
const blog = {}, cat = {};
for (const l of LOCALES) {
  blog[l] = (await import(`../data/blog/translations/${l}.js`)).default.posts || {};
  try { cat[l] = (await import(`../data/categories/translations/${l}.js`)).default || {}; } catch { cat[l] = {}; }
}

let blogMissing = 0, catMissing = 0;
const catRows = [];
for (const c of Object.entries(CATEGORIES).map(([slug, v]) => ({ slug, ...v }))) {
  for (const l of LOCALES) {
    const t = cat[l][c.slug] || {};
    const hasTitle = !!(t.seoTitle || t.title);
    const hasDesc  = !!(t.seoDescription || t.description);
    if (!hasTitle || !hasDesc) { catMissing++; catRows.push(`${c.slug} [${l}] title:${hasTitle?'ok':'EN'} desc:${hasDesc?'ok':'EN'}`); }
  }
}
for (const p of POSTS) for (const l of LOCALES) {
  const t = blog[l][p.slug];
  if (!t || !t.title || !t.excerpt) blogMissing++;
}

console.log(`Categories: ${Object.keys(CATEGORIES).length} x ${LOCALES.length} = ${Object.keys(CATEGORIES).length*LOCALES.length} localized URLs`);
console.log(`  falling back to English title and/or description: ${catMissing}`);
console.log(`Blog: ${POSTS.length} x ${LOCALES.length} = ${POSTS.length*LOCALES.length} localized URLs`);
console.log(`  falling back to English title and/or excerpt: ${blogMissing}`);
console.log('');
for (const r of catRows.slice(0, 20)) console.log('  ' + r);
if (catRows.length > 20) console.log(`  ... and ${catRows.length-20} more`);
