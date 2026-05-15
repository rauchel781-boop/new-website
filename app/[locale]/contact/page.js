// Server component wrapper — exports metadata for SEO and renders the
// existing client-side contact UI from ContactClient.jsx.
import ContactClient from './ContactClient';
import { alternates } from '@/i18n/seo';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
  const title = t('title');
  return {
    title,
    description: t('description'),
    alternates: alternates(locale, '/contact'),
    openGraph: {
      url: `/${locale}/contact`,
      title,
      description: t('ogDescription'),
    },
  };
}

export default function ContactPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  return <ContactClient />;
}
