import { alternates } from '@/i18n/seo';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: 'Capabilities — CHIC',
    description:
      'CNC routing, laser engraving, hot foil, screen print, kiln drying, finishing and packing — modern equipment and a strict QC system for wholesale and OEM wooden box programs.',
    alternates: alternates(locale, '/capabilities'),
    openGraph: {
      url: `/${locale}/capabilities`,
      title: 'Capabilities — CHIC',
      description:
        'CNC routing, laser, hot foil, screen print, kiln drying, finishing and packing — wholesale and OEM wooden box production.',
    },
  };
}

export default function CapabilitiesPage() {
  return (
    <section className="container section-pad">
      <h1 className="text-4xl font-extrabold text-brand-navy">Our Capabilities</h1>
      <p className="mt-4 max-w-3xl text-brand-ink/90 leading-relaxed">
        Modern equipment, experienced operators, and a strict quality system — designed for
        wholesale and OEM customers.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: 'Manufacturing Equipment', d: 'CNC routers, sliding panel saws, edge banders, finishing booths.' },
          { t: 'Quality Control', d: 'Multi-stage inspection from incoming materials to pre-shipment.' },
          { t: 'OEM / ODM', d: 'Branding, packaging, and full design support for private label.' },
          { t: 'Capacity', d: 'Stable monthly output with predictable lead times.' },
          { t: 'Engineering Support', d: 'CAD review, prototyping, and DFM suggestions.' },
          { t: 'Logistics', d: 'Reliable export packing and worldwide shipping coordination.' },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="font-bold text-brand-navy">{c.t}</h3>
            <p className="mt-2 text-sm text-brand-mute">{c.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
