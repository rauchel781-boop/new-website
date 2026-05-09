// Material Guide — locale dispatcher.
// Static imports keep all 8 locales in the build context so Next.js can
// statically generate every locale page; the runtime cost is just a 5KB
// JSON-ish lookup per locale (data is structural strings, not images).
import * as en from './en.js';
import * as es from './es.js';
import * as fr from './fr.js';
import * as de from './de.js';
import * as it from './it.js';
import * as pt from './pt.js';
import * as ja from './ja.js';
import * as ko from './ko.js';

const ALL = { en, es, fr, de, it, pt, ja, ko };

// Returns { WOODS, FINISHES, BRANDING, HARDWARE, COPY } for the given locale.
// Falls back to English if a locale we don't have a translation for is passed.
export function getMaterialGuide(locale) {
  return ALL[locale] || ALL.en;
}
