#!/usr/bin/env node
/**
 * Recursively convert every .jpg/.jpeg/.png in public/ to a sibling .webp.
 *
 * Idempotent: skips when the .webp already exists and is newer than the source.
 * Run via:  node scripts/convert-to-webp.js
 *
 * Notes:
 * - Originals are kept on disk as fallbacks, but src code references are
 *   swapped to .webp by `scripts/swap-img-refs-to-webp.js`.
 * - Quality 80 is the sweet spot for photos (typically 60-80% smaller than JPEG).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..', 'public');
const QUALITY = 80;
// Skip these — they're served as-is to OG/icon contexts where some crawlers
// historically prefer raster originals. The .webp twin is harmless if generated.
const KEEP_RASTER_AS_PRIMARY = new Set([
  // (logo.png is referenced by metadata/icons; we still generate .webp but the
  // <link rel=icon> stays as .png for max compatibility.)
]);

let converted = 0, skipped = 0, failed = 0;

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full);
    } else if (/\.(jpe?g|png)$/i.test(e.name)) {
      await convert(full);
    }
  }
}

async function convert(src) {
  const out = src.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    if (fs.existsSync(out)) {
      const a = fs.statSync(src).mtimeMs;
      const b = fs.statSync(out).mtimeMs;
      if (b >= a) { skipped++; return; }
    }
    await sharp(src).webp({ quality: QUALITY, effort: 4 }).toFile(out);
    converted++;
    if (converted % 50 === 0) console.log(`  …converted ${converted}`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${src}: ${err.message}`);
  }
}

(async () => {
  console.log(`Scanning ${ROOT}…`);
  const t0 = Date.now();
  await walk(ROOT);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\nDone in ${dt}s — converted=${converted} skipped=${skipped} failed=${failed}`);
})();
