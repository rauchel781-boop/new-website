// Curated copy for selected product pages, keyed by locale and full route.
const COPY = {
  en: {
    'sliding-lid/walnut-sliding-box': {
      updatedAt: '2026-10-19',
      title: 'Custom Walnut Sliding-Lid Boxes - Logo Engraved | CHIC',
      intro: 'A solid American black walnut presentation box with a routed sliding lid, oil-and-wax finish and optional felt or velvet lining. Custom dimensions and an engraved lid logo are available from 200 pieces per design.',
      description: 'Use this model as a starting point for a branded pen set, cufflink presentation or another small gift. The listed reference size is 180 × 100 × 50 mm; confirm the usable interior against your item before approving a custom design. The wooden lid runs in routed grooves without separate slide hardware. Specify the lining, logo position and required packing with your quantity so the quote covers the complete presentation.',
      overview: [
        { type: 'paragraph', text: 'Choose this construction when you want the recipient to slide the lid away from a compact wooden case. Allow room for the lid to travel beyond the box when comparing it with a hinged or lift-off design. The reference model uses solid American black walnut, with an oil-and-wax surface finish and a choice of an open or lined interior. Grain and colour vary naturally, so review the material and finish on the pre-production sample.' },
        { type: 'image', src: '/sliding-lid-wooden-box/walnut-sliding-box/walnut-sliding-box-02.webp', alt: 'Walnut sliding-lid presentation box, alternate product view' },
        { type: 'paragraph', text: 'For a quotation, provide the dimensions of the item to be packed, preferred outside box size, lining choice, logo artwork and quantity. Laser engraving is available on the lid; confirm the artwork size and position against the wooden surface. Tissue wrapping, a retail-ready inner box and an export master carton are listed for this model. Ask us to confirm any change to that packing arrangement. MOQ is 200 pieces per design for OEM and ODM orders, and the listed production lead time is 30 days after pre-production sample approval.' },
        { type: 'paragraph', text: 'Check the sample for interior fit, lid travel, edges, finish and engraving before approving production. For care, wipe the surface with a soft dry or lightly dampened cloth and dry it promptly. Avoid soaking, dishwasher cleaning, prolonged dampness and direct heat. The box is intended for presentation and storage; specify any special protection needed for the contents or shipping as part of your packing brief.' },
      ],
    },
  },
};

export function getProductPageCopy(category, product, locale) {
  return COPY[locale]?.[`${category}/${product}`];
}
