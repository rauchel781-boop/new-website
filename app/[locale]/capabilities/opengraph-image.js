import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC Manufacturing Capabilities — From Sketch to Shipment';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Manufacturing Capabilities',
    title: 'From Sketch to Shipment.',
    subtitle:
      'CNC cutting, laser engraving, hand finishing and in-house QC — full OEM/ODM under one roof.',
  });
}
