import { extractHeadings } from '@/lib/blog-toc';

// Table of contents for a blog article — anchor links to every h2/h3.
//
// Server component: it is a plain <nav> of in-page links, so it needs no
// client JS. Smooth scrolling comes from `scroll-behavior` in globals.css,
// which already respects prefers-reduced-motion.
//
// Rendered inside a <details> so it collapses on mobile (where a 10-item
// list would push the article below the fold) but stays open on desktop.
// `open` is set unconditionally and CSS closes it under 900px — a details
// element cannot be responsively opened any other way without client JS.

const CSS = `
.bp-toc {
  background: #F6EEDF;
  border: 1px solid rgba(107,74,51,0.16);
  border-left: 3px solid #C58E4A;
  border-radius: 4px;
  padding: 20px 24px;
  margin: 0 0 38px;
}
.bp-toc-sum {
  cursor: pointer;
  list-style: none;
  font-size: .74rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #C58E4A;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.bp-toc-sum::-webkit-details-marker { display: none; }
.bp-toc-chev { transition: transform .2s ease; font-size: 1rem; }
.bp-toc[open] .bp-toc-chev { transform: rotate(180deg); }
.bp-toc-list { list-style: none; margin: 16px 0 0; padding: 0; counter-reset: toc; }
.bp-toc-list li { margin: 0 0 9px; line-height: 1.45; }
.bp-toc-list li.lvl3 { padding-left: 20px; }
.bp-toc-list a {
  color: #4A3826;
  text-decoration: none;
  font-size: .93rem;
  border-bottom: 1px solid transparent;
  transition: color .15s, border-color .15s;
}
.bp-toc-list a:hover { color: #6B4A33; border-bottom-color: #C58E4A; }
.bp-toc-list li.lvl2 a::before {
  counter-increment: toc;
  content: counter(toc) ". ";
  color: #C58E4A;
  font-weight: 600;
}
@media print { .bp-toc { break-inside: avoid; } }
`;

export default function BlogToc({ body, label = 'On this page' }) {
  const headings = extractHeadings(body);
  // A 2-item TOC is noise, not navigation.
  if (headings.length < 3) return null;

  return (
    <details className="bp-toc" open>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <summary className="bp-toc-sum">
        <span>{label}</span>
        <span className="bp-toc-chev" aria-hidden="true">⌄</span>
      </summary>
      <nav aria-label={label}>
        <ol className="bp-toc-list">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 2 ? 'lvl2' : 'lvl3'}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
