// Search descriptions are separate from the longer on-page product introductions.
// Key by locale and full product route so similar items can have distinct copy.
// Missing locales deliberately use the caller's localized introduction.
export const PRODUCT_SEO_DESCRIPTIONS = {
  en: {
    'gift-packaging/luxury-magnetic-gift-box': 'Custom magnetic gift boxes with MDF or paulownia cores, wrapped finishes and fitted inserts for retail brands. Request a quote for your branded packaging.',
    'gift-packaging/hinged-wooden-gift-box': 'Source hinged wooden gift boxes in pine or paulownia with brass-finish hardware, custom inserts and engraved logos. Request a quote for wholesale orders.',
    'gift-packaging/sliding-lid-gift-box': 'Custom sliding lid wooden gift boxes in pine, bamboo or paulownia, with routed grooves and logo engraving. Request a quote for your wholesale packaging.',
    'gift-packaging/drawer-wooden-gift-box': 'Custom drawer wooden gift boxes with veneered MDF or solid wood, velvet lining and branded finishes for jewelry or gift sets. Request a wholesale quote.',
    'gift-packaging/liftoff-lid-gift-box': 'Custom lift-off lid gift boxes in pine, paulownia or veneered MDF, with fitted inserts and printed or engraved logos. Request a quote for branded packaging.',
    'wine-whisky/bamboo-wine-gift-set': 'Custom bamboo wine gift boxes with a hinged lid, brass clasp and fitted sommelier tools for wineries and corporate gifts. Request a wholesale order quote.',
    'wine-whisky/paulownia-wine-chest': 'Source paulownia wine storage chests with rope handles, rustic finishes and optional bottle inserts for branded gift sets. Request a wholesale box quote.',
    'wine-whisky/pine-3-bottle-glass-lid': 'Custom pine wine boxes with sliding acrylic window lids, bottle dividers and logo branding for retail displays and tasting sets. Request a wholesale quote.',
    'wine-whisky/pine-single-bottle-wine-box': 'Source single-bottle pine wine boxes with sliding lids, engraved logos and optional foam cradles for wineries and retailers. Request a wholesale box quote.',
    'wine-whisky/pine-whisky-crate-rope-handle': 'Custom pine whisky crates with lift-off lids, rope handles and printed logos for distillery launches and multi-bottle gift sets. Request a wholesale quote.',
    'watch-jewelry/luxury-velvet-ring-box': 'Custom velvet-lined ring boxes in walnut, oak or wrapped MDF, with magnetic closure and hot-foil logos for jewelry brands. Request a wholesale order quote.',
    'watch-jewelry/three-watch-display-case': 'Custom three-watch display cases with glass tops, velvet pillows and walnut or oak options for retail counters and gifting. Request a wholesale box quote.',
    'watch-jewelry/multi-tier-earring-chest': 'Custom wooden earring chests with divided drawers, brass pulls and walnut, oak or pine options for jewelry retail storage. Request a wholesale order quote.',
    'watch-jewelry/pearl-necklace-presentation-box': 'Custom necklace presentation boxes with lift-off lids, padded velvet inserts and hot-foil branding for fine jewelry collections. Request a wholesale quote.',
    'magnetic/beech-magnetic-dice-tube-box': 'Custom beech magnetic dice boxes that open into felt-lined rolling trays, with engraved logos for game shops and convention gifts. Request a bulk quote.',
    'magnetic/walnut-magnetic-puzzle-mini-box': 'Custom walnut puzzle boxes with magnetic flaps, hidden chambers and engraved lids for ring gifts and branded keepsakes. Request a wholesale order quote.',
    'magnetic/bamboo-magnetic-hex-dice-box': 'Custom bamboo hexagonal dice boxes with magnetic lids, seven recessed slots and engraved logos for tabletop game retailers. Request a wholesale box quote.',
    'magnetic/sapele-magnetic-dice-display-box': 'Custom sapele dice display boxes with magnetic lids, fitted slots and engraved player names or logos for game shops and gifting. Request a wholesale quote.',
    'magnetic/walnut-pine-magnetic-pocket-box': 'Custom pocket boxes with walnut lids, pine bases and hidden magnets for rings, coins or earbuds. Add engraved branding and request a wholesale order quote.',
    'magnetic/walnut-magnetic-engagement-ring-box': 'Custom walnut engagement ring boxes with magnetic closures, engraved names and hessian or velvet cradles for bridal brands. Request a wholesale box quote.',
  },
};

export function getProductSeoDescription(category, product, locale) {
  return PRODUCT_SEO_DESCRIPTIONS[locale]?.[`${category}/${product}`];
}
