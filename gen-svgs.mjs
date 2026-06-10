// Generates 5 on-brand SVG infographics for the wooden-box cost-guide blog post.
// All 1200x900 (4:3) to match the blog <img width=1200 height=900>. Palette
// matches the blog CSS (wood/cream). Run: node gen-svgs.mjs
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'public/blog/cost-guide');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  deep: '#3D2A1F', mid: '#6B4A33', warm: '#C58E4A', light: '#D9B98F',
  cream: '#F6EEDF', sand: '#ECDFC6', ink: '#2A1B12', mute: '#7A6450',
  wood: '#A07852', white: '#FFFFFF',
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" font-family="${SANS}">
  <rect width="1200" height="900" fill="${C.cream}"/>
  <rect x="40" y="40" width="1120" height="820" rx="14" fill="none" stroke="${C.warm}" stroke-opacity="0.35" stroke-width="2"/>
${inner}
</svg>\n`;

const title = (t, sub) =>
  `  <text x="100" y="120" font-family="${SERIF}" font-size="44" font-weight="700" fill="${C.deep}">${esc(t)}</text>` +
  (sub ? `\n  <text x="100" y="160" font-size="22" fill="${C.mute}">${esc(sub)}</text>` : '');

const eyebrow = `  <text x="100" y="80" font-size="18" letter-spacing="4" fill="${C.warm}" font-weight="700">CHIC · WOODEN BOX COST GUIDE</text>`;

// ── 1. Cost breakdown — horizontal 100% stacked bar + legend ──
{
  const seg = [
    ['Wood / raw material', 45, C.warm, false],
    ['Labour &amp; assembly', 18, C.mid, true],
    ['Finishing &amp; lacquer', 12, C.light, false],
    ['Branding (laser/foil/UV)', 8, C.wood, true],
    ['Hardware, inserts &amp; lining', 9, C.deep, true],
    ['Packing, QC &amp; overhead', 8, C.mute, true],
  ];
  const x0 = 100, w = 1000, y = 250, h = 130;
  let x = x0, bars = '', legend = '';
  seg.forEach((s, i) => {
    const sw = (s[1] / 100) * w;
    bars += `\n  <rect x="${x.toFixed(1)}" y="${y}" width="${sw.toFixed(1)}" height="${h}" fill="${s[2]}"/>`;
    if (sw > 70) bars += `\n  <text x="${(x + sw / 2).toFixed(1)}" y="${y + h / 2 + 9}" text-anchor="middle" font-size="26" font-weight="700" fill="${s[3] ? C.cream : C.deep}">${s[1]}%</text>`;
    x += sw;
    const col = i < 3 ? 0 : 1, row = i % 3;
    const lx = 100 + col * 520, ly = 500 + row * 76;
    legend += `\n  <rect x="${lx}" y="${ly}" width="30" height="30" rx="5" fill="${s[2]}"/>`;
    legend += `\n  <text x="${lx + 46}" y="${ly + 22}" font-size="24" fill="${C.deep}">${s[0]} <tspan font-weight="700" fill="${C.mid}">${s[1]}%</tspan></text>`;
  });
  const inner = eyebrow + '\n' + title('Where a wooden box’s unit cost goes', 'Typical share of an OEM unit cost — varies by spec') + bars + legend;
  fs.writeFileSync(path.join(OUT, 'cost-breakdown.svg'), wrap(inner));
}

// ── 2. Wood species price ladder — ascending bars ──
{
  const data = [['Paulownia', 1.0, C.light], ['Pine', 1.2, C.warm], ['Bamboo', 1.8, C.wood], ['Acacia', 1.9, C.mid], ['Walnut', 3.8, C.deep]];
  const base = 770, maxH = 520, scale = maxH / 3.8;
  const bw = 150, x0 = 150, step = 192;
  let bars = '';
  data.forEach((d, i) => {
    const x = x0 + i * step, bh = d[1] * scale, y = base - bh;
    bars += `\n  <rect x="${x}" y="${y.toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" rx="4" fill="${d[2]}"/>`;
    bars += `\n  <text x="${x + bw / 2}" y="${(y - 18).toFixed(1)}" text-anchor="middle" font-size="30" font-weight="700" fill="${C.mid}">${d[1].toFixed(1)}×</text>`;
    bars += `\n  <text x="${x + bw / 2}" y="${base + 38}" text-anchor="middle" font-size="26" fill="${C.deep}" font-weight="600">${d[0]}</text>`;
  });
  bars += `\n  <line x1="100" y1="${base}" x2="1080" y2="${base}" stroke="${C.mid}" stroke-width="2"/>`;
  const inner = eyebrow + '\n' + title('Wood species set the price floor', 'Relative material cost index (paulownia = 1×) — indicative') + bars;
  fs.writeFileSync(path.join(OUT, 'species-price-ladder.svg'), wrap(inner));
}

// ── 3. Closure / construction cost ladder ──
{
  const data = [['Sliding lid', 1.0, C.light], ['Hinged', 1.5, C.warm], ['Magnetic', 2.0, C.mid], ['Lock &amp; key', 2.4, C.deep]];
  const base = 770, maxH = 520, scale = maxH / 2.4;
  const bw = 180, x0 = 175, step = 240;
  let bars = '';
  data.forEach((d, i) => {
    const x = x0 + i * step, bh = d[1] * scale, y = base - bh;
    bars += `\n  <rect x="${x}" y="${y.toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" rx="4" fill="${d[2]}"/>`;
    bars += `\n  <text x="${x + bw / 2}" y="${(y - 18).toFixed(1)}" text-anchor="middle" font-size="30" font-weight="700" fill="${C.mid}">${d[1].toFixed(1)}×</text>`;
    bars += `\n  <text x="${x + bw / 2}" y="${base + 38}" text-anchor="middle" font-size="25" fill="${C.deep}" font-weight="600">${d[0]}</text>`;
  });
  bars += `\n  <line x1="100" y1="${base}" x2="1080" y2="${base}" stroke="${C.mid}" stroke-width="2"/>`;
  const inner = eyebrow + '\n' + title('Closure drives assembly cost', 'Relative build/hardware cost (sliding lid = 1×) — indicative') + bars;
  fs.writeFileSync(path.join(OUT, 'closure-cost-ladder.svg'), wrap(inner));
}

// ── 4. Price vs volume curve ──
{
  const pts = [['100', 14.0], ['300', 9.5], ['1,000', 7.0], ['3,000', 5.8], ['10,000', 5.0]];
  const xL = 170, xR = 1060, yT = 230, yB = 760, pMax = 16;
  const xs = pts.map((_, i) => xL + (i * (xR - xL)) / (pts.length - 1));
  const yOf = (p) => yB - (p / pMax) * (yB - yT);
  let g = '';
  // axes
  g += `\n  <line x1="${xL}" y1="${yT}" x2="${xL}" y2="${yB}" stroke="${C.mid}" stroke-width="2"/>`;
  g += `\n  <line x1="${xL}" y1="${yB}" x2="${xR}" y2="${yB}" stroke="${C.mid}" stroke-width="2"/>`;
  // gridlines
  for (let p = 4; p <= 16; p += 4) { const y = yOf(p); g += `\n  <line x1="${xL}" y1="${y.toFixed(1)}" x2="${xR}" y2="${y.toFixed(1)}" stroke="${C.mute}" stroke-opacity="0.18" stroke-width="1"/>`; g += `\n  <text x="${xL - 18}" y="${(y + 7).toFixed(1)}" text-anchor="end" font-size="20" fill="${C.mute}">$${p}</text>`; }
  // polyline
  const poly = pts.map((p, i) => `${xs[i].toFixed(1)},${yOf(p[1]).toFixed(1)}`).join(' ');
  g += `\n  <polyline points="${poly}" fill="none" stroke="${C.warm}" stroke-width="5" stroke-linejoin="round"/>`;
  pts.forEach((p, i) => {
    const x = xs[i], y = yOf(p[1]);
    g += `\n  <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${C.deep}"/>`;
    g += `\n  <text x="${x.toFixed(1)}" y="${(y - 22).toFixed(1)}" text-anchor="middle" font-size="24" font-weight="700" fill="${C.deep}">$${p[1].toFixed(1)}</text>`;
    g += `\n  <text x="${x.toFixed(1)}" y="${yB + 38}" text-anchor="middle" font-size="22" fill="${C.deep}" font-weight="600">${p[0]}</text>`;
  });
  g += `\n  <text x="${(xL + xR) / 2}" y="${yB + 78}" text-anchor="middle" font-size="20" fill="${C.mute}">Order quantity (pieces)</text>`;
  const inner = eyebrow + '\n' + title('Unit price falls fast with volume', 'Illustrative for one premium SKU — the 100→1,000 drop is the steepest') + g;
  fs.writeFileSync(path.join(OUT, 'price-vs-volume.svg'), wrap(inner));
}

// ── 5. FOB -> landed cost build-up (stacked column) ──
{
  const seg = [
    ['FOB unit price', 6.00, C.warm],
    ['Sea freight &amp; insurance', 0.70, C.mid],
    ['ISPM 15 / heat treatment', 0.10, C.light],
    ['Compliance docs (CARB/FSC/REACH)', 0.20, C.wood],
    ['Import duty', 0.45, C.deep],
  ];
  const total = seg.reduce((a, s) => a + s[1], 0);
  const base = 800, top = 230, scale = (base - top) / total;
  const cx = 300, bw = 230;
  let y = base, g = '';
  seg.forEach((s) => {
    const sh = s[1] * scale; y -= sh;
    g += `\n  <rect x="${cx}" y="${y.toFixed(1)}" width="${bw}" height="${sh.toFixed(1)}" fill="${s[2]}"/>`;
    const ly = y + sh / 2;
    g += `\n  <line x1="${cx + bw}" y1="${ly.toFixed(1)}" x2="${cx + bw + 40}" y2="${ly.toFixed(1)}" stroke="${C.mute}" stroke-width="1.5"/>`;
    g += `\n  <text x="${cx + bw + 52}" y="${(ly + 8).toFixed(1)}" font-size="24" fill="${C.deep}"><tspan font-weight="700">+$${s[1].toFixed(2)}</tspan>  ${s[0]}</text>`;
  });
  g += `\n  <line x1="${cx - 20}" y1="${base}" x2="${cx + bw + 20}" y2="${base}" stroke="${C.mid}" stroke-width="2"/>`;
  g += `\n  <text x="${cx + bw / 2}" y="${(y - 24).toFixed(1)}" text-anchor="middle" font-size="30" font-weight="700" fill="${C.deep}">Landed ≈ $${total.toFixed(2)}</text>`;
  const inner = eyebrow + '\n' + title('FOB is not your real cost', 'How a $6.00 FOB unit becomes landed cost — illustrative') + g;
  fs.writeFileSync(path.join(OUT, 'fob-to-landed.svg'), wrap(inner));
}

console.log('Wrote 5 SVGs to public/blog/cost-guide/:');
fs.readdirSync(OUT).filter(f => f.endsWith('.svg')).forEach(f => console.log('  -', f));
