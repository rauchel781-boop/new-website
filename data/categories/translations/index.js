// Per-locale CATEGORY translation overlays.
//
// Strategy: keep English source-of-truth in data/categories.js. For each
// non-English locale, ship a map { [categorySlug]: { ...fields } } with
// overrides. Anything missing falls back to the English source (so we can
// roll translations out one category / locale at a time without breaking
// the build).
//
// Supported overlay fields (any subset can be provided):
//   - longDesc    string         — hero long-description paragraph
//   - features    array          — full features array [{ icon, title, desc }, …]
//                                  If provided, REPLACES the English features
//                                  entirely (include all 4 entries).
//   - specs       string[]       — full specs bullet list, translated
//                                  (if provided, REPLACES the English specs).
//   - useCases    string[]       — full useCases chip list, translated
//                                  (if provided, REPLACES the English useCases).
//
// Helper usage:
//   import { getCategoryTranslation } from '@/data/categories/translations';
//   const ct = getCategoryTranslation(slug, locale);
//   const features = ct.features || category.features;

import en from './en.js';
import es from './es.js';
import fr from './fr.js';
import de from './de.js';
import it from './it.js';
import pt from './pt.js';
import ja from './ja.js';
import ko from './ko.js';

const ALL = { en, es, fr, de, it, pt, ja, ko };

export function getCategoryTranslation(slug, locale) {
  const map = ALL[locale] || ALL.en;
  return map[slug] || {};
}
