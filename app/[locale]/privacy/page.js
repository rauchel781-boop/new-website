import { unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SITE } from '@/data/site-config';

// Privacy Policy is maintained in English only — every locale's /privacy URL
// canonicalises to /en/privacy so Google indexes a single canonical copy.
// Same pattern the blog uses.
export function generateMetadata({ params: { locale } }) {
  const en = routing.defaultLocale;
  const path = `/${en}/privacy`;
  return {
    title: 'Privacy Policy — CHIC',
    description:
      'How Xiamen Chic Homeware Co.,Ltd. collects, uses, stores, and protects information you share when using custom-woodenbox.com.',
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: 'Privacy Policy — CHIC',
      description:
        'How CHIC handles personal information from website visitors, inquiry submissions, and newsletter subscribers.',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const LAST_UPDATED = 'May 12, 2026';

const LEGAL_CSS = `
.legal {
  font-family: var(--font-jost), system-ui, sans-serif;
  background: #F6EEDF;
  color: #2A1B12;
  min-height: 60vh;
}
.legal-inner {
  max-width: 820px;
  margin: 0 auto;
  padding: 64px 32px 96px;
}
.legal h1 {
  font-family: var(--font-fraunces), serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: #3D2A1F;
  letter-spacing: -0.5px;
  margin: 0 0 8px;
}
.legal .updated {
  font-size: 0.75rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #A07852;
  font-weight: 600;
  margin-bottom: 36px;
  display: block;
}
.legal h2 {
  font-family: var(--font-fraunces), serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #3D2A1F;
  margin: 40px 0 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(107,74,51,0.18);
  letter-spacing: -0.2px;
}
.legal h3 {
  font-family: var(--font-jost), system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #6B4A33;
  margin: 26px 0 8px;
}
.legal p { font-size: 0.95rem; line-height: 1.8; color: #2A1B12; margin: 0 0 14px; }
.legal ul { padding-left: 22px; margin: 0 0 16px; }
.legal li { font-size: 0.95rem; line-height: 1.75; margin-bottom: 6px; color: #2A1B12; }
.legal a { color: #A07852; text-decoration: underline; text-underline-offset: 3px; }
.legal a:hover { color: #6B4A33; }
.legal strong { color: #3D2A1F; font-weight: 600; }
.legal .lead {
  font-size: 1.05rem;
  color: #6B4A33;
  font-style: italic;
  padding: 18px 22px;
  background: #ECDFC6;
  border-left: 3px solid #C58E4A;
  border-radius: 0 4px 4px 0;
  margin-bottom: 32px;
  line-height: 1.7;
}
@media (max-width: 640px) {
  .legal-inner { padding: 40px 22px 60px; }
  .legal h1 { font-size: 1.8rem; }
  .legal h2 { font-size: 1.15rem; margin-top: 32px; }
}
`;

export default function PrivacyPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="legal">
      <style dangerouslySetInnerHTML={{ __html: LEGAL_CSS }} />
      <div className="legal-inner">
        <h1>Privacy Policy</h1>
        <span className="updated">Last updated: {LAST_UPDATED}</span>

        <p className="lead">
          This Privacy Policy explains how <strong>{SITE.company.legalName}</strong> (&quot;CHIC&quot;,
          &quot;we&quot;, &quot;us&quot;) collects, uses, and shares information when you visit{' '}
          <a href={SITE.siteUrl}>custom-woodenbox.com</a> (the &quot;Site&quot;), submit an inquiry,
          subscribe to our newsletter, or interact with our team. We try to keep this short and plain.
        </p>

        <h2>1. Who we are</h2>
        <p>
          CHIC is a custom wooden box manufacturer registered in Xiamen, Fujian, China,
          with our production facility in Cao County, Shandong. We serve B2B customers
          — importers, brands, retailers, and packaging buyers — across 60+ countries.
        </p>
        <p>
          For any privacy questions or requests, contact us at{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>2. Information we collect</h2>

        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Inquiry forms:</strong> name, company, email address, country, and the
            message you write.
          </li>
          <li>
            <strong>Newsletter signup:</strong> email address only.
          </li>
          <li>
            <strong>Direct contact:</strong> anything you choose to share when emailing us,
            messaging on WhatsApp, or chatting via the on-page Tawk.to widget.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Log data:</strong> IP address, browser type and version, operating system,
            referring URL, pages viewed, and timestamps. This is standard web-server data
            used for security and basic site analytics.
          </li>
          <li>
            <strong>Cookies and similar technologies:</strong> see section 4.
          </li>
        </ul>

        <h2>3. How we use information</h2>
        <ul>
          <li>
            To respond to your inquiry with a quote, sample, or product information.
          </li>
          <li>
            To send you the newsletter you subscribed to (you can unsubscribe at any time —
            see section 8).
          </li>
          <li>
            To improve the Site, fix bugs, and understand which products and content are
            most useful to visitors.
          </li>
          <li>
            To comply with applicable laws, export regulations, and tax requirements.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal information to third parties.
          We do <strong>not</strong> use your data for behavioral advertising.
        </p>

        <h2>4. Cookies and tracking technologies</h2>
        <p>
          The Site uses a minimal set of cookies and similar technologies:
        </p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> required for the language switcher, the
            contact form session, and basic security. These can&apos;t be disabled.
          </li>
          <li>
            <strong>Tawk.to chat cookies:</strong> set by our chat widget so a conversation
            can persist across pages. See <a href="https://www.tawk.to/data-protection/" target="_blank" rel="noopener noreferrer">tawk.to&apos;s privacy notice</a>.
          </li>
        </ul>
        <p>
          You can block or delete cookies in your browser settings. Blocking essential
          cookies may break parts of the Site.
        </p>

        <h2>5. Third-party services we use</h2>
        <p>
          The Site is built and run with help from a small number of third-party
          processors. They only receive what they need to do their job:
        </p>
        <ul>
          <li>
            <strong>EmailJS</strong> — delivers your inquiry and newsletter signup from
            our forms to our inbox. Receives form fields and your email address.
            (<a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">privacy policy</a>)
          </li>
          <li>
            <strong>Tawk.to</strong> — runs the live chat widget. Receives chat
            transcript and basic device info if you open the chat.
            (<a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer">privacy policy</a>)
          </li>
          <li>
            <strong>Google Fonts</strong> — serves the Playfair, Fraunces, Jost, and
            Caveat fonts used on the Site. Receives your IP address when fonts load.
            (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)
          </li>
          <li>
            <strong>Coolify / Netcup</strong> — hosts the Site. Receives the same web-server
            log data noted in section 2.
          </li>
        </ul>

        <h2>6. International data transfers</h2>
        <p>
          CHIC is based in <strong>China</strong>, and our staff process inquiries from
          our Xiamen office. By submitting an inquiry or signing up for our
          newsletter, you understand that your information will be transferred to and
          processed in China, where data protection laws may differ from those in
          your country.
        </p>
        <p>
          We use standard email and form-handling services and apply reasonable
          technical and organizational safeguards. If you are an EU/EEA, UK, or
          Switzerland resident and need a specific transfer mechanism (e.g., Standard
          Contractual Clauses), email us and we will work with you.
        </p>

        <h2>7. Data retention</h2>
        <ul>
          <li>
            <strong>Inquiry messages:</strong> kept as long as our business relationship is
            active, plus a reasonable period afterward for tax and accounting records
            (typically up to 7 years per Chinese law).
          </li>
          <li>
            <strong>Newsletter signups:</strong> kept until you unsubscribe.
          </li>
          <li>
            <strong>Server logs:</strong> typically rotated within 30–90 days.
          </li>
        </ul>

        <h2>8. Your rights</h2>
        <p>
          Depending on where you live (GDPR for EU/UK, CCPA for California, similar
          laws elsewhere), you may have the right to:
        </p>
        <ul>
          <li>Ask what personal information we hold about you.</li>
          <li>Ask us to correct inaccurate information.</li>
          <li>Ask us to delete your information (subject to retention requirements above).</li>
          <li>Withdraw consent for marketing emails by clicking the unsubscribe link
              in any newsletter, or by emailing us.</li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>
        <p>
          To exercise any of these rights, email{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with the subject line
          &quot;Privacy Request&quot;. We will respond within 30 days.
        </p>

        <h2>9. Children&apos;s privacy</h2>
        <p>
          The Site is intended for business buyers. It is not directed to children
          under 16, and we do not knowingly collect information from anyone under 16.
          If you believe we have, contact us and we will delete it.
        </p>

        <h2>10. Security</h2>
        <p>
          All traffic to the Site is encrypted with TLS (HTTPS). Form submissions go
          to our inboxes over the third-party processors listed above. We use
          industry-standard email security on our side. No transmission over the
          internet is 100% secure — please don&apos;t send anything truly sensitive
          (passwords, payment card data, IDs) over our contact forms.
        </p>

        <h2>11. Changes to this policy</h2>
        <p>
          When we change this policy meaningfully, we update the &quot;Last updated&quot;
          date at the top and — if the change affects you — note it in our next
          newsletter. Material changes that require new consent will ask for it
          before taking effect.
        </p>

        <h2>12. Contact us</h2>
        <p>
          Questions about this policy or about how we handle your information?
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or write to us at:
        </p>
        <p>
          {SITE.company.legalName}<br />
          {SITE.addresses.salesOffice.lines.join(', ')}
        </p>
      </div>
    </div>
  );
}
