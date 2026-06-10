// Injects the re-translated species-cost passages (from _work/fix-<loc>.json)
// into the blog translation files and the category deep files, then validates
// internal-link paths match the English source. Run: node patch-species-fix.mjs
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SLUG = 'custom-wooden-box-cost-2026';
const LOCALES = ['de', 'it', 'es', 'fr', 'pt', 'ja', 'ko'];
const linkset = (s) => [...new Set([...String(s).matchAll(/\]\((\/[^)]+)\)/g)].map(x => x[1]))].sort().join('|');

// English expectations
const { POSTS } = await import('./data/blog.js?' + Date.now());
const { CATEGORIES } = await import('./data/categories.js?' + Date.now());
const enPost = POSTS.find(p => p.slug === SLUG);
const enJ = enPost.body.findIndex(b => b.type === 'img' && b.src.includes('species-price-ladder'));
const enParaLinks = linkset(enPost.body[enJ - 1].text);
const enPineLinks = linkset(CATEGORIES.pine.deepContent.blocks[2].text);

const header = (raw) => raw.slice(0, raw.indexOf('export default'));
let bad = 0;
for (const loc of LOCALES) {
  const wf = path.join(ROOT, `data/blog/translations/_work/fix-${loc}.json`);
  if (!fs.existsSync(wf)) { console.log(`  MISSING fix-${loc}.json`); bad++; continue; }
  let o;
  try { o = JSON.parse(fs.readFileSync(wf, 'utf8')); } catch (e) { console.log(`  BAD JSON ${loc}: ${e.message}`); bad++; continue; }
  if (!o.blogPara || !o.blogCaption || !o.pineBlock) { console.log(`  INCOMPLETE ${loc}`); bad++; continue; }
  if (linkset(o.blogPara) !== enParaLinks) { console.log(`  LINKS ${loc} blogPara differ`); bad++; continue; }
  if (linkset(o.pineBlock) !== enPineLinks) { console.log(`  LINKS ${loc} pineBlock differ`); bad++; continue; }

  // --- blog translation file ---
  const bf = path.join(ROOT, `data/blog/translations/${loc}.js`);
  const bRaw = fs.readFileSync(bf, 'utf8');
  const bObj = (await import('./' + path.relative(ROOT, bf).replace(/\\/g, '/') + '?' + Date.now())).default;
  const post = (bObj.posts || {})[SLUG];
  if (!post) { console.log(`  ${loc}: post not in blog overlay`); bad++; continue; }
  const j = post.body.findIndex(b => b.type === 'img' && b.src && b.src.includes('species-price-ladder'));
  post.body[j - 1].text = o.blogPara;
  post.body[j].caption = o.blogCaption;
  fs.writeFileSync(bf, header(bRaw) + 'export default ' + JSON.stringify(bObj, null, 2) + ';\n', 'utf8');

  // --- category deep file ---
  const df = path.join(ROOT, `data/categories/translations/deep/${loc}.js`);
  const dRaw = fs.readFileSync(df, 'utf8');
  const dObj = (await import('./' + path.relative(ROOT, df).replace(/\\/g, '/') + '?' + Date.now())).default;
  if (!dObj.pine || !dObj.pine.deepContent) { console.log(`  ${loc}: pine not in deep overlay`); bad++; continue; }
  dObj.pine.deepContent.blocks[2].text = o.pineBlock;
  fs.writeFileSync(df, header(dRaw) + 'export default ' + JSON.stringify(dObj, null, 2) + ';\n', 'utf8');

  console.log(`  ${loc}: blog + pine patched`);
}
console.log(bad === 0 ? '\nPATCH OK' : `\n${bad} PROBLEM(S)`);
