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
//   - seoTitle    string         — localized <title> override (else English seoTitle / default template)
//   - seoDescription string      — localized meta description override
//   - deepContent { eyebrow, title, blocks[] }
//                                  — localized long-form buyer-guide block.
//                                  Same shape as data/categories.js deepContent:
//                                  blocks are { type:'p'|'h3', text } or
//                                  { type:'img', src, caption }. Keep `src` and
//                                  the [text](/path) link PATHS identical to the
//                                  English source (locale prefix is auto-added);
//                                  translate only the visible text / caption /
//                                  link label. If provided, REPLACES English deepContent.
//
// The longer fields (seoTitle / seoDescription / deepContent) live in a
// parallel set of files under ./deep/<locale>.js to keep these base overlay
// files readable. They are merged on top of the base overlay below, so a
// translated deepContent / seoTitle takes precedence while everything else
// continues to fall back to English.
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

// Deep overlays (seoTitle / seoDescription / deepContent), one map per locale.
import deepDe from './deep/de.js';
import deepIt from './deep/it.js';
import deepEs from './deep/es.js';
import deepFr from './deep/fr.js';
import deepPt from './deep/pt.js';
import deepJa from './deep/ja.js';
import deepKo from './deep/ko.js';

const ALL = { en, es, fr, de, it, pt, ja, ko };
const DEEP = { de: deepDe, it: deepIt, es: deepEs, fr: deepFr, pt: deepPt, ja: deepJa, ko: deepKo };

export function getCategoryTranslation(slug, locale) {
  const map = ALL[locale] || ALL.en;
  const base = map[slug] || {};
  const deep = (DEEP[locale] || {})[slug];
  return deep ? { ...base, ...deep } : base;
}
