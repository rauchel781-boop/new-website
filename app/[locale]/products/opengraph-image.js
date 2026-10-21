// Shared card copy revision: 2026-10-21. Update this entry and its alt when lib/og-card text changes so image URLs refresh.
import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC Custom Wooden Box Catalogue — Gift, Wine and Storage Boxes';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Product Catalogue',
    title: 'Custom Wooden Boxes, Built to Spec.',
    subtitle:
      'Gift, watch & jewelry, tea, wine and storage boxes — OEM/ODM from a single 20,000 m² factory.',
  });
}
