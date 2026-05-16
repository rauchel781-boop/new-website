'use client';

// Side-effect-only component that records the current product as
// "recently viewed" in localStorage. Mount this on the product detail
// page; it renders nothing.
//
// Why a component (not a useEffect inlined in the page):
//   The PDP itself is a server component (async + getTranslations).
//   Server components can't run client-side effects, so we delegate
//   the localStorage write to this tiny client island.

import { useEffect } from 'react';
import { pushRecentlyViewed } from '@/lib/recently-viewed';

export default function RecentlyViewedTracker({ slug, categorySlug, name, image }) {
  useEffect(() => {
    if (!slug || !categorySlug) return;
    pushRecentlyViewed({ slug, categorySlug, name, image });
  }, [slug, categorySlug, name, image]);
  return null;
}
