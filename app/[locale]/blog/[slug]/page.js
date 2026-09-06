import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { POSTS, getPostBySlug, getRelatedPosts } from '@/data/blog';
import JsonLd from '@/components/JsonLd';
import BlogShareButtons from '@/components/BlogShareButtons';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { SITE } from '@/data/site-config';
import { alternates as makeAlternates } from '@/i18n/seo';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { getBlogTranslation } from '@/data/blog/translations';
import BlogToc from '@/components/BlogToc';
import BlogPrintButton from '@/components/BlogPrintButton';
import BlogAuthorBox from '@/components/BlogAuthorBox';
import BlogVideo from '@/components/BlogVideo';
import { BlogCompare, BlogFlow } from '@/components/BlogDiagrams';
import PageFaq from '@/components/PageFaq';
import { getAuthor } from '@/data/blog-authors';
import { buildHeadingIdMap } from '@/lib/blog-toc';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const enPost = getPostBySlug(params.slug);
  if (!enPost) return { title: 'Article — CHIC' };
  // Merge the per-locale translation overlay so og:title/description reflect
  // the localized content; falls back to English when overlay is empty.
  const t = getBlogTranslation(params.slug, params.locale);
  const post = { ...enPost, ...t };
  const path = `/blog/${enPost.slug}`;
  return {
    title: `${post.title} — CHIC`,
    description: post.excerpt,
    alternates: makeAlternates(params.locale, path),
    openGraph: {
      type: 'article',
      url: `/${params.locale}${path}`,
      title: post.title,
      description: post.excerpt,
      images: post.hero ? [{ url: post.hero, alt: post.title }] : undefined,
      publishedTime: post.date || undefined,
      authors: ['Xiamen Chic Homeware Co.,Ltd.'],
      section: post.category || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.hero ? [post.hero] : undefined,
    },
  };
}

const POST_CSS = `

.bp {
  --wd-deep:    #3D2A1F;
  --wd-mid:     #6B4A33;
  --wd-warm:    #C58E4A;
  --wd-light:   #D9B98F;
  --wd-cream:   #F6EEDF;
  --wd-sand:    #ECDFC6;
  --wd-ink:     #2A1B12;
  --wd-mute:    #7A6450;

  font-family: var(--font-jost), system-ui, sans-serif;
  background: var(--wd-cream);
  color: var(--wd-ink);
}
.bp *, .bp *::before, .bp *::after { box-sizing: border-box; }

/* ── Top bar (breadcrumb + print) ── */
.bp .topbar {
  padding: 26px 60px 0; max-width: 1300px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  gap: 20px; flex-wrap: wrap;
}
.bp .back-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.7rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600;
  color: var(--wd-warm); text-decoration: none;
  transition: color .2s;
}
.bp .back-link:hover { color: var(--wd-deep); }

/* Visible breadcrumb. The current title is truncated rather than wrapped —
   article titles run long and a two-line breadcrumb reads as broken. */
.bp .bp-crumbs {
  display: flex; align-items: center; gap: 8px;
  font-size: .74rem; color: var(--wd-mute);
  min-width: 0; flex: 1;
}
.bp .bp-crumbs a { color: var(--wd-warm); text-decoration: none; transition: color .2s; }
.bp .bp-crumbs a:hover { color: var(--wd-deep); text-decoration: underline; }
.bp .bp-crumb-sep { color: rgba(107,74,51,0.38); }
.bp .bp-crumb-cur {
  color: var(--wd-mute);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  max-width: 46ch;
}

/* Print / Save-as-PDF control */
.bp .bp-print {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent;
  border: 1px solid rgba(107,74,51,0.28);
  border-radius: 4px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: .72rem; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;
  color: var(--wd-mid); cursor: pointer;
  transition: border-color .2s, color .2s, background .2s;
  flex-shrink: 0;
}
.bp .bp-print:hover { border-color: var(--wd-accent); color: var(--wd-deep); background: rgba(197,142,74,0.08); }
.bp .bp-print:focus-visible { outline: 2px solid var(--wd-accent); outline-offset: 2px; }

/* External links get a subtle outbound marker so readers know the link
   leaves the site before they click it. */
.bp .bp-link-ext::after {
  content: '↗';
  font-size: .78em;
  margin-left: 2px;
  opacity: .7;
}

/* ── Hero ── */
.bp .hero {
  padding: 36px 60px 60px;
  max-width: 1000px; margin: 0 auto;
  text-align: center;
}
.bp .pills { display: inline-flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; justify-content: center; }
.bp .pill {
  background: var(--wd-warm); color: white;
  padding: 5px 14px; font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600;
  border-radius: 100px;
}
.bp .pill-meta {
  background: transparent; color: var(--wd-mute);
  border: 1px solid rgba(107,74,51,0.3);
}
.bp .hero-title {
  font-family: var(--font-playfair), serif;
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  color: var(--wd-deep);
  margin: 0 0 22px;
  line-height: 1.12;
  letter-spacing: -0.5px;
}
.bp .hero-excerpt {
  font-size: 1.1rem; color: var(--wd-mute);
  line-height: 1.75; max-width: 720px; margin: 0 auto;
  font-weight: 300;
}

/* ── Hero image ── */
.bp .hero-img-wrap {
  max-width: 1300px; margin: 0 auto;
  padding: 0 60px;
}
.bp .hero-img {
  width: 100%; aspect-ratio: 16/8;
  border-radius: 4px; overflow: hidden;
  background: var(--wd-ink);
  box-shadow: 0 24px 60px rgba(61,42,31,0.18);
}
.bp .hero-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* ── Article body ── */
.bp .body { padding: 70px 60px 90px; max-width: 800px; margin: 0 auto; }
.bp .body p {
  font-size: 1.04rem; line-height: 1.85;
  color: var(--wd-deep); margin: 0 0 22px;
  font-weight: 400;
}
.bp .body p:first-of-type::first-letter {
  font-family: var(--font-playfair), serif;
  font-size: 3.4rem; font-weight: 700;
  float: left; line-height: 0.95;
  margin: 6px 12px 0 0;
  color: var(--wd-warm);
}
.bp .body h2 {
  font-family: var(--font-playfair), serif;
  font-size: 1.7rem; color: var(--wd-deep);
  margin: 50px 0 18px; line-height: 1.3;
  letter-spacing: -0.3px;
  position: relative; padding-left: 22px;
}
.bp .body h2::before {
  content: ''; position: absolute;
  left: 0; top: 14px; bottom: 14px;
  width: 4px; background: var(--wd-warm);
  border-radius: 2px;
}
.bp .body h3 {
  font-family: var(--font-playfair), serif;
  font-size: 1.25rem; color: var(--wd-deep);
  margin: 32px 0 12px; line-height: 1.35;
  font-weight: 600;
  font-style: italic;
}

/* Stat callout block */
.bp .stat-row {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 16px; margin: 36px 0;
}
.bp .stat-cell {
  background: var(--wd-sand); padding: 22px 20px;
  border-radius: 4px; text-align: center;
  border-top: 3px solid var(--wd-warm);
}
.bp .stat-num {
  font-family: var(--font-playfair), serif;
  font-size: 2rem; line-height: 1; color: var(--wd-deep);
  font-weight: 700; margin-bottom: 6px;
}
.bp .stat-num small { font-size: 1rem; color: var(--wd-warm); margin-left: 2px; }
.bp .stat-lbl {
  font-size: 0.66rem; letter-spacing: 2px; text-transform: uppercase;
  color: var(--wd-mute); font-weight: 600;
}

/* Comparison table */
.bp .ctable {
  width: 100%; border-collapse: collapse;
  margin: 32px 0; background: white;
  border: 1px solid rgba(197,142,74,0.2);
  border-radius: 4px; overflow: hidden;
  font-size: 0.92rem;
}
.bp .ctable thead th {
  background: var(--wd-deep); color: var(--wd-cream);
  text-align: left; padding: 14px 18px;
  font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
}
.bp .ctable tbody td {
  padding: 14px 18px;
  border-top: 1px solid rgba(197,142,74,0.15);
  color: var(--wd-deep);
  vertical-align: top;
  line-height: 1.5;
}
.bp .ctable tbody tr:nth-child(even) td { background: rgba(236,223,198,0.4); }
.bp .ctable td:first-child { font-weight: 600; color: var(--wd-deep); }

@media (max-width: 720px) {
  .bp .stat-row { grid-template-columns: 1fr; gap: 10px; }
  .bp .ctable { font-size: 0.82rem; }
  .bp .ctable thead th, .bp .ctable tbody td { padding: 10px 12px; }
}
.bp .body a.bp-link {
  color: var(--wd-warm);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
  font-weight: 600;
  transition: color .2s;
}
.bp .body a.bp-link:hover { color: var(--wd-deep); }
.bp .body img.inline {
  width: 100%; border-radius: 4px;
  margin: 32px 0 12px;
  box-shadow: 0 16px 40px rgba(61,42,31,0.15);
}
.bp .body figure { margin: 32px 0; }
.bp .body figure img { width: 100%; border-radius: 4px; box-shadow: 0 16px 40px rgba(61,42,31,0.15); }
.bp .body figcaption {
  text-align: center; font-size: 0.82rem;
  color: var(--wd-mute); font-style: italic;
  margin-top: 12px;
}
.bp .body blockquote {
  margin: 36px 0; padding: 24px 30px;
  background: var(--wd-sand); border-left: 4px solid var(--wd-warm);
  border-radius: 2px;
  font-family: var(--font-playfair), serif;
  font-size: 1.2rem; line-height: 1.55; color: var(--wd-deep);
  font-style: italic;
}
.bp .body ul {
  list-style: none; padding: 0; margin: 24px 0;
  display: flex; flex-direction: column; gap: 10px;
}
.bp .body ul li {
  position: relative; padding-left: 26px;
  font-size: 1rem; color: var(--wd-deep); line-height: 1.7;
}
.bp .body ul li::before {
  content: '✦'; position: absolute;
  left: 0; top: 0;
  color: var(--wd-warm);
  font-size: 0.85rem;
}

/* ── Author / share footer ── */
.bp .post-foot {
  max-width: 800px; margin: 0 auto;
  padding: 40px 60px;
  border-top: 1px solid rgba(107,74,51,0.18);
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 18px;
}
.bp .post-foot-l { font-size: 0.78rem; color: var(--wd-mute); letter-spacing: 1.5px; }
.bp .post-foot-l strong { color: var(--wd-deep); font-weight: 600; }
.bp .post-foot-r {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase;
  color: var(--wd-mute); font-weight: 500;
}
.bp .post-foot-r a {
  color: var(--wd-warm); text-decoration: none; font-weight: 600;
}
.bp .post-foot-r a:hover { color: var(--wd-deep); }

/* ── Related posts ── */
.bp .related {
  background: var(--wd-sand);
  padding: 80px 60px;
  border-top: 1px solid rgba(107,74,51,0.14);
}
.bp .rel-inner { max-width: 1300px; margin: 0 auto; }
.bp .rel-eyebrow { font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 12px; font-weight: 600; text-align: center; }
.bp .rel-title {
  font-family: var(--font-playfair), serif;
  font-size: 2rem; color: var(--wd-deep);
  margin: 0 0 50px; text-align: center;
}
.bp .rel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.bp .rel-card {
  background: white;
  border-radius: 4px; overflow: hidden;
  text-decoration: none; color: inherit;
  border: 1px solid rgba(197,142,74,0.18);
  transition: transform .3s, box-shadow .3s, border-color .3s;
}
.bp .rel-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(61,42,31,0.14); border-color: var(--wd-warm); }
.bp .rel-img { aspect-ratio: 16/10; background: var(--wd-ink); overflow: hidden; }
.bp .rel-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s; }
.bp .rel-card:hover .rel-img img { transform: scale(1.06); }
.bp .rel-body { padding: 22px 22px 24px; }
.bp .rel-meta { font-size: 0.62rem; letter-spacing: 2px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 8px; font-weight: 600; }
.bp .rel-name { font-family: var(--font-playfair), serif; font-size: 1.1rem; color: var(--wd-deep); line-height: 1.35; margin: 0; }

/* ── CTA ── */
.bp .cta {
  background: linear-gradient(135deg, var(--wd-deep) 0%, var(--wd-mid) 50%, var(--wd-deep) 100%);
  padding: 80px 60px; text-align: center;
  color: var(--wd-cream);
}
.bp .cta-eyebrow { font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 14px; font-weight: 600; }
.bp .cta-title { font-family: var(--font-playfair), serif; font-size: 2.2rem; line-height: 1.25; margin: 0 0 16px; }
.bp .cta-sub { font-size: 1rem; color: rgba(217,185,143,0.7); max-width: 560px; margin: 0 auto 30px; line-height: 1.7; font-weight: 300; }
.bp .cta-btns { display: inline-flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.bp .cta-btn {
  background: var(--wd-warm); color: white;
  padding: 14px 30px; text-decoration: none;
  font-size: 0.74rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px;
  transition: background .2s, transform .2s;
}
.bp .cta-btn:hover { background: #D9A05E; transform: translateY(-2px); }
.bp .cta-btn.outline { background: transparent; border: 1px solid rgba(217,185,143,0.5); color: var(--wd-light); }
.bp .cta-btn.outline:hover { background: rgba(217,185,143,0.08); border-color: var(--wd-light); }

@media (max-width: 1100px) {
  .bp .rel-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .bp .topbar { padding: 22px 24px 0; }
  .bp .hero { padding: 28px 24px 40px; }
  .bp .hero-img-wrap { padding: 0 24px; }
  .bp .body { padding: 50px 24px 60px; }
  .bp .post-foot { padding: 30px 24px; }
  .bp .related { padding: 60px 24px; }
  .bp .rel-grid { grid-template-columns: 1fr; }
  .bp .cta { padding: 60px 24px; }
  .bp .cta-title { font-size: 1.6rem; }
  .bp .bp-crumb-cur { max-width: 20ch; }
}

/* ── Print / Save-as-PDF ──
   Drives what the browser's print dialog produces when a reader hits the
   Print button. Everything that only makes sense on screen is dropped:
   navigation, the reading-progress bar, share and print controls, related
   posts and the closing CTA. What survives is the article itself, the
   diagrams, the FAQ and the byline — i.e. a document a procurement team
   can actually file or circulate.

   The collapsed table of contents is forced open so the printed copy keeps
   its outline, and every link's destination is printed after the label,
   since a href is useless on paper. Site-relative links get the origin
   prepended so the printed URL is complete. */
@media print {
  .bp { background: #fff !important; }
  .bp .topbar,
  .bp .post-foot-r,
  .bp .related,
  .bp .cta,
  .no-print { display: none !important; }

  .bp .hero { padding: 0 0 18px; }
  .bp .hero-title { font-size: 22pt; }
  .bp .hero-excerpt { font-size: 11pt; }
  .bp .body { padding: 0; max-width: none; font-size: 10.5pt; }
  .bp .hero-img-wrap { padding: 0; }

  .bp h2, .bp h3 { break-after: avoid; }
  .bp figure, .bp table, .bp blockquote { break-inside: avoid; }
  .bp .bp-toc[open] .bp-toc-list { display: block !important; }

  .bp .bp-link::after { font-size: 8.5pt; color: #555; word-break: break-all; }
  /* Internal links render as a site-relative path, so the origin is added
     back to make the printed URL usable. External links already carry it. */
  .bp .bp-link:not(.bp-link-ext)::after { content: ' (https://www.custom-woodenbox.com' attr(href) ')'; }
  .bp .bp-link-ext::after { content: ' (' attr(href) ')'; }
}
`;

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Parse inline [label](/path) markdown links in body text.
//
// Internal paths render as next-intl <Link> so the active locale prefix is
// added automatically. Absolute http(s) URLs are a different animal: passing
// them to <Link> would have next-intl try to prefix a foreign origin, so they
// render as a plain <a> instead — and they open in a new tab, with
// rel="noopener noreferrer" (noopener closes the reverse-tabnabbing hole that
// target="_blank" opens; noreferrer keeps our URLs out of their analytics).
// Plain text without the token renders unchanged, so existing posts are
// unaffected.
function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

function renderInline(text) {
  if (typeof text !== 'string' || text.indexOf('](') === -1) return text;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const out = [];
  let last = 0, m, k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    out.push(
      isExternalHref(href) ? (
        <a
          key={`l${k++}`}
          href={href}
          className="bp-link bp-link-ext"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ) : (
        <Link key={`l${k++}`} href={href} className="bp-link">{label}</Link>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// `headingIds` maps a body index → anchor id, so the <h2>/<h3> we render here
// carries the same id the table of contents links to. Passed in rather than
// recomputed so both sides cannot drift apart.
function renderBlock(block, i, headingIds) {
  const anchor = headingIds ? headingIds.get(i) : undefined;
  switch (block.type) {
    case 'h2':
      return <h2 key={i} id={anchor}>{block.text}</h2>;
    case 'h3':
      return <h3 key={i} id={anchor}>{block.text}</h3>;
    case 'video':
      return (
        <BlogVideo
          key={i}
          youtubeId={block.youtubeId}
          title={block.title}
          caption={block.caption}
        />
      );
    case 'compare':
      return <BlogCompare key={i} items={block.items} caption={block.caption} />;
    case 'flow':
      return <BlogFlow key={i} steps={block.steps} caption={block.caption} />;
    case 'p':
      return <p key={i}>{renderInline(block.text)}</p>;
    case 'img':
      return (
        <figure key={i}>
          <img loading="lazy" decoding="async" src={block.src} alt={block.caption || ''} width="1200" height="900" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'quote':
      return <blockquote key={i}>{block.text}</blockquote>;
    case 'list':
      return (
        <ul key={i}>
          {block.items.map((it, k) => <li key={k}>{renderInline(it)}</li>)}
        </ul>
      );
    case 'stats':
      return (
        <div key={i} className="stat-row">
          {block.items.map((s, k) => (
            <div key={k} className="stat-cell">
              <div className="stat-num">{s.num}{s.suffix && <small>{s.suffix}</small>}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <table key={i} className="ctable">
          <thead>
            <tr>{block.headers.map((h, k) => <th key={k}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((row, k) => (
              <tr key={k}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
}

export default async function BlogPost({ params }) {
  unstable_setRequestLocale(params.locale);
  const enPost = getPostBySlug(params.slug);
  if (!enPost) notFound();

  // Apply per-locale overlay. `body` overlay (if present) replaces the
  // entire English body. `category` / `readTime` likewise translated.
  // Anything not in the overlay falls back to the English source field.
  const overlay = getBlogTranslation(params.slug, params.locale);
  const post = { ...enPost, ...overlay };

  const related = getRelatedPosts(params.slug).map((rp) => ({
    ...rp,
    ...getBlogTranslation(rp.slug, params.locale),
  }));

  // Translated chrome strings (back-link / post footer / related section /
  // breadcrumb names). Loaded once and used across the JSX below.
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });

  // Anchor ids for every h2/h3, shared with the table of contents so the
  // two can never disagree about where a link points.
  const headingIds = buildHeadingIdMap(post.body);

  // Named author for the byline + Person node in the Article schema.
  // Falls back to the default author when a post does not name one.
  const author = getAuthor(post.authorId);

  // ── JSON-LD: Article + BreadcrumbList ──────────────────────────────
  const postPath = `/blog/${post.slug}`;
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.hero ? [`${SITE.siteUrl}${post.hero}`] : undefined,
    datePublished: post.date,
    // Real revision date when the post carries one. Previously this always
    // mirrored datePublished, which told Google and the AI engines that an
    // article reviewed last month had not been touched since publication —
    // and generative engines demonstrably favour recently-updated sources.
    dateModified: post.updated || post.date,
    articleSection: post.category,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      description: author.bio,
      knowsAbout: author.knowsAbout,
      worksFor: {
        '@type': 'Organization',
        '@id': `${SITE.siteUrl}/#organization`,
        name: SITE.company.legalName,
        url: SITE.siteUrl,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.company.legalName,
      logo: { '@type': 'ImageObject', url: `${SITE.siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.siteUrl}${postPath}` },
  };
  const localePrefix = `/${params.locale}`;
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'),    item: `${SITE.siteUrl}${localePrefix}` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumbJournal'), item: `${SITE.siteUrl}${localePrefix}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title,              item: `${SITE.siteUrl}${localePrefix}${postPath}` },
    ],
  };

  return (
    <article className="bp">
      <ReadingProgressBar />
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <style dangerouslySetInnerHTML={{ __html: POST_CSS }} />

      {/* Top bar: visible breadcrumb (mirrors the BreadcrumbList JSON-LD
          above) plus the print control. The breadcrumb existed only as
          structured data before — readers had no visible path back up. */}
      <div className="topbar">
        <nav className="bp-crumbs" aria-label="Breadcrumb">
          <Link href="/">{t('breadcrumbHome')}</Link>
          <span className="bp-crumb-sep" aria-hidden="true">/</span>
          <Link href="/blog">{t('breadcrumbJournal')}</Link>
          <span className="bp-crumb-sep" aria-hidden="true">/</span>
          <span className="bp-crumb-cur" aria-current="page">{post.title}</span>
        </nav>
        <BlogPrintButton label={t('printLabel')} />
      </div>

      {/* Hero */}
      <header className="hero">
        <div className="pills">
          <span className="pill">{post.category}</span>
          <span className="pill pill-meta">{fmtDate(post.date)}</span>
          <span className="pill pill-meta">{post.readTime}</span>
        </div>
        <h1 className="hero-title">{post.title}</h1>
        <p className="hero-excerpt">{post.excerpt}</p>
      </header>

      {/* Hero image */}
      <div className="hero-img-wrap">
        <div className="hero-img">
          <img loading="lazy" decoding="async" src={post.hero} alt={post.title} width="1200" height="900" />
        </div>
      </div>

      {/* Body */}
      <div className="body">
        <BlogToc body={post.body} label={t('tocLabel')} />
        {post.body.map((block, i) => renderBlock(block, i, headingIds))}
        <BlogAuthorBox
          author={author}
          eyebrow={t('authorEyebrow')}
          reviewedLabel={
            post.updated ? t('lastReviewed', { date: fmtDate(post.updated) }) : null
          }
        />
      </div>

      {/* Article FAQ — renders nothing when the post ships no `faqs`.
          Emits its own FAQPage JSON-LD (see components/PageFaq.jsx). */}
      <PageFaq faqs={post.faqs} />

      {/* Post footer */}
      <div className="post-foot">
        <div className="post-foot-l">
          {t('postFiledUnder')} <strong>{post.category}</strong> · {t('postPublished')} {fmtDate(post.date)}
        </div>
        <div className="post-foot-r">
          <span style={{ marginRight: 10, color: 'var(--wd-mute)' }}>{t('postShare')}</span>
          <BlogShareButtons
            url={`${SITE.siteUrl}${localePrefix}${postPath}`}
            title={post.title}
          />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related">
          <div className="rel-inner">

            <div className="rel-eyebrow">{t('postRelatedEyebrow')}</div>
            <h2 className="rel-title">{t('postRelatedTitle')}</h2>
            <div className="rel-grid">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="rel-card">
                  <div className="rel-img">
                    <img src={rp.hero} alt={rp.title} loading="lazy" width="1200" height="900" />
                  </div>
                  <div className="rel-body">
                    <div className="rel-meta">
                      {rp.category} · {rp.readTime}
                    </div>
                    <h3 className="rel-name">{rp.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}