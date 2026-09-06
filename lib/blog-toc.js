// Shared heading-ID logic for blog articles.
//
// The table of contents and the rendered <h2> elements must agree on every
// anchor id, so both import from here rather than each deriving their own.
//
// IDs are POSITIONAL (`s1`, `s2`, …), not slugified from the heading text.
// That is deliberate: this site ships in 8 languages including Japanese and
// Korean, where slugifying the heading text yields either an empty string or
// a percent-encoded mess. A positional id is stable, identical across every
// locale, and keeps a shared anchor link working no matter which translation
// the reader is on.

export function headingId(index) {
  return `s${index}`;
}

// Walk a post body and return [{ id, text, level }] for every h2/h3.
// h3s are included so the TOC can nest one level; callers that only want the
// top level can filter on `level === 2`.
export function extractHeadings(body) {
  if (!Array.isArray(body)) return [];
  const out = [];
  let n = 0;
  for (const block of body) {
    if (!block || (block.type !== 'h2' && block.type !== 'h3')) continue;
    n += 1;
    out.push({
      id: headingId(n),
      text: block.text,
      level: block.type === 'h2' ? 2 : 3,
    });
  }
  return out;
}

// Same counter as extractHeadings, but keyed by the block's position in the
// body array — renderBlock needs to know "this is the Nth heading" while it
// iterates the whole body (paragraphs included).
export function buildHeadingIdMap(body) {
  const map = new Map();
  if (!Array.isArray(body)) return map;
  let n = 0;
  body.forEach((block, i) => {
    if (block && (block.type === 'h2' || block.type === 'h3')) {
      n += 1;
      map.set(i, headingId(n));
    }
  });
  return map;
}
