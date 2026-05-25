import { TESTIMONIALS } from '@/data/testimonials';

// Visible client-testimonial band for the homepage. Genuine customer feedback
// (see data/testimonials.js). Intentionally NO Review/AggregateRating JSON-LD —
// Google disallows self-serving review rich results for Organization /
// LocalBusiness, so we surface them as plain social-proof content only.
//
// Props (optional, for localisation of the heading; quotes stay in their
// original English):
//   eyebrow  - small label above the title
//   title    - section heading

const CSS = `
.tst { background: #2A1B12; padding: 78px 24px; }
.tst-inner { max-width: 1100px; margin: 0 auto; }
.tst-eyebrow { font-size: .72rem; letter-spacing: 3px; text-transform: uppercase; color: #C58E4A; font-weight: 600; text-align: center; }
.tst-title { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.7rem, 3.2vw, 2.4rem); color: #F6EEDF; text-align: center; margin: 10px 0 40px; line-height: 1.2; }
.tst-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.tst-card { background: rgba(246,238,223,0.05); border: 1px solid rgba(197,142,74,0.25); border-radius: 6px; padding: 26px 24px; display: flex; flex-direction: column; }
.tst-mark { font-family: Georgia, serif; font-size: 2.4rem; line-height: .6; color: #C58E4A; margin-bottom: 10px; }
.tst-quote { color: rgba(246,238,223,0.9); line-height: 1.7; font-size: .96rem; flex: 1; }
.tst-author { margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(197,142,74,0.2); font-weight: 600; color: #F6EEDF; font-size: .9rem; letter-spacing: .3px; }
.tst-year { color: rgba(217,185,143,0.6); font-weight: 400; font-size: .82rem; }
@media (max-width: 900px) { .tst-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .tst-grid { grid-template-columns: 1fr; } }
`;

export default function Testimonials({ eyebrow = 'In our clients’ words', title = 'Trusted by brands worldwide' }) {
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  return (
    <section className="tst" id="testimonials" aria-labelledby="tst-title">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="tst-inner">
        <div className="tst-eyebrow">{eyebrow}</div>
        <h2 className="tst-title" id="tst-title">{title}</h2>
        <div className="tst-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className="tst-card" key={i} style={{ margin: 0 }}>
              <div className="tst-mark" aria-hidden="true">&ldquo;</div>
              <blockquote className="tst-quote" style={{ margin: 0 }}>{t.quote}</blockquote>
              <figcaption className="tst-author">
                {t.author}{t.year ? <span className="tst-year"> · {t.year}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
