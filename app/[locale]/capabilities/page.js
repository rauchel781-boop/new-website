import { alternates } from '@/i18n/seo';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';

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

export default async function CapabilitiesPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'capabilities' });
  return (
    <section className="container section-pad">
      <h1 className="text-4xl font-extrabold text-brand-navy">{t('h1')}</h1>
      <p className="mt-4 max-w-3xl text-brand-ink/90 leading-relaxed">{t('intro')}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARD_KEYS.map((key) => (
          <div key={key} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="font-bold text-brand-navy">{t(`cards.${key}.t`)}</h3>
            <p className="mt-2 text-brand-ink/80">{t(`cards.${key}.d`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
