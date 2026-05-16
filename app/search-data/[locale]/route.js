// Static search index per locale.
//
// Next.js builds 8 of these at compile time (one per locale) via
// generateStaticParams. The browser fetches the one matching the
// current locale the FIRST time the user opens the search modal,
// then caches the result for the rest of the session.
//
// Each entry is small (~200 bytes) and we ship ~213 of them per
// locale (17 categories + 186 products + 10 blog posts) → ~42 KB
// gzipped per language file. Cheap one-time cost on first search open.
//
// Searchable surface per entry: type / url / title / category /
// text (concatenated tagline + intro / excerpt). The client does
// case-insensitive substring + word-boundary match against `title`
// (weighted 3×) and `text` (weighted 1×). No fuzzy library —
// keeps the modal bundle under 5 KB.

import { CATEGORIES, SLUGS } from '@/data/categories';
import { POSTS } from '@/data/blog';
import { routing } from '@/i18n/routing';
import { getProductTranslation } from '@/data/products/translations';
import { getCategoryTranslation } from '@/data/categories/translations';
import { getBlogTranslation, getBlogCategoryTranslation } from '@/data/blog/translations';

// Per-category product file imports (mirrors what /products/[slug]/page.js does)
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

const PRODUCTS_BY_CATEGORY = {
  'gift-packaging': GIFT_PACKAGING_PRODUCTS,
  'watch-jewelry': WATCH_JEWELRY_PRODUCTS,
  'tea-coffee': TEA_COFFEE_PRODUCTS,
  'wine-whisky': WINE_WHISKY_PRODUCTS,
  'kitchen-dining': KITCHEN_DINING_PRODUCTS,
  'garden-seed': GARDEN_SEED_PRODUCTS,
  storage: STORAGE_PRODUCTS,
  hinged: HINGED_PRODUCTS,
  'sliding-lid': SLIDING_LID_PRODUCTS,
  drawer: DRAWER_PRODUCTS,
  magnetic: MAGNETIC_PRODUCTS,
  'with-lock': WITH_LOCK_PRODUCTS,
  paulownia: PAULOWNIA_PRODUCTS,
  pine: PINE_PRODUCTS,
  bamboo: BAMBOO_PRODUCTS,
  acacia: ACACIA_PRODUCTS,
  walnut: WALNUT_PRODUCTS,
};

// Pre-render one route per locale at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function clean(s) {
  if (!s) return '';
  return String(s).replace(/\s+/g, ' ').trim();
}

export async function GET(_req, { params }) {
  const { locale } = params;
  const entries = [];

  // ── Categories ──────────────────────────────────────────────────
  for (const slug of SLUGS) {
    const cat = CATEGORIES[slug];
    if (!cat) continue;
    const catTrans = getCategoryTranslation(slug, locale);
    const longDesc = catTrans.longDesc || cat.longDesc;
    entries.push({
      type: 'category',
      url: `/${locale}/products/${slug}`,
      title: cat.name, // The translated name lives in messages.categories.<slug>
      // (client uses the title verbatim; categories namespace is
      // baked in via messages JSON which the modal already has access
      // to via useTranslations).
      category: cat.group,
      text: clean(`${cat.tagline} ${cat.intro} ${longDesc}`).slice(0, 320),
    });
  }

  // ── Products ────────────────────────────────────────────────────
  for (const [categorySlug, products] of Object.entries(PRODUCTS_BY_CATEGORY)) {
    if (!products) continue;
    for (const [productSlug, product] of Object.entries(products)) {
      const t = getProductTranslation(productSlug, locale);
      entries.push({
        type: 'product',
        url: `/${locale}/products/${categorySlug}/${productSlug}`,
        title: t.name || product.name,
        category: categorySlug,
        text: clean(
          `${t.tagline || product.tagline || ''} ${t.intro || product.intro || ''}`,
        ).slice(0, 320),
      });
    }
  }

  // ── Blog ────────────────────────────────────────────────────────
  for (const post of POSTS) {
    const t = getBlogTranslation(post.slug, locale);
    entries.push({
      type: 'blog',
      url: `/${locale}/blog/${post.slug}`,
      title: t.title || post.title,
      category: t.category
        || getBlogCategoryTranslation(post.category, locale)
        || post.category,
      text: clean(t.excerpt || post.excerpt || '').slice(0, 320),
    });
  }

  return new Response(JSON.stringify(entries), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Long cache — index changes only on rebuild (when content changes)
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
