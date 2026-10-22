// Shared block order; every visible string is supplied by the locale file.
export function buildClosureGuide(copy) {
  const formatKinds = ['sliding', 'hinged', 'magnetic', 'drawer', 'lock'];
  const imagePaths = [
    '/gift-packaging-box/sliding-lid-gift-box/sliding-lid-gift-box-01.webp',
    '/gift-packaging-box/hinged-wooden-gift-box/hinged-wooden-gift-box-01.webp',
    '/gift-packaging-box/luxury-magnetic-gift-box/luxury-magnetic-gift-box-01.webp',
  ];
  return {
    title: copy.title,
    seoTitle: copy.seoTitle,
    excerpt: copy.excerpt,
    readTime: copy.readTime,
    body: [
      {type: 'p', text: copy.opening},
      {type: 'p', text: copy.intro},
      {type: 'h2', text: copy.overviewTitle},
      {type: 'p', text: copy.overviewText},
      {type: 'compare', caption: copy.compareCaption, items: copy.compare.map((item, i) => ({kind: formatKinds[i], ...item}))},
      {type: 'h2', text: copy.formatsTitle},
      ...copy.formats.flatMap((format, i) => [
        {type: 'h3', text: format.heading},
        {type: 'p', text: format.text},
        ...(i < imagePaths.length ? [{type: 'img', src: imagePaths[i], caption: copy.imageCaptions[i]}] : []),
      ]),
      {type: 'h2', text: copy.selectionTitle},
      {type: 'p', text: copy.selectionText},
      {type: 'list', items: copy.selectionList},
      {type: 'h2', text: copy.geometryTitle},
      {type: 'p', text: copy.geometryText},
      {type: 'p', text: copy.geometryLinks},
      {type: 'h2', text: copy.planningTitle},
      {type: 'p', text: copy.planningText},
      {type: 'flow', caption: copy.flowCaption, steps: copy.flowSteps},
      {type: 'h2', text: copy.briefTitle},
      {type: 'p', text: copy.briefText},
      {type: 'list', items: copy.briefList},
      {type: 'p', text: copy.closing},
    ],
    faqs: copy.faqs,
  };
}
