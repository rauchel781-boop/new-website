import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// CRITICAL FIX (2026-06-23): Disable automatic locale detection to prevent
// Google's crawler from being redirected based on Accept-Language headers.
// GSC showed 306 pages flagged as "Page redirects" — that's because the default
// next-intl behavior (localeDetection: true) auto-redirects visitors to their
// browser's preferred language, which breaks search engine indexing.
// Users can still pick a language via the header switcher; this just stops
// the middleware from forcing redirects on every request.
export default createMiddleware({
  ...routing,
  localeDetection: false,
});

export const config = {
  // Match every path EXCEPT api, _next, sitemap.xml, robots.txt, and any
  // path with a file extension. (Note: blog IS handled — it lives under
  // /[locale]/blog/, so /blog/foo redirects to /en/blog/foo.)
  matcher: ['/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)'],
};
