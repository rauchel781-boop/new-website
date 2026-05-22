import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC Material Guide — Choosing the Right Wood';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Material Guide',
    title: 'Choosing the Right Wood.',
    subtitle:
      'Paulownia, pine, bamboo, acacia and walnut — grain, cost and durability compared.',
  });
}
