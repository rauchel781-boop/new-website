import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC Wood Fabrication — Precision Box Manufacturing';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Wood Fabrication',
    title: 'Precision Wooden Box Fabrication.',
    subtitle:
      'Cutting, joinery, finishing and custom hardware for bespoke packaging at production scale.',
  });
}
