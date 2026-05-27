import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';

// Emits a 2-level BreadcrumbList JSON-LD (Home > Current) for top-level info
// pages — about, material-guide, wood-fabrication, capabilities, products
// index, contact, blog index. Helps Google understand the site hierarchy and
// may surface breadcrumb path in the SERP. Deeper hierarchies (category,
// PDP, blog post) build their own localized breadcrumbs inline.
//
// Names are kept in English by convention: Google reads schema in any
// language, and the `item` URLs include the locale prefix so per-locale
// canonicalisation still works correctly.

export default function PageBreadcrumbLd({ locale, name, path }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE.siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE.siteUrl}/${locale}${path}`,
      },
    ],
  };
  return <JsonLd data={data} />;
}
