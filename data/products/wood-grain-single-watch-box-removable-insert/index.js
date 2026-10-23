import en from './en.js';
import de from './de.js';
import fr from './fr.js';
import es from './es.js';
import it from './it.js';
import pt from './pt.js';
import ja from './ja.js';
import ko from './ko.js';

const slug = 'wood-grain-single-watch-box-removable-insert';

export const PRODUCT = {
  ...en,
  slug,
  updatedAt: '2026-10-23',
  leadTimeByQuotation: true,
  images: Array.from({ length: 5 }, (_, index) =>
    `/watch-jewelry/${slug}/${slug}-${String(index + 1).padStart(2, '0')}.webp`),
  related: [
    'single-piano-lacquer-watch-box-with-lock',
    'black-single-watch-presentation-box',
    'walnut-veneer-single-watch-box',
  ],
};

const translations = { de, fr, es, it, pt, ja, ko };

export function getRemovableInsertWatchTranslation(locale) {
  return translations[locale] || {};
}
