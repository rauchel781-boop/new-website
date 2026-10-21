// Shared card copy revision: 2026-10-21. Update this entry and its alt when lib/og-card text changes so image URLs refresh.
import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'CHIC Wooden Box Manufacturing — OEM and ODM Capabilities';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Manufacturing Capabilities',
    title: 'From Sketch to Shipment.',
    subtitle:
      'CNC cutting, laser engraving, hand finishing and in-house QC — full OEM/ODM under one roof.',
  });
}
