'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {SITE} from '@/data/site-config';

export function WhatsAppLink({children, productName, ...props}) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('cta');
  const [product, setProduct] = useState(null);
  const pagePath = pathname || `/${locale}`;

  useEffect(() => {
    // Shared layout buttons also carry the current product after client navigation.
    const name = /^\/[a-z]{2}\/products\/[a-z0-9-]+\/[a-z0-9-]+$/.test(pagePath)
      ? document.querySelector('main h1')?.textContent?.trim() : '';
    setProduct({path: pagePath, name});
  }, [pagePath]);

  const name = productName || (product?.path === pagePath ? product.name : '');
  const url = `${SITE.siteUrl}${pagePath}`;
  const message = name ? `${name}\n${url}` : t('whatsappMessage', {url});

  return <a {...props} href={`${SITE.whatsapp.chatUrl}?text=${encodeURIComponent(message)}`}
    target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function WhatsAppChat() {
  const t = useTranslations('cta');
  return <>
    <style>{`
      .whatsapp-chat {
        position: fixed; right: 20px;
        bottom: calc(max(20px, var(--cookie-banner-offset, 0px)) + env(safe-area-inset-bottom, 0px));
        z-index: 200; display: inline-flex; align-items: center; gap: 9px;
        min-height: 56px; padding: 14px 20px; border-radius: 999px;
        background: #128c4b; color: white; text-decoration: none;
        font: 600 15px/1.2 var(--font-jost), sans-serif;
        box-shadow: 0 6px 24px rgba(0,0,0,.22);
      }
      .whatsapp-chat:hover { background: #0c713b; }
      .whatsapp-chat:focus-visible { outline: 3px solid #C58E4A; outline-offset: 4px; }
      .whatsapp-chat svg { width: 28px; height: 28px; flex-shrink: 0; }
      @media (max-width: 480px) {
        .whatsapp-chat { right: 16px; padding: 13px 16px; font-size: 14px; }
      }
      @media print { .whatsapp-chat { display: none; } }
    `}</style>
    <WhatsAppLink className="whatsapp-chat" aria-label={t('whatsapp')} title={t('whatsapp')}>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33z" />
      </svg>
      <span>WhatsApp</span>
    </WhatsAppLink>
  </>;
}
