'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// `labelKey` resolves against the `introCarousel` namespace in
// messages/{locale}.json at render-time so labels translate per locale.
const SLIDES = [
  { src: '/factory/wooden-box-4.webp', labelKey: 'slide1Label' },
  { src: '/wooden-box-5.webp',         labelKey: 'slide2Label' },
  { src: '/factory/wooden-box-6.webp', labelKey: 'slide3Label' },
  { src: '/wooden-box-7.webp',         labelKey: 'slide4Label' },
  { src: '/wooden-box-8.webp',         labelKey: 'slide5Label' },
  { src: '/wooden-box-9.webp',         labelKey: 'slide6Label' },
  { src: '/wooden-box-10.webp',        labelKey: 'slide7Label' },
  { src: '/wooden-box-1.webp',         labelKey: 'slide8Label' },
];

export default function IntroCarousel() {
  const t = useTranslations('introCarousel');
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i) => setIdx(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

  return (
    <div
      className="ic-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="ic-track"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {SLIDES.map((s, i) => {
          const label = t(s.labelKey);
          return (
            <div className="ic-slide" key={i}>
              <img
                src={s.src}
                alt={label}
                loading={i === 0 ? 'eager' : 'lazy'} width="1200" height="900"
              />
              <div className="ic-overlay" />
              <div className="ic-caption">
                <div className="ic-num">
                  {String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </div>
                <div className="ic-label">{label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="ic-arrow ic-prev"
        onClick={() => go(idx - 1)}
        aria-label={t('prevSlide')}
      >
        ‹
      </button>
      <button
        className="ic-arrow ic-next"
        onClick={() => go(idx + 1)}
        aria-label={t('nextSlide')}
      >
        ›
      </button>

      <div className="ic-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`ic-dot ${i === idx ? 'is-active' : ''}`}
            onClick={() => go(i)}
            aria-label={t('goToSlide', { n: i + 1 })}
          />
        ))}
      </div>

      <div className="ic-tag">{t('locationTag')}</div>
    </div>
  );
}
