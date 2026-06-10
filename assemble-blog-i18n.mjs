// Inserts the translated cost-guide post overlay (from _work/<loc>.json) into
// each data/blog/translations/<loc>.js, validating block structure / img src /
// link paths against the English source first. Run: node assemble-blog-i18n.mjs
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SLUG = 'custom-wooden-box-cost-2026';
const WORK = path.join(ROOT, 'data/blog/translations/_work');
const TDIR = path.join(ROOT, 'data/blog/translations');
const LOCALES = ['de', 'it', 'es', 'fr', 'pt', 'ja', 'ko'];

const { POSTS } = await import('./data/blog.js?' + Date.now());
const en = POSTS.find(p => p.slug === SLUG);
const enSig = {
  types: en.body.map(b => b.type).join(','),
  imgs: en.body.filter(b => b.type === 'img').map(b => b.src).sort().join('|'),
  links: [...new Set([...JSON.stringify(en.body).matchAll(/\]\((\/[^)]+)\)/g)].map(x => x[1]))].sort().join('|'),
};

let bad = 0;
for (const loc of LOCALES) {
  const wf = path.join(WORK, `${loc}.json`);
  if (!fs.existsSync(wf)) { console.log(`  MISSING ${loc}.json`); bad++; continue; }
  let o;
  try { o = JSON.parse(fs.readFileSync(wf, 'utf8')); }
  catch (e) { console.log(`  BAD JSON ${loc}: ${e.message}`); bad++; continue; }
  if (!o.title || !o.excerpt || !o.category || !o.readTime || !Array.isArray(o.body)) { console.log(`  INCOMPLETE ${loc}`); bad++; continue; }
  const sig = {
    types: o.body.map(b => b.type).join(','),
    imgs: o.body.filter(b => b.type === 'img').map(b => b.src).sort().join('|'),
    links: [...new Set([...JSON.stringify(o.body).matchAll(/\]\((\/[^)]+)\)/g)].map(x => x[1]))].sort().join('|'),
  };
  if (sig.types !== enSig.types) { console.log(`  STRUCT ${loc}: block types differ`); bad++; continue; }
  if (sig.imgs !== enSig.imgs) { console.log(`  STRUCT ${loc}: img src differ`); bad++; continue; }
  if (sig.links !== enSig.links) { console.log(`  STRUCT ${loc}: link paths differ`); bad++; continue; }

  const file = path.join(TDIR, `${loc}.js`);
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes(`"${SLUG}"`)) { console.log(`  ${loc}: already present — skipping insert`); continue; }

  const overlay = { title: o.title, excerpt: o.excerpt, category: o.category, readTime: o.readTime, body: o.body };
  const postLine = `    ${JSON.stringify(SLUG)}: ${JSON.stringify(overlay)},\n`;
  const postAnchor = '  "posts": {\n';
  if (!src.includes(postAnchor)) { console.log(`  ${loc}: posts anchor not found`); bad++; continue; }
  src = src.replace(postAnchor, postAnchor + postLine);

  const catAnchor = '  "categories": {\n';
  if (src.includes(catAnchor) && !/"Pricing"\s*:/.test(src)) {
    src = src.replace(catAnchor, catAnchor + `    "Pricing": ${JSON.stringify(o.category)},\n`);
  }
  fs.writeFileSync(file, src, 'utf8');
  console.log(`  ${loc}: inserted (${o.body.length} blocks)`);
}
console.log(bad === 0 ? '\nASSEMBLY OK' : `\n${bad} PROBLEM(S)`);
