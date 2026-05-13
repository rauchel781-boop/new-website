'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/components/CookieConsent';

// 把下面两个值替换成你在 Tawk.to 后台拿到的真实 ID 即可。
// 路径在 Tawk.to → Administration → Channels → Chat Widget → 复制嵌入代码里
// https://embed.tawk.to/<PROPERTY_ID>/<WIDGET_ID>
const TAWK_PROPERTY_ID = '69fd5a3126254a1c3309ace8';
const TAWK_WIDGET_ID = '1jo2qglbj';

export default function TawkChat() {
  const { consent } = useCookieConsent();

  // 没填 ID 之前不渲染，避免脚本报 404
  if (
    !TAWK_PROPERTY_ID ||
    TAWK_PROPERTY_ID === 'YOUR_PROPERTY_ID' ||
    !TAWK_WIDGET_ID ||
    TAWK_WIDGET_ID === 'YOUR_WIDGET_ID'
  ) {
    return null;
  }

  // GDPR / ePrivacy: Tawk.to drops third-party cookies on load. Don't load
  // the script until the visitor has explicitly accepted via Cookie banner.
  if (consent !== 'accepted') {
    return null;
  }

  // Tawk.to is heavy (~250KB JS). We defer loading by 3s after window load
  // so it doesn't compete with the hero image / fonts during the LCP window.
  // strategy="lazyOnload" already waits for window.load; the setTimeout adds
  // an extra 3s buffer on top, dropping mobile TBT meaningfully.
  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        setTimeout(function(){
          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        }, 3000);
      `}
    </Script>
  );
}
