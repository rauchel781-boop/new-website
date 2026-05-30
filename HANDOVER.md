# Project Handover — custom-woodenbox.com

> Last updated: 2026-05-30. This document briefs an incoming Claude Code session on the state of this B2B custom wooden box manufacturer's website. Read end-to-end before making changes.

---

## 1. What this site is

- **Business**: B2B custom wooden box manufacturer.
- **Production**: 15,000 m² factory in Cao County (Shandong, China). 120+ employees.
- **Sales / export**: Xiamen, Fujian.
- **Standard commercial terms**:
  - MOQ: 300 pieces per design standard; 100 pieces on first-order test runs.
  - Lead time: 30–40 days after sample approval.
  - Inco-terms: FOB Xiamen (also EXW, CIF, DDP on request).
  - Payment: 30 / 70 split (deposit / balance against pre-shipment photos).
- **Active markets** (do not change without checking with the user): Germany, Italy, United States, United Kingdom, Canada, Poland.
- **Audience**: wholesale buyers, procurement leads, importers, brand owners. **Not** consumers — all copy must be written in B2B voice.

---

## 2. Tech stack

- **Framework**: Next.js 14, App Router.
- **i18n**: `next-intl` with 8 locales — `en` (source), `de`, `it`, `es`, `fr`, `pt`, `ja`, `ko`.
- **Deployment**: Coolify (auto-deploys on `git push` to `main`). Nixpacks build. Separate from GitHub Actions CI (which runs lint only).
- **Image pipeline**: `next/image` with `formats: ['image/avif','image/webp']` and 7-day cache TTL.
- **Analytics**: Microsoft Clarity (loaded `lazyOnload`).
- **Form backend**: EmailJS.
- **Repository on user's machine**: `D:\new-website` (Windows). User pushes manually via PowerShell.

---

## 3. Repository layout (the important bits)

```
data/
  site-config.js              # Source of business facts (factory size, MOQ, contacts, markets)
  categories.js               # 17 product categories — single source of truth
  categories/translations/    # Per-locale overlays for category data
  products/                   # /data/products/<slug>.js for each category (186 products total)
  products/translations/      # Per-locale product overlays + smart translation gating
  blog.js                     # Blog post source-of-truth (English)
  blog/translations/          # Per-locale blog overlays
  category-faqs/              # Category FAQ source + 7 translations
  page-faqs/                  # Info-page FAQ source + 7 translations
  testimonials.js             # Real customer testimonials (homepage)

app/
  [locale]/products/[slug]/page.js                 # Category landing-page template
  [locale]/products/[slug]/[product]/page.js       # PDP template
  [locale]/contact/page.js                         # Server wrapper for contact
  [locale]/contact/ContactClient.jsx               # Contact form + sections (CSR)
  [locale]/blog/page.js                            # Blog index
  [locale]/blog/[slug]/page.js                     # Blog post renderer
  [locale]/material-guide/page.js                  # Material guide page
  [locale]/wood-fabrication/page.js                # Capabilities page
  [locale]/capabilities/page.js                    # Capabilities page
  [locale]/about/page.js                           # About page
  [locale]/page.js                                 # Homepage
  sitemap.js                                       # Auto-generated sitemap
  robots.js                                        # robots.txt generator
  not-found.js                                     # 404

components/
  Header.js                   # Top nav + inquiry CTAs (desktop + mobile drawer)
  Footer.js                   # Footer with nav columns
  ProductRichBlock.jsx        # PDP rich description renderer
  ProductFaqBlock.jsx         # PDP FAQ renderer
  Testimonials.jsx            # Homepage testimonials
  JsonLd.jsx                  # JSON-LD <script> injector
  PageBreadcrumbLd.jsx        # 2-level BreadcrumbList for info pages
  IntroCarousel.js            # Homepage carousel (has prefers-reduced-motion guard)
  ClarityAnalytics.jsx        # Microsoft Clarity loader

lib/
  product-content.js          # Multi-locale templates for PDP rich description + FAQs
  og-card.js                  # Shared OpenGraph image generator
  use-emailjs.js              # EmailJS hook
  analytics.js                # Event tracking helper

messages/                     # next-intl JSON messages (8 locales)
public/                       # Static assets — images, fonts
SEO-AUDIT-2026-05.md          # Audit report from earlier in this engagement
```

---

## 4. Architectural conventions established in this engagement

These patterns were introduced during recent work. Stick to them.

### 4.1 `deepContent` block on category data

Optional field added to selected categories (`tea-coffee`, `sliding-lid`). Renders a long-form B2B buyer's guide section between the dark Specs strip and the FAQ on the category landing page.

```js
deepContent: {
  eyebrow: 'B2B sourcing guide',
  title: 'Sourcing ... wholesale: ...',
  blocks: [
    { type: 'p',   text: 'paragraph with [inline link](/path) tokens' },
    { type: 'img', src: '/path.webp', caption: 'figcaption text' },
    { type: 'h3',  text: 'Section heading' },
    // ...
  ],
}
```

- Block types currently supported: `p`, `img`, `h3`.
- Inline `[text](/path)` tokens in `p` blocks are parsed by `renderDeepParagraph()` (in `app/[locale]/products/[slug]/page.js`) and become `<Link>` elements with the active locale auto-prepended.
- To add a new block type, extend the renderer switch in the same file.

### 4.2 `seoTitle` / `seoDescription` per-category overrides

Optional fields on `categories.js` entries that override the default `${name} — CHIC Wooden Expert` template. Used today only on `sliding-lid` to surface high-intent B2B keywords in the `<title>`. Falls back to the default template when absent.

```js
'sliding-lid': {
  // ...
  seoTitle: 'Sliding Lid Wooden Boxes — Wholesale & Custom OEM Manufacturer | CHIC',
  seoDescription: '...',
}
```

### 4.3 Inquiry-CTA hash anchor pattern

- Form section on `/contact` has `id="inquiry"` + `scroll-margin-top: 80px`.
- **Inquiry-intent CTAs** (Get Quote, Send Inquiry, Request Samples) link to `/contact#inquiry`. The browser auto-scrolls to the form.
- **General-navigation links** (footer "Contact", header nav menu "Contact", 404 suggestion) link to plain `/contact`.
- Currently 7 inquiry CTAs use the hash (Header desktop + mobile, Material Guide bottom, Category page hero / gallery / final CTA, PDP).

### 4.4 Per-locale overlay pattern

English is the source-of-truth in `data/{categories,blog,products}.js`. Per-locale overlays in `data/{categories,blog,products}/translations/{locale}.js` ship partial overrides — any field absent falls back to the English source.

For PDP / category data, smart per-product gating via `hasFullProductTranslation()` in `lib/product-content.js` decides whether to render extended content for a locale (avoids mixed-language pages).

### 4.5 B2B voice (mandatory)

All marketing copy is written for **B2B procurement readers**, not B2C end users. Concretely:

- ✅ "wholesale buyers", "OEM run", "private-label", "your retailer's shelf", "your end customer's hand"
- ❌ "your kitchen", "$14 caddy on the shelf", "when you actually try to use them"

Reference real specs and markets as social proof: MOQ 300, 30–40 day lead time, FOB Xiamen, ISPM 15, CARB P2, EU REACH, FSC, EU EC 1935/2004, US FDA 21 CFR 175.300, Germany/Italy/US/UK/Canada/Poland.

### 4.6 Internal-link strategy

Every deepContent block should weave 2–5 internal links to:
- Sister category pages (`/products/{walnut,pine,bamboo,paulownia,sliding-lid,magnetic,hinged}`)
- The material guide (`/material-guide`)
- The inquiry form (`/contact#inquiry`)
- Other relevant categories (`/products/tea-coffee`, etc.)

These build topic-cluster signal Google reads and surface the inquiry CTA from buyer-intent content.

---

## 5. Recent work history (this engagement)

In rough order, all committed and pushed to `main`:

1. **18-dimension SEO audit** + **infrastructure improvements** — schema, sitemap, robots, OG cards, cache headers, accessibility (ARIA tabs, prefers-reduced-motion, form labels).
2. **Performance**: homepage / about / blog / category images converted to `next/image`, AVIF/WebP enabled, LCP improved from 4.1s → ~2.2s. Mobile PSI 84 → 91, Desktop 94.
3. **EEAT**: Organization schema enriched (foundingDate, certifications). 7 real customer testimonials added with attribution (refused to fabricate). 2-level BreadcrumbList added to all info pages.
4. **CI fix**: `.eslintrc.json` added — `next lint` was prompting interactively on CI.
5. **Info-page FAQs**: 24 unique Q&A per language × 8 languages added to about / material-guide / wood-fabrication / capabilities / products / contact / blog.
6. **PDP enrichment**: 186 products got per-product rich descriptions + FAQ blocks. Smart per-product translation gating across 8 locales (`lib/product-content.js`).
7. **Blog post**: 2026-word B2B sourcing playbook at `/blog/sourcing-custom-wooden-boxes-from-china-2026`. Translated into 7 locales (60 blocks each).
8. **Contact UX**: hero shrunk (60vh → 42vh), form moved above ways/clocks/locs, `id="inquiry"` + 7 CTA links updated to `/contact#inquiry`.
9. **tea-coffee deepContent** (v2): B2B-voice rewrite, 2 inline images (`/factory/warehouse.webp`, `/bamboo-box.webp`), wholesale/manufacturer keyword density, 4 paragraphs.
10. **sliding-lid landing page** (latest): 1131-word deepContent (11 blocks), expanded specs (6 → 9), use cases (6 → 10), FAQ (5 → 8). Targets 50+ B2B long-tails including the entire "sliding lid" cluster from GSC.

---

## 6. Open items / pending work

### Active / unresolved

- **🔴 "打不开" issue**: User reported a page doesn't open after commit `bbe1691` (sliding-lid landing). All static checks pass — categories.js parses, JSX compiles, images exist. Most likely: Coolify build failure OR runtime SSR error. **Need from user**: (1) which URL, (2) browser console error / screenshot, (3) Coolify deployment status.

### Queued / not started

- **Translate sliding-lid deepContent + extended FAQs** to 7 locales (currently EN-only with fallback).
- **Translate tea-coffee deepContent v2** to 7 locales (same).
- **GSC indexation audit**: non-English locales appear to have low coverage. Verify sitemap submission per locale, check hreflang correctness.
- **Suggest images for sliding-lid landing**: user said "use existing images for now". When real photos are available, swap the 4 deepContent figures.

### Long-term suggestions raised but not committed to

- Real customer registration number / VAT (trust signals).
- Real author bios for blog (E-E-A-T).
- Programmatic SEO landing pages (currently low content volume — risky until catalogue depth grows).
- AI visibility (GEO/AEO) audit — there's a skill for this (`searchfit-seo:ai-visibility`).

---

## 7. Known gotchas (read this before editing)

### 7.1 Mirror sync between Windows ↔ Linux sandbox (CRITICAL)

The user runs Cowork mode. The file tools (Read/Write/Edit) target Windows `D:\new-website`. The bash tool runs in a Linux sandbox with the project mounted at `/sessions/.../mnt/new-website/`. The mirror sync between them is **flaky**:

- Edits larger than ~1 KB can be **truncated mid-content** during sync.
- After truncation, `git status` may **not** detect the change (stale stat-cache).
- The Read tool may still report the file as having the (truncated) content.

**Workaround that works reliably**: do all multi-line edits via Python heredoc through bash. Always validate with `node --input-type=module -e "import('./...')"` after write.

```bash
python3 << 'PY_EOF'
import pathlib
p = pathlib.Path('data/categories.js')
src = p.read_text(encoding='utf-8')
# ... transform src ...
p.write_text(src, encoding='utf-8')
PY_EOF
```

If the file tool reports success but `git status` shows no diff, the mirror lost the write. Restore from git (`git checkout HEAD -- path`) and re-apply via Python.

### 7.2 The user pushes from PowerShell, not the sandbox

The sandbox cannot push to GitHub. Workflow:

```powershell
# In the user's PowerShell, after I commit:
cd D:\new-website
git pull       # ← important: pulls down my commits from this side first
git push       # ← pushes to GitHub → Coolify auto-deploys
```

### 7.3 Coolify is separate from GitHub Actions

GitHub Actions runs `next lint` only. Coolify runs the full build + deploy. A green CI badge ≠ Coolify deploy success.

### 7.4 `hasProducts: true` is NOT required

Several category entries lack `hasProducts: true` (e.g. `sliding-lid`). The page renders products by looking up `PRODUCTS_BY_CATEGORY[slug]` in `app/[locale]/products/[slug]/page.js`, which doesn't depend on the flag. The flag is legacy.

### 7.5 Inline image paths

All deepContent `img` blocks use paths that exist in `/public/`. Verify before committing:

```bash
for img in $(grep -oP '"src": "\K[^"]+' data/categories.js); do
  [ -f "public$img" ] && echo "✓ $img" || echo "✗ MISSING $img"
done
```

### 7.6 `<Link>` from next-intl handles hashes

`<Link href="/contact#inquiry">` works as expected — the hash is preserved and the active-locale prefix is auto-prepended.

---

## 8. Useful commands

### Validate a data file after writing

```bash
node --input-type=module -e "
  import('./data/categories.js?'+Date.now()).then(m => {
    console.log('cats:', Object.keys(m.CATEGORIES).length);
  }).catch(e => { console.error(e.message); process.exit(1); });
"
```

### Validate JSX without running the full Next build

```bash
node -e "
const fs=require('fs'), ts=require('typescript');
const src=fs.readFileSync('app/[locale]/products/[slug]/page.js','utf8');
const r=ts.transpileModule(src,{compilerOptions:{jsx:ts.JsxEmit.Preserve,target:ts.ScriptTarget.ESNext,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
if(r.diagnostics && r.diagnostics.length){r.diagnostics.forEach(d=>console.error(ts.flattenDiagnosticMessageText(d.messageText,'\\n'))); process.exit(1);}
console.log('JSX OK, '+src.split('\\n').length+' lines');
"
```

### Find all inquiry CTAs vs nav links

```bash
# Inquiry CTAs (should be /contact#inquiry)
grep -rn '/contact#inquiry' app/ components/

# Plain /contact links (only nav / metadata expected)
grep -rEn '"/contact"' app/ components/
```

### Restore a broken file from git

```bash
rm path/to/file && git checkout HEAD -- path/to/file
```

---

## 9. Reference contacts in `data/site-config.js`

- Email, WhatsApp, WeChat, Alibaba store, social handles — all live here.
- Two physical addresses: Cao County (factory) and Xiamen (sales).
- This file is the source of business facts cited throughout copy. **Do not invent new specs** — pull from here.

---

## 10. If the user asks for something not covered

- **New deepContent on another category**: follow the `tea-coffee` and `sliding-lid` pattern in `data/categories.js`. Renderer already supports it.
- **New blog post**: edit `data/blog.js`. Block types supported by `app/[locale]/blog/[slug]/page.js`: `p`, `h2`, `h3`, `img`, `quote`, `list`, `stats`, `table`. Translation overlays go in `data/blog/translations/`.
- **New product**: add to the right `data/products/<category>.js` file. Per-locale translation overlays go in `data/products/translations/`. Smart gating in `lib/product-content.js` decides whether to render extended content.
- **New language**: add to `messages/`, `i18n/`, every `data/*/translations/`, and the locale arrays in `next.config.js` / `i18n/seo.js`.

---

## 11. Quick start for the incoming Claude

1. Read this file end-to-end.
2. `cat data/site-config.js` — get the business facts.
3. `cat SEO-AUDIT-2026-05.md` — see what was audited and improved.
4. Check `git log --oneline -20` — see recent commits.
5. If user has a specific ask, find the right file via the layout map in §3.
6. **Before any edit larger than 1 KB**: use Python via bash heredoc (see §7.1).
7. **Always validate** with `node` after writing.
8. **B2B voice mandatory** — re-read §4.5 if in doubt.

Welcome aboard.
