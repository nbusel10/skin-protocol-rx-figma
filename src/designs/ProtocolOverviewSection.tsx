import { PROTOCOL_SECTION } from './protocolSectionContent'
import { useProtocolStepReveal } from './useProtocolStepReveal'

export type ProtocolOverviewTone = 'editorial' | 'rose' | 'original' | 'ritual'

const TONE: Record<
  ProtocolOverviewTone,
  {
    section: string
    wrap: string
    imageWell: string
    eyebrow: string
    title: string
    muted: string
    border: string
    number: string
    name: string
    tag: string
    button: string
    note: string
    spf: string
    circleRest: string
    circleDraw: string
    arrow: string
  }
> = {
  editorial: {
    section: 'scroll-mt-28 bg-[#FFFDFA] px-6 py-16 sm:px-8 lg:px-[max(36px,6vw)] lg:py-[90px]',
    wrap: 'mx-auto w-[min(1120px,calc(100%-2.75rem))] md:w-[min(1120px,calc(100%-5.5rem))]',
    imageWell:
      'relative -ml-6 min-h-[420px] w-[calc(100%+1.5rem)] overflow-hidden bg-[#EDE8DF] sm:-ml-8 sm:min-h-[480px] sm:w-[calc(100%+2rem)] lg:-ml-[max(36px,6vw)] lg:min-h-0 lg:w-[calc(100%+max(36px,6vw))]',
    eyebrow: 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]',
    title: 'max-w-[460px] font-serif text-[clamp(2.125rem,3.5vw,3.2rem)] leading-[1.12] tracking-[-0.044em] text-[#252520] [&_em]:text-[#ab8584]',
    muted: 'max-w-[420px] text-sm leading-relaxed text-[#6D6A63]',
    border: 'border-t border-[#D6CEC3]',
    number: 'font-serif text-[18px] italic leading-none text-[#ab8584] transition-colors duration-500',
    name: 'block text-[15px] font-semibold text-[#252520]',
    tag: 'mt-0.5 block text-[12px] text-[#6D6A63]',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#252520] hover:bg-[#252520] hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-[#6D6A63] sm:text-right',
    spf: 'mt-6 text-sm italic text-[#6D6A63]',
    circleRest: '#D6CEC3',
    circleDraw: '#ab8584',
    arrow: 'text-[#ab8584]',
  },
  rose: {
    section: 'scroll-mt-28 bg-ivory px-6 py-16 md:px-8 md:py-24',
    wrap: 'mx-auto max-w-6xl',
    imageWell:
      'relative -ml-6 min-h-[420px] w-[calc(100%+1.5rem)] overflow-hidden bg-stone sm:-ml-8 sm:min-h-[480px] sm:w-[calc(100%+2rem)] md:-ml-8 lg:min-h-0 lg:w-[calc(100%+2rem)]',
    eyebrow: 'text-[11px] font-semibold tracking-[0.22em] uppercase text-rose',
    title: 'max-w-[460px] font-serif text-[clamp(2.125rem,3.5vw,3.2rem)] leading-[1.12] text-charcoal',
    muted: 'max-w-[420px] text-sm leading-relaxed text-charcoal/70',
    border: 'border-t border-gray-soft',
    number: 'font-serif text-[18px] italic leading-none text-rose transition-colors duration-500',
    name: 'block text-[15px] font-semibold text-charcoal',
    tag: 'mt-0.5 block text-[12px] text-charcoal/55',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-charcoal px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal hover:bg-charcoal hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-charcoal/50 sm:text-right',
    spf: 'mt-6 text-sm italic text-charcoal/70',
    circleRest: '#D5CFC8',
    circleDraw: '#B88E91',
    arrow: 'text-rose',
  },
  original: {
    section: 'scroll-mt-28 bg-stone px-5 py-24 md:px-8 border-y border-gray-soft',
    wrap: 'mx-auto max-w-7xl',
    imageWell:
      'relative -ml-5 min-h-[420px] w-[calc(100%+1.25rem)] overflow-hidden bg-white sm:-ml-8 sm:min-h-[480px] sm:w-[calc(100%+2rem)] md:-ml-8 lg:min-h-0 lg:w-[calc(100%+2rem)]',
    eyebrow: 'text-[11px] font-semibold tracking-[0.3em] uppercase text-rose',
    title: 'max-w-[460px] font-serif text-[clamp(2.125rem,3.5vw,3.2rem)] leading-[1.12] text-black',
    muted: 'max-w-[420px] text-sm leading-relaxed text-black/55',
    border: 'border-t border-gray-soft',
    number: 'font-serif text-[18px] italic leading-none text-rose transition-colors duration-500',
    name: 'block text-[15px] font-semibold text-black',
    tag: 'mt-0.5 block text-[12px] text-black/45',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-black px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-black hover:bg-black hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-black/45 sm:text-right',
    spf: 'mt-6 text-sm italic text-black/55',
    circleRest: '#D5CFC8',
    circleDraw: '#B88E91',
    arrow: 'text-rose',
  },
  ritual: {
    section: 'scroll-mt-28 bg-[#fffdf9] px-6 py-16 sm:px-8 lg:px-[max(36px,6vw)] lg:py-[90px]',
    wrap: 'mx-auto w-[min(1120px,calc(100%-2.75rem))] md:w-[min(1120px,calc(100%-5.5rem))]',
    imageWell:
      'relative -ml-6 min-h-[420px] w-[calc(100%+1.5rem)] overflow-hidden bg-[#eee8e0] sm:-ml-8 sm:min-h-[480px] sm:w-[calc(100%+2rem)] lg:-ml-[max(36px,6vw)] lg:min-h-0 lg:w-[calc(100%+max(36px,6vw))]',
    eyebrow: 'text-[11px] font-semibold tracking-[0.21em] uppercase text-[#b88e91]',
    title: 'max-w-[460px] font-serif text-[clamp(2.125rem,3.5vw,3.2rem)] leading-[1.12] tracking-[-0.044em] text-[#332f2d]',
    muted: 'max-w-[420px] text-sm leading-relaxed text-[#6e6763]',
    border: 'border-t border-[#ded7ce]',
    number: 'font-serif text-[18px] italic leading-none text-[#b88e91] transition-colors duration-500',
    name: 'block text-[15px] font-semibold text-[#332f2d]',
    tag: 'mt-0.5 block text-[12px] text-[#6e6763]',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-[#332f2d] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#332f2d] hover:bg-[#332f2d] hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-[#6e6763] sm:text-right',
    spf: 'mt-6 text-sm italic text-[#6e6763]',
    circleRest: '#ded7ce',
    circleDraw: '#b88e91',
    arrow: 'text-[#b88e91]',
  },
}

interface ProtocolOverviewSectionProps {
  tone?: ProtocolOverviewTone
  onCta: () => void
  imageSrc?: string
  imageAlt?: string
  id?: string
  imageRight?: boolean
  /** Match homepage hero column widths / left inset (Working). */
  alignHero?: boolean
  onStepClick?: (step: number) => void
}

function flipImageWell(classes: string) {
  return classes
    .replace(/-ml-(\S+)/g, '-mr-$1')
    .replace(/sm:-ml-(\S+)/g, 'sm:-mr-$1')
    .replace(/md:-ml-(\S+)/g, 'md:-mr-$1')
    .replace(/lg:-ml-(\S+)/g, 'lg:-mr-$1')
}

export default function ProtocolOverviewSection({
  tone = 'editorial',
  onCta,
  imageSrc = '/designs/clear/ritual-glow.jpg',
  imageAlt = 'A woman with glowing skin applying cream in warm morning light',
  id = 'what-is-the-protocol',
  imageRight = false,
  alignHero = false,
  onStepClick,
}: ProtocolOverviewSectionProps) {
  const t = TONE[tone]
  const stepGridRef = useProtocolStepReveal<HTMLOListElement>()
  const imageWellClass = alignHero
    ? 'relative min-h-[320px] w-[90%] overflow-hidden bg-[#EDE8DF] min-[681px]:h-[90%] min-[681px]:min-h-0 min-[681px]:self-center min-[681px]:justify-self-center'
    : imageRight
      ? flipImageWell(t.imageWell)
      : t.imageWell

  const image = (
    <div className={imageWellClass}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[center_top]"
      />
    </div>
  )

  const copy = (
    <div
      className={
        alignHero
          ? 'flex flex-col justify-center px-6 py-6 min-[681px]:py-8 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]'
          : 'flex flex-col lg:py-0'
      }
    >
      <p className={t.eyebrow}>{PROTOCOL_SECTION.eyebrow}</p>
      <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <h2 className={t.title}>
          {PROTOCOL_SECTION.titleLead}{' '}
          <em>{PROTOCOL_SECTION.titleEm}</em>
        </h2>
        <div className="shrink-0 sm:pt-1 sm:text-right">
          <button type="button" onClick={onCta} className={t.button}>
            {PROTOCOL_SECTION.cta} <span aria-hidden="true">↗</span>
          </button>
          <p className={t.note}>{PROTOCOL_SECTION.ctaNote}</p>
        </div>
      </div>
      <p className={`mt-4 ${t.muted}`}>{PROTOCOL_SECTION.paragraph}</p>
      <ol
        ref={stepGridRef}
        className="protocol-step-reveal mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2"
      >
        {PROTOCOL_SECTION.steps.map(step => {
          const mark = String(step.step).padStart(2, '0')
          const label = `Shop ${step.name} step`
          const className = `group flex w-full items-center justify-between gap-3 ${t.border} py-3 text-left transition-colors`
          const body = (
            <>
              <span className="flex min-w-0 items-center gap-3">
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center">
                  <span className={t.number}>{mark}</span>
                  <svg viewBox="0 0 44 44" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                    <circle cx="22" cy="22" r="19" fill="none" stroke={t.circleRest} strokeWidth="1.15" />
                    <circle
                      cx="22"
                      cy="22"
                      r="19"
                      fill="none"
                      stroke={t.circleDraw}
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      pathLength={1}
                      className="opacity-0 transition-[stroke-dashoffset,opacity] duration-700 ease-out [stroke-dasharray:1] [stroke-dashoffset:1.02] group-hover:opacity-100 group-hover:[stroke-dashoffset:0] group-focus-visible:opacity-100 group-focus-visible:[stroke-dashoffset:0] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:[stroke-dashoffset:0]"
                      transform="rotate(-90 22 22)"
                    />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className={t.name}>{step.name}</span>
                  <span className={t.tag}>{step.tag}</span>
                </span>
              </span>
              <span
                className={`shrink-0 translate-x-0 -translate-y-0 text-sm opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:opacity-100 ${t.arrow}`}
                aria-hidden="true"
              >
                ↗
              </span>
            </>
          )

          return (
            <li key={step.step}>
              {onStepClick ? (
                <button type="button" onClick={() => onStepClick(step.step)} className={className} aria-label={label}>
                  {body}
                </button>
              ) : (
                <a href={`/shop?step=${step.step}`} className={className} aria-label={label}>
                  {body}
                </a>
              )}
            </li>
          )
        })}
      </ol>
      <p className={t.spf}>{PROTOCOL_SECTION.spf}</p>
    </div>
  )

  return (
    <section
      id={id}
      className={
        alignHero
          ? 'scroll-mt-28 bg-[#FFFDFA] py-16 text-[#252520] md:py-[75px]'
          : t.section
      }
    >
      <div
        className={
          alignHero
            ? 'grid items-stretch gap-10 min-[681px]:min-h-[clamp(320px,36vw,520px)] min-[681px]:grid-cols-[48%_52%] min-[681px]:gap-0'
            : `${t.wrap} grid items-stretch gap-10 lg:gap-10 xl:gap-14 ${
                imageRight
                  ? 'lg:grid-cols-[1.2fr_minmax(280px,0.9fr)]'
                  : 'lg:grid-cols-[minmax(280px,0.9fr)_1.2fr]'
              }`
        }
      >
        {imageRight || alignHero ? (
          <>
            {copy}
            {image}
          </>
        ) : (
          <>
            {image}
            {copy}
          </>
        )}
      </div>
    </section>
  )
}
