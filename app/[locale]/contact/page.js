// Server component wrapper — exports metadata for SEO and renders the
// existing client-side contact UI from ContactClient.jsx.
import ContactClient from './ContactClient';
import { alternates } from '@/i18n/seo';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: 'Contact — CHIC Wooden Expert',
    description:
      'Get in touch with CHIC — sales office in Xiamen, factory in Cao County. WhatsApp, WeChat, email, and a contact form for OEM/ODM wooden box inquiries.',
    alternates: alternates(locale, '/contact'),
    openGraph: {
      url: `/${locale}/contact`,
      title: 'Contact — CHIC Wooden Expert',
      description:
        'Sales office in Xiamen, factory in Cao County. WhatsApp, WeChat, email and contact form for OEM/ODM wooden box inquiries.',
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
