import { alternates } from '@/i18n/seo';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: 'Wood Fabrication — CHIC',
    description:
      'From rough timber to finished, packaged wooden box components — CHIC handles cutting, shaping, mortising, pre-assembly, polishing and packing under one 15,000 m² roof.',
    alternates: alternates(locale, '/wood-fabrication'),
    openGraph: {
      url: `/${locale}/wood-fabrication`,
      title: 'Wood Fabrication — CHIC',
      description:
        'Rough timber to finished, packaged wooden box components — full in-house wood fabrication.',
    },
  };
}

export default function WoodFabricationPage() {
  return (
    <section className="container section-pad">
      <h1 className="text-4xl font-extrabold text-brand-navy">Wood Fabrication</h1>
      <p className="mt-4 max-w-3xl text-brand-ink/90 leading-relaxed">
        From rough timber to finished, packaged components — our facility handles the entire wood
        fabrication process under one roof.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          { t: 'CNC Machining', d: 'Precise cutting, drilling and routing on 3-axis and 4-axis machines.' },
          { t: 'Sanding & Finishing', d: 'Belt and orbital sanding, oiling, lacquering and painting lines.' },
          { t: 'Custom Shaping', d: 'Turning, carving, edge profiling, and assembly to your drawings.' },
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
