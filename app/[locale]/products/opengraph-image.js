import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC — Custom Wooden Box Catalogue (OEM/ODM)';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Product Catalogue',
    title: 'Custom Wooden Boxes, Built to Spec.',
    subtitle:
      'Gift, watch & jewelry, tea, wine and storage boxes — OEM/ODM from a single 15,000 m² factory.',
  });
}
