'use client';

// Sticky inquiry CTA shown at the bottom of product detail pages on
// mobile. Two buttons: WhatsApp (one-tap chat) and Email (mailto).
//
// Why product detail pages only:
//   PDP visitors have the highest intent — they're already looking at
//   a specific SKU. A sticky CTA captures that intent before they
//   scroll past it. Showing this on /blog or /about would feel pushy.
//
// Why mobile-only:
//   Desktop users have the full-width inquiry section visible in the
//   hero CTA buttons + product tabs. They don't need a sticky bar.
//   On mobile the natural scroll fold pushes those CTAs off-screen
//   quickly — that's where this fills the gap.
//
// Why bottom-left (not bottom-right):
//   Tawk.to chat widget already occupies bottom-right. Two competing
//   bottom-right widgets is bad UX. Bottom-LEFT keeps both visible.
//
// Why not always show on first render:
//   We delay 800ms after mount so the page renders + LCP image
//   completes first. The CTA is not LCP-critical and shouldn't
//   compete with the hero image for paint priority.

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SITE } from '@/data/site-config';
import { trackEvent } from '@/lib/analytics';

export default function StickyInquiryCta({ productName }) {
  const t = useTranslations('cta');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(id);
  }, []);

  // Build a contextual WhatsApp message with the product name pre-filled.
  // This is a huge conversion lever — buyer doesn't have to type, just send.
  const waMessage = encodeURIComponent(
    productName
      ? `Hi CHIC team — interested in your "${productName}" product. Could you share MOQ, lead time, and pricing?`
      : `Hi CHIC team — could you send your product catalog?`,
  );
  const waHref = `${SITE.whatsapp.chatUrl}?text=${waMessage}`;

  const mailSubject = encodeURIComponent(
    productName ? `Inquiry: ${productName}` : 'Product inquiry',
  );
  const mailHref = `mailto:${SITE.email}?subject=${mailSubject}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className={`sticky-cta ${visible ? 'is-visible' : ''}`}
        role="region"
        aria-label="Quick inquiry"
      >
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-cta-btn sticky-cta-wa"
          onClick={() => trackEvent('whatsapp_click', { source: 'pdp_sticky' })}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21z"/>
          </svg>
          <span>WhatsApp</span>
        </a>
        <a
          href={mailHref}
          className="sticky-cta-btn sticky-cta-email"
          onClick={() => trackEvent('email_click', { source: 'pdp_sticky' })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>{t('emailUs')}</span>
        </a>
      </div>
    </>
  );
}

const CSS = `
.sticky-cta {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 200;
  display: flex;
  gap: 8px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .3s ease, transform .3s ease;
  pointer-events: none;
}
.sticky-cta.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.sticky-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 16px;
  border-radius: 100px;
  font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  transition: transform .15s ease, box-shadow .15s ease;
}
.sticky-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.3);
}
.sticky-cta-btn svg {
  width: 18px; height: 18px;
  flex-shrink: 0;
}
.sticky-cta-wa {
  background: #25D366;
  color: #FFFFFF;
}
.sticky-cta-wa:hover { background: #1FB759; }
.sticky-cta-email {
  background: #C58E4A;
  color: #1F140C;
}
.sticky-cta-email:hover { background: #D9A05E; }

/* Show only on mobile (≤ 768px). Desktop visitors already see the
   inquiry section in the PDP hero / sticky-aside; they don't need this. */
@media (min-width: 769px) {
  .sticky-cta { display: none; }
}

/* On very narrow phones, drop the icon labels and show icon-only pills
   so the bar doesn't crowd the chat widget. */
@media (max-width: 360px) {
  .sticky-cta-btn span { display: none; }
  .sticky-cta-btn { padding: 12px; }
}
`;
