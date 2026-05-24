// Info-page FAQ content (English source).
//
// Mirrors the shape of data/category-faqs: each key maps to
// { sectionTitle, sectionSub, items: [{ q, a }, …] }.
// Rendered as a visible <details> accordion AND a FAQPage JSON-LD by
// components/PageFaq.jsx.
//
// Keys correspond to the page they appear on:
//   'material-guide'   → /material-guide
//   'wood-fabrication' → /wood-fabrication
//   'products'         → /products  (catalogue index)
//
// Each question is unique across pages and across the per-category FAQs so
// there is no duplicate-content overlap. Factual claims are grounded in
// data/site-config.js (15,000 m² Cao County factory, Xiamen sales office,
// OEM/ODM, FSC/CARB/REACH/ISO 9001) and the product catalogue. The ordering
// figures (MOQ 300, 30-40 day lead time, sampling terms, served markets,
// FOB/EXW) were confirmed by the client and filled in.

export const FAQS = {
  // ──────────────────────────────────────────────────────────────────────
  'material-guide': {
    sectionTitle: 'Wood Material FAQs',
    sectionSub:
      'Choosing the right species is the first decision in any custom box project. Here is how our five core woods compare on grain, weight, durability and cost.',
    items: [
      {
        q: 'Which wood is best for a custom wooden box — paulownia, pine, bamboo, acacia or walnut?',
        a: 'There is no single “best” — it depends on your priority. Paulownia is the lightest and most economical, ideal for high-volume gift and packaging boxes. Pine is an affordable, easy-to-finish all-rounder. Bamboo is hard, eco-friendly and great for a modern look. Acacia offers rich grain at a mid price. Walnut is the premium choice for luxury, heirloom-grade boxes. Tell us your budget, look and use case and we will recommend the right fit.',
      },
      {
        q: 'What is the difference between paulownia and pine for packaging boxes?',
        a: 'Paulownia is extremely lightweight, dimensionally stable and resists warping, which lowers your shipping weight and cost on large orders — a reason it is popular for wine, tea and gift boxes. Pine is slightly heavier and denser, takes stain and paint beautifully, and has a warmer knotty character. For bulk packaging where weight and cost matter most, paulownia usually wins; for a traditional solid-wood feel, pine is a strong choice.',
      },
      {
        q: 'Is bamboo a good material for gift and storage boxes?',
        a: 'Yes. Technically a grass, bamboo is harder and more scratch-resistant than many softwoods, grows quickly (making it a sustainable option), and has a clean, contemporary grain that suits kitchen, tea and modern gift boxes. It does best with a sealed finish in humid environments, which we apply as standard.',
      },
      {
        q: 'Which wood is the most durable and moisture-resistant for boxes?',
        a: 'For everyday durability, acacia and walnut are the hardest and most impact-resistant of our core woods, while bamboo resists surface scratching well. No untreated wood is fully waterproof, so for humid or outdoor-adjacent use we recommend a sealed oil or lacquer finish and, where needed, a moisture-resistant interior lining. Let us know the end environment and we will spec accordingly.',
      },
      {
        q: 'Are your boxes made from solid wood, or MDF and plywood with veneer?',
        a: 'We offer both, and the right structure depends on your design and budget. Solid wood (paulownia, pine, acacia, walnut) gives an authentic feel and visible end-grain; engineered panels such as MDF or plywood with a real-wood veneer give larger flat surfaces, tighter cost control and excellent finish consistency. Many production boxes combine the two. We will tell you exactly what each quote is built from.',
      },
      {
        q: 'Can you match a specific wood tone or finish — stain, oil or lacquer?',
        a: 'Yes. We can stain lighter woods to mimic darker species, and finish in natural oil, matte or gloss lacquer, or painted colour. If you send a physical sample or a Pantone/RAL reference we will colour-match it on the chosen wood and confirm with a pre-production sample before the run.',
      },
      {
        q: 'Which wood is the most cost-effective for large orders?',
        a: 'Paulownia is typically the most cost-effective solid wood for high volumes thanks to its low material weight and fast workability, with pine close behind. Engineered panels with veneer can lower cost further on larger flat-panel designs. Per-unit price always depends on size, finish and quantity — share your specs for an exact figure.',
      },
      {
        q: 'Is your wood sustainably sourced and certified?',
        a: 'We work with responsibly sourced material and can supply wood meeting recognised standards including FSC (responsible forestry), CARB (formaldehyde emissions) and EU REACH, plus our ISO 9001 quality system. If your market requires specific certification documents, confirm the requirement with our team so we source and document accordingly.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  'wood-fabrication': {
    sectionTitle: 'Wood Fabrication FAQs',
    sectionSub:
      'From a sketch or sample to a finished, branded box — here is how our 15,000 m² factory cuts, joins, finishes and decorates custom wooden packaging.',
    items: [
      {
        q: 'What processes do you use to fabricate custom wooden boxes?',
        a: 'Production runs in-house at our 15,000 m² Cao County factory: precision cutting and CNC machining, joinery and assembly, sanding, surface finishing (oil, lacquer, paint), decoration such as laser engraving or printing, hardware fitting, QC and packing. Keeping every step under one roof lets us control quality and lead time end to end.',
      },
      {
        q: 'Can you laser-engrave or print our logo on the boxes?',
        a: 'Yes. We offer laser engraving for a tactile burned-in mark, plus silk-screen printing, pad printing, hot-stamping (including gold/silver foil) and UV printing depending on the look you want. Send vector artwork (AI, EPS, PDF or SVG) and we will advise the best decoration method for your wood and finish.',
      },
      {
        q: 'What box closures and mechanisms can you make?',
        a: 'We fabricate hinged lids, sliding (slide-top) lids, lift-off lids, drawer styles, magnetic closures and lockable boxes with hardware. The closure affects feel, cost and assembly, so we can recommend the best option for your product weight and unboxing experience.',
      },
      {
        q: 'Do you offer OEM and ODM — and what is the difference for us?',
        a: 'Both. With OEM you bring the design and specs and we manufacture exactly to them. With ODM we design the box for you from a brief — proposing dimensions, materials, closure and finish — which is ideal if you want a custom box but do not have engineering drawings. Many clients start with ODM and refine toward a locked OEM spec.',
      },
      {
        q: 'What surface finishes are available?',
        a: 'Natural oil for a raw, matte feel; matte or gloss lacquer for protection and sheen; wood stain to shift tone; and solid painted colour. We can also distress or antique a finish for a vintage look. Every finish is confirmed on a pre-production sample so what you approve is what ships.',
      },
      {
        q: 'Can you add custom interior lining or inserts?',
        a: 'Yes. We produce fitted interiors in EVA foam, velvet/flocking, satin, cardboard or shaped wood inserts to cradle a specific product — bottles, watches, jewellery, tea tins and more. Send the item dimensions (or a sample) and we will design an insert that holds it securely.',
      },
      {
        q: 'What artwork files and tolerances do you need for a custom job?',
        a: 'For decoration, vector files (AI, EPS, PDF, SVG) reproduce best; high-resolution raster is workable for some print methods. For structure, a dimensioned drawing or a physical sample is ideal. If you only have a rough idea, our team can turn a description and reference photos into a production-ready die-line.',
      },
      {
        q: 'How do you control quality during fabrication?',
        a: 'Quality is checked at incoming material, in-process and pre-shipment stages against your approved sample, covering dimensions, finish, hardware function and packing. We operate to an ISO 9001 quality system. For larger orders we can share inspection photos before shipment and accommodate third-party inspections.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  products: {
    sectionTitle: 'Ordering & Custom Box FAQs',
    sectionSub:
      'Everything you need to know before requesting a quote — what we make, how ordering works, and how to go from idea to delivered boxes.',
    items: [
      {
        q: 'What types of custom wooden boxes do you manufacture?',
        a: 'We make custom wooden boxes organised three ways: by use (gift & packaging, watch & jewellery, tea & coffee, wine & whisky, kitchen & dining, garden & seed, storage), by structure (hinged, sliding lid, drawer, magnetic, lockable) and by material (paulownia, pine, bamboo, acacia, walnut). If you do not see your exact use case, we build fully bespoke boxes to spec.',
      },
      {
        q: 'What is your minimum order quantity (MOQ)?',
        a: 'MOQ depends on the box size, structure and customisation. Our standard MOQ is 300 pieces per design, with lower quantities sometimes possible for simpler boxes and higher minimums on larger or more complex ones. Share your design and target volume and we will confirm the exact MOQ for your project.',
      },
      {
        q: 'How long is the production lead time for a custom order?',
        a: 'A typical run takes about 30–40 days after you approve the pre-production sample, depending on quantity, finish and decoration. Sampling adds time up front. For time-sensitive launches, tell us your deadline and we will confirm whether it is achievable before you order.',
      },
      {
        q: 'Can I order a sample before placing a bulk order?',
        a: 'Yes — we strongly recommend it. A pre-production sample lets you check construction, wood, finish, colour match and fit before committing to the full run. Sample charges vary by design and complexity, and the courier cost is paid by the customer; whether the sample fee is later credited against a confirmed bulk order is reviewed case by case.',
      },
      {
        q: 'Do you ship worldwide, and what are the shipping options?',
        a: 'Yes. We are an export-focused manufacturer and ship internationally by sea and air, coordinated through our Xiamen sales office. We regularly serve developed markets including Germany, Italy, the USA, the UK, Canada and Poland, and we quote common Incoterms such as FOB and EXW to work with your forwarder. Tell us your destination port or city for a delivered estimate.',
      },
      {
        q: 'How do I get a quote for a custom wooden box?',
        a: 'Send us your box dimensions, wood and finish preference, closure type, quantity, any branding (logo/artwork) and your destination. The more detail you provide, the faster and more accurate the quote. You can reach our team via the contact page, email or WhatsApp, and we typically reply within one business day.',
      },
      {
        q: 'Can you produce a fully custom box from my own design or idea?',
        a: 'Absolutely — bespoke work is our core business. Whether you have finished engineering drawings (OEM) or just a concept and reference images (ODM), our design team will turn it into a production-ready box, propose materials and finishes, and confirm everything with a physical sample before manufacturing.',
      },
      {
        q: 'How are the finished boxes packed for shipment?',
        a: 'Boxes are protected for export — typically individual poly bags or tissue, stacked into sturdy export cartons sized to your quantity, with corner or foam protection where needed to prevent transit damage. Custom retail or gift packaging (sleeves, mailers, branded outer cartons) can be produced on request.',
      },
    ],
  },
};
