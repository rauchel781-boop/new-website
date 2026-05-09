// ─────────────────────────────────────────────────────────────────────────
// Material Guide — English baseline data.
//
// Translated copies live alongside this file as ./es.js, ./fr.js, ./de.js,
// ./it.js, ./pt.js, ./ja.js, ./ko.js. The structural fields (slug, hero,
// gallery, swatch, properties[].label, productSlug, productCount, price, icon)
// are identical across all locales — only the human-readable text changes.
// ─────────────────────────────────────────────────────────────────────────

export const WOODS = [
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
    price: 1,
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
    care: 'Damp wipe and dry. Re-oil with mineral oil if used in kitchen. Carbonized finish darkens with use — a feature.',
    price: 2,
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

export const FINISHES = [
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

export const BRANDING = [
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

export const HARDWARE = [
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

// JSX-side strings (hero, section titles, ledes, table headers, eco panel, CTA)
export const COPY = {
  meta: {
    title: 'Material Guide — Wood, Finish & Hardware Reference | CHIC',
    description:
      'A complete educational guide to wood species, finishes, branding methods and hardware used in custom wooden boxes. Compare paulownia, pine, bamboo, acacia and walnut, then jump to matching products.',
    ogDescription:
      'Educational guide to wood species, finishes, branding methods and hardware used in custom wooden boxes.',
  },
  hero: {
    eyebrow: 'The Knowledge Library',
    title: 'The Complete Guide to',
    titleEm: 'Wood, Finish & Hardware',
    sub: 'Choosing the right wooden box starts with choosing the right material. This guide walks through the five wood species we work with every day, eight surface finishes, seven branding methods, and every hinge, lock and magnet we install — so you can make the call with confidence before the first sample is cut.',
    tocLabels: {
      compare: 'Compare Woods',
      finishes: 'Finishes',
      branding: 'Branding',
      hardware: 'Hardware',
      eco: 'Sustainability',
    },
  },
  compare: {
    label: 'At a Glance',
    title: 'Five woods, side by',
    titleEm: 'side',
    lede: 'A quick comparison of the five woods that account for over 95% of our annual production. Use this as a shortcut — then read the full profile for the species that fits your brief.',
    th: {
      wood: 'Wood',
      density: 'Density',
      hardness: 'Hardness (Janka)',
      color: 'Color',
      bestFor: 'Best for',
      price: 'Price',
    },
  },
  wood: {
    eyebrowSpecies: 'Wood Species',
    eyebrowNumPrefix: 'No.',
    listWhy: 'Why buyers choose it',
    listConsider: 'Things to consider',
    listBest: 'Best for',
    careLabel: 'Care & maintenance.',
    originLabel: 'Origin & history.',
    characterLabel: 'Visual character.',
    cta: 'View {name} Boxes',
    ctaCount: '{count} products',
  },
  finishes: {
    label: 'Surface Treatment',
    title: 'Eight finishes, from raw to',
    titleEm: 'piano gloss',
    lede: 'Finish is what your customer actually touches. The same paulownia body can read as a rustic craft kit, a modern minimalist box, or a piano-gloss luxury package — depending entirely on the finish above the wood.',
    bestForLabel: 'Best for:',
    durabilityLabel: 'Durability:',
  },
  branding: {
    label: 'Logo & Artwork',
    title: 'Seven ways to put your',
    titleEm: 'brand',
    titleSuffix: 'on wood',
    lede: 'The wood and the finish set the stage — your branding closes the deal. Here’s a plain-English comparison of every method we offer in-house, with the species and surfaces each one looks best on.',
    bestOnLabel: 'Best on',
    leadTimeLabel: 'Lead time',
  },
  hardware: {
    label: 'Hinges, Locks & Magnets',
    title: 'Hardware',
    titleEm: 'that lasts',
    lede: 'We stock European concealed hinges, brass surface hinges, neodymium magnets, and brass and combination locks. Mix and match — every box can be specified down to the hardware finish.',
    finishesLabel: 'Finishes',
    useLabel: 'Typical use',
  },
  eco: {
    label: 'Sustainability',
    title: 'Wood is renewable —',
    titleEm: 'when sourced right',
    p1html:
      'Every shipment we make is built from <strong>FSC chain-of-custody verified</strong> timber, with auditable paperwork from forest to factory floor. We work with paulownia and bamboo plantations in China, FSC-managed acacia plantations in Vietnam and Indonesia, FSC pine from European forests, and US-sourced black walnut.',
    p2html:
      'Our finishes also matter — water-based lacquers and food-safe oils are the default for kitchenware and food packaging, and our coatings comply with <strong>EU REACH</strong> and <strong>US CARB Phase 2</strong> on request.',
    p3html:
      'When sustainability is a brand pillar, choose <strong>bamboo</strong> (regrows in 5–7 years) or <strong>paulownia</strong> (also 5–7 years, plus the lightest freight footprint of any wood). For premium hardwoods, ask us for the FSC certificate before approval — we issue it standard.',
    pts: [
      {
        h: 'FSC chain-of-custody certified',
        p: 'Auditable paper trail from forest stand to factory pallet — issued on request, every shipment.',
      },
      {
        h: 'Renewable species first',
        p: 'Paulownia and bamboo regrow in 5–7 years — the most carbon-efficient wood we offer.',
      },
      {
        h: 'Low-VOC finishes available',
        p: 'Water-based lacquers, food-safe oils and beeswax — REACH and CARB P2 compliant on request.',
      },
      {
        h: 'Phytosanitary certificates',
        p: 'Issued for every solid-wood shipment — clean customs clearance into all major markets.',
      },
    ],
  },
  cta: {
    label: 'Still Deciding?',
    title: 'Tell us what you’re building.',
    titleBr: 'We’ll',
    titleEm: 'match the wood',
    sub: 'Send a sketch, a Pinterest board or a competitor sample — our team picks the right species, finish, branding and hardware combination, and prices it back within 24 hours.',
    btnPrimary: 'Request a Quote',
    btnSecondary: 'Browse the Catalog',
  },
};
