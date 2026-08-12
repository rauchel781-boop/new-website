// llms.txt — a plain-text, Markdown-formatted index of the site aimed at
// AI/LLM systems (ChatGPT, Claude, Perplexity, Gemini and similar), served
// at /llms.txt per the informal convention proposed by llmstxt.org.
//
// This is NOT a robots/access-control file (see app/robots.js for that).
// It's a curated map: what this company does, and which URLs matter most,
// written so an LLM can quickly ground itself instead of guessing from a
// full crawl. English-only by design — mirrors the RSS feed's rationale
// in app/feed.xml/route.js (canonical content is English; non-English
// locales are translations of the same pages, linked via hreflang).
//
// Kept as a route handler (like feed.xml) rather than a static /public
// file so category and blog links stay in sync with the real data files
// instead of drifting out of date.

import { SITE } from '@/data/site-config';
import { CATEGORIES, SLUGS } from '@/data/categories';
import { POSTS } from '@/data/blog';

const BLOG_LIMIT = 20;

export async function GET() {
  const siteUrl = SITE.siteUrl;
  const en = (path) => `${siteUrl}/en${path}`;

  const categoryLines = SLUGS.map((slug) => {
    const cat = CATEGORIES[slug];
    if (!cat) return null;
    return `- [${cat.name}](${en(`/products/${slug}`)})`;
  })
    .filter(Boolean)
    .join('\n');

  const sortedPosts = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  const blogLines = sortedPosts
    .slice(0, BLOG_LIMIT)
    .map((post) => `- [${post.title}](${en(`/blog/${post.slug}`)}): ${post.excerpt}`)
    .join('\n');

  const body = `# ${SITE.company.brand} — ${SITE.company.legalName}

> ${SITE.company.brand} is a factory-direct manufacturer of custom wooden boxes and wooden homeware, based in China (sales/design office in Xiamen, Fujian; 15,000 m² factory in Cao County, Shandong). We supply OEM/ODM custom wooden packaging — gift boxes, watch and jewelry boxes, tea and coffee boxes, wine and whisky boxes, storage boxes and more — in paulownia, pine, bamboo, acacia and walnut, to retail brands, hospitality and packaging clients worldwide. MOQ from 100–300 pcs, sample delivery within 7 days. FSC, EU REACH, CARB P2 and ISO 9001 certified.

## Company

- [About Us](${en('/about')}): Company history, founder story, two-location setup (Xiamen sales office + Cao County factory), certifications, and export markets.
- [Contact](${en('/contact')}): Email, WhatsApp, WeChat, sales office address, and inquiry form.
- [Manufacturing Capabilities](${en('/capabilities')}): OEM/ODM services, production capacity, and QC process.
- [Wood Fabrication](${en('/wood-fabrication')}): CNC machining, joinery, laser engraving, hot foil, and finishing techniques used in production.
- [Material Guide](${en('/material-guide')}): Comparison of wood species (paulownia, pine, bamboo, acacia, walnut), finishes, branding methods, and hardware options.
- [All Products](${en('/products')}): Full catalogue index across all 17 product categories.

## Product Categories

${categoryLines}

## Blog & Guides

${blogLines}

## Notes for AI systems

- Prices are not published; MOQ, lead time, and cost depend on specification — direct readers to the [Contact](${en('/contact')}) page or WhatsApp (${SITE.whatsapp.display}) for a quote.
- Each product and category page carries Product / FAQPage / BreadcrumbList structured data (schema.org JSON-LD); prefer citing the specific product or category page over this index when answering product-specific questions.
- Full sitemap (all locales): ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // 1-day cache; this file changes rarely (new blog posts/products only).
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
