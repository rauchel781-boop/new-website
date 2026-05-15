import { alternates } from '@/i18n/seo';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'woodFab.meta' });
  const title = t('title');
  return {
    title,
    description: t('description'),
    alternates: alternates(locale, '/wood-fabrication'),
    openGraph: {
      url: `/${locale}/wood-fabrication`,
      title,
      description: t('ogDescription'),
    },
  };
}

export default async function WoodFabricationPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'woodFab' });
  const cards = [
    { t: t('card1Title'), d: t('card1Desc') },
    { t: t('card2Title'), d: t('card2Desc') },
    { t: t('card3Title'), d: t('card3Desc') },
  ];
  return (
    <section className="container section-pad">
      <h1 className="text-4xl font-extrabold text-brand-navy">{t('h1')}</h1>
      <p className="mt-4 max-w-3xl text-brand-ink/90 leading-relaxed">{t('intro')}</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.t} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="font-bold text-brand-navy">{c.t}</h3>
            <p className="mt-2 text-brand-ink/80">{c.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
