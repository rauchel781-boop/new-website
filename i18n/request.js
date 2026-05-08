import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// next-intl 3.22+ API — `requestLocale` is a Promise; we MUST return both
// `locale` and `messages` so getMessages() resolves correctly during static
// rendering of every locale's pages.
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
