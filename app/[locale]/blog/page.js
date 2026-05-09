import { Link } from '@/i18n/navigation';
import { POSTS, CATEGORIES } from '@/data/blog';
import NewsletterForm from '@/components/NewsletterForm';
import { routing } from '@/i18n/routing';
import { unstable_setRequestLocale } from 'next-intl/server';

// Blog is English-only — every locale's blog URL canonicalises to /en/blog
// so Google indexes one canonical per article (no duplicate-content penalty).
export async function generateMetadata({ params: { locale } }) {
  const en = routing.defaultLocale;
  return {
    title: 'Journal — CHIC',
    description:
      'Field notes from a custom wooden box factory — manufacturing process, material choices, OEM/ODM playbooks, packaging strategy and sustainability.',
    alternates: { canonical: `/${en}/blog` },
    openGraph: {
      url: `/${en}/blog`,
      title: 'Journal — CHIC',
      description:
        'Field notes from a custom wooden box factory — process, materials, OEM/ODM, packaging, sustainability.',
    },
  };
}

const BLOG_CSS = `

.blg {
  --wd-deep:    #3D2A1F;
  --wd-mid:     #6B4A33;
  --wd-warm:    #C58E4A;
  --wd-light:   #D9B98F;
  --wd-cream:   #F6EEDF;
  --wd-sand:    #ECDFC6;
  --wd-ink:     #2A1B12;
  --wd-charcoal:#1F140C;
  --wd-mute:    #7A6450;

  font-family: var(--font-jost), system-ui, sans-serif;
  background: var(--wd-cream);
  color: var(--wd-ink);
  overflow-x: hidden;
}
.blg *, .blg *::before, .blg *::after { box-sizing: border-box; }

/* ═══════════════════════════════════════ */
/* ─── HERO (cinematic) ─── */
/* ═══════════════════════════════════════ */
.blg .hero {
  position: relative;
  min-height: 540px;
  height: 70vh;
  max-height: 720px;
  background: var(--wd-charcoal);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  text-align: center;
}
.blg .hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background-image: url('/folder/5-polishing.webp');
  background-size: cover; background-position: center;
  filter: contrast(1.05) saturate(0.95);
  transform: scale(1.06);
  animation: blgHeroBg 22s ease-in-out infinite alternate;
}
.blg .hero-bg::after {
  content: '';
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(20,12,8,0.92) 0%, rgba(20,12,8,0.7) 35%, rgba(20,12,8,0.6) 65%, rgba(20,12,8,0.95) 100%),
    radial-gradient(ellipse at center, rgba(197,142,74,0.16) 0%, rgba(0,0,0,0) 65%);
}
.blg .hero-bg::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg, transparent 0, transparent 90px, rgba(197,142,74,0.04) 90px, rgba(197,142,74,0.04) 91px);
  z-index: 1;
}
.blg .hero-inner { position: relative; z-index: 2; max-width: 900px; padding: 0 32px; }
.blg .hero-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--wd-warm); margin-bottom: 24px; font-weight: 500;
}
.blg .hero-eyebrow::before, .blg .hero-eyebrow::after { content: ''; width: 32px; height: 1px; background: var(--wd-warm); opacity: 0.5; }
.blg .hero-title {
  font-family: var(--font-playfair), serif;
  font-size: clamp(3rem, 7vw, 6rem);
  color: var(--wd-cream); line-height: 1; margin: 0 0 26px;
  letter-spacing: -2px;
  animation: blgFadeUp .9s ease both;
}
.blg .hero-title em { color: var(--wd-warm); font-style: italic; }
.blg .hero-sub {
  font-size: 1.1rem; color: rgba(246,238,223,0.78);
  line-height: 1.8; max-width: 640px; margin: 0 auto;
  font-weight: 300;
  animation: blgFadeUp .9s .15s ease both;
}

/* ═══════════════════════════════════════ */
/* ─── STATS + CATEGORY RIBBON ─── */
/* ═══════════════════════════════════════ */
.blg .ribbon {
  background: var(--wd-ink);
  border-bottom: 1px solid rgba(197,142,74,0.18);
  position: sticky; top: 0; z-index: 20;
}
.blg .rb-inner {
  max-width: 1500px; margin: 0 auto;
  padding: 16px 60px;
  display: flex; justify-content: space-between; align-items: center;
  gap: 24px; flex-wrap: wrap;
}
.blg .rb-stats {
  display: inline-flex; align-items: center; gap: 24px;
  color: rgba(217,185,143,0.75);
  font-size: 0.7rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
}
.blg .rb-stats span strong {
  color: var(--wd-warm); font-family: var(--font-playfair), serif;
  font-size: 1.05rem; font-weight: 700; margin-right: 6px;
}
.blg .rb-cats { display: inline-flex; gap: 8px; flex-wrap: wrap; }
.blg .rb-chip {
  font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  padding: 7px 14px;
  border: 1px solid rgba(197,142,74,0.3);
  border-radius: 100px;
  color: rgba(217,185,143,0.7);
  text-decoration: none;
  transition: all .2s;
}
.blg .rb-chip:hover, .blg .rb-chip.is-active {
  background: var(--wd-warm); border-color: var(--wd-warm); color: white;
}

/* ═══════════════════════════════════════ */
/* ─── BODY ─── */
/* ═══════════════════════════════════════ */
.blg .body { padding: 90px 60px 90px; }
.blg .body-inner { max-width: 1300px; margin: 0 auto; }

/* ─── Latest Issue (featured) ─── */
.blg .latest {
  position: relative;
  display: grid; grid-template-columns: 1.25fr 1fr;
  gap: 0;
  margin-bottom: 100px;
  background: var(--wd-cream);
  border: 1px solid rgba(197,142,74,0.18);
  border-radius: 4px; overflow: hidden;
  text-decoration: none; color: inherit;
  transition: transform .4s cubic-bezier(.2,.7,.3,1), box-shadow .4s;
  box-shadow: 0 16px 50px rgba(61,42,31,0.08);
}
.blg .latest:hover { transform: translateY(-6px); box-shadow: 0 36px 90px rgba(61,42,31,0.18); }
.blg .latest-img {
  position: relative;
  min-height: 460px;
  background: var(--wd-ink);
  overflow: hidden;
}
.blg .latest-img img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .8s ease;
}
.blg .latest:hover .latest-img img { transform: scale(1.04); }
.blg .latest-img::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(20,12,8,0.45) 0%, rgba(20,12,8,0) 35%, rgba(20,12,8,0.65) 100%);
  pointer-events: none;
}
.blg .latest-stamp {
  position: absolute; top: 24px; left: 24px;
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--wd-warm); color: white;
  padding: 8px 16px; font-size: 0.6rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 700;
  border-radius: 100px;
  z-index: 2;
  box-shadow: 0 8px 20px rgba(197,142,74,0.4);
}
.blg .latest-stamp::before { content: '✦'; font-size: 0.7rem; }
.blg .latest-num {
  position: absolute; bottom: 28px; left: 28px;
  font-family: var(--font-playfair), serif;
  font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--wd-cream); font-weight: 500;
  z-index: 2;
}
.blg .latest-num strong { font-family: var(--font-playfair), serif; font-style: italic; font-size: 1.3rem; color: var(--wd-warm); margin-right: 4px; }
.blg .latest-body {
  padding: 56px 56px;
  display: flex; flex-direction: column; justify-content: center;
  background: var(--wd-cream);
  position: relative;
}
.blg .latest-body::before {
  content: '';
  position: absolute; top: 0; bottom: 0; left: 0;
  width: 4px; background: var(--wd-warm);
}
.blg .latest-cat { font-size: 0.66rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 14px; font-weight: 600; }
.blg .latest-title {
  font-family: var(--font-playfair), serif;
  font-size: 2.4rem; line-height: 1.15;
  color: var(--wd-deep); margin: 0 0 22px;
  letter-spacing: -0.5px;
}
.blg .latest-excerpt { font-size: 1.05rem; color: var(--wd-mute); line-height: 1.8; font-weight: 300; margin: 0 0 26px; }
.blg .latest-meta { display: flex; gap: 20px; align-items: center; padding-top: 20px; border-top: 1px solid rgba(197,142,74,0.25); margin-bottom: 22px; }
.blg .latest-meta span { font-size: 0.7rem; letter-spacing: 1.5px; color: var(--wd-mute); text-transform: uppercase; }
.blg .latest-meta span strong { color: var(--wd-deep); font-weight: 600; margin-right: 4px; }
.blg .latest-cta {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.75rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600;
  color: var(--wd-warm);
  align-self: flex-start;
}
.blg .latest-cta::after {
  content: '→';
  display: inline-block;
  transition: transform .2s ease;
}
.blg .latest:hover .latest-cta::after { transform: translateX(6px); }

/* ─── Manifesto quote band (between sections) ─── */
.blg .manifesto {
  position: relative;
  padding: 80px 0;
  margin-bottom: 90px;
  text-align: center;
  border-top: 1px solid rgba(107,74,51,0.15);
  border-bottom: 1px solid rgba(107,74,51,0.15);
}
.blg .manifesto::before {
  content: '"';
  position: absolute; top: 22px; left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-playfair), serif;
  font-size: 5rem; line-height: 1;
  color: var(--wd-warm); opacity: 0.45;
}
.blg .manifesto-text {
  font-family: var(--font-playfair), serif; font-style: italic;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  line-height: 1.5; color: var(--wd-deep);
  max-width: 820px; margin: 0 auto;
}
.blg .manifesto-text em { color: var(--wd-warm); }
.blg .manifesto-attr {
  margin-top: 22px;
  font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--wd-warm); font-weight: 600;
}

/* ─── Section heading ─── */
.blg .sec-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 40px; padding-bottom: 20px;
  border-bottom: 1px solid rgba(107,74,51,0.18);
}
.blg .sec-head-l { display: flex; flex-direction: column; gap: 6px; }
.blg .sec-eyebrow { font-size: 0.66rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); font-weight: 600; }
.blg .sec-title { font-family: var(--font-playfair), serif; font-size: 2rem; color: var(--wd-deep); margin: 0; letter-spacing: -0.3px; }
.blg .sec-count { font-size: 0.74rem; color: var(--wd-mute); letter-spacing: 1.5px; }

/* ─── Editorial mosaic grid (varied sizes) ─── */
.blg .mosaic {
  display: grid; grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}
.blg .mc {
  display: flex; flex-direction: column;
  background: white; border-radius: 4px; overflow: hidden;
  text-decoration: none; color: inherit;
  border: 1px solid rgba(197,142,74,0.18);
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s;
}
.blg .mc:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(61,42,31,0.16); border-color: var(--wd-warm); }
.blg .mc-img { position: relative; aspect-ratio: 16/10; background: var(--wd-ink); overflow: hidden; }
.blg .mc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s ease; }
.blg .mc:hover .mc-img img { transform: scale(1.06); }
.blg .mc-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,12,8,0.05) 0%, rgba(20,12,8,0) 50%); pointer-events: none; }
.blg .mc-pill {
  position: absolute; top: 14px; left: 14px;
  background: rgba(20,12,8,0.78); color: var(--wd-light);
  padding: 5px 12px; font-size: 0.58rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
  border-radius: 100px;
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  z-index: 2;
}
.blg .mc-body { padding: 24px 22px 26px; flex: 1; display: flex; flex-direction: column; }
.blg .mc-meta { font-size: 0.62rem; letter-spacing: 2px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 10px; font-weight: 600; }
.blg .mc-title {
  font-family: var(--font-playfair), serif;
  font-size: 1.18rem; line-height: 1.32;
  color: var(--wd-deep); margin: 0 0 12px;
}
.blg .mc-excerpt { font-size: 0.88rem; color: var(--wd-mute); line-height: 1.65; font-weight: 300; flex: 1; }
.blg .mc-foot { margin-top: 18px; font-size: 0.68rem; letter-spacing: 2px; text-transform: uppercase; color: var(--wd-warm); font-weight: 600; }

/* span variations — wide cards span 3 of 6 cols, normal span 2 */
.blg .mc.span-3 { grid-column: span 3; }
.blg .mc.span-2 { grid-column: span 2; }
.blg .mc.span-3 .mc-img { aspect-ratio: 16/8; }
.blg .mc.span-3 .mc-title { font-size: 1.5rem; }
.blg .mc.span-3 .mc-body { padding: 30px 28px 32px; }
.blg .mc.span-3 .mc-excerpt { font-size: 0.95rem; }

/* ─── Topics tile section ─── */
.blg .topics { margin-top: 100px; }
.blg .topics-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-top: 36px; }
.blg .topic-tile {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 28px 18px; min-height: 130px;
  text-align: center;
  background: var(--wd-sand);
  border-radius: 4px;
  text-decoration: none; color: inherit;
  border: 1px solid rgba(197,142,74,0.2);
  transition: all .25s;
}
.blg .topic-tile:hover { background: white; border-color: var(--wd-warm); transform: translateY(-4px); box-shadow: 0 16px 36px rgba(61,42,31,0.1); }
.blg .topic-icon {
  font-family: var(--font-playfair), serif; font-style: italic;
  font-size: 1.6rem; color: var(--wd-warm); line-height: 1; margin-bottom: 10px;
}
.blg .topic-name { font-size: 0.78rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--wd-deep); font-weight: 600; margin-bottom: 6px; }
.blg .topic-count { font-size: 0.68rem; color: var(--wd-mute); letter-spacing: 1px; }

/* ─── Newsletter card ─── */
.blg .news {
  margin-top: 90px;
  position: relative;
  background:
    radial-gradient(ellipse at 80% 20%, rgba(197,142,74,0.18) 0%, rgba(0,0,0,0) 60%),
    linear-gradient(135deg, var(--wd-deep) 0%, var(--wd-mid) 50%, var(--wd-deep) 100%);
  padding: 70px 60px;
  border-radius: 4px;
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px;
  align-items: center;
  overflow: hidden;
}
.blg .news::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent 0, transparent 40px, rgba(197,142,74,0.04) 40px, rgba(197,142,74,0.04) 41px);
}
.blg .news-text { position: relative; }
.blg .news-eyebrow { font-size: 0.66rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 14px; font-weight: 600; }
.blg .news-title { font-family: var(--font-playfair), serif; font-size: 2rem; color: var(--wd-cream); line-height: 1.25; margin: 0 0 14px; }
.blg .news-sub { font-size: 0.95rem; color: rgba(217,185,143,0.7); line-height: 1.7; max-width: 480px; font-weight: 300; }
.blg .news-form { position: relative; display: flex; flex-direction: column; gap: 14px; }
.blg .news-input {
  background: rgba(20,12,8,0.55);
  border: 1px solid rgba(217,185,143,0.25); color: var(--wd-cream);
  padding: 16px 20px; font-size: 0.95rem; border-radius: 2px;
  font-family: inherit;
  transition: border-color .2s, background .2s;
}
.blg .news-input::placeholder { color: rgba(217,185,143,0.45); }
.blg .news-input:focus { outline: none; border-color: var(--wd-warm); background: rgba(20,12,8,0.75); }
.blg .news-btn {
  background: var(--wd-warm); color: white;
  padding: 16px 28px; font-size: 0.74rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
  border: none; border-radius: 2px; cursor: pointer;
  transition: background .2s, transform .2s;
  font-family: inherit;
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 8px 22px rgba(197,142,74,0.35);
}
.blg .news-btn:hover { background: #D9A05E; transform: translateY(-2px); }
.blg .news-fine { font-size: 0.66rem; letter-spacing: 1px; color: rgba(217,185,143,0.45); }

/* ─── Animations ─── */
@keyframes blgFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes blgHeroBg { 0% { transform: scale(1.06); } 100% { transform: scale(1.16) translate(-1.5%, -1%); } }

/* ─── Responsive ─── */
@media (max-width: 1100px) {
  .blg .hero { height: 60vh; min-height: 480px; }
  .blg .latest { grid-template-columns: 1fr; }
  .blg .latest-img { min-height: 320px; }
  .blg .latest-body { padding: 40px 32px; }
  .blg .latest-title { font-size: 1.85rem; }
  .blg .mosaic { grid-template-columns: repeat(4, 1fr); }
  .blg .mc.span-3 { grid-column: span 4; }
  .blg .mc.span-2 { grid-column: span 2; }
  .blg .topics-grid { grid-template-columns: repeat(3, 1fr); }
  .blg .news { grid-template-columns: 1fr; padding: 50px 32px; gap: 24px; }
  .blg .rb-inner { padding: 14px 32px; }
}
@media (max-width: 720px) {
  .blg .hero { padding: 70px 0; }
  .blg .body { padding: 60px 22px 60px; }
  .blg .ribbon { position: static; }
  .blg .rb-inner { padding: 14px 22px; flex-direction: column; align-items: flex-start; gap: 14px; }
  .blg .rb-stats { gap: 14px; font-size: 0.6rem; flex-wrap: wrap; }
  .blg .latest-body { padding: 32px 22px; }
  .blg .latest-title { font-size: 1.5rem; }
  .blg .latest-excerpt { font-size: 0.95rem; }
  .blg .mosaic { grid-template-columns: 1fr; gap: 22px; }
  .blg .mc.span-3, .blg .mc.span-2 { grid-column: span 1; }
  .blg .mc.span-3 .mc-title { font-size: 1.2rem; }
  .blg .topics-grid { grid-template-columns: repeat(2, 1fr); }
  .blg .news { padding: 40px 22px; margin-top: 60px; }
  .blg .news-title { font-size: 1.55rem; }
  .blg .manifesto { padding: 60px 22px; margin-bottom: 60px; }
  .blg .sec-title { font-size: 1.5rem; }
}
`;

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Distribute span sizes for editorial mosaic — first 2 are wider (span-3),
// next 6 are normal (span-2), last is wide again.
function spanFor(idx, total) {
  if (idx === 0 || idx === 1) return 'span-3';
  if (idx === total - 1) return 'span-3';
  return 'span-2';
}

export default function BlogPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  // Sort newest first
  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featured = sorted[0];
  const rest = sorted.slice(1);

  // Count posts per category for topics tile section
  const catCounts = CATEGORIES.filter((c) => c !== 'All').map((c) => ({
    name: c,
    count: POSTS.filter((p) => p.category === c).length,
  }));

  // Latest update label
  const latestDate = new Date(featured.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className="blg">
      <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-eyebrow">Notes from the Workshop</div>
          <h1 className="hero-title">The CHIC <em>Journal</em></h1>
          <p className="hero-sub">
            Material picks, finishing tricks, sourcing notes and the occasional manufacturing
            war story — written by the people who actually build the boxes.
          </p>
        </div>
      </section>

      {/* ─── STATS + CATEGORY RIBBON ─── */}
      <div className="ribbon">
        <div className="rb-inner">
          <div className="rb-stats">
            <span><strong>{POSTS.length}</strong> Articles</span>
            <span><strong>{CATEGORIES.length - 1}</strong> Topics</span>
            <span><strong>↻</strong> Updated {latestDate}</span>
          </div>
          <div className="rb-cats">
            {CATEGORIES.map((c) => (
              <a key={c} href={`#${c.toLowerCase()}`} className={`rb-chip ${c === 'All' ? 'is-active' : ''}`}>
                {c}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BODY ─── */}
      <section className="body">
        <div className="body-inner">

          {/* Latest Issue (large featured) */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="latest">
              <div className="latest-img">
                <span className="latest-stamp">Latest Issue</span>
                <span className="latest-num"><strong>No. {String(POSTS.length).padStart(2, '0')}</strong>· {fmtDate(featured.date)}</span>
                <img loading="lazy" decoding="async" src={featured.hero} alt={featured.title} width="1200" height="900" />
              </div>
              <div className="latest-body">
                <div className="latest-cat">{featured.category}</div>
                <h2 className="latest-title">{featured.title}</h2>
                <p className="latest-excerpt">{featured.excerpt}</p>
                <div className="latest-meta">
                  <span><strong>{featured.readTime.split(' ')[0]}</strong>min read</span>
                  <span><strong>By</strong>CHIC workshop</span>
                </div>
                <span className="latest-cta">Read the full article</span>
              </div>
            </Link>
          )}

          {/* Manifesto quote */}
          <div className="manifesto">
            <p className="manifesto-text">
              We started this journal because most wooden box buying advice online is written
              by people who&apos;ve never <em>actually built one</em>. These notes come straight from
              our Cao County workshop floor.
            </p>
            <div className="manifesto-attr">— The CHIC Workshop Team</div>
          </div>

          {/* Editorial mosaic */}
          <div className="sec-head">
            <div className="sec-head-l">
              <div className="sec-eyebrow">All Articles</div>
              <h2 className="sec-title">From the Archive</h2>
            </div>
            <div className="sec-count">{rest.length} more posts</div>
          </div>
          <div className="mosaic">
            {rest.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className={`mc ${spanFor(i, rest.length)}`}>
                <div className="mc-img">
                  <span className="mc-pill">{p.category}</span>
                  <img src={p.hero} alt={p.title} loading="lazy" width="1200" height="900" />
                </div>
                <div className="mc-body">
                  <div className="mc-meta">{fmtDate(p.date)} · {p.readTime}</div>
                  <h3 className="mc-title">{p.title}</h3>
                  <p className="mc-excerpt">{p.excerpt}</p>
                  <div className="mc-foot">Read article →</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Topics tile section */}
          <div className="topics">
            <div className="sec-head">
              <div className="sec-head-l">
                <div className="sec-eyebrow">Browse by Topic</div>
                <h2 className="sec-title">Pick a Subject</h2>
              </div>
            </div>
            <div className="topics-grid">
              {catCounts.map((t) => (
                <a key={t.name} href={`#${t.name.toLowerCase()}`} className="topic-tile">
                  <div className="topic-icon">✦</div>
                  <div className="topic-name">{t.name}</div>
                  <div className="topic-count">{t.count} {t.count === 1 ? 'article' : 'articles'}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="news">
            <div className="news-text">
              <div className="news-eyebrow">Subscribe</div>
              <h3 className="news-title">Get new articles delivered to your inbox</h3>
              <p className="news-sub">
                Every two weeks. No fluff, no spam — just real notes from the workshop floor.
                Join 1,200+ buyers, brands and importers worldwide.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}