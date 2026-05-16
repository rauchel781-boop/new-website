'use client';

// Search modal — opened by header search button OR by Cmd/Ctrl+K
// keyboard shortcut. Loads the per-locale search index on first open
// (then caches it for the session), runs in-browser substring +
// word-boundary fuzzy matching.
//
// Why no Fuse.js / lunr / search library:
//   - Bundle size: a hand-rolled scorer is ~50 LOC and zero KB extra
//   - The index is small (~213 entries) so even a naïve O(n × terms)
//     scorer runs sub-1ms in a 60Hz event loop budget
//   - Total client cost: ~5 KB of code + ~42 KB index = 47 KB,
//     only loaded once the user actually opens search
//
// Result ranking:
//   - Exact title match: +1000
//   - Title startsWith first query word: +500
//   - Each query word found in title: +30 per match
//   - Each query word found in text: +5 per match
//   - Type weighting: product > category > blog (B2B priors)

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';

const TYPE_WEIGHT = { product: 1.2, category: 1.1, blog: 1.0 };

function score(entry, queryWords) {
  if (!queryWords.length) return 0;
  const title = (entry.title || '').toLowerCase();
  const text = (entry.text || '').toLowerCase();
  const fullQuery = queryWords.join(' ');

  let s = 0;
  if (title === fullQuery) s += 1000;
  if (title.startsWith(queryWords[0])) s += 500;
  for (const w of queryWords) {
    if (!w) continue;
    // word boundary match in title (e.g. "wal" matches "walnut")
    if (new RegExp('\\b' + escapeRegExp(w), 'i').test(title)) s += 30;
    // substring in text
    if (text.includes(w)) s += 5;
  }
  s *= TYPE_WEIGHT[entry.type] || 1.0;
  return s;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function SearchModal({ open, onClose }) {
  const t = useTranslations('search');
  const locale = useLocale();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const inputRef = useRef(null);

  // Fetch the index lazily on first open
  useEffect(() => {
    if (!open || index) return;
    setLoading(true);
    fetch(`/search-data/${locale}`)
      .then((r) => r.json())
      .then((data) => setIndex(data))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, [open, locale, index]);

  // Auto-focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Esc to close, Arrow keys to navigate, Enter to open
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const r = results[highlightIdx];
        if (r) goTo(r);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  // Compute results
  const results = useMemo(() => {
    if (!index || !query.trim()) return [];
    const words = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 2);
    if (!words.length) return [];
    return index
      .map((e) => ({ entry: e, s: score(e, words) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.entry);
  }, [index, query]);

  // Reset highlight when results change
  useEffect(() => {
    setHighlightIdx(0);
  }, [query]);

  // Track search queries to GA4 — debounced 800ms so we capture the
  // final term a user typed (not every keystroke). Only fire for
  // queries ≥ 3 chars to avoid noise. The query string itself is
  // sent as event_label — useful for content/catalog gap analysis
  // (what visitors search for that doesn't exist yet).
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 3) return;
    const id = setTimeout(() => {
      trackEvent('search_query', {
        query: trimmed,
        result_count: results.length,
        locale,
      });
    }, 800);
    return () => clearTimeout(id);
  }, [query, results.length, locale]);

  function goTo(result) {
    // Track the query → result click so we can correlate searches
    // to actual product / blog page visits in GA4.
    if (result?.type && result?.url) {
      trackEvent('search_result_click', {
        query: query.trim(),
        result_type: result.type,
        result_url: result.url,
      });
    }
    // result.url is absolute path with locale already, but next-intl
    // Link/router expects locale-less paths. Strip the /{locale} prefix.
    const locless = result.url.replace(new RegExp(`^/${locale}`), '');
    router.push(locless || '/');
    onClose();
    setQuery('');
  }

  if (!open) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="srch-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={t('openAria')}
      >
        <div className="srch-panel" onClick={(e) => e.stopPropagation()}>
          <div className="srch-input-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="srch-icon" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              className="srch-input"
              placeholder={t('placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button
              type="button"
              className="srch-close"
              onClick={onClose}
              aria-label={t('closeAria')}
            >
              Esc
            </button>
          </div>

          <div className="srch-body">
            {loading && <div className="srch-status">…</div>}
            {!loading && query.trim() && results.length === 0 && (
              <div className="srch-empty">
                <div className="srch-empty-title">{t('noResults')}</div>
                <div className="srch-empty-hint">{t('noResultsHint')}</div>
                <button
                  type="button"
                  className="srch-empty-btn"
                  onClick={() => goTo({ url: `/${locale}/products` })}
                >
                  {t('browseCatalog')} →
                </button>
              </div>
            )}
            {results.length > 0 && (
              <>
                <div className="srch-count">
                  {t('resultCount', { n: results.length })}
                </div>
                <ul className="srch-list">
                  {results.map((r, i) => (
                    <li
                      key={r.url}
                      className={`srch-item ${i === highlightIdx ? 'is-active' : ''}`}
                      onMouseEnter={() => setHighlightIdx(i)}
                      onClick={() => goTo(r)}
                    >
                      <div className="srch-item-type">
                        {r.type === 'product' && t('typeProduct')}
                        {r.type === 'category' && t('typeCategory')}
                        {r.type === 'blog' && t('typeBlog')}
                      </div>
                      <div className="srch-item-body">
                        <div className="srch-item-title">{r.title}</div>
                        {r.text && <div className="srch-item-text">{r.text.slice(0, 120)}…</div>}
                      </div>
                      <div className="srch-item-arrow">→</div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
.srch-backdrop {
  position: fixed; inset: 0;
  z-index: 1000;
  background: rgba(20,12,8,0.65);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12vh 16px 16px;
  animation: srch-fadein .15s ease;
}
@keyframes srch-fadein { from { opacity: 0; } to { opacity: 1; } }

.srch-panel {
  width: 100%; max-width: 640px;
  background: #F6EEDF;
  border-radius: 8px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.4);
  overflow: hidden;
  display: flex; flex-direction: column;
  max-height: 70vh;
}
.srch-input-row {
  display: flex; align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(107,74,51,0.18);
  gap: 14px;
}
.srch-icon { width: 22px; height: 22px; color: #6B4A33; flex-shrink: 0; }
.srch-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1.05rem;
  color: #2A1B12;
  font-family: inherit;
}
.srch-input::placeholder { color: #7A6450; }
.srch-close {
  border: 1px solid rgba(107,74,51,0.3);
  background: rgba(246,238,223,0.5);
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: #6B4A33;
  cursor: pointer;
  font-family: inherit;
}
.srch-close:hover { background: rgba(246,238,223,0.9); }

.srch-body {
  flex: 1;
  overflow-y: auto;
}
.srch-status { padding: 30px; text-align: center; color: #7A6450; }
.srch-count {
  padding: 12px 20px;
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #7A6450;
  font-weight: 600;
  border-bottom: 1px solid rgba(107,74,51,0.1);
}
.srch-list {
  list-style: none; margin: 0; padding: 0;
}
.srch-item {
  display: flex; align-items: center;
  padding: 14px 20px;
  gap: 14px;
  cursor: pointer;
  border-bottom: 1px solid rgba(107,74,51,0.08);
  transition: background .15s;
}
.srch-item.is-active, .srch-item:hover {
  background: rgba(197,142,74,0.12);
}
.srch-item-type {
  font-size: 0.55rem; letter-spacing: 2px; text-transform: uppercase;
  color: #C58E4A;
  font-weight: 700;
  width: 80px; flex-shrink: 0;
}
.srch-item-body { flex: 1; min-width: 0; }
.srch-item-title {
  font-family: var(--font-fraunces), serif;
  font-size: 0.98rem; font-weight: 600;
  color: #3D2A1F;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.srch-item-text {
  font-size: 0.78rem; color: #7A6450;
  margin-top: 3px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.srch-item-arrow {
  color: #C58E4A;
  font-size: 1rem;
  flex-shrink: 0;
  opacity: 0; transition: opacity .15s, transform .15s;
}
.srch-item.is-active .srch-item-arrow,
.srch-item:hover .srch-item-arrow { opacity: 1; transform: translateX(2px); }

.srch-empty {
  padding: 40px 20px;
  text-align: center;
}
.srch-empty-title {
  font-family: var(--font-fraunces), serif;
  font-size: 1.05rem;
  color: #3D2A1F;
  margin-bottom: 8px;
}
.srch-empty-hint { font-size: 0.85rem; color: #7A6450; margin-bottom: 18px; }
.srch-empty-btn {
  background: #C58E4A; color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.srch-empty-btn:hover { background: #D9A05E; }

@media (max-width: 640px) {
  .srch-backdrop { padding: 8vh 8px 8px; }
  .srch-panel { max-height: 84vh; }
  .srch-item-type { width: 60px; font-size: 0.5rem; }
}
`;
