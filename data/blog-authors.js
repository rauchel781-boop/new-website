// ─────────────────────────────────────────────────────────────────────────
// BLOG AUTHORS — named bylines for article E-E-A-T.
//
// Every fact here must be independently true and consistent with the About
// page (data/about/*.js) and the homepage Organization schema
// (app/[locale]/page.js), because generative engines cross-check the same
// entity across pages and an inconsistency reads as a credibility problem.
//
// Chuan Pu's biography below restates exactly what the About page already
// says: founded the company in 2021, 20+ years in China's wood trade,
// timber yards in Cao County, CNC production in Heze, export operations
// out of Xiamen. No new claims are introduced here.
//
// `bio` is the English source. Locale overlays live alongside the article
// translations so the byline reads naturally in each language.
// ─────────────────────────────────────────────────────────────────────────

export const AUTHORS = {
  'chuan-pu': {
    id: 'chuan-pu',
    name: 'Chuan Pu',
    jobTitle: 'Founder',
    bio:
      'Founder of Xiamen Chic Homeware. More than two decades in China’s wood trade — walking timber yards in Cao County, running CNC programs in Heze, and managing export orders out of Xiamen — before starting CHIC in 2021 to build boxes for brands directly, without a trading company in the middle.',
    knowsAbout: [
      'Custom wooden box manufacturing',
      'Wood species selection and sourcing',
      'CNC woodworking and joinery',
      'Export operations and documentation',
    ],
  },
};

export const DEFAULT_AUTHOR_ID = 'chuan-pu';

export function getAuthor(id) {
  return AUTHORS[id || DEFAULT_AUTHOR_ID] || AUTHORS[DEFAULT_AUTHOR_ID];
}
