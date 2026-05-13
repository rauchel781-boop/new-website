'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/components/CookieConsent';
import { SITE } from '@/data/site-config';

// Google Analytics 4 loader.
//
// Two safety gates before this fires:
//   1) The Measurement ID must be set and not a placeholder.
//   2) The visitor must have explicitly accepted cookies (CookieBanner).
//
// We use anonymize_ip + send_page_view so we get useful traffic metrics
// without storing full IPs. Page views are tracked automatically; custom
// events (inquiry submitted, WhatsApp click, etc.) can be sent later via
// the global window.gtag() function.

const GA_ID = SITE.analytics?.googleAnalyticsId;

function isConfigured(id) {
  return Boolean(id) && !id.startsWith('YOUR_') && id.startsWith('G-');
}

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  if (!isConfigured(GA_ID)) return null;
  if (consent !== 'accepted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}
