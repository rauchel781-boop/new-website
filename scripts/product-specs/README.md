# Product specification translations

Run from the repository root:

```powershell
node scripts/product-specs/generate.mjs
node scripts/product-specs/generate.mjs --check
```

The generator reads the English source products and existing seven-language product overlays. It preserves every existing `specs` object and supplies specifications only where an overlay has none. Terminology rows use the column order `source, de, es, fr, it, pt, ja, ko`. Existing aligned translations seed the dictionary; reviewed rows in the six lexicon files take priority.

Edit the appropriate lexicon when adding a source term. `{#}` placeholders preserve the original numeric sequence. Unknown terminology, missing locale cells, changed field keys, changed numeric values, or incorrect MOQ piece/set units stop generation before writing. The current approved MOQ is 200.

The generated `data/products/translations/specs.js` has no imports. Only server product pages should import its `getProductSpecTranslation(productRaw, locale)` helper. Keep existing overlay specifications first; use this helper when an overlay lacks `specs`. English returns the source specifications. The module rejects stale supplemental data if the underlying source specifications change, so regenerate after changing a source product.

`--check` verifies that generation would reproduce the checked-in module without writing. `--check-data` compares the generated data and helper while ignoring the introductory comments; it is useful when migrating generator documentation.
