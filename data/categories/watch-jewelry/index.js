import en from './en.js';
import de from './de.js';
import fr from './fr.js';
import es from './es.js';
import it from './it.js';
import pt from './pt.js';
import ja from './ja.js';
import ko from './ko.js';

const COPY = {en, de, fr, es, it, pt, ja, ko};
export function getWatchCategoryCopy(locale) {
  return COPY[locale] || en;
}
