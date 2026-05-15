// Dynamically generated favicon — Next.js 14 Metadata Files API.
// Renders a 32×32 PNG with a "C" mark on a wood-tone background.
// Sits at /icon — Next.js automatically wires it as <link rel="icon">.
//
// Why a generated icon (not a static .ico):
//   - No binary file to maintain / version control
//   - Tone matches the brand wood palette (--wd-warm = #C58E4A)
//   - 32×32 is the standard browser-tab size; ImageResponse handles
//     2x rendering automatically
//
// If you want to swap in a hand-designed logo instead, drop
// `public/favicon.ico` and `public/apple-icon.png` (180×180) and
// delete this file — Next.js Metadata Files will pick those up.

import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'serif',
          letterSpacing: -1,
        }}
      >
        C
      </div>
    ),
    { ...size },
  );
}
