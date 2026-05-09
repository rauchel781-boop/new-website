// Per-locale product translation overlays.
//
// Strategy: keep English source-of-truth in data/products/{slug}.js. For each
// non-English locale, ship a flat map { [productSlug]: { name, closure, tagline, intro } }
// with overrides. Anything missing falls back to the English source (so we can
// roll translations out one batch at a time without breaking the build).
//
// Helper usage:
//   import { getProductTranslation } from '@/data/products/translations';
//   const t = getProductTranslation(product.slug, locale);
//   const localized = { ...product, ...t };

import en from './en.js';
import es from './es.js';
import fr from './fr.js';
import de from './de.js';
import it from './it.js';
import pt from './pt.js';
import ja from './ja.js';
import ko from './ko.js';

const ALL = { en, es, fr, de, it, pt, ja, ko };

export function getProductTranslation(slug, locale) {
  const map = ALL[locale] || ALL.en;
  return map[slug] || {};
}
