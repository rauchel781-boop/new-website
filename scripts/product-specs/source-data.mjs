import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const locales = ['de', 'es', 'fr', 'it', 'pt', 'ja', 'ko'];

// Read the repository's pure-data ESM modules without importing Next.js or
// requiring a package-wide CommonJS/ESM change.
export function readData(relativeFile, exportedName) {
  const source = fs.readFileSync(path.join(repoRoot, relativeFile), 'utf8')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ')
    .replace(/export\s+default\s+[^;]+;?/g, '');
  return vm.runInNewContext(`${source}\n;${exportedName}`, {Set, encodeURIComponent});
}

export const products = fs.readdirSync(path.join(repoRoot, 'data/products'))
  .filter(name => name.endsWith('.js')).sort()
  .flatMap(name => Object.values(readData(`data/products/${name}`, 'PRODUCTS')));

export const translations = Object.fromEntries(locales.map(locale => [
  locale,
  readData(`data/products/translations/${locale}.js`, 'TRANSLATIONS'),
]));

export function reusableTranslationRows() {
  const maps = Object.fromEntries(locales.map(locale => [locale, new Map()]));
  for (const locale of locales) {
    for (const product of products) {
      for (const [key, source] of Object.entries(product.specs)) {
        const translated = translations[locale][product.slug]?.specs?.[key];
        if (!translated) continue;
        maps[locale].set(source, translated);
        // Only reuse aligned list segments when both sides have the same
        // separator and the same segment count. Numeric-only fragments are
        // deliberately excluded to avoid losing units or field meaning.
        for (const separator of [' · ', ' + ', ' / ']) {
          const originalParts = source.split(separator);
          const translatedParts = translated.split(separator);
          if (originalParts.length < 2 || originalParts.length !== translatedParts.length) continue;
          originalParts.forEach((part, index) => {
            if (part.length >= 3 && translatedParts[index] !== part) {
              maps[locale].set(part, translatedParts[index]);
            }
          });
        }
      }
    }
  }
  return [...maps.de.keys()]
    .filter(source => locales.every(locale => maps[locale].has(source)))
    .sort()
    .map(source => [source, ...locales.map(locale => maps[locale].get(source))]);
}
