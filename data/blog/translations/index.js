// Per-locale BLOG post translation overlays.
//
// Strategy: keep English source-of-truth in data/blog.js. For each
// non-English locale, ship a map { [postSlug]: { ...fields } } with
// overrides. Anything missing falls back to the English source.
//
// Supported overlay fields (any subset can be provided):
//   - title       string         — post title
//   - excerpt     string         — short description shown on cards
//   - category    string         — category tag ("Process", etc.)
//   - readTime    string         — human-readable read time
//   - body        array          — full body block array; if provided
//                                  REPLACES the English body entirely
//                                  (every block's text/caption/items
//                                  etc. must be translated)
//
// Generation: see scripts/translate-blog-aliyun.mjs — uses Aliyun
// Machine Translation API to populate these files programmatically.
//
// Helper usage:
//   import { getBlogTranslation, getBlogCategoryTranslation } from
//     '@/data/blog/translations';
//   const t = getBlogTranslation(post.slug, locale);
//   const merged = { ...post, ...t };

import en from './en.js';
import es from './es.js';
import fr from './fr.js';
import de from './de.js';
import it from './it.js';
import pt from './pt.js';
import ja from './ja.js';
import ko from './ko.js';

const ALL = { en, es, fr, de, it, pt, ja, ko };

// Get the per-post translation overlay for a specific locale.
// Returns {} if no overlay is available, allowing the caller to spread
// safely with the English source as fallback.
export function getBlogTranslation(slug, locale) {
  const map = ALL[locale] || ALL.en;
  return (map.posts || {})[slug] || {};
}

// Get the translated category name (e.g. "Process" → "Processo" for IT).
// Falls back to the English category string when no translation exists.
export function getBlogCategoryTranslation(categoryName, locale) {
  const map = ALL[locale] || ALL.en;
  return (map.categories || {})[categoryName] || categoryName;
}
