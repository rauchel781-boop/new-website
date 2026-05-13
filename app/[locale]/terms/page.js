import { unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SITE } from '@/data/site-config';

// Terms of Service is maintained in English only — every locale's /terms URL
// canonicalises to /en/terms so Google indexes a single canonical copy.
export function generateMetadata({ params: { locale } }) {
  const en = routing.defaultLocale;
  const path = `/${en}/terms`;
  return {
    title: 'Terms of Service — CHIC',
    description:
      'The terms that govern your use of custom-woodenbox.com and the B2B inquiry / quotation process with Xiamen Chic Homeware Co.,Ltd.',
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: 'Terms of Service — CHIC',
      description:
        'Terms governing use of the CHIC website and the inquiry and quotation process.',
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

export default function TermsPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="legal">
      <style dangerouslySetInnerHTML={{ __html: LEGAL_CSS }} />
      <div className="legal-inner">
        <h1>Terms of Service</h1>
        <span className="updated">Last updated: {LAST_UPDATED}</span>

        <p className="lead">
          These terms govern your use of <a href={SITE.siteUrl}>custom-woodenbox.com</a>{' '}
          (the &quot;Site&quot;) and the inquiry and quotation process with{' '}
          <strong>{SITE.company.legalName}</strong> (&quot;CHIC&quot;, &quot;we&quot;,
          &quot;us&quot;). By using the Site or contacting us, you agree to these terms.
        </p>

        <h2>1. About these terms</h2>
        <p>
          The Site is a B2B catalog and inquiry tool. It is owned and operated by{' '}
          {SITE.company.legalName}, a company registered in Xiamen, Fujian, China.
        </p>
        <p>
          Nothing on the Site is an offer to sell or a binding contract. Product pages,
          specifications, and indicative pricing are for reference only. A binding sales
          contract is formed only when both parties sign a written agreement (PI, contract,
          or order confirmation) covering the specific order.
        </p>

        <h2>2. Use of the Site</h2>
        <p>
          You may browse the Site, download product information, and submit inquiries for
          legitimate business purposes. You agree <strong>not</strong> to:
        </p>
        <ul>
          <li>Use the Site for any unlawful purpose or in violation of any export-control,
              sanctions, or trade law that applies to you.</li>
          <li>Scrape, copy, or republish substantial portions of the Site without our
              written permission.</li>
          <li>Attempt to interfere with the Site&apos;s operation, security, or
              availability.</li>
          <li>Submit false, misleading, or third-party contact details when sending an
              inquiry.</li>
          <li>Reverse engineer, decompile, or otherwise extract source code.</li>
        </ul>

        <h2>3. Inquiries and quotations</h2>
        <p>
          Inquiries you submit through the Site, by email, on WhatsApp, or via Tawk.to
          chat are <strong>not</strong> orders. Each inquiry triggers a quotation process:
        </p>
        <ul>
          <li>We respond with a quotation (price, MOQ, lead time, payment terms,
              packaging, and shipping options).</li>
          <li>Unless otherwise stated, quotations are <strong>valid for 30 days</strong>{' '}
              from the date issued and are subject to material price changes, currency
              fluctuation, and stock availability.</li>
          <li>A sales contract or Proforma Invoice (PI) is required for the order to be
              binding. Deposit terms vary by order size (commonly 30% deposit and 70%
              before shipment for new customers).</li>
        </ul>
        <p>
          Specifications, finishes, and lead times shown on product pages are typical
          but may vary by order and material availability. Final specs are confirmed in
          the PI / contract.
        </p>

        <h2>4. Product information and pricing</h2>
        <p>
          We try to keep product descriptions, photographs, and specifications accurate,
          but we don&apos;t warrant they are error-free, complete, or current. Wood is a
          natural material — grain, color, and finish vary between batches and pieces.
          Photographs are representative; production samples are the definitive
          reference.
        </p>
        <p>
          Any pricing shown on the Site (if any) is indicative. Final pricing is set in
          the quotation based on order quantity, customization, materials, and shipping
          terms (Incoterms).
        </p>

        <h2>5. Intellectual property</h2>
        <p>
          The Site, including its text, photographs, illustrations, layout, source code,
          and the CHIC brand, is owned by {SITE.company.legalName} or its licensors and
          is protected by Chinese and international copyright, trademark, and other
          intellectual property laws.
        </p>
        <p>
          You may not use any of our content commercially without our written
          permission. You may, however, reasonably reference the Site (e.g., link to a
          product page) when discussing CHIC products with your colleagues or
          customers.
        </p>
        <p>
          When you submit specifications, drawings, logos, or branding artwork to us as
          part of an inquiry or order, you confirm that you own them or are authorized
          to use them, and you grant us a non-exclusive license to use them solely for
          the purpose of producing your order. We do not use customer artwork or
          designs for any other customer.
        </p>

        <h2>6. Samples and prototypes</h2>
        <p>
          Sample fees, sample lead times, and shipping costs for samples are quoted
          per-request. Samples represent typical production quality but may differ
          slightly in grain, color, or finish from mass production. Approval of a
          production sample is required before bulk production begins.
        </p>

        <h2>7. Disclaimer of warranties</h2>
        <p>
          The Site is provided <strong>&quot;as is&quot; and &quot;as available&quot;</strong>.
          We make no warranty that the Site will be uninterrupted, error-free, secure,
          or free of viruses. To the maximum extent permitted by law, we disclaim all
          warranties, express or implied, including merchantability, fitness for a
          particular purpose, and non-infringement, with respect to the Site itself.
        </p>
        <p>
          Product warranties for goods we manufacture are governed by the sales
          contract or PI for that specific order, not by these Site Terms.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE.company.legalName} is not
          liable for any indirect, incidental, special, consequential, or punitive
          damages arising out of your use of the Site or any inability to use it,
          including loss of profits, business, data, or goodwill.
        </p>
        <p>
          For any direct damages arising from use of the Site itself (separate from
          any product order), our total liability will not exceed USD 100. This limit
          does not apply to liability that cannot be limited under applicable law.
        </p>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless {SITE.company.legalName}, its
          directors, employees, and agents from any claim arising out of (a) your
          misuse of the Site, (b) your violation of these Terms, or (c) your
          submission to us of any artwork, specification, or content that infringes a
          third party&apos;s rights.
        </p>

        <h2>10. Governing law and disputes</h2>
        <p>
          These Terms are governed by the <strong>laws of the People&apos;s Republic of
          China</strong>, without regard to conflict-of-laws principles.
        </p>
        <p>
          Any dispute arising out of or relating to these Terms or your use of the
          Site shall first be addressed through good-faith negotiation between the
          parties. If unresolved within 60 days, the dispute will be submitted to
          arbitration administered by the Xiamen Arbitration Commission in Xiamen,
          Fujian, China, in accordance with its rules then in effect. The arbitration
          award is final and binding.
        </p>
        <p>
          Sales contracts (PIs) for specific orders may specify different governing
          law and dispute-resolution terms — those terms take precedence over this
          section for the relevant order.
        </p>

        <h2>11. Export control and sanctions</h2>
        <p>
          You confirm that you are not located in, and will not export our products
          to, any country, person, or entity subject to applicable export-control or
          sanctions regimes (including but not limited to those administered by the
          UN, US OFAC, EU, UK, or China). Compliance with import laws and duties in
          your destination country is your responsibility.
        </p>

        <h2>12. Third-party links and services</h2>
        <p>
          The Site links to third-party sites (e.g., our LinkedIn page, our Alibaba
          store, partner logistics providers). We are not responsible for the content,
          privacy practices, or terms of those third-party sites. Use them at your own
          discretion.
        </p>

        <h2>13. Changes to these terms</h2>
        <p>
          We may update these Terms from time to time. When we change them
          meaningfully, we update the &quot;Last updated&quot; date at the top.
          Continued use of the Site after a change means you accept the updated
          Terms. For active orders, the Terms in force on the date of the PI / sales
          contract continue to apply to that order.
        </p>

        <h2>14. Contact us</h2>
        <p>
          Questions about these Terms? Email{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or write to us at:
        </p>
        <p>
          {SITE.company.legalName}<br />
          {SITE.addresses.salesOffice.lines.join(', ')}
        </p>
      </div>
    </div>
  );
}
