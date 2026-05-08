import { SITE } from '@/data/site-config';
import { CATEGORIES, SLUGS } from '@/data/categories';
import { POSTS } from '@/data/blog';
import { routing } from '@/i18n/routing';

// Pull product slug lists for each category that has products.
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

const today = new Date();

// Build hreflang entries pointing to every locale's variant of a path.
// Returns { en: 'https://.../en/foo', es: '.../es/foo', ..., 'x-default': '.../en/foo' }
function languageMap(localizedPath) {
  const m = {};
  for (const loc of routing.locales) {
    m[loc] = `${SITE.siteUrl}/${loc}${localizedPath}`;
  }
  m['x-default'] = `${SITE.siteUrl}/${routing.defaultLocale}${localizedPath}`;
  return m;
}

// Push one entry per locale, all sharing the same alternates.languages map.
// This is how Next.js's MetadataRoute.Sitemap renders <xhtml:link rel="alternate"...>
// per Google's sitemap-with-hreflang spec.
function pushLocalized(entries, localizedPath, opts = {}) {
  const langs = languageMap(localizedPath);
  for (const loc of routing.locales) {
    entries.push({
      url: `${SITE.siteUrl}/${loc}${localizedPath}`,
      lastModified: opts.lastModified || today,
      changeFrequency: opts.changeFrequency || 'monthly',
      priority: opts.priority ?? 0.7,
      alternates: { languages: langs },
    });
  }
}

export default function sitemap() {
  const entries = [];

  // ── Static localized pages ──────────────────────────────────────────
  const staticPages = [
    { path: '',                  priority: 1.0, changeFrequency: 'weekly'  },
    { path: '/products',         priority: 0.9, changeFrequency: 'weekly'  },
    { path: '/material-guide',   priority: 0.8, changeFrequency: 'monthly' },
    { path: '/capabilities',     priority: 0.7, changeFrequency: 'monthly' },
    { path: '/wood-fabrication', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about',            priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact',          priority: 0.6, changeFrequency: 'yearly'  },
  ];
  for (const p of staticPages) {
    pushLocalized(entries, p.path, p);
  }

  // ── Category landing pages (localized) ──────────────────────────────
  for (const slug of SLUGS) {
    pushLocalized(entries, `/products/${slug}`, {
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // ── Individual product pages (localized) ────────────────────────────
  for (const [categorySlug, products] of Object.entries(PRODUCTS_BY_CATEGORY)) {
    if (!products) continue;
    for (const productSlug of Object.keys(products)) {
      pushLocalized(entries, `/products/${categorySlug}/${productSlug}`, {
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // ── Blog (English-only at /en/blog/...) ─────────────────────────────
  // Listed once in the default locale; we don't claim Spanish/French versions.
  entries.push({
    url: `${SITE.siteUrl}/${routing.defaultLocale}/blog`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.7,
  });
  for (const post of POSTS) {
    entries.push({
      url: `${SITE.siteUrl}/${routing.defaultLocale}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : today,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
