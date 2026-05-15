'use client';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getProductTranslation } from '@/data/products/translations';

// Closure values from /data/products/*.js are always English (e.g. 'Hinged').
// Map them to translation keys in messages/{locale}.json under `productGrid`
// so the chip labels render in the visitor's language while filter logic
// continues to compare English keys.
const CLOSURE_TKEY = {
  'All': 'filterAll',
  'Magnetic': 'filterMagnetic',
  'Hinged': 'filterHinged',
  'Sliding': 'filterSliding',
  'Drawer': 'filterDrawer',
  'Lift-off': 'filterLiftOff',
  'Lock': 'filterLock',
};

const CSS = `
.pg {
  --pg-wood-deep: #3D2A1F;
  --pg-wood-mid:  #6B4A33;
  --pg-wood-warm: #A07852;
  --pg-wood-light:#D9B98F;
  --pg-cream:     #F6EEDF;
  --pg-cream-dk:  #ECDFC6;
  --pg-accent:    #C58E4A;
  --pg-text-muted:#7A6450;
  --pg-border:    #E5D2B2;
}
.pg-filters {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-bottom: 36px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--pg-border);
}
.pg-chip {
  background: var(--pg-cream);
  border: 1px solid var(--pg-border);
  color: var(--pg-wood-deep);
  padding: 9px 18px;
  font-size: 0.78rem;
  letter-spacing: 1px;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px;
  transition: background .15s, border-color .15s, color .15s;
  font-family: inherit;
}
.pg-chip:hover { border-color: var(--pg-accent); color: var(--pg-accent); }
.pg-chip.is-active { background: var(--pg-wood-deep); border-color: var(--pg-wood-deep); color: var(--pg-cream); }
.pg-chip-count {
  font-size: 0.68rem;
  background: rgba(197,142,74,0.18);
  color: var(--pg-wood-mid);
  padding: 2px 8px;
  border-radius: 100px;
  font-weight: 600;
}
.pg-chip.is-active .pg-chip-count { background: rgba(246,238,223,0.22); color: var(--pg-cream); }

.pg-summary {
  font-size: 0.8rem;
  color: var(--pg-text-muted);
  margin-bottom: 18px;
  letter-spacing: 0.5px;
}

.pg-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.pg-card {
  display: flex; flex-direction: column;
  background: var(--pg-cream);
  border: 1px solid var(--pg-border);
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: transform .2s, box-shadow .25s, border-color .2s;
}
.pg-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(61,42,31,0.14);
  border-color: var(--pg-accent);
}
.pg-card-img {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--pg-cream-dk);
  overflow: hidden;
}
.pg-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
.pg-card:hover .pg-card-img img { transform: scale(1.05); }
.pg-card-badge {
  position: absolute; top: 12px; left: 12px;
  background: rgba(61,42,31,0.85);
  color: var(--pg-cream);
  font-size: 0.62rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  font-weight: 500;
}
.pg-card-info { padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1; }
.pg-card-name {
  font-family: 'Fraunces', serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--pg-wood-deep);
  margin: 0 0 6px;
  line-height: 1.3;
}
.pg-card-tagline {
  font-size: 0.78rem;
  color: var(--pg-text-muted);
  line-height: 1.5;
  margin-bottom: 14px;
  flex: 1;
}
.pg-card-meta {
  display: flex; gap: 12px;
  font-size: 0.7rem;
  color: var(--pg-wood-mid);
  padding-top: 12px;
  border-top: 1px solid var(--pg-border);
  margin-bottom: 12px;
}
.pg-card-meta span { display: flex; flex-direction: column; gap: 1px; }
.pg-card-meta .pg-meta-label { font-size: 0.6rem; color: var(--pg-text-muted); letter-spacing: 1.5px; text-transform: uppercase; }
.pg-card-meta .pg-meta-value { font-weight: 600; color: var(--pg-wood-deep); }
.pg-card-cta {
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--pg-accent);
  font-weight: 600;
}
.pg-card-cta::after { content: ' →'; transition: margin-left .2s; display: inline-block; }
.pg-card:hover .pg-card-cta::after { margin-left: 4px; }

.pg-empty {
  padding: 60px 30px;
  text-align: center;
  color: var(--pg-text-muted);
  border: 1px dashed var(--pg-border);
  border-radius: 4px;
}

@media (max-width: 1100px) {
  .pg-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 800px) {
  .pg-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .pg-grid { grid-template-columns: 1fr; gap: 14px; }
}
`;

export default function ProductGrid({ products, categorySlug, locale = 'en' }) {
  const t = useTranslations('productGrid');
  const [filter, setFilter] = useState('All');

  // Localize product names/closures/taglines per the active locale; falls back
  // to English from the source data file when a translation is missing.
  // We preserve the original English `closure` as `closureKey` so chip filter
  // logic continues to compare against English values across all locales.
  const list = useMemo(
    () => Object.values(products).map((p) => ({
      ...p,
      ...getProductTranslation(p.slug, locale),
      closureKey: p.closure,
    })),
    [products, locale],
  );

  const closures = useMemo(() => {
    const counts = { All: list.length };
    for (const p of list) counts[p.closureKey] = (counts[p.closureKey] || 0) + 1;
    return counts;
  }, [list]);

  const filtered = filter === 'All' ? list : list.filter((p) => p.closureKey === filter);

  const order = ['All', 'Magnetic', 'Hinged', 'Sliding', 'Drawer', 'Lift-off', 'Lock'];
  const chips = order.filter((c) => closures[c] != null);

  return (
    <div className="pg">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pg-filters">
        {chips.map((c) => (
          <button
            key={c}
            className={`pg-chip${filter === c ? ' is-active' : ''}`}
            onClick={() => setFilter(c)}
            type="button"
          >
            {CLOSURE_TKEY[c] ? t(CLOSURE_TKEY[c]) : c}
            <span className="pg-chip-count">{closures[c]}</span>
          </button>
        ))}
      </div>

      <div className="pg-summary">
        {t('summary', { filtered: filtered.length, total: list.length })}
      </div>

      {filtered.length === 0 ? (
        <div className="pg-empty">{t('empty')}</div>
      ) : (
        <div className="pg-grid">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${categorySlug}/${p.slug}`}
              className="pg-card"
            >
              <div className="pg-card-img">
                {p.closure && <div className="pg-card-badge">{p.closure}</div>}
                <img src={p.images[0]} alt={p.name} loading="lazy" width="1200" height="900" />
              </div>
              <div className="pg-card-info">
                <div className="pg-card-name">{p.name}</div>
                <div className="pg-card-tagline">{p.tagline}</div>
                <div className="pg-card-meta">
                  <span>
                    <span className="pg-meta-label">{t('moq')}</span>
                    <span className="pg-meta-value">{p.specs?.MOQ || '—'}</span>
                  </span>
                  <span>
                    <span className="pg-meta-label">{t('lead')}</span>
                    <span className="pg-meta-value">{p.specs?.['Lead Time'] || '—'}</span>
                  </span>
                </div>
                <div className="pg-card-cta">{t('inquire')}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
