'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE, isEmailJSConfigured } from '@/data/site-config';
import { useEmailJS } from '@/lib/use-emailjs';

const FOOTER_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Jost:wght@300;400;500;600&display=swap');

.chic-ftr {
  --wd-deep:    #3D2A1F;
  --wd-mid:     #6B4A33;
  --wd-warm:    #C58E4A;
  --wd-light:   #D9B98F;
  --wd-cream:   #F6EEDF;
  --wd-ink:     #2A1B12;
  --wd-charcoal:#1F140C;

  font-family: 'Jost', system-ui, sans-serif;
  background: linear-gradient(180deg, var(--wd-ink) 0%, var(--wd-charcoal) 100%);
  color: rgba(217,185,143,0.7);
  position: relative;
  overflow: hidden;
}
.chic-ftr::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg,
    transparent 0, transparent 90px,
    rgba(197,142,74,0.04) 90px, rgba(197,142,74,0.04) 91px);
  pointer-events: none;
}
.chic-ftr::after {
  content: 'CHIC';
  position: absolute; top: 32px; right: -18px;
  font-family: 'Playfair Display', serif;
  font-weight: 700; font-size: 11rem;
  color: rgba(197,142,74,0.04);
  line-height: 1; pointer-events: none;
  letter-spacing: 6px;
}

/* Newsletter strip */
.chic-ftr .news {
  position: relative; z-index: 1;
  background: linear-gradient(135deg, var(--wd-deep) 0%, var(--wd-mid) 50%, var(--wd-deep) 100%);
  border-bottom: 1px solid rgba(197,142,74,0.18);
}
.chic-ftr .news-inner {
  max-width: 1500px; margin: 0 auto;
  padding: 36px 60px;
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: center;
}
.chic-ftr .news-text { color: var(--wd-cream); }
.chic-ftr .news-eyebrow {
  font-size: 0.66rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--wd-warm); margin-bottom: 8px; font-weight: 600;
}
.chic-ftr .news-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem; line-height: 1.3; margin: 0;
}
.chic-ftr .news-form { display: flex; gap: 10px; flex-direction: column; }
.chic-ftr .news-row { display: flex; gap: 10px; }
.chic-ftr .news-input {
  flex: 1;
  background: rgba(20,12,8,0.55);
  border: 1px solid rgba(217,185,143,0.25);
  color: var(--wd-cream);
  padding: 14px 18px;
  font-size: 0.85rem;
  border-radius: 2px;
  font-family: inherit;
  transition: border-color .2s, background .2s;
}
.chic-ftr .news-input::placeholder { color: rgba(217,185,143,0.45); }
.chic-ftr .news-input:focus { outline: none; border-color: var(--wd-warm); background: rgba(20,12,8,0.75); }
.chic-ftr .news-btn {
  background: var(--wd-warm); color: white;
  padding: 14px 26px;
  font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
  border: none; border-radius: 2px; cursor: pointer;
  transition: background .2s, transform .2s, opacity .2s;
  font-family: inherit;
  white-space: nowrap;
}
.chic-ftr .news-btn:hover { background: #D9A05E; transform: translateY(-2px); }
.chic-ftr .news-btn:disabled { opacity: 0.5; cursor: wait; transform: none; }
.chic-ftr .news-msg { font-size: 0.75rem; letter-spacing: 1px; color: var(--wd-light); margin: 0; }
.chic-ftr .news-msg.error { color: #E8A87C; }

/* Main grid */
.chic-ftr .main {
  position: relative; z-index: 1;
  max-width: 1500px; margin: 0 auto;
  padding: 80px 60px 60px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 60px;
}
.chic-ftr .col-brand { padding-right: 20px; }
.chic-ftr .brand-row { display: inline-flex; align-items: center; gap: 14px; text-decoration: none; margin-bottom: 22px; }
.chic-ftr .brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem; color: var(--wd-cream); font-weight: 700; letter-spacing: 1px;
  line-height: 1;
}
.chic-ftr .brand-tag {
  display: block; font-size: 0.55rem; letter-spacing: 3px;
  color: var(--wd-warm); text-transform: uppercase;
  margin-top: 6px; font-family: 'Jost', sans-serif; font-weight: 500;
}
.chic-ftr .brand-blurb {
  font-size: 0.88rem; line-height: 1.85; color: rgba(217,185,143,0.65);
  font-weight: 300; margin-bottom: 24px; max-width: 380px;
}
.chic-ftr .badges { display: flex; gap: 8px; flex-wrap: wrap; }
.chic-ftr .badge {
  font-size: 0.6rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--wd-light);
  border: 1px solid rgba(197,142,74,0.3);
  padding: 5px 10px; border-radius: 100px;
  font-weight: 500;
}

.chic-ftr .col h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem; color: var(--wd-cream);
  margin: 0 0 22px; font-weight: 500;
  position: relative; padding-bottom: 14px;
}
.chic-ftr .col h4::after {
  content: ''; position: absolute;
  left: 0; bottom: 0; width: 32px; height: 2px;
  background: var(--wd-warm);
}
.chic-ftr .col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 11px; }
.chic-ftr .col a {
  color: rgba(217,185,143,0.7);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color .2s, padding-left .2s;
  display: inline-flex; align-items: center; gap: 6px;
}
.chic-ftr .col a::before { content: '→'; color: var(--wd-warm); opacity: 0; transition: opacity .2s; }
.chic-ftr .col a:hover { color: var(--wd-warm); padding-left: 4px; }
.chic-ftr .col a:hover::before { opacity: 1; }

/* contact column variants */
.chic-ftr .ct-row {
  display: flex; gap: 12px; align-items: flex-start;
  margin-bottom: 16px;
  font-size: 0.85rem; line-height: 1.65;
  color: rgba(217,185,143,0.7);
}
.chic-ftr .ct-icon {
  width: 32px; height: 32px; flex-shrink: 0;
  border: 1px solid rgba(197,142,74,0.3); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--wd-warm);
  margin-top: 2px;
}
.chic-ftr .ct-row a { color: var(--wd-cream); text-decoration: none; transition: color .2s; padding-left: 0; }
.chic-ftr .ct-row a::before { content: ''; }
.chic-ftr .ct-row a:hover { color: var(--wd-warm); padding-left: 0; }
.chic-ftr .ct-label {
  display: block; font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--wd-warm); font-weight: 600; margin-bottom: 4px;
}
.chic-ftr .ct-note { display: block; font-size: 0.7rem; color: rgba(217,185,143,0.5); margin-top: 2px; font-style: italic; }

/* socials */
.chic-ftr .socials { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
.chic-ftr .soc {
  width: 38px; height: 38px;
  border: 1px solid rgba(217,185,143,0.25);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--wd-light);
  text-decoration: none;
  transition: all .2s;
  padding-left: 0;
}
.chic-ftr .soc::before { content: ''; }
.chic-ftr .soc:hover { border-color: var(--wd-warm); background: var(--wd-warm); color: white; transform: translateY(-2px); padding-left: 0; }
.chic-ftr .soc svg { width: 16px; height: 16px; }

/* bottom bar */
.chic-ftr .bot {
  position: relative; z-index: 1;
  border-top: 1px solid rgba(197,142,74,0.15);
}
.chic-ftr .bot-inner {
  max-width: 1500px; margin: 0 auto;
  padding: 22px 60px;
  display: flex; justify-content: space-between; align-items: center; gap: 18px;
  flex-wrap: wrap;
  font-size: 0.72rem; letter-spacing: 1px;
  color: rgba(217,185,143,0.5);
}
.chic-ftr .bot-r { display: flex; gap: 18px; align-items: center; }
.chic-ftr .bot-cert {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--wd-warm);
  font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
}

@media (max-width: 1100px) {
  .chic-ftr .news-inner { grid-template-columns: 1fr; padding: 30px 32px; gap: 22px; }
  .chic-ftr .main { grid-template-columns: 1fr 1fr; gap: 48px 40px; padding: 60px 32px 40px; }
  .chic-ftr .col-brand { grid-column: 1 / -1; padding-right: 0; }
  .chic-ftr .bot-inner { padding: 22px 32px; }
}
@media (max-width: 640px) {
  .chic-ftr .main { grid-template-columns: 1fr; gap: 40px; padding: 50px 24px 30px; }
  .chic-ftr .news-row { flex-direction: column; }
  .chic-ftr .news-btn { width: 100%; }
  .chic-ftr .bot-inner { flex-direction: column; padding: 20px 24px; text-align: center; }
}
`;

// ─── ICONS ───
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55h-.01a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33zm4.02-5.49c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.11-.93-.34-1.77-1.09a6.7 6.7 0 0 1-1.23-1.53c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.05-.11-.5-1.21-.69-1.65-.18-.43-.36-.37-.5-.38-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.15.91 2.3.11.15 1.57 2.4 3.81 3.36.53.23.95.37 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.31-.54 1.5-1.06.18-.52.18-.96.13-1.06-.05-.1-.2-.15-.42-.26z"/></svg>
  );
}
function WeChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 13.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9.7 3C5.45 3 2 5.85 2 9.36c0 1.87.97 3.55 2.55 4.7-.13.4-.5 1.55-.55 1.78-.06.3.27.46.49.32.18-.11 1.6-1.05 1.99-1.31.65.18 1.33.28 2.04.3-.1-.45-.16-.92-.16-1.4C8.36 10.5 11.85 8 16.13 8c.32 0 .63.02.93.05C16.31 5.07 13.31 3 9.7 3zm12.3 11.06c0-2.91-2.91-5.27-6.5-5.27S9 11.15 9 14.06c0 2.92 2.91 5.27 6.5 5.27.74 0 1.45-.1 2.1-.28.34.21 1.55.94 1.7 1.03.18.11.45-.01.4-.27-.04-.18-.36-1.1-.46-1.43A4.99 4.99 0 0 0 22 14.06zm-8.45-.81a.81.81 0 1 1 0-1.62.81.81 0 0 1 0 1.62zm4 0a.81.81 0 1 1 0-1.62.81.81 0 0 1 0 1.62z"/></svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v15H.22V8zm7.83 0h4.37v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.33h-4.56v-7.39c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.91V23H8.05V8z"/></svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 16 24 12 24 12s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
  );
}
function AlibabaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.4l-3-2.5 1-1.2 2 1.7 4.4-4.4 1.2 1.2-5.6 5.2zM12 7.5c-1.4 0-2.5 1.1-2.5 2.5h-2c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5h-2c0-1.4-1.1-2.5-2.5-2.5z"/></svg>
  );
}

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const { ready, send } = useEmailJS();
  const [subEmail, setSubEmail] = useState('');
  const [subState, setSubState] = useState('idle'); // idle | sending | done | error
  const [subMsg, setSubMsg] = useState('');

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!subEmail) return;
    setSubState('sending');
    setSubMsg('');

    if (isEmailJSConfigured() && ready) {
      try {
        await send(SITE.emailjs.newsletterTemplateId, {
          email: subEmail,
          source: 'Footer newsletter',
        });
        setSubState('done');
        setSubMsg('✓ Thanks — you\'re on the list. We\'ll be in touch.');
        setSubEmail('');
      } catch (err) {
        setSubState('error');
        setSubMsg('Something went wrong. Please email us directly.');
      }
    } else {
      // Fallback: open mail client
      const subject = encodeURIComponent('Newsletter subscription');
      const body = encodeURIComponent(`Please add me to the CHIC newsletter.\n\nEmail: ${subEmail}`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setSubState('done');
      setSubMsg('Opening your email client…');
    }
  }

  const office = SITE.addresses.salesOffice;
  const factory = SITE.addresses.factory;

  return (
    <footer className="chic-ftr">
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />

      {/* Newsletter */}
      <div className="news">
        <div className="news-inner">
          <div className="news-text">
            <div className="news-eyebrow">{t('footer.newsletterEyebrow')}</div>
            <h3 className="news-title">{t('footer.newsletterTitle')}</h3>
          </div>
          <form className="news-form" onSubmit={handleSubscribe}>
            <div className="news-row">
              <input
                type="email"
                name="email"
                required
                placeholder={t('footer.newsletterPlaceholder')}
                className="news-input"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                disabled={subState === 'sending'}
              />
              <button type="submit" className="news-btn" disabled={subState === 'sending'}>
                {subState === 'sending' ? t('cta.sending') : `${t('cta.subscribe')} →`}
              </button>
            </div>
            {subMsg && <p className={`news-msg ${subState === 'error' ? 'error' : ''}`}>{subMsg}</p>}
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="main">
        <div className="col-brand">
          <Link href="/" className="brand-row" aria-label="CHIC — home">
            <div>
              <span className="brand-name">CHIC</span>
              <span className="brand-tag">{t('meta.tagline')}</span>
            </div>
          </Link>
          <p className="brand-blurb">{t('footer.brandBlurb')}</p>
          <div className="badges">
            <span className="badge">FSC Certified</span>
            <span className="badge">EU REACH</span>
            <span className="badge">CARB P2</span>
            <span className="badge">ISO 9001</span>
          </div>
        </div>

        <div className="col">
          <h4>{t('footer.products')}</h4>
          <ul>
            <li><Link href="/products/gift-packaging">{t('categories.gift-packaging')}</Link></li>
            <li><Link href="/products/watch-jewelry">{t('categories.watch-jewelry')}</Link></li>
            <li><Link href="/products/tea-coffee">{t('categories.tea-coffee')}</Link></li>
            <li><Link href="/products/wine-whisky">{t('categories.wine-whisky')}</Link></li>
            <li><Link href="/products/kitchen-dining">{t('categories.kitchen-dining')}</Link></li>
            <li><Link href="/products/storage">{t('categories.storage')}</Link></li>
            <li><Link href="/products">{t('cta.viewAll')} →</Link></li>
          </ul>
        </div>

        <div className="col">
          <h4>{t('footer.company')}</h4>
          <ul>
            <li><Link href="/about">{t('footer.aboutLink')}</Link></li>
            <li><Link href="/material-guide">{t('footer.materialGuideLink')}</Link></li>
            <li><Link href="/wood-fabrication">{t('footer.woodFabrication')}</Link></li>
            <li><Link href="/capabilities">{t('footer.capabilities')}</Link></li>
            <li><Link href="/blog">{t('footer.blogNews')}</Link></li>
            <li><Link href="/contact">{t('footer.contactLink')}</Link></li>
          </ul>
        </div>

        <div className="col col-contact">
          <h4>{t('footer.getInTouch')}</h4>
          <div className="ct-row">
            <div className="ct-icon"><MailIcon /></div>
            <div>
              <span className="ct-label">{t('footer.email')}</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </div>
          <div className="ct-row">
            <div className="ct-icon"><WhatsAppIcon /></div>
            <div>
              <span className="ct-label">{t('footer.whatsapp')}</span>
              <a href={SITE.whatsapp.chatUrl} target="_blank" rel="noopener noreferrer">{SITE.whatsapp.display}</a>
            </div>
          </div>
          <div className="ct-row">
            <div className="ct-icon"><WeChatIcon /></div>
            <div>
              <span className="ct-label">{t('footer.wechat')}</span>
              {SITE.wechat.id}
              <span className="ct-note">{SITE.wechat.note}</span>
            </div>
          </div>
          <div className="ct-row">
            <div className="ct-icon"><PinIcon /></div>
            <div>
              <span className="ct-label">{office.label}</span>
              {office.lines.map((l, i) => (<span key={i}>{l}<br /></span>))}
            </div>
          </div>
          <div className="ct-row">
            <div className="ct-icon"><PinIcon /></div>
            <div>
              <span className="ct-label">{factory.label}</span>
              {factory.lines.map((l, i) => (<span key={i}>{l}<br /></span>))}
            </div>
          </div>
          <div className="ct-row">
            <div className="ct-icon"><ClockIcon /></div>
            <div>
              <span className="ct-label">{t('footer.hours')}</span>
              {SITE.hours}
            </div>
          </div>
          <div className="socials" aria-label="Find us online">
            <a href={`mailto:${SITE.email}`} className="soc" aria-label="Email" title="Email"><MailIcon /></a>
            <a href={SITE.whatsapp.chatUrl} target="_blank" rel="noopener noreferrer" className="soc" aria-label="WhatsApp" title="WhatsApp"><WhatsAppIcon /></a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="soc" aria-label="LinkedIn" title="LinkedIn"><LinkedInIcon /></a>
            <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="soc" aria-label="YouTube" title="YouTube"><YouTubeIcon /></a>
            <a href={SITE.social.alibaba} target="_blank" rel="noopener noreferrer" className="soc" aria-label="Alibaba store" title="Alibaba store"><AlibabaIcon /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bot">
        <div className="bot-inner">
          <span>© {year} {SITE.company.legalName} {t('footer.allRightsReserved')}</span>
          <div className="bot-r">
            <span className="bot-cert">✦ {t('footer.madeIn')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
