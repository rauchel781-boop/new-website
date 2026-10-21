import { Link } from '@/i18n/navigation';
import { ContactChoices } from '@/components/ContactOptions';

// A short procurement path for the English wholesale landing page.
export default function HomeBuyerGuide() {
  return (
    <section className="buyer-guide" id="ordering" aria-labelledby="buyer-guide-title">
      <div className="buyer-guide-inner">
        <div className="section-label">Planning a bulk order</div>
        <h2 className="section-title" id="buyer-guide-title">How to Order Custom Wooden Boxes</h2>
        <p className="buyer-guide-intro">Start with a reference model and the items it needs to hold. MOQ is 200 pieces per design for OEM and ODM production; arrange the pre-production sample separately.</p>
        <div className="buyer-guide-grid">
          <article>
            <h3>1. Match the box to the contents</h3>
            <p>Send item dimensions, weight and the number of pieces per box. Compare <Link href="/products/gift-packaging">custom wooden gift packaging</Link> and <Link href="/products/wine-whisky">wooden wine and spirits boxes</Link>. Allow for dividers, insert thickness and room to remove the contents.</p>
          </article>
          <article>
            <h3>2. Define the structure and artwork</h3>
            <p>Choose the opening, wood, finish, interior and logo position. Use the <Link href="/material-guide">wood material guide</Link> and <Link href="/blog/wooden-box-closure-types-compared">closure comparison</Link> to narrow the brief. Include reference photos or a drawing and your logo file.</p>
          </article>
          <article>
            <h3>3. Review the sample before production</h3>
            <p>Agree the sample specification, cost and schedule first. Check usable interior space, lid movement, finish, logo and packing. The <Link href="/blog/low-moq-sampling-strategy">sampling guide</Link> explains what to confirm; a sample is separate from a 200-piece production trial.</p>
          </article>
          <article>
            <h3>4. Request a quote for the complete order</h3>
            <p>Include quantity, packing requirements, destination and required delivery date. The <Link href="/blog/custom-wooden-box-cost-2026">wooden box cost guide</Link> explains the specification choices behind a quote. Production and shipping dates are confirmed for the approved design.</p>
          </article>
        </div>
        <div className="buyer-guide-contact">
          <p>Email your dimensions, artwork and attachments for a detailed quotation, or use WhatsApp for a quick question.</p>
          <ContactChoices />
        </div>
      </div>
    </section>
  );
}
