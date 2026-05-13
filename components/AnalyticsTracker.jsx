'use client';

import { useEffect } from 'react';
import { useCookieConsent } from '@/components/CookieConsent';
import { trackEvent } from '@/lib/analytics';

// Global click listener that fires GA4 events for the two B2B-critical
// "soft conversions" we want to track without manually annotating every
// link in the codebase:
//
//   - email_clicked    (any <a href="mailto:..."> click)
//   - whatsapp_clicked (any <a href="https://wa.me/...">)
//
// The listener runs only after the visitor has accepted cookies — and is
// torn down if they later clear / decline consent.
//
// We use capture phase so the event fires even if the link's normal click
// handler stops propagation. Both events are non-blocking (no preventDefault)
// so the link's normal navigation still happens.

export default function AnalyticsTracker() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent !== 'accepted') return;
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    function handleClick(e) {
      // Walk up the DOM looking for the nearest <a> ancestor.
      let el = e.target;
      while (el && el !== document.body && el.tagName !== 'A') {
        el = el.parentElement;
      }
      if (!el || el.tagName !== 'A' || !el.href) return;

      const href = el.href;
      const label = (el.textContent || '').trim().slice(0, 100);
      const page = (typeof window !== 'undefined' && window.location)
        ? window.location.pathname
        : '';

      if (href.startsWith('mailto:')) {
        trackEvent('email_clicked', { link_url: href, link_text: label, page });
      } else if (href.includes('wa.me/') || href.includes('whatsapp.com/')) {
        trackEvent('whatsapp_clicked', { link_url: href, link_text: label, page });
      }
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [consent]);

  return null;
}
