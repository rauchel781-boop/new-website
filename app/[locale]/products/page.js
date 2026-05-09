import { Link } from '@/i18n/navigation';
import { CATEGORIES, GROUPS } from '@/data/categories';
import { alternates } from '@/i18n/seo';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: 'Wooden Boxes — CHIC',
    description:
      'Browse our full wooden box catalog by use, structure, or material. Custom OEM/ODM welcome.',
    alternates: alternates(locale, '/products'),
    openGraph: {
      url: `/${locale}/products`,
      title: 'Wooden Boxes — CHIC',
      description:
        'Browse our full wooden box catalog by use, structure, or material. Custom OEM/ODM welcome.',
    },
  };
}

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

@media (max-width: 960px) {
  .prods-hero { padding: 70px 28px 60px; }
  .prods-body { padding: 60px 28px 80px; }
  .prods-grid { grid-template-columns: 1fr; }
}
`;

export default function ProductsPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <div className="prods">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="prods-hero">
        <div className="prods-hero-inner">
          <div className="prods-eyebrow">Our Catalog</div>
          <h1 className="prods-h1">
            Wooden <em>Boxes</em>
          </h1>
          <p className="prods-sub">
            Browse our full wooden box catalog by use, structure, or material.
            Every category is fully customizable — wood, size, finish, hardware, branding.
            MOQ as low as 100 pcs. Custom OEM/ODM welcome.
          </p>
        </div>
      </section>

      <section className="prods-body">
        <div className="prods-inner">
          {GROUPS.map((g) => (
            <div className="prods-group" key={g.title}>
              <div className="prods-group-head">
                <div>
                  <div className="prods-group-label">{g.title}</div>
                  <h2 className="prods-group-title">
                    {g.title === 'By Use' && 'What will you store?'}
                    {g.title === 'By Structure' && 'How should it open?'}
                    {g.title === 'By Material' && 'Which wood suits you?'}
                  </h2>
                </div>
                <div className="prods-group-count">{g.items.length} categories</div>
              </div>

              <div className="prods-grid">
                {g.items.map((slug) => {
                  const c = CATEGORIES[slug];
                  if (!c) return null;
                  return (
                    <Link href={`/products/${slug}`} key={slug} className="prods-card">
                      <div className="prods-card-eyebrow">{c.group}</div>
                      <h3 className="prods-card-title">{c.name}</h3>
                      <div className="prods-card-tagline">{c.tagline}</div>
                      <p className="prods-card-desc">{c.intro}</p>
                      <div className="prods-card-arrow">Explore →</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}