// About page — English baseline.
//
// Translated copies live alongside as ./es.js, ./fr.js, ./de.js, ./it.js,
// ./pt.js, ./ja.js, ./ko.js. Image src paths and structural fields (year,
// flag emoji, etc.) are identical across locales — only human-readable text
// changes.

const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: 'Cao County Factory · 15,000 m² site' },
  { src: F('material.jpg'),     caption: 'Solid wood inventory · paulownia, pine, oak' },
  { src: F('1-1.jpg'),          caption: 'Wood-prep workshop' },
  { src: F('painting.jpg'),     caption: 'Dust-controlled spray finishing line' },
  { src: F('1-3.jpg'),          caption: 'Hinge installation · hardware QC' },
  { src: F('warehouse.jpg'),    caption: 'Finished goods warehouse · ready to ship' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: 'Sales Office · Xiamen, Fujian',  tag: 'Office'   },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: 'Hosting our customers',          tag: 'Customer' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: 'Hosting an overseas buyer',      tag: 'Customer' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: 'Our team',                       tag: 'Team'     },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: 'Cutting to Size',
    desc: 'Solid lumber and engineered panels are dimensioned on our panel saws. Tolerance is held to ±0.5 mm so every blank fits the next station perfectly.' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: 'Shape-Cutting',
    desc: 'CNC routers and band saws cut the curves, mitres and rebates that define each box. Programs are saved per SKU for repeatable mass production.' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: 'Mortise Cutting',
    desc: 'Hinge mortises, lock pockets and divider grooves are routed and chiseled in. This is where joinery accuracy decides how the lid will sit.' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: 'Pre-Assembly',
    desc: 'Panels are dry-fit and gauge-checked before any glue. Hardware is test-installed first — every fit confirmed before final glue-up.' },
  { n: '05', src: P('5-polishing.jpg'),       title: 'Polishing & Sanding',
    desc: 'Multi-grit sanding from 120 → 400 produces the silk-smooth surface our finish team needs. Edges eased, corners rounded, dust extracted at source.' },
  { n: '06', src: P('6-packaging.jpeg'),      title: 'Packaging & QC',
    desc: 'Each box is inspected, wiped, and packed with corner protectors and shrink-wrap. Cartons are labelled to your spec — FBA-ready or master-carton.' },
];

export const TIMELINE = [
  { year: '2021', title: 'Founded',
    text: 'Xiamen Chic Homeware Co.,Ltd. registered in Xiamen. Founder secures partner workshop in Cao County and ships first export pallets.' },
  { year: '2022', title: 'First Factory',
    text: 'Lease signed on dedicated 6,000 m² production site in Pulianji Town. Onboarded first European wine-box client.' },
  { year: '2023', title: 'Amazon Boom',
    text: 'Built dedicated small-MOQ line for Amazon private-label brands. Crossed 1 million units shipped in a single year.' },
  { year: '2024', title: 'FSC Certified',
    text: 'Achieved FSC chain-of-custody certification. Expanded factory to 15,000 m² with new finishing and QC area.' },
  { year: '2025', title: 'Going Global',
    text: 'Active customers in 40+ countries. In-house ID + 3D mockup team launched to support OEM/ODM growth.' },
];

export const LOCATIONS = [
  {
    eyebrow: 'Sales Office',
    name: 'Xiamen, Fujian',
    role: 'Sales · design · export documentation',
    addr: '101, No. 8 Houweizhaiding Road, Maluan, Xinglin, Jimei District, Xiamen, Fujian, China',
    details: [
      'Account management & English-speaking sales team',
      '3D rendering, sample coordination, freight booking',
      'Ten minutes from Xiamen Gaoqi International Airport',
      'Container shipping via Xiamen Port — 130+ direct global routes',
    ],
  },
  {
    eyebrow: 'Production Factory',
    name: 'Cao County, Shandong',
    role: 'Manufacturing · finishing · QC · packing',
    addr: 'North of the Administration for Market Regulation Office, Pulianji Village, Pulianji Town, Cao County, Heze City, Shandong Province, China',
    details: [
      '15,000 m² floor with CNC, laser, finishing & assembly lines',
      '120+ skilled workers across two production shifts',
      'Local access to paulownia, pine, bamboo, walnut and oak',
      'Direct rail container service to Qingdao & Lianyungang ports',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: 'Europe',
    text: 'UK, Germany, France, Netherlands, Italy, Spain — REACH-compliant finishes, EU phytosanitary certificates standard.' },
  { flag: '🇺🇸', name: 'North America',
    text: 'United States & Canada — CARB P2 finishes, FBA-ready packaging available, weekly LCL consolidations.' },
  { flag: '🇯🇵', name: 'Japan',
    text: 'Tokyo, Osaka, Nagoya — JIS-grade tolerance standards, JAS-compliant labeling on request.' },
  { flag: '🇰🇷', name: 'Korea',
    text: 'Seoul, Busan — KC-mark labeling supported, fast Incheon & Busan port routes from Xiamen.' },
];

export const VALUES = [
  { num: '01', title: 'Real Factory, Not a Trader',
    text: 'Our 15,000 m² Cao County factory is owned and operated by Chic Homeware directly — there is no middleman, no markup chain, and no telephone game between you and the production floor.' },
  { num: '02', title: 'Built for Small + Mid Volume',
    text: 'Most factories want 5,000-pc orders. We are built around 200 to 5,000 piece runs — the volume that matters to Amazon brand owners, Etsy sellers, gift retailers, and brand launches.' },
  { num: '03', title: 'English-Speaking Sales',
    text: 'Our Xiamen office handles your project end-to-end in fluent English — from quoting to artwork to shipping documents. Time-zone overlap with EU and US morning hours.' },
];

// `slug` keys into components/CertIcons.jsx for inline SVG rendering.
// Same registry as the home page CERTS array; About page has its own
// shape (status + pending) but reuses the same icon system.
export const CERTS = [
  { slug: 'fsc',      name: 'FSC',       status: 'Certified',     pending: false },
  { slug: 'eu-reach', name: 'EU REACH',  status: '2026 Roadmap',  pending: true  },
  { slug: 'carb',     name: 'CARB P2',   status: '2026 Roadmap',  pending: true  },
  { slug: 'iso-9001', name: 'ISO 9001',  status: 'In Process',    pending: true  },
];

export const COPY = {
  meta: {
    title: 'About Us — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — five-year-old custom wooden box manufacturer with a sales office in Xiamen and a 15,000 m² factory in Cao County, Shandong. Serving Amazon brands and importers across Europe, the US, Japan and Korea.',
    ogDescription:
      'Five-year-old custom wooden box manufacturer with a 15,000 m² factory in Cao County, Shandong, serving Amazon brands and importers worldwide.',
  },
  hero: {
    eyebrow: 'About Xiamen Chic Homeware',
    titleA: 'Five Years of',
    titleEm: 'Wood Craft.',
    titleB: 'Two Locations. One Promise.',
    sub: 'Xiamen Chic Homeware Co.,Ltd. is a custom wooden homeware manufacturer built to serve the modern import market — from Amazon brand owners and European retailers to Japanese and Korean wholesalers. A young factory with deep industry roots: founder-led, factory-direct, export-ready.',
  },
  stats: {
    years: 'Years in Business',
    floor: 'Factory Floor',
    workers: 'Skilled Workers',
    markets: 'Export Markets',
  },
  story: {
    label: 'Our Story',
    titleA: 'Built by Wood People,',
    titleEm: 'for Brand People.',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd. was founded in 2021</strong> by a team of veterans from China’s wood products industry. Our founder spent more than two decades inside the wood trade — walking timber yards in Cao County, running CNC programs in Heze, and managing export orders out of Xiamen — before starting Chic to do things differently.',
    p2html:
      'The premise was simple: combine a real factory in <strong>Cao County, Shandong</strong> — the historic heart of China’s wooden box industry — with a modern sales office in <strong>Xiamen, Fujian</strong>, one of the country’s leading export gateways. One side handles the wood; the other side handles the world.',
    p3html:
      'Five years in, we serve hundreds of brands across Europe, North America, Japan and Korea — including a long roster of Amazon private-label sellers who count on our quick turnaround and consistent finish.',
    features: [
      'Founder-led, no trading-company markup',
      'Factory floor + sales office under one company',
      '20+ years of wood-industry experience at the top',
      'Built specifically for export — not domestic resale',
    ],
    showroomTag: 'Showroom · Xiamen',
    quote: '“Cao County is where the world’s wooden boxes are made. We’re proud to be from here.”',
    showroomAlt: 'Xiamen Chic Homeware showroom — finished wooden products',
  },
  timeline: {
    label: 'Five-Year Journey',
    titleA: 'From Workshop to',
    titleEm: 'Worldwide',
  },
  locations: {
    label: 'Two Locations',
    titleA: 'Xiamen +',
    titleEm: 'Cao County',
  },
  team: {
    label: 'Our People',
    titleA: 'The Team — & the',
    titleEm: 'Customers',
    titleB: 'Who Visit Us',
    intro: 'We’re a small, founder-led team in Xiamen, and we love hosting the buyers, brand owners and Amazon sellers who come to see how their boxes are made.',
  },
  gallery: {
    label: 'Inside the Factory',
    titleA: 'A Look at Our',
    titleEm: 'Cao County Site',
    intro: 'From timber yard to finished crate — every step happens under one roof, under our own people’s eyes.',
  },
  production: {
    label: 'How a Box Gets Made',
    titleA: 'Six Steps from',
    titleEm: 'Lumber to Doorstep',
    intro: 'Every wooden box that leaves our Cao County factory passes through the same six production stations. Photographed below in our own workshop — no stock images, no third-party sourcing, every shot taken on our shop floor.',
  },
  markets: {
    label: 'Where Our Boxes Go',
    titleA: 'Export to',
    titleEm: 'Developed Markets',
    intro: 'We focus exclusively on developed-market exports — countries where buyers expect consistent quality, accurate documentation, and on-time delivery. Our team speaks English, prepares export paperwork to spec, and works on your timezone. No surprises at customs.',
    amazonHtml:
      '<strong>We are an Amazon-friendly manufacturer.</strong> A large share of our 200+ active customers are Amazon private-label brands across the US, UK and Germany marketplaces. We ship FBA-ready cartons with FNSKU labels, provide UPC barcoding, and meet Amazon’s packaging and dimensional weight rules out of the box.',
  },
  values: {
    label: 'How We Work',
    titleA: 'What Sets Us',
    titleEm: 'Apart',
  },
  certs: {
    label: 'Standards & Compliance',
    title: 'Certifications',
    paragraph:
      'Our wood is sourced from FSC-certified forestry channels, and we operate a chain-of-custody program to keep audit trails clean from log to carton. Additional standards listed below are on our 2026 roadmap as customer demand grows.',
  },
  cta: {
    label: 'Talk to Us',
    titleA: 'Let’s Build Something',
    titleB: 'Together',
    sub: 'Tell us about your project — wood type, sizes, quantity, and any branding requirements. We respond within 24 hours.',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
