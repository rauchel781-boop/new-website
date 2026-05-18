// Certification badge icons — inline SVG to replace the emoji icons
// that were previously rendered next to FSC / EU REACH / CARB / SGS /
// Phyto / ISO 9001 labels in the home page trust ribbon.
//
// B2B buyers (procurement, sourcing managers, quality leads) read the
// trust ribbon to verify the supplier's compliance posture. Emoji like
// 🌲 🇪🇺 ✅ 🔬 📜 🏅 looked playful, not professional. These line-art
// SVGs match the wood-tone palette via `currentColor` and read crisply
// at the rendered size (~29px on desktop).
//
// Usage:
//   <CertIcon slug="fsc" />
//
// All icons share viewBox 24×24 and use stroke="currentColor" so they
// inherit the surrounding `color`. Set `color: var(--blue-warm)` (or
// any cert palette color) on the parent .cert-icon wrapper.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Fsc() {
  // Stylized pine tree — Forest Stewardship Council symbolism.
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} aria-hidden="true">
      <path d="M12 3 L7 11 L9.5 11 L6 17 L10.5 17 L10.5 21 L13.5 21 L13.5 17 L18 17 L14.5 11 L17 11 Z" />
    </svg>
  );
}

function EuReach() {
  // Circle with EU monogram — references the EU compliance regulation.
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <text
        x="12"
        y="15.4"
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        EU
      </text>
    </svg>
  );
}

function CarbP2() {
  // Stylized leaf — CARB P2 governs formaldehyde emissions, very tightly
  // associated with eco/health-grade composite wood.
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} aria-hidden="true">
      <path d="M5 19 C 5 11, 11 5, 19 5 C 19 13, 13 19, 5 19 Z" />
      <path d="M5 19 L 14.5 9.5" />
    </svg>
  );
}

function Sgs() {
  // Magnifying glass over a checkmark — third-party inspection symbol.
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} aria-hidden="true">
      <circle cx="10" cy="10" r="6.2" />
      <path d="M14.6 14.6 L20 20" />
      <path d="M7.5 10 L9.5 12 L13 8" />
    </svg>
  );
}

function Phyto() {
  // Leaf with a checkmark — phytosanitary certificate, plant-health
  // clearance for cross-border shipment of solid wood goods.
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} aria-hidden="true">
      <path d="M4 20 C 4 12, 11 5, 20 5 C 20 14, 13 20, 4 20 Z" />
      <path d="M8 16 L 10.5 18.5 L 16 12" />
    </svg>
  );
}

function Iso9001() {
  // Medal with ribbon tails — quality management system certification.
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} aria-hidden="true">
      <circle cx="12" cy="9.5" r="5.8" />
      <path d="M8 13.5 L 6.2 21 L 9.5 19 L 12 21.5 L 14.5 19 L 17.8 21 L 16 13.5" />
      <text
        x="12"
        y="11.6"
        textAnchor="middle"
        fontSize="4.8"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        letterSpacing="0.3"
      >
        ISO
      </text>
    </svg>
  );
}

const REGISTRY = {
  'fsc':       Fsc,
  'eu-reach':  EuReach,
  'carb':      CarbP2,
  'sgs':       Sgs,
  'phyto':     Phyto,
  'iso-9001':  Iso9001,
};

// Public component. Falls back to nothing if slug is unknown so we
// don't crash on a typo or new cert added to data without an icon.
export default function CertIcon({ slug }) {
  const Cmp = REGISTRY[slug];
  if (!Cmp) return null;
  return <Cmp />;
}
