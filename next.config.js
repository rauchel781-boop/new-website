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
};

module.exports = withNextIntl(nextConfig);
