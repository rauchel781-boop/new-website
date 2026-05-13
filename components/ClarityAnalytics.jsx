'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/components/CookieConsent';
import { SITE } from '@/data/site-config';

// Microsoft Clarity loader (heatmaps + session recording).
//
// Same gates as GA4:
//   1) Project ID must be set and not a placeholder.
//   2) Visitor must have accepted cookies via the CookieBanner.
//
// Clarity uses _clck and _clsk cookies so it must wait for explicit consent
// (unlike what their marketing says — "cookie-less" only applies to certain
// regions / opt-outs).

const CLARITY_ID = SITE.analytics?.clarityProjectId;

function isConfigured(id) {
  return Boolean(id) && !id.startsWith('YOUR_') && id.length >= 6;
}

export default function ClarityAnalytics() {
  const { consent } = useCookieConsent();

  if (!isConfigured(CLARITY_ID)) return null;
  if (consent !== 'accepted') return null;

  return (
    <Script id="ms-clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
