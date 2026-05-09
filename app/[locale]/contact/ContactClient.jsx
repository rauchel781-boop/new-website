'use client';

import { useState, useEffect } from 'react';
import { SITE, isEmailJSConfigured } from '@/data/site-config';
import { useEmailJS } from '@/lib/use-emailjs';

const CONTACT_CSS = `

.cp {
  --wd-deep:    #3D2A1F;
  --wd-mid:     #6B4A33;
  --wd-warm:    #C58E4A;
  --wd-light:   #D9B98F;
  --wd-cream:   #F6EEDF;
  --wd-sand:    #ECDFC6;
  --wd-ink:     #2A1B12;
  --wd-charcoal:#1F140C;
  --wd-mute:    #7A6450;

  font-family: var(--font-jost), system-ui, sans-serif;
  background: var(--wd-cream);
  color: var(--wd-ink);
  overflow-x: hidden;
}
.cp *, .cp *::before, .cp *::after { box-sizing: border-box; }

/* ═══════════════ HERO ═══════════════ */
.cp .hero {
  position: relative;
  min-height: 480px;
  height: 60vh;
  max-height: 620px;
  background: var(--wd-charcoal);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  text-align: center;
}
.cp .hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background-image: url('/employees/sales-office.webp');
  background-size: cover; background-position: center;
  filter: contrast(1.05) saturate(0.95);
  transform: scale(1.04);
  animation: cpHeroBg 22s ease-in-out infinite alternate;
}
.cp .hero-bg::after {
  content: '';
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(20,12,8,0.92) 0%, rgba(20,12,8,0.6) 40%, rgba(20,12,8,0.6) 65%, rgba(20,12,8,0.95) 100%),
    radial-gradient(ellipse at center, rgba(197,142,74,0.18) 0%, rgba(0,0,0,0) 65%);
}
.cp .hero-bg::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg, transparent 0, transparent 90px, rgba(197,142,74,0.04) 90px, rgba(197,142,74,0.04) 91px);
  z-index: 1;
}
.cp .hero-inner { position: relative; z-index: 2; max-width: 900px; padding: 0 32px; }
.cp .hero-eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--wd-warm); margin-bottom: 24px; font-weight: 500;
}
.cp .hero-eyebrow::before, .cp .hero-eyebrow::after { content: ''; width: 32px; height: 1px; background: var(--wd-warm); opacity: 0.5; }
.cp .hero-title {
  font-family: var(--font-playfair), serif;
  font-size: clamp(2.6rem, 6vw, 5rem);
  color: var(--wd-cream); line-height: 1.05; margin: 0 0 22px;
  letter-spacing: -1.5px;
  animation: cpFadeUp .9s ease both;
}
.cp .hero-title em { color: var(--wd-warm); font-style: italic; }
.cp .hero-sub {
  font-size: 1.05rem; color: rgba(246,238,223,0.78);
  line-height: 1.8; max-width: 600px; margin: 0 auto;
  font-weight: 300;
  animation: cpFadeUp .9s .15s ease both;
}

/* Stat strip below hero */
.cp .strip {
  background: var(--wd-ink);
  border-bottom: 1px solid rgba(197,142,74,0.18);
  position: relative; z-index: 2;
}
.cp .strip-inner {
  max-width: 1500px; margin: 0 auto;
  padding: 24px 60px;
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.cp .strip-item { text-align: center; position: relative; }
.cp .strip-item:not(:last-child)::after {
  content: ''; position: absolute;
  right: -12px; top: 10%; bottom: 10%; width: 1px;
  background: rgba(197,142,74,0.18);
}
.cp .strip-num {
  font-family: var(--font-playfair), serif;
  font-size: 1.8rem; line-height: 1; color: var(--wd-warm);
  font-weight: 700;
}
.cp .strip-num small { font-size: 0.85rem; color: var(--wd-light); margin-left: 2px; }
.cp .strip-lbl {
  font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase;
  color: rgba(217,185,143,0.7); margin-top: 8px; font-weight: 500;
}

/* ═══════════════ CONTACT METHODS GRID ═══════════════ */
.cp .ways { padding: 80px 60px 60px; }
.cp .ways-inner { max-width: 1300px; margin: 0 auto; }
.cp .sec-head { text-align: center; margin-bottom: 50px; }
.cp .sec-eyebrow { font-size: 0.66rem; letter-spacing: 5px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 14px; font-weight: 600; }
.cp .sec-title {
  font-family: var(--font-playfair), serif;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  color: var(--wd-deep); margin: 0;
  letter-spacing: -0.5px;
}
.cp .sec-title em { color: var(--wd-warm); font-style: italic; }
.cp .sec-sub { color: var(--wd-mute); font-size: 0.95rem; max-width: 560px; margin: 16px auto 0; line-height: 1.7; }

.cp .ways-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
}
.cp .way-card {
  background: white;
  border: 1px solid rgba(197,142,74,0.2);
  border-top: 3px solid var(--wd-warm);
  border-radius: 4px;
  padding: 32px 26px 28px;
  text-decoration: none; color: inherit;
  display: flex; flex-direction: column;
  transition: transform .35s ease, box-shadow .35s, border-color .35s;
  cursor: pointer;
}
.cp .way-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(61,42,31,0.16); border-color: var(--wd-warm); }
.cp .way-icon {
  width: 56px; height: 56px;
  background: var(--wd-sand); color: var(--wd-warm);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 22px;
  transition: background .25s, color .25s;
}
.cp .way-card:hover .way-icon { background: var(--wd-warm); color: white; }
.cp .way-icon svg { width: 26px; height: 26px; }
.cp .way-eyebrow { font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 8px; font-weight: 600; }
.cp .way-title { font-family: var(--font-playfair), serif; font-size: 1.18rem; color: var(--wd-deep); margin: 0 0 10px; line-height: 1.3; }
.cp .way-value { font-size: 0.92rem; color: var(--wd-deep); font-weight: 500; word-break: break-word; margin-bottom: 6px; }
.cp .way-note { font-size: 0.78rem; color: var(--wd-mute); line-height: 1.55; flex: 1; }
.cp .way-cta { margin-top: 18px; font-size: 0.7rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--wd-warm); font-weight: 600; }
.cp .way-cta::after { content: ' →'; transition: transform .2s; display: inline-block; }
.cp .way-card:hover .way-cta::after { transform: translateX(4px); }

/* Social row */
.cp .socials { display: flex; justify-content: center; gap: 12px; margin-top: 36px; flex-wrap: wrap; }
.cp .soc-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 10px 18px;
  background: white;
  border: 1px solid rgba(197,142,74,0.2);
  border-radius: 100px;
  text-decoration: none; color: var(--wd-deep);
  font-size: 0.78rem; letter-spacing: 1.5px; font-weight: 500;
  transition: all .2s;
}
.cp .soc-pill:hover { border-color: var(--wd-warm); background: var(--wd-sand); color: var(--wd-warm); transform: translateY(-2px); }
.cp .soc-pill svg { width: 16px; height: 16px; }

/* ═══════════════ FORM + INFO ═══════════════ */
.cp .form-wrap-section {
  padding: 60px 60px 80px;
  background: var(--wd-sand);
  border-top: 1px solid rgba(107,74,51,0.12);
}
.cp .form-grid {
  max-width: 1300px; margin: 0 auto;
  display: grid; grid-template-columns: 1.05fr 1fr; gap: 50px;
  align-items: start;
}
.cp .form-card {
  background: white;
  border-radius: 4px;
  border-top: 3px solid var(--wd-warm);
  padding: 40px 42px;
  box-shadow: 0 14px 40px rgba(61,42,31,0.08);
}
.cp .form-eyebrow { font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 8px; font-weight: 600; }
.cp .form-title { font-family: var(--font-playfair), serif; font-size: 1.85rem; color: var(--wd-deep); margin: 0 0 26px; line-height: 1.2; letter-spacing: -0.3px; }
.cp .form-row { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.cp .form-row.split { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.cp .form-row label { font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--wd-mute); font-weight: 600; }
.cp .form-row input, .cp .form-row textarea, .cp .form-row select {
  background: var(--wd-cream);
  border: 1px solid rgba(197,142,74,0.25);
  color: var(--wd-deep);
  padding: 12px 14px;
  font-size: 0.95rem;
  border-radius: 2px;
  font-family: inherit;
  transition: border-color .2s, background .2s;
}
.cp .form-row input:focus, .cp .form-row textarea:focus, .cp .form-row select:focus {
  outline: none; border-color: var(--wd-warm); background: white;
}
.cp .form-row textarea { resize: vertical; min-height: 130px; line-height: 1.55; }
.cp .form-btn {
  background: var(--wd-warm); color: white;
  padding: 16px 28px; border: none; border-radius: 2px;
  font-size: 0.78rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
  cursor: pointer; width: 100%;
  transition: background .2s, transform .2s, opacity .2s;
  margin-top: 8px;
  font-family: inherit;
  box-shadow: 0 8px 22px rgba(197,142,74,0.32);
}
.cp .form-btn:hover { background: #D9A05E; transform: translateY(-2px); }
.cp .form-btn:disabled { opacity: 0.6; cursor: wait; transform: none; }
.cp .form-msg { margin-top: 14px; padding: 14px 16px; border-radius: 2px; font-size: 0.86rem; line-height: 1.5; }
.cp .form-msg.error { background: #fbe9e7; color: #b14a2c; border: 1px solid rgba(177,74,44,0.3); }
.cp .form-fine { font-size: 0.74rem; color: var(--wd-mute); margin-top: 14px; line-height: 1.55; }

.cp .thanks { text-align: center; padding: 40px 20px; }
.cp .thanks h3 { font-family: var(--font-playfair), serif; font-size: 2rem; color: var(--wd-deep); margin: 0 0 12px; }
.cp .thanks p { color: var(--wd-mute); line-height: 1.7; margin: 0 0 22px; font-weight: 300; }
.cp .thanks .form-btn { width: auto; padding: 12px 24px; }

/* Right info panel */
.cp .info-card {
  background: var(--wd-charcoal);
  color: rgba(217,185,143,0.85);
  border-radius: 4px;
  padding: 36px 36px;
  position: relative; overflow: hidden;
}
.cp .info-card::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent 0, transparent 30px, rgba(197,142,74,0.04) 30px, rgba(197,142,74,0.04) 31px);
}
.cp .info-card > * { position: relative; z-index: 1; }
.cp .info-eyebrow { font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 8px; font-weight: 600; }
.cp .info-title { font-family: var(--font-playfair), serif; font-size: 1.6rem; color: var(--wd-cream); margin: 0 0 22px; }
.cp .info-row { display: flex; gap: 14px; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid rgba(217,185,143,0.12); }
.cp .info-row:last-child { border-bottom: none; }
.cp .info-icon {
  width: 36px; height: 36px; flex-shrink: 0;
  border: 1px solid rgba(197,142,74,0.35); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--wd-warm);
}
.cp .info-icon svg { width: 16px; height: 16px; }
.cp .info-label { font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 4px; font-weight: 600; }
.cp .info-val { font-size: 0.92rem; color: var(--wd-cream); line-height: 1.55; word-break: break-word; }
.cp .info-val a { color: var(--wd-cream); text-decoration: none; transition: color .2s; }
.cp .info-val a:hover { color: var(--wd-warm); }

/* ═══════════════ TIMEZONES ═══════════════ */
.cp .clocks {
  background: var(--wd-cream);
  padding: 70px 60px;
  border-top: 1px solid rgba(107,74,51,0.12);
}
.cp .clocks-inner { max-width: 1300px; margin: 0 auto; }
.cp .clocks-grid {
  display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px;
  margin-top: 36px;
}
.cp .clock {
  text-align: center;
  background: white;
  border: 1px solid rgba(197,142,74,0.18);
  border-radius: 4px;
  padding: 22px 12px 18px;
  position: relative;
}
.cp .clock.is-home {
  background: var(--wd-deep); color: var(--wd-cream);
  border-color: var(--wd-warm);
}
.cp .clock-flag { font-size: 1.5rem; margin-bottom: 8px; line-height: 1; }
.cp .clock-city { font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 6px; font-weight: 600; }
.cp .clock.is-home .clock-city { color: var(--wd-warm); }
.cp .clock-time {
  font-family: var(--font-playfair), serif;
  font-size: 1.5rem; line-height: 1; color: var(--wd-deep);
  font-weight: 600;
}
.cp .clock.is-home .clock-time { color: var(--wd-cream); }
.cp .clock-zone { font-size: 0.62rem; color: var(--wd-mute); margin-top: 6px; letter-spacing: 1px; }
.cp .clock.is-home .clock-zone { color: rgba(217,185,143,0.6); }
.cp .clock-state {
  position: absolute; top: 8px; right: 10px;
  width: 8px; height: 8px; border-radius: 50%;
  background: #2a9d4a;
  box-shadow: 0 0 0 3px rgba(42,157,74,0.18);
}
.cp .clock-state.off { background: #c4c4c4; box-shadow: 0 0 0 3px rgba(196,196,196,0.18); }

/* ═══════════════ TWO LOCATIONS ═══════════════ */
.cp .locs { padding: 80px 60px; background: var(--wd-sand); border-top: 1px solid rgba(107,74,51,0.12); }
.cp .locs-inner { max-width: 1300px; margin: 0 auto; }
.cp .locs-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
  margin-top: 50px;
}
.cp .loc {
  background: white;
  border: 1px solid rgba(197,142,74,0.2);
  border-radius: 4px;
  overflow: hidden;
  display: flex; flex-direction: column;
}
.cp .loc-map {
  width: 100%; aspect-ratio: 16/9; background: var(--wd-deep);
  border-bottom: 3px solid var(--wd-warm);
}
.cp .loc-map iframe { width: 100%; height: 100%; border: 0; display: block; }
.cp .loc-body { padding: 28px 30px 32px; flex: 1; display: flex; flex-direction: column; }
.cp .loc-eyebrow { font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 10px; font-weight: 600; }
.cp .loc-name { font-family: var(--font-playfair), serif; font-size: 1.5rem; color: var(--wd-deep); margin: 0 0 14px; }
.cp .loc-name em { color: var(--wd-warm); font-style: italic; }
.cp .loc-addr { font-size: 0.92rem; color: var(--wd-deep); line-height: 1.7; margin: 0 0 14px; }
.cp .loc-role { font-size: 0.82rem; color: var(--wd-mute); font-style: italic; margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid rgba(197,142,74,0.18); }
.cp .loc-meta { display: flex; flex-direction: column; gap: 8px; font-size: 0.8rem; color: var(--wd-mute); }
.cp .loc-meta-row { display: flex; gap: 8px; align-items: flex-start; line-height: 1.5; }
.cp .loc-meta-row strong { color: var(--wd-deep); font-weight: 600; min-width: 86px; flex-shrink: 0; }

/* ═══════════════ FAQ ═══════════════ */
.cp .faq { padding: 80px 60px; background: var(--wd-cream); border-top: 1px solid rgba(107,74,51,0.12); }
.cp .faq-inner { max-width: 920px; margin: 0 auto; }
.cp .faq-list { margin-top: 40px; }
.cp .faq-item {
  background: white;
  border: 1px solid rgba(197,142,74,0.2);
  border-radius: 4px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: border-color .2s, box-shadow .2s;
}
.cp .faq-item.is-open { border-color: var(--wd-warm); box-shadow: 0 8px 28px rgba(61,42,31,0.08); }
.cp .faq-q {
  width: 100%; background: none; border: none;
  padding: 22px 26px; text-align: left;
  display: flex; align-items: center; gap: 18px;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  color: var(--wd-deep);
  font-weight: 500;
  line-height: 1.5;
}
.cp .faq-q-num {
  font-family: var(--font-playfair), serif;
  font-size: 1rem; color: var(--wd-warm); font-weight: 600;
  flex-shrink: 0;
  width: 24px;
}
.cp .faq-q-text { flex: 1; }
.cp .faq-q-arrow {
  flex-shrink: 0; width: 32px; height: 32px;
  border: 1px solid rgba(197,142,74,0.3); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--wd-warm);
  transition: transform .25s, background .25s, color .25s;
}
.cp .faq-item.is-open .faq-q-arrow { transform: rotate(45deg); background: var(--wd-warm); color: white; }
.cp .faq-q-arrow svg { width: 14px; height: 14px; }
.cp .faq-a {
  max-height: 0; overflow: hidden;
  transition: max-height .35s ease;
}
.cp .faq-item.is-open .faq-a { max-height: 600px; }
.cp .faq-a-inner {
  padding: 0 26px 24px 68px;
  font-size: 0.92rem; color: var(--wd-mute);
  line-height: 1.75;
}

/* ═══════════════ FINAL CTA ═══════════════ */
.cp .final {
  padding: 90px 60px;
  background: linear-gradient(135deg, var(--wd-deep) 0%, var(--wd-mid) 50%, var(--wd-deep) 100%);
  text-align: center; color: var(--wd-cream);
  position: relative; overflow: hidden;
}
.cp .final::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent 0, transparent 32px, rgba(197,142,74,0.04) 32px, rgba(197,142,74,0.04) 33px);
}
.cp .final-eyebrow { font-size: 0.66rem; letter-spacing: 5px; text-transform: uppercase; color: var(--wd-warm); margin-bottom: 18px; font-weight: 600; position: relative; }
.cp .final-title { font-family: var(--font-playfair), serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); margin: 0 0 16px; line-height: 1.2; position: relative; }
.cp .final-title em { color: var(--wd-warm); font-style: italic; }
.cp .final-sub { font-size: 1rem; color: rgba(217,185,143,0.7); max-width: 520px; margin: 0 auto 28px; line-height: 1.7; font-weight: 300; position: relative; }
.cp .final-btns { display: inline-flex; gap: 14px; flex-wrap: wrap; justify-content: center; position: relative; }
.cp .final-btn {
  background: var(--wd-warm); color: white;
  padding: 16px 32px; text-decoration: none;
  font-size: 0.78rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
  border-radius: 2px; transition: background .2s, transform .2s;
  display: inline-flex; align-items: center; gap: 10px;
  box-shadow: 0 8px 22px rgba(197,142,74,0.4);
}
.cp .final-btn:hover { background: #D9A05E; transform: translateY(-2px); }
.cp .final-btn.outline { background: transparent; border: 1px solid rgba(217,185,143,0.5); color: var(--wd-light); box-shadow: none; }
.cp .final-btn.outline:hover { background: rgba(217,185,143,0.08); border-color: var(--wd-light); }

/* ═══════════════ ANIMATIONS ═══════════════ */
@keyframes cpFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cpHeroBg { 0% { transform: scale(1.04); } 100% { transform: scale(1.12) translate(-1%, -1%); } }

/* ═══════════════ RESPONSIVE ═══════════════ */
@media (max-width: 1100px) {
  .cp .strip-inner { grid-template-columns: repeat(2, 1fr); padding: 22px 32px; gap: 22px 16px; }
  .cp .strip-item:nth-child(2)::after { display: none; }
  .cp .ways { padding: 60px 32px 50px; }
  .cp .ways-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .cp .form-wrap-section { padding: 50px 32px 60px; }
  .cp .form-grid { grid-template-columns: 1fr; gap: 30px; }
  .cp .clocks { padding: 60px 32px; }
  .cp .clocks-grid { grid-template-columns: repeat(3, 1fr); }
  .cp .locs { padding: 60px 32px; }
  .cp .locs-grid { grid-template-columns: 1fr; }
  .cp .faq { padding: 60px 32px; }
  .cp .final { padding: 70px 32px; }
}
@media (max-width: 640px) {
  .cp .hero { height: 50vh; min-height: 400px; }
  .cp .strip-inner { padding: 18px 22px; }
  .cp .ways { padding: 50px 22px 40px; }
  .cp .ways-grid { grid-template-columns: 1fr; }
  .cp .form-wrap-section { padding: 40px 22px 50px; }
  .cp .form-card { padding: 30px 24px; }
  .cp .form-row.split { grid-template-columns: 1fr; }
  .cp .info-card { padding: 28px 24px; }
  .cp .clocks-grid { grid-template-columns: repeat(2, 1fr); }
  .cp .faq-q { padding: 18px 18px; gap: 12px; font-size: 0.93rem; }
  .cp .faq-a-inner { padding: 0 18px 22px 50px; }
  .cp .faq-q-num { width: 18px; }
  .cp .final { padding: 60px 22px; }
}
`;

// ─────────── ICONS ───────────
function MailIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>; }
function WhatsAppIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33z"/></svg>; }
function WeChatIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 13.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9.7 3C5.45 3 2 5.85 2 9.36c0 1.87.97 3.55 2.55 4.7-.13.4-.5 1.55-.55 1.78-.06.3.27.46.49.32.18-.11 1.6-1.05 1.99-1.31.65.18 1.33.28 2.04.3-.1-.45-.16-.92-.16-1.4C8.36 10.5 11.85 8 16.13 8c.32 0 .63.02.93.05C16.31 5.07 13.31 3 9.7 3z"/></svg>; }
function StoreIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l1-4h18l1 4M3 7v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7M3 7h18M9 21V12h6v9"/></svg>; }
function LinkedInIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v15H.22V8zm7.83 0h4.37v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.33h-4.56v-7.39c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.91V23H8.05V8z"/></svg>; }
function YouTubeIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 16 24 12 24 12s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>; }
function PinIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>; }
function ClockIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>; }
function PlusIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>; }

// ─────────── TIMEZONE CLOCKS ───────────
const ZONES = [
  { key: 'home',   city: 'Xiamen',     tz: 'Asia/Shanghai',     flag: '🇨🇳', zone: 'GMT+8',  workH: [9, 18] },
  { key: 'la',     city: 'Los Angeles', tz: 'America/Los_Angeles', flag: '🇺🇸', zone: 'PST',  workH: [9, 17] },
  { key: 'ny',     city: 'New York',   tz: 'America/New_York',  flag: '🇺🇸', zone: 'EST',    workH: [9, 17] },
  { key: 'london', city: 'London',     tz: 'Europe/London',     flag: '🇬🇧', zone: 'GMT',    workH: [9, 17] },
  { key: 'berlin', city: 'Berlin',     tz: 'Europe/Berlin',     flag: '🇩🇪', zone: 'CET',    workH: [9, 17] },
  { key: 'sydney', city: 'Sydney',     tz: 'Australia/Sydney',  flag: '🇦🇺', zone: 'AEST',   workH: [9, 17] },
];

function Clock({ z, isHome }) {
  const [time, setTime] = useState('');
  const [working, setWorking] = useState(false);
  useEffect(() => {
    const tick = () => {
      try {
        const fmt = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: z.tz });
        setTime(fmt.format(new Date()));
        const hr = Number(new Intl.DateTimeFormat('en-US', { hour: '2-digit', hour12: false, timeZone: z.tz }).format(new Date()));
        const day = new Date().toLocaleDateString('en-US', { weekday: 'short', timeZone: z.tz });
        const isWeekday = !['Sun', 'Sat'].includes(day) || (isHome && day === 'Sat');
        setWorking(isWeekday && hr >= z.workH[0] && hr < z.workH[1]);
      } catch {}
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [z.tz, isHome, z.workH]);

  return (
    <div className={`clock ${isHome ? 'is-home' : ''}`}>
      <span className={`clock-state ${working ? '' : 'off'}`} title={working ? 'Open now' : 'Closed'} />
      <div className="clock-flag">{z.flag}</div>
      <div className="clock-city">{z.city}</div>
      <div className="clock-time">{time || '—'}</div>
      <div className="clock-zone">{z.zone}</div>
    </div>
  );
}

// ─────────── FAQ DATA ───────────
const FAQS = [
  {
    q: "What's your minimum order quantity (MOQ)?",
    a: "For ODM products from our existing catalog, our typical MOQ is 200-300 pieces. For sample runs we can go as low as 100 pieces. For full custom OEM projects, MOQ is usually 500-1,000 pieces — the higher MOQ helps justify the tooling and setup costs. We're flexible on this for first-time buyers; just ask.",
  },
  {
    q: "How long is the lead time?",
    a: "Sampling takes 7-15 days depending on complexity. Production lead time is typically 18-28 days for ODM and 35-55 days for full OEM. Q4 (October-December) we recommend ordering early — Amazon FBA receiving queues get congested, and our production fills up faster. For urgent projects we can sometimes air-freight initial inventory.",
  },
  {
    q: "Do you provide samples? Are they free?",
    a: "We provide samples for all serious inquiries. Single hand-built samples are typically $30-100 each (refunded against your first production order if you proceed). For 100-piece production trial runs (which we strongly recommend before scaling), pricing is typically 30-60% above full-volume per-unit cost.",
  },
  {
    q: "What are your payment terms?",
    a: "Standard terms for established relationships: 30% deposit at order confirmation, 70% balance before shipment. For first-time orders we may request 50/50. We accept T/T (bank transfer), PayPal for small samples, and Alibaba Trade Assurance (escrow) for first-time buyers who prefer protected payment.",
  },
  {
    q: "What woods and finishes do you offer?",
    a: "We work with paulownia, pine, bamboo, acacia, walnut, oak, and several specialty hardwoods. Finishes include food-safe lacquer, water-based low-VOC lacquer, oil/wax (tung, beeswax, mineral oil), painted (matte and gloss), and custom stains. All finishes available with REACH and CARB Phase 2 compliance documentation.",
  },
  {
    q: "Can I customize size, branding, and hardware?",
    a: "Yes — full customization is what we do. Custom dimensions, wood species, finishes, hinge/lock/magnet hardware, lining material, and branding (laser engrave, hot foil, deboss, screen print). Send your spec or a reference image and we'll come back with a 3D mockup and quote.",
  },
  {
    q: "Do you handle international shipping and customs?",
    a: "Yes. We ship FOB (Xiamen or Shanghai port), CIF, or DDP. We handle phytosanitary certificates for all solid wood, certificate of origin, commercial invoice, packing list, and ISF filing for US-bound containers. We work with both LCL (less-than-container) and FCL (full container) freight, depending on volume.",
  },
  {
    q: "Can I visit the factory?",
    a: "Absolutely — we welcome buyer visits and will help arrange airport pickup from Xiamen or Heze. Our 15,000 m² facility in Cao County is a 45-minute drive from Heze airport. The Xiamen sales office is 10 minutes from Xiamen Gaoqi International Airport. Email us at info@xmchichomeware.com to plan a visit.",
  },
];

// ─────────── PAGE ───────────
export default function ContactPage() {
  const { ready, send } = useEmailJS();
  const [form, setForm] = useState({ name: '', email: '', company: '', country: '', subject: 'General inquiry', message: '' });
  const [state, setState] = useState('idle');
  const [errMsg, setErrMsg] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  function update(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setState('sending');
    setErrMsg('');

    if (isEmailJSConfigured() && ready) {
      try {
        await send(SITE.emailjs.contactTemplateId, {
          name: form.name,
          email: form.email,
          company: form.company || '(not provided)',
          message: `Country: ${form.country || 'not provided'}\nSubject: ${form.subject}\n\n${form.message}`,
          source: 'Contact page',
        });
        setState('done');
      } catch {
        setState('error');
        setErrMsg('Sorry — something went wrong. Please email us directly at ' + SITE.email);
      }
    } else {
      const subject = encodeURIComponent(`[${form.subject}] Inquiry from ${form.name || 'website'}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || '(not provided)'}\nCountry: ${form.country || 'not provided'}\nSubject: ${form.subject}\n\n${form.message}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setState('done');
    }
  }

  function reset() {
    setForm({ name: '', email: '', company: '', country: '', subject: 'General inquiry', message: '' });
    setState('idle');
    setErrMsg('');
  }

  return (
    <div className="cp">
      <style dangerouslySetInnerHTML={{ __html: CONTACT_CSS }} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-eyebrow">Get In Touch</div>
          <h1 className="hero-title">Let&apos;s Build Something <em>Together</em></h1>
          <p className="hero-sub">
            Email, WhatsApp, WeChat, or the form below — pick whichever is easiest for you.
            Sample requests, custom OEM projects, and general questions all welcome.
          </p>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <div className="strip">
        <div className="strip-inner">
          <div className="strip-item">
            <div className="strip-num">{'<'}24<small>h</small></div>
            <div className="strip-lbl">Email Response Time</div>
          </div>
          <div className="strip-item">
            <div className="strip-num">EN · 中文</div>
            <div className="strip-lbl">Working Languages</div>
          </div>
          <div className="strip-item">
            <div className="strip-num">60+<small></small></div>
            <div className="strip-lbl">Countries Shipped</div>
          </div>
          <div className="strip-item">
            <div className="strip-num">7<small>days</small></div>
            <div className="strip-lbl">To First Sample</div>
          </div>
        </div>
      </div>

      {/* ── CONTACT METHODS ── */}
      <section className="ways">
        <div className="ways-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">How To Reach Us</div>
            <h2 className="sec-title">Pick the Channel That <em>Suits You</em></h2>
            <p className="sec-sub">
              We watch all four channels during business hours. Email is fastest for detailed quotes;
              WhatsApp and WeChat are best for quick questions or sending photos.
            </p>
          </div>

          <div className="ways-grid">
            <a className="way-card" href={`mailto:${SITE.email}`}>
              <div className="way-icon"><MailIcon /></div>
              <div className="way-eyebrow">Fastest Response</div>
              <h3 className="way-title">Email Us</h3>
              <div className="way-value">{SITE.email}</div>
              <p className="way-note">Best for detailed quotes, spec sheets, and reference photos. Replies within 4 business hours.</p>
              <div className="way-cta">Send Email</div>
            </a>

            <a className="way-card" href={SITE.whatsapp.chatUrl} target="_blank" rel="noopener noreferrer">
              <div className="way-icon"><WhatsAppIcon /></div>
              <div className="way-eyebrow">Click to Chat</div>
              <h3 className="way-title">WhatsApp</h3>
              <div className="way-value">{SITE.whatsapp.display}</div>
              <p className="way-note">For quick questions, sending photos, voice notes. Live during 9-18 GMT+8.</p>
              <div className="way-cta">Open WhatsApp</div>
            </a>

            <div className="way-card" style={{ cursor: 'default' }}>
              <div className="way-icon"><WeChatIcon /></div>
              <div className="way-eyebrow">WeChat ID</div>
              <h3 className="way-title">WeChat</h3>
              <div className="way-value">{SITE.wechat.id}</div>
              <p className="way-note">{SITE.wechat.note}</p>
              <div className="way-cta" style={{ color: 'var(--wd-mute)' }}>Add Manually</div>
            </div>

            <a className="way-card" href={SITE.social.alibaba} target="_blank" rel="noopener noreferrer">
              <div className="way-icon"><StoreIcon /></div>
              <div className="way-eyebrow">B2B Marketplace</div>
              <h3 className="way-title">Alibaba Store</h3>
              <div className="way-value">quke.en.alibaba.com</div>
              <p className="way-note">Browse our verified catalog, request quotes via Trade Assurance, escrow payment.</p>
              <div className="way-cta">Visit Store</div>
            </a>
          </div>

          {/* social pills */}
          <div className="socials">
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="soc-pill">
              <LinkedInIcon /> Follow us on LinkedIn
            </a>
            <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="soc-pill">
              <YouTubeIcon /> Watch factory tours on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="form-wrap-section">
        <div className="form-grid">
          <div className="form-card">
            {state === 'done' ? (
              <div className="thanks">
                <h3>Thank you — message received.</h3>
                <p>
                  We&apos;ve got your inquiry and will reply to <strong>{form.email}</strong> within 24 business hours.
                  In the meantime, browse our <a href="/products" style={{ color: 'var(--wd-warm)', textDecoration: 'underline' }}>products</a> or <a href="/blog" style={{ color: 'var(--wd-warm)', textDecoration: 'underline' }}>journal</a>.
                </p>
                <button type="button" className="form-btn" onClick={reset}>Send Another →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-eyebrow">Send a Message</div>
                <h2 className="form-title">Tell us what you&apos;re working on</h2>

                <div className="form-row split">
                  <div className="form-row">
                    <label htmlFor="cp-name">Your name</label>
                    <input id="cp-name" type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} disabled={state === 'sending'} />
                  </div>
                  <div className="form-row">
                    <label htmlFor="cp-email">Email</label>
                    <input id="cp-email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} disabled={state === 'sending'} />
                  </div>
                </div>

                <div className="form-row split">
                  <div className="form-row">
                    <label htmlFor="cp-company">Company</label>
                    <input id="cp-company" type="text" value={form.company} onChange={(e) => update('company', e.target.value)} disabled={state === 'sending'} />
                  </div>
                  <div className="form-row">
                    <label htmlFor="cp-country">Country</label>
                    <input id="cp-country" type="text" placeholder="e.g. Germany" value={form.country} onChange={(e) => update('country', e.target.value)} disabled={state === 'sending'} />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="cp-subject">Inquiry type</label>
                  <select id="cp-subject" value={form.subject} onChange={(e) => update('subject', e.target.value)} disabled={state === 'sending'}>
                    <option>General inquiry</option>
                    <option>Quote request — existing product</option>
                    <option>Custom OEM project</option>
                    <option>Sample request</option>
                    <option>Bulk / wholesale order</option>
                    <option>Partnership / distribution</option>
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="cp-message">Message — product, quantity, timeline</label>
                  <textarea id="cp-message" required rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} disabled={state === 'sending'} placeholder="e.g. Looking for 5,000 walnut watch boxes for a Q4 launch. Need samples within 3 weeks. Target unit cost around $8 FOB." />
                </div>

                <button type="submit" className="form-btn" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : 'Send Inquiry →'}
                </button>
                {state === 'error' && <div className="form-msg error">{errMsg}</div>}
                <p className="form-fine">
                  Your information stays with us — we never share or resell contact details.
                  Prefer email? Write to <a href={`mailto:${SITE.email}`} style={{ color: 'var(--wd-warm)' }}>{SITE.email}</a>.
                </p>
              </form>
            )}
          </div>

          {/* Right info panel */}
          <aside className="info-card">
            <div className="info-eyebrow">At a Glance</div>
            <h3 className="info-title">What to Expect</h3>
            <div className="info-row">
              <div className="info-icon"><ClockIcon /></div>
              <div>
                <div className="info-label">Response Time</div>
                <div className="info-val">Within 4 business hours · Always within 24 hours</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon"><MailIcon /></div>
              <div>
                <div className="info-label">Best For Detailed Quotes</div>
                <div className="info-val"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon"><WhatsAppIcon /></div>
              <div>
                <div className="info-label">Quick Questions</div>
                <div className="info-val"><a href={SITE.whatsapp.chatUrl} target="_blank" rel="noopener noreferrer">{SITE.whatsapp.display}</a></div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon"><WeChatIcon /></div>
              <div>
                <div className="info-label">WeChat</div>
                <div className="info-val">{SITE.wechat.id}</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon"><PinIcon /></div>
              <div>
                <div className="info-label">Two Locations</div>
                <div className="info-val">Sales: Xiamen, Fujian<br />Factory: Cao County, Shandong</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon">✦</div>
              <div>
                <div className="info-label">Languages</div>
                <div className="info-val">English · 中文</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── TIMEZONES ── */}
      <section className="clocks">
        <div className="clocks-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Around the Clock</div>
            <h2 className="sec-title">When We&apos;re <em>Awake</em></h2>
            <p className="sec-sub">
              Green dot means we&apos;re online right now. Our team is in Xiamen — best response window varies by your timezone.
            </p>
          </div>
          <div className="clocks-grid">
            {ZONES.map((z) => (<Clock key={z.key} z={z} isHome={z.key === 'home'} />))}
          </div>
        </div>
      </section>

      {/* ── TWO LOCATIONS ── */}
      <section className="locs">
        <div className="locs-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Two Locations</div>
            <h2 className="sec-title">Xiamen + <em>Cao County</em></h2>
            <p className="sec-sub">
              Sales, design, and export run from our Xiamen office. Manufacturing happens at our 15,000 m² facility in Cao County, Shandong.
            </p>
          </div>
          <div className="locs-grid">
            <div className="loc">
              <div className="loc-map">
                <iframe
                  src="https://www.google.com/maps?q=Jimei+District,+Xiamen,+Fujian,+China&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Xiamen Sales Office"
                />
              </div>
              <div className="loc-body">
                <div className="loc-eyebrow">Sales Office</div>
                <h3 className="loc-name">Xiamen, <em>Fujian</em></h3>
                <p className="loc-addr">{SITE.addresses.salesOffice.lines.join(' ')}</p>
                <p className="loc-role">{SITE.addresses.salesOffice.role}</p>
                <div className="loc-meta">
                  <div className="loc-meta-row"><strong>Nearest airport</strong>Xiamen Gaoqi (XMN) — 10 min drive</div>
                  <div className="loc-meta-row"><strong>Nearest port</strong>Xiamen Port — 130+ direct global routes</div>
                  <div className="loc-meta-row"><strong>Best metro</strong>Maluan stop (Xiamen Metro Line 1)</div>
                </div>
              </div>
            </div>

            <div className="loc">
              <div className="loc-map">
                <iframe
                  src="https://www.google.com/maps?q=Cao+County,+Heze,+Shandong,+China&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cao County Factory"
                />
              </div>
              <div className="loc-body">
                <div className="loc-eyebrow">Production Factory · 15,000 m²</div>
                <h3 className="loc-name">Cao County, <em>Shandong</em></h3>
                <p className="loc-addr">{SITE.addresses.factory.lines.join(' ')}</p>
                <p className="loc-role">{SITE.addresses.factory.role}</p>
                <div className="loc-meta">
                  <div className="loc-meta-row"><strong>Nearest airport</strong>Heze Mudan (HZA) — 45 min drive</div>
                  <div className="loc-meta-row"><strong>Nearest port</strong>Qingdao / Lianyungang — direct rail container</div>
                  <div className="loc-meta-row"><strong>Workforce</strong>120+ skilled workers · 2 production shifts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq">
        <div className="faq-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Common Questions</div>
            <h2 className="sec-title">Buyer FAQ</h2>
            <p className="sec-sub">
              The questions we get most often. Don&apos;t see your answer? Email us — we&apos;ll add it to this list.
            </p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'is-open' : ''}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="faq-q-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-q-arrow"><PlusIcon /></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final">
        <div className="final-eyebrow">Still Looking?</div>
        <h2 className="final-title">Send us your <em>spec</em> — we&apos;ll send a quote</h2>
        <p className="final-sub">
          Email, WhatsApp, or the form above. The more detail you share (dimensions, quantity, target price, timeline), the more useful our first reply will be.
        </p>
        <div className="final-btns">
          <a href={`mailto:${SITE.email}`} className="final-btn">Email Us Now →</a>
          <a href={SITE.whatsapp.chatUrl} target="_blank" rel="noopener noreferrer" className="final-btn outline">WhatsApp Us</a>
        </div>
      </section>
    </div>
  );
}
