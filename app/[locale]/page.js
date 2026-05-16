// Home page — CHIC redesign in WOOD palette (matches /products).
// Sections: Hero · Stats · Intro · Categories · Custom Process · Materials · Why Us · Trust · CTA.
// The site-wide Header/Footer come from app/layout.js, so we don't repeat nav/footer here.

import { Link } from '@/i18n/navigation';
import IntroCarousel from '@/components/IntroCarousel';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { getHome } from '@/data/home';

// Organization + WebSite JSON-LD for the homepage. Lets Google associate
// the brand name, logo, contact info and social accounts with the domain.
// Dual @type (Organization + Manufacturer) signals B2B manufacturing role
// to Google for industry-specific knowledge panel features.
const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'Manufacturer'],
  '@id': `${SITE.siteUrl}/#organization`,
  name: SITE.company.legalName,
  alternateName: SITE.company.brand,
  url: SITE.siteUrl,
  logo: `${SITE.siteUrl}/logo.png`,
  image: `${SITE.siteUrl}/logo.png`,
  description:
    'CHIC (Xiamen Chic Homeware Co., Ltd.) is a Chinese B2B manufacturer of custom wooden boxes, packaging, and homeware — 15,000 m² factory in Cao County, Shandong, plus a sales / design office in Xiamen, Fujian. We serve retail brands, hospitality, and packaging clients in the US, EU, UK, Japan, Korea, and Australia with hinged, sliding-lid, drawer, magnetic, lockable and open-tray box formats in acacia, walnut, oak, pine, paulownia, and bamboo.',
  slogan: SITE.company.tagline,
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 120,
    unitText: 'employees',
  },
  knowsAbout: [
    'Custom wooden boxes',
    'Wooden packaging',
    'OEM / ODM woodworking',
    'B2B retail packaging',
    'Tea and coffee storage boxes',
    'Hinged wooden boxes',
    'Sliding-lid wooden boxes',
    'Drawer wooden boxes',
    'Magnetic wooden boxes',
    'Wooden lock boxes',
    'Acacia · walnut · oak · pine · paulownia · bamboo',
    'Laser engraving · hot foil · pyrography',
  ],
  areaServed: ['US', 'EU', 'GB', 'JP', 'KR', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES', 'PT'],
  email: SITE.email,
  telephone: `+${SITE.whatsapp.number}`,
  sameAs: [
    SITE.social.linkedin,
    SITE.social.youtube,
    SITE.social.alibaba,
  ].filter(Boolean),
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: SITE.addresses.salesOffice.lines.join(' '),
      addressLocality: SITE.addresses.salesOffice.city,
      addressCountry: 'CN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: SITE.addresses.factory.lines.join(' '),
      addressLocality: SITE.addresses.factory.city,
      addressCountry: 'CN',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE.email,
      telephone: `+${SITE.whatsapp.number}`,
      availableLanguage: ['en', 'zh'],
      areaServed: ['US', 'EU', 'JP', 'KR', 'GB', 'AU'],
    },
  ],
};

// WEBSITE_LD is now a function so inLanguage matches the page locale.
// next-intl locales map to BCP-47 region-tagged codes for better signal.
const LOCALE_TO_BCP47 = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-PT',
  ja: 'ja-JP',
  ko: 'ko-KR',
};

function buildWebsiteLd(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.siteUrl}/#website`,
    url: SITE.siteUrl,
    name: SITE.company.brand,
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    inLanguage: LOCALE_TO_BCP47[locale] || 'en-US',
  };
}

// Service schema — describes the OEM/ODM custom wooden box service
// offering. Helps Google surface us in "wooden box manufacturer
// services" search results and the "Services" knowledge-panel block.
// Pairs with the Organization + LocalBusiness schemas via @id refs.
const SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.siteUrl}/#service`,
  serviceType: 'Custom Wooden Box Manufacturing — OEM / ODM',
  name: 'Custom Wooden Box Manufacturing (OEM / ODM)',
  description:
    'End-to-end custom wooden box manufacturing for B2B clients. From rough timber to finished, retail-ready packaging — kiln drying, CNC cutting, joinery, finishing, branding (laser engrave / hot foil / deboss / screen print), QC and export documentation. Wood species include paulownia, pine, bamboo, acacia, walnut, oak. MOQ from 100 pieces.',
  provider: { '@id': `${SITE.siteUrl}/#organization` },
  areaServed: ['US', 'EU', 'GB', 'JP', 'KR', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES', 'PT'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Wooden Box Categories',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Gift & Packaging Boxes', url: `${SITE.siteUrl}/en/products/gift-packaging` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Watch & Jewelry Boxes', url: `${SITE.siteUrl}/en/products/watch-jewelry` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Tea & Coffee Boxes',    url: `${SITE.siteUrl}/en/products/tea-coffee` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Wine & Whisky Boxes',   url: `${SITE.siteUrl}/en/products/wine-whisky` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Kitchen & Dining',      url: `${SITE.siteUrl}/en/products/kitchen-dining` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Storage Boxes',         url: `${SITE.siteUrl}/en/products/storage` } },
    ],
  },
  termsOfService: `${SITE.siteUrl}/en/terms`,
};

// LocalBusiness schema for the Xiamen sales office. Schema.org allows a
// dedicated LocalBusiness alongside Organization — it powers Google Maps
// / "near me" / knowledge-panel results for the physical sales contact
// point. The factory address is in Cao County (4 hrs away), but it's
// not customer-facing so we don't expose it here.
const SALES_OFFICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.siteUrl}/#sales-office`,
  name: `${SITE.company.brand} — Sales & Design Office`,
  parentOrganization: { '@id': `${SITE.siteUrl}/#organization` },
  url: `${SITE.siteUrl}/contact`,
  image: `${SITE.siteUrl}/logo.png`,
  email: SITE.email,
  telephone: `+${SITE.whatsapp.number}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.addresses.salesOffice.lines.join(' '),
    addressLocality: 'Xiamen',
    addressRegion: 'Fujian',
    addressCountry: 'CN',
  },
  // 9-18 Mon–Sat (closed Sun) — matches what the contact page advertises.
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  // Approximate coordinates for Maluan, Jimei District, Xiamen.
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 24.6181,
    longitude: 118.0413,
  },
  areaServed: ['US', 'EU', 'GB', 'JP', 'KR', 'AU', 'CA', 'DE', 'FR', 'IT', 'ES', 'PT'],
  sameAs: [SITE.social.linkedin, SITE.social.alibaba].filter(Boolean),
};

const HOMEPAGE_CSS = `

.wcb-home {
  /* ── WOOD PALETTE (matches /products page) ── */
  --blue-dark: #3D2A1F;        /* wood-deep — dark sections    */
  --blue-mid:  #6B4A33;        /* wood-mid                     */
  --blue-warm: #C58E4A;        /* warm wood accent (CTA)       */
  --blue-light:#D9B98F;        /* light wood / highlight       */
  --cream:     #F6EEDF;        /* page bg                      */
  --sand:      #ECDFC6;        /* secondary section bg         */
  --charcoal:  #2A1B12;        /* near-black wood              */
  --text-muted:#7A6450;        /* muted body text              */
  --accent:    #C58E4A;

  font-family: var(--font-jost), system-ui, sans-serif;
  background: var(--cream);
  color: var(--charcoal);
  overflow-x: hidden;
}
.wcb-home *, .wcb-home *::before, .wcb-home *::after { box-sizing: border-box; }

/* ─── SECTION 1: HERO (cinematic redesign) ─── */
.wcb-home .hero {
  position: relative;
  min-height: 760px;
  height: 100vh;
  max-height: 940px;
  background: var(--charcoal);
  overflow: hidden;
  display: flex;
  align-items: stretch;
}
.wcb-home .hero-bg {
  position: absolute; inset: 0;
  z-index: 0;
  /* Mobile-first: 800px hero (~100KB). Phones get the smallest file. */
  background-image: url('/factory/chic-factory-sm.webp');
  background-size: cover;
  background-position: center;
  filter: saturate(1.05) contrast(1.05);
  transform: scale(1.04);
  animation: wcbHeroBg 18s ease-in-out infinite alternate;
}
/* Tablets — 1280px wide (~123KB) */
@media (min-width: 768px) {
  .wcb-home .hero-bg {
    background-image: url('/factory/chic-factory-md.webp');
  }
}
/* Desktops — 1920px wide (~143KB) */
@media (min-width: 1280px) {
  .wcb-home .hero-bg {
    background-image: url('/factory/chic-factory-lg.webp');
  }
}
.wcb-home .hero-bg::after {
  content: '';
  position: absolute; inset: 0;
  background:
    linear-gradient(100deg, rgba(20,12,8,0.94) 0%, rgba(42,27,18,0.86) 32%, rgba(61,42,31,0.55) 60%, rgba(20,12,8,0.55) 100%),
    radial-gradient(ellipse at 25% 70%, rgba(197,142,74,0.18) 0%, rgba(0,0,0,0) 65%);
}
.wcb-home .hero-bg::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(197,142,74,0.04) 80px, rgba(197,142,74,0.04) 81px);
  z-index: 1;
}
.wcb-home .hero-inner {
  position: relative; z-index: 2;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 90px 60px 110px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 64px;
  align-items: center;
}
.wcb-home .hero-content { max-width: 620px; }
.wcb-home .hero-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--blue-warm); margin-bottom: 28px; font-weight: 500;
  padding: 8px 18px; border: 1px solid rgba(197,142,74,0.35);
  border-radius: 100px;
  background: rgba(20,12,8,0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: wcbFadeUp .7s ease both;
}
.wcb-home .hero-eyebrow::before { content: '✦'; color: var(--blue-warm); }
.wcb-home .hero-title {
  font-family: var(--font-playfair), serif;
  font-size: clamp(2.8rem, 5.4vw, 5.4rem);
  color: var(--cream);
  line-height: 1.05;
  margin-bottom: 30px;
  letter-spacing: -1px;
  animation: wcbFadeUp .8s ease both;
}
.wcb-home .hero-title em {
  color: var(--blue-warm); font-style: italic;
  position: relative;
  display: inline-block;
}
.wcb-home .hero-title em::after {
  content: '';
  position: absolute; left: 0; right: 0; bottom: 4px;
  height: 14px;
  background: linear-gradient(90deg, rgba(197,142,74,0.25), rgba(197,142,74,0));
  z-index: -1;
}
.wcb-home .hero-sub {
  font-size: 1.05rem;
  color: rgba(246,238,223,0.82);
  line-height: 1.75;
  margin-bottom: 36px;
  font-weight: 300;
  max-width: 520px;
  animation: wcbFadeUp .8s .12s ease both;
}
.wcb-home .hero-btns { display: flex; gap: 14px; animation: wcbFadeUp .8s .25s ease both; flex-wrap: wrap; margin-bottom: 44px; }
.wcb-home .btn-primary {
  background: var(--blue-warm); color: white;
  padding: 17px 38px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px;
  transition: background .2s, transform .2s, box-shadow .2s;
  display: inline-flex; align-items: center; gap: 10px;
  box-shadow: 0 12px 30px rgba(197,142,74,0.35);
}
.wcb-home .btn-primary:hover { background: #D9A05E; transform: translateY(-2px); box-shadow: 0 20px 40px rgba(197,142,74,0.5); }
.wcb-home .btn-outline {
  border: 1px solid rgba(217,185,143,0.5); color: var(--blue-light);
  padding: 17px 38px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px; transition: all .2s; display: inline-flex; align-items: center; gap: 10px;
}
.wcb-home .btn-outline:hover { border-color: var(--blue-light); background: rgba(217,185,143,0.1); transform: translateY(-2px); }

.wcb-home .hero-meta {
  display: flex; gap: 40px; flex-wrap: wrap;
  padding-top: 32px;
  border-top: 1px solid rgba(217,185,143,0.18);
  animation: wcbFadeUp .8s .4s ease both;
}
.wcb-home .hero-meta-item { color: var(--cream); }
.wcb-home .hero-meta-num { font-family: var(--font-playfair), serif; font-size: 1.7rem; line-height: 1; color: var(--blue-light); }
.wcb-home .hero-meta-label { font-size: 0.64rem; letter-spacing: 3px; text-transform: uppercase; color: rgba(217,185,143,0.6); margin-top: 6px; }

/* ─── HERO COLLAGE (right) ─── */
.wcb-home .hero-collage {
  position: relative;
  height: 580px;
  animation: wcbFadeUp .9s .2s ease both;
}
.wcb-home .hc-card {
  position: absolute;
  border-radius: 6px;
  overflow: hidden;
  background: var(--blue-dark);
  box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(217,185,143,0.18);
  transition: transform .55s cubic-bezier(.2,.7,.3,1), box-shadow .4s;
}
.wcb-home .hc-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.wcb-home .hc-card.is-product { background: linear-gradient(135deg, #F6EEDF 0%, #ECDFC6 100%); }
.wcb-home .hc-card.is-product img { object-fit: contain; padding: 18px; }
.wcb-home .hc-card::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(20,12,8,0.85) 100%);
  pointer-events: none;
}
.wcb-home .hc-cap {
  position: absolute; left: 16px; bottom: 14px; right: 16px;
  color: var(--cream);
  font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase;
  font-weight: 500;
  z-index: 2;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
}
.wcb-home .hc-card.is-product .hc-cap { color: var(--blue-dark); text-shadow: none; }
.wcb-home .hc-card:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(197,142,74,0.45); z-index: 5; }

.wcb-home .hc-main { width: 78%; height: 78%; top: 11%; right: 0; z-index: 2; }
.wcb-home .hc-sub-1 { width: 46%; height: 36%; top: 0; left: 4%; z-index: 3; transform: rotate(-2.5deg); }
.wcb-home .hc-sub-2 { width: 44%; height: 32%; bottom: 2%; left: 0; z-index: 3; transform: rotate(2deg); }

.wcb-home .hc-stamp {
  position: absolute;
  top: -10px; right: -16px;
  width: 116px; height: 116px;
  border-radius: 50%;
  background: var(--blue-warm);
  color: white;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-family: var(--font-playfair), serif;
  box-shadow: 0 14px 40px rgba(197,142,74,0.55);
  z-index: 5;
  border: 3px solid var(--cream);
  animation: wcbStampPulse 3.5s ease infinite;
}
.wcb-home .hc-stamp-num { font-size: 2rem; line-height: 1; }
.wcb-home .hc-stamp-sub { font-size: 0.55rem; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px; font-family: var(--font-jost), sans-serif; opacity: 0.9; }

/* hero trust strip at bottom of hero */
.wcb-home .hero-trust {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: rgba(20,12,8,0.78);
  border-top: 1px solid rgba(197,142,74,0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 18px 60px;
  display: flex; justify-content: center; align-items: center; gap: 40px;
  flex-wrap: wrap;
  z-index: 4;
}
.wcb-home .hero-trust-item {
  display: flex; align-items: center; gap: 10px;
  color: rgba(217,185,143,0.85);
  font-size: 0.7rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
}
.wcb-home .hero-trust-icon { color: var(--blue-warm); font-size: 0.95rem; }

/* ─── SECTION 2: STATS ─── */
.wcb-home .stats-bar {
  background: var(--blue-dark); padding: 40px 60px;
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid rgba(197,142,74,0.2);
}
.wcb-home .stat-item { text-align: center; padding: 0 20px; position: relative; }
.wcb-home .stat-item:not(:last-child)::after { content: ''; position: absolute; right: 0; top: 10%; height: 80%; width: 1px; background: rgba(197,142,74,0.2); }
.wcb-home .stat-num { font-family: var(--font-playfair), serif; font-size: 2.8rem; color: var(--blue-light); line-height: 1; }
.wcb-home .stat-num span { font-size: 1.4rem; color: var(--blue-warm); }
.wcb-home .stat-label { font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; color: var(--text-muted); margin-top: 8px; }

/* ─── SECTION 3: INTRO ─── */
.wcb-home .intro-wrap { background: var(--cream); }
.wcb-home .intro { padding: 120px 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; max-width: 1300px; margin: 0 auto; }
.wcb-home .intro-label { font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: var(--blue-warm); margin-bottom: 20px; }
.wcb-home .intro-title { font-family: var(--font-playfair), serif; font-size: 2.8rem; line-height: 1.2; margin-bottom: 24px; color: var(--blue-dark); }
.wcb-home .intro-title em { color: var(--blue-mid); font-style: italic; }
.wcb-home .intro-text { font-size: 0.95rem; color: var(--text-muted); line-height: 1.9; margin-bottom: 32px; font-weight: 300; }
.wcb-home .intro-features { display: flex; flex-direction: column; gap: 16px; }
.wcb-home .intro-feat { display: flex; align-items: center; gap: 14px; font-size: 0.85rem; color: var(--blue-dark); }
.wcb-home .feat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--blue-warm); flex-shrink: 0; }
.wcb-home .intro-visual {
  position: relative; height: 480px;
  background: linear-gradient(135deg, #3D2A1F 0%, #6B4A33 40%, #C58E4A 70%, #6B4A33 100%);
  border-radius: 4px; overflow: hidden;
}
.wcb-home .intro-visual::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(170deg, transparent 0px, transparent 12px, rgba(255,255,255,0.04) 12px, rgba(255,255,255,0.04) 14px);
}
.wcb-home .intro-visual-text {
  position: absolute; bottom: 32px; left: 32px; right: 32px;
  color: rgba(246,238,223,0.92); font-family: var(--font-playfair), serif;
  font-size: 1.4rem; line-height: 1.4;
}
.wcb-home .intro-tag {
  position: absolute; top: 32px; right: 32px;
  background: rgba(61,42,31,0.7); border: 1px solid rgba(197,142,74,0.4);
  color: var(--blue-light); padding: 8px 16px; font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
  border-radius: 2px;
}

/* ─── INTRO CAROUSEL ─── */
.wcb-home .ic-wrap {
  position: absolute; inset: 0;
  overflow: hidden;
  border-radius: 4px;
  background: var(--blue-dark);
}
.wcb-home .ic-track {
  display: flex;
  width: 100%; height: 100%;
  transition: transform .75s cubic-bezier(.65,.05,.36,1);
  will-change: transform;
}
.wcb-home .ic-slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
}
.wcb-home .ic-slide img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.wcb-home .ic-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(61,42,31,0) 35%, rgba(61,42,31,0.55) 75%, rgba(61,42,31,0.92) 100%);
  pointer-events: none;
}
.wcb-home .ic-caption {
  position: absolute; left: 32px; right: 32px; bottom: 36px;
  color: var(--cream);
  z-index: 2;
}
.wcb-home .ic-num {
  font-size: 0.65rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--blue-light);
  margin-bottom: 10px;
  opacity: 0.85;
  font-weight: 500;
}
.wcb-home .ic-label {
  font-family: var(--font-playfair), serif;
  font-size: 1.5rem;
  line-height: 1.3;
}
.wcb-home .ic-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 44px; height: 44px;
  border: 1px solid rgba(217,185,143,0.45);
  background: rgba(61,42,31,0.55);
  color: var(--cream);
  font-size: 1.6rem; line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, border-color .2s, transform .2s;
  z-index: 3;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-family: var(--font-jost), sans-serif;
  padding: 0;
}
.wcb-home .ic-arrow:hover { background: var(--blue-warm); border-color: var(--blue-warm); transform: translateY(-50%) scale(1.05); }
.wcb-home .ic-prev { left: 18px; }
.wcb-home .ic-next { right: 18px; }
.wcb-home .ic-dots {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px;
  z-index: 3;
}
.wcb-home .ic-dot {
  width: 22px; height: 3px;
  background: rgba(246,238,223,0.3);
  border: none; padding: 0;
  cursor: pointer;
  transition: background .25s, width .25s;
  border-radius: 2px;
}
.wcb-home .ic-dot.is-active { background: var(--blue-light); width: 34px; }
.wcb-home .ic-dot:hover { background: rgba(246,238,223,0.6); }
.wcb-home .ic-tag {
  position: absolute; top: 24px; right: 24px;
  background: rgba(61,42,31,0.7); border: 1px solid rgba(197,142,74,0.4);
  color: var(--blue-light); padding: 8px 16px; font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
  border-radius: 2px;
  z-index: 3;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

/* ─── SECTION 4: CATEGORIES ─── */
.wcb-home .categories { background: var(--sand); padding: 100px 60px; }
.wcb-home .section-header { text-align: center; margin-bottom: 70px; }
.wcb-home .section-label { font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: var(--blue-warm); margin-bottom: 16px; }
.wcb-home .section-title { font-family: var(--font-playfair), serif; font-size: 2.5rem; color: var(--blue-dark); }
.wcb-home .section-line { width: 48px; height: 2px; background: var(--blue-warm); margin: 20px auto 0; }
.wcb-home .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; max-width: 1200px; margin: 0 auto; }
.wcb-home .cat-col {
  background: white; padding: 48px 40px;
  border-top: 3px solid var(--blue-warm);
  transition: transform .2s, box-shadow .2s;
}
.wcb-home .cat-col:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(61,42,31,0.12); }
.wcb-home .cat-col-label { font-size: 0.6rem; letter-spacing: 5px; text-transform: uppercase; color: var(--blue-warm); margin-bottom: 24px; }
.wcb-home .cat-col-title { font-family: var(--font-playfair), serif; font-size: 1.3rem; color: var(--blue-dark); margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--sand); }
.wcb-home .cat-items { display: flex; flex-direction: column; gap: 12px; }
.wcb-home .cat-item { display: flex; align-items: center; gap: 12px; font-size: 0.85rem; color: var(--blue-mid); padding: 8px 0; border-bottom: 1px solid rgba(217,185,143,0.35); cursor: pointer; transition: color .2s; text-decoration: none; }
.wcb-home .cat-item:hover { color: var(--blue-warm); }
.wcb-home .cat-item::before { content: '→'; color: var(--blue-warm); opacity: 0.5; transition: opacity .2s, transform .2s; transform: translateX(0); }
.wcb-home .cat-item:hover::before { opacity: 1; transform: translateX(4px); }
.wcb-home .cat-item:last-child { border-bottom: none; }

/* ─── SECTION 5: CUSTOMIZATION ─── */
.wcb-home .custom-section { padding: 120px 60px; background: var(--charcoal); position: relative; overflow: hidden; }
.wcb-home .custom-section::before {
  content: 'CUSTOM';
  position: absolute; top: -20px; left: -10px;
  font-family: var(--font-playfair), serif;
  font-size: 15rem; color: rgba(197,142,74,0.05); font-weight: 700;
  line-height: 1; pointer-events: none; white-space: nowrap;
}
.wcb-home .custom-inner { max-width: 1200px; margin: 0 auto; position: relative; }
.wcb-home .custom-header { text-align: center; margin-bottom: 80px; }
.wcb-home .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
.wcb-home .step-card { text-align: center; }
.wcb-home .step-num { font-family: var(--font-playfair), serif; font-size: 3.5rem; color: rgba(197,142,74,0.25); line-height: 1; margin-bottom: 16px; }
.wcb-home .step-icon { width: 56px; height: 56px; border: 1px solid rgba(197,142,74,0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.4rem; }
.wcb-home .step-title { font-family: var(--font-playfair), serif; font-size: 1.1rem; color: var(--blue-light); margin-bottom: 12px; }
.wcb-home .step-text { font-size: 0.8rem; color: rgba(217,185,143,0.5); line-height: 1.8; font-weight: 300; }
.wcb-home .steps-grid .step-card:not(:last-child) { position: relative; }
.wcb-home .steps-grid .step-card:not(:last-child)::after { content: '→'; position: absolute; top: 80px; right: -24px; color: rgba(197,142,74,0.3); font-size: 1.2rem; }

/* ─── SECTION 6: MATERIALS ─── */
.wcb-home .materials { padding: 100px 60px; background: var(--cream); }
.wcb-home .mat-inner { max-width: 1200px; margin: 0 auto; }
.wcb-home .mat-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 60px; }
.wcb-home .mat-card {
  padding: 36px 20px; text-align: center; cursor: pointer;
  border: 1px solid rgba(197,142,74,0.2); border-radius: 2px;
  transition: all .25s; background: white;
  text-decoration: none; color: inherit; display: block;
}
.wcb-home .mat-card:hover { border-color: var(--blue-warm); background: rgba(197,142,74,0.05); transform: translateY(-3px); }
.wcb-home .mat-swatch { width: 52px; height: 52px; border-radius: 50%; margin: 0 auto 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.wcb-home .swatch-paulownia { background: linear-gradient(135deg, #EBD9B8, #D9B98F); }
.wcb-home .swatch-pine      { background: linear-gradient(135deg, #D9B98F, #A07852); }
.wcb-home .swatch-bamboo    { background: linear-gradient(135deg, #C8B68A, #94814A); }
.wcb-home .swatch-acacia    { background: linear-gradient(135deg, #A07852, #5C3A24); }
.wcb-home .swatch-walnut    { background: linear-gradient(135deg, #5C3A24, #2A1B12); }
.wcb-home .mat-name { font-family: var(--font-playfair), serif; font-size: 0.95rem; color: var(--blue-dark); margin-bottom: 6px; }
.wcb-home .mat-desc { font-size: 0.7rem; color: var(--text-muted); line-height: 1.6; }

/* ─── SECTION 7: WHY US ─── */
.wcb-home .why-us { padding: 100px 60px; background: var(--blue-dark); }
.wcb-home .why-inner { max-width: 1200px; margin: 0 auto; }
.wcb-home .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; margin-top: 60px; }
.wcb-home .why-card { background: rgba(255,255,255,0.03); padding: 48px 40px; border: 1px solid rgba(197,142,74,0.12); transition: background .2s; }
.wcb-home .why-card:hover { background: rgba(197,142,74,0.08); }
.wcb-home .why-icon { font-size: 2rem; margin-bottom: 20px; }
.wcb-home .why-title { font-family: var(--font-playfair), serif; font-size: 1.2rem; color: var(--blue-light); margin-bottom: 14px; }
.wcb-home .why-text { font-size: 0.85rem; color: rgba(217,185,143,0.55); line-height: 1.9; font-weight: 300; }

/* ─── SECTION 8: TRUST ─── */
.wcb-home .trust { padding: 80px 60px; background: var(--sand); }
.wcb-home .trust-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.wcb-home .trust-text .section-label { margin-bottom: 16px; }
.wcb-home .trust-text .section-title { font-family: var(--font-playfair), serif; font-size: 2rem; color: var(--blue-dark); margin-bottom: 24px; text-align: left; }
.wcb-home .trust-text p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.9; font-weight: 300; }
.wcb-home .cert-badges { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.wcb-home .cert-badge { background: white; padding: 24px 16px; text-align: center; border-radius: 2px; border: 1px solid rgba(197,142,74,0.2); }
.wcb-home .cert-icon { font-size: 1.8rem; margin-bottom: 8px; }
.wcb-home .cert-name { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--blue-mid); font-weight: 500; }

/* ─── SECTION 9: CTA ─── */
.wcb-home .cta-section {
  padding: 140px 60px; text-align: center;
  background: linear-gradient(135deg, #3D2A1F 0%, #6B4A33 50%, #3D2A1F 100%);
  position: relative; overflow: hidden;
}
.wcb-home .cta-section::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(197,142,74,0.03) 30px, rgba(197,142,74,0.03) 31px);
}
.wcb-home .cta-inner { position: relative; z-index: 1; }
.wcb-home .cta-label { font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: var(--blue-warm); margin-bottom: 20px; }
.wcb-home .cta-title { font-family: var(--font-playfair), serif; font-size: clamp(2rem, 4vw, 3.5rem); color: var(--cream); margin-bottom: 20px; line-height: 1.2; }
.wcb-home .cta-sub { font-size: 1rem; color: rgba(217,185,143,0.7); margin-bottom: 48px; font-weight: 300; }
.wcb-home .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* ─── FEATURED PRODUCTS ─── */
.wcb-home .featured { padding: 110px 60px 100px; background: var(--cream); }
.wcb-home .feat-inner { max-width: 1300px; margin: 0 auto; }
.wcb-home .feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 60px;
}
.wcb-home .feat-card {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  box-shadow: 0 8px 28px rgba(61,42,31,0.08);
  cursor: pointer;
  transition: transform .35s, box-shadow .35s;
  text-decoration: none;
  color: inherit;
  display: block;
}
.wcb-home .feat-card:hover { transform: translateY(-8px); box-shadow: 0 30px 70px rgba(61,42,31,0.18); }
.wcb-home .feat-card img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .8s ease;
}
.wcb-home .feat-card:hover img { transform: scale(1.06); }
.wcb-home .feat-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(20,12,8,0.92) 100%);
  pointer-events: none;
}
.wcb-home .feat-content { position: absolute; bottom: 26px; left: 26px; right: 26px; color: white; z-index: 2; }
.wcb-home .feat-tag {
  display: inline-block;
  background: var(--blue-warm); color: white;
  padding: 5px 14px; border-radius: 2px;
  font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
  margin-bottom: 12px;
}
.wcb-home .feat-name { font-family: var(--font-playfair), serif; font-size: 1.25rem; line-height: 1.3; margin-bottom: 4px; }
.wcb-home .feat-meta { font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.65); }
.wcb-home .feat-arrow {
  position: absolute; top: 18px; right: 18px;
  width: 42px; height: 42px;
  background: rgba(255,255,255,0.95);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; color: var(--blue-dark);
  opacity: 0; transform: translateY(-8px);
  transition: opacity .3s, transform .3s;
  z-index: 3;
}
.wcb-home .feat-card:hover .feat-arrow { opacity: 1; transform: translateY(0); }

/* ─── INSIDE OUR FACTORY ─── */
.wcb-home .factory-section {
  padding: 120px 60px;
  background: var(--charcoal);
  position: relative;
  overflow: hidden;
}
.wcb-home .factory-section::before {
  content: 'FACTORY';
  position: absolute; top: 30px; right: -20px;
  font-family: var(--font-playfair), serif;
  font-size: 13rem; font-weight: 700;
  color: rgba(197,142,74,0.05);
  line-height: 1; pointer-events: none; white-space: nowrap;
  letter-spacing: 8px;
}
.wcb-home .fac-inner { max-width: 1300px; margin: 0 auto; position: relative; }
.wcb-home .fac-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 230px;
  gap: 14px;
  margin-top: 60px;
}
.wcb-home .fac-tile {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: var(--blue-dark);
  box-shadow: 0 14px 36px rgba(0,0,0,0.45);
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: box-shadow .3s ease;
}
.wcb-home .fac-tile:hover { box-shadow: 0 24px 56px rgba(0,0,0,0.6); }
.wcb-home .fac-tile img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s ease; }
.wcb-home .fac-tile:hover img { transform: scale(1.06); }
.wcb-home .fac-tile::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(20,12,8,0.88) 100%);
  pointer-events: none;
}
.wcb-home .fac-cap { position: absolute; left: 18px; bottom: 16px; right: 18px; color: var(--cream); z-index: 2; }
.wcb-home .fac-cap-num {
  font-size: 0.6rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--blue-warm); margin-bottom: 4px; font-weight: 500;
}
.wcb-home .fac-cap-text { font-family: var(--font-playfair), serif; font-size: 1.1rem; }
.wcb-home .fac-1 { grid-column: 1 / 7;  grid-row: 1 / 3; }
.wcb-home .fac-2 { grid-column: 7 / 13; grid-row: 1 / 2; }
.wcb-home .fac-3 { grid-column: 7 / 10; grid-row: 2 / 3; }
.wcb-home .fac-4 { grid-column: 10 / 13; grid-row: 2 / 3; }
.wcb-home .fac-5 { grid-column: 1 / 5;  grid-row: 3 / 4; }
.wcb-home .fac-6 { grid-column: 5 / 9;  grid-row: 3 / 4; }
.wcb-home .fac-7 { grid-column: 9 / 13; grid-row: 3 / 4; }

/* ─── REAL PRODUCTION PROCESS PHOTOS ─── */
.wcb-home .process-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-top: 60px;
}
.wcb-home .pcell {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 4px;
  overflow: hidden;
  background: var(--blue-dark);
  box-shadow: 0 10px 28px rgba(0,0,0,0.35);
  border: 1px solid rgba(197,142,74,0.15);
}
.wcb-home .pcell img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; }
.wcb-home .pcell:hover img { transform: scale(1.07); }
.wcb-home .pcell::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(20,12,8,0.0) 35%, rgba(20,12,8,0.92) 100%);
  pointer-events: none;
}
.wcb-home .pcell-num {
  position: absolute; top: 14px; left: 14px;
  font-family: var(--font-playfair), serif;
  color: var(--blue-light);
  font-size: 1.4rem; line-height: 1;
  z-index: 2;
  background: rgba(20,12,8,0.55);
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(197,142,74,0.4);
}
.wcb-home .pcell-name {
  position: absolute; bottom: 16px; left: 14px; right: 14px;
  color: white;
  font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  z-index: 2;
}

/* ─── ANIMATIONS ─── */
@keyframes wcbFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes wcbScrollAnim { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
@keyframes wcbRotateBadge { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
@keyframes wcbHeroBg { 0% { transform: scale(1.04); } 100% { transform: scale(1.12) translate(-1%, -1%); } }
@keyframes wcbStampPulse { 0%,100% { box-shadow: 0 14px 40px rgba(197,142,74,0.55); } 50% { box-shadow: 0 14px 50px rgba(197,142,74,0.85); } }

/* ─── RESPONSIVE ─── */
@media (max-width: 1400px) {
  .wcb-home .hero-inner { gap: 44px; padding: 80px 40px 110px; }
  .wcb-home .hero-collage { height: 520px; }
  .wcb-home .hero-content { max-width: 560px; }
  .wcb-home .hc-stamp { width: 96px; height: 96px; }
  .wcb-home .hc-stamp-num { font-size: 1.65rem; }
}
@media (max-width: 1100px) {
  .wcb-home .hero-inner { grid-template-columns: 1fr; gap: 50px; padding: 70px 32px 130px; }
  .wcb-home .hero-collage { height: 440px; max-width: 600px; margin: 0 auto; width: 100%; }
  .wcb-home .hero-trust { gap: 22px; padding: 14px 28px; }
  .wcb-home .feat-grid { grid-template-columns: repeat(2, 1fr); }
  .wcb-home .process-grid { grid-template-columns: repeat(3, 1fr); }
  .wcb-home .fac-grid { grid-template-columns: repeat(6, 1fr); grid-auto-rows: 200px; }
  .wcb-home .fac-1 { grid-column: 1 / 4; grid-row: 1 / 3; }
  .wcb-home .fac-2 { grid-column: 4 / 7; grid-row: 1 / 2; }
  .wcb-home .fac-3 { grid-column: 4 / 6; grid-row: 2 / 3; }
  .wcb-home .fac-4 { grid-column: 6 / 7; grid-row: 2 / 3; }
  .wcb-home .fac-5 { grid-column: 1 / 3; grid-row: 3 / 4; }
  .wcb-home .fac-6 { grid-column: 3 / 5; grid-row: 3 / 4; }
  .wcb-home .fac-7 { grid-column: 5 / 7; grid-row: 3 / 4; }
}
@media (max-width: 960px) {
  .wcb-home .hero { height: auto; min-height: unset; max-height: unset; }
  .wcb-home .hero-inner { padding: 60px 24px 130px; }
  .wcb-home .hero-eyebrow { font-size: 0.62rem; letter-spacing: 3px; padding: 6px 14px; }
  .wcb-home .hero-content { max-width: 100%; }
  .wcb-home .hero-collage { height: 380px; }
  .wcb-home .hc-stamp { width: 80px; height: 80px; top: -8px; right: -8px; }
  .wcb-home .hc-stamp-num { font-size: 1.4rem; }
  .wcb-home .hero-meta { gap: 24px; padding-top: 24px; }
  .wcb-home .hero-meta-num { font-size: 1.4rem; }
  .wcb-home .stats-bar { grid-template-columns: repeat(2, 1fr); padding: 28px 20px; gap: 20px 0; }
  .wcb-home .stat-item:nth-child(2)::after { display: none; }
  .wcb-home .intro { grid-template-columns: 1fr; gap: 50px; padding: 80px 28px; }
  .wcb-home .cat-grid { grid-template-columns: 1fr; }
  .wcb-home .categories, .wcb-home .custom-section, .wcb-home .materials, .wcb-home .why-us, .wcb-home .trust, .wcb-home .cta-section, .wcb-home .featured, .wcb-home .factory-section { padding-left: 24px; padding-right: 24px; }
  .wcb-home .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 30px; }
  .wcb-home .steps-grid .step-card::after { display: none !important; }
  .wcb-home .mat-grid { grid-template-columns: repeat(2, 1fr); }
  .wcb-home .why-grid { grid-template-columns: 1fr; }
  .wcb-home .trust-inner { grid-template-columns: 1fr; gap: 40px; }
  .wcb-home .feat-grid { grid-template-columns: 1fr; gap: 18px; }
  .wcb-home .process-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .wcb-home .fac-grid { display: flex; flex-direction: column; }
  .wcb-home .fac-tile { aspect-ratio: 4/3; }
  .wcb-home .factory-section::before { display: none; }
}
`;

export default async function HomePage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const { COPY, FEATURED, FACTORY_TILES, PROCESS, MATERIALS, WHY, CERTS } = getHome(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="wcb-home">
      {/* LCP preload — responsive hero image. */}
      <link
        rel="preload"
        as="image"
        href="/factory/chic-factory-sm.webp"
        imageSrcSet="/factory/chic-factory-sm.webp 800w, /factory/chic-factory-md.webp 1280w, /factory/chic-factory-lg.webp 1920w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <JsonLd data={ORG_LD} />
      <JsonLd data={buildWebsiteLd(locale)} />
      <JsonLd data={SALES_OFFICE_LD} />
      <JsonLd data={SERVICE_LD} />
      <style dangerouslySetInnerHTML={{ __html: HOMEPAGE_CSS }} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              {COPY.hero.titleA} <em>{COPY.hero.titleEm1}</em><br />
              {COPY.hero.titleB} <em>{COPY.hero.titleEm2}</em>
            </h1>
            <p className="hero-sub">{COPY.hero.sub}</p>
            <div className="hero-btns">
              <a href="#featured" className="btn-primary">{COPY.hero.btnPrimary}</a>
              <a href="#contact" className="btn-outline">{COPY.hero.btnOutline}</a>
            </div>
            <div className="hero-meta">
              {COPY.hero.metaItems.map((m, i) => (
                <div className="hero-meta-item" key={i}>
                  <div className="hero-meta-num">{m.num}</div>
                  <div className="hero-meta-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-collage">
            <div className="hc-card hc-main">
              {/* LCP candidate — eager + high priority for best Core Web Vitals score */}
              <img loading="eager" fetchpriority="high" decoding="async" src="/factory/production.webp" alt={COPY.hero.collage.main} width="900" height="900" />
              <div className="hc-cap">{COPY.hero.collage.main}</div>
            </div>
            <div className="hc-card hc-sub-1 is-product">
              <img loading="lazy" decoding="async" src="/walnut-jewelery-box.webp" alt={COPY.hero.collage.sub1} width="900" height="900" />
              <div className="hc-cap">{COPY.hero.collage.sub1}</div>
            </div>
            <div className="hc-card hc-sub-2 is-product">
              <img loading="lazy" decoding="async" src="/bamboo-box.webp" alt={COPY.hero.collage.sub2} width="1184" height="672" />
              <div className="hc-cap">{COPY.hero.collage.sub2}</div>
            </div>
            <div className="hc-stamp">
              <div className="hc-stamp-num">20<sup style={{ fontSize: '0.7rem' }}>+</sup></div>
              <div className="hc-stamp-sub">{COPY.hero.collage.stampSub}</div>
            </div>
          </div>
        </div>

        <div className="hero-trust">
          {COPY.hero.trust.map((t, i) => (
            <div className="hero-trust-item" key={i}><span className="hero-trust-icon">✦</span>{t}</div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {COPY.stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-num">{s.num}<span>{s.sym}</span></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* INTRO */}
      <section className="intro-wrap">
        <div className="intro">
          <div>
            <div className="intro-label">{COPY.intro.label}</div>
            <h2 className="intro-title">
              {COPY.intro.titleA} <em>{COPY.intro.titleEm}</em><br />{COPY.intro.titleB}
            </h2>
            <p className="intro-text">{COPY.intro.text}</p>
            <div className="intro-features">
              {COPY.intro.features.map((f, i) => (
                <div className="intro-feat" key={i}><div className="feat-dot"></div> {f}</div>
              ))}
            </div>
          </div>
          <div className="intro-visual">
            <IntroCarousel />
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured" id="featured">
        <div className="feat-inner">
          <div className="section-header">
            <div className="section-label">{COPY.featured.label}</div>
            <h2 className="section-title">{COPY.featured.title}</h2>
            <div className="section-line"></div>
          </div>
          <div className="feat-grid">
            {FEATURED.map((f, i) => (
              <Link href={f.href} key={i} className="feat-card">
                <img loading="lazy" decoding="async" src={f.img} alt={f.name} width={f.w} height={f.h} />
                <div className="feat-overlay" />
                <div className="feat-arrow">→</div>
                <div className="feat-content">
                  <span className="feat-tag">{f.tag}</span>
                  <div className="feat-name">{f.name}</div>
                  <div className="feat-meta">{f.meta}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Link href="/products" className="btn-outline" style={{ borderColor: 'var(--blue-warm)', color: 'var(--blue-warm)' }}>
              {COPY.featured.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories" id="categories">
        <div className="section-header">
          <div className="section-label">{COPY.categories.label}</div>
          <h2 className="section-title">{COPY.categories.title}</h2>
          <div className="section-line"></div>
        </div>
        <div className="cat-grid">
          <div className="cat-col">
            <div className="cat-col-label">{COPY.categories.byUseLabel}</div>
            <div className="cat-col-title">{COPY.categories.byUseTitle}</div>
            <div className="cat-items">
              <Link href="/products/gift-packaging" className="cat-item">{t('categories.gift-packaging')}</Link>
              <Link href="/products/watch-jewelry" className="cat-item">{t('categories.watch-jewelry')}</Link>
              <Link href="/products/tea-coffee" className="cat-item">{t('categories.tea-coffee')}</Link>
              <Link href="/products/wine-whisky" className="cat-item">{t('categories.wine-whisky')}</Link>
              <Link href="/products/kitchen-dining" className="cat-item">{t('categories.kitchen-dining')}</Link>
              <Link href="/products/garden-seed" className="cat-item">{t('categories.garden-seed')}</Link>
              <Link href="/products/storage" className="cat-item">{t('categories.storage')}</Link>
            </div>
          </div>
          <div className="cat-col">
            <div className="cat-col-label">{COPY.categories.byStructureLabel}</div>
            <div className="cat-col-title">{COPY.categories.byStructureTitle}</div>
            <div className="cat-items">
              <Link href="/products/hinged" className="cat-item">{t('categories.hinged')}</Link>
              <Link href="/products/sliding-lid" className="cat-item">{t('categories.sliding-lid')}</Link>
              <Link href="/products/drawer" className="cat-item">{t('categories.drawer')}</Link>
              <Link href="/products/magnetic" className="cat-item">{t('categories.magnetic')}</Link>
              <Link href="/products/with-lock" className="cat-item">{t('categories.with-lock')}</Link>
            </div>
          </div>
          <div className="cat-col">
            <div className="cat-col-label">{COPY.categories.byMaterialLabel}</div>
            <div className="cat-col-title">{COPY.categories.byMaterialTitle}</div>
            <div className="cat-items">
              <Link href="/products/paulownia" className="cat-item">{t('categories.paulownia')}</Link>
              <Link href="/products/pine" className="cat-item">{t('categories.pine')}</Link>
              <Link href="/products/bamboo" className="cat-item">{t('categories.bamboo')}</Link>
              <Link href="/products/acacia" className="cat-item">{t('categories.acacia')}</Link>
              <Link href="/products/walnut" className="cat-item">{t('categories.walnut')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FACTORY */}
      <section className="factory-section" id="factory">
        <div className="fac-inner">
          <div className="section-header">
            <div className="section-label" style={{ color: 'var(--blue-warm)' }}>{COPY.factory.label}</div>
            <h2 className="section-title" style={{ color: 'var(--cream)' }}>{COPY.factory.title}</h2>
            <div className="section-line"></div>
            <p style={{ color: 'rgba(217,185,143,0.65)', fontSize: '0.95rem', maxWidth: 640, margin: '24px auto 0', lineHeight: 1.8, fontWeight: 300 }}>
              {COPY.factory.intro}
            </p>
          </div>
          <div className="fac-grid">
            {FACTORY_TILES.map((t, i) => (
              <Link href={t.href} className={`fac-tile ${t.cls}`} key={i}>
                <img loading="lazy" decoding="async" src={t.img} alt={t.alt} width={t.w} height={t.h} />
                <div className="fac-cap">
                  <div className="fac-cap-num">{t.num}</div>
                  <div className="fac-cap-text">{t.text}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <Link href="/about" className="btn-primary">{COPY.factory.cta}</Link>
          </div>
        </div>
      </section>

      {/* MANUFACTURING PROCESS */}
      <section className="custom-section" id="custom">
        <div className="custom-inner">
          <div className="custom-header section-header">
            <div className="section-label">{COPY.process.label}</div>
            <h2 className="section-title" style={{ color: 'var(--cream)' }}>{COPY.process.title}</h2>
            <div className="section-line"></div>
            <p style={{ color: 'rgba(217,185,143,0.65)', fontSize: '0.95rem', maxWidth: 640, margin: '24px auto 0', lineHeight: 1.8, fontWeight: 300 }}>
              {COPY.process.intro}
            </p>
          </div>
          <div className="process-grid">
            {PROCESS.map((s, i) => (
              <div className="pcell" key={i}>
                <img loading="lazy" decoding="async" src={s.img} alt={s.alt} width={s.w} height={s.h} />
                <div className="pcell-num">{s.num}</div>
                <div className="pcell-name">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="materials">
        <div className="mat-inner">
          <div className="section-header">
            <div className="section-label">{COPY.materials.label}</div>
            <h2 className="section-title">{COPY.materials.title}</h2>
            <div className="section-line"></div>
          </div>
          <div className="mat-grid">
            {MATERIALS.map((m, i) => (
              <Link href={m.href} className="mat-card" key={i}>
                <div className={`mat-swatch ${m.swatch}`}></div>
                <div className="mat-name">{m.name}</div>
                <div className="mat-desc">{m.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <div className="why-inner">
          <div className="section-header">
            <div className="section-label">{COPY.why.label}</div>
            <h2 className="section-title" style={{ color: 'var(--cream)' }}>{COPY.why.title}</h2>
            <div className="section-line"></div>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-text">{w.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="trust-inner">
          <div className="trust-text">
            <div className="section-label">{COPY.trust.label}</div>
            <h2 className="section-title">{COPY.trust.title}</h2>
            <p>{COPY.trust.text}</p>
          </div>
          <div className="cert-badges">
            {CERTS.map((c, i) => (
              <div className="cert-badge" key={i}>
                <div className="cert-icon">{c.icon}</div>
                <div className="cert-name">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-inner">
          <div className="cta-label">{COPY.cta.label}</div>
          <h2 className="cta-title">{COPY.cta.titleA}<br />{COPY.cta.titleB}</h2>
          <p className="cta-sub">{COPY.cta.sub}</p>
          <div className="cta-btns">
            <a href="mailto:info@xmchichomeware.com" className="btn-primary">{COPY.cta.btnEmail}</a>
            <a href="https://wa.me/8618960098762" className="btn-outline" target="_blank" rel="noopener noreferrer">{COPY.cta.btnWhatsapp}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
