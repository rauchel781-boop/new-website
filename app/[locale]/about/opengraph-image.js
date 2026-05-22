import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'About CHIC — A Decade of Custom Wooden Box Craft';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Our Story',
    title: 'A Decade of Wooden Craft.',
    subtitle:
      'Family-run since 2010 · 120+ artisans · Cao County factory with a Xiamen export base.',
  });
}
