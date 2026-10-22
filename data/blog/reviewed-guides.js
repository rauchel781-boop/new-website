// Reviewed procurement guides; locale files contain all visible copy.
import closureEn from './wooden-box-closure-types-compared/en.js';
import closureDe from './wooden-box-closure-types-compared/de.js';
import closureFr from './wooden-box-closure-types-compared/fr.js';
import closureEs from './wooden-box-closure-types-compared/es.js';
import closureIt from './wooden-box-closure-types-compared/it.js';
import closurePt from './wooden-box-closure-types-compared/pt.js';
import closureJa from './wooden-box-closure-types-compared/ja.js';
import closureKo from './wooden-box-closure-types-compared/ko.js';
import finishingEn from './wooden-box-finishing-techniques/en.js';
import finishingDe from './wooden-box-finishing-techniques/de.js';
import finishingFr from './wooden-box-finishing-techniques/fr.js';
import finishingEs from './wooden-box-finishing-techniques/es.js';
import finishingIt from './wooden-box-finishing-techniques/it.js';
import finishingPt from './wooden-box-finishing-techniques/pt.js';
import finishingJa from './wooden-box-finishing-techniques/ja.js';
import finishingKo from './wooden-box-finishing-techniques/ko.js';
import woodEn from './choosing-wood-for-gift-packaging/en.js';
import woodDe from './choosing-wood-for-gift-packaging/de.js';
import woodFr from './choosing-wood-for-gift-packaging/fr.js';
import woodEs from './choosing-wood-for-gift-packaging/es.js';
import woodIt from './choosing-wood-for-gift-packaging/it.js';
import woodPt from './choosing-wood-for-gift-packaging/pt.js';
import woodJa from './choosing-wood-for-gift-packaging/ja.js';
import woodKo from './choosing-wood-for-gift-packaging/ko.js';
import hardwareEn from './wooden-box-hardware-guide/en.js';
import hardwareDe from './wooden-box-hardware-guide/de.js';
import hardwareFr from './wooden-box-hardware-guide/fr.js';
import hardwareEs from './wooden-box-hardware-guide/es.js';
import hardwareIt from './wooden-box-hardware-guide/it.js';
import hardwarePt from './wooden-box-hardware-guide/pt.js';
import hardwareJa from './wooden-box-hardware-guide/ja.js';
import hardwareKo from './wooden-box-hardware-guide/ko.js';

const POSTS_BY_LOCALE = {
  en: {"wooden-box-closure-types-compared": closureEn, "wooden-box-finishing-techniques": finishingEn, "choosing-wood-for-gift-packaging": woodEn, "wooden-box-hardware-guide": hardwareEn},
  de: {"wooden-box-closure-types-compared": closureDe, "wooden-box-finishing-techniques": finishingDe, "choosing-wood-for-gift-packaging": woodDe, "wooden-box-hardware-guide": hardwareDe},
  fr: {"wooden-box-closure-types-compared": closureFr, "wooden-box-finishing-techniques": finishingFr, "choosing-wood-for-gift-packaging": woodFr, "wooden-box-hardware-guide": hardwareFr},
  es: {"wooden-box-closure-types-compared": closureEs, "wooden-box-finishing-techniques": finishingEs, "choosing-wood-for-gift-packaging": woodEs, "wooden-box-hardware-guide": hardwareEs},
  it: {"wooden-box-closure-types-compared": closureIt, "wooden-box-finishing-techniques": finishingIt, "choosing-wood-for-gift-packaging": woodIt, "wooden-box-hardware-guide": hardwareIt},
  pt: {"wooden-box-closure-types-compared": closurePt, "wooden-box-finishing-techniques": finishingPt, "choosing-wood-for-gift-packaging": woodPt, "wooden-box-hardware-guide": hardwarePt},
  ja: {"wooden-box-closure-types-compared": closureJa, "wooden-box-finishing-techniques": finishingJa, "choosing-wood-for-gift-packaging": woodJa, "wooden-box-hardware-guide": hardwareJa},
  ko: {"wooden-box-closure-types-compared": closureKo, "wooden-box-finishing-techniques": finishingKo, "choosing-wood-for-gift-packaging": woodKo, "wooden-box-hardware-guide": hardwareKo},
};

export const reviewedEnglishPosts = POSTS_BY_LOCALE.en;

export function getReviewedGuideTranslation(slug, locale) {
  return locale === 'en' ? undefined : POSTS_BY_LOCALE[locale]?.[slug];
}
