// Shared card copy revision: 2026-10-21. Update this entry and its alt when lib/og-card text changes so image URLs refresh.
import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC Wood Fabrication — Custom Box Construction and Finishing';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Wood Fabrication',
    title: 'Precision Wooden Box Fabrication.',
    subtitle:
      'Cutting, joinery, finishing and custom hardware for bespoke packaging at production scale.',
  });
}
