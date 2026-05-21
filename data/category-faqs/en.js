// Category landing-page FAQs — English baseline.
//
// 17 categories × 5 Q&A each = 85 entries. Each category landing page
// renders these as <details> accordions AND emits a matching FAQPage
// JSON-LD block so Google can show the questions as expandable rich
// results in SERP (which doubles our SERP real-estate footprint).
//
// SEO rationale: each Q+A surfaces a long-tail B2B buyer query that
// won't be triggered by short-form intro copy on the page. The page
// goes from ~300 words to ~1,200 words and ranks for many more
// queries without becoming hard to scan (accordions keep it clean).
//
// Structure per category:
//   sectionTitle  — H2 above the FAQ block ("FAQ — Wooden Watch Boxes")
//   sectionSub    — short paragraph above the accordion
//   items         — array of { q, a }, length 5
//
// Translations live in ./{es,fr,de,it,pt,ja,ko}.js as overlays. If a
// locale is missing a category entirely, the EN copy is used as fallback.

export const FAQS = {
  // ── By use ──────────────────────────────────────────────────────────
  'gift-packaging': {
    sectionTitle: 'FAQ — Wooden Gift Packaging Boxes',
    sectionSub:
      'Common questions from gift brands, retailers, and corporate gifting buyers sourcing custom wooden packaging.',
    items: [
      {
        q: 'Which wood types do you recommend for premium gift packaging?',
        a: 'Paulownia is our most popular choice for luxury gift sets — ultralight (cuts your air-freight cost noticeably) and easy to laser-engrave. Acacia delivers a rich, premium grain feel; walnut suits high-end positioning with its deep chocolate tones. Pine and bamboo are reliable picks for value-tier gift programs where unit cost matters more than visual luxury.',
      },
      {
        q: 'Can you deboss or laser-engrave our brand logo on the boxes?',
        a: 'Yes. We offer four logo finishes in-house: debossing (recessed impression), hot-stamping with gold / silver / bronze foil, screen printing, and CO₂ laser engraving. Send a vector logo (AI, EPS, or PDF) and our design team produces a digital mockup before tooling. Position, depth, and foil color are all configurable.',
      },
      {
        q: 'What is the MOQ for custom-printed wooden gift boxes?',
        a: 'Standard MOQ is 200 pieces for stock-size gift boxes with logo customization. Fully custom sizes that need new tooling start at 500 pieces. Pre-production sample units (1-3 pcs) ship within 7 working days for your design approval.',
      },
      {
        q: 'How are interior inserts customized for gift sets?',
        a: 'We CNC-machine die-cut foam (EVA, EPE, or PU) or wood inserts to fit specific product silhouettes — bottles, watches, jewelry, candles, cosmetics. Velvet, microfiber, or linen lining is available. Send your product CAD or a physical sample and we produce a 1:1 insert prototype for fit verification.',
      },
      {
        q: 'Do your gift boxes ship with retail-ready packaging?',
        a: 'Yes. Each gift box is wrapped in OPP poly bag (anti-scratch) and packed into export-grade master cartons with corner protectors. UPC barcodes, tear-strip stickers, hangtags, and gift cards can be added as inline operations. Phytosanitary certificates are issued on request for shipments of solid wood.',
      },
    ],
  },

  'watch-jewelry': {
    sectionTitle: 'FAQ — Wooden Watch & Jewelry Boxes',
    sectionSub:
      'Sizing, insert fitment, and finish questions from watch brands, jewelers, and luxury gift programs.',
    items: [
      {
        q: 'What materials do you use inside watch and jewelry boxes?',
        a: 'Interiors are upholstered in your choice of velvet, microfiber, or linen, mounted over a soft EVA foam pad. Watch pillows are cylindrical foam wrapped in the same material. Solid-wood outer shells are usually acacia, walnut, or beech for that hardwood density that retail buyers expect from luxury packaging.',
      },
      {
        q: 'Can you customize the inserts to fit specific watch models?',
        a: 'Yes. Send a watch sample or detailed CAD with lug-to-lug distance, case diameter, and strap circumference. Our CNC team machines wood or foam inserts to match — including pocket cutouts for crowns, deployment clasps, and case backs. We routinely produce inserts for Rolex, Omega, IWC, Panerai, and Apple Watch case sizes.',
      },
      {
        q: 'Do your watch boxes have lockable lids?',
        a: 'Optional. Most jewelry and watch boxes ship with a concealed brass hinge and friction-fit lid. For retail display or higher-value storage, we add small lock-and-key mechanisms or magnetic latches. Combination locks are available for stash-style boxes — see our "Boxes with Lock" category.',
      },
      {
        q: 'How many watches or pieces of jewelry fit per box size?',
        a: 'Standard watch boxes hold 3, 6, 10, or 12 watches; our most popular SKU is the 6-watch model. Jewelry chests are configured with 2-5 drawer tiers and ring rolls, necklace hooks, or sectioned trays — capacity varies from 12 to 60+ pieces. Custom layouts are part of our standard OEM service.',
      },
      {
        q: 'How should the velvet or linen interior be cared for?',
        a: 'Wipe dust with a soft, dry brush. Avoid water, solvents, and alcohol — they can stain linen and crush velvet pile. If your buyer requires anti-tarnish protection (sterling silver, etc.), we can pre-treat the interior with anti-tarnish strips or laminate a 3M anti-tarnish film between the foam and the upholstery.',
      },
    ],
  },

  'tea-coffee': {
    sectionTitle: 'FAQ — Tea, Coffee & Loose-Leaf Wooden Boxes',
    sectionSub:
      'Compartment sizing, food-safe finishes, and humidity questions for tea / coffee brands and gift programs.',
    items: [
      {
        q: 'Are your tea and coffee boxes food-safe?',
        a: 'Yes. All interior surfaces in food-contact use natural oil or water-based lacquer finishes that comply with EU Food Contact Material regulation (EC) No 1935/2004 and US FDA 21 CFR 175.300. We avoid solvent-based stains and CARB Phase-2 non-compliant adhesives. Test reports available on request.',
      },
      {
        q: 'How many compartments can you make? What sizes fit tea bags vs. loose leaf?',
        a: 'Standard tea boxes come with 4, 6, 8, 9, or 12 dividers — the 8-compartment design fits a typical European tea-bag size (~6 × 7 cm). For loose-leaf tea or coffee pods (Nespresso/Lavazza/Keurig), we build deeper compartments (50-70 mm tall) with a hinged or magnetic acrylic-window lid so customers see the contents.',
      },
      {
        q: 'What\'s the difference between bamboo and acacia tea boxes?',
        a: 'Bamboo is lighter, more sustainable (3-5 year harvest cycle vs. 25+ for hardwoods), and naturally antibacterial — popular with eco-positioned brands. Acacia has denser grain, takes a darker finish well, and feels more "premium" in the hand — preferred by gift retailers and hotel mini-bar suppliers. Both finish in our same kiln-dry + sand + lacquer process.',
      },
      {
        q: 'Do the compartment dividers come fixed or removable?',
        a: 'Both options. Fixed dividers (glued + dowelled) are stronger and align perfectly — better for retail. Removable dividers (slot-and-tongue) let your end customer reconfigure the space — better for gifting and "keepsake" repurposing. Specify which on the inquiry; price difference is minimal.',
      },
      {
        q: 'How is humidity handled for shipments to humid climates (Southeast Asia, Florida)?',
        a: 'Outer cartons include silica-gel sachets sized for the gross box weight (per IPC sea-freight guidelines). For very humid destinations, we can pre-finish boxes with an additional water-resistant lacquer coat. End-user storage is best in a dry pantry — direct sun and >70% humidity cause veneer movement over months.',
      },
    ],
  },

  'wine-whisky': {
    sectionTitle: 'FAQ — Wine, Whisky & Spirits Wooden Boxes',
    sectionSub:
      'Bottle fitment, sliding-lid construction, and export-document questions for wineries, distilleries, and spirits gifting.',
    items: [
      {
        q: 'Which bottle sizes do your wine and spirits boxes fit?',
        a: 'Standard SKUs fit Bordeaux 750 ml, Burgundy 750 ml, magnum (1.5 L), Champagne 750 ml, and 700 ml whisky bottles. Single-bottle, double-bottle, three-bottle, and six-bottle layouts are stock; magnum and decanter sets are custom. Send neck-height + max-diameter dimensions and we build the cradle to match.',
      },
      {
        q: 'What\'s the difference between sliding-lid, hinged, and magnetic wine boxes?',
        a: 'Sliding-lid is the most traditional — flat top, wood grooves, opens like a drawer. Hinged uses a brass piano hinge for a clamshell open; better for retail display because the lid stays open. Magnetic closure is the most modern feel — concealed magnets, no visible hardware, premium feel for gift programs. All three are built from the same kiln-dried stock.',
      },
      {
        q: 'Can you include accessories — corkscrew, stoppers, glasses?',
        a: 'Yes. We source matching accessory kits in-house: corkscrew, foil cutter, stopper, drip ring, pourer, and shot glasses. Accessories are foam-mounted into the box lid or a separate compartment. We can also custom-source items per your brand spec (e.g., laser-engraved cork stoppers).',
      },
      {
        q: 'How do you handle phytosanitary and ISPM-15 stamping for export?',
        a: 'For solid-wood boxes shipped to the EU, UK, Australia, US, and Japan, we provide phytosanitary certificates with each export shipment. Pallets are heat-treated to ISPM-15 (HT stamp) — required for solid-wood pallets entering most countries. The boxes themselves are kiln-dried (KD treatment), so they don\'t need ISPM-15 stamping individually.',
      },
      {
        q: 'What\'s the typical lead time and MOQ for custom-branded wine boxes?',
        a: 'MOQ is 200 pcs for stock-size single or double boxes with logo. Custom sizes for magnums or sets start at 300 pcs. Standard lead time is 30-35 days after artwork approval; rush production (20-25 days) is available for an expedite fee.',
      },
    ],
  },

  'kitchen-dining': {
    sectionTitle: 'FAQ — Wooden Kitchen & Dining Boxes',
    sectionSub:
      'Bread bins, salt cellars, cutlery caddies and serving boxes for kitchenware brands and hotel suppliers.',
    items: [
      {
        q: 'Which wood types are safest for food contact?',
        a: 'Bamboo, acacia, beech, and pine are all food-safe when finished with food-grade mineral oil or water-based lacquer (EC 1935/2004 / FDA 21 CFR 175.300 compliant). We avoid walnut for direct food contact (slight allergen risk) and avoid solvent-based varnishes in the food-zone surfaces.',
      },
      {
        q: 'How are bread bins ventilated to keep loaves fresh?',
        a: 'Our bread bins use a removable wood lid with concealed venting slots routed into the underside, allowing CO₂ to escape and slowing mold growth. Some SKUs add a sliding tambour for visual access. For high-humidity climates we recommend the perforated-back design.',
      },
      {
        q: 'Can you do logo branding for hotel and restaurant programs?',
        a: 'Yes — laser-engrave the logo on the lid, side panel, or interior tray. We routinely produce hotel-room cutlery boxes, restaurant condiment caddies, and pizzeria pepper-mill stands for hospitality groups. Engraving depth and font selection are part of our standard service.',
      },
      {
        q: 'How are salt cellars and condiment boxes sealed against moisture?',
        a: 'Salt cellars use a soft hinged lid with a silicone O-ring seal; cellars are also lined with a thin polyethylene film that\'s removable for washing. Pepper mills and grinder boxes have airtight gasket lids. None of these are dishwasher safe — wipe-clean only.',
      },
      {
        q: 'What sizes do cutlery caddies and serving boxes come in?',
        a: 'Cutlery caddies stock in 3-compartment, 4-compartment, and 6-compartment widths (typically 25-45 cm long). Serving boxes for charcuterie or sushi-takeout go up to 55 × 35 cm. Custom dimensions are part of OEM; send your cutlery sample and we build the divider layout around it.',
      },
    ],
  },

  'garden-seed': {
    sectionTitle: 'FAQ — Garden, Seed & Tool Wooden Boxes',
    sectionSub:
      'Seed organizer questions for nursery brands, gardening retailers, and outdoor lifestyle programs.',
    items: [
      {
        q: 'Are your garden boxes suitable for outdoor use?',
        a: 'Most garden boxes are designed for indoor or covered-patio storage, not direct rain exposure. For outdoor-rated use, we apply a marine-grade water-based polyurethane (3 coats) and use brass or stainless hardware instead of mild steel. Specify "outdoor finish" on inquiry — adds about 10% to unit cost.',
      },
      {
        q: 'How are seed-packet organizers compartmented?',
        a: 'Seed organizer boxes come with 12, 24, or 36 compartments, each sized for a standard seed packet (typically 6.5 × 9 cm). Dividers are removable so end customers can configure for bulk seed jars or larger bulb packets. Alphabet or month-grouped index labels can be laser-engraved into the dividers.',
      },
      {
        q: 'Can you fit specific garden tool sets — Niwaki, Felco, etc.?',
        a: 'Yes. Send the tool list with dimensions or physical samples — we CNC-machine wood or foam inserts to fit pruners (Felco 2, 7, 8), saws (Silky), trowels, and weed pullers. Padded recesses prevent rattle in transit. Tool brands are part of our standard "gift-set" OEM portfolio.',
      },
      {
        q: 'What finishes are best for boxes that may get dirt and water exposure?',
        a: 'A satin-finish water-based polyurethane (matte or low-sheen) is our default for garden boxes — it shrugs off mud, accepts a damp-cloth wipe, and ages gracefully. Oiled finishes look prettier but stain easily with garden grime. Avoid spirit-based stains on these boxes for the same reason.',
      },
      {
        q: 'Can you produce raised garden planter boxes?',
        a: 'We focus on storage and organizer boxes — not load-bearing planter boxes. For those you\'re better served by a dedicated outdoor-furniture factory because the joinery, drainage, and weather-resistance demands are different. Happy to recommend partners if needed.',
      },
    ],
  },

  'storage': {
    sectionTitle: 'FAQ — Wooden Storage Boxes & Desktop Organizers',
    sectionSub:
      'Desk organizer, drawer chest, and general-purpose storage questions for retail, office, and home brands.',
    items: [
      {
        q: 'What\'s the difference between desktop organizers and storage boxes?',
        a: 'Desktop organizers are smaller (15-30 cm), tend to have many open compartments for pens, scissors, sticky-notes, and phone, and live on a desk surface. Storage boxes are larger (30-50 cm), often have a hinged or sliding lid, and store items long-term — documents, hobby supplies, mementos. We make both; many SKUs span both definitions.',
      },
      {
        q: 'How many drawers do your drawer chests come with?',
        a: 'Stock SKUs include 2-drawer, 3-drawer, and 5-drawer chests (table-top scale). Each drawer slides on routed wood rails (no metal slides) which keeps the chest fully wooden — important for our "made-from-wood-only" positioning. Custom drawer counts and depths are part of OEM.',
      },
      {
        q: 'Can the dividers in storage boxes be repositioned?',
        a: 'Yes for "modular" SKUs — they use slotted side rails so dividers slide in 1-cm increments. Fixed-divider SKUs are dowelled and glued and can\'t be moved. Spec the modular version if your end customer is likely to reconfigure (jewelry buyers, hobbyists). Modular costs ~15% more.',
      },
      {
        q: 'What\'s the MOQ and lead time for custom storage boxes?',
        a: 'MOQ is 200 pcs for stock-size boxes with logo. Custom dimensions or custom interior layouts start at 300 pcs. Lead time is 30-35 days after artwork sign-off; 7 days for sample units. Sample cost is refunded against the bulk order.',
      },
      {
        q: 'Are storage boxes stackable?',
        a: 'Most are not stackable out-of-box — lids round over the edges for visual softness. For stackable SKUs (rare, by request) we square the top edges and add interlocking corner pegs. If your end customer needs stackability, mention it on inquiry so we spec the right SKU.',
      },
    ],
  },

  // ── By structure ────────────────────────────────────────────────────
  'hinged': {
    sectionTitle: 'FAQ — Hinged Wooden Boxes',
    sectionSub:
      'Hinge mechanics, lid stops, and durability questions for retail and gifting buyers.',
    items: [
      {
        q: 'What types of hinges do you use?',
        a: 'For most jewelry and watch boxes we use concealed brass hinges — no visible knuckle, premium feel. Larger storage boxes use brass or antique-brass piano hinges (full-length, very durable). Hidden European-style cup hinges are used for clean-line modern SKUs where the hinge must disappear when closed.',
      },
      {
        q: 'Do the lids have a stay-open mechanism?',
        a: 'Optional. Default hinged boxes open and rest at any angle from friction (or fall closed under gravity). For retail display where the lid needs to stay 90° or 110° open, we add a brass quadrant stay or a small lid support. Specify "stay-open" on inquiry.',
      },
      {
        q: 'How are the hinges attached — screws into wood or recessed?',
        a: 'We recess-mortise concealed hinges flush with the wood face so the lid closes flat without a gap. Piano hinges are screwed into a routed channel along the back edge. All screws are solid brass; we don\'t use steel hardware on premium SKUs because it tarnishes against tannins in some woods.',
      },
      {
        q: 'Will the hinges loosen over time?',
        a: 'Properly mortised brass hinges with solid-brass screws last decades — these are the same hinge types used in heirloom cigar humidors and luxury wine cabinets. The wear point is the screw threads in soft wood. We use hardwood (acacia, walnut, beech) for hinge mortises even when the box body is softer wood like paulownia.',
      },
      {
        q: 'Can you ship hinged boxes already assembled, or do they ship flat?',
        a: 'Always assembled. Wooden boxes don\'t flat-pack the way furniture does — joinery is glued, hinges are pre-mortised. Boxes ship in master cartons with corner protectors and OPP individual bags. Master cartons are sized to the importer\'s preference (typically 12, 24, or 36 boxes per carton).',
      },
    ],
  },

  'sliding-lid': {
    sectionTitle: 'FAQ — Sliding-Lid Wooden Boxes',
    sectionSub:
      'Groove tolerance, lid finger-slot, and food-safe questions for tea, coffee, and gift-box buyers.',
    items: [
      {
        q: 'How tight are the sliding-lid grooves — does the lid stick?',
        a: 'Grooves are machined with a 0.3-0.5 mm tolerance so the lid glides smoothly but doesn\'t fall out when tilted. After kiln-drying and finishing, the wood relaxes into its final dimension — we account for that movement in the spec. Lids slide freely even in 70-80% humidity climates.',
      },
      {
        q: 'Is there a finger slot or pull tab on the lid?',
        a: 'Yes — a routed semi-circular finger slot is standard on the front edge of the lid for one-hand opening. Alternative: a small inlaid brass tab. For minimalist designs, we offer a magnetic "push-to-eject" mechanism where pressing the back of the lid causes it to slide forward.',
      },
      {
        q: 'Can sliding lids be locked or sealed?',
        a: 'Not natively — sliding lids are a "lift-and-pull" mechanism by design. For tamper-evidence, a low-tack paper seal across the seam is the standard solution. If you need a true lock, we recommend our hinged-with-lock or magnetic-with-lock SKUs instead.',
      },
      {
        q: 'Are sliding-lid boxes safe for food-contact storage (tea, coffee, spices)?',
        a: 'Yes when finished with food-grade water-based lacquer or natural mineral oil. The sliding lid forms a snug closure but not an airtight one — for moisture-sensitive contents (whole spices, ground coffee), we add a silicone gasket along the lid groove or recommend a sealed inner jar.',
      },
      {
        q: 'Will the lid still slide smoothly after years of use?',
        a: 'In stable indoor humidity (40-65% RH), yes — these boxes outlast generations. In very dry climates the wood can shrink slightly and create play; in very humid climates it can swell and feel tighter. Both are reversible with light sanding or a thin coat of paste wax in the groove.',
      },
    ],
  },

  'drawer': {
    sectionTitle: 'FAQ — Drawer Wooden Boxes',
    sectionSub:
      'Drawer-slide construction, weight capacity, and divider questions for jewelry, watch, and tool program buyers.',
    items: [
      {
        q: 'What kind of drawer slides do you use?',
        a: 'Pure wood-on-wood routed rails (no metal) — keeps the box fully wooden, which is what most retail buyers want from "all-wood" packaging. For heavier drawer applications (tool kits, multi-piece jewelry sets > 2 kg), we add brass undermount slides for smoother action.',
      },
      {
        q: 'What weight can each drawer hold?',
        a: 'Wood-rail drawers comfortably hold 1-1.5 kg (jewelry, watches, accessories). Brass-slide upgrades handle up to 3 kg per drawer (small tools, multi-bottle sets). For heavier loads we recommend a different construction — happy to engineer a custom solution.',
      },
      {
        q: 'Can drawer interiors have removable dividers or trays?',
        a: 'Yes. Standard SKUs ship with 3-6 cell dividers per drawer. Velvet-lined ring rolls, necklace bars, watch pillows, and bracelet trays are interchangeable modules. Tell us the contents you\'re packing and we configure the divider layout — common for OEM watch and jewelry programs.',
      },
      {
        q: 'Do drawer faces show finger-pull cutouts or knobs?',
        a: 'Both options. Finger-pull (semicircle routed into the top edge of the drawer face) is the cleaner, hardware-free look — popular for modern designs. Knobs and brass cup-pulls give a more traditional feel. We can also do recessed leather pulls or inlaid logo medallions for premium SKUs.',
      },
      {
        q: 'How do you prevent drawers from sticking in humid weather?',
        a: 'All drawer rails are paraffin-waxed during assembly. The drawer body has a small 0.5 mm clearance on each side to allow for wood movement. In persistently humid climates (Singapore, Florida), a fresh coat of paste wax once a year keeps things moving.',
      },
    ],
  },

  'magnetic': {
    sectionTitle: 'FAQ — Magnetic-Closure Wooden Boxes',
    sectionSub:
      'Magnet strength, embedment, and aviation-safety questions for gift, watch, and luxury packaging.',
    items: [
      {
        q: 'How strong are the magnets — will the lid stay closed in transit?',
        a: 'We use N52-grade neodymium magnets sized to the box. Standard small jewelry boxes use 8 × 3 mm magnets; larger gift sets use 15 × 3 mm or pairs of magnets. Hold force is enough to keep lids closed under normal shipping handling, but not so strong that older or arthritic hands struggle to open.',
      },
      {
        q: 'Where are the magnets located — visible or concealed?',
        a: 'Always concealed. Magnets are press-fit into routed pockets inside the wood, then capped with a thin veneer or plug. From outside the box you see no hardware. This concealed-magnet design is what makes magnetic-closure feel "premium" — there\'s no visible mechanism, just the satisfying click.',
      },
      {
        q: 'Are magnetic-closure boxes safe to ship by air?',
        a: 'Yes. Neodymium magnets at the sizes we use (10-15 mm) are far below IATA\'s magnetic-field threshold for hazardous-goods classification. We have shipped hundreds of thousands of magnetic boxes by air to all major destinations with zero issues. MSDS / safety declarations available on request.',
      },
      {
        q: 'Can the magnetic latch be replaced if it weakens over time?',
        a: 'Neodymium magnets lose about 1% of their strength per 10 years under normal conditions — effectively permanent in a packaging context. Demagnetization happens only above 80°C, which a packaging box never reaches. Replacement is therefore not designed-for — these are intended to last the box\'s lifetime.',
      },
      {
        q: 'Will magnets affect watches or jewelry inside the box?',
        a: 'Modern watch movements (post-1990) are anti-magnetic and unaffected by box-sized magnets. Mechanical antique watches and reed-switch pacemakers can be sensitive — for those use cases we offer non-magnetic versions (ribbon-pull or friction-fit latches) on request. Gold, silver, platinum, and steel jewelry are unaffected.',
      },
    ],
  },

  'with-lock': {
    sectionTitle: 'FAQ — Wooden Boxes with Lock',
    sectionSub:
      'Lock types, child-resistance, and combination-vs-key questions for stash boxes, document boxes, and security gift programs.',
    items: [
      {
        q: 'What lock types do you offer?',
        a: 'Three families: (1) traditional brass tumbler locks with two keys, (2) combination locks with 3- or 4-digit dials, and (3) cam locks for sliding lids. Combination is the most popular for stash boxes (no key to lose); brass key is preferred for retail and gift-program use where the key is part of the unboxing experience.',
      },
      {
        q: 'Are these locks security-grade or symbolic?',
        a: 'Symbolic to moderate — they\'re packaging locks, not safe-grade. They keep curious hands and casual access out; they will not stop a determined attacker with tools. For documents or items needing real security, recommend buyers also use a home safe. Our locks comply with consumer-product safety regulations in EU, US, and Japan.',
      },
      {
        q: 'Are lockable boxes child-resistant — important for adult-only contents?',
        a: 'The combination-lock models meet US CPSC child-resistance test protocol when the combination is set away from 000 — children under 5 don\'t successfully open them in repeated test trials. Key-lock models are not certified child-resistant by themselves. For cannabis and adult-product programs in California, Washington, and Colorado, the combination version is what regulators accept.',
      },
      {
        q: 'Can you customize the combination or key pattern?',
        a: 'Combinations ship preset (usually to 000 or 123) and can be reset by the end user. We do not offer pre-set custom combinations because each lock needs to be individually configured — adds cost and quality risk. Key patterns can be unique-per-shipment, batch-keyed, or all-master-keyed depending on your program needs.',
      },
      {
        q: 'What happens if the customer loses the key or forgets the combination?',
        a: 'Key models ship with two keys to reduce loss risk; replacement keys are not field-cuttable. Combination models can be picked open with patience using a feeler method — we provide a recovery guide on request, but not generally to end consumers (defeats the purpose). For lost-key cases the simplest path is a small drill into the cam — destructive but works.',
      },
    ],
  },

  // ── By material ─────────────────────────────────────────────────────
  'paulownia': {
    sectionTitle: 'FAQ — Paulownia Wooden Boxes',
    sectionSub:
      'Weight, finish, and air-freight cost questions for buyers choosing the lightest premium wood.',
    items: [
      {
        q: 'Why is paulownia so light — is it weaker than other woods?',
        a: 'Paulownia has a very low density (~0.3 g/cm³, about 35% the weight of pine) due to large air-filled cells. It is structurally surprisingly strong — high strength-to-weight ratio — but it dents more easily than hardwoods like acacia. Best for boxes that get gentle retail handling, not abusive industrial use.',
      },
      {
        q: 'How much air-freight cost do I save with paulownia vs. pine or acacia?',
        a: 'For a typical gift box, switching to paulownia cuts gross weight by 50-65% vs. acacia and 30-40% vs. pine. On a 500-piece air-freight shipment to Europe, that\'s often $200-400 in shipping cost savings — meaningful for high-margin gift programs where shipping is paid by the brand.',
      },
      {
        q: 'Does paulownia take laser engraving and hot-stamping well?',
        a: 'Excellent for laser — the soft fibers char cleanly and contrast well against the pale natural color. Hot-stamping works but pressure must be reduced because the wood crushes easily. Foil adheres well; we recommend gold or bronze foil over silver for stronger contrast on paulownia\'s pale yellow tone.',
      },
      {
        q: 'Is paulownia eco-friendly?',
        a: 'Yes — one of the most sustainable hardwoods commercially available. Paulownia trees grow extremely fast (harvestable in 7-10 years vs. 25+ for oak) and re-coppice from the stump after harvest. Our paulownia stock is FSC-certified from managed plantations in central China.',
      },
      {
        q: 'Will paulownia warp or crack over time?',
        a: 'It\'s dimensionally stable once kiln-dried (we dry to 8-12% moisture content). It moves less than pine or oak as humidity changes, which is why it\'s the traditional Japanese choice for kimono chests (tansu) and tea-ceremony boxes. Crack risk is low under normal indoor conditions.',
      },
    ],
  },

  'pine': {
    sectionTitle: 'FAQ — Pine Wooden Boxes',
    sectionSub:
      'Knot character, finish options, and durability questions for rustic wine, gift, and storage programs.',
    items: [
      {
        q: 'Why is pine so popular for wine and gift boxes?',
        a: 'It\'s affordable, widely available, accepts stains and paints well, and the visible knots and grain give a rustic, "natural-product" feel that buyers in the wine and food-gift category love. It\'s also significantly cheaper than hardwoods — important for value-tier programs where unit cost matters.',
      },
      {
        q: 'Are knots strength weaknesses or decorative features?',
        a: 'Mostly decorative. We grade our pine stock so structural knots (loose, falling-out) are rejected. Tight, sound knots are kept — they\'re what gives pine its character. For very premium positioning where smooth grain is required, we offer "clear pine" (knot-free) at a 20-30% price uplift.',
      },
      {
        q: 'How does pine compare to fir or spruce — can you substitute?',
        a: 'Pine is harder and more rot-resistant than fir or spruce, with a more dramatic grain pattern. We don\'t substitute species without notice. If you specify pine, you receive radiata or Korean red pine (both common in our region) — fir and spruce are available on special request for cost-sensitive programs.',
      },
      {
        q: 'What finish hides or highlights the pine grain best?',
        a: 'Light water-based satin lacquer keeps the natural pale color and pulls out the grain pattern. Stained finishes (walnut, mahogany, ebony) darken the wood and partially hide grain — popular for "aged" or "vintage" looks. Painted finishes (white, sage, navy) completely cover the grain but the knots may telegraph through over time.',
      },
      {
        q: 'How durable is pine for long-term storage use?',
        a: 'Surface-finished pine outlasts unprotected pine by 10×. Properly finished pine boxes can last 30-50 years in indoor use. The vulnerable point is end-grain water exposure — keep pine boxes dry and they\'ll outlast their owners. Outdoor or wet-area use is not recommended unless specifically marine-finished.',
      },
    ],
  },

  'bamboo': {
    sectionTitle: 'FAQ — Bamboo Wooden Boxes',
    sectionSub:
      'Eco-credential, antibacterial, and structural questions for sustainability-positioned brands.',
    items: [
      {
        q: 'Is bamboo really a wood, or is it grass?',
        a: 'Botanically bamboo is a grass, but commercially and structurally it\'s used as wood — it\'s laminated into boards (called bamboo plywood or strand bamboo) that behave identically to hardwood for tooling, finishing, and joinery. The bamboo "wood" you see in our boxes is engineered laminate, not raw bamboo stalk.',
      },
      {
        q: 'Is bamboo really more sustainable than hardwood?',
        a: 'Yes, by a wide margin. Bamboo grows 30-90 cm per day, harvestable in 3-5 years, and regrows from the same root after cutting (no replanting needed). A bamboo plantation produces 25× the biomass of an oak forest of the same area. Our bamboo is FSC-certified from managed plantations in southern China.',
      },
      {
        q: 'Is the "naturally antibacterial" claim real?',
        a: 'Partially. Raw bamboo contains a compound called bamboo kun that suppresses bacterial growth — well-documented in lab tests. After processing into laminated boards, this effect is reduced but not eliminated. Independent studies show bamboo cutting boards harbor 50-90% fewer bacteria than acacia at 24 hours after use. The effect is real but should not replace standard food-safety washing.',
      },
      {
        q: 'Will bamboo darken with age like other woods?',
        a: 'Bamboo "ambers" slowly — going from a pale honey color to a richer caramel over 1-3 years of indirect light exposure. UV-stable lacquers slow this color shift. Carbonized bamboo (a separate product where bamboo is heat-treated dark brown before lamination) starts dark and stays dark.',
      },
      {
        q: 'Can bamboo handle wet environments — kitchen, bathroom?',
        a: 'Better than most hardwoods. Bamboo laminate is denser than acacia and has lower water absorption. A water-based polyurethane finish makes it suitable for kitchen / bath / sauna environments. Standing water for hours will still eventually wick into the seams — wipe-clean within minutes for longevity.',
      },
    ],
  },

  'acacia': {
    sectionTitle: 'FAQ — Acacia Wooden Boxes',
    sectionSub:
      'Grain character, density, and finish questions for premium gifting and kitchen-luxury brands.',
    items: [
      {
        q: 'What makes acacia good for premium boxes?',
        a: 'Acacia is dense hardwood (~0.7 g/cm³) with deep brown-to-amber tones and visible swirling grain — every box looks slightly different. It takes a glass-smooth finish and resists scratches better than pine or bamboo. The combination of "warm visual" + "premium hand-feel" + "moderate price" makes it the workhorse of our gift-box program.',
      },
      {
        q: 'Is the acacia in your boxes the same as acacia from Africa?',
        a: 'Different species. We use Vachellia / Senegalia acacia from sustainable plantations in southeast Asia (mostly Vietnam and Thailand). African acacia (often called "thorn tree") is a related genus but grown under different conditions. Visually and structurally our acacia is very similar; pricing is significantly lower than African specialty hardwoods.',
      },
      {
        q: 'Is acacia food-safe for cutting boards or serving trays?',
        a: 'Yes — finished with food-grade mineral oil or water-based lacquer it complies with EU and FDA food-contact regulations. Acacia is naturally one of the more food-suitable hardwoods because of its tight grain and low chemical leaching. We supply finished acacia boards to several major European cookware brands.',
      },
      {
        q: 'Will acacia color shift over time?',
        a: 'Mild darkening — the warm amber tone deepens slightly with exposure to indoor light over years. UV-stable lacquer slows this. The visual character of acacia (the swirling, mineral-streak grain pattern) doesn\'t change. Most buyers like the slow patina; for retail buyers needing color consistency across reorders, we recommend specifying a stained finish.',
      },
      {
        q: 'What\'s the price difference between acacia and walnut?',
        a: 'Acacia is typically 30-45% cheaper than walnut per kilogram of finished box, with broadly similar density and durability. Walnut wins on visual luxury (chocolate-brown saturation) and brand association ("walnut" reads as high-end in Western markets). Acacia wins on price-to-quality ratio — most popular choice in our portfolio.',
      },
    ],
  },

  'walnut': {
    sectionTitle: 'FAQ — Walnut Wooden Boxes',
    sectionSub:
      'Chocolate-grain finish, luxury positioning, and care questions for spirits, watches, and high-end gifting.',
    items: [
      {
        q: 'What makes walnut the "luxury" wood for boxes?',
        a: 'Three reasons: (1) the deep chocolate brown color reads as expensive in retail packaging studies, (2) the grain has dramatic swirl and figure ("burl") that makes each box visually unique, (3) it\'s a culturally premium wood — buyers associate walnut with gun stocks, premium furniture, and luxury car dashboards. We use American black walnut for the richest tone.',
      },
      {
        q: 'Is American walnut more expensive than European walnut?',
        a: 'American black walnut is the most expensive at our procurement, with European walnut about 15-25% cheaper and lighter in color, and Asian walnut (manchurian) cheaper still but with less grain drama. For luxury watch and whisky packaging we recommend American walnut; for value-luxury gift programs European walnut is the sweet spot.',
      },
      {
        q: 'Does walnut darken or lighten over time?',
        a: 'Mostly lightens slightly — fresh walnut has a purplish tone that mellows to a warmer brown over 1-2 years. UV-stable finishes slow this. The lightening is gentle and most owners don\'t notice unless comparing side-by-side. We pre-condition our stock with UV exposure before kiln-drying to even out the initial color.',
      },
      {
        q: 'Are walnut allergies a concern for food-contact use?',
        a: 'Walnut dust contains juglone, a mild allergen that can affect woodworkers. The finished, sealed wood does not transfer juglone to contents. We do NOT recommend walnut as a cutting board (where the food contacts raw wood) but it\'s fine as packaging where contents are sealed (whisky bottles, watches, cigars).',
      },
      {
        q: 'How should walnut boxes be cared for?',
        a: 'Indoor display, dust regularly with a soft cloth, occasional wipe with a slightly damp microfiber. Avoid direct sunlight (slow color shift), kitchen-counter water exposure, and ammonia-based cleaners (turns walnut purplish-grey). A light coat of paste wax once a year refreshes the surface; otherwise these boxes are essentially maintenance-free.',
      },
    ],
  },
};
