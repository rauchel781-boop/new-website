// Shared Open Graph card generator.
//
// Renders a branded 1200×630 CHIC card with a page-specific eyebrow / headline
// / subline, visually identical to the site-wide default in
// `app/opengraph-image.js`. Per-page `opengraph-image.js` files import this so
// every section gets its own purpose-built social preview (LinkedIn / X /
// Slack / WhatsApp) instead of falling back to the generic site card — while
// staying 100% on-brand. Images are generated at build time → zero runtime cost.

import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function ogCard({ eyebrow, title, subtitle }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 90px',
          background:
            'linear-gradient(135deg, #1F140C 0%, #3D2A1F 35%, #6B4A33 75%, #8C6A4A 100%)',
          color: '#F6EEDF',
          fontFamily: 'serif',
        }}
      >
        {/* Top brand row: C logomark + wordmark + tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #6B4A33 0%, #C58E4A 100%)',
              color: '#F6EEDF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 46,
              fontWeight: 700,
              fontFamily: 'serif',
            }}
          >
            C
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: -1,
                color: '#F6EEDF',
              }}
            >
              CHIC
            </div>
            <div
              style={{
                fontSize: 16,
                color: 'rgba(217,185,143,0.75)',
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginTop: 2,
                fontFamily: 'sans-serif',
              }}
            >
              Wooden Expert · Est. 2010
            </div>
          </div>
        </div>

        {/* Page-specific claim */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: '#C58E4A',
              letterSpacing: 5,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontFamily: 'sans-serif',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.08,
              color: '#F6EEDF',
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(217,185,143,0.85)',
              lineHeight: 1.4,
              fontFamily: 'sans-serif',
              maxWidth: 880,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom: URL + trust line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid rgba(197,142,74,0.3)',
            paddingTop: 26,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: 'rgba(217,185,143,0.9)',
              fontFamily: 'sans-serif',
              letterSpacing: 0.5,
            }}
          >
            custom-woodenbox.com
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(217,185,143,0.55)',
              fontFamily: 'sans-serif',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            FSC · EU REACH · CARB · ISO 9001
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
