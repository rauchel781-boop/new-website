// About — Xiamen Chic Homeware Co.,Ltd.
// Visual system mirrors app/page.js (WOOD palette + Playfair Display + Jost).
import { alternates } from '@/i18n/seo';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: 'About Us — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — five-year-old custom wooden box manufacturer with a sales office in Xiamen and a 15,000 m² factory in Cao County, Shandong. Serving Amazon brands and importers across Europe, the US, Japan and Korea.',
    alternates: alternates(locale, '/about'),
    openGraph: {
      url: `/${locale}/about`,
      title: 'About Us — Xiamen Chic Homeware Co.,Ltd.',
      description:
        'Five-year-old custom wooden box manufacturer with a 15,000 m² factory in Cao County, Shandong, serving Amazon brands and importers worldwide.',
    },
  };
}

// Factory gallery — drop more files into /public/factory/ and add to the array below.
// Captions are shown overlaid on each tile.
const F = (name) => '/factory/' + encodeURIComponent(name);

const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'),    caption: 'Cao County Factory · 15,000 m² site' },
  { src: F('material.jpg'),         caption: 'Solid wood inventory · paulownia, pine, oak' },
  { src: F('1-1.jpg'),            caption: 'Wood-prep workshop' },
  { src: F('painting.jpg'),         caption: 'Dust-controlled spray finishing line' },
  { src: F('1-3.jpg'),            caption: 'Hinge installation · hardware QC' },
  { src: F('warehouse.jpg'),        caption: 'Finished goods warehouse · ready to ship' },
];

// Showroom image used in the founder story section (more polished shot).
const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

// Team & customer photos — files in /public/employees/.
// Replace captions or swap files at any time; the section auto-renders the array.
const E = (name) => '/employees/' + encodeURIComponent(name);
const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                            caption: 'Sales Office · Xiamen, Fujian',  tag: 'Office'   },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'),        caption: 'Hosting our customers',           tag: 'Customer' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'),        caption: 'Hosting an overseas buyer',       tag: 'Customer' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'),        caption: 'Our team',                        tag: 'Team'     },
];

// Production process — files in /public/folder/.
// Filenames use a Chinese full-width colon and space, so we encode the path manually.
const P = (name) => '/folder/' + encodeURIComponent(name);
const PRODUCTION_STEPS = [
  {
    n: '01',
    src: P('1-cutting-to-size.jpg'),
    title: 'Cutting to Size',
    desc: 'Solid lumber and engineered panels are dimensioned on our panel saws. Tolerance is held to ±0.5 mm so every blank fits the next station perfectly.',
  },
  {
    n: '02',
    src: P('2-shape-cutting.jpg'),
    title: 'Shape-Cutting',
    desc: 'CNC routers and band saws cut the curves, mitres and rebates that define each box. Programs are saved per SKU for repeatable mass production.',
  },
  {
    n: '03',
    src: P('3-mortise-cutting.jpg'),
    title: 'Mortise Cutting',
    desc: 'Hinge mortises, lock pockets and divider grooves are routed and chiseled in. This is where joinery accuracy decides how the lid will sit.',
  },
  {
    n: '04',
    src: P('4-pre-assemble.jpg'),
    title: 'Pre-Assembly',
    desc: 'Panels are dry-fit and gauge-checked before any glue. Hardware is test-installed first — every fit confirmed before final glue-up.',
  },
  {
    n: '05',
    src: P('5-polishing.jpg'),
    title: 'Polishing & Sanding',
    desc: 'Multi-grit sanding from 120 → 400 produces the silk-smooth surface our finish team needs. Edges eased, corners rounded, dust extracted at source.',
  },
  {
    n: '06',
    src: P('6-packaging.jpeg'),
    title: 'Packaging & QC',
    desc: 'Each box is inspected, wiped, and packed with corner protectors and shrink-wrap. Cartons are labelled to your spec — FBA-ready or master-carton.',
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Jost:wght@300;400;500;600&display=swap');

.about {
  --blue-dark: #3D2A1F;
  --blue-mid:  #6B4A33;
  --blue-warm: #C58E4A;
  --blue-light:#D9B98F;
  --cream:     #F6EEDF;
  --sand:      #ECDFC6;
  --charcoal:  #2A1B12;
  --text-muted:#7A6450;

  font-family: 'Jost', system-ui, sans-serif;
  background: var(--cream);
  color: var(--charcoal);
  overflow-x: hidden;
}
.about *, .about *::before, .about *::after { box-sizing: border-box; }

/* ─── HERO ─── */
.about-hero {
  position: relative;
  min-height: 540px;
  background:
    linear-gradient(135deg, rgba(61,42,31,0.85) 0%, rgba(107,74,51,0.6) 60%, rgba(61,42,31,0.55) 100%),
    linear-gradient(180deg, #3D2A1F 0%, #6B4A33 50%, #3D2A1F 100%);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.about-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(197,142,74,0.05) 60px, rgba(197,142,74,0.05) 62px);
}
.about-hero-inner {
  position: relative; z-index: 2;
  width: 100%; max-width: 1300px;
  padding: 100px 60px 90px;
  color: var(--cream);
}
.about-eyebrow { font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase; color: var(--blue-warm); margin-bottom: 20px; }
.about-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.1; margin: 0 0 22px;
  max-width: 900px;
}
.about-h1 em { color: var(--blue-light); font-style: italic; }
.about-sub {
  font-size: 1.05rem;
  color: rgba(246,238,223,0.85);
  line-height: 1.85;
  font-weight: 300;
  max-width: 720px;
  margin: 0;
}

/* ─── STATS ─── */
.about-stats {
  background: var(--blue-dark);
  padding: 50px 60px;
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid rgba(197,142,74,0.2);
}
.about-stat { text-align: center; padding: 0 16px; position: relative; }
.about-stat:not(:last-child)::after {
  content: '';
  position: absolute; right: 0; top: 10%; height: 80%; width: 1px;
  background: rgba(197,142,74,0.2);
}
.about-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 2.6rem;
  color: var(--blue-light);
  line-height: 1;
}
.about-stat-num span { font-size: 1.3rem; color: var(--blue-warm); }
.about-stat-label {
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 10px;
}

/* ─── COMMON SECTION ─── */
.about-section { padding: 100px 60px; }
.about-section-inner { max-width: 1300px; margin: 0 auto; }
.about-section-label {
  font-size: 0.65rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--blue-warm);
  margin-bottom: 14px;
}
.about-section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.9rem, 3vw, 2.5rem);
  color: var(--blue-dark);
  line-height: 1.2;
  margin: 0 0 14px;
}
.about-section-title em { color: var(--blue-mid); font-style: italic; }
.about-section-line { width: 48px; height: 2px; background: var(--blue-warm); margin: 18px 0 0; }

/* ─── STORY (founder + intro) ─── */
.about-story { background: var(--cream); }
.about-story-grid {
  display: grid; grid-template-columns: 1fr 1.15fr;
  gap: 80px; align-items: start;
}
.about-story-text p {
  font-size: 0.96rem;
  color: var(--text-muted);
  line-height: 1.9;
  font-weight: 300;
  margin: 0 0 18px;
}
.about-story-text p strong { color: var(--blue-dark); font-weight: 500; }
.about-story-features {
  margin-top: 30px;
  display: flex; flex-direction: column; gap: 14px;
}
.about-feat {
  display: flex; align-items: center; gap: 14px;
  font-size: 0.9rem; color: var(--blue-dark); font-weight: 500;
}
.about-feat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--blue-warm); flex-shrink: 0; }
.about-story-visual {
  position: relative;
  height: 540px;
  background: linear-gradient(135deg, #3D2A1F 0%, #6B4A33 50%, #C58E4A 100%);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 28px 70px rgba(0,0,0,0.18);
}
.about-story-visual img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.92; }
.about-story-tag {
  position: absolute; top: 24px; right: 24px;
  background: rgba(61,42,31,0.7);
  border: 1px solid rgba(197,142,74,0.4);
  color: var(--blue-light);
  padding: 8px 16px;
  font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
  border-radius: 2px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.about-story-cap {
  position: absolute; bottom: 24px; left: 24px; right: 24px;
  color: var(--cream);
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  line-height: 1.4;
}

/* ─── TIMELINE ─── */
.about-timeline { background: var(--sand); }
.about-tl-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; margin-top: 60px; position: relative; }
.about-tl-grid::before {
  content: '';
  position: absolute;
  top: 36px; left: 5%; right: 5%;
  height: 1px;
  background: rgba(197,142,74,0.35);
  z-index: 0;
}
.about-tl-card {
  background: white;
  padding: 32px 22px 26px;
  border-radius: 2px;
  border-top: 3px solid var(--blue-warm);
  position: relative;
  z-index: 1;
}
.about-tl-year {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  color: var(--blue-warm);
  margin-bottom: 10px;
  font-weight: 700;
  line-height: 1;
}
.about-tl-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: var(--blue-dark);
  margin: 0 0 8px;
  line-height: 1.35;
}
.about-tl-text {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.65;
  font-weight: 300;
}

/* ─── TWO LOCATIONS ─── */
.about-loc { background: var(--blue-dark); color: var(--cream); }
.about-loc .about-section-title { color: var(--cream); }
.about-loc .about-section-label { color: var(--blue-warm); }
.about-loc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 60px; }
.about-loc-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(197,142,74,0.18);
  padding: 44px 38px;
  border-radius: 2px;
  display: flex; flex-direction: column;
  gap: 16px;
}
.about-loc-eyebrow {
  font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--blue-warm); font-weight: 500;
}
.about-loc-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--blue-light);
  margin: 0;
}
.about-loc-role { font-size: 0.85rem; color: rgba(246,238,223,0.6); font-style: italic; font-weight: 300; }
.about-loc-addr {
  font-size: 0.92rem;
  color: rgba(246,238,223,0.85);
  line-height: 1.7;
  font-weight: 300;
  border-top: 1px solid rgba(197,142,74,0.18);
  padding-top: 18px;
  margin: 12px 0 0;
}
.about-loc-detail-list {
  display: flex; flex-direction: column; gap: 10px;
  font-size: 0.85rem;
  color: rgba(246,238,223,0.78);
  font-weight: 300;
}
.about-loc-detail-list li { display: flex; gap: 12px; align-items: baseline; list-style: none; }
.about-loc-detail-list li::before {
  content: '◆';
  color: var(--blue-warm);
  font-size: 0.6rem;
  flex-shrink: 0;
}

/* ─── FACTORY GALLERY ─── */
.about-gallery { background: var(--cream); }
.about-gal-head {
  display: flex; justify-content: space-between; align-items: end;
  flex-wrap: wrap; gap: 14px; margin-bottom: 36px;
}
.about-gal-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 280px 280px 260px;
  gap: 16px;
}
.about-gal-item {
  position: relative; overflow: hidden; border-radius: 4px;
  background: var(--sand);
  transition: transform .35s ease;
  cursor: zoom-in;
}
.about-gal-item img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .6s ease;
}
.about-gal-item:hover img { transform: scale(1.06); }
.about-gal-item:nth-child(1) { grid-row: 1 / 3; }
.about-gal-item:nth-child(6) { grid-column: 1 / 4; }
.about-gal-item::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(61,42,31,0.7) 100%);
  pointer-events: none;
}
.about-gal-cap {
  position: absolute; bottom: 14px; left: 16px; right: 16px;
  color: var(--cream);
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
  z-index: 1;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

/* ─── MARKETS ─── */
.about-markets { background: var(--charcoal); color: var(--cream); position: relative; overflow: hidden; }
.about-markets::before {
  content: 'WORLDWIDE';
  position: absolute; top: -10px; left: -20px;
  font-family: 'Playfair Display', serif;
  font-size: 12rem; color: rgba(197,142,74,0.05); font-weight: 700;
  line-height: 1; pointer-events: none; white-space: nowrap;
}
.about-markets .about-section-inner { position: relative; }
.about-markets .about-section-title { color: var(--cream); }
.about-markets .about-section-label { color: var(--blue-warm); }
.about-markets-text {
  max-width: 760px;
  font-size: 0.98rem;
  color: rgba(246,238,223,0.75);
  line-height: 1.95;
  font-weight: 300;
  margin: 0 0 50px;
}
.about-markets-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
  margin-top: 40px;
}
.about-market-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(197,142,74,0.12);
  padding: 36px 28px;
  text-align: center;
}
.about-market-flag { font-size: 2rem; margin-bottom: 10px; }
.about-market-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  color: var(--blue-light);
  margin-bottom: 6px;
}
.about-market-text {
  font-size: 0.78rem;
  color: rgba(217,185,143,0.55);
  line-height: 1.7;
  font-weight: 300;
}
.about-amazon {
  margin-top: 50px;
  padding: 32px 36px;
  background: linear-gradient(90deg, rgba(197,142,74,0.12) 0%, transparent 100%);
  border-left: 3px solid var(--blue-warm);
  border-radius: 2px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 28px;
  align-items: center;
}
.about-amazon-icon {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: var(--blue-warm);
  line-height: 1;
}
.about-amazon-text {
  font-size: 0.95rem;
  color: rgba(246,238,223,0.8);
  line-height: 1.7;
  font-weight: 300;
}
.about-amazon-text strong { color: var(--blue-light); font-weight: 500; }

/* ─── VALUES ─── */
.about-values { background: var(--cream); }
.about-val-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 50px; }
.about-val-card {
  background: white;
  padding: 44px 32px;
  border-top: 3px solid var(--blue-warm);
  transition: transform .2s, box-shadow .25s;
}
.about-val-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(61,42,31,0.12);
}
.about-val-num {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: rgba(197,142,74,0.3);
  line-height: 1;
  margin-bottom: 14px;
}
.about-val-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: var(--blue-dark);
  margin: 0 0 12px;
}
.about-val-text {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.8;
  font-weight: 300;
}

/* ─── CERTS ─── */
.about-certs { background: var(--sand); }
.about-cert-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 60px; align-items: center; margin-top: 40px; }
.about-cert-text p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.85;
  font-weight: 300;
  margin: 0;
}
.about-cert-badges {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
}
.about-cert-badge {
  background: white;
  padding: 28px 16px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid rgba(197,142,74,0.2);
  transition: border-color .2s, transform .2s;
}
.about-cert-badge:hover { border-color: var(--blue-warm); transform: translateY(-2px); }
.about-cert-badge.is-pending { opacity: 0.55; border-style: dashed; }
.about-cert-icon { font-size: 1.7rem; margin-bottom: 8px; }
.about-cert-name {
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--blue-mid);
  font-weight: 500;
}
.about-cert-status {
  font-size: 0.6rem;
  color: var(--text-muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-top: 4px;
  font-style: italic;
}

/* ─── TEAM & CUSTOMERS ─── */
.about-team { background: var(--cream); }
.about-team-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  grid-template-rows: 260px 260px;
  gap: 16px;
  margin-top: 50px;
}
.about-team-item {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: var(--sand);
  cursor: zoom-in;
  transition: transform .35s ease, box-shadow .35s ease;
}
.about-team-item img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .6s ease;
}
.about-team-item:hover { box-shadow: 0 24px 60px rgba(61,42,31,0.18); }
.about-team-item:hover img { transform: scale(1.05); }
.about-team-item::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 45%, rgba(61,42,31,0.78) 100%);
  pointer-events: none;
}
.about-team-item:nth-child(1) { grid-row: 1 / 3; }
.about-team-tag {
  position: absolute; top: 14px; left: 16px;
  background: rgba(61,42,31,0.7);
  border: 1px solid rgba(197,142,74,0.4);
  color: var(--blue-light);
  padding: 5px 12px;
  font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase;
  border-radius: 2px;
  z-index: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-weight: 500;
}
.about-team-cap {
  position: absolute; bottom: 16px; left: 18px; right: 18px;
  color: var(--cream);
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  line-height: 1.4;
  z-index: 1;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}
.about-team-item:nth-child(1) .about-team-cap { font-size: 1.25rem; }

/* ─── PRODUCTION PROCESS ─── */
.about-prod { background: var(--sand); position: relative; overflow: hidden; }
.about-prod::before {
  content: 'PROCESS';
  position: absolute; top: -30px; right: -10px;
  font-family: 'Playfair Display', serif;
  font-size: 14rem; color: rgba(197,142,74,0.05);
  font-weight: 700; line-height: 1;
  pointer-events: none; white-space: nowrap;
}
.about-prod .about-section-inner { position: relative; }
.about-prod-intro {
  max-width: 720px;
  font-size: 0.96rem;
  color: var(--text-muted);
  line-height: 1.85;
  font-weight: 300;
  margin: 22px 0 50px;
}
.about-prod-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.about-prod-card {
  background: white;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(197,142,74,0.18);
  border-top: 3px solid var(--blue-warm);
  transition: transform .25s ease, box-shadow .25s ease;
  display: flex; flex-direction: column;
}
.about-prod-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(61,42,31,0.14);
}
.about-prod-img {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--sand);
}
.about-prod-img img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .6s ease;
}
.about-prod-card:hover .about-prod-img img { transform: scale(1.06); }
.about-prod-num {
  position: absolute; top: 14px; left: 16px;
  background: var(--blue-warm);
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(61,42,31,0.35);
  font-weight: 600;
  z-index: 1;
}
.about-prod-body { padding: 26px 24px 28px; flex: 1; display: flex; flex-direction: column; }
.about-prod-title {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--blue-dark);
  margin: 0 0 10px;
  letter-spacing: -0.2px;
}
.about-prod-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 300;
  margin: 0;
}

/* ─── CTA ─── */
.about-cta {
  padding: 130px 60px;
  background: linear-gradient(135deg, #3D2A1F 0%, #6B4A33 50%, #3D2A1F 100%);
  text-align: center;
  color: var(--cream);
  position: relative;
  overflow: hidden;
}
.about-cta::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(197,142,74,0.03) 30px, rgba(197,142,74,0.03) 31px);
}
.about-cta-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
.about-cta-label { font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: var(--blue-warm); margin-bottom: 18px; }
.about-cta-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  margin: 0 0 18px;
  line-height: 1.2;
}
.about-cta-sub {
  font-size: 1rem;
  color: rgba(217,185,143,0.75);
  margin-bottom: 40px;
  font-weight: 300;
  line-height: 1.7;
}
.about-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.about-btn-primary {
  background: var(--blue-warm); color: white;
  padding: 16px 36px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px;
  transition: background .2s, transform .2s;
}
.about-btn-primary:hover { background: #D9A05E; transform: translateY(-2px); }
.about-btn-outline {
  border: 1px solid rgba(217,185,143,0.5);
  color: var(--blue-light);
  padding: 16px 36px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px;
  transition: all .2s;
}
.about-btn-outline:hover { border-color: var(--blue-light); background: rgba(217,185,143,0.08); }

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .about-tl-grid { grid-template-columns: repeat(2, 1fr); }
  .about-tl-grid::before { display: none; }
  .about-markets-grid { grid-template-columns: repeat(2, 1fr); }
  .about-cert-grid { grid-template-columns: 1fr; gap: 32px; }
  .about-cert-badges { grid-template-columns: repeat(2, 1fr); }
  .about-prod-grid { grid-template-columns: repeat(2, 1fr); }
  .about-team-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 220px 220px 220px; }
  .about-team-item:nth-child(1) { grid-row: auto; grid-column: 1 / 3; }
}
@media (max-width: 960px) {
  .about-hero-inner { padding: 70px 28px 60px; }
  .about-stats { grid-template-columns: repeat(2, 1fr); padding: 32px 24px; gap: 24px 0; }
  .about-stat:nth-child(2)::after { display: none; }
  .about-section { padding: 70px 28px; }
  .about-story-grid { grid-template-columns: 1fr; gap: 50px; }
  .about-story-visual { height: 360px; }
  .about-loc-grid { grid-template-columns: 1fr; }
  .about-gal-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px 200px; }
  .about-gal-item:nth-child(1) { grid-row: auto; }
  .about-gal-item:nth-child(6) { grid-column: 1 / 3; }
  .about-val-grid { grid-template-columns: 1fr; }
  .about-amazon { grid-template-columns: 1fr; gap: 14px; padding: 24px 22px; }
  .about-cta { padding: 80px 28px; }
  .about-team-grid { grid-template-columns: 1fr; grid-template-rows: repeat(4, 220px); }
  .about-team-item:nth-child(1) { grid-column: auto; }
  .about-prod-grid { grid-template-columns: 1fr; }
  .about-prod-img { height: 200px; }
}
`;

export default function AboutPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <div className="about">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-eyebrow">About Xiamen Chic Homeware</div>
          <h1 className="about-h1">
            Five Years of <em>Wood Craft.</em><br />
            Two Locations. One Promise.
          </h1>
          <p className="about-sub">
            Xiamen Chic Homeware Co.,Ltd. is a custom wooden homeware manufacturer
            built to serve the modern import market — from Amazon brand owners and
            European retailers to Japanese and Korean wholesalers. A young factory
            with deep industry roots: founder-led, factory-direct, export-ready.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="about-stats">
        <div className="about-stat">
          <div className="about-stat-num">5<span>+</span></div>
          <div className="about-stat-label">Years in Business</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">15,000<span> m²</span></div>
          <div className="about-stat-label">Factory Floor</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">120<span>+</span></div>
          <div className="about-stat-label">Skilled Workers</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">40<span>+</span></div>
          <div className="about-stat-label">Export Markets</div>
        </div>
      </div>

      {/* ── STORY (founder + intro) ── */}
      <section className="about-section about-story">
        <div className="about-section-inner about-story-grid">
          <div className="about-story-text">
            <div className="about-section-label">Our Story</div>
            <h2 className="about-section-title">
              Built by Wood People,<br /><em>for Brand People.</em>
            </h2>
            <div className="about-section-line" />
            <p style={{ marginTop: 28 }}>
              <strong>Xiamen Chic Homeware Co.,Ltd. was founded in 2021</strong> by a
              team of veterans from China&apos;s wood products industry. Our founder
              spent more than two decades inside the wood trade — walking timber yards in
              Cao County, running CNC programs in Heze, and managing export orders out
              of Xiamen — before starting Chic to do things differently.
            </p>
            <p>
              The premise was simple: combine a real factory in <strong>Cao County,
              Shandong</strong> — the historic heart of China&apos;s wooden box industry —
              with a modern sales office in <strong>Xiamen, Fujian</strong>, one of
              the country&apos;s leading export gateways. One side handles the wood;
              the other side handles the world.
            </p>
            <p>
              Five years in, we serve hundreds of brands across Europe, North America,
              Japan and Korea — including a long roster of Amazon private-label
              sellers who count on our quick turnaround and consistent finish.
            </p>

            <div className="about-story-features">
              <div className="about-feat"><div className="about-feat-dot" /> Founder-led, no trading-company markup</div>
              <div className="about-feat"><div className="about-feat-dot" /> Factory floor + sales office under one company</div>
              <div className="about-feat"><div className="about-feat-dot" /> 20+ years of wood-industry experience at the top</div>
              <div className="about-feat"><div className="about-feat-dot" /> Built specifically for export — not domestic resale</div>
            </div>
          </div>

          <div className="about-story-visual">
            <div className="about-story-tag">Showroom · Xiamen</div>
            <img src={SHOWROOM_IMG} alt="Xiamen Chic Homeware showroom — finished wooden products" width="1200" height="900" />
            <div className="about-story-cap">
              &ldquo;Cao County is where the world&apos;s wooden boxes are made.
              We&apos;re proud to be from here.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="about-section about-timeline">
        <div className="about-section-inner">
          <div className="about-section-label">Five-Year Journey</div>
          <h2 className="about-section-title">From Workshop to <em>Worldwide</em></h2>
          <div className="about-section-line" />

          <div className="about-tl-grid">
            <div className="about-tl-card">
              <div className="about-tl-year">2021</div>
              <h3 className="about-tl-title">Founded</h3>
              <p className="about-tl-text">
                Xiamen Chic Homeware Co.,Ltd. registered in Xiamen.
                Founder secures partner workshop in Cao County and ships first export pallets.
              </p>
            </div>
            <div className="about-tl-card">
              <div className="about-tl-year">2022</div>
              <h3 className="about-tl-title">First Factory</h3>
              <p className="about-tl-text">
                Lease signed on dedicated 6,000 m² production site in Pulianji Town.
                Onboarded first European wine-box client.
              </p>
            </div>
            <div className="about-tl-card">
              <div className="about-tl-year">2023</div>
              <h3 className="about-tl-title">Amazon Boom</h3>
              <p className="about-tl-text">
                Built dedicated small-MOQ line for Amazon private-label brands.
                Crossed 1 million units shipped in a single year.
              </p>
            </div>
            <div className="about-tl-card">
              <div className="about-tl-year">2024</div>
              <h3 className="about-tl-title">FSC Certified</h3>
              <p className="about-tl-text">
                Achieved FSC chain-of-custody certification.
                Expanded factory to 15,000 m² with new finishing and QC area.
              </p>
            </div>
            <div className="about-tl-card">
              <div className="about-tl-year">2025</div>
              <h3 className="about-tl-title">Going Global</h3>
              <p className="about-tl-text">
                Active customers in 40+ countries.
                In-house ID + 3D mockup team launched to support OEM/ODM growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO LOCATIONS ── */}
      <section className="about-section about-loc">
        <div className="about-section-inner">
          <div className="about-section-label">Two Locations</div>
          <h2 className="about-section-title">Xiamen + <em>Cao County</em></h2>
          <div className="about-section-line" />

          <div className="about-loc-grid">
            <div className="about-loc-card">
              <div className="about-loc-eyebrow">Sales Office</div>
              <h3 className="about-loc-name">Xiamen, Fujian</h3>
              <div className="about-loc-role">Sales · design · export documentation</div>
              <p className="about-loc-addr">
                101, No. 8 Houweizhaiding Road, Maluan, Xinglin, Jimei District,
                Xiamen, Fujian, China
              </p>
              <ul className="about-loc-detail-list">
                <li>Account management &amp; English-speaking sales team</li>
                <li>3D rendering, sample coordination, freight booking</li>
                <li>Ten minutes from Xiamen Gaoqi International Airport</li>
                <li>Container shipping via Xiamen Port — 130+ direct global routes</li>
              </ul>
            </div>

            <div className="about-loc-card">
              <div className="about-loc-eyebrow">Production Factory</div>
              <h3 className="about-loc-name">Cao County, Shandong</h3>
              <div className="about-loc-role">Manufacturing · finishing · QC · packing</div>
              <p className="about-loc-addr">
                North of the Administration for Market Regulation Office,
                Pulianji Village, Pulianji Town, Cao County, Heze City, Shandong Province, China
              </p>
              <ul className="about-loc-detail-list">
                <li>15,000 m² floor with CNC, laser, finishing &amp; assembly lines</li>
                <li>120+ skilled workers across two production shifts</li>
                <li>Local access to paulownia, pine, bamboo, walnut and oak</li>
                <li>Direct rail container service to Qingdao &amp; Lianyungang ports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM & CUSTOMERS ── */}
      <section className="about-section about-team">
        <div className="about-section-inner">
          <div className="about-gal-head">
            <div>
              <div className="about-section-label">Our People</div>
              <h2 className="about-section-title">The Team — &amp; the <em>Customers</em> Who Visit Us</h2>
              <div className="about-section-line" />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 320 }}>
              We&apos;re a small, founder-led team in Xiamen, and we love hosting the buyers, brand
              owners and Amazon sellers who come to see how their boxes are made.
            </div>
          </div>

          <div className="about-team-grid">
            {TEAM_IMAGES.map((img, i) => (
              <div className="about-team-item" key={i}>
                <img src={img.src} alt={img.caption} loading={i === 0 ? 'eager' : 'lazy'} width="1200" height="900" />
                <div className="about-team-tag">{img.tag}</div>
                <div className="about-team-cap">{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACTORY GALLERY ── */}
      <section className="about-section about-gallery">
        <div className="about-section-inner">
          <div className="about-gal-head">
            <div>
              <div className="about-section-label">Inside the Factory</div>
              <h2 className="about-section-title">A Look at Our <em>Cao County Site</em></h2>
              <div className="about-section-line" />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 320 }}>
              From timber yard to finished crate — every step happens under one roof,
              under our own people&apos;s eyes.
            </div>
          </div>

          <div className="about-gal-grid">
            {FACTORY_IMAGES.map((img, i) => (
              <div className="about-gal-item" key={i}>
                <img src={img.src} alt={img.caption} loading={i === 0 ? 'eager' : 'lazy'} width="1200" height="900" />
                <div className="about-gal-cap">{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTION PROCESS ── */}
      <section className="about-section about-prod">
        <div className="about-section-inner">
          <div className="about-section-label">How a Box Gets Made</div>
          <h2 className="about-section-title">Six Steps from <em>Lumber to Doorstep</em></h2>
          <div className="about-section-line" />
          <p className="about-prod-intro">
            Every wooden box that leaves our Cao County factory passes through the same six
            production stations. Photographed below in our own workshop — no stock images, no third-party
            sourcing, every shot taken on our shop floor.
          </p>

          <div className="about-prod-grid">
            {PRODUCTION_STEPS.map((s) => (
              <div className="about-prod-card" key={s.n}>
                <div className="about-prod-img">
                  <span className="about-prod-num">{s.n}</span>
                  <img src={s.src} alt={s.title} loading="lazy" width="1200" height="900" />
                </div>
                <div className="about-prod-body">
                  <h3 className="about-prod-title">{s.title}</h3>
                  <p className="about-prod-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETS ── */}
      <section className="about-section about-markets">
        <div className="about-section-inner">
          <div className="about-section-label">Where Our Boxes Go</div>
          <h2 className="about-section-title">Export to <em>Developed Markets</em></h2>
          <div className="about-section-line" />
          <p className="about-markets-text" style={{ marginTop: 28 }}>
            We focus exclusively on developed-market exports — countries where buyers
            expect consistent quality, accurate documentation, and on-time delivery.
            Our team speaks English, prepares export paperwork to spec, and works on
            your timezone. No surprises at customs.
          </p>

          <div className="about-markets-grid">
            <div className="about-market-card">
              <div className="about-market-flag">🇪🇺</div>
              <div className="about-market-name">Europe</div>
              <div className="about-market-text">UK, Germany, France, Netherlands, Italy, Spain — REACH-compliant finishes, EU phytosanitary certificates standard.</div>
            </div>
            <div className="about-market-card">
              <div className="about-market-flag">🇺🇸</div>
              <div className="about-market-name">North America</div>
              <div className="about-market-text">United States &amp; Canada — CARB P2 finishes, FBA-ready packaging available, weekly LCL consolidations.</div>
            </div>
            <div className="about-market-card">
              <div className="about-market-flag">🇯🇵</div>
              <div className="about-market-name">Japan</div>
              <div className="about-market-text">Tokyo, Osaka, Nagoya — JIS-grade tolerance standards, JAS-compliant labeling on request.</div>
            </div>
            <div className="about-market-card">
              <div className="about-market-flag">🇰🇷</div>
              <div className="about-market-name">Korea</div>
              <div className="about-market-text">Seoul, Busan — KC-mark labeling supported, fast Incheon &amp; Busan port routes from Xiamen.</div>
            </div>
          </div>

          <div className="about-amazon">
            <div className="about-amazon-icon">A.</div>
            <div className="about-amazon-text">
              <strong>We are an Amazon-friendly manufacturer.</strong>
              {' '}A large share of our 200+ active customers are Amazon private-label
              brands across the US, UK and Germany marketplaces. We ship FBA-ready
              cartons with FNSKU labels, provide UPC barcoding, and meet Amazon&apos;s
              packaging and dimensional weight rules out of the box.
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="about-section about-values">
        <div className="about-section-inner">
          <div className="about-section-label">How We Work</div>
          <h2 className="about-section-title">What Sets Us <em>Apart</em></h2>
          <div className="about-section-line" />

          <div className="about-val-grid">
            <div className="about-val-card">
              <div className="about-val-num">01</div>
              <h3 className="about-val-title">Real Factory, Not a Trader</h3>
              <p className="about-val-text">
                Our 15,000 m² Cao County factory is owned and operated by Chic Homeware
                directly — there is no middleman, no markup chain, and no telephone game
                between you and the production floor.
              </p>
            </div>
            <div className="about-val-card">
              <div className="about-val-num">02</div>
              <h3 className="about-val-title">Built for Small + Mid Volume</h3>
              <p className="about-val-text">
                Most factories want 5,000-pc orders. We are built around 200 to 5,000
                piece runs — the volume that matters to Amazon brand owners, Etsy sellers,
                gift retailers, and brand launches.
              </p>
            </div>
            <div className="about-val-card">
              <div className="about-val-num">03</div>
              <h3 className="about-val-title">English-Speaking Sales</h3>
              <p className="about-val-text">
                Our Xiamen office handles your project end-to-end in fluent English —
                from quoting to artwork to shipping documents. Time-zone overlap with
                EU and US morning hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTS ── */}
      <section className="about-section about-certs">
        <div className="about-section-inner">
          <div className="about-section-label">Standards &amp; Compliance</div>
          <h2 className="about-section-title">Certifications</h2>
          <div className="about-section-line" />

          <div className="about-cert-grid">
            <div className="about-cert-text">
              <p>
                Our wood is sourced from FSC-certified forestry channels, and we operate
                a chain-of-custody program to keep audit trails clean from log to carton.
                Additional standards listed below are on our 2026 roadmap as customer
                demand grows.
              </p>
            </div>
            <div className="about-cert-badges">
              <div className="about-cert-badge">
                <div className="about-cert-icon">🌲</div>
                <div className="about-cert-name">FSC</div>
                <div className="about-cert-status">Certified</div>
              </div>
              <div className="about-cert-badge is-pending">
                <div className="about-cert-icon">🇪🇺</div>
                <div className="about-cert-name">EU REACH</div>
                <div className="about-cert-status">2026 Roadmap</div>
              </div>
              <div className="about-cert-badge is-pending">
                <div className="about-cert-icon">✅</div>
                <div className="about-cert-name">CARB P2</div>
                <div className="about-cert-status">2026 Roadmap</div>
              </div>
              <div className="about-cert-badge is-pending">
                <div className="about-cert-icon">🏅</div>
                <div className="about-cert-name">ISO 9001</div>
                <div className="about-cert-status">In Process</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <div className="about-cta-label">Talk to Us</div>
          <h2 className="about-cta-title">
            Let&apos;s Build Something<br />Together
          </h2>
          <p className="about-cta-sub">
            Tell us about your project — wood type, sizes, quantity, and any branding
            requirements. We respond within 24 hours.
          </p>
          <div className="about-cta-btns">
            <a href="https://wa.me/8618960098762" className="about-btn-primary" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp / WeChat
            </a>
            <a href="tel:+8618960098762" className="about-btn-outline">
              📞 +86 189 6009 8762
            </a>
            <a href="mailto:info@xmchichomeware.com" className="about-btn-outline">
              ✉ info@xmchichomeware.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}