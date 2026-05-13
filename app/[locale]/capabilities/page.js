import { alternates } from '@/i18n/seo';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'capabilities.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: alternates(locale, '/capabilities'),
    openGraph: {
      url: `/${locale}/capabilities`,
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  };
}

// Cards keys must match messages.capabilities.cards.<key>.{t,d}
const CARD_KEYS = ['manufacturing', 'qc', 'oem', 'capacity', 'engineering', 'logistics'];

// FAQ items must match messages.capabilities.faq.q{N} / a{N}.
const FAQ_INDICES = [1, 2, 3, 4, 5, 6, 7];

export default async function CapabilitiesPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'capabilities' });

  // Build FAQ items + matching FAQPage JSON-LD. The on-page Q&A and the
  // schema use the same translated text — required by Google's FAQ rich
  // result guidelines (schema content must match visible content).
  const faqItems = FAQ_INDICES.map((i) => ({
    q: t(`faq.q${i}`),
    a: t(`faq.a${i}`),
  }));
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="container section-pad">
      <JsonLd data={faqLd} />
      <h1 className="text-4xl font-extrabold text-brand-navy">{t('h1')}</h1>
      <p className="mt-4 max-w-3xl text-brand-ink/90 leading-relaxed">{t('intro')}</p>

      {/* ── Capability cards ─────────────────────────────────────── */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARD_KEYS.map((key) => (
          <div key={key} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="font-bold text-brand-navy">{t(`cards.${key}.t`)}</h3>
            <p className="mt-2 text-brand-ink/80">{t(`cards.${key}.d`)}</p>
          </div>
        ))}
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="mt-20 max-w-4xl">
        <h2 className="text-3xl font-extrabold text-brand-navy">{t('faq.title')}</h2>
        <p className="mt-3 text-brand-ink/85 leading-relaxed">{t('faq.sub')}</p>

        <div className="mt-8 space-y-4">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 open:ring-brand-teal/30"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer items-start gap-4 list-none">
                <span className="font-bold text-brand-navy flex-1">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 text-brand-teal text-lg transition-transform group-open:rotate-45 leading-none"
                >+</span>
              </summary>
              <p className="mt-3 text-brand-ink/85 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  );
}
