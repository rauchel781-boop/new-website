// How many localized product pages actually carry translated body copy?
// app/[locale]/products/[slug]/[product]/page.js renders the rich description
// and product FAQ only when hasFullProductTranslation() passes for that locale.
// Everything else falls back to a stub, so the page ships with a fraction of
// the English page's text. At 186 products x 7 non-English locales, that
// decides whether this site has ~1,500 real pages or ~1,300 thin ones.
import { CATEGORIES } from '../data/categories.js';
import { hasFullProductTranslation, isProductContentLocaleSupported } from '../lib/product-content.js';
import { getProductTranslation } from '../data/products/translations/index.js';

const LOCALES = ['es','fr','de','it','pt','ja','ko'];

let products = [];
for (const slug of Object.keys(CATEGORIES)) {
  try {
    const m = await import(`../data/products/${slug}.js`);
    for (const [pslug, p] of Object.entries(m.PRODUCTS || {})) products.push({ cat: slug, slug: pslug, ...p });
  } catch {}
}
console.log(`products found: ${products.length}\n`);

const rows = [];
for (const loc of LOCALES) {
  if (!isProductContentLocaleSupported(loc)) { rows.push([loc, 'template MISSING', '', '']); continue; }
  let full = 0;
  for (const p of products) {
    let t; try { t = getProductTranslation(p.slug, loc); } catch { t = null; }
    if (hasFullProductTranslation(t, loc)) full++;
  }
  const thin = products.length - full;
  rows.push([loc, `${full}/${products.length}`, `${Math.round(100*full/products.length)}%`, `${thin} thin`]);
}
console.log('locale  full            pct    result');
for (const r of rows) console.log(r[0].padEnd(7), String(r[1]).padEnd(15), String(r[2]).padEnd(6), r[3]);

const totalThin = rows.reduce((a,r)=>a + (parseInt(r[3])||0), 0);
console.log(`\nTotal thin localized product pages: ${totalThin} of ${products.length * LOCALES.length}`);
