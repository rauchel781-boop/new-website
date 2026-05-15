import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { CATEGORIES, SLUGS } from '@/data/categories';
import ProductGrid from '@/components/ProductGrid';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { alternates as makeAlternates } from '@/i18n/seo';
import { PRODUCTS as GIFT_PACKAGING_PRODUCTS } from '@/data/products/gift-packaging';
import { PRODUCTS as WATCH_JEWELRY_PRODUCTS } from '@/data/products/watch-jewelry';
import { PRODUCTS as TEA_COFFEE_PRODUCTS } from '@/data/products/tea-coffee';
import { PRODUCTS as WINE_WHISKY_PRODUCTS } from '@/data/products/wine-whisky';
import { PRODUCTS as KITCHEN_DINING_PRODUCTS } from '@/data/products/kitchen-dining';
import { PRODUCTS as GARDEN_SEED_PRODUCTS } from '@/data/products/garden-seed';
import { PRODUCTS as STORAGE_PRODUCTS } from '@/data/products/storage';
import { PRODUCTS as HINGED_PRODUCTS } from '@/data/products/hinged';
import { PRODUCTS as SLIDING_LID_PRODUCTS } from '@/data/products/sliding-lid';
import { PRODUCTS as DRAWER_PRODUCTS } from '@/data/products/drawer';
import { PRODUCTS as MAGNETIC_PRODUCTS } from '@/data/products/magnetic';
import { PRODUCTS as WITH_LOCK_PRODUCTS } from '@/data/products/with-lock';
import { PRODUCTS as PAULOWNIA_PRODUCTS } from '@/data/products/paulownia';
import { PRODUCTS as PINE_PRODUCTS } from '@/data/products/pine';
import { PRODUCTS as BAMBOO_PRODUCTS } from '@/data/products/bamboo';
import { PRODUCTS as ACACIA_PRODUCTS } from '@/data/products/acacia';
import { PRODUCTS as WALNUT_PRODUCTS } from '@/data/products/walnut';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { getProductTranslation } from '@/data/products/translations';

// Map of category slug → its products data file (only categories with products).
// Add an entry here when you add a /data/products/<slug>.js file.
const PRODUCTS_BY_CATEGORY = {
  'gift-packaging': GIFT_PACKAGING_PRODUCTS,
  'watch-jewelry': WATCH_JEWELRY_PRODUCTS,
  'tea-coffee': TEA_COFFEE_PRODUCTS,
  'wine-whisky': WINE_WHISKY_PRODUCTS,
  'kitchen-dining': KITCHEN_DINING_PRODUCTS,
  'garden-seed': GARDEN_SEED_PRODUCTS,
  'storage': STORAGE_PRODUCTS,
  'hinged': HINGED_PRODUCTS,
  'sliding-lid': SLIDING_LID_PRODUCTS,
  'drawer': DRAWER_PRODUCTS,
  'magnetic': MAGNETIC_PRODUCTS,
  'with-lock': WITH_LOCK_PRODUCTS,
  'paulownia': PAULOWNIA_PRODUCTS,
  'pine': PINE_PRODUCTS,
  'bamboo': BAMBOO_PRODUCTS,
  'acacia': ACACIA_PRODUCTS,
  'walnut': WALNUT_PRODUCTS,
};

// ─── Static generation: pre-render every category at build time ───
export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const item = CATEGORIES[params.slug];
  if (!item) return { title: 'Product — CHIC' };
  const localePath = `/products/${params.slug}`;
  const fullPath = `/${params.locale}${localePath}`;

  // Pull localized intro for description (Google indexes meta description per locale).
  let description = item.intro;
  try {
    const tc = await getTranslations({ locale: params.locale, namespace: 'categoryContent' });
    description = tc(`${params.slug}.intro`) || description;
  } catch (e) {}

  return {
    title: `${item.name} — CHIC Wooden Expert`,
    description,
    alternates: makeAlternates(params.locale, localePath),
    openGraph: {
      url: fullPath,
      title: `${item.name} — CHIC Wooden Expert`,
      description,
      images: item.hero ? [{ url: item.hero, alt: item.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.name} — CHIC Wooden Expert`,
      description,
      images: item.hero ? [item.hero] : undefined,
    },
  };
}

const CSS = `

.cat-page {
  --wood-deep:    #3D2A1F;   /* dark walnut */
  --wood-mid:     #6B4A33;   /* mid walnut */
  --wood-warm:    #A07852;   /* warm honey wood */
  --wood-light:   #D9B98F;   /* pale oak */
  --cream:        #F6EEDF;   /* warm paper cream */
  --cream-dark:   #ECDFC6;   /* sand */
  --grain:        #E5D2B2;   /* soft grain */
  --charcoal:     #2A1B12;   /* burnt umber text */
  --text-muted:   #7A6450;   /* aged wood text */
  --accent:       #C58E4A;   /* burnished brass */
  font-family: var(--font-jost), system-ui, sans-serif;
  background: var(--cream);
  color: var(--charcoal);
}
.cat-page *, .cat-page *::before, .cat-page *::after { box-sizing: border-box; }

/* ─── HERO (slim, no image) ─── */
.cat-hero {
  position: relative;
  background:
    radial-gradient(1200px 400px at 20% 0%, rgba(217,185,143,0.55), transparent 70%),
    radial-gradient(1000px 500px at 100% 100%, rgba(160,120,82,0.35), transparent 70%),
    linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 100%);
  overflow: hidden;
  border-bottom: 1px solid rgba(107,74,51,0.12);
}
.cat-hero::before {
  /* subtle wood-grain stripe overlay */
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg,
    transparent 0, transparent 110px,
    rgba(107,74,51,0.04) 110px, rgba(107,74,51,0.04) 111px,
    transparent 111px, transparent 220px,
    rgba(107,74,51,0.025) 220px, rgba(107,74,51,0.025) 222px
  );
  pointer-events: none;
}
.cat-hero-inner {
  position: relative; z-index: 2;
  max-width: 1300px; margin: 0 auto;
  padding: 70px 60px 60px;
  text-align: center;
}
.cat-breadcrumb {
  font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--wood-mid); margin-bottom: 22px;
}
.cat-breadcrumb a { color: var(--wood-warm); text-decoration: none; }
.cat-breadcrumb a:hover { color: var(--wood-deep); }
.cat-breadcrumb span { color: rgba(107,74,51,0.4); margin: 0 8px; }
.cat-h1 {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.05; margin: 0 auto 14px;
  color: var(--wood-deep);
  letter-spacing: -0.5px;
  max-width: 12ch;
}
.cat-tagline {
  font-family: var(--font-caveat), cursive;
  font-weight: 700;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  color: var(--accent);
  margin-bottom: 22px;
  line-height: 1.2;
}
.cat-intro {
  font-family: var(--font-fraunces), serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.02rem, 1.4vw, 1.18rem);
  color: var(--wood-mid);
  line-height: 1.7;
  max-width: 720px;
  margin: 0 auto 32px;
}
.cat-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.cat-btn-primary {
  background: var(--wood-deep); color: var(--cream);
  padding: 14px 32px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px; transition: background .2s, transform .2s;
  display: inline-block;
}
.cat-btn-primary:hover { background: var(--wood-mid); transform: translateY(-2px); }
.cat-btn-outline {
  border: 1px solid var(--wood-mid); color: var(--wood-deep);
  padding: 14px 32px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px; transition: all .2s;
  display: inline-block;
}
.cat-btn-outline:hover { background: rgba(107,74,51,0.08); border-color: var(--wood-deep); }

/* ─── SECTION COMMON ─── */
.cat-section { padding: 90px 60px; }
.cat-section-inner { max-width: 1300px; margin: 0 auto; }
.cat-section-label {
  font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 14px;
}
.cat-section-title {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: 2.2rem; color: var(--wood-deep); line-height: 1.2;
  margin: 0 0 12px;
  letter-spacing: -0.3px;
}
.cat-section-line { width: 48px; height: 2px; background: var(--accent); margin-top: 18px; }

/* ─── PRODUCTS / GALLERY (now first after hero) ─── */
.cat-gallery { background: var(--cream); padding-top: 60px; }
.cat-gal-header { display: flex; justify-content: space-between; align-items: end; margin-bottom: 40px; flex-wrap: wrap; gap: 20px; }
.cat-gal-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 280px 280px;
  gap: 16px;
}
.cat-gal-item {
  position: relative; overflow: hidden; border-radius: 4px;
  background: var(--grain);
  transition: transform .35s ease;
}
.cat-gal-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
.cat-gal-item.is-product img { object-fit: contain; padding: 24px; background: white; }
.cat-gal-item:hover img { transform: scale(1.06); }
.cat-gal-item:nth-child(1) { grid-row: 1 / 3; }
.cat-gal-item:nth-child(5) { grid-column: 2 / 4; }
.cat-gal-item::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(61,42,31,0.55) 100%);
  pointer-events: none; opacity: 0; transition: opacity .3s;
}
.cat-gal-item:hover::after { opacity: 1; }

/* ─── FEATURES ─── */
.cat-features { background: var(--cream-dark); }
.cat-feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-top: 50px; }
.cat-feat-card {
  background: var(--cream); padding: 36px 28px;
  border-top: 3px solid var(--accent);
  transition: transform .2s, box-shadow .2s;
}
.cat-feat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(61,42,31,0.12); }
.cat-feat-icon {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--accent); border-radius: 50%;
  color: var(--accent); font-size: 1rem; margin-bottom: 18px;
  background: rgba(197,142,74,0.08);
}
.cat-feat-title {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  font-size: 1.05rem; color: var(--wood-deep); margin-bottom: 10px;
}
.cat-feat-text { font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; font-weight: 400; }

/* ─── SPECS + USE CASES ─── */
.cat-detail { background: var(--wood-deep); color: var(--cream); }
.cat-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 50px; }
.cat-detail .cat-section-title { color: var(--cream); }
.cat-detail .cat-section-label { color: var(--wood-light); }
.cat-spec-list { list-style: none; padding: 0; margin: 0; }
.cat-spec-item {
  display: flex; gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(217,185,143,0.18);
  font-size: 0.92rem;
  color: rgba(246,238,223,0.88);
  font-weight: 400;
  line-height: 1.6;
}
.cat-spec-item::before { content: '◆'; color: var(--accent); font-size: 0.65rem; flex-shrink: 0; padding-top: 6px; }
.cat-spec-item:last-child { border-bottom: none; }
.cat-usecase-list { display: flex; flex-wrap: wrap; gap: 10px; }
.cat-usecase {
  border: 1px solid rgba(217,185,143,0.4);
  background: rgba(217,185,143,0.06);
  color: var(--wood-light);
  padding: 10px 18px;
  font-size: 0.78rem;
  letter-spacing: 1px;
  border-radius: 100px;
  transition: background .2s, border-color .2s;
}
.cat-usecase:hover { background: rgba(217,185,143,0.16); border-color: var(--wood-light); }

/* ─── CTA ─── */
.cat-cta {
  padding: 100px 60px;
  background:
    radial-gradient(800px 400px at 50% 0%, rgba(197,142,74,0.18), transparent 70%),
    linear-gradient(135deg, #3D2A1F 0%, #6B4A33 55%, #3D2A1F 100%);
  text-align: center; color: var(--cream);
  position: relative; overflow: hidden;
}
.cat-cta::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(217,185,143,0.04) 30px, rgba(217,185,143,0.04) 31px);
}
.cat-cta-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
.cat-cta-title {
  font-family: var(--font-fraunces), serif; font-weight: 600;
  font-size: clamp(1.8rem, 3vw, 2.6rem); margin: 0 0 18px; color: var(--cream);
}
.cat-cta-sub {
  font-family: var(--font-fraunces), serif; font-style: italic;
  font-size: 1rem; color: rgba(217,185,143,0.85);
  margin-bottom: 36px; line-height: 1.7;
}
.cat-cta .cat-btn-primary { background: var(--accent); color: var(--wood-deep); }
.cat-cta .cat-btn-primary:hover { background: var(--wood-light); }
.cat-cta .cat-btn-outline { color: var(--cream); border-color: rgba(217,185,143,0.5); }
.cat-cta .cat-btn-outline:hover { border-color: var(--wood-light); background: rgba(217,185,143,0.08); }

/* ─── RELATED ─── */
.cat-related { background: var(--cream-dark); padding: 80px 60px; }
.cat-related-inner { max-width: 1300px; margin: 0 auto; }
.cat-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px; }
.cat-related-card {
  background: var(--cream); padding: 32px 28px;
  border-radius: 2px;
  border-top: 3px solid var(--accent);
  text-decoration: none; color: var(--wood-deep);
  transition: transform .2s, box-shadow .2s;
  display: block;
}
.cat-related-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(61,42,31,0.14); }
.cat-related-eyebrow { font-size: 0.6rem; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
.cat-related-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 1.15rem; margin-bottom: 8px; }
.cat-related-arrow { color: var(--accent); font-size: 0.85rem; margin-top: 14px; display: inline-block; }

/* ─── RESPONSIVE ─── */
@media (max-width: 960px) {
  .cat-hero-inner { padding: 56px 24px 44px; }
  .cat-section { padding: 70px 28px; }
  .cat-feat-grid { grid-template-columns: 1fr 1fr; }
  .cat-gal-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px 200px; }
  .cat-gal-item:nth-child(1) { grid-row: auto; }
  .cat-gal-item:nth-child(5) { grid-column: 1 / 3; }
  .cat-detail-grid { grid-template-columns: 1fr; gap: 50px; }
  .cat-cta { padding: 80px 28px; }
  .cat-related { padding: 60px 28px; }
  .cat-related-grid { grid-template-columns: 1fr; }
}
`;

// Detect "product-on-white" PNGs so we render them on a white card with padding instead of cropping.
const isProductImage = (src) =>
  src.endsWith('.png') || src.includes('bamboo') || src.includes('walnut%20jewelery');

export default async function CategoryPage({ params }) {
  unstable_setRequestLocale(params.locale);
  const item = CATEGORIES[params.slug];
  if (!item) notFound();

  // Pull translated category tagline + intro. Falls back to the data file's
  // English values if the messages JSON is missing the key for this locale.
  let translatedTagline = item.tagline;
  let translatedIntro = item.intro;
  let translatedName = item.name;
  let translatedGroup = item.group;
  try {
    const tc = await getTranslations({ locale: params.locale, namespace: 'categoryContent' });
    translatedTagline = tc(`${params.slug}.tagline`) || translatedTagline;
    translatedIntro = tc(`${params.slug}.intro`) || translatedIntro;
  } catch (e) {}
  // Translated category name (already in `categories` namespace from earlier).
  try {
    const tn = await getTranslations({ locale: params.locale, namespace: 'categories' });
    translatedName = tn(params.slug) || translatedName;
  } catch (e) {}
  // Translated group label ("By Use" / "By Structure" / "By Material").
  try {
    const tg = await getTranslations({ locale: params.locale, namespace: 'nav' });
    const groupKeyMap = { 'By Use': 'byUse', 'By Structure': 'byStructure', 'By Material': 'byMaterial' };
    const k = groupKeyMap[item.group];
    if (k) translatedGroup = tg(k) || translatedGroup;
  } catch (e) {}
  // Translated common CTA strings.
  let ctaQuote = 'Request a Quote';
  let ctaBrowse = 'Browse All Boxes';
  let labelProducts = 'Products';
  let labelHome = 'Home';
  try {
    const tc = await getTranslations({ locale: params.locale, namespace: 'cta' });
    ctaQuote = tc('getQuote') || ctaQuote;
    ctaBrowse = tc('viewAllProducts') || ctaBrowse;
  } catch (e) {}
  try {
    const tn = await getTranslations({ locale: params.locale, namespace: 'nav' });
    labelProducts = tn('products') || labelProducts;
    labelHome = tn('home') || labelHome;
  } catch (e) {}

  // categoryPage namespace — all chrome strings on this template
  // (section labels, titles, CTAs, related categories).
  const tcp = await getTranslations({ locale: params.locale, namespace: 'categoryPage' });

  // Pre-compute related category cards with translated names and group labels.
  // We resolve translations now (not inside JSX) because getTranslations is async.
  const groupKeyMap = { 'By Use': 'byUse', 'By Structure': 'byStructure', 'By Material': 'byMaterial' };
  let tnCats = null;
  let tnNav = null;
  try { tnCats = await getTranslations({ locale: params.locale, namespace: 'categories' }); } catch (e) {}
  try { tnNav = await getTranslations({ locale: params.locale, namespace: 'nav' }); } catch (e) {}
  const relatedCards = (item.related || []).map((slug) => {
    const rel = CATEGORIES[slug];
    if (!rel) return null;
    let relName = rel.name;
    try { if (tnCats) relName = tnCats(slug) || rel.name; } catch (e) {}
    const k = groupKeyMap[rel.group];
    let relGroup = rel.group;
    try { if (tnNav && k) relGroup = tnNav(k) || rel.group; } catch (e) {}
    return { slug, name: relName, group: relGroup };
  }).filter(Boolean);

  const galleryImages = item.images.slice(0, 5);
  const products = PRODUCTS_BY_CATEGORY[params.slug];

  // ── JSON-LD: BreadcrumbList + ItemList of products in this category ──
  // Names are locale-aware (nav.home / nav.products / categoryName) and every
  // `item` URL carries the /${locale}/ prefix so Google doesn't have to follow
  // a redirect to reach the canonical page.
  const localePrefix = `/${params.locale}`;
  const categoryPath = `/products/${params.slug}`;
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labelHome, item: `${SITE.siteUrl}${localePrefix}` },
      { '@type': 'ListItem', position: 2, name: labelProducts, item: `${SITE.siteUrl}${localePrefix}/products` },
      { '@type': 'ListItem', position: 3, name: translatedName, item: `${SITE.siteUrl}${localePrefix}${categoryPath}` },
    ],
  };
  const itemListLd = products
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: translatedName,
        itemListElement: Object.values(products).map((p, i) => {
          const tp = getProductTranslation(p.slug, params.locale);
          return {
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE.siteUrl}${localePrefix}/products/${params.slug}/${p.slug}`,
            name: tp.name || p.name,
          };
        }),
      }
    : null;

  return (
    <div className="cat-page">
      <JsonLd data={breadcrumbLd} />
      {itemListLd && <JsonLd data={itemListLd} />}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── HERO (slim, no image, wood-toned) ── */}
      <section className="cat-hero">
        <div className="cat-hero-inner">
          <div className="cat-breadcrumb">
            <Link href="/products">{labelProducts}</Link>
            <span>/</span>
            {translatedGroup}
            <span>/</span>
            {translatedName}
          </div>
          <h1 className="cat-h1">{translatedName}</h1>
          <div className="cat-tagline">{translatedTagline}</div>
          {/* Hero paragraph: rich English longDesc for EN, translated intro elsewhere */}
          <p className="cat-intro">
            {params.locale === 'en' ? item.longDesc : translatedIntro}
          </p>
          <div className="cat-hero-btns">
            <Link href="/contact" className="cat-btn-primary">{ctaQuote}</Link>
            <Link href="/products" className="cat-btn-outline">{ctaBrowse}</Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS / GALLERY (now first under hero) ── */}
      <section className="cat-section cat-gallery">
        <div className="cat-section-inner">
          <div className="cat-gal-header">
            <div>
              <div className="cat-section-label">{products ? tcp('ourProducts') : tcp('showcase')}</div>
              <h2 className="cat-section-title">
                {products ? tcp('browseTheRange') : tcp('aLookAtTheRange')}
              </h2>
            </div>
            <Link href="/contact" className="cat-btn-primary">{tcp('requestSamples')}</Link>
          </div>

          {products ? (
            <ProductGrid products={products} categorySlug={params.slug} locale={params.locale} />
          ) : (
            <div className="cat-gal-grid">
              {galleryImages.map((src, i) => (
                <div
                  className={`cat-gal-item${isProductImage(src) ? ' is-product' : ''}`}
                  key={i}
                >
                  <img src={src} alt={`${item.name} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} width="1200" height="900" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="cat-section cat-features">
        <div className="cat-section-inner">
          <div className="cat-section-label">{tcp('whyChooseOur', { name: translatedName })}</div>
          <h2 className="cat-section-title">{tcp('featuresThatMatter')}</h2>
          <div className="cat-section-line" />
          <div className="cat-feat-grid">
            {item.features.map((f, i) => (
              <div className="cat-feat-card" key={i}>
                <div className="cat-feat-icon">{f.icon}</div>
                <div className="cat-feat-title">{f.title}</div>
                <div className="cat-feat-text">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAIL: SPECS + USE CASES ── */}
      <section className="cat-section cat-detail">
        <div className="cat-section-inner">
          <div className="cat-detail-grid">
            <div>
              <div className="cat-section-label">{tcp('specifications')}</div>
              <h2 className="cat-section-title">{tcp('buildToSpec')}</h2>
              <ul className="cat-spec-list">
                {item.specs.map((s, i) => (
                  <li className="cat-spec-item" key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="cat-section-label">{tcp('useCasesLabel')}</div>
              <h2 className="cat-section-title">{tcp('perfectFor')}</h2>
              <div className="cat-usecase-list" style={{ marginTop: 24 }}>
                {item.useCases.map((u, i) => (
                  <span className="cat-usecase" key={i}>{u}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cat-cta">
        <div className="cat-cta-inner">
          <div className="cat-section-label" style={{ color: 'var(--blue-warm)' }}>{tcp('ctaEyebrow')}</div>
          <h2 className="cat-cta-title">{tcp('ctaTitle', { name: translatedName })}</h2>
          <p className="cat-cta-sub">{tcp('ctaSub')}</p>
          <div className="cat-hero-btns" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="cat-btn-primary">{tcp('ctaEmail')}</Link>
            <Link href="/products" className="cat-btn-outline">{tcp('ctaBrowse')}</Link>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {relatedCards.length > 0 && (
        <section className="cat-related">
          <div className="cat-related-inner">
            <div className="cat-section-label">{tcp('relatedEyebrow')}</div>
            <h2 className="cat-section-title">{tcp('relatedTitle')}</h2>
            <div className="cat-related-grid">
              {relatedCards.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/products/${rc.slug}`}
                  className="cat-related-card"
                >
                  <div className="cat-related-eyebrow">{rc.group}</div>
                  <div className="cat-related-name">{rc.name}</div>
                  <div className="cat-related-arrow">→ {tcp('relatedArrow')}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}