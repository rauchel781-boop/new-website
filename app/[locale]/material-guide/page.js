import { Link } from '@/i18n/navigation';
import { alternates } from '@/i18n/seo';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getMaterialGuide } from '@/data/material-guide';

export async function generateMetadata({ params: { locale } }) {
  const { COPY } = getMaterialGuide(locale);
  return {
    title: COPY.meta.title,
    description: COPY.meta.description,
    alternates: alternates(locale, '/material-guide'),
    openGraph: {
      url: `/${locale}/material-guide`,
      title: COPY.meta.title,
      description: COPY.meta.ogDescription,
    },
  };
}

// ─── DATA ────────────────────────────────────────────────────────────────────
// Detailed wood profiles. Hero/gallery images reuse the same paths the product
// catalog uses, so /public/... assets stay in one place.
// ─── DATA ─────────────────────────────────────────────
// WOODS, FINISHES, BRANDING, HARDWARE definitions moved to
// data/material-guide/{locale}.js. See getMaterialGuide() below.

const CSS = `

.mg {
  --wood-deep:  #3D2A1F;
  --wood-mid:   #6B4A33;
  --wood-warm:  #A07852;
  --wood-light: #D9B98F;
  --cream:      #F6EEDF;
  --cream-dk:   #ECDFC6;
  --grain:      #E5D2B2;
  --accent:     #C58E4A;
  --accent-dk:  #A8763A;
  --charcoal:   #2A1B12;
  --text-muted: #7A6450;

  font-family: var(--font-jost), system-ui, sans-serif;
  background: var(--cream);
  color: var(--charcoal);
  overflow-x: hidden;
}
.mg *, .mg *::before, .mg *::after { box-sizing: border-box; }
.mg a { color: inherit; }

/* ─── HERO ─── */
.mg-hero {
  position: relative;
  background:
    radial-gradient(1200px 400px at 20% 0%, rgba(217,185,143,0.55), transparent 70%),
    radial-gradient(1000px 500px at 100% 100%, rgba(160,120,82,0.35), transparent 70%),
    linear-gradient(180deg, var(--cream) 0%, var(--cream-dk) 100%);
  color: var(--wood-deep);
  padding: 110px 60px 90px;
  overflow: hidden;
  border-bottom: 1px solid rgba(107,74,51,0.12);
}
.mg-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg,
    transparent 0, transparent 110px,
    rgba(107,74,51,0.04) 110px, rgba(107,74,51,0.04) 111px,
    transparent 111px, transparent 220px,
    rgba(107,74,51,0.025) 220px, rgba(107,74,51,0.025) 222px);
  pointer-events: none;
}
.mg-hero-inner { position: relative; z-index: 2; max-width: 1300px; margin: 0 auto; }
.mg-eyebrow {
  font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 18px; font-weight: 600;
}
.mg-h1 {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: clamp(2.4rem, 5vw, 4rem);
  margin: 0 0 20px;
  line-height: 1.05;
  color: var(--wood-deep);
  letter-spacing: -0.5px;
  max-width: 920px;
}
.mg-h1 em {
  font-family: var(--font-caveat), cursive;
  font-style: normal;
  font-weight: 700;
  color: var(--accent);
}
.mg-sub {
  font-family: var(--font-fraunces), serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.1rem;
  color: var(--wood-mid);
  max-width: 760px;
  line-height: 1.8;
  margin: 0;
}
.mg-toc {
  display: flex; gap: 14px; flex-wrap: wrap;
  margin-top: 38px;
}
.mg-toc a {
  background: rgba(255,255,255,0.55);
  border: 1px solid rgba(107,74,51,0.18);
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--wood-deep);
  font-weight: 500;
  transition: background .2s, border-color .2s, transform .2s;
}
.mg-toc a:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  transform: translateY(-2px);
}

/* ─── COMPARISON TABLE ─── */
.mg-compare { padding: 90px 60px 40px; background: var(--cream); }
.mg-section-inner { max-width: 1300px; margin: 0 auto; }
.mg-section-label {
  font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 14px; font-weight: 600;
}
.mg-section-title {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: clamp(1.9rem, 3.4vw, 2.6rem);
  color: var(--wood-deep);
  letter-spacing: -0.3px;
  margin: 0 0 16px;
  line-height: 1.15;
}
.mg-section-title em {
  font-family: var(--font-caveat), cursive;
  font-style: normal;
  color: var(--accent);
}
.mg-section-line { width: 48px; height: 2px; background: var(--accent); margin: 18px 0 36px; }
.mg-section-lede {
  font-family: var(--font-fraunces), serif;
  font-style: italic;
  color: var(--wood-mid);
  font-size: 1rem;
  line-height: 1.8;
  max-width: 760px;
  margin: 0 0 36px;
}

.mg-cmp-wrap {
  background: white;
  border: 1px solid var(--grain);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(61,42,31,0.06);
}
.mg-cmp {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.mg-cmp th, .mg-cmp td {
  padding: 18px 20px;
  text-align: left;
  border-bottom: 1px solid var(--grain);
  vertical-align: middle;
}
.mg-cmp thead th {
  background: var(--cream-dk);
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  color: var(--wood-deep);
  font-size: 0.85rem;
  text-transform: none;
  letter-spacing: 0;
  border-bottom: 2px solid var(--accent);
}
.mg-cmp tbody tr:last-child td { border-bottom: none; }
.mg-cmp tbody tr:hover { background: var(--cream); }
.mg-cmp-name {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  color: var(--wood-deep);
  font-size: 1.05rem;
}
.mg-cmp-tag {
  display: block;
  font-family: var(--font-caveat), cursive;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--accent);
  margin-top: 2px;
  letter-spacing: 0.3px;
}
.mg-cmp-swatch {
  display: inline-block;
  width: 26px; height: 26px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.mg-cmp-price {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 1px;
}
.mg-cmp-price .dim { color: rgba(160,120,82,0.3); }

/* ─── WOOD PROFILE SECTION ─── */
.mg-wood {
  padding: 90px 60px;
}
.mg-wood:nth-of-type(even) { background: var(--cream-dk); }
.mg-wood:nth-of-type(odd)  { background: var(--cream); }
.mg-wood-inner { max-width: 1300px; margin: 0 auto; }
.mg-wood-head {
  display: flex; align-items: end; justify-content: space-between;
  gap: 18px; flex-wrap: wrap;
  margin-bottom: 36px; padding-bottom: 22px;
  border-bottom: 1px solid rgba(107,74,51,0.18);
}
.mg-wood-eyebrow {
  font-size: 0.62rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--accent); font-weight: 600;
  display: flex; align-items: center; gap: 14px;
}
.mg-wood-eyebrow-num {
  font-family: var(--font-fraunces), serif; font-style: italic;
  font-size: 1rem; color: var(--wood-mid); letter-spacing: 0;
}
.mg-wood-h2 {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 3.2rem);
  color: var(--wood-deep);
  margin: 6px 0 4px;
  letter-spacing: -0.5px;
  line-height: 1.05;
}
.mg-wood-h2 em {
  font-family: var(--font-caveat), cursive; font-style: normal;
  color: var(--accent); font-weight: 700;
}
.mg-wood-tagline {
  font-family: var(--font-fraunces), serif; font-style: italic;
  color: var(--wood-mid);
  font-size: 1.05rem; font-weight: 400;
  max-width: 480px;
}
.mg-wood-price {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  color: var(--accent); font-size: 1.4rem;
  letter-spacing: 2px;
}
.mg-wood-price .dim { color: rgba(160,120,82,0.25); }

.mg-wood-body {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 60px;
  align-items: start;
}

.mg-wood-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 320px 180px;
  gap: 12px;
}
.mg-wood-images > div {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: var(--grain);
  box-shadow: 0 16px 36px rgba(61,42,31,0.10);
}
.mg-wood-images > div:first-child { grid-column: 1 / 3; }
.mg-wood-images img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .6s ease;
}
.mg-wood-images > div:hover img { transform: scale(1.05); }

.mg-wood-text p {
  font-size: 0.96rem;
  color: var(--wood-mid);
  line-height: 1.85;
  margin: 0 0 18px;
  font-weight: 400;
}
.mg-wood-text p strong { color: var(--wood-deep); font-weight: 600; }

.mg-wood-props {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 24px 0 28px;
}
.mg-wood-prop {
  background: white;
  border: 1px solid var(--grain);
  padding: 14px 16px;
  border-radius: 3px;
}
.mg-wood-prop-label {
  font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 6px; font-weight: 600;
}
.mg-wood-prop-value {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  color: var(--wood-deep); font-size: 0.95rem;
}

.mg-wood-list-title {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  color: var(--wood-deep); font-size: 1rem;
  margin: 0 0 12px;
}
.mg-wood-list { list-style: none; padding: 0; margin: 0 0 22px; }
.mg-wood-list li {
  position: relative;
  padding: 8px 0 8px 28px;
  font-size: 0.92rem; color: var(--wood-mid);
  line-height: 1.7;
  border-bottom: 1px dashed var(--grain);
}
.mg-wood-list li:last-child { border-bottom: none; }
.mg-wood-list li::before {
  content: '✓';
  position: absolute; left: 4px; top: 8px;
  color: var(--accent); font-weight: 700;
}
.mg-wood-list.is-warn li::before { content: '!'; color: var(--wood-mid); }

.mg-wood-bestfor {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-bottom: 24px;
}
.mg-wood-bestfor span {
  font-size: 0.78rem;
  background: white;
  border: 1px solid var(--grain);
  color: var(--wood-deep);
  padding: 6px 12px;
  border-radius: 999px;
}

.mg-wood-care {
  background: rgba(197,142,74,0.08);
  border-left: 3px solid var(--accent);
  padding: 16px 20px;
  font-size: 0.9rem;
  color: var(--wood-mid);
  line-height: 1.7;
  margin: 0 0 28px;
  font-style: italic;
  font-family: var(--font-fraunces), serif;
}
.mg-wood-care strong { font-style: normal; color: var(--wood-deep); font-weight: 600; }

.mg-wood-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: var(--accent);
  color: white;
  text-decoration: none;
  padding: 14px 28px;
  font-size: 0.78rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 3px;
  transition: background .2s, transform .2s;
}
.mg-wood-cta:hover { background: var(--accent-dk); transform: translateY(-2px); }
.mg-wood-cta-count {
  background: rgba(255,255,255,0.2);
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  letter-spacing: 1px;
}

/* ─── FINISHES ─── */
.mg-finishes { background: var(--wood-deep); color: var(--cream); padding: 110px 60px; }
.mg-finishes .mg-section-label { color: var(--wood-light); }
.mg-finishes .mg-section-title { color: var(--cream); }
.mg-finishes .mg-section-title em { color: var(--wood-light); }
.mg-finishes .mg-section-lede { color: rgba(246,238,223,0.7); }
.mg-finishes .mg-section-line { background: var(--accent); }
.mg-fin-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.mg-fin {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(217,185,143,0.18);
  padding: 30px 26px;
  border-radius: 4px;
  transition: background .2s, border-color .2s, transform .2s;
}
.mg-fin:hover {
  background: rgba(217,185,143,0.08);
  border-color: var(--wood-light);
  transform: translateY(-3px);
}
.mg-fin-swatch {
  width: 44px; height: 44px;
  border-radius: 50%;
  margin-bottom: 18px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.4);
  border: 2px solid rgba(255,255,255,0.1);
}
.mg-fin-name {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  color: var(--cream); font-size: 1.15rem;
  margin: 0 0 10px;
}
.mg-fin-desc {
  font-size: 0.85rem;
  color: rgba(246,238,223,0.7);
  line-height: 1.7;
  font-weight: 300;
  margin: 0 0 14px;
}
.mg-fin-meta { font-size: 0.72rem; color: var(--wood-light); margin: 0; line-height: 1.6; }
.mg-fin-meta strong { color: var(--cream); font-weight: 500; letter-spacing: 0.5px; }

/* ─── BRANDING ─── */
.mg-branding { background: var(--cream); padding: 110px 60px; }
.mg-brand-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.mg-brand {
  background: white;
  border: 1px solid var(--grain);
  border-top: 3px solid var(--accent);
  padding: 32px 28px;
  border-radius: 3px;
  transition: transform .2s, box-shadow .25s, border-color .2s;
  display: flex; flex-direction: column;
}
.mg-brand:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(61,42,31,0.12);
  border-color: var(--accent);
}
.mg-brand-icon {
  font-family: var(--font-caveat), cursive;
  font-size: 2.2rem;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 12px;
}
.mg-brand-name {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  color: var(--wood-deep); font-size: 1.2rem;
  margin: 0 0 12px;
}
.mg-brand-desc {
  font-size: 0.9rem;
  color: var(--wood-mid);
  line-height: 1.75;
  margin: 0 0 18px;
  flex: 1;
}
.mg-brand-meta {
  border-top: 1px dashed var(--grain);
  padding-top: 14px;
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.7;
}
.mg-brand-meta strong {
  color: var(--wood-deep);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 2px;
}

/* ─── HARDWARE ─── */
.mg-hardware { background: var(--cream-dk); padding: 110px 60px; }
.mg-hw-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.mg-hw {
  background: var(--cream);
  border: 1px solid var(--grain);
  padding: 28px 26px;
  border-radius: 3px;
  position: relative;
  transition: transform .2s, box-shadow .2s;
}
.mg-hw:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 44px rgba(61,42,31,0.10);
}
.mg-hw-name {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  color: var(--wood-deep); font-size: 1.1rem;
  margin: 0 0 10px;
}
.mg-hw-desc {
  font-size: 0.88rem;
  color: var(--wood-mid);
  line-height: 1.75;
  margin: 0 0 18px;
}
.mg-hw-row {
  display: flex; justify-content: space-between;
  padding: 8px 0;
  border-top: 1px dashed var(--grain);
  font-size: 0.78rem;
  color: var(--text-muted);
  gap: 18px;
}
.mg-hw-row strong {
  color: var(--wood-deep); font-weight: 600;
  font-size: 0.65rem; letter-spacing: 1.5px; text-transform: uppercase;
  flex-shrink: 0;
}
.mg-hw-row span { text-align: right; }

/* ─── SUSTAINABILITY ─── */
.mg-eco {
  background: linear-gradient(135deg, var(--cream) 0%, var(--cream-dk) 100%);
  padding: 110px 60px;
  position: relative;
  overflow: hidden;
}
.mg-eco::before {
  content: 'FSC';
  position: absolute; top: -40px; right: -20px;
  font-family: var(--font-fraunces), serif;
  font-size: 18rem; color: rgba(160,120,82,0.06);
  font-weight: 700; line-height: 1;
  pointer-events: none;
}
.mg-eco-inner {
  max-width: 1300px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
}
.mg-eco-pts { display: flex; flex-direction: column; gap: 18px; margin-top: 22px; }
.mg-eco-pt {
  background: white;
  border-left: 3px solid var(--accent);
  padding: 18px 22px;
  border-radius: 0 3px 3px 0;
  box-shadow: 0 6px 20px rgba(61,42,31,0.05);
}
.mg-eco-pt h4 {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  color: var(--wood-deep); margin: 0 0 6px;
  font-size: 1.05rem;
}
.mg-eco-pt p {
  font-size: 0.88rem; color: var(--wood-mid);
  line-height: 1.7; margin: 0; font-weight: 400;
}
.mg-eco-text p {
  font-size: 0.95rem; color: var(--wood-mid);
  line-height: 1.85; font-weight: 400;
  margin: 0 0 18px;
}
.mg-eco-text p strong { color: var(--wood-deep); font-weight: 600; }

/* ─── CTA ─── */
.mg-cta {
  padding: 130px 60px;
  background: linear-gradient(135deg, var(--wood-deep) 0%, var(--wood-mid) 50%, var(--wood-deep) 100%);
  text-align: center; color: var(--cream);
  position: relative; overflow: hidden;
}
.mg-cta::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg,
    transparent, transparent 30px,
    rgba(217,185,143,0.04) 30px, rgba(217,185,143,0.04) 31px);
}
.mg-cta-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
.mg-cta-label {
  font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--wood-light); margin-bottom: 18px; font-weight: 600;
}
.mg-cta-title {
  font-family: var(--font-fraunces), serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  margin: 0 0 18px;
  line-height: 1.2;
  color: var(--cream);
}
.mg-cta-title em { font-family: var(--font-caveat), cursive; font-style: normal; color: var(--wood-light); }
.mg-cta-sub {
  font-size: 1rem;
  color: rgba(217,185,143,0.85);
  margin-bottom: 38px;
  font-weight: 300;
  line-height: 1.7;
}
.mg-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.mg-btn-pri {
  background: var(--accent); color: white;
  padding: 16px 36px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
  border-radius: 3px;
  transition: background .2s, transform .2s;
}
.mg-btn-pri:hover { background: var(--accent-dk); transform: translateY(-2px); }
.mg-btn-out {
  border: 1px solid rgba(217,185,143,0.5);
  color: var(--wood-light);
  padding: 16px 36px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
  border-radius: 3px;
  transition: all .2s;
}
.mg-btn-out:hover { border-color: var(--wood-light); background: rgba(217,185,143,0.08); }

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .mg-wood-body { grid-template-columns: 1fr; gap: 40px; }
  .mg-wood-images { grid-template-rows: 280px 160px; }
  .mg-fin-grid { grid-template-columns: repeat(2, 1fr); }
  .mg-brand-grid { grid-template-columns: repeat(2, 1fr); }
  .mg-hw-grid { grid-template-columns: repeat(2, 1fr); }
  .mg-eco-inner { grid-template-columns: 1fr; gap: 40px; }
  .mg-cmp { font-size: 0.82rem; }
  .mg-cmp th, .mg-cmp td { padding: 14px 12px; }
}
@media (max-width: 720px) {
  .mg-hero { padding: 80px 24px 60px; }
  .mg-compare, .mg-finishes, .mg-branding, .mg-hardware, .mg-eco { padding: 70px 24px; }
  .mg-wood { padding: 60px 24px; }
  .mg-wood-props { grid-template-columns: repeat(2, 1fr); }
  .mg-fin-grid, .mg-brand-grid, .mg-hw-grid { grid-template-columns: 1fr; }
  .mg-wood-images { grid-template-rows: 220px 140px; }
  .mg-cta { padding: 80px 24px; }
  .mg-cmp-wrap { overflow-x: auto; }
}
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function PriceTier({ value }) {
  return (
    <span className="mg-cmp-price">
      {[1, 2, 3, 4].map((n) =>
        n <= value ? (
          <span key={n}>$</span>
        ) : (
          <span key={n} className="dim">$</span>
        ),
      )}
    </span>
  );
}

function PriceTierLg({ value }) {
  return (
    <div className="mg-wood-price">
      {[1, 2, 3, 4].map((n) =>
        n <= value ? (
          <span key={n}>$</span>
        ) : (
          <span key={n} className="dim">$</span>
        ),
      )}
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function MaterialGuidePage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const { WOODS, FINISHES, BRANDING, HARDWARE, COPY } = getMaterialGuide(locale);
  return (
    <div className="mg">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ─── HERO ─── */}
      <section className="mg-hero">
        <div className="mg-hero-inner">
          <div className="mg-eyebrow">{COPY.hero.eyebrow}</div>
          <h1 className="mg-h1">
            {COPY.hero.title} <em>{COPY.hero.titleEm}</em>
          </h1>
          <p className="mg-sub">{COPY.hero.sub}</p>
          <div className="mg-toc">
            <a href="#compare">{COPY.hero.tocLabels.compare}</a>
            {WOODS.map((w) => (
              <a key={w.slug} href={`#${w.slug}`}>{w.name}</a>
            ))}
            <a href="#finishes">{COPY.hero.tocLabels.finishes}</a>
            <a href="#branding">{COPY.hero.tocLabels.branding}</a>
            <a href="#hardware">{COPY.hero.tocLabels.hardware}</a>
            <a href="#eco">{COPY.hero.tocLabels.eco}</a>
          </div>
        </div>
      </section>

      {/* ─── COMPARE ─── */}
      <section className="mg-compare" id="compare">
        <div className="mg-section-inner">
          <div className="mg-section-label">{COPY.compare.label}</div>
          <h2 className="mg-section-title">
            {COPY.compare.title} <em>{COPY.compare.titleEm}</em>
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">{COPY.compare.lede}</p>

          <div className="mg-cmp-wrap">
            <table className="mg-cmp">
              <thead>
                <tr>
                  <th>{COPY.compare.th.wood}</th>
                  <th>{COPY.compare.th.density}</th>
                  <th>{COPY.compare.th.hardness}</th>
                  <th>{COPY.compare.th.color}</th>
                  <th>{COPY.compare.th.bestFor}</th>
                  <th>{COPY.compare.th.price}</th>
                </tr>
              </thead>
              <tbody>
                {WOODS.map((w) => (
                  <tr key={w.slug}>
                    <td>
                      <span
                        className="mg-cmp-swatch"
                        style={{ background: w.swatch }}
                        aria-hidden="true"
                      />
                      <span className="mg-cmp-name">{w.name}</span>
                      <span className="mg-cmp-tag">{w.nickname}</span>
                    </td>
                    <td>{w.properties[0].value}</td>
                    <td>{w.properties[1].value}</td>
                    <td>{w.properties[2].value}</td>
                    <td>{w.bestFor[0]}</td>
                    <td><PriceTier value={w.price} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── WOOD PROFILES ─── */}
      {WOODS.map((w, i) => (
        <section className="mg-wood" id={w.slug} key={w.slug}>
          <div className="mg-wood-inner">
            <div className="mg-wood-head">
              <div>
                <div className="mg-wood-eyebrow">
                  <span className="mg-wood-eyebrow-num">{COPY.wood.eyebrowNumPrefix} {String(i + 1).padStart(2, '0')}</span>
                  {COPY.wood.eyebrowSpecies}
                </div>
                <h2 className="mg-wood-h2">
                  {w.name} <em>— {w.nickname}</em>
                </h2>
                <p className="mg-wood-tagline">{w.tagline}</p>
              </div>
              <PriceTierLg value={w.price} />
            </div>

            <div className="mg-wood-body">
              <div className="mg-wood-images">
                <div>
                  <img src={w.hero} alt={`${w.name} wooden box — hero`} loading="lazy" width="1200" height="900" />
                </div>
                {w.gallery.slice(0, 2).map((src, j) => (
                  <div key={j}>
                    <img src={src} alt={`${w.name} wooden box example ${j + 2}`} loading="lazy" width="1200" height="900" />
                  </div>
                ))}
              </div>

              <div className="mg-wood-text">
                <p><strong>{COPY.wood.originLabel}</strong> {w.origin}</p>
                <p><strong>{COPY.wood.characterLabel}</strong> {w.character}</p>

                <div className="mg-wood-props">
                  {w.properties.map((p) => (
                    <div className="mg-wood-prop" key={p.label}>
                      <div className="mg-wood-prop-label">{p.label}</div>
                      <div className="mg-wood-prop-value">{p.value}</div>
                    </div>
                  ))}
                </div>

                <h4 className="mg-wood-list-title">{COPY.wood.listWhy}</h4>
                <ul className="mg-wood-list">
                  {w.strengths.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>

                <h4 className="mg-wood-list-title">{COPY.wood.listConsider}</h4>
                <ul className="mg-wood-list is-warn">
                  {w.consider.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>

                <h4 className="mg-wood-list-title">{COPY.wood.listBest}</h4>
                <div className="mg-wood-bestfor">
                  {w.bestFor.map((b) => (
                    <span key={b}>{b}</span>
                  ))}
                </div>

                <div className="mg-wood-care">
                  <strong>{COPY.wood.careLabel}</strong> {w.care}
                </div>

                <Link href={`/products/${w.productSlug}`} className="mg-wood-cta">
                  {COPY.wood.cta.replace('{name}', w.name)}
                  <span className="mg-wood-cta-count">{COPY.wood.ctaCount.replace('{count}', w.productCount)}</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── FINISHES ─── */}
      <section className="mg-finishes" id="finishes">
        <div className="mg-section-inner">
          <div className="mg-section-label">{COPY.finishes.label}</div>
          <h2 className="mg-section-title">
            {COPY.finishes.title} <em>{COPY.finishes.titleEm}</em>
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">{COPY.finishes.lede}</p>

          <div className="mg-fin-grid">
            {FINISHES.map((f) => (
              <div className="mg-fin" key={f.name}>
                <div className="mg-fin-swatch" style={{ background: f.swatch }} />
                <h3 className="mg-fin-name">{f.name}</h3>
                <p className="mg-fin-desc">{f.desc}</p>
                <p className="mg-fin-meta">
                  <strong>{COPY.finishes.bestForLabel}</strong> {f.bestFor}<br />
                  <strong>{COPY.finishes.durabilityLabel}</strong> {f.durability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANDING ─── */}
      <section className="mg-branding" id="branding">
        <div className="mg-section-inner">
          <div className="mg-section-label">{COPY.branding.label}</div>
          <h2 className="mg-section-title">
            {COPY.branding.title} <em>{COPY.branding.titleEm}</em> {COPY.branding.titleSuffix}
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">{COPY.branding.lede}</p>

          <div className="mg-brand-grid">
            {BRANDING.map((b) => (
              <div className="mg-brand" key={b.name}>
                <div className="mg-brand-icon">{b.icon}</div>
                <h3 className="mg-brand-name">{b.name}</h3>
                <p className="mg-brand-desc">{b.desc}</p>
                <div className="mg-brand-meta">
                  <strong>{COPY.branding.bestOnLabel}</strong>
                  {b.bestOn}
                  <br /><br />
                  <strong>{COPY.branding.leadTimeLabel}</strong>
                  {b.leadTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HARDWARE ─── */}
      <section className="mg-hardware" id="hardware">
        <div className="mg-section-inner">
          <div className="mg-section-label">{COPY.hardware.label}</div>
          <h2 className="mg-section-title">
            {COPY.hardware.title} <em>{COPY.hardware.titleEm}</em>
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">{COPY.hardware.lede}</p>

          <div className="mg-hw-grid">
            {HARDWARE.map((h) => (
              <div className="mg-hw" key={h.name}>
                <h3 className="mg-hw-name">{h.name}</h3>
                <p className="mg-hw-desc">{h.desc}</p>
                <div className="mg-hw-row">
                  <strong>{COPY.hardware.finishesLabel}</strong>
                  <span>{h.finishes}</span>
                </div>
                <div className="mg-hw-row">
                  <strong>{COPY.hardware.useLabel}</strong>
                  <span>{h.use}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUSTAINABILITY ─── */}
      <section className="mg-eco" id="eco">
        <div className="mg-eco-inner">
          <div className="mg-eco-text">
            <div className="mg-section-label">{COPY.eco.label}</div>
            <h2 className="mg-section-title">
              {COPY.eco.title} <em>{COPY.eco.titleEm}</em>
            </h2>
            <div className="mg-section-line" />
            <p dangerouslySetInnerHTML={{ __html: COPY.eco.p1html }} />
            <p dangerouslySetInnerHTML={{ __html: COPY.eco.p2html }} />
            <p dangerouslySetInnerHTML={{ __html: COPY.eco.p3html }} />
          </div>

          <div className="mg-eco-pts">
            {COPY.eco.pts.map((pt, i) => (
              <div className="mg-eco-pt" key={i}>
                <h4>{pt.h}</h4>
                <p>{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mg-cta">
        <div className="mg-cta-inner">
          <div className="mg-cta-label">{COPY.cta.label}</div>
          <h2 className="mg-cta-title">
            {COPY.cta.title} <br />
            {COPY.cta.titleBr} <em>{COPY.cta.titleEm}</em>.
          </h2>
          <p className="mg-cta-sub">{COPY.cta.sub}</p>
          <div className="mg-cta-btns">
            <Link href="/contact" className="mg-btn-pri">{COPY.cta.btnPrimary}</Link>
            <Link href="/products" className="mg-btn-out">{COPY.cta.btnSecondary}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}                                                                                                                                                                                                                                                                        