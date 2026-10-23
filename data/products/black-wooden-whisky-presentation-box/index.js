import en from './en.js';
import de from './de.js';
import fr from './fr.js';
import es from './es.js';
import it from './it.js';
import pt from './pt.js';
import ja from './ja.js';
import ko from './ko.js';

const slug = 'black-wooden-whisky-presentation-box';

// Owner-supplied photographs establish the reference appearance and layout.
// Core, species, coating, dimensions and closing details remain order-specific.
export const PRODUCT = {
  ...en,
  slug,
  updatedAt: '2026-10-23',
  leadTimeByQuotation: true,
  images: Array.from({ length: 4 }, (_, index) =>
    `/wine-whisky-boxes/${slug}/${slug}-${String(index + 1).padStart(2, '0')}.webp`),
  related: ['pine-single-bottle-wine-box', 'pine-whisky-crate-rope-handle', 'bamboo-wine-gift-set'],
};

const translations = { de, fr, es, it, pt, ja, ko };

export function getWhiskyProductTranslation(locale) {
  return translations[locale] || {};
}
