import JsonLd from '@/components/JsonLd';

// Self-contained FAQ block for info pages (material-guide, wood-fabrication,
// products index). Server component — renders a native <details> accordion
// (no client JS) PLUS a FAQPage JSON-LD mirroring the same Q&As, so the page
// is eligible for Google's FAQ rich result.
//
// Props: faqs = { sectionTitle, sectionSub, items: [{ q, a }] } | null
// Renders nothing when faqs is null/empty (e.g. a locale not yet translated).

const CSS = `
.pgfaq { background: #F6EEDF; padding: 72px 24px; }
.pgfaq-inner { max-width: 900px; margin: 0 auto; }
.pgfaq-label { font-size: .72rem; letter-spacing: 3px; text-transform: uppercase; color: #C58E4A; font-weight: 600; margin-bottom: 10px; }
.pgfaq-title { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.6rem, 3vw, 2.2rem); color: #3D2A1F; margin: 0 0 8px; line-height: 1.2; }
.pgfaq-sub { font-family: var(--font-fraunces), Georgia, serif; font-style: italic; color: #6B4A33; max-width: 720px; margin: 8px 0 32px; line-height: 1.65; font-size: 1.02rem; }
.pgfaq-list { display: flex; flex-direction: column; gap: 14px; }
.pgfaq-item { background: #fff; border: 1px solid rgba(107,74,51,0.16); border-radius: 4px; overflow: hidden; transition: border-color .2s, box-shadow .2s; }
.pgfaq-item[open] { border-color: #C58E4A; box-shadow: 0 4px 24px rgba(107,74,51,0.06); }
.pgfaq-q { cursor: pointer; padding: 20px 24px; display: flex; align-items: flex-start; gap: 16px; font-weight: 600; color: #3D2A1F; font-size: 1rem; line-height: 1.45; list-style: none; }
.pgfaq-q::-webkit-details-marker { display: none; }
.pgfaq-q > span:first-child { flex: 1; }
.pgfaq-plus { color: #C58E4A; font-size: 1.5rem; line-height: 1; transition: transform .2s ease; flex-shrink: 0; margin-top: -2px; }
.pgfaq-item[open] .pgfaq-plus { transform: rotate(45deg); }
.pgfaq-a { padding: 0 24px 22px; margin: 0; color: #5C4A3A; line-height: 1.75; font-size: .94rem; }
`;

export default function PageFaq({ faqs }) {
  if (!faqs || !faqs.items || faqs.items.length === 0) return null;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <section className="pgfaq" id="faq" aria-labelledby="pgfaq-title">
      <JsonLd data={faqLd} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pgfaq-inner">
        <div className="pgfaq-label">FAQ</div>
        <h2 className="pgfaq-title" id="pgfaq-title">{faqs.sectionTitle}</h2>
        {faqs.sectionSub && <p className="pgfaq-sub">{faqs.sectionSub}</p>}
        <div className="pgfaq-list">
          {faqs.items.map((it, i) => (
            <details key={i} className="pgfaq-item" {...(i === 0 ? { open: true } : {})}>
              <summary className="pgfaq-q">
                <span>{it.q}</span>
                <span className="pgfaq-plus" aria-hidden="true">+</span>
              </summary>
              <p className="pgfaq-a">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
