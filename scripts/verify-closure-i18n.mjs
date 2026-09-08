// Post-merge check for the closure-types article's 7 translations.
//
// Text differs by design; structure must not. A translation that quietly
// drops an image block or rewrites a link target renders a broken page in
// that locale only, which is exactly the kind of thing nobody notices for
// months. So this compares block types, image paths and link targets against
// the English source, and fails loudly on any drift.
//
// Usage: node scripts/verify-closure-i18n.mjs

import { POSTS } from '../data/blog.js';

const SLUG = 'wooden-box-closure-types-compared';
const LOCALES = ['es', 'fr', 'de', 'it', 'pt', 'ja', 'ko'];

const en = POSTS.find((p) => p.slug === SLUG);
if (!en) { console.error(`English source for ${SLUG} not found in data/blog.js`); process.exit(1); }

const shape = (body) => ({
  types: body.map((b) => b.type).join(','),
  imgs: body.filter((b) => b.type === 'img').map((b) => b.src).join(','),
  links: (JSON.stringify(body).match(/\]\(([^)]+)\)/g) || []).sort().join(','),
});
const enShape = shape(en.body);

let bad = 0;
for (const loc of LOCALES) {
  const mod = await import(`../data/blog/translations/${loc}.js?v=${Date.now()}`);
  const p = (mod.default.posts || {})[SLUG];
  if (!p) { console.log(`${loc}: MISSING`); bad++; continue; }

  const s = shape(p.body);
  const errs = [];
  if (s.types !== enShape.types) errs.push('block types differ');
  if (s.imgs !== enShape.imgs) errs.push('image paths differ');
  if (s.links !== enShape.links) errs.push('link targets differ');
  if (p.faqs?.items?.length !== en.faqs.items.length) errs.push('FAQ count');
  if (!p.title || !p.excerpt || !p.category || !p.readTime) errs.push('missing meta');
  const same = p.body.filter((b, i) => b.text && b.text === en.body[i]?.text).length;
  if (same > 0) errs.push(`${same} block(s) identical to English`);

  if (errs.length) { console.log(`${loc}: FAIL - ${errs.join('; ')}`); bad++; }
  else console.log(`${loc}: OK  (${p.body.length} blocks, ${p.faqs.items.length} FAQs)  "${p.title.slice(0, 45)}..."`);
}
console.log(bad === 0 ? '\nAll 7 locales OK.' : `\n${bad} locale(s) failed.`);
process.exit(bad === 0 ? 0 : 1);
