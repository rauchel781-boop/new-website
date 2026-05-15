# CHIC — Custom Wooden Box Manufacturer Site

Next.js (App Router) marketing site for **CHIC / Xiamen Chic Homeware Co., Ltd.** — a Chinese B2B custom wooden box manufacturer exporting to 60+ countries.

Live: <https://custom-woodenbox.com>

## Tech Stack

- **Next.js 14.2.5** (App Router, JavaScript)
- **React 18.3**
- **next-intl 3.26** — 8-language i18n (en / es / fr / de / it / pt / ja / ko)
- **Tailwind CSS 3.4** (utility classes; most page CSS is co-located in template strings)
- **EmailJS** — contact / newsletter forms with graceful mailto fallback
- **Coolify** (self-hosted Docker deployment)
- **Google Analytics 4** + **Microsoft Clarity** (both cookie-consent gated)

## Project Structure

```
new-website/
├── app/
│   ├── [locale]/                 # All localized pages
│   │   ├── layout.js             # Per-locale layout (Header / Footer / Cookie banner)
│   │   ├── page.js               # Homepage
│   │   ├── about/page.js
│   │   ├── blog/                 # English-only (canonical to /en/blog)
│   │   ├── capabilities/         # FAQ section + FAQPage JSON-LD
│   │   ├── contact/              # Server page + ContactClient.jsx (form)
│   │   ├── material-guide/       # HowTo JSON-LD + wood profile sections
│   │   ├── privacy/              # English-only (legal)
│   │   ├── products/             # Category index + [slug] + [slug]/[product]
│   │   ├── terms/                # English-only (legal)
│   │   └── wood-fabrication/
│   ├── fonts.js                  # next/font/google self-hosting
│   ├── globals.css
│   ├── robots.js                 # /robots.txt
│   └── sitemap.js                # /sitemap.xml with hreflang
├── components/
│   ├── Header.js                 # Mega-menu nav + language switcher
│   ├── Footer.js                 # Newsletter + sitemap + socials
│   ├── ContactClient is in app/[locale]/contact/
│   ├── IntroCarousel.js          # Homepage image carousel
│   ├── ProductGrid.js            # Category-page product grid + filter
│   ├── ProductGallery.js         # PDP image gallery
│   ├── ProductTabs.js            # PDP spec / customization tabs
│   ├── NewsletterForm.js
│   ├── CookieConsent.jsx
│   ├── GoogleAnalytics.jsx       # Cookie-gated GA4 script
│   ├── ClarityAnalytics.jsx      # Cookie-gated Clarity script
│   ├── AnalyticsTracker.jsx
│   ├── TawkChat.jsx              # Cookie-gated chat widget
│   └── JsonLd.jsx                # Renders <script type="application/ld+json">
├── data/
│   ├── site-config.js            # Company info, social, EmailJS, GA4 IDs
│   ├── categories.js             # 17 categories (English source)
│   ├── categories/translations/  # Per-locale category overlays (8 files)
│   ├── products/{slug}.js        # Per-category product data (English source)
│   ├── products/translations/    # Per-locale product overlays (8 files)
│   ├── about/{locale}.js         # About page COPY per locale
│   ├── home/{locale}.js          # Homepage COPY per locale
│   ├── material-guide/{locale}.js
│   └── blog.js                   # English-only blog posts
├── i18n/
│   ├── routing.js                # Locales + defaultLocale + prefix strategy
│   ├── request.js                # next-intl server request config
│   ├── navigation.js             # Locale-aware <Link> helper
│   └── seo.js                    # alternates() helper for hreflang
├── lib/
│   ├── analytics.js              # trackEvent() — GA4 events
│   ├── cookie-consent.js
│   └── use-emailjs.js
├── messages/
│   └── {en,es,fr,de,it,pt,ja,ko}.json  # ~100 namespace keys per locale
├── public/                       # Images (.webp), logo, fonts
├── middleware.js                 # next-intl locale routing
├── next.config.js
├── package.json
├── HANDOFF.md                    # Detailed dev history & i18n architecture
└── README.md
```

## i18n Architecture

3 layers:

1. **`messages/{locale}.json`** — shared chrome strings (nav, CTAs, footer, page eyebrows). Accessed via `useTranslations` / `getTranslations` from `next-intl`.
2. **`data/products/translations/` + `data/categories/translations/`** — per-locale overlays for product / category content (`specs`, `features`, `useCases`, `longDesc`). English source lives in `data/categories.js` and `data/products/{slug}.js`; overlays are spread-merged at render time with English fallback.
3. **`data/{about,home,material-guide}/{locale}.js`** — full-page COPY trees for pages with lots of unique localized content.

URL strategy: `localePrefix: 'always'` (every URL has `/en/` etc), `defaultLocale: 'en'`, `<link rel="canonical">` per locale, `hreflang` alternates on every page including `x-default`.

Blog is intentionally English-only: every locale's `/blog` URL canonicalizes to `/en/blog` to avoid duplicate-content SEO penalties on machine-translated long-form content.

## Run Locally (Windows)

```powershell
cd D:\new-website
npm install
npm run dev
```

Visit <http://localhost:3000> (will redirect to `/en/`).

### Other commands

```powershell
npm run build     # production build (all 8 locales × ~220 pages prerender)
npm run start     # serve production build
npm run lint      # ESLint
```

### Browse non-English locales

```
http://localhost:3000/es        # Spanish
http://localhost:3000/fr        # French
http://localhost:3000/de        # German
http://localhost:3000/it        # Italian
http://localhost:3000/pt        # Portuguese
http://localhost:3000/ja        # Japanese
http://localhost:3000/ko        # Korean
```

## Deployment

Deployed via **Coolify** to a VPS. `Dockerfile` is generated automatically by Nixpacks; `.dockerignore` excludes `node_modules` / `.next` / `.git` etc. to keep the build context small (under 20 MB).

Coolify auto-deploys on push to `main`.

## Where to look

- **Detailed dev history** — `HANDOFF.md` (22 sections covering i18n architecture, SEO, Cookie banner, GA4, Clarity, ~8,500 translation entries across 8 languages)
- **Site config** — `data/site-config.js` (single source for company info, social links, EmailJS / GA4 / Clarity IDs)
- **Add a new category** — add entry to `data/categories.js`, then add matching overlay entries to all 8 `data/categories/translations/*.js`
- **Add a new product** — add to `data/products/{category}.js`, then add overlay entries to all 8 `data/products/translations/*.js`
- **Add a new locale** — extend `i18n/routing.js`, add `messages/<code>.json`, add overlay files in `data/{products,categories,about,home,material-guide}/{translations,}/`

## Notes

- `next/font/google` self-hosts fonts (no render-blocking external request)
- All images use `.webp` and ship with explicit `width` / `height` for zero CLS
- Hero LCP image has `loading="eager"` + `fetchpriority="high"`
- GA4 + Clarity + Tawk.to scripts only load AFTER cookie consent
