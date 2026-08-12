import { Link } from '@/i18n/navigation';
import { CATEGORIES, GROUPS } from '@/data/categories';
import { alternates } from '@/i18n/seo';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import RecentlyViewedStrip from '@/components/RecentlyViewedStrip';
import PageFaq from '@/components/PageFaq';
import { getPageFaqs } from '@/data/page-faqs';
import PageBreadcrumbLd from '@/components/PageBreadcrumbLd';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'productsIndex.meta' });
  const title = t('title');
  const description = t('description');
  return {
    title,
    description,
    alternates: alternates(locale, '/products'),
    openGraph: {
      url: `/${locale}/products`,
      title,
      description,
    },
  };
}

// Maps the raw English `group` string in /data/categories.js to translation
// keys in messages/{locale}.json under `productsIndex`.
// If you add a new group to categories.js, add its mapping here too.
const GROUP_LABEL_KEY = {
  'By Use': 'groupByUse',
  'By Structure': 'groupByStructure',
  'By Material': 'groupByMaterial',
};
const GROUP_QUESTION_KEY = {
  'By Use': 'questionByUse',
  'By Structure': 'questionByStructure',
  'By Material': 'questionByMaterial',
};

const CSS = `

.prods {
  --wood-deep:  #3D2A1F;
  --wood-mid:   #6B4A33;
  --wood-warm:  #A07852;
  --wood-light: #D9B98F;
  --cream:      #F6EEDF;
  --cream-dk:   #ECDFC6;
  --grain:      #E5D2B2;
  --accent:     #C58E4A;
  --charcoal:   #2A1B12;
  --text-muted: #7A6450;
  font-family: var(--font-jost), system-ui, sans-serif;
  background: var(--cream);
  color: var(--charcoal);
}
.prods *, .prods *::before, .prods *::after { box-sizing: border-box; }

.prods-hero {
  position: relative;
  background:
    radial-gradient(1200px 400px at 20% 0%, rgba(217,185,143,0.55), transparent 70%),
    radial-gradient(1000px 500px at 100% 100%, rgba(160,120,82,0.35), transparent 70%),
    linear-gradient(180deg, var(--cream) 0%, var(--cream-dk) 100%);
  color: var(--wood-deep);
  padding: 100px 60px 80px;
  overflow: hidden;
  border-bottom: 1px solid rgba(107,74,51,0.12);
}
.prods-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg,
    transparent 0, transparent 110px,
    rgba(107,74,51,0.04) 110px, rgba(107,74,51,0.04) 111px,
    transparent 111px, transparent 220px,
    rgba(107,74,51,0.025) 220px, rgba(107,74,51,0.025) 222px);
  pointer-events: none;
}
.prods-hero-inner { position: relative; z-index: 2; max-width: 1300px; margin: 0 auto; }
.prods-eyebrow { font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase; color: var(--accent); margin-bottom: 18px; font-weight: 600; }
.prods-h1 {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: clamp(2.4rem, 4.5vw, 3.6rem);
  margin: 0 0 18px;
  line-height: 1.05;
  color: var(--wood-deep);
  letter-spacing: -0.5px;
}
.prods-h1 em {
  font-family: var(--font-caveat), cursive;
  font-style: normal;
  font-weight: 700;
  color: var(--accent);
}
.prods-sub {
  font-family: var(--font-fraunces), serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.08rem;
  color: var(--wood-mid);
  max-width: 680px;
  line-height: 1.75;
}

.prods-body { padding: 80px 60px 120px; }
.prods-inner { max-width: 1300px; margin: 0 auto; }
.prods-group + .prods-group { margin-top: 80px; }
.prods-group-head { display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 16px; margin-bottom: 36px; padding-bottom: 18px; border-bottom: 1px solid rgba(107,74,51,0.18); }
.prods-group-label { font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; font-weight: 600; }
.prods-group-title {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: 2rem;
  color: var(--wood-deep);
  margin: 0;
  letter-spacing: -0.3px;
}
.prods-group-count { font-size: 0.78rem; color: var(--text-muted); letter-spacing: 1px; }

.prods-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.prods-card {
  background: var(--cream);
  padding: 32px 28px;
  border-radius: 2px;
  border: 1px solid var(--grain);
  border-top: 3px solid var(--accent);
  text-decoration: none;
  color: var(--wood-deep);
  display: flex; flex-direction: column;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.prods-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(61,42,31,0.14);
  border-color: var(--accent);
}
.prods-card-eyebrow { font-size: 0.6rem; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; font-weight: 600; }
.prods-card-title {
  font-family: var(--font-fraunces), serif;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0 10px;
  line-height: 1.3;
  color: var(--wood-deep);
}
.prods-card-tagline {
  font-family: var(--font-caveat), cursive;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--accent);
  margin-bottom: 14px;
  line-height: 1.2;
}
.prods-card-desc {
  font-family: var(--font-fraunces), serif;
  font-style: italic;
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.65;
  font-weight: 400;
  flex: 1;
}
.prods-card-arrow { color: var(--accent); font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; margin-top: 22px; font-weight: 600; }

/* ─── CLOSURE COMPARISON TABLE ───
   GEO rationale: "which closure type should I choose" is a direct-answer
   question AI engines like to lift as a table. Real <table> markup (not a
   card grid) so the row/column structure survives text-only extraction. */
.prods-cmp-wrap { overflow-x: auto; margin: -6px -6px 44px; padding: 6px; }
.prods-cmp { width: 100%; border-collapse: collapse; background: var(--cream); font-size: 0.86rem; }
.prods-cmp th, .prods-cmp td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--grain); vertical-align: top; }
.prods-cmp thead th {
  font-size: 0.66rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--accent); font-weight: 600; border-bottom: 2px solid var(--accent);
  white-space: nowrap;
}
.prods-cmp tbody tr:hover { background: var(--cream-dk); }
.prods-cmp-name { font-family: var(--font-fraunces), serif; font-weight: 600; color: var(--wood-deep); }
.prods-cmp td, .prods-cmp-desc { color: var(--text-muted); line-height: 1.55; }
.prods-cmp-link { color: var(--accent); text-decoration: none; font-weight: 600; white-space: nowrap; }
.prods-cmp-link:hover { text-decoration: underline; }

@media (max-width: 960px) {
  .prods-hero { padding: 70px 28px 60px; }
  .prods-body { padding: 60px 28px 80px; }
  .prods-grid { grid-template-columns: 1fr; }
  .prods-cmp { font-size: 0.8rem; }
  .prods-cmp th, .prods-cmp td { padding: 10px 12px; }
}
`;

// ─── Closure-type comparison table data ────────────────────────────────
// English-only, matching this codebase's existing pattern for incremental
// rich content (see components/ProductRichBlock.jsx, data/page-faqs) —
// added directly rather than as next-intl keys to avoid partial/mixed-
// language translations across the other 7 locales. Every "how it works"
// and "best for" line restates facts already published on each category's
// own page (data/categories.js `intro`/`tagline`/body copy), not new
// claims — this table just gives AI engines and human scanners one
// structured place to compare closures instead of five separate pages.
const CLOSURE_COMPARE = [
  { slug: 'magnetic', name: 'Magnetic Closure', how: 'Hidden neodymium magnets inside the wall — no visible hardware, lid snaps shut with a soft, deliberate feel.', bestFor: 'Beauty brands, subscription boxes, tech accessories — the cleanest, most premium unboxing feel.' },
  { slug: 'hinged', name: 'Hinged Lid', how: 'Brass or concealed steel hinges, optional clasp or lock, built for frequent daily opening.', bestFor: 'Jewelry and keepsake boxes, tool storage — anything opened and closed often.' },
  { slug: 'sliding-lid', name: 'Sliding Lid', how: 'No hardware at all — a dado-grooved tray and a precision-routed lid that slides flush across the top.', bestFor: 'Gift, cigar, tea and wedding-favor boxes — lowest assembly cost, ships flat-packed, nothing to break.' },
  { slug: 'drawer', name: 'Drawer / Pull-Out', how: 'One to twelve tiers of drawer cabinets with soft-close slides and brass pulls.', bestFor: 'Jewelry, tool, office and apothecary storage — sorting many small items across levels.' },
  { slug: 'with-lock', name: 'Lockable', how: 'Brass key lock, combination lock, or hidden cam lock with reinforced hinges.', bestFor: 'Cash, documents, valuables and heirloom storage — anything that needs to stay closed.' },
];

export default async function ProductsPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'productsIndex' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tCC = await getTranslations({ locale, namespace: 'categoryContent' });
  return (
    <div className="prods">
      <PageBreadcrumbLd locale={locale} name="Products" path="/products" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Returning visitors: show what they were looking at last time */}
      <RecentlyViewedStrip />

      <section className="prods-hero">
        <div className="prods-hero-inner">
          <div className="prods-eyebrow">{t('eyebrow')}</div>
          <h1 className="prods-h1">
            {t('titleStart')} <em>{t('titleEm')}</em>
          </h1>
          <p className="prods-sub">{t('sub')}</p>
        </div>
      </section>

      <section className="prods-body">
        <div className="prods-inner">
          {GROUPS.map((g) => {
            const groupLabelKey = GROUP_LABEL_KEY[g.title];
            const groupQuestionKey = GROUP_QUESTION_KEY[g.title];
            return (
              <div className="prods-group" key={g.title}>
                <div className="prods-group-head">
                  <div>
                    <div className="prods-group-label">{groupLabelKey ? t(groupLabelKey) : g.title}</div>
                    <h2 className="prods-group-title">{groupQuestionKey ? t(groupQuestionKey) : g.title}</h2>
                  </div>
                  <div className="prods-group-count">{t('categoriesCount', { n: g.items.length })}</div>
                </div>

                {/* Closure comparison table — English only (see CLOSURE_COMPARE
                    note above); renders once, right above the "By Structure"
                    card grid, as a real <table> so an AI engine or human
                    scanner can compare all five closures in one glance. */}
                {g.title === 'By Structure' && locale === 'en' && (
                  <div className="prods-cmp-wrap">
                    <table className="prods-cmp">
                      <thead>
                        <tr>
                          <th>Closure Type</th>
                          <th>How It Works</th>
                          <th>Best For</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CLOSURE_COMPARE.map((row) => (
                          <tr key={row.slug}>
                            <td className="prods-cmp-name">
                              <Link href={`/products/${row.slug}`} className="prods-cmp-link">{row.name}</Link>
                            </td>
                            <td>{row.how}</td>
                            <td>{row.bestFor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="prods-grid">
                  {g.items.map((slug) => {
                    const c = CATEGORIES[slug];
                    if (!c) return null;
                    return (
                      <Link href={`/products/${slug}`} key={slug} className="prods-card">
                        <div className="prods-card-eyebrow">{groupLabelKey ? t(groupLabelKey) : c.group}</div>
                        <h3 className="prods-card-title">{tCat(slug)}</h3>
                        <div className="prods-card-tagline">{tCC(`${slug}.tagline`)}</div>
                        <p className="prods-card-desc">{tCC(`${slug}.intro`)}</p>
                        <div className="prods-card-arrow">{t('explore')} →</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <PageFaq faqs={getPageFaqs('products', locale)} />
    </div>
  );
}
