// Home — locale dispatcher.
import * as en from './en.js';
import * as es from './es.js';
import * as fr from './fr.js';
import * as de from './de.js';
import * as it from './it.js';
import * as pt from './pt.js';
import * as ja from './ja.js';
import * as ko from './ko.js';

const ALL = { en, es, fr, de, it, pt, ja, ko };

export function getHome(locale) {
  return ALL[locale] || ALL.en;
}
