'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SITE, isEmailJSConfigured } from '@/data/site-config';
import { useEmailJS } from '@/lib/use-emailjs';
import { trackEvent } from '@/lib/analytics';

/**
 * NewsletterForm — reusable email subscription form.
 *
 * Props:
 *   source         — string label sent to EmailJS / mailto (e.g. "Footer", "Blog page")
 *   placeholder    — input placeholder text (callers should pass a localized string)
 *   buttonLabel    — submit button label (callers should pass a localized string)
 *   sendingLabel   — submit button label while sending (callers should pass a localized string)
 *   className      — optional wrapper class for styling integration
 *
 * Status messages (thanks / error / openingMail / shortConsent) come from the
 * `newsletterForm` namespace so they translate automatically based on locale.
 *
 * Inherits its parent's CSS (e.g. `.news-form`, `.news-input`, `.news-btn`).
 */
export default function NewsletterForm({
  source = 'Newsletter',
  placeholder = 'Your business email',
  buttonLabel = 'Subscribe →',
  sendingLabel,
  inputClassName = 'news-input',
  buttonClassName = 'news-btn',
  rowClassName = 'news-row',
  msgClassName = 'news-msg',
  fineClassName = '',
  showFine = false,
}) {
  const t = useTranslations('newsletterForm');
  const tCta = useTranslations('cta');
  const { ready, send } = useEmailJS();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');

  // Caller can override sendingLabel; otherwise fall back to the shared cta.sending key.
  const sending = sendingLabel || tCta('sending');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    setMsg('');

    if (isEmailJSConfigured() && ready) {
      try {
        await send(SITE.emailjs.newsletterTemplateId, { email, source });
        setState('done');
        setMsg(t('thanks'));
        setEmail('');
        trackEvent('newsletter_subscribed', { source });
      } catch {
        setState('error');
        setMsg(t('error'));
      }
    } else {
      const subject = encodeURIComponent('Newsletter subscription');
      const body = encodeURIComponent(`Please subscribe me to the CHIC newsletter.\n\nEmail: ${email}\nSource: ${source}`);
      trackEvent('newsletter_subscribed', { source: `${source} (mailto fallback)` });
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setState('done');
      setMsg(t('openingMail'));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="news-form" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className={rowClassName} style={{ display: 'flex', gap: 10 }}>
        <input
          type="email"
          required
          placeholder={placeholder}
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === 'sending'}
          style={{ flex: 1 }}
        />
        <button type="submit" className={buttonClassName} disabled={state === 'sending'}>
          {state === 'sending' ? sending : buttonLabel}
        </button>
      </div>
      {msg && <p className={`${msgClassName} ${state === 'error' ? 'error' : ''}`} style={{ margin: 0, fontSize: '0.78rem' }}>{msg}</p>}
      {showFine && (
        <span className={fineClassName} style={{ fontSize: '0.66rem', letterSpacing: 1, color: 'rgba(217,185,143,0.45)' }}>
          {t('shortConsent')}
        </span>
      )}
    </form>
  );
}
