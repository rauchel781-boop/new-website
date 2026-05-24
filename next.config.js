const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images (served via /_next/image) for 7 days instead of the
    // 60s default. Safe because the optimizer cache key includes source URL +
    // width + quality; a moderate TTL avoids serving a stale optimized variant
    // for too long if a source photo is ever replaced under the same filename.
    minimumCacheTTL: 604800,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'custom-woodenbox.com' }],
        destination: 'https://www.custom-woodenbox.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        ],
      },
      {
        // Long-lived caching for static media + fonts served from /public.
        // Next serves these with max-age=0 by default, so repeat visitors
        // re-download large product/factory photos on every visit. 7-day cache
        // (no `immutable`, since these filenames are not content-hashed) plus a
        // day of stale-while-revalidate keeps repeat loads fast without a long
        // stale window if an asset is swapped under the same name.
        source: '/:path*.(jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
