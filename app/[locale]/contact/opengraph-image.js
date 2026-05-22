import { ogCard, size, contentType } from '@/lib/og-card';

export { size, contentType };
export const alt = 'Contact CHIC — Get a Custom Wooden Box Quote';

export default function Image() {
  return ogCard({
    eyebrow: '✦ Get a Quote',
    title: "Let's Build Your Box.",
    subtitle:
      'Send your specs for a fast OEM/ODM quote · MOQ-friendly · Ships to 60+ countries from Xiamen.',
  });
}
