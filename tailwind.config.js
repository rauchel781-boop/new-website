/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CHIC wooden expert — palette derived from the logo (deep teal + warm wood)
        brand: {
          // legacy "navy" keys kept for backward compatibility, now mapped to teal
          navy:      '#234654', // primary teal (logo cube)
          navyDark:  '#1A3540', // header / darker teal
          navyDeep:  '#112430', // footer / deepest teal
          // legacy "yellow" keys kept for backward compatibility, now mapped to warm wood
          yellow:     '#C9A876', // warm wood accent (CTA, highlights)
          yellowSoft: '#E8D9BC', // soft sand for hover
          // semantic aliases (preferred going forward)
          teal:       '#234654',
          tealDark:   '#1A3540',
          tealDeep:   '#112430',
          wood:       '#C9A876',
          woodSoft:   '#E8D9BC',
          cream:      '#F5F1E8',
          ink:        '#1A1A1A',
          mute:       '#6B7280',
        },
      },
      fontFamily: {
        // Map Tailwind's font-{family} classes to the next/font CSS variables
        // defined in app/fonts.js. Default sans is Jost (body / nav). For
        // headlines use `font-serif` (Playfair) or the `font-fraunces` class.
        sans:     ['var(--font-jost)',     'system-ui', 'sans-serif'],
        serif:    ['var(--font-playfair)', 'serif'],
        fraunces: ['var(--font-fraunces)', 'serif'],
        caveat:   ['var(--font-caveat)',   'cursive'],
      },
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1280px',
        },
      },
    },
  },
  plugins: [],
};
