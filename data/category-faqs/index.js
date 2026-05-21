// Category FAQ loader with locale fallback.
//
// Reads from ./{locale}.js — each locale exports a FAQS object keyed
// by category slug. If a category is missing in the requested locale
// (e.g. a translation hasn't been run yet), we fall back to English.
//
// Usage:
//   import { getCategoryFaqs } from '@/data/category-faqs';
//   const faqs = getCategoryFaqs('watch-jewelry', 'de');
//   // → { sectionTitle, sectionSub, items: [{ q, a }, …] }

import { FAQS as EN } from './en.js';
import { FAQS as ES } from './es.js';
import { FAQS as FR } from './fr.js';
import { FAQS as DE } from './de.js';
import { FAQS as IT } from './it.js';
import { FAQS as PT } from './pt.js';
import { FAQS as JA } from './ja.js';
import { FAQS as KO } from './ko.js';

const ALL = { en: EN, es: ES, fr: FR, de: DE, it: IT, pt: PT, ja: JA, ko: KO };

export function getCategoryFaqs(slug, locale) {
  const map = ALL[locale] || EN;
  // Per-category fallback to EN if translation map doesn't have this slug yet
  return map[slug] || EN[slug] || null;
}
