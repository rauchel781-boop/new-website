import { Link } from '@/i18n/navigation';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#FAF6EC] via-[#F1E7D2] to-[#E8D9BC] text-brand-teal">
      <div className="container grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        {/* Left copy */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-brand-teal">
            Custom Wood Products
            <br />
            Manufacturer in China
          </h1>

          <div className="mt-8 space-y-5 text-[15px] md:text-base text-brand-ink/85 leading-relaxed max-w-xl">
            <p>
              CHIC is a leading wood products manufacturer in China. We use advanced
              manufacturing equipment to produce high-quality solid wood panels and plywood.
              Additionally, we support the design and customization of wood products.
            </p>
            <p>
              We can manufacture a wide variety of wood products in different shapes, sizes, and
              finishes, making us a reliable source for wholesale wood products.
            </p>
            <p>
              We are committed to providing customers with one-stop solutions for wood product
              manufacturing, ensuring high-quality results and efficient service.
            </p>
          </div>

          <div className="mt-9 max-w-xl">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-md bg-brand-teal px-7 py-4 text-base font-semibold text-white shadow-md transition hover:bg-brand-tealDark hover:-translate-y-0.5"
            >
              Send Us Your Needs Now →
            </Link>
          </div>
        </div>

        {/* Right image card */}
        <div className="relative">
          <div className="rounded-3xl bg-white p-4 shadow-2xl">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 relative">
              {/* Logo badge */}
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold tracking-wide text-brand-ink shadow">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-teal text-brand-wood text-[10px]">
                  ◧
                </span>
                CHIC · wooden expert
              </div>
              {/* SVG illustration of a wood workshop */}
              <svg viewBox="0 0 600 450" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f5e7c8" />
                    <stop offset="100%" stopColor="#d6b87f" />
                  </linearGradient>
                  <linearGradient id="plank" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#e6c697" />
                    <stop offset="100%" stopColor="#b58a52" />
                  </linearGradient>
                </defs>
                <rect x="0" y="280" width="600" height="170" fill="url(#floor)" />
                <rect x="0" y="0" width="600" height="280" fill="#efe4cf" />
                {/* stacked planks left */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <rect
                    key={i}
                    x="40"
                    y={150 + i * 18}
                    width="260"
                    height="14"
                    rx="2"
                    fill="url(#plank)"
                    stroke="#7a5a30"
                    strokeWidth="0.5"
                  />
                ))}
                {/* CNC / saw machine */}
                <rect x="340" y="120" width="220" height="170" rx="8" fill="#3a3a3f" />
                <rect x="360" y="140" width="180" height="100" rx="4" fill="#1f1f22" />
                <circle cx="450" cy="190" r="34" fill="#9aa0a6" />
                <circle cx="450" cy="190" r="22" fill="#3a3a3f" />
                <rect x="350" y="240" width="200" height="14" fill="#5b5b62" />
                <rect x="395" y="250" width="110" height="40" fill="#2a2a2d" />
                {/* board on machine */}
                <rect x="320" y="270" width="260" height="14" fill="url(#plank)" stroke="#7a5a30" strokeWidth="0.5" />
                {/* sawdust dots */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <circle key={i} cx={300 + (i * 9) % 280} cy={300 + (i * 13) % 100} r="1.4" fill="#a98856" />
                ))}
              </svg>
            </div>
            <div className="py-3 text-center text-[15px] md:text-base font-bold text-brand-ink">
              Professional Wooden Board Manufacturing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
