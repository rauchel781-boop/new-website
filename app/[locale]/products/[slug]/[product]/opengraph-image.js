// Dynamic Open Graph image for every product detail page.
//
// 1200×630 PNG used by LinkedIn / Twitter / Facebook / Slack preview cards
// when someone shares a PDP link.
//
// Layout:
//   - Left half: product hero photo (loaded from public/ at build time)
//   - Right half: product name + CHIC brand mark + category pill
//
// File convention `app/[locale]/products/[slug]/[product]/opengraph-image.js`
// auto-wires this output as `<meta property="og:image">` on every PDP URL.
// Overrides the root `app/opengraph-image.js` brand card.
//
// Built statically at build time (parent route has generateStaticParams).
// Falls back to a generic CHIC card if the hero image can't be loaded.

import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

import { PRODUCTS as GIFT_PACKAGING_PRODUCTS } from '@/data/products/gift-packaging';
import { PRODUCTS as WATCH_JEWELRY_PRODUCTS } from '@/data/products/watch-jewelry';
import { PRODUCTS as TEA_COFFEE_PRODUCTS } from '@/data/products/tea-coffee';
import { PRODUCTS as WINE_WHISKY_PRODUCTS } from '@/data/products/wine-whisky';
import { PRODUCTS as KITCHEN_DINING_PRODUCTS } from '@/data/products/kitchen-dining';
import { PRODUCTS as GARDEN_SEED_PRODUCTS } from '@/data/products/garden-seed';
import { PRODUCTS as STORAGE_PRODUCTS } from '@/data/products/storage';
import { PRODUCTS as HINGED_PRODUCTS } from '@/data/products/hinged';
import { PRODUCTS as SLIDING_LID_PRODUCTS } from '@/data/products/sliding-lid';
import { PRODUCTS as DRAWER_PRODUCTS } from '@/data/products/drawer';
import { PRODUCTS as MAGNETIC_PRODUCTS } from '@/data/products/magnetic';
import { PRODUCTS as WITH_LOCK_PRODUCTS } from '@/data/products/with-lock';
import { PRODUCTS as PAULOWNIA_PRODUCTS } from '@/data/products/paulownia';
import { PRODUCTS as PINE_PRODUCTS } from '@/data/products/pine';
import { PRODUCTS as BAMBOO_PRODUCTS } from '@/data/products/bamboo';
import { PRODUCTS as ACACIA_PRODUCTS } from '@/data/products/acacia';
import { PRODUCTS as WALNUT_PRODUCTS } from '@/data/products/walnut';
import { getProductTranslation } from '@/data/products/translations';

const PRODUCTS_BY_CATEGORY = {
  'gift-packaging': GIFT_PACKAGING_PRODUCTS,
  'watch-jewelry': WATCH_JEWELRY_PRODUCTS,
  'tea-coffee': TEA_COFFEE_PRODUCTS,
  'wine-whisky': WINE_WHISKY_PRODUCTS,
  'kitchen-dining': KITCHEN_DINING_PRODUCTS,
  'garden-seed': GARDEN_SEED_PRODUCTS,
  'storage': STORAGE_PRODUCTS,
  'hinged': HINGED_PRODUCTS,
  'sliding-lid': SLIDING_LID_PRODUCTS,
  'drawer': DRAWER_PRODUCTS,
  'magnetic': MAGNETIC_PRODUCTS,
  'with-lock': WITH_LOCK_PRODUCTS,
  'paulownia': PAULOWNIA_PRODUCTS,
  'pine': PINE_PRODUCTS,
  'bamboo': BAMBOO_PRODUCTS,
  'acacia': ACACIA_PRODUCTS,
  'walnut': WALNUT_PRODUCTS,
};

export const alt = 'CHIC custom wooden box product';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// `params` are auto-passed by Next.js metadata file convention —
// the parent route's generateStaticParams (in ./page.js) determines
// which PDPs get built, and each one gets a matching OG image
// generated alongside its HTML.
export default async function OgImage({ params }) {
  const products = PRODUCTS_BY_CATEGORY[params.slug];
  const raw = products?.[params.product];
  if (!raw) return renderFallback();

  const product = { ...raw, ...getProductTranslation(raw.slug, params.locale) };
  const heroPath = product.images?.[0];

  // Try to load the hero image bytes from public/ → data: URL so
  // <img> inside ImageResponse can render it at build time without
  // a network request (works on Vercel and Coolify alike).
  let heroDataUrl = null;
  if (heroPath) {
    try {
      const abs = path.join(process.cwd(), 'public', heroPath);
      const buf = fs.readFileSync(abs);
      const ext = (heroPath.split('.').pop() || 'webp').toLowerCase();
      const mime =
        ext === 'png'  ? 'image/png'  :
        ext === 'jpg'  ? 'image/jpeg' :
        ext === 'jpeg' ? 'image/jpeg' :
        ext === 'webp' ? 'image/webp' :
                         'application/octet-stream';
      heroDataUrl = `data:${mime};base64,${buf.toString('base64')}`;
    } catch {
      // Fall through — render text-only card if hero is missing on disk
    }
  }

  const name = product.name || 'Custom Wooden Box';
  // Trim product intro for a short description line
  const blurb = (product.intro || '').replace(/\s+/g, ' ').trim().slice(0, 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'linear-gradient(135deg, #1F140C 0%, #3D2A1F 60%, #6B4A33 100%)',
          color: '#F6EEDF',
          fontFamily: 'serif',
        }}
      >
        {/* Left: product image panel */}
        <div
          style={{
            width: 600,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              heroDataUrl
                ? '#0E0805'
                : 'linear-gradient(135deg, #2A1B12 0%, #4A3424 100%)',
            overflow: 'hidden',
          }}
        >
          {heroDataUrl ? (
            <img
              src={heroDataUrl}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                fontSize: 32,
                color: 'rgba(217,185,143,0.5)',
                fontFamily: 'serif',
              }}
            >
              CHIC
            </div>
          )}
        </div>

        {/* Right: text panel */}
        <div
          style={{
            width: 600,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 60px',
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 8,
                background:
                  'linear-gradient(135deg, #6B4A33 0%, #C58E4A 100%)',
                color: '#F6EEDF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                fontFamily: 'serif',
              }}
            >
              C
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#F6EEDF',
                  letterSpacing: -0.5,
                }}
              >
                CHIC
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(217,185,143,0.7)',
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                  fontFamily: 'sans-serif',
                }}
              >
                Wooden Expert
              </div>
            </div>
          </div>

          {/* Product name + blurb */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: '#C58E4A',
                letterSpacing: 4,
                textTransform: 'uppercase',
                fontWeight: 600,
                fontFamily: 'sans-serif',
              }}
            >
              ✦ Custom Wooden Box
            </div>
            <div
              style={{
                fontSize: name.length > 40 ? 38 : name.length > 28 ? 46 : 54,
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F6EEDF',
                letterSpacing: -1,
              }}
            >
              {name}
            </div>
            {blurb ? (
              <div
                style={{
                  fontSize: 18,
                  color: 'rgba(217,185,143,0.85)',
                  lineHeight: 1.45,
                  fontFamily: 'sans-serif',
                }}
              >
                {blurb}
              </div>
            ) : null}
          </div>

          {/* URL */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(197,142,74,0.3)',
              paddingTop: 20,
            }}
          >
            <div
              style={{
                fontSize: 17,
                color: 'rgba(217,185,143,0.9)',
                fontFamily: 'sans-serif',
              }}
            >
              custom-woodenbox.com
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(217,185,143,0.55)',
                fontFamily: 'sans-serif',
                letterSpacing: 2.5,
                textTransform: 'uppercase',
              }}
            >
              OEM · ODM · FSC
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

function renderFallback() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #1F140C 0%, #3D2A1F 50%, #6B4A33 100%)',
          color: '#F6EEDF',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 700 }}>CHIC</div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(217,185,143,0.7)',
            marginTop: 18,
            fontFamily: 'sans-serif',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Custom Wooden Box Manufacturer
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
