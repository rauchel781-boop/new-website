// Fill in customization / useCases / packaging for the 112 products whose
// non-English overlays stopped at `intro`. Those three fields are what
// hasFullProductTranslation() gates the rich description and product FAQ on,
// so without them 784 localized pages ship as stubs.
//
// Reads scripts/product-i18n-glossary.json ({ englishString: {es,fr,...} })
// and rewrites data/products/translations/<locale>.js in place.
import fs from 'fs';
import { CATEGORIES } from '../data/categories.js';
import { getProductTranslation } from '../data/products/translations/index.js';

const LOCALES = ['es','fr','de','it','pt','ja','ko'];
const G = JSON.parse(fs.readFileSync('scripts/product-i18n-glossary.json','utf8'));
const DRY = process.argv.includes('--dry');

const products = [];
for (const slug of Object.keys(CATEGORIES)) {
  try {
    const m = await import(`../data/products/${slug}.js`);
    for (const [pslug,p] of Object.entries(m.PRODUCTS||{})) products.push({ slug: pslug, ...p });
  } catch {}
}

function tr(s, loc) {
  const hit = G[s];
  return hit && hit[loc] ? hit[loc] : null;
}

// Find the object literal for `'<slug>': {` and return [startOfBody, indexOfClosingBrace].
// Counts braces while skipping over string literals so `specs: { ... }` nests correctly.
function findEntry(src, slug) {
  const key = `'${slug}': {`;
  const at = src.indexOf(key);
  if (at === -1) return null;
  let i = at + key.length, depth = 1;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (c === '\\') { i += 2; continue; }
    if (c === "'" || c === '"' || c === '`') {
      const q = c; i++;
      while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; }
      i++; continue;
    }
    if (c === '{') depth++;
    else if (c === '}') depth--;
    i++;
  }
  return depth === 0 ? [at + key.length, i - 1] : null;
}

const js = (v) => JSON.stringify(v);
let grandTotal = 0;
const unresolved = new Set();

for (const loc of LOCALES) {
  const file = `data/products/translations/${loc}.js`;
  let src = fs.readFileSync(file, 'utf8');
  let filled = 0, skipped = 0;

  for (const p of products) {
    const t = getProductTranslation(p.slug, loc) || {};
    const need = ['customization','useCases','packaging'].filter(f => !t[f]);
    if (!need.length) continue;

    const lines = [];
    let ok = true;
    for (const field of need) {
      if (field === 'packaging') {
        if (!p.packaging) continue;
        const v = tr(p.packaging, loc);
        if (!v) { unresolved.add(p.packaging); ok = false; break; }
        lines.push(`    packaging: ${js(v)},`);
      } else {
        const en = p[field] || [];
        if (!en.length) continue;
        const out = [];
        for (const s of en) {
          const v = tr(s, loc);
          if (!v) { unresolved.add(s); ok = false; break; }
          out.push(v);
        }
        if (!ok) break;
        lines.push(`    ${field}: [${out.map(js).join(', ')}],`);
      }
    }
    if (!ok || !lines.length) { skipped++; continue; }

    const span = findEntry(src, p.slug);
    if (!span) { console.warn(`  ! ${loc}: entry not found for ${p.slug}`); skipped++; continue; }
    const [bodyStart, close] = span;

    if (src.slice(bodyStart, close).includes('\n')) {
      // Multi-line entry: put each field on its own line above the closing brace.
      const ins = src.lastIndexOf('\n', close) + 1;
      src = src.slice(0, ins) + lines.join('\n') + '\n' + src.slice(ins);
    } else {
      // Single-line entry (`'slug': { name: ..., intro: ... }`). Backing up to the
      // start of the line would land OUTSIDE the object and silently turn these
      // into top-level keys of TRANSLATIONS, so splice them in before the brace.
      let end = close - 1;
      while (end > bodyStart && /\s/.test(src[end])) end--;
      const sep = src[end] === ',' ? ' ' : ', ';
      const inline = lines.map(l => l.trim().replace(/,$/, '')).join(', ');
      src = src.slice(0, end + 1) + sep + inline + src.slice(end + 1);
    }
    filled++;
  }

  if (!DRY) fs.writeFileSync(file, src);
  grandTotal += filled;
  console.log(`${loc}: filled ${filled}, skipped ${skipped}`);
}

console.log(`\ntotal product x locale overlays completed: ${grandTotal}`);
if (unresolved.size) {
  console.log(`\nUNRESOLVED STRINGS (${unresolved.size}):`);
  for (const s of unresolved) console.log('  ', s);
}
