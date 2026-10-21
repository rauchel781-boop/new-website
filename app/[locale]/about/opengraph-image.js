// Shared card copy revision: 2026-10-21. Update this entry and its alt when lib/og-card text changes so image URLs refresh.
import { ogCard, size, contentType } from '@/lib/og-card';
import { SITE } from '@/data/site-config';

export { size, contentType };
export const alt = `About CHIC — Custom Wooden Box Manufacturer, Founded in ${SITE.company.foundingYear}`;

export default function Image() {
  return ogCard({
    eyebrow: '✦ Our Story',
    title: `Founded in ${SITE.company.foundingYear}.`,
    subtitle:
      `Founded in ${SITE.company.foundingYear} · 120+ artisans · Cao County factory with a Xiamen export base.`,
  });
}
