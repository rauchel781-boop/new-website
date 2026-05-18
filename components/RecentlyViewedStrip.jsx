'use client';

// Recently-viewed product strip. Reads localStorage on mount, shows
// up to 6 cards. Hidden if the list is empty (first-time visitors
// don't see an empty placeholder — keeps the page clean).
//
// Where to mount:
//   - /products (catalog index) — at the top, above "Our Catalog"
//     hero. Returning visitors see their watchlist immediately.
//   - Could also mount on the homepage — but kept off there for now
//     to not crowd the hero.

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { readRecentlyViewed, clearRecentlyViewed } from '@/lib/recently-viewed';

export default function RecentlyViewedStrip() {
  const t = useTranslations('recentlyViewed');
  // Brand-augmented alt text for the thumbnail (e.g. "Watch Box — Custom Wooden Box by CHIC").
  const tGrid = useTranslations('productGrid');
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(readRecentlyViewed());
    setMounted(true);
  }, []);

  // While SSR / hydrating, render nothing so the markup is stable.
  // Once mounted on the client we know the real list; if it's empty
  // we stay hidden — no "Recently Viewed (0)" empty state.
  if (!mounted || items.length === 0) return null;

  function onClear() {
    clearRecentlyViewed();
    setItems([]);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="rv-strip" aria-label={t('title')}>
        <div className="rv-strip-inner">
          <div className="rv-head">
            <div>
              <div className="rv-eyebrow">{t('eyebrow')}</div>
              <h2 className="rv-title">{t('title')}</h2>
            </div>
            <button type="button" className="rv-clear" onClick={onClear}>
              {t('clear')}
            </button>
          </div>
          <div className="rv-list" role="list">
            {items.map((it) => (
              <Link
                key={it.slug}
                role="listitem"
                href={`/products/${it.categorySlug}/${it.slug}`}
                className="rv-card"
              >
                <div className="rv-img">
                  {it.image && (
                    <img
                      src={it.image}
                      alt={tGrid('cardAlt', { name: it.name || it.slug })}
                      loading="lazy"
                      width="240"
                      height="240"
                    />
                  )}
                </div>
                <div className="rv-name">{it.name || it.slug}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const CSS = `
.rv-strip {
  background: var(--wd-cream, #F6EEDF);
  padding: 32px 60px 8px;
  border-bottom: 1px solid rgba(107,74,51,0.08);
}
.rv-strip-inner {
  max-width: 1300px; margin: 0 auto;
}
.rv-head {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 18px; gap: 16px; flex-wrap: wrap;
}
.rv-eyebrow {
  font-size: 0.6rem; letter-spacing: 4px; text-transform: uppercase;
  color: #C58E4A; margin-bottom: 6px; font-weight: 600;
}
.rv-title {
  font-family: var(--font-fraunces), serif;
  font-size: 1.3rem;
  color: #3D2A1F;
  margin: 0; font-weight: 600;
  letter-spacing: -0.3px;
}
.rv-clear {
  border: 1px solid rgba(107,74,51,0.25);
  background: transparent;
  color: #7A6450;
  font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 100px;
  cursor: pointer;
  font-family: inherit;
  transition: border-color .15s, color .15s;
}
.rv-clear:hover { border-color: #C58E4A; color: #C58E4A; }

.rv-list {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 14px;
  -webkit-overflow-scrolling: touch;
}
.rv-card {
  flex: 0 0 auto;
  width: 140px;
  text-decoration: none;
  color: inherit;
  scroll-snap-align: start;
  transition: transform .15s;
}
.rv-card:hover { transform: translateY(-3px); }
.rv-img {
  width: 140px; height: 140px;
  background: #ECDFC6;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(107,74,51,0.12);
}
.rv-img img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.rv-name {
  margin-top: 8px;
  font-size: 0.78rem;
  color: #3D2A1F;
  line-height: 1.35;
  font-weight: 500;
  /* Clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .rv-strip { padding: 24px 22px 8px; }
  .rv-card, .rv-img { width: 112px; }
  .rv-img { height: 112px; }
}
`;
