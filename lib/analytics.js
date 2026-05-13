// Tiny analytics helper — just a safe wrapper around window.gtag so call sites
// don't have to remember to guard for "is gtag loaded yet" / "did the visitor
// even accept cookies".
//
// window.gtag is exposed by components/GoogleAnalytics.jsx after the visitor
// accepts cookies (cookie banner consent === 'accepted'). Before that, gtag
// doesn't exist and trackEvent is a silent no-op — exactly what we want.

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch (e) {
    // never let analytics throw into the calling code
  }
}
