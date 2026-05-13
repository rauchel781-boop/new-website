// Cookie-consent storage helpers.
//
// We store the visitor's choice in a first-party cookie (not localStorage) so:
//   1) It's server-readable later if we ever need to gate something at SSR
//   2) It expires automatically after 365 days (good practice — don't keep
//      a stale "yes" forever)
//   3) The choice itself doesn't require consent to record (consent state
//      cookies are considered "strictly necessary" under GDPR / ePrivacy)

export const COOKIE_NAME = 'cookie_consent';
export const COOKIE_EXPIRY_DAYS = 365;

// Reads the cookie. Returns 'accepted' | 'declined' | null (no choice yet).
export function readConsent() {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]+)/);
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  return value === 'accepted' || value === 'declined' ? value : null;
}

// Writes the visitor's choice. Pass 'accepted' or 'declined'.
export function writeConsent(value) {
  if (typeof document === 'undefined') return;
  if (value !== 'accepted' && value !== 'declined') return;
  const maxAge = COOKIE_EXPIRY_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}
