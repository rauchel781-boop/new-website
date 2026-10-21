// Shared card copy revision: 2026-10-21. Update this entry and its alt when lib/og-card text changes so image URLs refresh.
import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC Material Guide — Woods for Custom Wooden Boxes';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Material Guide',
    title: 'Choosing the Right Wood.',
    subtitle:
      'Paulownia, pine, bamboo, acacia and walnut — grain, cost and durability compared.',
  });
}
