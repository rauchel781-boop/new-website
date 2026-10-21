// Shared card copy revision: 2026-10-21. Update this entry and its alt when lib/og-card text changes so image URLs refresh.
import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'Contact CHIC — Wooden Box Quotes by Email or WhatsApp';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Get a Quote',
    title: "Let's Build Your Box.",
    subtitle:
      'Send your specs for a fast OEM/ODM quote · MOQ-friendly · Ships to 60+ countries from Xiamen.',
  });
}
