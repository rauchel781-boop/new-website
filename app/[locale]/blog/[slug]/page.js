import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { POSTS, getPostBySlug, getRelatedPosts } from '@/data/blog';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Article — CHIC' };
  // Blog is English-only — canonical stays on /en regardless of current locale.
  const en = routing.defaultLocale;
  const path = `/${en}/blog/${post.slug}`;
  return {
    title: `${post.title} — CHIC`,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Jost:wght@300;400;500;600&display=swap');

.bp {
  --wd-deep:    #3D2A1F;
  --wd-mid:     #6B4A33;
  --wd-warm:    #C58E4A;
  --wd-light:   #D9B98F;
  --wd-cream:   #F6EEDF;
  --wd-sand:    #ECDFC6;
  --wd-ink:     #2A1B12;
  --wd-mute:    #7A6450;

  font-family: 'Jost', system-ui, sans-serif;
  background: var(--wd-cream);
  color: var(--wd-ink);
}
.bp *, .bp *::before, .bp *::after { box-sizing: border-box; }

/* ── Top bar (back to blog) ── */
.bp .topbar { padding: 26px 60px 0; max-width: 1300px; margin: 0 auto; }
.bp .back-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.7rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600;
  color: var(--wd-warm); text-decoration: none;
  transition: color .2s;
}
.bp .back-link:hover { color: var(--wd-deep); }

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
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
  font-size: 3.4rem; font-weight: 700;
  float: left; line-height: 0.95;
  margin: 6px 12px 0 0;
  color: var(--wd-warm);
}
.bp .body h2 {
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
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
.bp .rel-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--wd-deep); line-height: 1.35; margin: 0; }

/* ── CTA ── */
.bp .cta {
  background: linear-gradient(135deg, var(--wd-deep) 0%, var(--wd-mid) 50%, var(--wd-deep) 100%);
  padding: 80px 60px; text-align: center;
  color: var(--wd-cream);
}
.bp .cta-eyebrow { font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 14px; font-weight: 600; }
.bp .cta-title { font-family: 'Playfair Display', serif; font-size: 2.2rem; line-height: 1.25; margin: 0 0 16px; }
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
}
`;

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>;
    case 'h3':
      return <h3 key={i}>{block.text}</h3>;
    case 'p':
      return <p key={i}>{block.text}</p>;
    case 'img':
      return (
        <figure key={i}>
          <img src={block.src} alt={block.caption || ''} width="1200" height="900" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'quote':
      return <blockquote key={i}>{block.text}</blockquote>;
    case 'list':
      return (
        <ul key={i}>
          {block.items.map((it, k) => <li key={k}>{it}</li>)}
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

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug);

  // ── JSON-LD: Article + BreadcrumbList ──────────────────────────────
  const postPath = `/blog/${post.slug}`;
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.hero ? [`${SITE.siteUrl}${post.hero}`] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: { '@type': 'Organization', name: SITE.company.legalName, url: SITE.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: SITE.company.legalName,
      logo: { '@type': 'ImageObject', url: `${SITE.siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.siteUrl}${postPath}` },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE.siteUrl}${postPath}` },
    ],
  };

  return (
    <article className="bp">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <style dangerouslySetInnerHTML={{ __html: POST_CSS }} />

      {/* Top bar */}
      <div className="topbar">
        <Link href="/blog" className="back-link">← Back to Journal</Link>
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
          <img src={post.hero} alt={post.title} width="1200" height="900" />
        </div>
      </div>

      {/* Body */}
      <div className="body">
        {post.body.map(renderBlock)}
      </div>

      {/* Post footer */}
      <div className="post-foot">
        <div className="post-foot-l">
          Filed under <strong>{post.category}</strong> · Published {fmtDate(post.date)}
        </div>
        <div className="post-foot-r">
          Share: <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent('Thought you might like this article from CHIC: https://chicwoodenexpert.com/blog/' + post.slug)}`}>Email</a>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related">
          <div className="rel-inner">
            
            <div className="rel-eyebrow">Continue reading</div>
            <h2 className="rel-title">Related Articles</h2>
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
