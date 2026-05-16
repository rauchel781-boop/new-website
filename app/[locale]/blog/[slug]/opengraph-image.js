// Dynamic Open Graph image for every blog article.
// Renders a 1200×630 PNG used by Facebook / LinkedIn / Twitter / Slack
// previews. The article title is rendered over a wood-tone gradient
// with a "CHIC Journal" brand mark and the category pill.
//
// Next.js 14 Metadata Files convention: this file at
//   app/[locale]/blog/[slug]/opengraph-image.js
// auto-wires the generated image as `<meta property="og:image">`
// AND `<meta name="twitter:image">` on every blog article URL.
//
// The image is generated at build time (because the parent route
// has generateStaticParams), so there is no runtime cost per request.

import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/data/blog';
import { getBlogTranslation, getBlogCategoryTranslation } from '@/data/blog/translations';

export const alt = 'CHIC Journal article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }) {
  const enPost = getPostBySlug(params.slug);
  if (!enPost) {
    // No matching post — return a generic Journal card so og:image
    // is never broken (404 would suppress the rich preview entirely).
    return renderFallback();
  }

  // Merge per-locale overlay so the OG image matches the page content
  const overlay = getBlogTranslation(params.slug, params.locale);
  const title = overlay.title || enPost.title;
  const categoryLabel = overlay.category
    || getBlogCategoryTranslation(enPost.category, params.locale)
    || enPost.category;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background:
            'linear-gradient(135deg, #1F140C 0%, #3D2A1F 40%, #6B4A33 100%)',
          color: '#F6EEDF',
          fontFamily: 'serif',
        }}
      >
        {/* Top: brand mark + category pill */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                background:
                  'linear-gradient(135deg, #6B4A33 0%, #C58E4A 100%)',
                color: '#F6EEDF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
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
                  fontWeight: 600,
                  color: '#F6EEDF',
                  letterSpacing: -0.5,
                }}
              >
                CHIC Journal
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'rgba(217,185,143,0.7)',
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                Wooden Expert · Xiamen
              </div>
            </div>
          </div>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 100,
              background: 'rgba(197,142,74,0.18)',
              border: '1px solid rgba(197,142,74,0.4)',
              color: '#C58E4A',
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Middle: article title (the hero element) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: '#C58E4A',
              letterSpacing: 5,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontFamily: 'sans-serif',
            }}
          >
            ✦ Field Notes from the Workshop Floor
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 52 : 64,
              fontWeight: 600,
              lineHeight: 1.15,
              color: '#F6EEDF',
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: URL + decorative rule */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid rgba(197,142,74,0.25)',
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: 'rgba(217,185,143,0.85)',
              fontFamily: 'sans-serif',
              letterSpacing: 0.5,
            }}
          >
            custom-woodenbox.com/blog
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(217,185,143,0.5)',
              fontFamily: 'sans-serif',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Est. 2010
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

// Generic fallback card for unknown slugs (shouldn't normally hit since
// generateStaticParams covers all 10 posts).
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
        <div style={{ fontSize: 96, fontWeight: 700 }}>CHIC Journal</div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(217,185,143,0.7)',
            marginTop: 20,
          }}
        >
          custom-woodenbox.com
        </div>
      </div>
    ),
    { ...size },
  );
}
