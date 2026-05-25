// Info-page FAQ loader.
//
// Mirrors data/category-faqs but is deliberately NON-fallback across locales:
// a locale only gets FAQ content once its own translation file is registered
// here. That avoids rendering English FAQ copy on a non-English page (mixed
// language hurts hreflang/SEO signals). Until then getPageFaqs returns null and
// the page simply omits the FAQ section for that locale.
//
// All 8 site locales are now translated.
//
// Usage:
//   import { getPageFaqs } from '@/data/page-faqs';
//   const faqs = getPageFaqs('material-guide', locale);
//   // → { sectionTitle, sectionSub, items: [{ q, a }, …] } | null

import { FAQS as EN } from './en.js';
import { FAQS as DE } from './de.js';
import { FAQS as IT } from './it.js';
import { FAQS as ES } from './es.js';
import { FAQS as FR } from './fr.js';
import { FAQS as PT } from './pt.js';
import { FAQS as JA } from './ja.js';
import { FAQS as KO } from './ko.js';

const ALL = { en: EN, de: DE, it: IT, es: ES, fr: FR, pt: PT, ja: JA, ko: KO };

export function getPageFaqs(key, locale) {
  const map = ALL[locale];
  if (!map) return null;
  return map[key] || null;
}
