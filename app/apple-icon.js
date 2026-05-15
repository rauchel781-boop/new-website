// Dynamically generated apple-touch-icon for iOS home-screen.
// 180×180 PNG matching the favicon style but at the iOS-required size.
// Next.js automatically wires it as <link rel="apple-touch-icon">.

import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6B4A33 0%, #C58E4A 100%)',
          color: '#F6EEDF',
          fontSize: 120,
          fontWeight: 700,
          fontFamily: 'serif',
          letterSpacing: -4,
        }}
      >
        C
      </div>
    ),
    { ...size },
  );
}
