import Image from 'next/image';
import { buildRichDescription } from '@/lib/product-content';

// PDP rich-description section. Renders 2–3 paragraphs of product-specific
// prose with one of the product's images embedded between paragraphs, so the
// image lives inside the body copy (not only the top gallery). The text is
// generated from the product's own data, so every PDP renders genuinely
// different sentences — different materials, MOQs, use cases, etc.

const CSS = `
.pdp-rich { background: #F6EEDF; padding: 64px 24px; }
.pdp-rich-inner { max-width: 880px; margin: 0 auto; }
.pdp-rich-eyebrow { font-size: .72rem; letter-spacing: 3px; text-transform: uppercase; color: #C58E4A; font-weight: 600; }
.pdp-rich-title { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.5rem, 2.6vw, 2rem); color: #3D2A1F; margin: 8px 0 28px; line-height: 1.2; }
.pdp-rich-para { color: #4A3826; line-height: 1.78; font-size: 1rem; margin: 0 0 22px; }
.pdp-rich-figure { position: relative; aspect-ratio: 4 / 3; margin: 28px 0; border-radius: 6px; overflow: hidden; background: #ECDFC6; border: 1px solid rgba(107,74,51,0.16); }
@media (max-width: 600px) { .pdp-rich { padding: 48px 18px; } .pdp-rich-figure { aspect-ratio: 4 / 3; } }
`;

export default function ProductRichBlock({ product }) {
  const blocks = buildRichDescription(product);
  if (!blocks.length) return null;

  return (
    <section className="pdp-rich" aria-labelledby="pdp-rich-title">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pdp-rich-inner">
        <div className="pdp-rich-eyebrow">Detailed overview</div>
        <h2 className="pdp-rich-title" id="pdp-rich-title">About the {product.name}</h2>
        {blocks.map((b, i) =>
          b.type === 'paragraph' ? (
            <p key={i} className="pdp-rich-para">{b.text}</p>
          ) : (
            <figure key={i} className="pdp-rich-figure" style={{ margin: '28px 0' }}>
              <Image
                src={b.src}
                alt={b.alt}
                fill
                sizes="(max-width: 900px) 100vw, 800px"
                style={{ objectFit: 'cover' }}
              />
            </figure>
          ),
        )}
      </div>
    </section>
  );
}
