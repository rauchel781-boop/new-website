import { defineRouting } from 'next-intl/routing';

// 8-language B2B export: English + Spanish, French, German, Italian,
// Portuguese, Japanese, Korean. Add a code here only if you also add a
// matching messages/<code>.json file.
export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko'],
  defaultLocale: 'en',

  // Always show locale prefix in URL (incl. /en/...) so canonical/hreflang
  // are unambiguous. Keeps Google's job easy.
  localePrefix: 'always',
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

// Friendly display names for the language switcher
export const localeNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ja: '日本語',
  ko: '한국어',
};
