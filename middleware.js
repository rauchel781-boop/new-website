import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// CRITICAL FIX (2026-06-23): Disable automatic locale detection to prevent
// Google's crawler from being redirected based on Accept-Language headers.
// GSC showed 306 pages flagged as "Page redirects" — that's because the default
// next-intl behavior (localeDetection: true) auto-redirects visitors to their
// browser's preferred language, which breaks search engine indexing.
// Users can still pick a language via the header switcher; this just stops
// the middleware from forcing redirects on every request.
const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

// CRITICAL FIX (2026-09-07): Upgrade the locale-prefix redirect from 307 to 308.
//
// With localePrefix: 'always', any un-prefixed path (/products/acacia, /about,
// /blog/...) redirects to its /en/ equivalent. next-intl builds that with
// NextResponse.redirect(url) and passes no status, so Next.js defaults to
// 307 Temporary Redirect (verified in node_modules/next-intl@3.26.5:
// dist/production/middleware/middleware.js calls e.NextResponse.redirect(n.toString())).
//
// 307 tells Google "this old URL is coming back" — so it keeps every
// un-prefixed URL in its crawl queue forever, re-crawls them indefinitely,
// and does NOT pass their accumulated link signals to the /en/ target. That is
// what GSC reports as "Page with redirect", why the count keeps climbing, and
// why the fix validation fails: there is nothing for Google to validate,
// because a temporary redirect is by definition not a resolution.
//
// 308 Permanent Redirect says the move is final. Google then drops the old URL,
// consolidates its signals into the target, and stops re-crawling it. 308 (not
// 301) because it preserves the request method, matching what next-intl intends.
//
// Only 307s are touched. Rewrites and normal 200 responses pass through
// untouched, and every header next-intl set — notably the `Link` header
// carrying the alternate-language links — is copied onto the new response.
function toPermanentRedirect(response) {
  if (response.status !== 307) return response;

  const location = response.headers.get('location');
  if (!location) return response;

  const permanent = NextResponse.redirect(location, 308);
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'location') return;
    permanent.headers.set(key, value);
  });
  return permanent;
}

export default function middleware(request) {
  return toPermanentRedirect(intlMiddleware(request));
}

export const config = {
  // Match every path EXCEPT api, _next, sitemap.xml, robots.txt, and any
  // path with a file extension. (Note: blog IS handled — it lives under
  // /[locale]/blog/, so /blog/foo redirects to /en/blog/foo.)
  matcher: ['/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)'],
};
