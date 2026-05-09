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

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
  display: 'swap',
});
