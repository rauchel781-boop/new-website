const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Remove the `X-Powered-By: Next.js` response header — gives potential
  // attackers one less data point about our stack.
  poweredByHeader: false,

  // Strip console.* calls from production bundles (smaller JS payload).
  // We keep console.error so genuine runtime errors still surface in Sentry-like
  // tools and the browser's error console.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // 301 redirect: non-www → www. We canonicalize on www because:
  //  - The DNS record + Coolify proxy answer both bare apex and www,
  //    but the apparent rendered URL in browsers is www.
  //  - Canonical / OG / hreflang are all anchored on www version.
  //  - Keeping both addresses live without redirect creates
  //    duplicate-content signals (Google may indexed both).
  // This redirect runs at the edge (Next.js middleware-level), so it
  // hits BEFORE any rendering — minimal latency.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'custom-woodenbox.com', // bare apex, no www
          },
        ],
        destination: 'https://www.custom-woodenbox.com/:path*',
        permanent: true, // 301 — tells Google "this moved permanently"
      },
    ];
  },

  // Security HTTP response headers, applied to every route.
  // We skip CSP / Strict-Transport-Security here — CSP is fiddly with
  // Tawk.to + EmailJS + GA4 and is better tightened iteratively against
  // a real CSP report endpoint; HSTS is best handled at the reverse
  // proxy (Coolify / Nginx) so the lifetime survives container restarts.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevent the site from being iframed by an attacker domain
          // (clickjacking). SAMEORIGIN allows our own pages to embed
          // each other if ever needed; Tawk.to embeds its own iframe
          // onto OUR page, which is unaffected by this header.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Stop browsers from MIME-sniffing response bodies, which
          // can turn an innocuous upload into a script-execution.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Send the origin (but not the full URL) when navigating to
          // third-party sites — balances privacy and analytics utility.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable browser features we don't use. Reduces attack
          // surface from a compromised third-party script.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
