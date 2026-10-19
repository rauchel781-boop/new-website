import fs from 'node:fs';
import path from 'node:path';
import {repoRoot, products, translations, locales, reusableTranslationRows} from './source-data.mjs';
import manual from './manual-lexicon.mjs';
import closures from './closure-lexicon.mjs';
import materials from './material-lexicon.mjs';
import hardware from './hardware-lexicon.mjs';
import branding from './branding-lexicon.mjs';
import details from './detail-lexicon.mjs';

const outputPath = path.join(repoRoot, 'data/products/translations/specs.js');
const cleanup = (value, locale) => ({
  es: () => value.replace(/aceite food-safe/gi, 'aceite apto para contacto alimentario'),
  fr: () => value.replace(/huile food-safe/gi, 'huile adaptée au contact alimentaire'),
  it: () => value.replace(/olio food-safe/gi, 'olio idoneo al contatto alimentare'),
  pt: () => value.replace(/óleo food-safe/gi, 'óleo adequado ao contato com alimentos'),
}[locale]?.() || value);

const rows = [...reusableTranslationRows(), ...manual, ...closures, ...materials, ...hardware, ...branding, ...details];
for (const row of rows) {
  if (row.length !== locales.length + 1 || row.some(value => typeof value !== 'string' || !value.trim())) {
    throw new Error('Incomplete terminology row: ' + JSON.stringify(row));
  }
}
const maps = Object.fromEntries(locales.map((locale, index) => [
  locale,
  new Map(rows.map(row => [row[0], cleanup(row[index + 1], locale)])),
]));
const lowerMaps = Object.fromEntries(locales.map(locale => [
  locale, new Map([...maps[locale]].map(([source, translated]) => [source.toLowerCase(), translated])),
]));

function splitOutsideParentheses(value, separator) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < value.length; index++) {
    if (value[index] === '(') depth++;
    if (value[index] === ')') depth--;
    if (depth === 0 && value.slice(index, index + separator.length) === separator) {
      parts.push(value.slice(start, index));
      start = index + separator.length;
      index += separator.length - 1;
    }
  }
  parts.push(value.slice(start));
  return parts;
}

const unknown = new Set();
function translate(value, locale) {
  if (maps[locale].has(value)) return maps[locale].get(value);
  if (lowerMaps[locale].has(value.toLowerCase())) return lowerMaps[locale].get(value.toLowerCase());
  if (!/[A-Za-z]/.test(value)) return value;
  if (/^(S|M|L|XL|MDF|N\/A)$/.test(value)) return value;
  if (/^[\d\s×x.,~–\-/→+]+(?:mm|ml|L|g|kg)?$/.test(value)) return value;
  if (/^(?:XL|[SML]) [\d\s×x.,~–\-/→+]+(?:mm)?(?: → S [\d\s×x.,~–\-/→+]+mm)?$/.test(value)) return value;
  const numbers = [...value.matchAll(/\d+(?:[.,]\d+)?/g)].map(match => match[0]);
  const pattern = value.replace(/\d+(?:[.,]\d+)?/g, '{#}');
  if (maps[locale].has(pattern)) {
    let index = 0;
    return maps[locale].get(pattern).replace(/\{#\}/g, () => numbers[index++]);
  }
  const parenthesized = value.match(/^(.+?) \(([^()]*)\)$/);
  if (parenthesized) return translate(parenthesized[1], locale) + ' (' + translate(parenthesized[2], locale) + ')';
  for (const separator of [' · ', ' + ', ' / ']) {
    const parts = splitOutsideParentheses(value, separator);
    if (parts.length > 1) return parts.map(part => translate(part, locale)).join(separator);
  }
  if (value.includes(' or ')) {
    const connector = {de: ' oder ', es: ' o ', fr: ' ou ', it: ' o ', pt: ' ou ', ja: ' または ', ko: ' 또는 '}[locale];
    return value.split(' or ').map(part => translate(part, locale)).join(connector);
  }
  const custom = value.match(/^([\d\s×x.,~–\-/→+]+mm) \(custom\)$/);
  if (custom) {
    const label = {de: 'Sondermaß', es: 'a medida', fr: 'sur mesure', it: 'su misura', pt: 'sob medida', ja: 'サイズ変更可', ko: '맞춤 크기 가능'}[locale];
    return custom[1] + ' (' + label + ')';
  }
  unknown.add(value);
  // This internal marker never reaches a generated file: generation fails
  // before any write when an unknown source fragment is encountered.
  return `UNTRANSLATED:${value}`;
}

const localizedSpecs = {};
for (const locale of locales) {
  localizedSpecs[locale] = {};
  for (const product of products) {
    if (translations[locale][product.slug]?.specs) continue;
    localizedSpecs[locale][product.slug] = Object.fromEntries(
      Object.entries(product.specs).map(([key, value]) => [key, translate(value, locale)]),
    );
  }
}
if (unknown.size) throw new Error('Add reviewed translations for these source values before generating:\n' + [...unknown].sort().join('\n'));

const numbersIn = value => (String(value).match(/\d+(?:[.,]\d+)?/g) || []).map(number => number.replace(',', '.'));
const unitPatterns = {
  de: {pcs: /Stück/, sets: /Sets?/}, es: {pcs: /piezas/, sets: /juegos/},
  fr: {pcs: /pièces/, sets: /ensembles/}, it: {pcs: /pezzi/, sets: /set/},
  pt: {pcs: /peças/, sets: /conjuntos/}, ja: {pcs: /個/, sets: /セット/}, ko: {pcs: /개/, sets: /세트/},
};
let checkedFields = 0;
for (const locale of locales) {
  for (const product of products) {
    const specs = localizedSpecs[locale][product.slug];
    if (!specs) continue;
    if (JSON.stringify(Object.keys(specs)) !== JSON.stringify(Object.keys(product.specs))) {
      throw new Error('Specification keys changed: ' + locale + '/' + product.slug);
    }
    for (const [key, source] of Object.entries(product.specs)) {
      checkedFields++;
      if (JSON.stringify(numbersIn(source)) !== JSON.stringify(numbersIn(specs[key]))) {
        throw new Error('Numeric values changed: ' + locale + '/' + product.slug + '/' + key);
      }
    }
    const moq = product.specs.MOQ || '';
    if (!/^200\s+(pcs|sets)(?:\s*\(set\))?$/.test(moq)) {
      throw new Error('Review changed source MOQ before generating: ' + product.slug + ': ' + moq);
    }
    const unit = /\bsets\b/.test(moq) ? 'sets' : 'pcs';
    if (!unitPatterns[locale][unit].test(specs.MOQ)) {
      throw new Error('MOQ piece/set meaning changed: ' + locale + '/' + product.slug);
    }
  }
}

const sourceSpecs = Object.fromEntries(products
  .filter(product => locales.some(locale => localizedSpecs[locale][product.slug]))
  .map(product => [product.slug, product.specs]));
const code = `// Seven-language specifications for products whose original locale overlay has no specs.\n// Existing translated specs retain priority in the server product page.\n// Generated from source specifications plus reviewed terminology; numerical values and pcs/sets are preserved.\n// Regenerate: node scripts/product-specs/generate.mjs\n// This module is server-page data. Do not import it from the translation index used by ProductGrid.\nconst SOURCE_SPECS = ${JSON.stringify(sourceSpecs, null, 2)};\n\nconst SUPPLEMENTAL_SPECS = ${JSON.stringify(localizedSpecs, null, 2)};\n\nexport function getProductSpecTranslation(productRaw, locale = 'en') {\n  if (!productRaw) return undefined;\n  if (locale === 'en') return productRaw.specs;\n  const localized = SUPPLEMENTAL_SPECS[locale]?.[productRaw.slug];\n  if (!localized) return undefined;\n  const original = SOURCE_SPECS[productRaw.slug];\n  if (Object.keys(original).length !== Object.keys(productRaw.specs || {}).length ||\n      Object.entries(original).some(([key, value]) => productRaw.specs?.[key] !== value)) {\n    throw new Error('Regenerate localized specifications after changing product specs: ' + productRaw.slug);\n  }\n  return localized;\n}\n`;
const previous = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
if (process.argv.includes('--check-data')) {
  if (previous.slice(previous.indexOf('const SOURCE_SPECS')) !== code.slice(code.indexOf('const SOURCE_SPECS'))) {
    throw new Error('Generated specification data differs from the current module.');
  }
} else if (process.argv.includes('--check')) {
  if (previous !== code) throw new Error('Regenerate data/products/translations/specs.js before building.');
} else if (previous !== code) {
  fs.writeFileSync(outputPath, code);
}
console.log(JSON.stringify({
  mode: process.argv.includes('--check-data') ? 'check-data' : process.argv.includes('--check') ? 'check' : 'generate',
  supplementalPages: Object.values(localizedSpecs).reduce((sum, entries) => sum + Object.keys(entries).length, 0),
  checkedFields, unknownValues: 0, numericOrUnitMismatches: 0,
  existingOverlaysModified: 0,
}));
