// Inline-SVG diagram blocks for blog articles: a numbered process flow and
// a visual comparison grid with schematic drawings.
//
// Everything here is hand-drawn SVG rather than an image file, for three
// reasons: it stays crisp at any zoom, it costs no extra HTTP request, and
// the labels are real text — so they are readable by screen readers, by
// Google, and by the AI engines we want quoting this article. A flattened
// PNG of a diagram is invisible to all three.
//
// Palette matches the site's wood tokens; no dark-mode variants because the
// article template is light-only.

const C = {
  deep: '#3D2A1F',
  mid: '#6B4A33',
  warm: '#A07852',
  light: '#D9B98F',
  cream: '#F6EEDF',
  sand: '#ECDFC6',
  accent: '#C58E4A',
  mute: '#7A6450',
};

/* ─────────────────────────────────────────────────────────────
   Closure schematics — one small line drawing per closure type.
   Each is a 120×90 viewBox so they align on a shared baseline.
   ───────────────────────────────────────────────────────────── */
function Schematic({ kind }) {
  const stroke = C.mid;
  const sw = 2.2;
  const common = { fill: 'none', stroke, strokeWidth: sw, strokeLinejoin: 'round', strokeLinecap: 'round' };

  switch (kind) {
    case 'sliding':
      return (
        <svg viewBox="0 0 120 90" role="img" aria-label="Sliding lid: a panel slides along a groove in the box wall">
          {/* body */}
          <rect x="14" y="38" width="92" height="40" rx="3" {...common} fill={C.sand} />
          {/* groove line */}
          <line x1="14" y1="46" x2="106" y2="46" stroke={C.warm} strokeWidth="1.4" strokeDasharray="4 3" />
          {/* sliding panel, offset to the right */}
          <rect x="46" y="22" width="74" height="15" rx="2" {...common} fill={C.light} />
          {/* motion arrow */}
          <path d="M40 29 H22" stroke={C.accent} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M26 25 L21 29 L26 33" stroke={C.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'hinged':
      return (
        <svg viewBox="0 0 120 90" role="img" aria-label="Hinged lid: the lid pivots on hardware fixed at the back edge">
          <rect x="16" y="44" width="88" height="34" rx="3" {...common} fill={C.sand} />
          {/* lid opened at an angle from the back-right */}
          <path d="M104 44 L104 44 L38 18 L28 24 L16 44" {...common} fill={C.light} />
          {/* hinge pin */}
          <circle cx="104" cy="44" r="4.2" fill={C.accent} stroke={C.deep} strokeWidth="1.4" />
          {/* pivot arc */}
          <path d="M92 30 A22 22 0 0 1 100 39" stroke={C.accent} strokeWidth="2" fill="none" strokeDasharray="3 3" />
        </svg>
      );

    case 'magnetic':
      return (
        <svg viewBox="0 0 120 90" role="img" aria-label="Magnetic closure: magnets are concealed inside the wall, the lid lifts straight off">
          <rect x="18" y="46" width="84" height="32" rx="3" {...common} fill={C.sand} />
          {/* lid floating above */}
          <rect x="18" y="20" width="84" height="15" rx="2" {...common} fill={C.light} />
          {/* magnet pairs */}
          <circle cx="34" cy="42" r="3.4" fill={C.accent} />
          <circle cx="86" cy="42" r="3.4" fill={C.accent} />
          <circle cx="34" cy="31" r="3.4" fill={C.accent} />
          <circle cx="86" cy="31" r="3.4" fill={C.accent} />
          {/* attraction marks */}
          <line x1="34" y1="35" x2="34" y2="39" stroke={C.accent} strokeWidth="1.6" strokeDasharray="2 2" />
          <line x1="86" y1="35" x2="86" y2="39" stroke={C.accent} strokeWidth="1.6" strokeDasharray="2 2" />
        </svg>
      );

    case 'drawer':
      return (
        <svg viewBox="0 0 120 90" role="img" aria-label="Drawer box: a tray slides out horizontally from a fixed outer shell">
          {/* outer shell */}
          <rect x="14" y="26" width="70" height="52" rx="3" {...common} fill={C.sand} />
          <line x1="14" y1="52" x2="84" y2="52" stroke={C.warm} strokeWidth="1.6" />
          {/* pulled-out drawer */}
          <rect x="76" y="56" width="34" height="20" rx="2" {...common} fill={C.light} />
          <circle cx="105" cy="66" r="2.8" fill={C.accent} />
          {/* motion arrow */}
          <path d="M92 38 H110" stroke={C.accent} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M106 34 L111 38 L106 42" stroke={C.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'lock':
      return (
        <svg viewBox="0 0 120 90" role="img" aria-label="Lockable box: a hinged lid secured by a key or combination lock at the front">
          <rect x="18" y="40" width="84" height="38" rx="3" {...common} fill={C.sand} />
          <rect x="18" y="28" width="84" height="14" rx="2" {...common} fill={C.light} />
          {/* lock plate */}
          <rect x="52" y="42" width="16" height="18" rx="2" fill={C.accent} stroke={C.deep} strokeWidth="1.6" />
          {/* keyhole */}
          <circle cx="60" cy="49" r="2.6" fill={C.deep} />
          <path d="M60 51 L60 56" stroke={C.deep} strokeWidth="2" strokeLinecap="round" />
          {/* hinge pins at back */}
          <circle cx="26" cy="35" r="2.4" fill={C.mid} />
          <circle cx="94" cy="35" r="2.4" fill={C.mid} />
        </svg>
      );

    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────────────
   Comparison grid — schematic + name + attribute rows.
   items: [{ kind, name, tagline, rows: [{ k, v }], highlight? }]
   ───────────────────────────────────────────────────────────── */
const CMP_CSS = `
.bp-cmp { margin: 42px 0; }
.bp-cmp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
}
.bp-cmp-card {
  background: #fff;
  border: 1px solid rgba(107,74,51,0.18);
  border-radius: 5px;
  padding: 18px 18px 6px;
  display: flex;
  flex-direction: column;
}
.bp-cmp-card.is-hl { border-color: ${C.accent}; box-shadow: 0 4px 22px rgba(107,74,51,0.08); }
.bp-cmp-fig {
  background: ${C.cream};
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 14px;
}
.bp-cmp-fig svg { width: 100%; height: auto; display: block; }
.bp-cmp-name {
  font-family: var(--font-fraunces), Georgia, serif;
  font-size: 1.02rem; font-weight: 600; color: ${C.deep};
  margin: 0 0 3px; line-height: 1.25;
}
.bp-cmp-tag { font-size: .8rem; color: ${C.mute}; line-height: 1.5; margin: 0 0 12px; }
.bp-cmp-rows { border-top: 1px solid rgba(107,74,51,0.12); }
.bp-cmp-row {
  display: flex; justify-content: space-between; gap: 10px;
  padding: 8px 0; border-bottom: 1px solid rgba(107,74,51,0.09);
  font-size: .82rem; line-height: 1.45;
}
.bp-cmp-row:last-child { border-bottom: 0; }
.bp-cmp-k { color: ${C.mute}; flex-shrink: 0; }
.bp-cmp-v { color: ${C.deep}; font-weight: 600; text-align: right; }
.bp-cmp-cap { font-size: .84rem; color: ${C.mute}; font-style: italic; margin-top: 14px; line-height: 1.6; }
@media print {
  .bp-cmp-grid { grid-template-columns: repeat(2, 1fr); }
  .bp-cmp-card { break-inside: avoid; }
}
`;

export function BlogCompare({ items, caption }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <div className="bp-cmp">
      <style dangerouslySetInnerHTML={{ __html: CMP_CSS }} />
      <div className="bp-cmp-grid">
        {items.map((it, i) => (
          <div key={i} className={`bp-cmp-card${it.highlight ? ' is-hl' : ''}`}>
            <div className="bp-cmp-fig"><Schematic kind={it.kind} /></div>
            <p className="bp-cmp-name">{it.name}</p>
            {it.tagline && <p className="bp-cmp-tag">{it.tagline}</p>}
            {Array.isArray(it.rows) && (
              <div className="bp-cmp-rows">
                {it.rows.map((r, k) => (
                  <div className="bp-cmp-row" key={k}>
                    <span className="bp-cmp-k">{r.k}</span>
                    <span className="bp-cmp-v">{r.v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && <p className="bp-cmp-cap">{caption}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Process flow — numbered steps with connectors.
   steps: [{ title, note }]
   ───────────────────────────────────────────────────────────── */
const FLOW_CSS = `
.bp-flow { margin: 42px 0; }
.bp-flow-track { display: flex; flex-wrap: wrap; gap: 0; align-items: stretch; }
.bp-flow-step {
  flex: 1 1 160px;
  background: ${C.cream};
  border: 1px solid rgba(107,74,51,0.18);
  border-radius: 5px;
  padding: 16px 16px 14px;
  position: relative;
  margin: 0 14px 14px 0;
}
.bp-flow-step:last-child { margin-right: 0; }
.bp-flow-step::after {
  content: '';
  position: absolute; top: 50%; right: -14px;
  width: 14px; height: 2px; background: ${C.light};
}
.bp-flow-step:last-child::after { display: none; }
.bp-flow-n {
  width: 26px; height: 26px; border-radius: 50%;
  background: ${C.accent}; color: #2A1B12;
  display: flex; align-items: center; justify-content: center;
  font-size: .82rem; font-weight: 700;
  margin-bottom: 10px;
}
.bp-flow-t {
  font-family: var(--font-fraunces), Georgia, serif;
  font-size: .96rem; font-weight: 600; color: ${C.deep};
  margin: 0 0 5px; line-height: 1.3;
}
.bp-flow-note { font-size: .82rem; color: ${C.mute}; line-height: 1.55; margin: 0; }
.bp-flow-cap { font-size: .84rem; color: ${C.mute}; font-style: italic; margin-top: 6px; line-height: 1.6; }
@media (max-width: 700px) {
  .bp-flow-step { flex: 1 1 100%; margin-right: 0; }
  .bp-flow-step::after { top: auto; bottom: -14px; right: 50%; width: 2px; height: 14px; }
}
@media print { .bp-flow-step { break-inside: avoid; } }
`;

export function BlogFlow({ steps, caption }) {
  if (!Array.isArray(steps) || !steps.length) return null;
  return (
    <div className="bp-flow">
      <style dangerouslySetInnerHTML={{ __html: FLOW_CSS }} />
      <ol className="bp-flow-track" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {steps.map((s, i) => (
          <li className="bp-flow-step" key={i}>
            <div className="bp-flow-n" aria-hidden="true">{i + 1}</div>
            <p className="bp-flow-t">{s.title}</p>
            {s.note && <p className="bp-flow-note">{s.note}</p>}
          </li>
        ))}
      </ol>
      {caption && <p className="bp-flow-cap">{caption}</p>}
    </div>
  );
}
