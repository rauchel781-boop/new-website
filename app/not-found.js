// Branded 404 page.
//
// Lives at the ROOT of /app — Next.js renders this whenever:
//   a) a URL doesn't match any route, OR
//   b) any server component calls notFound()
//
// We can't easily put per-locale 404 content (the not-found handler
// runs outside the [locale] tree), so the copy is intentionally
// short and visual-first. The CTAs land back on /en/ which then
// auto-redirects the user to their preferred locale via the
// next-intl middleware.

import Link from 'next/link';
import { SITE } from '@/data/site-config';

export const metadata = {
  title: 'Page not found — CHIC',
  robots: { index: false, follow: false },
};

const NF_CSS = `
.nf {
  --wd-deep:    #3D2A1F;
  --wd-mid:     #6B4A33;
  --wd-warm:    #C58E4A;
  --wd-light:   #D9B98F;
  --wd-cream:   #F6EEDF;
  --wd-charcoal:#1F140C;

  font-family: var(--font-jost), system-ui, sans-serif;
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 80px 32px;
  text-align: center;
  background:
    radial-gradient(circle at 30% 20%, rgba(217,185,143,0.45), transparent 55%),
    radial-gradient(circle at 75% 75%, rgba(107,74,51,0.4),  transparent 60%),
    linear-gradient(180deg, var(--wd-charcoal) 0%, var(--wd-deep) 100%);
  color: var(--wd-cream);
  overflow: hidden;
}
.nf-stamp {
  font-size: 0.7rem; letter-spacing: 6px; text-transform: uppercase;
  color: var(--wd-warm); margin-bottom: 32px; font-weight: 600;
}
.nf-num {
  font-family: var(--font-playfair), serif;
  font-size: clamp(7rem, 18vw, 12rem);
  line-height: 1; margin: 0;
  color: rgba(246,238,223,0.15);
  letter-spacing: -8px;
  font-weight: 700;
  user-select: none;
}
.nf-title {
  font-family: var(--font-playfair), serif;
  font-size: clamp(2rem, 4.5vw, 3rem);
  margin: -40px 0 18px; line-height: 1.15;
  letter-spacing: -1px;
  color: var(--wd-cream);
  position: relative; z-index: 1;
}
.nf-title em { color: var(--wd-warm); font-style: italic; }
.nf-sub {
  font-size: 1rem; max-width: 540px;
  color: rgba(246,238,223,0.75); line-height: 1.75; margin: 0 auto 40px;
  font-weight: 300;
}
.nf-btns {
  display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center;
  margin-bottom: 60px;
}
.nf-btn {
  padding: 14px 26px; border-radius: 2px;
  font-size: 0.78rem; letter-spacing: 2.5px; text-transform: uppercase;
  font-weight: 500; text-decoration: none;
  transition: background .2s, transform .2s, border-color .2s;
  display: inline-flex; align-items: center; gap: 8px;
}
.nf-btn-primary {
  background: var(--wd-warm); color: var(--wd-charcoal);
  box-shadow: 0 8px 22px rgba(197,142,74,0.32);
}
.nf-btn-primary:hover { background: var(--wd-light); transform: translateY(-2px); }
.nf-btn-outline {
  background: transparent; color: var(--wd-light);
  border: 1px solid rgba(217,185,143,0.4);
}
.nf-btn-outline:hover {
  background: rgba(217,185,143,0.08);
  border-color: var(--wd-light);
}

.nf-suggest {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  max-width: 760px; width: 100%;
  border-top: 1px solid rgba(197,142,74,0.2);
  padding-top: 40px;
}
.nf-suggest-card {
  padding: 22px 18px;
  background: rgba(246,238,223,0.04);
  border: 1px solid rgba(197,142,74,0.18);
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: background .2s, border-color .2s, transform .2s;
}
.nf-suggest-card:hover {
  background: rgba(246,238,223,0.08);
  border-color: var(--wd-warm);
  transform: translateY(-2px);
}
.nf-suggest-eyebrow {
  font-size: 0.6rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--wd-warm); margin-bottom: 8px; font-weight: 600;
}
.nf-suggest-name {
  font-family: var(--font-playfair), serif;
  font-size: 1rem; color: var(--wd-cream); line-height: 1.3;
}

@media (max-width: 640px) {
  .nf-suggest { grid-template-columns: 1fr; }
}
`;

export default function NotFound() {
  return (
    <div className="nf">
      <style dangerouslySetInnerHTML={{ __html: NF_CSS }} />

      <div className="nf-stamp">✦ Page Not Found</div>
      <div className="nf-num">404</div>
      <h1 className="nf-title">This page <em>doesn&apos;t exist</em></h1>
      <p className="nf-sub">
        The link may be broken or the page may have been moved. Below are some
        suggestions, or head back to the homepage and start fresh.
      </p>

      <div className="nf-btns">
        <Link href="/en" className="nf-btn nf-btn-primary">
          ← Back to Home
        </Link>
        <a href={`mailto:${SITE.email}`} className="nf-btn nf-btn-outline">
          Report a broken link
        </a>
      </div>

      <div className="nf-suggest">
        <Link href="/en/products" className="nf-suggest-card">
          <div className="nf-suggest-eyebrow">Browse</div>
          <div className="nf-suggest-name">Wooden Box Catalog</div>
        </Link>
        <Link href="/en/blog" className="nf-suggest-card">
          <div className="nf-suggest-eyebrow">Read</div>
          <div className="nf-suggest-name">The CHIC Journal</div>
        </Link>
        <Link href="/en/contact" className="nf-suggest-card">
          <div className="nf-suggest-eyebrow">Talk</div>
          <div className="nf-suggest-name">Send Us an Inquiry</div>
        </Link>
      </div>
    </div>
  );
}
