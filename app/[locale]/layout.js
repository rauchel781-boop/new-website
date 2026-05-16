import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkChat from '@/components/TawkChat';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClarityAnalytics from '@/components/ClarityAnalytics';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { CookieConsentProvider, CookieBanner } from '@/components/CookieConsent';
import { SITE } from '@/data/site-config';
import { routing } from '@/i18n/routing';
import { playfair, jost, fraunces, caveat } from '@/app/fonts';

// Tells Next.js to pre-render every locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Per-locale metadata (title/description translated, hreflang on every page).
export async function generateMetadata({ params: { locale } }) {
  if (!routing.locales.includes(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  const SITE_NAME = `${SITE.company.brand} — ${SITE.company.tagline}`;
  const title = t('siteTitle');
  const description = t('siteDescription');

  // hreflang: every locale + x-default → English version
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  );
  languages['x-default'] = `/${routing.defaultLocale}`;

  return {
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE.company.legalName }],
    creator: SITE.company.legalName,
    publisher: SITE.company.legalName,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: 'website',
      locale: localeOgTag(locale),
      url: `${SITE.siteUrl}/${locale}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

function localeOgTag(loc) {
  const map = {
    en: 'en_US', es: 'es_ES', fr: 'fr_FR', de: 'de_DE',
    it: 'it_IT', pt: 'pt_PT', ja: 'ja_JP', ko: 'ko_KR',
  };
  return map[loc] || 'en_US';
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  // Required for static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  const fontClass = `${playfair.variable} ${jost.variable} ${fraunces.variable} ${caveat.variable}`;

  return (
    <html lang={locale} className={fontClass}>
      <head>
        {/* RSS discovery — feed readers (Feedly, Inoreader, NewsBlur)
            auto-detect feeds via this <link rel="alternate"> tag. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.company.brand} Journal`}
          href={`${SITE.siteUrl}/feed.xml`}
        />
      </head>
      <body>
        {/* Skip-to-content: lets keyboard / screen-reader users jump
            past the header nav directly to <main>. The link is
            visually hidden until focused — WCAG 2.4.1 Bypass Blocks. */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CookieConsentProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <TawkChat />
            <GoogleAnalytics />
            <ClarityAnalytics />
            <AnalyticsTracker />
            <CookieBanner />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
