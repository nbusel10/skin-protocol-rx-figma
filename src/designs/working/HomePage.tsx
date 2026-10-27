import ProtocolOverviewSection from '../ProtocolOverviewSection'

export default function HomePage() {
  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <section id="feature" className="scroll-mt-28 bg-[#FFFDFA] py-10 md:py-14">
        <div className="grid min-[681px]:min-h-[clamp(320px,36vw,520px)] min-[681px]:grid-cols-[48%_52%]">
          <div className="flex flex-col justify-center px-6 py-6 min-[681px]:py-8 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Skincare with intention</p>
            <h1 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
              Your Skin Doesn&apos;t Need More. <em className="italic text-[#ab8584]">It Needs What Works.</em>
            </h1>
            <p className="mb-4 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              Every formula is thoughtfully crafted with evidence-based science to support healthier skin—without trends or unnecessary extras.
            </p>
            <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
              <button type="button" className="group inline-flex min-h-12 w-full items-center justify-center gap-4 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white transition-colors duration-200 hover:bg-[#141412] min-[480px]:w-auto">
                <span className="relative inline-block whitespace-nowrap">
                  <span>Explore the collection</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 text-[#ab8584] transition-[clip-path] duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                  >
                    Explore the collection
                  </span>
                </span>
                <span className="relative inline-block">
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                    ↗
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 text-[#ab8584] transition-[clip-path,transform] duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:[clip-path:inset(0_0_0_0)]"
                  >
                    ↗
                  </span>
                </span>
              </button>
              <button type="button" className="group inline-flex min-h-12 w-full items-center justify-center gap-4 border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200 hover:bg-[#252520] hover:text-white min-[480px]:w-auto">
                Build your protocol{' '}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </button>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden bg-[#FFFDFA]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
            <div className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[130%] w-[58%] rounded-t-[240px] bg-[#EDE6DC]/55" />
            <div className="pointer-events-none absolute -bottom-[14%] right-[18%] h-[122%] w-[52%] rounded-t-[220px] border border-[#D6CEC3]/70 bg-transparent" />
            <div className="pointer-events-none absolute top-[12%] left-[8%] h-[42%] w-[28%] rounded-full bg-[#F3EDE5]/40 blur-2xl" />
            <div className="absolute inset-[8%] overflow-hidden">
              <img
                src="/designs/working/shop-hero.jpg"
                alt="Skin Protocol RX bottles and jars on cream stone"
                className="h-full w-full object-cover object-[center_58%]"
              />
            </div>
            <p className="absolute bottom-8 left-8 max-w-[250px] bg-[#EDE6DC]/20 px-5 py-4 font-serif text-xl leading-snug text-[#252520] backdrop-blur-sm">
              Science guided by nature.
            </p>
          </div>
        </div>
      </section>

      <section id="philosophy-beaker" className="scroll-mt-28 bg-[#f8f4ef] py-16 text-[#252520] md:py-[75px]">
        <div className="grid grid-cols-1 items-center gap-12 min-[681px]:grid-cols-[48%_52%]">
          <div className="px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[8%]">
            <div className="relative aspect-square w-[90%] overflow-hidden bg-[#FFFDFA]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
              <div className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[130%] w-[58%] rounded-t-[240px] bg-[#EDE6DC]/55" />
              <div className="pointer-events-none absolute -bottom-[14%] right-[18%] h-[122%] w-[52%] rounded-t-[220px] border border-[#D6CEC3]/70 bg-transparent" />
              <div className="pointer-events-none absolute top-[12%] left-[8%] h-[42%] w-[28%] rounded-full bg-[#F3EDE5]/40 blur-2xl" />
              <div className="absolute inset-[8%] overflow-hidden">
                <img
                  src="/original/founders-lab.jpg"
                  alt="Skin Protocol RX founders formulating skincare in a New York lab"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <p className="absolute bottom-8 left-8 max-w-[250px] bg-[#EDE6DC]/20 px-5 py-4 font-serif text-xl leading-snug text-[#252520] backdrop-blur-sm">
                What stays in the beaker
              </p>
            </div>
          </div>
          <div className="flex flex-col px-6 min-[681px]:pr-[max(36px,8vw)] min-[681px]:pl-0">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Our Philosophy</p>
            <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
              Only what <em className="italic text-[#ab8584]">earns its place.</em>
            </h2>
            <p className="mb-8 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              We approach each formula with professional standards and a simple question: what does skin actually need?
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="mb-4 font-serif text-[22px] text-[#252520]">Kept</h3>
                <ul className="space-y-3">
                  {[
                    'Clinically relevant active ingredients',
                    'Intentional concentrations',
                    'Balanced, skin-supportive formulas',
                    'Multi-functional ingredients selected with purpose',
                    'Formulation decisions grounded in long-term skin health',
                  ].map(item => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#5B574F]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ab8584]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#FFFDFA] px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="mb-4 font-serif text-[22px] text-[#252520]">Left out</h3>
                <ul className="space-y-3">
                  {[
                    'Overloaded ingredient lists',
                    'Redundant actives',
                    'Trend-driven formulation',
                    'Unnecessary fillers',
                    'Fragrance added without purpose',
                  ].map(item => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#6D6A63]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9BFB3]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 grid max-w-[650px] grid-cols-1 border-t border-[#D6CEC3] min-[701px]:grid-cols-3">
              {[
                { href: '/our-story#our-standards', label: 'Our Standards', body: 'How we decide what stays and what stays out.' },
                { href: '/ingredient-glossary', label: 'Ingredient Glossary', body: 'See what is in the formulas and why.' },
                { href: '/product-education', label: 'Product Education', body: 'Learn what each product is good for.' },
              ].map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center justify-between gap-2.5 border-b border-[#D6CEC3] py-[18px] text-left min-[701px]:border-b-0 min-[701px]:border-l min-[701px]:px-3 min-[701px]:py-5 min-[701px]:first:border-l-0 min-[701px]:first:pl-0 min-[701px]:last:pr-0 ${i === 2 ? 'border-b-0' : ''}`}
                >
                  <span>
                    <span className="relative inline-block whitespace-nowrap text-sm font-semibold text-[#252520] transition-colors group-hover:text-[#ab8584] after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-[#ab8584] after:transition-[width] after:duration-300 group-hover:after:w-full">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-[#6D6A63]">{item.body}</span>
                  </span>
                  <span className="shrink-0 text-[#252520] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#ab8584]" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProtocolOverviewSection
        tone="editorial"
        imageRight
        alignHero
        onCta={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })}
        onStepClick={step => {
          window.location.assign(`/shop?step=${step}`)
        }}
      />
    </article>
  )
}
