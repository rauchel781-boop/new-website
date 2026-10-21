// Home page — English baseline.
//
// FEATURED, FACTORY_TILES, PROCESS, MATERIALS, WHY, CERTS arrays + COPY object
// hold all translatable strings. Translated copies live as ./es.js, ./fr.js, etc.

export const UPDATED_AT = '2026-10-21';
export const SEO = {
  title: 'Custom Wooden Boxes - Wholesale Manufacturer | CHIC',
  description: 'Custom wooden boxes made to your dimensions, wood, finish and logo. OEM and ODM orders from 200 pieces per design. Send your brief for a wholesale quote.',
};

// Best Sellers now link to the SPECIFIC product detail page rather than
// the category landing. Per the SEO audit:
//   - Concentrates internal link equity on the individual SKU pages
//   - Lets each Best Seller actually surface its real product page
//   - Avoids multiple Best Sellers pointing at the same category URL
// If you change a featured product, update both `href` and `img` together.
export const FEATURED = [
  { href: '/products/gift-packaging/luxury-magnetic-gift-box', img: '/gift-packaging-box/luxury-magnetic-gift-box/luxury-magnetic-gift-box-01.webp', w: 800, h: 800,
    tag: 'Gift & Packaging Boxes', name: 'Luxury Magnetic Gift Box', meta: 'Hidden magnets · Velvet insert' },
  { href: '/products/gift-packaging/sliding-lid-gift-box', img: '/gift-packaging-box/sliding-lid-gift-box/sliding-lid-gift-box-01.webp', w: 1488, h: 1182,
    tag: 'Gift & Packaging Boxes', name: 'Sliding Lid Gift Box', meta: 'Hardware-free · Routed sliding lid' },
  { href: '/products/with-lock/large-black-wooden-stash-box-kit', img: '/wooden-boxes-with-lock/large-black-wooden-stash-box-kit/stash-box-11.webp', w: 1200, h: 1200,
    tag: 'Boxes with Lock', name: 'Large Black Stash Box Kit', meta: 'Combination lock · Multi-compartment' },
  { href: '/products/tea-coffee/bamboo-tea-organizer-box', img: '/tea-coffee-boxes/bamboo-tea-bag-organizer-box/main-1-5.webp', w: 800, h: 800,
    tag: 'Tea & Coffee', name: 'Bamboo Tea Bag Organizer', meta: 'Sliding lid · Configurable compartments' },
  { href: '/products/hinged/wooden-watch-box-with-linen-interior-pillow', img: '/hinged-wooden-boxes/wooden-watch-box-with-linen-interior-pillow/main-1-3.webp', w: 720, h: 720,
    tag: 'Watch & Jewelry', name: 'Wooden Watch Display Box', meta: 'Linen pillow · Single-watch presentation' },
  { href: '/products/hinged/acacia-wooden-storage-box', img: '/acacia-wood-box/3/3-01.webp', w: 1010, h: 1144,
    tag: 'Acacia Series', name: 'Acacia Wood Keepsake Box', meta: 'Rich grain · Hardwood durability' },
];

export const FACTORY_TILES = [
  { href: '/about', img: '/factory/chic-factory.webp', alt: 'Our factory headquarters', w: 900, h: 900,
    num: '01 · Headquarters', text: '20,000 m² Cao County Facility', cls: 'fac-1' },
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
    desc: 'A fine, straight grain for tea organizers, storage and gift packaging. Confirm the finish for the intended use.' },
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
    text: 'Confirm the destination, materials and packing before ordering so the required commercial and shipment documents can be agreed for your project.' },
];

// `slug` is the stable cert key used by <CertIcon slug="..."> to pick
// the right inline SVG (components/CertIcons.jsx). Translated locale
// files keep the same `slug` values; only `name` localizes.
// Publish a certification only after its entity, product scope and validity
// have been checked. A report for one bamboo model does not cover the range.
export const CERTS = [];

export const COPY = {
  hero: {
    titleA: 'Custom Wooden Box',
    titleEm1: 'Manufacturer',
    titleB: '& Wholesale',
    titleEm2: 'OEM Supplier',
    sub: 'Custom wooden gift, presentation and storage boxes for brands, importers and distributors. Specify the wood, dimensions, closure, insert and logo for OEM or ODM production from 200 pieces per design.',
    btnPrimary: 'View Best Sellers →',
    btnOutline: 'Request a Sample and Quote',
    metaItems: [
      { num: '20+', label: 'Years Team Experience' },
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
      'MOQ 200 per Design',
      'Full OEM / ODM',
      'Custom Sizes and Branding',
      'Pre-Production Sample Approval',
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
    text: 'With our 20,000 m² factory in Cao County, Shandong — the historic heart of China’s wooden box industry — and our sales office in Xiamen, Fujian, we are a dedicated wooden box manufacturer serving retailers, brands, and importers across Europe, North America, Japan, Korea and beyond.',
    features: [
      "MOQ: 200 pcs",
      'Full customization: size, finish, logo, insert, hardware',
      'Confirm material and finish documents for your model and intended use',
      'In-house design team for OEM & ODM projects',
      'Sampling schedule confirmed against the design and finish',
    ],
  },
  featured: {
    label: 'Best Sellers',
    title: 'Customer Favorites',
    viewAll: 'View All Products →',
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
    intro: '20,000 m² of dedicated woodworking space in Cao County, Shandong — from kiln-dried timber stock to hand-finished export packaging, every step happens under one roof. Sales, design and shipping are handled out of our Xiamen, Fujian office.',
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
    label: 'Order Specifications & Documentation',
    title: 'Check the Documents for Your Actual Product',
    text: 'Tell us the model, wood, finish, intended contents and importing market. We will confirm which documents are available for that specification. A report for one product or material does not establish compliance for every box. Agree any required testing, packing and shipment documentation before approving production.',
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
