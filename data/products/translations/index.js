// Per-locale product translation overlays.
//
// Strategy: keep English source-of-truth in data/products/{slug}.js. For each
// non-English locale, ship a map { [productSlug]: { ...fields } } with
// overrides. Anything missing falls back to the English source (so we can
// roll translations out one batch at a time without breaking the build).
//
// Supported overlay fields (any subset can be provided):
//   - name           string — product name
//   - closure        string — closure type label (already localized in
//                    `closureEyebrows` namespace; this is the badge value
//                    shown in the spec table closure-row, not the eyebrow)
//   - tagline        string — short hero tagline
//   - intro          string — hero intro paragraph
//   - specs          object — full specs table values. If provided, REPLACES
//                    the English specs object entirely (so include every key
//                    you want to keep — partial specs translations will drop
//                    untranslated keys).
//   - customization  string[] — bullet list, translated
//   - packaging      string  — packaging paragraph, translated
//   - useCases       string[] — chip list, translated
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
