import { SITE } from '@/data/site-config';

// Expert byline for blog articles.
//
// GEO/E-E-A-T rationale: generative engines and Google both weight named,
// attributable expertise far more heavily than anonymous "our team" copy.
// This box states who wrote the piece, what they actually do, and why they
// are in a position to know — and the matching Person node in the Article
// schema (see the blog post page) ties it to the same entity named on the
// About page and in the homepage Organization schema.
//
// Author data lives in data/blog-authors.js so one edit updates every post.

const CSS = `
.bp-author {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  background: #F6EEDF;
  border: 1px solid rgba(107,74,51,0.16);
  border-radius: 4px;
  padding: 24px 26px;
  margin: 46px 0 8px;
}
.bp-author-avatar {
  width: 60px; height: 60px; flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #6B4A33 0%, #C58E4A 100%);
  color: #F6EEDF;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-fraunces), Georgia, serif;
  font-size: 1.5rem; font-weight: 600;
  letter-spacing: -0.5px;
}
.bp-author-body { flex: 1; min-width: 0; }
.bp-author-eyebrow {
  font-size: .68rem; letter-spacing: 2.5px; text-transform: uppercase;
  color: #C58E4A; font-weight: 600; margin-bottom: 6px;
}
.bp-author-name {
  font-family: var(--font-fraunces), Georgia, serif;
  font-size: 1.12rem; font-weight: 600; color: #3D2A1F;
  margin: 0 0 2px; line-height: 1.3;
}
.bp-author-role { font-size: .84rem; color: #7A6450; margin-bottom: 10px; }
.bp-author-bio { font-size: .92rem; color: #5C4A3A; line-height: 1.7; margin: 0; }
.bp-author-rev {
  margin-top: 12px; padding-top: 12px;
  border-top: 1px solid rgba(107,74,51,0.14);
  font-size: .82rem; color: #7A6450;
}
@media (max-width: 640px) {
  .bp-author { flex-direction: column; gap: 14px; padding: 20px; }
}
@media print { .bp-author { break-inside: avoid; } }
`;

export default function BlogAuthorBox({ author, eyebrow = 'Written by', reviewedLabel }) {
  if (!author || !author.name) return null;

  const initials = author.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <aside className="bp-author">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="bp-author-avatar" aria-hidden="true">{initials}</div>
      <div className="bp-author-body">
        <div className="bp-author-eyebrow">{eyebrow}</div>
        <p className="bp-author-name">{author.name}</p>
        <div className="bp-author-role">
          {author.jobTitle}
          {author.company ? ` · ${author.company}` : ` · ${SITE.company.legalName}`}
        </div>
        <p className="bp-author-bio">{author.bio}</p>
        {reviewedLabel && (
          <div className="bp-author-rev">{reviewedLabel}</div>
        )}
      </div>
    </aside>
  );
}
