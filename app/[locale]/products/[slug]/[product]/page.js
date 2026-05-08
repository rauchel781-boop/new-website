import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
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
import ProductGallery from '@/components/ProductGallery';
import ProductTabs from '@/components/ProductTabs';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { alternates as makeAlternates } from '@/i18n/seo';

// Map category slug → its products data. Mirror of the same map in the
// category landing page. Add new categories here as more product files exist.
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

export function generateStaticParams() {
  const params = [];
  for (const [catSlug, products] of Object.entries(PRODUCTS_BY_CATEGORY)) {
    for (const productSlug of Object.keys(products)) {
      params.push({ slug: catSlug, product: productSlug });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const products = PRODUCTS_BY_CATEGORY[params.slug];
  const product = products?.[params.product];
  if (!product) return { title: 'Product — CHIC' };
  const localePath = `/products/${params.slug}/${params.product}`;
  const fullPath = `/${params.locale}${localePath}`;
  const hero = product.images?.[0];
  return {
    title: `${product.name} — CHIC Wooden Expert`,
    description: product.intro,
    alternates: makeAlternates(params.locale, localePath),
    openGraph: {
      url: fullPath,
      title: `${product.name} — CHIC Wooden Expert`,
      description: product.intro,
      images: hero ? [{ url: hero, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — CHIC Wooden Expert`,
      description: product.intro,
      images: hero ? [hero] : undefined,
    },
  };
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Caveat:wght@500;700&family=Jost:wght@300;400;500;600;700&display=swap');

.pdp {
  --pdp-wood-deep:  #3D2A1F;
  --pdp-wood-mid:   #6B4A33;
  --pdp-wood-warm:  #A07852;
  --pdp-wood-light: #D9B98F;
  --pdp-cream:      #F6EEDF;
  --pdp-cream-dk:   #ECDFC6;
  --pdp-accent:     #C58E4A;
  --pdp-text-muted: #7A6450;
  --pdp-border:     #E5D2B2;
  font-family: 'Jost', system-ui, sans-serif;
  background: var(--pdp-cream);
  color: var(--pdp-wood-deep);
}
.pdp *, .pdp *::before, .pdp *::after { box-sizing: border-box; }

/* ─── BREADCRUMB ─── */
.pdp-bread {
  background: var(--pdp-cream-dk);
  padding: 18px 60px;
  border-bottom: 1px solid var(--pdp-border);
  font-size: 0.78rem;
  color: var(--pdp-text-muted);
  letter-spacing: 0.5px;
}
.pdp-bread-inner { max-width: 1400px; margin: 0 auto; }
.pdp-bread a { color: var(--pdp-wood-warm); text-decoration: none; }
.pdp-bread a:hover { color: var(--pdp-wood-deep); text-decoration: underline; }
.pdp-bread span.sep { color: rgba(107,74,51,0.4); margin: 0 10px; }

/* ─── HERO ─── */
.pdp-hero {
  padding: 50px 60px 70px;
  background:
    radial-gradient(1000px 500px at 100% 0%, rgba(217,185,143,0.45), transparent 70%),
    linear-gradient(180deg, var(--pdp-cream) 0%, var(--pdp-cream-dk) 100%);
  position: relative;
}
.pdp-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg,
    transparent 0, transparent 110px,
    rgba(107,74,51,0.04) 110px, rgba(107,74,51,0.04) 111px,
    transparent 111px, transparent 220px,
    rgba(107,74,51,0.025) 220px, rgba(107,74,51,0.025) 222px);
  pointer-events: none;
}
.pdp-hero-inner {
  position: relative; z-index: 1;
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 1.15fr 1fr;
  gap: 60px;
  align-items: start;
}

.pdp-info-eyebrow {
  display: inline-block;
  font-size: 0.62rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--pdp-accent);
  font-weight: 600;
  background: rgba(197,142,74,0.12);
  padding: 5px 12px;
  border-radius: 100px;
  margin-bottom: 18px;
}
.pdp-h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.7rem, 2.6vw, 2.4rem);
  line-height: 1.15; margin: 0 0 12px;
  color: var(--pdp-wood-deep);
  font-weight: 600;
  letter-spacing: -0.3px;
}
.pdp-tagline {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: clamp(1.3rem, 1.8vw, 1.6rem);
  color: var(--pdp-accent);
  margin-bottom: 16px;
  line-height: 1.2;
}
.pdp-intro {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 0.98rem;
  color: var(--pdp-wood-mid);
  line-height: 1.75;
  margin-bottom: 28px;
  font-weight: 400;
}

/* Quick spec card */
.pdp-quick {
  background: var(--pdp-cream);
  border: 1px solid var(--pdp-border);
  border-radius: 6px;
  padding: 22px 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(61,42,31,0.04);
}
.pdp-quick-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(107,74,51,0.12);
  font-size: 0.85rem;
}
.pdp-quick-row:first-child { padding-top: 0; }
.pdp-quick-row:last-child { padding-bottom: 0; border-bottom: none; }
.pdp-quick-label {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--pdp-text-muted);
  font-weight: 500;
  align-self: center;
}
.pdp-quick-value { color: var(--pdp-wood-deep); font-weight: 600; line-height: 1.4; }
.pdp-quick-value.is-highlight { color: var(--pdp-accent); }

/* CTAs */
.pdp-cta { display: flex; gap: 12px; margin-bottom: 22px; flex-wrap: wrap; }
.pdp-btn-primary {
  flex: 1; min-width: 180px;
  background: var(--pdp-wood-deep); color: var(--pdp-cream);
  padding: 15px 28px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
  border-radius: 4px;
  text-align: center;
  transition: background .2s, transform .2s;
}
.pdp-btn-primary:hover { background: var(--pdp-wood-mid); transform: translateY(-1px); }
.pdp-btn-outline {
  flex: 1; min-width: 180px;
  border: 1px solid var(--pdp-border);
  color: var(--pdp-wood-deep);
  padding: 15px 28px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
  border-radius: 4px;
  text-align: center;
  background: var(--pdp-cream);
  transition: border-color .2s, color .2s;
}
.pdp-btn-outline:hover { border-color: var(--pdp-accent); color: var(--pdp-accent); }

/* Trust badges */
.pdp-trust {
  display: flex; gap: 14px; flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid var(--pdp-border);
  font-size: 0.7rem;
  color: var(--pdp-text-muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.pdp-trust span {
  display: inline-flex; align-items: center; gap: 6px;
  font-weight: 500;
}
.pdp-trust span::before {
  content: '✓';
  color: var(--pdp-accent);
  font-weight: 700;
}

/* ─── DETAIL SECTION (TABS) ─── */
.pdp-detail {
  background: var(--pdp-cream-dk);
  padding: 60px;
  border-top: 1px solid var(--pdp-border);
  border-bottom: 1px solid var(--pdp-border);
}
.pdp-detail-inner { max-width: 1400px; margin: 0 auto; }

/* ─── USE CASES ─── */
.pdp-uses {
  padding: 60px;
  background: var(--pdp-cream);
}
.pdp-uses-inner { max-width: 1400px; margin: 0 auto; }
.pdp-uses-label {
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--pdp-accent);
  font-weight: 600;
  margin-bottom: 14px;
}
.pdp-uses-title {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0 0 28px;
  color: var(--pdp-wood-deep);
  letter-spacing: -0.3px;
}
.pdp-uses-list { display: flex; flex-wrap: wrap; gap: 10px; }
.pdp-use-pill {
  background: var(--pdp-cream-dk);
  border: 1px solid var(--pdp-border);
  color: var(--pdp-wood-mid);
  padding: 10px 18px;
  font-size: 0.78rem;
  border-radius: 100px;
  font-weight: 500;
}

/* ─── INQUIRY BANNER ─── */
.pdp-inquiry {
  background:
    radial-gradient(800px 400px at 50% 0%, rgba(197,142,74,0.18), transparent 70%),
    linear-gradient(135deg, #3D2A1F 0%, #6B4A33 55%, #3D2A1F 100%);
  color: var(--pdp-cream);
  padding: 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.pdp-inquiry::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(217,185,143,0.04) 30px, rgba(217,185,143,0.04) 31px);
}
.pdp-inquiry-inner { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
.pdp-inquiry-title {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  margin: 0 0 14px;
  color: var(--pdp-cream);
  letter-spacing: -0.3px;
}
.pdp-inquiry-sub {
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 0.98rem;
  color: rgba(217,185,143,0.85);
  margin-bottom: 28px;
  line-height: 1.7;
  font-weight: 400;
}
.pdp-inquiry-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.pdp-inquiry .pdp-btn-primary { background: var(--pdp-accent); color: var(--pdp-wood-deep); }
.pdp-inquiry .pdp-btn-primary:hover { background: var(--pdp-wood-light); color: var(--pdp-wood-deep); }
.pdp-inquiry .pdp-btn-outline { background: transparent; color: var(--pdp-cream); border-color: rgba(217,185,143,0.4); }
.pdp-inquiry .pdp-btn-outline:hover { border-color: var(--pdp-wood-light); color: var(--pdp-wood-light); }

/* ─── RELATED ─── */
.pdp-related { padding: 60px; background: var(--pdp-cream-dk); }
.pdp-related-inner { max-width: 1400px; margin: 0 auto; }
.pdp-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
.pdp-rel-card {
  background: var(--pdp-cream);
  border: 1px solid var(--pdp-border);
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  display: flex; flex-direction: column;
  transition: transform .2s, box-shadow .25s, border-color .2s;
}
.pdp-rel-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(61,42,31,0.14);
  border-color: var(--pdp-accent);
}
.pdp-rel-img { aspect-ratio: 4 / 3; background: var(--pdp-cream-dk); overflow: hidden; }
.pdp-rel-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pdp-rel-info { padding: 16px 18px; }
.pdp-rel-name {
  font-family: 'Fraunces', serif;
  font-size: 1rem; font-weight: 600;
  margin: 0 0 4px; line-height: 1.3;
  color: var(--pdp-wood-deep);
}
.pdp-rel-tagline { font-size: 0.78rem; color: var(--pdp-text-muted); line-height: 1.5; }

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .pdp-hero-inner { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 800px) {
  .pdp-bread { padding: 14px 24px; }
  .pdp-hero, .pdp-detail, .pdp-uses, .pdp-inquiry, .pdp-related { padding: 40px 24px; }
  .pdp-quick-row { grid-template-columns: 110px 1fr; }
  .pdp-related-grid { grid-template-columns: 1fr; }
}
`;

export default function ProductDetail({ params }) {
  const category = CATEGORIES[params.slug];
  const products = PRODUCTS_BY_CATEGORY[params.slug];
  const product = products?.[params.product];
  if (!category || !product) notFound();

  const related = (product.related || [])
    .map((s) => products[s])
    .filter(Boolean)
    .slice(0, 3);

  // ── JSON-LD: Product + BreadcrumbList ──────────────────────────────
  const productPath = `/products/${params.slug}/${params.product}`;
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.intro,
    image: (product.images || []).map((src) => `${SITE.siteUrl}${src}`),
    sku: product.slug,
    category: category.name,
    brand: { '@type': 'Brand', name: SITE.company.brand },
    manufacturer: {
      '@type': 'Organization',
      name: SITE.company.legalName,
      url: SITE.siteUrl,
    },
    url: `${SITE.siteUrl}${productPath}`,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE.siteUrl}/products/${params.slug}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: `${SITE.siteUrl}${productPath}` },
    ],
  };

  return (
    <div className="pdp">
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── BREADCRUMB ── */}
      <div className="pdp-bread">
        <div className="pdp-bread-inner">
          <Link href="/products">Products</Link>
          <span className="sep">/</span>
          <Link href={`/products/${params.slug}`}>{category.name}</Link>
          <span className="sep">/</span>
          {product.name}
        </div>
      </div>

      {/* ── HERO: Gallery + Info ── */}
      <section className="pdp-hero">
        <div className="pdp-hero-inner">
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="pdp-info">
            <div className="pdp-info-eyebrow">{product.closure} Closure</div>
            <h1 className="pdp-h1">{product.name}</h1>
            <div className="pdp-tagline">{product.tagline}</div>
            <p className="pdp-intro">{product.intro}</p>

            <div className="pdp-quick">
              <div className="pdp-quick-row">
                <div className="pdp-quick-label">MOQ</div>
                <div className="pdp-quick-value is-highlight">{product.specs.MOQ}</div>
              </div>
              <div className="pdp-quick-row">
                <div className="pdp-quick-label">Lead Time</div>
                <div className="pdp-quick-value is-highlight">{product.specs['Lead Time']}</div>
              </div>
              <div className="pdp-quick-row">
                <div className="pdp-quick-label">Size</div>
                <div className="pdp-quick-value">{product.specs.Size}</div>
              </div>
              <div className="pdp-quick-row">
                <div className="pdp-quick-label">Material</div>
                <div className="pdp-quick-value">{product.specs.Material}</div>
              </div>
              <div className="pdp-quick-row">
                <div className="pdp-quick-label">Surface</div>
                <div className="pdp-quick-value">{product.specs['Surface Finish']}</div>
              </div>
              <div className="pdp-quick-row">
                <div className="pdp-quick-label">Branding</div>
                <div className="pdp-quick-value">{product.specs.Branding}</div>
              </div>
            </div>

            <div className="pdp-cta">
              <Link href="/contact" className="pdp-btn-primary">Send Inquiry</Link>
              <Link href={`/products/${params.slug}`} className="pdp-btn-outline">Browse Category</Link>
            </div>

            <div className="pdp-trust">
              <span>FSC Certified</span>
              <span>EU REACH</span>
              <span>SGS Tested</span>
              <span>20+ Years Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAIL TABS ── */}
      <section className="pdp-detail">
        <div className="pdp-detail-inner">
          <ProductTabs
            description={product.intro}
            specs={product.specs}
            customization={product.customization}
            packaging={product.packaging}
          />
        </div>
      </section>

      {/* ── USE CASES ── */}
      {product.useCases && product.useCases.length > 0 && (
        <section className="pdp-uses">
          <div className="pdp-uses-inner">
            <div className="pdp-uses-label">Applications</div>
            <h2 className="pdp-uses-title">Common Use Cases</h2>
            <div className="pdp-uses-list">
              {product.useCases.map((u, i) => (
                <span className="pdp-use-pill" key={i}>{u}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INQUIRY BANNER ── */}
      <section className="pdp-inquiry">
        <div className="pdp-inquiry-inner">
          <h2 className="pdp-inquiry-title">Ready to Order {product.name}?</h2>
          <p className="pdp-inquiry-sub">
            Send us your specs — quantity, dimensions, branding, and any custom requirements.
            We respond within 24 hours with a quote and lead time confirmation.
          </p>
          <div className="pdp-inquiry-btns">
            <a href="mailto:info@xmchichomeware.com" className="pdp-btn-primary">Email Us Now →</a>
            <a href="https://wa.me/8618960098762" className="pdp-btn-outline" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="pdp-related">
          <div className="pdp-related-inner">
            <div className="pdp-uses-label">More from this category</div>
            <h2 className="pdp-uses-title">Related Products</h2>
            <div className="pdp-related-grid">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${params.slug}/${rp.slug}`}
                  className="pdp-rel-card"
                >
                  <div className="pdp-rel-img">
                    <img src={rp.images[0]} alt={rp.name} loading="lazy" width="1200" height="900" />
                  </div>
                  <div className="pdp-rel-info">
                    <div className="pdp-rel-name">{rp.name}</div>
                    <div className="pdp-rel-tagline">{rp.tagline}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
