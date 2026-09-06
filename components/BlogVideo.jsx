'use client';

import { useState } from 'react';

// Lazy YouTube embed for blog articles.
//
// Deliberately NOT a plain <iframe>. A YouTube iframe pulls roughly a
// megabyte of script before the visitor has decided to watch anything, and
// this site fought hard to get its mobile Lighthouse score into the green
// (84 → 91 in the May performance pass). So this renders a facade — the
// poster frame plus a play button — and only swaps in the real iframe when
// someone actually clicks. Nothing from youtube.com is requested until then.
//
// The poster comes from YouTube's own thumbnail CDN and uses a plain <img>
// rather than next/image on purpose: next/image would require adding
// img.youtube.com to `images.remotePatterns` in next.config.js, and one
// static thumbnail is not worth widening that allow-list.
//
// The matching VideoObject schema is emitted by the article page, not here,
// so the JSON-LD stays server-rendered.

const CSS = `
.bp-video { margin: 40px 0; }
.bp-video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #2A1B12;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(107,74,51,0.2);
}
.bp-video-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bp-video-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
.bp-video-btn {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(31,20,12,0.32);
  border: 0; cursor: pointer; padding: 0;
  transition: background .2s ease;
}
.bp-video-btn:hover { background: rgba(31,20,12,0.16); }
.bp-video-btn:focus-visible { outline: 3px solid #C58E4A; outline-offset: -3px; }
.bp-video-play {
  width: 76px; height: 54px;
  border-radius: 12px;
  background: #C58E4A;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 26px rgba(0,0,0,0.32);
  transition: transform .2s ease, background .2s ease;
}
.bp-video-btn:hover .bp-video-play { transform: scale(1.06); background: #D9B98F; }
.bp-video-play svg { width: 26px; height: 26px; fill: #2A1B12; margin-left: 3px; }
.bp-video-cap {
  font-size: .86rem; color: #7A6450; margin-top: 12px;
  font-style: italic; line-height: 1.6;
}
@media print {
  .bp-video-btn { display: none; }
  .bp-video-frame { break-inside: avoid; }
}
`;

export default function BlogVideo({ youtubeId, title, caption, playLabel = 'Play video' }) {
  const [playing, setPlaying] = useState(false);
  if (!youtubeId) return null;

  return (
    <div className="bp-video">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="bp-video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt={title || ''}
              loading="lazy"
              decoding="async"
              width="1280"
              height="720"
            />
            <button
              type="button"
              className="bp-video-btn"
              onClick={() => setPlaying(true)}
              aria-label={`${playLabel}: ${title || ''}`.trim()}
            >
              <span className="bp-video-play" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          </>
        )}
      </div>
      {caption && <p className="bp-video-cap">{caption}</p>}
    </div>
  );
}
