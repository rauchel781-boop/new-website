// ─────────────────────────────────────────────────────────────────────────
// NON-BOX PRODUCTS — topical-focus registry.
//
// WHY THIS EXISTS
// custom-woodenbox.com is positioned as a specialist *wooden box* site. It
// runs alongside our older, broader site (xmchichomeware.com), which covers
// wooden/bamboo homeware generally — kitchenware, storage, organizers, etc.
// Those two sites were competing for the same queries, which split our
// ranking signals and left this site indexed but out-ranked.
//
// The agreed split: this site covers boxes only. Everything that is not a
// box (trays, caddies, holders, racks, planters, stands, carts) belongs to
// the other site's topic space.
//
// WHAT THIS DOES
// Products listed here stay fully live and reachable — customers with a
// direct link, an old bookmark, or a product-name search still land on a
// working page. They are simply removed from what we ask Google to index:
//   1. `robots: { index: false, follow: true }` on the PDP metadata
//      (see app/[locale]/products/[slug]/[product]/page.js)
//   2. excluded from the XML sitemap (see app/sitemap.js)
// `follow: true` is deliberate — Googlebot still crawls the links on those
// pages, so internal link equity keeps flowing to the box pages they link to.
//
// This is fully reversible: delete a slug from this list and the page is
// back in the index after the next crawl. Nothing is deleted, nothing 404s.
//
// SCOPE: 39 of 186 products (~21%).
// ─────────────────────────────────────────────────────────────────────────

export const NON_BOX_PRODUCT_SLUGS = new Set([
  // ── acacia ──
  'acacia-square-tissue-holder',
  'acacia-utensil-holder',
  'acacia-cheese-knife-set-caddy',
  'acacia-restaurant-condiment-caddy',
  'acacia-handled-cutlery-caddy',

  // ── bamboo ──
  'bamboo-cutlery-caddy-handled',
  'bamboo-stackable-3-comp-tabletop',
  'bamboo-portable-cutlery-caddy',
  'bamboo-2-tier-tea-display',

  // ── drawer ──
  'bamboo-tea-cup-drawer-tray',
  'walnut-tea-caddy-with-drawer',
  'walnut-cologne-display-stand',

  // ── garden-seed (planters / plant stands — the two true seed BOXES in
  //    this category are deliberately NOT listed and stay indexed) ──
  'wooden-herb-planter-box-with-sliding-lid',
  'wooden-wheelbarrow-flower-planter',
  'rustic-tricycle-bicycle-planter',
  'set-of-3-round-wood-plant-stand-risers',

  // ── kitchen-dining ──
  'rustic-wood-egg-holder-tray',
  'sapele-wooden-napkin-holder',
  'wood-kitchen-utensil-holder-with-spice-drawer',

  // ── magnetic ──
  'walnut-magnetic-office-watch-tray',

  // ── paulownia ──
  'paulownia-cutlery-caddy-engraved',
  'paulownia-party-plate-caddy',
  'paulownia-cutlery-caddy-handled',

  // ── pine ──
  'pine-nesting-tray-set',
  'pine-kitchen-utensil-spice-caddy',

  // ── storage ──
  '3-tier-bamboo-spice-rack-organizer',
  'wooden-dress-up-storage-cart',
  'wooden-sofa-armrest-tray',

  // ── tea-coffee ──
  'coffee-machine-stand-drawer',
  'rustic-coffee-bar-caddy-set',
  'bamboo-4-compartment-snack-caddy',
  'bamboo-2-tier-coffee-pod-caddy',
  'bamboo-2-compartment-mini-caddy',
  'black-wood-packet-holder-caddy',
  'black-coffee-bar-station-caddy',
  'black-coffee-bar-3-compartment',
  'acacia-3-compartment-open-tray',

  // ── walnut ──
  'walnut-storage-tray-with-handles',

  // ── watch-jewelry ──
  'bamboo-jewelry-tray-set',
]);

// True when a product slug is excluded from indexing (see notes above).
export function isNonBoxProduct(slug) {
  return NON_BOX_PRODUCT_SLUGS.has(slug);
}
