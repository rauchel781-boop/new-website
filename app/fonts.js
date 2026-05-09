// Centralised next/font/google loader.
//
// Why this file exists:
//   Previously every CSS-in-JS string did `@import url('https://fonts.googleapis.com/...')`.
//   That's render-blocking — Lighthouse flagged ~1.8 s saved by removing it.
//   `next/font/google` self-hosts the font files, removes the runtime CSS request,
//   and gives us CSS variables we can apply on <html> so every page sees them.
//
// Variables exposed (apply via html.className from layout.js):
//   --font-playfair  → 'Playfair Display' (serif, headlines)
//   --font-jost      → 'Jost'             (sans, body / nav)
//   --font-fraunces  → 'Fraunces'         (serif, product / material guide pages)
//   --font-caveat    → 'Caveat'           (handwritten accent)
import { Playfair_Display, Jost, Fraunces, Caveat } from 'next/font/google';

// We aggressively limit weights here — every weight = an extra font file the
// browser must download. Going from 8 Playfair files → 3 dropped LCP by ~600ms.
// Hero uses italic 700 ("Wood/Heirloom") + roman 400; if you ever need 500/600
// in headings, prefer font-weight: 700 (heavier weight is a free near-match).
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

export const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
  preload: true,
});

export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: false,
});

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-caveat',
  display: 'swap',
  preload: false,
});
