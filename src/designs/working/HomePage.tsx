import { useEffect } from 'react'
import ProtocolOverviewSection from '../ProtocolOverviewSection'
import OffsetPhoto, { OffsetFrame } from './OffsetPhoto'
import OutcomesSection from './OutcomesSection'
import ProtocolQuizSection from './ProtocolQuizSection'
import QuietGeometryMotif, { QuietGeometryFrame } from './quiet-geometry/QuietGeometryMotif'
import SunbeamMatGlow from './SunbeamMatGlow'
import './quiet-geometry/quiet-geometry.css'

const EYEBROW_QUIET = 'text-[11px] font-medium tracking-[0.16em] uppercase text-[#6D6A63]'
const EYEBROW_ROSE = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const HAIRLINE_BUTTON =
  'group inline-flex min-h-12 w-full items-center justify-center gap-3 border border-[#252520]/70 bg-transparent px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#252520] transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584] min-[480px]:w-auto'
const HAIRLINE_BUTTON_INLINE =
  'inline-flex min-h-12 items-center gap-3 border border-[#252520]/70 bg-transparent px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#252520] transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584]'

/** Solid ring with a dashed ring inside. Same 1px #C4A8A6 stroke as the photo frames. */
function RingPair({ className, size }: { className: string; size: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${size} ${className}`}>
      <div className="absolute inset-0 rounded-full border border-[#C4A8A6]" />
      <div className="absolute inset-[9%] origin-center animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#C4A8A6] motion-reduce:animate-none" />
    </div>
  )
}

/** Rings down the lighter page. The hero, philosophy, and founders rings sit in those sections. */

const PHILOSOPHY_KEPT = [
  'Clinically relevant active ingredients',
  'Intentional concentrations',
  'Balanced, skin-supportive formulas',
  'Multi-functional ingredients selected with purpose',
  'Formulation decisions grounded in long-term skin health',
]

const PHILOSOPHY_LEFT_OUT = [
  'Overloaded ingredient lists',
  'Redundant actives',
  'Trend-driven formulation',
  'Unnecessary fillers',
  'Fragrance added without purpose',
]

const PHILOSOPHY_LINKS = [
  { href: '/our-story#our-standards', label: 'Our Standards', body: 'How we decide what stays and what stays out.' },
  { href: '/ingredient-glossary', label: 'Ingredient Glossary', body: 'See what is in the formulas and why.' },
  { href: '/product-education', label: 'Product Education', body: 'Learn what each product is good for.' },
]

/** Lighter Our Philosophy section. */
function LighterPhilosophy({ id, background }: { id: string; background: string }) {
  return (
    <section id={id} className={`relative scroll-mt-28 overflow-visible py-16 text-[#252520] md:py-[75px] ${background}`}>
      <div className="relative z-10 grid grid-cols-1 items-center gap-12 min-[681px]:grid-cols-[48%_52%]">
        <div className="px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[8%]">
          <OffsetPhoto
            src="/designs/working/lighter/founders-lab.jpg"
            alt="Skin Protocol RX founders formulating skincare in a New York lab"
            caption="What stays in the beaker"
            className="w-[92%]"
            imgClassName="aspect-square"
          />
        </div>
        <div className="relative flex flex-col px-6 min-[681px]:pr-[max(36px,8vw)] min-[681px]:pl-0">
          <p className={EYEBROW_QUIET}>Our Philosophy</p>
          <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
            Only what <em className="italic text-[#ab8584]">earns its place.</em>
          </h2>
          <p className="mb-8 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
            We approach each formula with professional standards and a simple question: what does skin actually need?
          </p>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-[#D6CEC3]">
            <div className="py-1 sm:pr-20">
              <h3 className="mb-4 font-serif text-[22px] text-[#252520]">Kept</h3>
              <ul className="space-y-3">
                {PHILOSOPHY_KEPT.map(item => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#5B574F]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ab8584]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#D6CEC3] py-6 sm:border-t-0 sm:py-1 sm:pl-20">
              <h3 className="mb-4 font-serif text-[22px] text-[#252520]">Left out</h3>
              <ul className="space-y-3">
                {PHILOSOPHY_LEFT_OUT.map(item => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#6D6A63]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9BFB3]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-[116px] w-[116px] -translate-x-1/2 -translate-y-1/2 sm:block">
              <span aria-hidden="true" className="absolute inset-0 rounded-full border border-[#C4A8A6] bg-[#f3eceb]" />
              <span aria-hidden="true" className="absolute inset-[11%] rounded-full border border-dashed border-[#C4A8A6]" />
              <span className="absolute inset-0 flex items-center justify-center text-center text-[10px] font-medium uppercase leading-[1.35] tracking-[0.16em] text-[#ab8584]">
                By
                <br />
                intention
              </span>
            </p>
          </div>
          <div className="mt-8 grid max-w-[650px] grid-cols-1 border-t border-[#D6CEC3] min-[701px]:grid-cols-3">
            {PHILOSOPHY_LINKS.map((item, i) => (
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
          <RingPair className="top-full -right-[12%] min-[681px]:right-[calc(3rem-23.077%)]" size="h-[220px] w-[220px] md:h-[320px] md:w-[320px]" />
        </div>
      </div>
    </section>
  )
}

export default function HomePage({
  quietGeometry = false,
  lighter = false,
}: {
  quietGeometry?: boolean
  lighter?: boolean
}) {
  const eyebrow = lighter ? EYEBROW_QUIET : EYEBROW_ROSE

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '')
    if (!id) return
    const node = document.getElementById(id)
    if (!node) return
    const frame = requestAnimationFrame(() => node.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <article className={`${lighter ? 'relative isolate bg-white' : 'bg-[#F7F4EF]'} font-sans text-[#252520]${quietGeometry ? ' qg-preview line-quiet' : ''}`}>
      <section id="feature" className={`scroll-mt-28 py-10 md:py-14 ${lighter ? 'relative overflow-visible' : 'overflow-x-clip bg-[#FFFDFA]'}`}>
        {lighter ? (
          <RingPair className="-bottom-[46%] -left-[11%] z-[1]" size="h-[240px] w-[240px] md:h-[400px] md:w-[400px]" />
        ) : null}
        <div className={`grid min-[681px]:min-h-[clamp(320px,36vw,520px)] min-[681px]:grid-cols-[48%_52%]${lighter ? ' relative z-10' : ''}`}>
          <div className="flex flex-col justify-center px-6 py-6 min-[681px]:py-8 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]">
            <p className={eyebrow}>Skincare with intention</p>
            <h1 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
              Your Skin Doesn&apos;t Need More. <em className="italic text-[#ab8584]">It Needs What Works.</em>
            </h1>
            <p className="mb-4 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              Every formula is thoughtfully crafted with evidence-based science to support healthier skin—without trends or unnecessary extras.
            </p>
            <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center">
              {lighter ? (
                <>
                  <button type="button" className={HAIRLINE_BUTTON}>
                    Explore the collection
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-3 px-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#252520] min-[480px]:w-auto"
                  >
                    <span className="border-b border-[#ab8584] pb-0.5">Build your protocol</span>
                    <span className="inline-block text-[#ab8584] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                </>
              ) : (
                <>
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
                  <a
                    href="/designs/working/protocol"
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-4 border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200 hover:bg-[#252520] hover:text-white min-[480px]:w-auto"
                  >
                    Build your protocol{' '}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </>
              )}
            </div>
          </div>
          <div className={`relative min-h-[300px] ${lighter ? 'flex flex-col justify-center px-[8%] py-8' : `bg-[#FFFDFA]${quietGeometry ? ' overflow-hidden min-[681px]:min-h-[clamp(360px,40vw,560px)]' : ' overflow-hidden'}`}`}>
            {lighter ? (
              <OffsetPhoto
                src="/designs/working/lighter/shop-hero.jpg"
                alt="Skin Protocol RX bottles and jars on cream stone"
                caption="Science guided by nature."
                imgClassName="h-[clamp(280px,32vw,460px)] object-[center_58%]"
              />
            ) : quietGeometry ? (
              <>
                <QuietGeometryFrame variant="hero">
                  <img
                    src="/designs/working/shop-hero.jpg"
                    alt="Skin Protocol RX bottles and jars on cream stone"
                    className="h-full w-full object-cover object-[center_58%]"
                  />
                </QuietGeometryFrame>
                <p className="absolute bottom-[12%] left-[12%] z-[3] max-w-[250px] bg-[#EDE6DC]/20 px-5 py-4 font-serif text-xl italic leading-snug text-[#252520] backdrop-blur-sm">
                  Science guided by nature.
                </p>
              </>
            ) : (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
                <div className="pointer-events-none absolute top-[12%] left-[8%] h-[42%] w-[28%] rounded-full bg-[#F3EDE5]/40 blur-2xl" />
                <SunbeamMatGlow />
                <div className="absolute inset-[8%] z-[1]">
                  <OffsetFrame />
                  <div className="relative z-[1] h-full overflow-hidden">
                    <img
                      src="/designs/working/shop-hero.jpg"
                      alt="Skin Protocol RX bottles and jars on cream stone"
                      className="h-full w-full object-cover object-[center_58%]"
                    />
                  </div>
                </div>
                <p className="absolute bottom-8 left-8 z-[2] max-w-[250px] bg-[#EDE6DC]/20 px-5 py-4 font-serif text-xl italic leading-snug text-[#252520] backdrop-blur-sm">
                  Science guided by nature.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {lighter ? (
          <LighterPhilosophy id="philosophy-beaker" background="bg-[#f3eceb]" />
      ) : (
      <section id="philosophy-beaker" className="scroll-mt-28 overflow-x-clip bg-[#f5f0eb] py-16 text-[#252520] md:py-[75px]">
        {lighter ? (
          <RingPair className="-right-[12%] top-[38.5%]" size="h-[220px] w-[220px] md:h-[320px] md:w-[320px]" />
        ) : null}
        <div className={`grid grid-cols-1 items-center gap-12 min-[681px]:grid-cols-[48%_52%]${lighter ? ' relative z-10' : ''}`}>
          <div className="px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[8%]">
            {lighter ? (
              <OffsetPhoto
                src="/designs/working/lighter/founders-lab.jpg"
                alt="Skin Protocol RX founders formulating skincare in a New York lab"
                caption="What stays in the beaker"
                className="w-[92%]"
                imgClassName="aspect-square"
              />
            ) : quietGeometry ? (
              <div className="relative w-[90%]">
                <QuietGeometryFrame variant="philosophy" className="w-full">
                  <img
                    src="/original/founders-lab.jpg"
                    alt="Skin Protocol RX founders formulating skincare in a New York lab"
                    className="aspect-square h-auto w-full object-cover object-center"
                  />
                </QuietGeometryFrame>
                <p className="absolute bottom-[12%] left-[12%] z-[3] max-w-[250px] bg-[#EDE6DC]/20 px-5 py-4 font-serif text-xl leading-snug text-[#252520] backdrop-blur-sm">
                  What stays in the beaker
                </p>
              </div>
            ) : (
              <div className="relative aspect-square w-[90%] overflow-hidden bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
                <div className="pointer-events-none absolute top-[12%] left-[8%] h-[42%] w-[28%] rounded-full bg-[#F3EDE5]/40 blur-2xl" />
                <SunbeamMatGlow />
                <div className="absolute inset-[8%] z-[1]">
                  <OffsetFrame />
                  <div className="relative z-[1] h-full overflow-hidden">
                    <img
                      src="/original/founders-lab.jpg"
                      alt="Skin Protocol RX founders formulating skincare in a New York lab"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <p className="absolute bottom-8 left-8 z-[2] max-w-[250px] bg-[#EDE6DC]/20 px-5 py-4 font-serif text-xl leading-snug text-[#252520] backdrop-blur-sm">
                  What stays in the beaker
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col px-6 min-[681px]:pr-[max(36px,8vw)] min-[681px]:pl-0">
            <p className={eyebrow}>Our Philosophy</p>
            <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
              Only what <em className="italic text-[#ab8584]">earns its place.</em>
            </h2>
            <p className="mb-8 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              We approach each formula with professional standards and a simple question: what does skin actually need?
            </p>
            <div className={lighter ? 'grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-[#D6CEC3]' : 'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8'}>
              <div className={lighter ? 'py-1 sm:pr-8' : 'rounded-2xl bg-[#fffdfa] px-5 py-5 sm:px-6 sm:py-6'}>
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
              <div className={lighter ? 'border-t border-[#D6CEC3] py-6 sm:border-t-0 sm:py-1 sm:pl-8' : 'px-5 py-5 sm:px-6 sm:py-6'}>
                <h3 className="mb-4 font-serif text-[22px] text-[#252520]">Left out</h3>
                <ul className="space-y-3">
                  {[
                    'Parabens, Phthalates, Sulfates (SLS & SLES)',
                    'Formaldehyde-releasing preservatives',
                    'Artificial dyes & colorants',
                    'Synthetic fragrance',
                    'Drying alcohols',
                    'Unnecessary fillers',
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
                { href: '/about#our-standards', label: 'Our Standards', body: 'How we decide what stays and what stays out.' },
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
      )}

      <ProtocolOverviewSection
        tone="editorial"
        imageRight
        alignHero
        imageSrc="/designs/working/protocol-hero.jpg"
        imageAlt="Skin Protocol RX bottles and jars on stone in sunlit spa light"
        imageBackdrop={
          lighter ? undefined : quietGeometry ? (
            <div className="qg-frame qg-layout qg-layout-protocol pointer-events-none absolute inset-0 z-0 overflow-visible">
              <QuietGeometryMotif variant="protocol" />
            </div>
          ) : (
            <>
              <SunbeamMatGlow />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[calc(8%-1.25rem)] right-[calc(8%-1.25rem)] bottom-[8%] left-[calc(8%+2rem)] border border-[#C4A8A6] sm:left-[calc(8%+2.5rem)]"
              />
            </>
          )
        }
        eyebrowClassName={lighter ? EYEBROW_QUIET : undefined}
        buttonClassName={lighter ? HAIRLINE_BUTTON_INLINE : undefined}
        sectionClassName={lighter ? 'scroll-mt-28 overflow-visible py-16 text-[#252520] md:py-[75px]' : undefined}
        spf={lighter ? undefined : 'For daytime routines, finish with your favorite SPF.'}
        imageSlot={
          lighter ? (
            <div className="flex items-center px-6 py-4 min-[681px]:px-[8%] min-[681px]:py-8">
              <OffsetPhoto
                src="/designs/working/lighter/protocol-hero.jpg"
                alt="Skin Protocol RX bottles and jars on stone in sunlit spa light"
                className="w-full"
                imgClassName="h-[clamp(320px,36vw,520px)] object-[center_top]"
              />
            </div>
          ) : undefined
        }
        onCta={() => {
          if (lighter) {
            document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })
            return
          }
          window.location.assign('/designs/working/protocol')
        }}
        onStepClick={step => {
          window.location.assign(`/shop?step=${step}`)
        }}
      />

      <OutcomesSection decoration={lighter ? 'bullseye' : 'ascent'} composedHeader={!lighter} />

      {lighter ? <ProtocolQuizSection quietGeometry={quietGeometry} lighter /> : null}

      <section id="founders" className={`scroll-mt-28 py-16 text-[#252520] md:py-[75px] ${lighter ? 'relative overflow-visible' : 'overflow-x-clip bg-[#FFFDFA]'}`}>
        {lighter ? (
          <>
            <RingPair className="-z-10 -right-[14%] top-[6%] md:-right-[6%] md:top-[4%]" size="h-[150px] w-[150px] md:h-[240px] md:w-[240px]" />
            <RingPair className="-z-10 -right-[10%] top-[28%] md:-right-[3%] md:top-[28%]" size="h-[150px] w-[150px] md:h-[240px] md:w-[240px]" />
            <RingPair className="-z-10 -right-[16%] top-[50%] md:-right-[8%] md:top-[52%]" size="h-[150px] w-[150px] md:h-[240px] md:w-[240px]" />
          </>
        ) : null}
        <div className="grid grid-cols-1 items-center gap-12 min-[681px]:grid-cols-[48%_52%]">
          <div className="px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[8%]">
            {lighter ? (
              <OffsetPhoto
                src="/designs/working/lighter/our-story-foundation-lab.jpg"
                alt="Linda D. Amend, Susanna Amend, and Christina Corbin formulating together at the lab bench"
                className="w-[92%]"
                imgClassName="aspect-[3/2] object-[center_32%]"
              />
            ) : quietGeometry ? (
              <QuietGeometryFrame variant="founders" className="w-[90%]">
                <img
                  src="/our-story-foundation-lab.jpg"
                  alt="Linda D. Amend, Susanna Amend, and Christina Corbin formulating together at the lab bench"
                  className="aspect-[3/2] h-auto w-full object-cover object-[center_32%]"
                />
              </QuietGeometryFrame>
            ) : (
              <div className="relative aspect-[3/2] w-[90%] overflow-hidden bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
                <div className="pointer-events-none absolute top-[12%] left-[8%] h-[42%] w-[28%] rounded-full bg-[#F3EDE5]/40 blur-2xl" />
                <SunbeamMatGlow />
                <div className="absolute inset-[8%] z-[1]">
                  <OffsetFrame />
                  <div className="relative z-[1] h-full overflow-hidden">
                    <img
                      src="/our-story-foundation-lab.jpg"
                      alt="Linda D. Amend, Susanna Amend, and Christina Corbin formulating together at the lab bench"
                      className="h-full w-full object-cover object-[center_32%]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col px-6 min-[681px]:pr-[max(36px,8vw)] min-[681px]:pl-0">
            <p className={eyebrow}>The family behind the formulas</p>
            <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
              Three perspectives.
              <br />
              <em className="italic text-[#ab8584]">One purpose.</em>
            </h2>
            <p className="mb-4 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              A chemist, a nurse practitioner, and a licensed medical esthetician combine their expertise around one shared vision: skincare that works with your skin, your needs, and your routine.
            </p>
            <p className="mb-8 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              From formulation to treatment room to daily routine, every product has a purpose.
            </p>
            {lighter ? (
              <a href="/our-story#our-story" className={`${HAIRLINE_BUTTON} self-start`}>
                Our Story
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <a
                href="/about#our-story"
                className="group inline-flex min-h-12 w-full self-start items-center justify-center gap-4 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white transition-colors duration-200 hover:bg-[#141412] min-[480px]:w-auto"
              >
                <span className="relative inline-block whitespace-nowrap">
                  <span>Our Story</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 text-[#ab8584] transition-[clip-path] duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                  >
                    Our Story
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
              </a>
            )}
          </div>
        </div>
      </section>

      <section id="spa" className="relative scroll-mt-28 overflow-hidden bg-[#2B2727] text-[#F7F4EF]">
        <div className="grid grid-cols-1 min-[900px]:min-h-[640px] min-[900px]:grid-cols-[minmax(0,0.86fr)_1.14fr]">
          <div className="flex flex-col justify-center px-6 py-16 min-[900px]:py-20 min-[900px]:pl-[max(36px,6vw)] min-[900px]:pr-12">
            <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C4A8A6]">For estheticians & spas</p>
            <h2 className="my-3 max-w-[560px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] text-[#F7F4EF] min-[681px]:text-[clamp(44px,4vw,60px)]">
              Continue the care
              <br />
              <em className="italic text-[#ab8584]">beyond the treatment room.</em>
            </h2>
            <p className="mb-8 max-w-[460px] text-[17px] leading-relaxed text-[#E7E2DC]">
              Give your clients a coordinated home-care routine that complements their in-person experience.
            </p>
            {lighter ? (
              <a
                href="/spa-partners"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 self-start border border-[#F7F4EF]/70 bg-transparent px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#F7F4EF] transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584] min-[480px]:w-auto"
              >
                Explore Spa Partnership
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <a
                href="/spa-partners"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-4 self-start bg-[#F7F4EF] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2B2727] transition-colors duration-200 hover:bg-white min-[480px]:w-auto"
              >
                <span className="relative inline-block whitespace-nowrap">
                  <span>Explore Spa Partnership</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 text-[#ab8584] transition-[clip-path] duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                  >
                    Explore Spa Partnership
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
              </a>
            )}
          </div>
          <div className="relative aspect-[4/3] min-h-[260px] min-[900px]:aspect-auto min-[900px]:min-h-full">
            <img
              src="/designs/working/spa-room-wide.jpg"
              alt="A quiet spa treatment room with a linen bed and a dusty rose throw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="social" className={`scroll-mt-28 py-16 text-[#252520] md:py-[75px] ${lighter ? 'bg-[#f3eceb]' : 'bg-[#f5f0eb]'}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className={eyebrow}>Instagram & Facebook</p>
          <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
            From the <em className="italic text-[#ab8584]">studio.</em>
          </h2>
          <p className="max-w-[460px] text-[17px] leading-relaxed text-[#595750]">
            Notes we share with the people who use the formulas.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {(lighter
              ? [
                  {
                    platform: 'Instagram',
                    href: 'https://www.instagram.com/skinprotocolrx/',
                    caption: 'In black and white, you see the truth. No filter. Just protocol.',
                    src: '/designs/working/lighter/shop-hero.jpg',
                    alt: 'Skin Protocol RX formulas arranged on a studio table',
                  },
                  {
                    platform: 'Instagram',
                    href: 'https://www.instagram.com/skinprotocolrx/',
                    caption: 'The Holy Grail is here. Not another ten-step trend. This is a protocol.',
                    src: '/designs/working/lighter/protocol-hero.jpg',
                    alt: 'A Skin Protocol RX treatment setup',
                  },
                  {
                    platform: 'Facebook',
                    href: 'https://www.facebook.com/skinprotocolrx/',
                    caption: 'Your skin does not need another ten-step routine. It needs intention.',
                    src: '/designs/working/lighter/founders-lab.jpg',
                    alt: 'The Skin Protocol RX family at work in the lab',
                  },
                ]
              : [
                  {
                    platform: 'Instagram',
                    href: 'https://www.instagram.com/skinprotocolrx/',
                    caption: 'In black and white, you see the truth. No filter. Just protocol.',
                    src: '/designs/working/shop-hero.jpg',
                    alt: 'Skin Protocol RX formulas arranged on a studio table',
                  },
                  {
                    platform: 'Instagram',
                    href: 'https://www.instagram.com/skinprotocolrx/',
                    caption: 'The Holy Grail is here. Not another ten-step trend. This is a protocol.',
                    src: '/designs/working/protocol-hero.jpg',
                    alt: 'A Skin Protocol RX treatment setup',
                  },
                  {
                    platform: 'Facebook',
                    href: 'https://www.facebook.com/skinprotocolrx/',
                    caption: 'Your skin does not need another ten-step routine. It needs intention.',
                    src: '/designs/working/spa-room-wide.jpg',
                    alt: 'A quiet spa treatment room',
                  },
                ]
            ).map(post => (
              <a
                key={post.src}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <img src={post.src} alt={post.alt} className="aspect-[4/5] w-full object-cover" />
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#ab8584]">{post.platform}</p>
                  <span className="text-[#ab8584] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-[#595750] transition-colors duration-200 group-hover:text-[#252520]">
                  {post.caption}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
