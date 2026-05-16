// Recently-viewed products — localStorage-backed memory of the last 6
// products a visitor opened on this device.
//
// Why this matters for B2B:
//   B2B procurement cycles often stretch over multiple sessions — a
//   buyer compares 3-5 options over a week before sending an inquiry.
//   Surfacing "the boxes you were just looking at" on the catalog page
//   removes the friction of re-navigating through 17 categories ×
//   186 products to find the ones they care about.
//
// Design notes:
//   - localStorage key: `chic.recently-viewed.v1` (versioned so we can
//     change shape later without polluting existing visitors' data)
//   - Cap at 6 entries to keep the strip on screen on mobile portrait
//   - LRU-style: any push moves the entry to the front
//   - Stored as plain JSON array — no extra deps

const KEY = 'chic.recently-viewed.v1';
const MAX = 6;

// Browser-only — guard against SSR / pre-hydration calls.
function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

// Read the stored list. Returns [] if nothing or if the data is
// corrupt (e.g. user manually edited DevTools, or another tab wrote
// garbage). Never throws.
export function readRecentlyViewed() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Drop anything that doesn't look like a valid entry (slug + categorySlug required).
    return parsed.filter((e) => e && typeof e.slug === 'string' && typeof e.categorySlug === 'string').slice(0, MAX);
  } catch {
    return [];
  }
}

// Push a product to the front. If it's already in the list, move it
// to the front. Returns the new list.
export function pushRecentlyViewed(entry) {
  if (!isBrowser() || !entry?.slug) return [];
  try {
    const current = readRecentlyViewed();
    const deduped = current.filter((e) => e.slug !== entry.slug);
    const next = [
      {
        slug: entry.slug,
        categorySlug: entry.categorySlug,
        name: entry.name,
        image: entry.image,
        ts: Date.now(),
      },
      ...deduped,
    ].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

// Clear the list (used by the "Clear" button on the recently-viewed strip).
export function clearRecentlyViewed() {
  if (!isBrowser()) return;
  try { window.localStorage.removeItem(KEY); } catch {}
}
