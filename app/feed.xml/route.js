// RSS 2.0 feed for the CHIC Journal.
//
// Served at /feed.xml — discoverable via the <link rel="alternate"
// type="application/rss+xml"> tag in [locale]/layout.js (added in the
// same commit as this file).
//
// Why we ship a single English feed (not per-locale):
//   - RSS readers (Feedly, Inoreader, NewsBlur etc.) are dominated
//     by English-reading power users in the B2B / journalism space
//   - Multi-locale RSS pulls Google's "duplicate content" reflex
//   - The full body in English matches the canonical articles —
//     visitors clicking through hit the English version directly
//
// If we ever need per-locale feeds, the right pattern is
// /[locale]/feed.xml routes that mirror this one.

import { POSTS } from '@/data/blog';
import { SITE } from '@/data/site-config';

const FEED_LIMIT = 20;

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Convert a blog body block to plain text for the feed description.
// We keep this lightweight on purpose — RSS clients prefer a clean
// excerpt over a full HTML body; users click through for the full read.
function blockToText(block) {
  if (block.text) return block.text;
  if (Array.isArray(block.items)) {
    return block.items
      .map((i) => (typeof i === 'string' ? i : i.label || ''))
      .join(' · ');
  }
  if (block.caption) return block.caption;
  return '';
}

export async function GET() {
  const siteUrl = SITE.siteUrl;
  const feedUrl = `${siteUrl}/feed.xml`;
  const channelTitle = `${SITE.company.brand} Journal — ${SITE.company.tagline}`;
  const channelDesc =
    'Field notes from a custom wooden box factory in Xiamen — process, materials, OEM/ODM, packaging strategy and sustainability.';

  // Newest first, capped at FEED_LIMIT
  const sorted = [...POSTS]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, FEED_LIMIT);

  const latestPubDate = sorted[0]
    ? new Date(sorted[0].date).toUTCString()
    : new Date().toUTCString();

  const items = sorted
    .map((post) => {
      const url = `${siteUrl}/en/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      // Stitch together a richer description: excerpt + first 2-3
      // paragraphs of body. Keeps the feed scannable without sending
      // the whole article (which discourages click-throughs).
      const intro = (post.body || [])
        .filter((b) => b.type === 'p')
        .slice(0, 3)
        .map(blockToText)
        .join('\n\n');
      const description = `${post.excerpt}\n\n${intro}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(description)}</description>
      ${post.hero ? `<enclosure url="${siteUrl}${post.hero}" type="image/webp" />` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${siteUrl}/en/blog</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channelDesc)}</description>
    <language>en-US</language>
    <lastBuildDate>${latestPubDate}</lastBuildDate>
    <generator>Next.js — custom CHIC feed generator</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // 1-hour cache; revalidate on the next request after that
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
