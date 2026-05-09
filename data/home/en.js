// Home page — English baseline.
//
// FEATURED, FACTORY_TILES, PROCESS, MATERIALS, WHY, CERTS arrays + COPY object
// hold all translatable strings. Translated copies live as ./es.js, ./fr.js, etc.

export const FEATURED = [
  { href: '/products/kitchen-dining', img: '/kitchen-dining-boxes/wood-kitchen-utensil-holder-with-spice-drawer/wood-kitchen-utensil-holder-with-spice-drawer-01.webp', w: 1164, h: 1160,
    tag: 'Kitchen & Dining', name: 'Utensil Holder with Spice Drawer', meta: 'Solid wood · Built-in drawer' },
  { href: '/products/kitchen-dining', img: '/storage-box/3-tier-bamboo-spice-rack-organizer/spice-jar-1-3.webp', w: 900, h: 900,
    tag: 'Kitchen & Storage', name: '3-Tier Bamboo Spice Rack', meta: 'Eco bamboo · 18 jars included' },
  { href: '/products/with-lock', img: '/wooden-boxes-with-lock/large-black-wooden-stash-box-kit/stash-box-11.webp', w: 1200, h: 1200,
    tag: 'Boxes with Lock', name: 'Large Black Stash Box Kit', meta: 'Combination lock · Multi-compartment' },
  { href: '/products/tea-coffee', img: '/tea-coffee-boxes/bamboo-tea-bag-organizer-box/main-1-5.webp', w: 800, h: 800,
    tag: 'Tea & Coffee', name: 'Bamboo Tea Bag Organizer', meta: '8 dividers · Clear hinged lid' },
  { href: '/products/watch-jewelry', img: '/hinged-wooden-boxes/wooden-watch-box-with-linen-interior-pillow/main-1-3.webp', w: 720, h: 720,
    tag: 'Watch & Jewelry', name: 'Wooden Watch Display Box', meta: 'Linen pillow · 6-watch capacity' },
  { href: '/products/acacia', img: '/acacia-wood-box/3/3-01.webp', w: 1010, h: 1144,
    tag: 'Acacia Series', name: 'Acacia Wood Keepsake Box', meta: 'Rich grain · Hardwood durability' },
];

export const FACTORY_TILES = [
  { href: '/about', img: '/factory/chic-factory.webp', alt: 'Our factory headquarters', w: 900, h: 900,
    num: '01 · Headquarters', text: '15,000 m² Cao County Facility', cls: 'fac-1' },
  { href: '/about', img: '/factory/production.webp',  alt: 'Production floor',          w: 900, h: 900,
    num: '02 · Production',   text: 'Active Workshop',                 cls: 'fac-2' },
  { href: '/about', img: '/factory/material.webp',     alt: 'Raw wood materials',        w: 900, h: 900,
    num: '03',                text: 'Raw Materials',                    cls: 'fac-3' },
  { href: '/about', img: '/factory/painting.webp',     alt: 'Finishing and painting',    w: 900, h: 900,
    num: '04',                text: 'Finishing Line',                  cls: 'fac-4' },
  { href: '/about', img: '/factory/warehouse.webp',    alt: 'Warehouse',                 w: 4096, h: 3072,
    num: '05',                text: 'Export Warehouse',                cls: 'fac-5' },
  { href: '/about', img: '/employees/sales-office.webp', alt: 'Sales office',            w: 2776, h: 2250,
    num: '06',                text: 'Sales & Service Team',            cls: 'fac-6' },
  { href: '/about', img: '/employees/e7fd6e2eec09920a9345158e7bdfdbeb.webp', alt: 'Skilled craftspeople', w: 791, h: 664,
    num: '07',                text: 'Skilled Craftspeople',            cls: 'fac-7' },
];

export const PROCESS = [
  { num: '1', img: '/folder/1-cutting-to-size.webp', alt: 'Cutting wood to size', w: 1191, h: 893,  name: 'Cutting to Size' },
  { num: '2', img: '/folder/2-shape-cutting.webp',   alt: 'Shape cutting',         w: 2000, h: 1334, name: 'Shape Cutting' },
  { num: '3', img: '/folder/3-mortise-cutting.webp', alt: 'Mortise cutting',       w: 2000, h: 1333, name: 'Mortise Cutting' },
  { num: '4', img: '/folder/4-pre-assemble.webp',    alt: 'Pre-assembly',          w: 2000, h: 1333, name: 'Pre-Assemble' },
  { num: '5', img: '/folder/5-polishing.webp',       alt: 'Polishing',             w: 2000, h: 1501, name: 'Polishing' },
  { num: '6', img: '/folder/6-packaging.webp',       alt: 'Packaging for export',  w: 3135, h: 2090, name: 'Packaging' },
];

export const MATERIALS = [
  { href: '/products/paulownia', swatch: 'swatch-paulownia', name: 'Paulownia',
    desc: 'Ultra-lightweight, great for large gift packaging. Easy to engrave.' },
  { href: '/products/pine',      swatch: 'swatch-pine',      name: 'Pine',
    desc: 'Classic rustic grain. Affordable and durable. Popular for wine & storage.' },
  { href: '/products/bamboo',    swatch: 'swatch-bamboo',    name: 'Bamboo',
    desc: 'Eco-friendly and sustainable. Unique texture, naturally antibacterial.' },
  { href: '/products/acacia',    swatch: 'swatch-acacia',    name: 'Acacia',
    desc: 'Dense hardwood with rich, warm tones. Ideal for premium gift boxes.' },
  { href: '/products/walnut',    swatch: 'swatch-walnut',    name: 'Walnut',
    desc: 'Deep chocolate grain. Luxury appeal for watches, jewelry, spirits.' },
];

export const WHY = [
  { icon: '🏭', title: 'Factory Direct — No Middlemen',
    text: 'You work directly with our production team. Lower prices, faster communication, and zero markups from trading companies.' },
  { icon: '🎨', title: 'Full OEM / ODM Capability',
    text: 'Logo engraving, hot stamping, screen printing, custom inserts, hardware, velvet lining — we handle every detail in-house.' },
  { icon: '📋', title: 'Strict Quality Control',
    text: 'Each order goes through a 3-stage QC process: material inspection, in-process checks, and pre-shipment final inspection.' },
  { icon: '🌍', title: 'Export-Ready Documentation',
    text: 'We handle phytosanitary certificates, CO, commercial invoices, and packing lists — stress-free customs clearance for you.' },
];

export const CERTS = [
  { icon: '🌲', name: 'FSC Certified' },
  { icon: '🇪🇺', name: 'EU REACH' },
  { icon: '✅', name: 'CARB P2' },
  { icon: '🔬', name: 'SGS Tested' },
  { icon: '📜', name: 'Phyto Cert' },
  { icon: '🏅', name: 'ISO 9001' },
];

export const COPY = {
  hero: {
    titleA: 'Where',
    titleEm1: 'Wood',
    titleB: 'Becomes',
    titleEm2: 'Heirloom.',
    sub: 'From luxury gift packaging to bespoke storage — we engineer custom wooden boxes in our 15,000 m² Cao County factory and ship to brands in 60+ countries from our Xiamen office. Built by hand, finished with bench-grade precision.',
    btnPrimary: 'View Best Sellers →',
    btnOutline: 'Request a Free Sample',
    metaItems: [
      { num: '20+', label: 'Years Crafting' },
      { num: '500+', label: 'Box Styles' },
      { num: '2M+', label: 'Units / Year' },
      { num: '60+', label: 'Countries' },
    ],
    collage: {
      main: 'Inside Our Workshop',
      sub1: 'Walnut · Jewelry Series',
      sub2: 'Bamboo · Eco Series',
      stampSub: 'Years',
    },
    trust: [
      'FSC Certified Wood',
      'Full OEM / ODM',
      'Sample in 7 Days',
      'EU REACH · CARB · ISO 9001',
    ],
  },
  stats: [
    { num: '500', sym: '+', label: 'Box Styles Available' },
    { num: '60',  sym: '+', label: 'Export Countries' },
    { num: '2M',  sym: '+', label: 'Units Shipped / Year' },
    { num: '98',  sym: '%', label: 'On-Time Delivery Rate' },
  ],
  intro: {
    label: 'Who We Are',
    titleA: 'Factory-Direct',
    titleEm: 'Quality',
    titleB: 'at Global Scale',
    text: 'With our 15,000 m² factory in Cao County, Shandong — the historic heart of China’s wooden box industry — and our sales office in Xiamen, Fujian, we are a dedicated wooden box manufacturer serving retailers, brands, and importers across Europe, North America, Japan, Korea and beyond.',
    features: [
      'MOQ as low as 100 pcs — perfect for sampling',
      'Full customization: size, finish, logo, insert, hardware',
      'FSC certified wood & eco-friendly finishes available',
      'In-house design team for OEM & ODM projects',
      'Sample delivery within 7 days',
    ],
  },
  featured: {
    label: 'Best Sellers',
    title: 'Customer Favorites',
    viewAll: 'View All 500+ Products →',
  },
  categories: {
    label: 'Our Collection',
    title: 'Find Your Perfect Box',
    byUseLabel: 'Browse by Use',
    byUseTitle: 'What will you store?',
    byStructureLabel: 'Browse by Structure',
    byStructureTitle: 'How should it open?',
    byMaterialLabel: 'Browse by Material',
    byMaterialTitle: 'Which wood suits you?',
  },
  factory: {
    label: 'Behind The Craft',
    title: 'Inside Our Factory',
    intro: '15,000 m² of dedicated woodworking space in Cao County, Shandong — from kiln-dried timber stock to hand-finished export packaging, every step happens under one roof. Sales, design and shipping are handled out of our Xiamen, Fujian office.',
    cta: 'Read Our Full Story →',
  },
  process: {
    label: 'Made in Our Workshop',
    title: 'Our Manufacturing Process',
    intro: 'Six steps, every box. From rough timber to export-ready packaging, your order moves through hands that have done this work for two decades.',
  },
  materials: {
    label: 'Wood Selection',
    title: 'Premium Materials, Naturally Sourced',
  },
  why: {
    label: 'Why Choose Us',
    title: 'The CHIC Advantage',
  },
  trust: {
    label: 'Certifications & Compliance',
    title: 'Trusted by Global Buyers',
    text: 'All our wooden products meet international export standards. We hold FSC certification for responsible forestry, and our finishes comply with EU REACH and US CARB regulations. Phytosanitary certificates issued on request for all solid wood shipments.',
  },
  cta: {
    label: 'Ready to Start?',
    titleA: 'Let’s Build Your',
    titleB: 'Perfect Wooden Box',
    sub: 'Send us your requirements and get a free quote within 24 hours. No commitment required — samples available.',
    btnEmail: 'Email Us Now →',
    btnWhatsapp: 'Chat on WhatsApp',
  },
};
