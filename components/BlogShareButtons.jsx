'use client';

// Inline share buttons for blog articles — Twitter / LinkedIn / Email /
// Copy Link. Renders into the post footer.
//
// Why this matters for B2B:
//   - LinkedIn is the #1 sharing destination for industry articles —
//     a sales lead's CFO posts a Cao-County-factory war-story article
//     to their LinkedIn and we get inbound. Frictionless share = more
//     of that flywheel.
//   - Email share is huge for procurement teams who forward articles
//     internally before deciding to inquire.
//   - "Copy link" handles every other surface (Slack, WeChat, Telegram,
//     WhatsApp) without us having to wire each one.
//
// No-tracking design:
//   - No share-count badges (would require third-party tracking pixels)
//   - No platform-specific SDKs — just simple share URLs the platforms
//     publicly support

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

export default function BlogShareButtons({ url, title }) {
  const t = useTranslations('blog');
  const [copied, setCopied] = useState(false);

  const shares = [
    {
      key: 'twitter',
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v15H.22V8zm7.83 0h4.37v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.33h-4.56v-7.39c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.91V23H8.05V8z"/>
        </svg>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent('share_click', { platform: 'copy_link', url });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Older browsers without Clipboard API — fallback to legacy execCommand
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="share-btns" role="group" aria-label="Share this article">
        {shares.map((s) => (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
            aria-label={s.label}
            title={s.label}
            onClick={() => trackEvent('share_click', { platform: s.key, url })}
          >
            {s.icon}
          </a>
        ))}
        <button
          type="button"
          className={`share-btn share-copy ${copied ? 'is-copied' : ''}`}
          onClick={copy}
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

const CSS = `
.share-btns {
  display: inline-flex; align-items: center; gap: 8px;
}
.share-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(107,74,51,0.25);
  background: rgba(246,238,223,0.4);
  color: #6B4A33;
  text-decoration: none;
  cursor: pointer;
  transition: border-color .15s, background .15s, color .15s, transform .15s;
}
.share-btn:hover {
  border-color: #C58E4A;
  background: rgba(197,142,74,0.12);
  color: #C58E4A;
  transform: translateY(-2px);
}
.share-btn svg { width: 16px; height: 16px; }
.share-btn.is-copied {
  background: rgba(42,157,74,0.15);
  border-color: #2a9d4a;
  color: #2a9d4a;
}
`;
