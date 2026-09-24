// Post-merge sanity pass: structure, script sanity, and untranslated leftovers.
import { CATEGORIES } from '../data/categories.js';
import { getProductTranslation } from '../data/products/translations/index.js';
const LOCALES=['es','fr','de','it','pt','ja','ko'];
const CJK=/[぀-ヿ一-鿿가-힯]/;
const CYR=/[Ѐ-ӿ]/;
const products=[];
for (const slug of Object.keys(CATEGORIES)) {
  try { const m=await import(`../data/products/${slug}.js`);
    for (const [ps,p] of Object.entries(m.PRODUCTS||{})) products.push({slug:ps,...p}); } catch {}
}
let problems=0;
for (const loc of LOCALES) {
  let lenMismatch=0, identical=0, cyr=0, wrongScript=0, emptyStr=0;
  for (const p of products) {
    const t=getProductTranslation(p.slug,loc)||{};
    for (const f of ['customization','useCases']) {
      const en=p[f]||[], tr=t[f]||[];
      if (en.length!==tr.length) lenMismatch++;
      tr.forEach((s,i)=>{
        if (!s || !String(s).trim()) emptyStr++;
        if (CYR.test(s)) cyr++;
        if (en[i] && s===en[i] && en[i].length>18) identical++;
        if ((loc==='ja'||loc==='ko') && !CJK.test(s) && /[A-Za-z]{4}/.test(s)) wrongScript++;
        if (loc!=='ja' && loc!=='ko' && CJK.test(s)) wrongScript++;
      });
    }
    const pk=t.packaging;
    if (pk) {
      if (CYR.test(pk)) cyr++;
      if (p.packaging && pk===p.packaging) identical++;
      if ((loc==='ja'||loc==='ko') && !CJK.test(pk)) wrongScript++;
      if (loc!=='ja' && loc!=='ko' && CJK.test(pk)) wrongScript++;
    }
  }
  const bad = lenMismatch+identical+cyr+wrongScript+emptyStr;
  problems += bad;
  console.log(`${loc}: lenMismatch=${lenMismatch} identicalToEN=${identical} cyrillic=${cyr} wrongScript=${wrongScript} empty=${emptyStr}`);
}
console.log(problems ? `\nPROBLEMS: ${problems}` : '\nall clean');
