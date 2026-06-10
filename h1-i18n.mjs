// One-off: replace the homepage hero H1 (titleA/Em1/B/Em2) in each locale's
// data/home/<loc>.js with a keyword-led B2B headline. Asserts each old string
// appears exactly once, then writes. Run: node h1-i18n.mjs
import fs from 'fs';

const M = {
  de: [
    ["titleA: 'Wo',", "titleA: 'Hersteller für',"],
    ["titleEm1: 'Holz',", "titleEm1: 'Holzboxen nach Maß',"],
    ["titleB: 'zum',", "titleB: 'Großhandel &',"],
    ["titleEm2: 'Erbstück wird.',", "titleEm2: 'OEM-Lieferant',"],
  ],
  it: [
    ["titleA: 'Dove il',", "titleA: 'Produttore di',"],
    ["titleEm1: 'Legno',", "titleEm1: 'Scatole in Legno',"],
    ["titleB: 'diventa',", "titleB: 'Ingrosso &',"],
    ["titleEm2: 'Cimelio.',", "titleEm2: 'Fornitore OEM',"],
  ],
  es: [
    ["titleA: 'Donde la',", "titleA: 'Fabricante de',"],
    ["titleEm1: 'Madera',", "titleEm1: 'Cajas de Madera',"],
    ["titleB: 'se vuelve',", "titleB: 'Mayorista &',"],
    ["titleEm2: 'Reliquia.',", "titleEm2: 'Proveedor OEM',"],
  ],
  fr: [
    ["titleA: 'Quand le',", "titleA: 'Fabricant de',"],
    ["titleEm1: 'Bois',", "titleEm1: 'Boîtes en Bois',"],
    ["titleB: 'devient',", "titleB: 'Grossiste &',"],
    ["titleEm2: 'Patrimoine.',", "titleEm2: 'Fournisseur OEM',"],
  ],
  pt: [
    ["titleA: 'Onde a',", "titleA: 'Fabricante de',"],
    ["titleEm1: 'Madeira',", "titleEm1: 'Caixas de Madeira',"],
    ["titleB: 'se torna',", "titleB: 'Grossista &',"],
    ["titleEm2: 'Herança.',", "titleEm2: 'Fornecedor OEM',"],
  ],
  ja: [
    ["titleA: '木が',", "titleA: 'カスタム木箱の',"],
    ["titleEm1: '木',", "titleEm1: '製造メーカー',"],
    ["titleB: 'なるところ、',", "titleB: '卸売・',"],
    ["titleEm2: '家宝へ。',", "titleEm2: 'OEMサプライヤー',"],
  ],
  ko: [
    ["titleA: '나무가',", "titleA: '맞춤 우드 박스',"],
    ["titleEm1: '나무',", "titleEm1: '제조업체',"],
    ["titleB: '되는 곳에서',", "titleB: '도매 &',"],
    ["titleEm2: '가보로.',", "titleEm2: 'OEM 공급업체',"],
  ],
};

let problems = 0;
for (const [loc, pairs] of Object.entries(M)) {
  const file = `data/home/${loc}.js`;
  let src = fs.readFileSync(file, 'utf8');
  for (const [oldS, newS] of pairs) {
    const count = src.split(oldS).length - 1;
    if (count !== 1) { console.log(`  ✗ ${loc}: "${oldS}" found ${count}x (expected 1)`); problems++; continue; }
    src = src.replace(oldS, newS);
  }
  fs.writeFileSync(file, src, 'utf8');
  console.log(`${loc}: updated`);
}
console.log(problems === 0 ? '\nALL 7 LOCALES UPDATED' : `\n${problems} PROBLEM(S)`);
