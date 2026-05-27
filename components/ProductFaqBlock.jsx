import JsonLd from '@/components/JsonLd';
import { buildProductFaqs } from '@/lib/product-content';

// Per-product FAQ section for the PDP. Generates 5–6 Q&A pairs from the
// product's own data (MOQ, lead time, material, branding options, use cases,
// packaging) — answers are filled from this product's fields, so the FAQs
// vary genuinely across the 186 products in the catalogue.
//
// Emits FAQPage JSON-LD with the same Q&As so the page is eligible for
// Google's FAQ rich result.

const CSS = `
.pdp-faq { background: #fff; padding: 60px 24px 76px; border-top: 1px solid rgba(107,74,51,0.10); }
.pdp-faq-inner { max-width: 900px; margin: 0 auto; }
.pdp-faq-eyebrow { font-size: .72rem; letter-spacing: 3px; text-transform: uppercase; color: #C58E4A; font-weight: 600; }
.pdp-faq-title { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.5rem, 2.6vw, 2rem); color: #3D2A1F; margin: 8px 0 26px; line-height: 1.2; }
.pdp-faq-list { display: flex; flex-direction: column; gap: 12px; }
.pdp-faq-item { background: #F6EEDF; border: 1px solid rgba(107,74,51,0.14); border-radius: 4px; overflow: hidden; transition: border-color .2s, box-shadow .2s; }
.pdp-faq-item[open] { border-color: #C58E4A; box-shadow: 0 4px 20px rgba(107,74,51,0.06); }
.pdp-faq-q { cursor: pointer; padding: 18px 22px; display: flex; align-items: flex-start; gap: 14px; font-weight: 600; color: #3D2A1F; font-size: .98rem; line-height: 1.45; list-style: none; }
.pdp-faq-q::-webkit-details-marker { display: none; }
.pdp-faq-q > span:first-child { flex: 1; }
.pdp-faq-plus { color: #C58E4A; font-size: 1.4rem; line-height: 1; transition: transform .2s ease; flex-shrink: 0; margin-top: -2px; }
.pdp-faq-item[open] .pdp-faq-plus { transform: rotate(45deg); }
.pdp-faq-a { padding: 0 22px 20px; margin: 0; color: #5C4A3A; line-height: 1.72; font-size: .94rem; }
`;

export default function ProductFaqBlock({ product }) {
  const faqs = buildProductFaqs(product);
  if (!faqs.length) return null;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <section className="pdp-faq" aria-labelledby="pdp-faq-title">
      <JsonLd data={faqLd} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pdp-faq-inner">
        <div className="pdp-faq-eyebrow">Buyer questions</div>
        <h2 className="pdp-faq-title" id="pdp-faq-title">{product.name} — buyer questions</h2>
        <div className="pdp-faq-list">
          {faqs.map((it, i) => (
            <details key={i} className="pdp-faq-item" {...(i === 0 ? { open: true } : {})}>
              <summary className="pdp-faq-q">
                <span>{it.q}</span>
                <span className="pdp-faq-plus" aria-hidden="true">+</span>
              </summary>
              <p className="pdp-faq-a">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
