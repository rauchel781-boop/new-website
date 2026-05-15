'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, localeNames } from '@/i18n/routing';
import { SITE } from '@/data/site-config';

// Mega-menu structure as raw data (no labels — labels come from translations).
// `key` matches the messages/<lang>.json `categories.<key>` entry.
const NAV_GROUPS = [
  {
    title: 'byUse',
    items: [
      { key: 'gift-packaging', href: '/products/gift-packaging' },
      { key: 'watch-jewelry',  href: '/products/watch-jewelry' },
      { key: 'tea-coffee',     href: '/products/tea-coffee' },
      { key: 'wine-whisky',    href: '/products/wine-whisky' },
      { key: 'kitchen-dining', href: '/products/kitchen-dining' },
      { key: 'garden-seed',    href: '/products/garden-seed' },
      { key: 'storage',        href: '/products/storage' },
    ],
  },
  {
    title: 'byStructure',
    items: [
      { key: 'hinged',      href: '/products/hinged' },
      { key: 'sliding-lid', href: '/products/sliding-lid' },
      { key: 'drawer',      href: '/products/drawer' },
      { key: 'magnetic',    href: '/products/magnetic' },
      { key: 'with-lock',   href: '/products/with-lock' },
    ],
  },
  {
    title: 'byMaterial',
    items: [
      { key: 'paulownia', href: '/products/paulownia' },
      { key: 'pine',      href: '/products/pine' },
      { key: 'bamboo',    href: '/products/bamboo' },
      { key: 'acacia',    href: '/products/acacia' },
      { key: 'walnut',    href: '/products/walnut' },
    ],
  },
];

const HEADER_CSS = `

.chic-hdr {
  --wd-deep:    #3D2A1F;
  --wd-mid:     #6B4A33;
  --wd-warm:    #C58E4A;
  --wd-light:   #D9B98F;
  --wd-cream:   #F6EEDF;
  --wd-sand:    #ECDFC6;
  --wd-ink:     #2A1B12;
  --wd-mute:    #7A6450;

  font-family: var(--font-jost), system-ui, sans-serif;
  position: sticky; top: 0; z-index: 50;
  width: 100%;
}

/* ── Utility bar ── */
.chic-hdr .utl {
  background: var(--wd-ink);
  color: rgba(217,185,143,0.78);
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  border-bottom: 1px solid rgba(197,142,74,0.15);
}
.chic-hdr .utl-inner {
  max-width: 1500px; margin: 0 auto;
  padding: 9px 32px;
  display: flex; align-items: center; justify-content: space-between; gap: 18px;
}
.chic-hdr .utl-l { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
.chic-hdr .utl-l span { display: inline-flex; align-items: center; gap: 6px; }
.chic-hdr .utl-l a { color: var(--wd-light); text-decoration: none; transition: color .2s; }
.chic-hdr .utl-l a:hover { color: var(--wd-warm); }
.chic-hdr .utl-r { display: flex; align-items: center; gap: 14px; color: rgba(217,185,143,0.55); }
.chic-hdr .utl-pill {
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid rgba(197,142,74,0.3); border-radius: 100px;
  padding: 3px 12px; font-size: 0.65rem; letter-spacing: 2px;
  color: var(--wd-warm); text-transform: uppercase;
}

/* ── Language switcher ── */
.chic-hdr .lang-wrap { position: relative; }
.chic-hdr .lang-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; color: var(--wd-light);
  border: 1px solid rgba(197,142,74,0.3);
  padding: 4px 10px;
  font-size: 0.66rem; letter-spacing: 1.5px; text-transform: uppercase;
  border-radius: 100px;
  cursor: pointer;
  font-family: inherit;
}
.chic-hdr .lang-btn:hover { border-color: var(--wd-warm); color: var(--wd-warm); }
.chic-hdr .lang-menu {
  position: absolute; top: 100%; right: 0; margin-top: 6px;
  background: var(--wd-ink);
  border: 1px solid rgba(197,142,74,0.3);
  border-radius: 4px;
  min-width: 160px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  display: none;
  z-index: 200;
  overflow: hidden;
}
.chic-hdr .lang-wrap.is-open .lang-menu { display: block; }
.chic-hdr .lang-menu a {
  display: block; padding: 10px 16px;
  font-size: 0.78rem; color: var(--wd-light);
  text-decoration: none;
  transition: background .15s, color .15s;
}
.chic-hdr .lang-menu a:hover, .chic-hdr .lang-menu a.is-active {
  background: rgba(197,142,74,0.18);
  color: var(--wd-warm);
}

/* ── Main bar ── */
.chic-hdr .bar {
  background: rgba(246,238,223,0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(197,142,74,0.18);
  transition: padding .25s ease, background .25s ease, box-shadow .25s ease;
}
.chic-hdr.scrolled .bar { background: rgba(246,238,223,0.98); box-shadow: 0 6px 24px rgba(61,42,31,0.08); }
.chic-hdr .bar-inner {
  max-width: 1500px; margin: 0 auto;
  padding: 14px 32px;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.chic-hdr .logo { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; }
.chic-hdr .logo img { height: 56px; width: auto; display: block; }
.chic-hdr.scrolled .logo img { height: 46px; }
.chic-hdr .logo-text {
  display: flex; flex-direction: column; line-height: 1;
}
.chic-hdr .logo-name {
  font-family: var(--font-playfair), serif; font-weight: 700;
  font-size: 1.55rem; color: var(--wd-deep); letter-spacing: 1px;
}
.chic-hdr .logo-tag {
  font-size: 0.55rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--wd-warm); margin-top: 4px; font-weight: 500;
}

/* ── Desktop nav ── */
.chic-hdr .nav { display: flex; align-items: center; gap: 4px; }
.chic-hdr .nav-item { position: relative; }
.chic-hdr .nav-link {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 12px 18px;
  text-decoration: none;
  color: var(--wd-deep);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  position: relative;
  transition: color .2s;
}
.chic-hdr .nav-link::after {
  content: ''; position: absolute;
  left: 18px; right: 18px; bottom: 6px; height: 1px;
  background: var(--wd-warm);
  transform: scaleX(0); transform-origin: left;
  transition: transform .25s ease;
}
.chic-hdr .nav-link:hover { color: var(--wd-warm); }
.chic-hdr .nav-link:hover::after { transform: scaleX(1); }
.chic-hdr .nav-caret {
  width: 8px; height: 8px;
  transition: transform .2s ease;
  fill: currentColor; opacity: 0.6;
}
.chic-hdr .nav-item:hover .nav-caret { transform: rotate(180deg); }

/* ── Mega menu ── */
.chic-hdr .mega {
  position: absolute; top: 100%; left: 50%;
  transform: translateX(-50%) translateY(-6px);
  width: 880px;
  background: var(--wd-cream);
  border: 1px solid rgba(197,142,74,0.2);
  border-radius: 4px;
  box-shadow: 0 30px 70px rgba(61,42,31,0.18);
  padding: 28px 30px;
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  opacity: 0; visibility: hidden;
  transition: opacity .25s ease, transform .25s ease, visibility .25s;
  z-index: 100;
}
.chic-hdr .nav-item:hover .mega,
.chic-hdr .mega:hover { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
.chic-hdr .mega-col h4 {
  font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--wd-warm); margin: 0 0 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(197,142,74,0.25);
  font-weight: 600;
}
.chic-hdr .mega-link {
  display: block;
  padding: 7px 6px;
  font-size: 0.85rem;
  color: var(--wd-deep);
  text-decoration: none;
  border-radius: 2px;
  transition: background .15s, color .15s, padding-left .15s;
}
.chic-hdr .mega-link:hover { background: var(--wd-sand); color: var(--wd-warm); padding-left: 12px; }

/* ── CTA button ── */
.chic-hdr .cta {
  background: var(--wd-warm); color: white;
  padding: 11px 22px;
  font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  text-decoration: none; border-radius: 2px;
  display: inline-flex; align-items: center; gap: 6px;
  transition: background .2s, transform .2s, box-shadow .2s;
  box-shadow: 0 6px 18px rgba(197,142,74,0.35);
  white-space: nowrap;
}
.chic-hdr .cta:hover { background: #D9A05E; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(197,142,74,0.5); }

/* ── Mobile toggle ── */
.chic-hdr .burger {
  display: none;
  width: 44px; height: 44px;
  border: 1px solid rgba(197,142,74,0.4);
  background: transparent;
  border-radius: 2px;
  align-items: center; justify-content: center;
  cursor: pointer;
  color: var(--wd-deep);
}
.chic-hdr .burger svg { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; }

/* ── Mobile drawer ── */
.chic-hdr .drawer {
  display: none;
  background: var(--wd-cream);
  border-top: 1px solid rgba(197,142,74,0.2);
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
.chic-hdr .drawer.is-open { display: block; }
.chic-hdr .drawer-inner { padding: 20px 28px 30px; }
.chic-hdr .drawer-link {
  display: block; padding: 14px 0;
  font-size: 1rem; font-weight: 500; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--wd-deep);
  text-decoration: none;
  border-bottom: 1px solid rgba(197,142,74,0.15);
}
.chic-hdr .drawer-sub { padding-left: 14px; padding-bottom: 14px; border-bottom: 1px solid rgba(197,142,74,0.15); }
.chic-hdr .drawer-sub-title {
  font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--wd-warm); margin: 14px 0 8px; font-weight: 600;
}
.chic-hdr .drawer-sub-link { display: block; padding: 6px 0; font-size: 0.88rem; color: var(--wd-mid); text-decoration: none; }
.chic-hdr .drawer-cta {
  display: block; margin-top: 20px;
  background: var(--wd-warm); color: white;
  padding: 14px 22px; text-align: center;
  font-size: 0.78rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  text-decoration: none; border-radius: 2px;
}

@media (max-width: 1100px) {
  .chic-hdr .nav, .chic-hdr .cta { display: none; }
  .chic-hdr .burger { display: inline-flex; }
}
@media (max-width: 720px) {
  .chic-hdr .utl-r .utl-pill { display: none; }
  .chic-hdr .utl-inner { padding: 8px 18px; }
  .chic-hdr .bar-inner { padding: 12px 18px; }
  .chic-hdr .logo img { height: 46px; }
  .chic-hdr .logo-name { font-size: 1.3rem; }
  .chic-hdr .utl-l { gap: 14px; font-size: 0.65rem; }
}
`;

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function WhatsAppMiniIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33z"/></svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname(); // path WITHOUT locale prefix

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e) => {
      if (!e.target.closest('.lang-wrap')) setLangOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [langOpen]);

  // Translated top-level nav (data-driven, mirrors the original NAV array
  // but pulls labels from the active locale's messages).
  const NAV = [
    { label: t('nav.home'),          href: '/' },
    { label: t('nav.products'),      href: '/products', megaGroups: NAV_GROUPS },
    { label: t('nav.about'),         href: '/about' },
    { label: t('nav.materialGuide'), href: '/material-guide' },
    { label: t('nav.blog'),          href: '/blog' },
    { label: t('nav.contact'),       href: '/contact' },
  ];

  return (
    <header className={`chic-hdr ${scrolled ? 'scrolled' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: HEADER_CSS }} />

      {/* ── Utility bar ── */}
      <div className="utl">
        <div className="utl-inner">
          <div className="utl-l">
            <span><MailIcon /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
            <span><WhatsAppMiniIcon /> <a href={SITE.whatsapp.chatUrl} target="_blank" rel="noopener noreferrer">{SITE.whatsapp.display}</a></span>
            <span><GlobeIcon /> {t('utility.export')}</span>
          </div>
          <div className="utl-r">
            <span className="utl-pill">✦ {t('utility.locations')}</span>

            {/* ── Language switcher ── */}
            <div className={`lang-wrap ${langOpen ? 'is-open' : ''}`}>
              <button
                className="lang-btn"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                <GlobeIcon /> {locale.toUpperCase()}
              </button>
              <div className="lang-menu" role="menu">
                {routing.locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname || '/'}
                    locale={l}
                    className={l === locale ? 'is-active' : ''}
                    onClick={() => setLangOpen(false)}
                  >
                    {localeNames[l]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="bar">
        <div className="bar-inner">
          <Link href="/" className="logo" aria-label="CHIC — home">
            <div className="logo-text">
              <span className="logo-name">CHIC</span>
              <span className="logo-tag">{t('meta.tagline')}</span>
            </div>
          </Link>

          <nav className="nav">
            {NAV.map((item, idx) => {
              const hasMega = !!item.megaGroups;
              return (
                <div key={idx} className="nav-item">
                  <Link href={item.href} className="nav-link">
                    {item.label}
                    {hasMega && (
                      <svg className="nav-caret" viewBox="0 0 12 12">
                        <path d="M6 8L1 3h10z" />
                      </svg>
                    )}
                  </Link>
                  {hasMega && (
                    <div className="mega">
                      {item.megaGroups.map((g) => (
                        <div className="mega-col" key={g.title}>
                          <h4>{t(`nav.${g.title}`)}</h4>
                          {g.items.map((sub) => (
                            <Link key={sub.key} href={sub.href} className="mega-link">
                              {t(`categories.${sub.key}`)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <Link href="/contact" className="cta">{t('cta.getQuote')} →</Link>

          <button
            className="burger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t('nav.toggleMenu')}
          >
            <svg viewBox="0 0 24 24">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`drawer ${mobileOpen ? 'is-open' : ''}`}>
        <div className="drawer-inner">
          {NAV.map((item, idx) => (
            <div key={idx}>
              <Link href={item.href} className="drawer-link" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
              {item.megaGroups && (
                <div className="drawer-sub">
                  {item.megaGroups.map((g) => (
                    <div key={g.title}>
                      <div className="drawer-sub-title">{t(`nav.${g.title}`)}</div>
                      {g.items.map((sub) => (
                        <Link
                          key={sub.key}
                          href={sub.href}
                          className="drawer-sub-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          → {t(`categories.${sub.key}`)}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="drawer-cta" onClick={() => setMobileOpen(false)}>
            {t('cta.getQuote')} →
          </Link>

          {/* Mobile language list */}
          <div className="drawer-sub" style={{ marginTop: 20 }}>
            <div className="drawer-sub-title">{t('language.label')}</div>
            {routing.locales.map((l) => (
              <Link
                key={l}
                href={pathname || '/'}
                locale={l}
                className="drawer-sub-link"
                onClick={() => setMobileOpen(false)}
                style={{ fontWeight: l === locale ? 600 : 400, color: l === locale ? 'var(--wd-warm)' : undefined }}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
