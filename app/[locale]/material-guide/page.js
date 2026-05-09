import { Link } from '@/i18n/navigation';
import { alternates } from '@/i18n/seo';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: 'Material Guide — Wood, Finish & Hardware Reference | CHIC',
    description:
      'A complete educational guide to wood species, finishes, branding methods and hardware used in custom wooden boxes. Compare paulownia, pine, bamboo, acacia and walnut, then jump to matching products.',
    alternates: alternates(locale, '/material-guide'),
    openGraph: {
      url: `/${locale}/material-guide`,
      title: 'Material Guide — Wood, Finish & Hardware Reference | CHIC',
      description:
        'Educational guide to wood species, finishes, branding methods and hardware used in custom wooden boxes.',
    },
  };
}

// ─── DATA ────────────────────────────────────────────────────────────────────
// Detailed wood profiles. Hero/gallery images reuse the same paths the product
// catalog uses, so /public/... assets stay in one place.
const WOODS = [
  {
    slug: 'paulownia',
    name: 'Paulownia',
    nickname: 'The Empress Tree',
    tagline: 'Half the weight of pine. Doubly stable.',
    hero: '/paulwnia-wood-box/set-1/set-1-01.webp',
    gallery: [
      '/paulwnia-wood-box/3/3-01.webp',
      '/paulwnia-wood-box/4/4-01.webp',
      '/paulwnia-wood-box/set-7/set-7-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #EBD9B8, #D9B98F)',
    origin:
      'Native to central and northern China — the “empress tree.” Plantation-grown across Shandong and Anhui where it reaches harvest size in just 5–7 years, making it one of the most renewable timbers on earth.',
    character:
      'Pale cream to blonde, with a perfectly straight even grain and a soft satin sheen. Almost no visible figure — which makes it the perfect canvas for laser engraving, hot foil and printing.',
    properties: [
      { label: 'Density', value: '~280 kg/m³' },
      { label: 'Janka Hardness', value: '~300' },
      { label: 'Color', value: 'Pale cream / blonde' },
      { label: 'Grain', value: 'Straight, even' },
      { label: 'Stability', value: 'Excellent' },
      { label: 'Sustainability', value: '★★★★★' },
    ],
    strengths: [
      'Lightest commercial timber on the market — direct savings on freight, especially on large gift boxes.',
      'Dimensionally stable through humidity swings — won’t warp or crack between Guangzhou and Hamburg.',
      'Crisp laser engraving with no scorching halo, even at fine resolutions.',
      'Pale neutral surface accepts any stain, paint or print without color contamination.',
    ],
    consider: [
      'Soft surface — dents under impact. Best for presentation, not heavy daily handling.',
      'Not naturally water-resistant; sealing is required for moist environments.',
    ],
    bestFor: [
      'High-volume gift & subscription boxes',
      'Single-bottle wine packaging',
      'Stationery and craft kits',
      'Large exhibition / display boxes',
    ],
    care: 'Keep dry. Dust with a soft cloth. Damp wipe only after a sealing finish has been applied.',
    price: 1, // 1–4 scale
    productSlug: 'paulownia',
    productCount: '20+',
  },
  {
    slug: 'pine',
    name: 'Pine',
    nickname: 'The Workhorse',
    tagline: 'Affordable, characterful, ages beautifully.',
    hero: '/pine-wood-box/set-1/set-1-01.webp',
    gallery: [
      '/pine-wood-box/11/11-01.webp',
      '/pine-wood-box/12/12-01.webp',
      '/pine-wood-box/set-13/set-13-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #D9B98F, #A07852)',
    origin:
      'Sourced from European Scots pine and New Zealand radiata pine plantations. Pine is the classic crate and farmhouse wood — instantly recognizable, instantly evocative.',
    character:
      'Pale yellow-tan when fresh, ageing to a warm amber-honey. Knot-free grades feel clean and modern; rustic knotty grades carry obvious character. Soft, swirling grain pattern.',
    properties: [
      { label: 'Density', value: '~510 kg/m³' },
      { label: 'Janka Hardness', value: '~380' },
      { label: 'Color', value: 'Pale yellow → amber' },
      { label: 'Grain', value: 'Soft, knotty optional' },
      { label: 'Stability', value: 'Moderate' },
      { label: 'Sustainability', value: '★★★★' },
    ],
    strengths: [
      'Best price-per-board-foot of any species we stock — perfect when budget is the brief.',
      'Takes wood burning, torch finish and stain in a way most hardwoods can’t match.',
      'Knot-free clear grade for modern looks, knotty grade for rustic crates — same supply chain.',
      'Ages with a warm amber patina that buyers find more attractive than day-one new.',
    ],
    consider: [
      'Softer than hardwoods — dents, scratches and tool marks show.',
      'Resin pockets can bleed if not properly kiln-dried (we kiln to 8% MC standard).',
    ],
    bestFor: [
      'Wine and whisky crates with branded burn-marks',
      'Garden, seed and patio storage boxes',
      'Rustic gift packaging and farmhouse decor',
      'Tool and workshop boxes',
    ],
    care: 'Wipe dust regularly. If oiled, re-oil annually. Keep out of prolonged direct moisture.',
    price: 2,
    productSlug: 'pine',
    productCount: '25+',
  },
  {
    slug: 'bamboo',
    name: 'Bamboo',
    nickname: 'The Eco Hardwood',
    tagline: 'Harder than oak. Greener than anything.',
    hero: '/bamboo-box/set-1/set-1-01.webp',
    gallery: [
      '/bamboo-box/set-7/set-7-01.webp',
      '/bamboo-box/set-8/set-8-01.webp',
      '/bamboo-box/set-13/set-13-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #C8B68A, #94814A)',
    origin:
      'Moso bamboo from southern China — the only species hard enough for board production. Technically a grass, it regrows from the same root system in 5–7 years without replanting.',
    character:
      'Pale gold (natural) or warm caramel (carbonized through pressure-steaming). Unmistakable horizontal striping from the laminated stalks. Very modern, very clean.',
    properties: [
      { label: 'Density', value: '~700 kg/m³' },
      { label: 'Janka Hardness', value: '~1380' },
      { label: 'Color', value: 'Pale gold or caramel' },
      { label: 'Grain', value: 'Striped lamination' },
      { label: 'Stability', value: 'Very good (when dried)' },
      { label: 'Sustainability', value: '★★★★★' },
    ],
    strengths: [
      'The most renewable structural material we offer — regrows in under a decade with zero replanting.',
      'Naturally antibacterial and antimicrobial — preferred for kitchen, bath and tea storage.',
      'Janka 1380 — harder than red oak, denser than most temperate hardwoods.',
      'Natural and carbonized finishes give two distinct color palettes from one species.',
    ],
    consider: [
      'Cannot be deeply carved or relief-engraved — laminated structure splinters.',
      'Distinctive horizontal striping is iconic, but doesn’t suit every traditional aesthetic.',
    ],
    bestFor: [
      'Tea, coffee and pod storage with food-safe finish',
      'Kitchen organizers, cutlery and condiment caddies',
      'Bath amenity boxes for hotels and spas',
      'Eco-positioned gift and subscription packaging',
    ],
    care: 'Wipe with a damp cloth and dry immediately. Re-oil with food-safe mineral oil 2–4× a year for kitchen pieces.',
    price: 3,
    productSlug: 'bamboo',
    productCount: '15+',
  },
  {
    slug: 'acacia',
    name: 'Acacia',
    nickname: 'The Character Wood',
    tagline: 'Honey to chocolate, in dramatic swirls.',
    hero: '/acacia-wood-box/set-1/set-1-01.webp',
    gallery: [
      '/acacia-wood-box/4/4-01.webp',
      '/acacia-wood-box/5/5-01.webp',
      '/acacia-wood-box/9/9-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #A07852, #5C3A24)',
    origin:
      'Plantation-grown across Vietnam, Indonesia and East Africa. A fast-growing tropical hardwood that delivers premium hardness at a mid-tier price — when sourced from FSC-verified plantations.',
    character:
      'Honey-yellow heart streaked with deep chocolate, in dramatic swirling figure. Every piece is different — character, not uniformity, is the point.',
    properties: [
      { label: 'Density', value: '~750 kg/m³' },
      { label: 'Janka Hardness', value: '~2300' },
      { label: 'Color', value: 'Honey → chocolate' },
      { label: 'Grain', value: 'Dramatic swirls' },
      { label: 'Stability', value: 'Good' },
      { label: 'Sustainability', value: '★★★★ (FSC)' },
    ],
    strengths: [
      'One of the hardest commercially available woods — daily-use durable.',
      'Naturally water-resistant from the wood’s own oils — minimal sealing needed.',
      'Dramatic figured grain finishes deeply with just a coat of oil.',
      'Premium look at a mid-tier price — best value in the “character hardwood” bracket.',
    ],
    consider: [
      'Color variation between pieces is wide — buyers who want uniformity should choose walnut or paulownia instead.',
      'Tropical hardwood — always confirm FSC chain-of-custody documentation.',
    ],
    bestFor: [
      'Kitchen and dining boxes — bread bins, salt cellars, cutlery caddies',
      'Premium charcuterie and serving sets',
      'Hospitality amenity and hotel turn-down boxes',
      'Character-led gift boxes for coffee, tea and specialty foods',
    ],
    care: 'Damp wipe and dry immediately. Re-oil with mineral oil or beeswax monthly for daily-use kitchen pieces.',
    price: 3,
    productSlug: 'acacia',
    productCount: '12+',
  },
  {
    slug: 'walnut',
    name: 'Walnut',
    nickname: 'The Luxury Standard',
    tagline: 'When the box itself is the gift.',
    hero: '/walnut-wooden-box/set-7/set-7-01.webp',
    gallery: [
      '/walnut-wooden-box/set-2/set-2-01.webp',
      '/walnut-wooden-box/set-3/set-3-01.webp',
      '/walnut-wooden-box/set-6/set-6-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #5C3A24, #2A1B12)',
    origin:
      'American black walnut from the Eastern and Central United States — the gold standard for fine woodworking and the default luxury timber for watches, jewelry and executive gifts worldwide.',
    character:
      'Naturally deep chocolate brown — no staining required. Fine straight grain, occasional figure, sands to a silky glass-like surface that finishes with a quiet glow.',
    properties: [
      { label: 'Density', value: '~640 kg/m³' },
      { label: 'Janka Hardness', value: '~1010' },
      { label: 'Color', value: 'Deep chocolate' },
      { label: 'Grain', value: 'Fine, straight' },
      { label: 'Stability', value: 'Excellent' },
      { label: 'Sustainability', value: '★★★★ (FSC US)' },
    ],
    strengths: [
      'The benchmark luxury hardwood — instantly recognizable, instantly premium.',
      'Naturally rich color — no staining, no chemical match-coats, no bleed-through.',
      'Sands to a glass-like surface that takes oil, wax and lacquer beautifully.',
      'Excellent dimensional stability — the right wood for tight-tolerance hardware fits.',
    ],
    consider: [
      '4–6× the price of pine — reserve it for products where the box is part of the unboxing.',
      'Color may very slightly mellow with years of UV exposure — a feature, not a flaw.',
    ],
    bestFor: [
      'Single and multi-watch presentation boxes',
      'Fine jewelry chests and engagement ring boxes',
      'Executive desk sets and corporate gifts',
      'Limited-edition wine, whisky and cigar packaging',
    ],
    care: 'Dust with a soft cloth. Re-oil 1–2× a year. Avoid prolonged direct sunlight to preserve the deep chocolate tone.',
    price: 4,
    productSlug: 'walnut',
    productCount: '18+',
  },
];

const FINISHES = [
  {
    name: 'Raw / Unfinished',
    swatch: '#E5D2B2',
    desc: 'No coating at all. The wood is sanded clean and shipped natural — ready for the end customer to paint, stain or decoupage themselves.',
    bestFor: 'DIY craft kits, retail blanks, custom-finished pieces.',
    durability: 'Low',
  },
  {
    name: 'Sanded Smooth',
    swatch: '#D9C29A',
    desc: 'Multiple progressive grits up to 240–400. No coating, but a tactile silk-smooth surface that already feels finished.',
    bestFor: 'Modern minimalist presentation, baby-product packaging.',
    durability: 'Low',
  },
  {
    name: 'Oiled (Linseed / Tung)',
    swatch: '#C09866',
    desc: 'Penetrating natural oil — no surface film. Deepens grain, food-safe options available, ages with a soft glow. Re-oil every 6–12 months.',
    bestFor: 'Kitchenware, charcuterie boxes, premium hardwood presentation.',
    durability: 'Medium',
  },
  {
    name: 'Beeswax Polish',
    swatch: '#D2A973',
    desc: 'Soft beeswax buffed to a low sheen. Food-safe and warm to the touch. Less durable than oil, but more authentic for heritage pieces.',
    bestFor: 'Heritage gift boxes, food-direct kitchenware.',
    durability: 'Medium',
  },
  {
    name: 'Lacquered',
    swatch: '#9C7349',
    desc: 'PU or NC lacquer in matte / satin / piano-gloss. Forms a protective film, evens color, and gives a uniform sheen across all panels.',
    bestFor: 'Watch and jewelry boxes, high-end retail packaging.',
    durability: 'High',
  },
  {
    name: 'Painted',
    swatch: '#3D2A1F',
    desc: 'Solid pigment paint — full Pantone matching. Hides grain entirely. Hand-sprayed in dust-controlled booths to avoid orange peel.',
    bestFor: 'Brand-color packaging, modern minimalist gift boxes.',
    durability: 'High',
  },
  {
    name: 'Stained',
    swatch: '#6B4A33',
    desc: 'Tinted stain (light oak, walnut, ebony, bespoke colors) lets grain show through, then sealed with clear lacquer or oil top-coat.',
    bestFor: 'Cost-down walnut look on paulownia or pine bodies.',
    durability: 'High',
  },
  {
    name: 'Torched / Shou Sugi Ban',
    swatch: '#2A1B12',
    desc: 'Surface charred with flame, then brushed back. Carbonized layer protects against rot and insects, with a dramatic black grain texture.',
    bestFor: 'Rustic wine crates, statement gift packaging, garden boxes.',
    durability: 'High',
  },
];

const BRANDING = [
  {
    name: 'Laser Engraving',
    icon: '✦',
    desc: 'CO₂ laser burns the artwork into the wood. Reads on every species, scales from prototype to bulk, holds detail down to 0.3 mm. Our default for logos.',
    bestOn: 'All species — cleanest on paulownia, walnut and bamboo.',
    leadTime: 'No tooling, same-day setup.',
  },
  {
    name: 'Hot Foil Stamping',
    icon: '✦',
    desc: 'Heated brass die presses metallic foil (gold, rose gold, silver, copper, custom Pantone) into the surface. Premium tactile finish.',
    bestOn: 'Walnut, lacquered panels, painted surfaces.',
    leadTime: 'Custom die required (5–7 days).',
  },
  {
    name: 'Debossing',
    icon: '✦',
    desc: 'Heated die presses logo into wood without ink or foil — pure indented impression. Subtle, sophisticated, ages with the box.',
    bestOn: 'Soft woods — paulownia and pine take the deepest impressions.',
    leadTime: 'Custom die required (5–7 days).',
  },
  {
    name: 'Wood Burning (Pyrography)',
    icon: '✦',
    desc: 'Iron tip burns the artwork in. Vintage, hand-crafted aesthetic. Slight char halo and depth variation are part of the look.',
    bestOn: 'Pine, paulownia — anywhere a rustic story fits.',
    leadTime: 'No tooling, same-day setup.',
  },
  {
    name: 'UV Printing',
    icon: '✦',
    desc: 'Direct full-color CMYK print cured by UV light. Photographic detail, gradients, multi-color artwork — all on bare wood.',
    bestOn: 'All species, especially paulownia and lacquered panels.',
    leadTime: 'No tooling, digital files only.',
  },
  {
    name: 'Screen Printing',
    icon: '✦',
    desc: 'Solid spot color through a silk-screen — flat, bright, repeatable. Most economical method for high-volume single-color logos.',
    bestOn: 'Lacquered, painted or sanded smooth surfaces.',
    leadTime: 'Custom screen required (3–5 days).',
  },
  {
    name: 'Inlay',
    icon: '✦',
    desc: 'Contrasting wood, brass or mother-of-pearl is set flush into a CNC-routed pocket. The luxury tier of branding.',
    bestOn: 'Walnut, acacia — anywhere a premium artisan feel is the brief.',
    leadTime: 'Project-by-project (10–14 days).',
  },
];

const HARDWARE = [
  {
    name: 'Surface Hinges',
    desc: 'Visible brass or steel hinges mounted on the outside back. Classic, vintage, easy to repair.',
    finishes: 'Brass · antique brass · chrome · matte black',
    use: 'Wine crates, rustic gift boxes, tool chests',
  },
  {
    name: 'Concealed Hinges',
    desc: 'European-style hinges hidden inside the wall — exterior is completely clean. Soft-close optional.',
    finishes: 'Nickel · matte black (interior)',
    use: 'Premium gift, watch & jewelry, magnetic-look boxes',
  },
  {
    name: 'Piano Hinges',
    desc: 'Continuous full-length hinge — strongest option, even load distribution, works with very long lids.',
    finishes: 'Brass · steel · stainless',
    use: 'Document chests, large storage boxes, lockable safes',
  },
  {
    name: 'Hidden Magnets',
    desc: 'Neodymium magnets routed into the wall. Lid snaps shut with a calibrated, satisfying close. Zero visible hardware.',
    finishes: 'N35–N52 strength options',
    use: 'Premium retail unboxing, subscription boxes, beauty packaging',
  },
  {
    name: 'Brass Key Locks',
    desc: 'Surface-mount brass lock with key. Classic appearance, unmistakable security cue.',
    finishes: 'Polished · antique brass',
    use: 'Cash boxes, document chests, heirloom-look pieces',
  },
  {
    name: 'Combination Locks',
    desc: '3-digit dial mechanism — no key to lose, no key to copy. Cleanest lock-down option for travel and shared spaces.',
    finishes: 'Brushed steel · matte black',
    use: 'Travel humidors, shared-office boxes, medication safes',
  },
];

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
  return (
    <div className="mg">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ─── HERO ─── */}
      <section className="mg-hero">
        <div className="mg-hero-inner">
          <div className="mg-eyebrow">The Knowledge Library</div>
          <h1 className="mg-h1">
            The Complete Guide to <em>Wood, Finish & Hardware</em>
          </h1>
          <p className="mg-sub">
            Choosing the right wooden box starts with choosing the right material. This guide walks through
            the five wood species we work with every day, eight surface finishes, seven branding methods, and
            every hinge, lock and magnet we install — so you can make the call with confidence before the first
            sample is cut.
          </p>
          <div className="mg-toc">
            <a href="#compare">Compare Woods</a>
            <a href="#paulownia">Paulownia</a>
            <a href="#pine">Pine</a>
            <a href="#bamboo">Bamboo</a>
            <a href="#acacia">Acacia</a>
            <a href="#walnut">Walnut</a>
            <a href="#finishes">Finishes</a>
            <a href="#branding">Branding</a>
            <a href="#hardware">Hardware</a>
            <a href="#eco">Sustainability</a>
          </div>
        </div>
      </section>

      {/* ─── COMPARE ─── */}
      <section className="mg-compare" id="compare">
        <div className="mg-section-inner">
          <div className="mg-section-label">At a Glance</div>
          <h2 className="mg-section-title">
            Five woods, side by <em>side</em>
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">
            A quick comparison of the five woods that account for over 95% of our annual production. Use
            this as a shortcut — then read the full profile for the species that fits your brief.
          </p>

          <div className="mg-cmp-wrap">
            <table className="mg-cmp">
              <thead>
                <tr>
                  <th>Wood</th>
                  <th>Density</th>
                  <th>Hardness (Janka)</th>
                  <th>Color</th>
                  <th>Best for</th>
                  <th>Price</th>
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
                    <td>{w.properties.find((p) => p.label === 'Density').value}</td>
                    <td>{w.properties.find((p) => p.label === 'Janka Hardness').value}</td>
                    <td>{w.properties.find((p) => p.label === 'Color').value}</td>
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
                  <span className="mg-wood-eyebrow-num">No. {String(i + 1).padStart(2, '0')}</span>
                  Wood Species
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
                <p><strong>Origin & history.</strong> {w.origin}</p>
                <p><strong>Visual character.</strong> {w.character}</p>

                <div className="mg-wood-props">
                  {w.properties.map((p) => (
                    <div className="mg-wood-prop" key={p.label}>
                      <div className="mg-wood-prop-label">{p.label}</div>
                      <div className="mg-wood-prop-value">{p.value}</div>
                    </div>
                  ))}
                </div>

                <h4 className="mg-wood-list-title">Why buyers choose it</h4>
                <ul className="mg-wood-list">
                  {w.strengths.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>

                <h4 className="mg-wood-list-title">Things to consider</h4>
                <ul className="mg-wood-list is-warn">
                  {w.consider.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>

                <h4 className="mg-wood-list-title">Best for</h4>
                <div className="mg-wood-bestfor">
                  {w.bestFor.map((b) => (
                    <span key={b}>{b}</span>
                  ))}
                </div>

                <div className="mg-wood-care">
                  <strong>Care &amp; maintenance.</strong> {w.care}
                </div>

                <Link href={`/products/${w.productSlug}`} className="mg-wood-cta">
                  View {w.name} Boxes
                  <span className="mg-wood-cta-count">{w.productCount} products</span>
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
          <div className="mg-section-label">Surface Treatment</div>
          <h2 className="mg-section-title">
            Eight finishes, from raw to <em>piano gloss</em>
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">
            Finish is what your customer actually touches. The same paulownia body can read as a rustic
            craft kit, a modern minimalist box, or a piano-gloss luxury package — depending entirely on the
            finish above the wood.
          </p>

          <div className="mg-fin-grid">
            {FINISHES.map((f) => (
              <div className="mg-fin" key={f.name}>
                <div className="mg-fin-swatch" style={{ background: f.swatch }} />
                <h3 className="mg-fin-name">{f.name}</h3>
                <p className="mg-fin-desc">{f.desc}</p>
                <p className="mg-fin-meta">
                  <strong>Best for:</strong> {f.bestFor}<br />
                  <strong>Durability:</strong> {f.durability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANDING ─── */}
      <section className="mg-branding" id="branding">
        <div className="mg-section-inner">
          <div className="mg-section-label">Logo & Artwork</div>
          <h2 className="mg-section-title">
            Seven ways to put your <em>brand</em> on wood
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">
            The wood and the finish set the stage — your branding closes the deal. Here&apos;s a plain-English
            comparison of every method we offer in-house, with the species and surfaces each one looks best on.
          </p>

          <div className="mg-brand-grid">
            {BRANDING.map((b) => (
              <div className="mg-brand" key={b.name}>
                <div className="mg-brand-icon">{b.icon}</div>
                <h3 className="mg-brand-name">{b.name}</h3>
                <p className="mg-brand-desc">{b.desc}</p>
                <div className="mg-brand-meta">
                  <strong>Best on</strong>
                  {b.bestOn}
                  <br /><br />
                  <strong>Lead time</strong>
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
          <div className="mg-section-label">Hinges, Locks &amp; Magnets</div>
          <h2 className="mg-section-title">
            Hardware <em>that lasts</em>
          </h2>
          <div className="mg-section-line" />
          <p className="mg-section-lede">
            We stock European concealed hinges, brass surface hinges, neodymium magnets, and brass and
            combination locks. Mix and match — every box can be specified down to the hardware finish.
          </p>

          <div className="mg-hw-grid">
            {HARDWARE.map((h) => (
              <div className="mg-hw" key={h.name}>
                <h3 className="mg-hw-name">{h.name}</h3>
                <p className="mg-hw-desc">{h.desc}</p>
                <div className="mg-hw-row">
                  <strong>Finishes</strong>
                  <span>{h.finishes}</span>
                </div>
                <div className="mg-hw-row">
                  <strong>Typical use</strong>
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
            <div className="mg-section-label">Sustainability</div>
            <h2 className="mg-section-title">
              Wood is renewable — <em>when sourced right</em>
            </h2>
            <div className="mg-section-line" />
            <p>
              Every shipment we make is built from <strong>FSC chain-of-custody verified</strong> timber, with
              auditable paperwork from forest to factory floor. We work with paulownia and bamboo plantations
              in China, FSC-managed acacia plantations in Vietnam and Indonesia, FSC pine from European
              forests, and US-sourced black walnut.
            </p>
            <p>
              Our finishes also matter — water-based lacquers and food-safe oils are the default for
              kitchenware and food packaging, and our coatings comply with <strong>EU REACH</strong> and
              <strong> US CARB Phase 2</strong> on request.
            </p>
            <p>
              When sustainability is a brand pillar, choose <strong>bamboo</strong> (regrows in 5–7 years) or
              <strong> paulownia</strong> (also 5–7 years, plus the lightest freight footprint of any wood).
              For premium hardwoods, ask us for the FSC certificate before approval — we issue it standard.
            </p>
          </div>

          <div className="mg-eco-pts">
            <div className="mg-eco-pt">
              <h4>FSC chain-of-custody certified</h4>
              <p>Auditable paper trail from forest stand to factory pallet — issued on request, every shipment.</p>
            </div>
            <div className="mg-eco-pt">
              <h4>Renewable species first</h4>
              <p>Paulownia and bamboo regrow in 5–7 years — the most carbon-efficient wood we offer.</p>
            </div>
            <div className="mg-eco-pt">
              <h4>Low-VOC finishes available</h4>
              <p>Water-based lacquers, food-safe oils and beeswax — REACH and CARB P2 compliant on request.</p>
            </div>
            <div className="mg-eco-pt">
              <h4>Phytosanitary certificates</h4>
              <p>Issued for every solid-wood shipment — clean customs clearance into all major markets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mg-cta">
        <div className="mg-cta-inner">
          <div className="mg-cta-label">Still Deciding?</div>
          <h2 className="mg-cta-title">
            Tell us what you&apos;re building. <br />
            We&apos;ll <em>match the wood</em>.
          </h2>
          <p className="mg-cta-sub">
            Send a sketch, a Pinterest board or a competitor sample — our team picks the right species,
            finish, branding and hardware combination, and prices it back within 24 hours.
          </p>
          <div className="mg-cta-btns">
            <Link href="/contact" className="mg-btn-pri">Request a Quote</Link>
            <Link href="/products" className="mg-btn-out">Browse the Catalog</Link>
          </div>
        </div>
      </section>
    </div>
  );
}