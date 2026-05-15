// Pass-through root layout. The real <html><body> + Header/Footer live in
// app/[locale]/layout.js so the lang attribute matches the active locale.
//
// We still export `metadata` here so files that don't live under [locale]
// (sitemap.js, robots.js) inherit the metadataBase.
// Favicons are handled by app/icon.js + app/apple-icon.js (file-based
// metadata convention) — they generate properly-sized 32×32 + 180×180
// PNGs at runtime, which is better than serving the 1200px logo.png as
// a favicon. The logo.png is still used for OG / Twitter card images.
import './globals.css';
import { SITE } from '@/data/site-config';

export const metadata = {
  metadataBase: new URL(SITE.siteUrl),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // No maximumScale — WCAG 2.1 SC 1.4.4 (Resize Text) requires users
  // be able to zoom up to 200% (and ideally further) for low-vision
  // accessibility. Setting maximumScale: 5 prevents that on mobile.
  themeColor: '#3D2A1F',
};

export default function RootLayout({ children }) {
  return children;
}
