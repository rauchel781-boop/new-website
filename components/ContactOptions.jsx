'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {SITE} from '@/data/site-config';

function useContactContext(productName, pageUrl) {
  const pathname = usePathname();
  const locale = useLocale();
  const [product, setProduct] = useState(null);
  const pagePath = pathname || `/${locale}`;

  useEffect(() => {
    // Shared layout buttons also carry the current product after client navigation.
    const name = /^\/[a-z]{2}\/products\/[a-z0-9-]+\/[a-z0-9-]+$/.test(pagePath)
      ? document.querySelector('main h1')?.textContent?.trim() : '';
    setProduct({path: pagePath, name});
  }, [pagePath]);

  const name = productName || (product?.path === pagePath ? product.name : '');
  return {name, url: pageUrl || `${SITE.siteUrl}${pagePath}`};
}

export function WhatsAppLink({children, productName, pageUrl, ...props}) {
  const t = useTranslations('cta');
  const {name, url} = useContactContext(productName, pageUrl);
  const message = name ? `${name}\n${url}` : t('whatsappMessage', {url});

  return <a {...props} href={`${SITE.whatsapp.chatUrl}?text=${encodeURIComponent(message)}`}
    target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function EmailLink({children, productName, pageUrl, ...props}) {
  const t = useTranslations('contactOptions');
  const tCta = useTranslations('cta');
  const {name, url} = useContactContext(productName, pageUrl);
  const message = name ? `${name}\n${url}` : tCta('whatsappMessage', {url});
  return <a {...props} href={`mailto:${SITE.email}?subject=${encodeURIComponent(name || t('emailSubject'))}&body=${encodeURIComponent(message)}`}>{children}</a>;
}

export function ContactChoices({productName, pageUrl}) {
  const t = useTranslations('contactOptions');
  return <div className="contact-options" role="group" aria-label={t('label')}>
    <EmailLink productName={productName} pageUrl={pageUrl} className="contact-choice contact-choice-email">
      <strong>{t('email')}</strong><span>{t('emailNote')}</span>
    </EmailLink>
    <WhatsAppLink productName={productName} pageUrl={pageUrl} className="contact-choice contact-choice-whatsapp">
      <strong>WhatsApp</strong><span>{t('whatsappNote')}</span>
    </WhatsAppLink>
  </div>;
}

export default function ContactDock() {
  const t = useTranslations('contactOptions');
  return <aside className="contact-dock" aria-label={t('label')}><ContactChoices /></aside>;
}

