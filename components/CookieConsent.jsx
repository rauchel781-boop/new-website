'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { readConsent, writeConsent } from '@/lib/cookie-consent';

// ─── Context ───────────────────────────────────────────────────────────────
// Shape: { consent: 'accepted' | 'declined' | null, setConsent: fn, hydrated: boolean }
// `hydrated` lets consumers wait until we've read the real cookie on the
// client before reacting — important to avoid flashing a "no consent" state
// during SSR/CSR hydration.
const CookieConsentContext = createContext({
  consent: null,
  setConsent: () => {},
  hydrated: false,
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

// ─── Provider ──────────────────────────────────────────────────────────────
// Wrap the app with this once. Reads cookie on mount and exposes state.
export function CookieConsentProvider({ children }) {
  const [consent, setConsentState] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsentState(readConsent());
    setHydrated(true);
  }, []);

  const setConsent = useCallback((value) => {
    writeConsent(value);
    setConsentState(value);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent, hydrated }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

// ─── Banner UI ─────────────────────────────────────────────────────────────
const BANNER_CSS = `
.cookie-banner {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 9999;
  background: linear-gradient(180deg, #2A1B12 0%, #1F140C 100%);
  color: #F6EEDF;
  border: 1px solid rgba(197,142,74,0.25);
  border-radius: 8px;
  box-shadow: 0 16px 50px rgba(0,0,0,0.45);
  font-family: var(--font-jost), system-ui, sans-serif;
  animation: cookieBannerIn 0.35s cubic-bezier(.2,.7,.3,1) both;
  max-width: 920px;
  margin: 0 auto;
}
.cookie-banner-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 22px;
}
.cookie-banner-text {
  flex: 1;
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: rgba(246,238,223,0.85);
}
.cookie-banner-text a {
  color: #C58E4A;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.cookie-banner-text a:hover { color: #D9B98F; }
.cookie-banner-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}
.cookie-btn {
  font-family: inherit;
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 11px 22px;
  border-radius: 4px;
  cursor: pointer;
  transition: background .2s, color .2s, border-color .2s, transform .15s;
  white-space: nowrap;
}
.cookie-btn:active { transform: translateY(1px); }
.cookie-btn-primary {
  background: #C58E4A;
  border: 1px solid #C58E4A;
  color: #1F140C;
}
.cookie-btn-primary:hover { background: #D9A05E; border-color: #D9A05E; }
.cookie-btn-secondary {
  background: transparent;
  border: 1px solid rgba(217,185,143,0.35);
  color: rgba(246,238,223,0.85);
}
.cookie-btn-secondary:hover { border-color: #D9B98F; color: #D9B98F; }

@keyframes cookieBannerIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 720px) {
  .cookie-banner { bottom: 12px; left: 12px; right: 12px; }
  .cookie-banner-inner { flex-direction: column; align-items: stretch; padding: 16px 18px; gap: 14px; }
  .cookie-banner-text { font-size: 0.82rem; }
  .cookie-banner-actions { justify-content: flex-end; }
  .cookie-btn { flex: 1; padding: 11px 14px; font-size: 0.7rem; }
}
`;

export function CookieBanner() {
  const t = useTranslations('cookie');
  const { consent, setConsent, hydrated } = useCookieConsent();

  // Don't render until we've read the cookie on the client. Otherwise the
  // banner would briefly flash for visitors who already accepted.
  if (!hydrated) return null;
  if (consent !== null) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BANNER_CSS }} />
      <div className="cookie-banner" role="dialog" aria-label={t('dialogLabel')} aria-live="polite">
        <div className="cookie-banner-inner">
          <p className="cookie-banner-text">
            {t.rich('message', {
              privacy: (chunks) => <Link href="/privacy">{chunks}</Link>,
            })}
          </p>
          <div className="cookie-banner-actions">
            <button
              type="button"
              onClick={() => setConsent('declined')}
              className="cookie-btn cookie-btn-secondary"
            >
              {t('decline')}
            </button>
            <button
              type="button"
              onClick={() => setConsent('accepted')}
              className="cookie-btn cookie-btn-primary"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
