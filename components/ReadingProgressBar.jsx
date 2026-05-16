'use client';

// Reading progress bar — pinned to the top of the viewport, fills from
// 0–100% as the user scrolls through a long article. A small but
// satisfying piece of feedback that long-form B2B readers expect on
// modern editorial sites (NYT, Stripe Press, Vercel blog).
//
// Implementation notes:
//   - Throttled via requestAnimationFrame so we don't burn CPU on
//     every scroll pixel
//   - Uses `passive: true` listener — never blocks scroll on mobile
//   - Single 3-pixel wood-tone bar; doesn't shift layout (CLS-safe
//     because it's position: fixed)
//   - Disappears at top of page so the header isn't visually cluttered

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollMax = (doc.scrollHeight || 0) - (window.innerHeight || 0);
      if (scrollMax <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.max(0, Math.min(100, (scrollTop / scrollMax) * 100));
      setProgress(pct);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        compute();
        rafId = null;
      });
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Render nothing until user has scrolled a bit — keeps the header
  // chrome quiet on first paint.
  if (progress < 1) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="reading-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Reading progress"
      >
        <div
          className="reading-progress-fill"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </>
  );
}

const CSS = `
.reading-progress {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  z-index: 999;
  background: transparent;
  pointer-events: none;
}
.reading-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #C58E4A 0%, #D9A05E 100%);
  transform-origin: left;
  transform: scaleX(0);
  will-change: transform;
  transition: transform 80ms linear;
}
`;
