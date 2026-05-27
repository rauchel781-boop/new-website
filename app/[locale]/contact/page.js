// Server component wrapper — exports metadata for SEO and renders the
// existing client-side contact UI from ContactClient.jsx.
import ContactClient from './ContactClient';
import JsonLd from '@/components/JsonLd';
import { alternates } from '@/i18n/seo';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PageBreadcrumbLd from '@/components/PageBreadcrumbLd';

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

export default async function ContactPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  // FAQPage structured data — mirrors the visible 8-item FAQ accordion rendered
  // in ContactClient.jsx (translations live under `contact.faq`, keys q1/a1…q8/a8).
  // Built server-side so the JSON-LD lands in the initial HTML, making the page
  // eligible for Google's FAQ rich result. Localized per visitor's language.
  const t = await getTranslations({ locale, namespace: 'contact.faq' });
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
      '@type': 'Question',
      name: t(`q${i}`),
      acceptedAnswer: { '@type': 'Answer', text: t(`a${i}`) },
    })),
  };

  return (
    <>
      <PageBreadcrumbLd locale={locale} name="Contact" path="/contact" />
      <JsonLd data={faqLd} />
      <ContactClient />
    </>
  );
}
