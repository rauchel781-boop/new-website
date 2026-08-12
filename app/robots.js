import { SITE } from '@/data/site-config';

// Next.js 14 Metadata Files API — generates /robots.txt at build time
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
//
// GEO note (2026-08): the wildcard `userAgent: '*'` rule below already
// allows every crawler, including AI/LLM bots — nothing here was ever
// blocking them. We additionally list the major AI crawlers by name so
// the allow-list is self-documenting (easy to audit / adjust per-bot
// later) rather than relying silently on the wildcard default. See also
// /llms.txt (app/llms.txt/route.js) for the AI-oriented site index.
const AI_CRAWLER_USER_AGENTS = [
  'GPTBot',           // OpenAI — training + browsing
  'OAI-SearchBot',    // OpenAI — ChatGPT search
  'ChatGPT-User',     // OpenAI — user-triggered fetch (live browsing in a chat)
  'ClaudeBot',        // Anthropic — training crawl
  'Claude-User',      // Anthropic — user-triggered fetch (Claude web/agent use)
  'Claude-SearchBot', // Anthropic — search indexing
  'PerplexityBot',    // Perplexity — search indexing
  'Perplexity-User',  // Perplexity — user-triggered fetch
  'Google-Extended',  // Google — Gemini / AI Overviews training use of Search index
  'GoogleOther',      // Google — miscellaneous Google product crawling (incl. AI features)
  'Applebot-Extended',// Apple — Apple Intelligence training use of Applebot index
  'Amazonbot',        // Amazon — Alexa/Rufus
  'Bytespider',       // ByteDance — training crawl
  'CCBot',            // Common Crawl — widely used as LLM training data source
  'Meta-ExternalAgent', // Meta — AI training + search
  'Meta-ExternalFetcher', // Meta — user-triggered fetch
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // Explicit, individually-named allow rules for AI crawlers/agents —
      // functionally redundant with the wildcard rule above (both allow
      // the same paths), but documents intent and gives us a single place
      // to flip an individual bot to `disallow` later if ever needed.
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/_next/'],
      })),
    ],
    sitemap: `${SITE.siteUrl}/sitemap.xml`,
    host: SITE.siteUrl,
  };
}
