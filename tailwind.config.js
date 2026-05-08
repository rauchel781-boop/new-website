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
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
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
