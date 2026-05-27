// Per-product page enrichment.
//
// Builds (a) a rich multi-paragraph "About this box" description and (b) a
// per-product FAQ set, both derived ENTIRELY from the product's own data
// fields (specs, customization, useCases, packaging). Because the source
// fields differ between products, the generated content is genuinely
// different across the catalogue — different MOQ, different material,
// different closure, different use cases → different sentences. Zero
// keyword stuffing; the long-tail coverage comes from the real spec
// variation per product.
//
// Both outputs are English-only. Generated content should only render on
// the /en locale until product translations are run for other locales, to
// avoid mixed-language pages (mixed-language hurts hreflang/SEO signals).

function lower(s) {
  return typeof s === 'string' ? s.toLowerCase() : s;
}

// ─── FAQ generator ──────────────────────────────────────────────────────
// Returns up to 6 {q, a} pairs whose VALUES depend on this product's data.

export function buildProductFaqs(product) {
  if (!product || !product.name) return [];
  const { name, specs = {}, customization = [], useCases = [], packaging } = product;

  const moq = specs.MOQ || '300 pieces';
  const lead = specs['Lead Time'] || '30–40 days';
  const material = specs.Material || 'solid wood';
  const finish = specs['Surface Finish'] || 'natural oil or matte lacquer';
  const hardware = specs.Hardware || 'standard hardware';
  const lining = specs['Interior Lining'] || 'optional foam or velvet lining';
  const branding = specs.Branding || 'logo print, hot foil, laser engraving and deboss';

  const faqs = [
    {
      q: `What is the minimum order quantity (MOQ) for the ${name}?`,
      a: `The standard MOQ for the ${name} is ${moq}. Lower quantities may be possible for simpler designs; larger or more complex customisations can require a higher minimum. Share your design and target volume and we will confirm the exact MOQ for your project.`,
    },
    {
      q: `How long is the production lead time for the ${name}?`,
      a: `Production of the ${name} typically takes about ${lead} after you approve the pre-production sample, depending on quantity, finish and decoration. Sample-making adds time up front; for tight launches, tell us your deadline and we will confirm feasibility before the order is placed.`,
    },
    {
      q: `What is the ${name} made from?`,
      a: `The ${name} is constructed from ${material}, finished in ${finish} and fitted with ${hardware}. The interior uses ${lining} so the product inside is protected and presented to spec.`,
    },
    {
      q: `Can the ${name} be branded with our logo and artwork?`,
      a: `Yes — branding options for the ${name} include ${branding}.${
        customization.length
          ? ` Additional customisation covers: ${customization.slice(0, 4).join('; ')}.`
          : ''
      } Send vector artwork (AI, EPS, PDF or SVG) for the cleanest result; we will confirm placement and method on the pre-production sample.`,
    },
  ];

  if (useCases && useCases.length) {
    faqs.push({
      q: `What is the ${name} typically used for?`,
      a: `The ${name} is well suited to: ${useCases.join(
        ', ',
      )}. If your application is outside this list, we can usually adapt the spec — describe your product and use case and we will advise.`,
    });
  }

  if (packaging) {
    faqs.push({
      q: `How is the ${name} packaged for export shipping?`,
      a: packaging,
    });
  }

  return faqs;
}

// ─── Rich description generator ─────────────────────────────────────────
// Returns an array of content blocks: { type: 'paragraph', text } or
// { type: 'image', src, alt }. The PDP component renders them in order so
// the second product image sits between the first and second paragraphs —
// satisfying the requirement that an image appear within the body copy.

export function buildRichDescription(product) {
  if (!product || !product.name) return [];
  const {
    name,
    intro,
    closure,
    specs = {},
    customization = [],
    useCases = [],
    images = [],
  } = product;

  const closureWord = lower(closure || 'custom');
  const primaryUses =
    useCases.length > 0
      ? useCases.slice(0, 3).join(', ').toLowerCase()
      : 'B2B gift and packaging applications';
  const material = specs.Material;
  const finish = specs['Surface Finish'];
  const hardware = specs.Hardware;
  const lining = specs['Interior Lining'];
  const branding = specs.Branding;
  const moq = specs.MOQ;
  const lead = specs['Lead Time'];

  const blocks = [];

  // Paragraph 1 — opens with positioning + product's own intro
  let p1 = `The ${name} is a ${closureWord}-closure custom wooden box engineered for ${primaryUses}.`;
  if (intro) p1 += ' ' + intro;
  blocks.push({ type: 'paragraph', text: p1 });

  // Inline image (second product image preferred, fall back to first)
  if (images.length > 1) {
    blocks.push({ type: 'image', src: images[1], alt: `${name} — alternate view` });
  } else if (images.length === 1) {
    blocks.push({ type: 'image', src: images[0], alt: `${name}` });
  }

  // Paragraph 2 — construction & operational specs
  const c = [];
  if (material) c.push(`Built from ${material}`);
  if (finish) c.push(`finished in ${finish}`);
  if (hardware) c.push(`paired with ${hardware}`);
  if (lining) c.push(`and an interior of ${lining}`);
  let p2 = c.length ? c.join(', ') + '.' : '';
  if (moq || lead) {
    p2 +=
      (p2 ? ' ' : '') +
      `Each production run starts at our standard minimum of ${moq || '300 units'} with a typical lead time of ${lead || '30–40 days'} after pre-production sample approval.`;
  }
  if (p2) blocks.push({ type: 'paragraph', text: p2 });

  // Paragraph 3 — customisation, branding, fit-for-use
  if (customization.length || branding || useCases.length) {
    const parts = [];
    if (customization.length) {
      parts.push(
        `Customisation covers ${customization
          .slice(0, 3)
          .join(', ')
          .toLowerCase()}`,
      );
    }
    if (branding) parts.push(`branding via ${branding}`);
    let p3 = parts.length ? parts.join('; ') + '.' : '';
    if (useCases.length) {
      const useExamples = useCases.slice(0, 2).join(' and ').toLowerCase();
      p3 +=
        (p3 ? ' ' : '') +
        `Whether you need the ${name.toLowerCase()} for ${useExamples}, send us a brief and we will quote a precise spec.`;
    }
    if (p3) blocks.push({ type: 'paragraph', text: p3 });
  }

  return blocks;
}
