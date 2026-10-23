import { getSlidingLidCategoryCopy } from './sliding-lid/index.js';
import { getMagneticCategoryCopy } from './magnetic/index.js';
import { getBambooCategoryCopy } from './bamboo/index.js';

// Use the same reviewed copy for landing pages, catalogue cards and search.
// Other categories retain their existing overlays until their own review.
const REVIEWED = {
  'sliding-lid': getSlidingLidCategoryCopy,
  magnetic: getMagneticCategoryCopy,
  bamboo: getBambooCategoryCopy,
};

export const REVIEWED_CATEGORY_SLUGS = Object.keys(REVIEWED);

export function getReviewedCategoryCopy(slug, locale) {
  return REVIEWED[slug]?.(locale) || null;
}
