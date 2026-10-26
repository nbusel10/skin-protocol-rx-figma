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
  }
> = {
  editorial: {
    section: 'scroll-mt-28 bg-[#FFFDFA] px-6 py-16 sm:px-8 lg:px-[max(36px,6vw)] lg:py-[90px]',
    wrap: 'mx-auto w-[min(1120px,calc(100%-2.75rem))] md:w-[min(1120px,calc(100%-5.5rem))]',
    imageWell:
      'relative -ml-6 min-h-[420px] w-[calc(100%+1.5rem)] overflow-hidden bg-[#EDE8DF] sm:-ml-8 sm:min-h-[480px] sm:w-[calc(100%+2rem)] lg:-ml-[max(36px,6vw)] lg:min-h-0 lg:w-[calc(100%+max(36px,6vw))]',
    eyebrow: 'text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]',
    title: 'max-w-[460px] font-serif text-[clamp(2.125rem,3.5vw,3.2rem)] leading-[1.12] tracking-[-0.044em] text-[#252520] [&_em]:text-[#ab8584]',
    muted: 'max-w-[420px] text-sm leading-relaxed text-[#6D6A63]',
    border: 'border-t border-[#D6CEC3]',
    number: 'font-serif text-[22px] italic leading-none text-[#ab8584]',
    name: 'block text-[15px] font-semibold text-[#252520]',
    tag: 'mt-0.5 block text-[12px] text-[#6D6A63]',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#252520] hover:bg-[#252520] hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-[#6D6A63] sm:text-right',
    spf: 'mt-6 text-sm italic text-[#6D6A63]',
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
    number: 'font-serif text-[22px] italic leading-none text-rose',
    name: 'block text-[15px] font-semibold text-charcoal',
    tag: 'mt-0.5 block text-[12px] text-charcoal/55',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-charcoal px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal hover:bg-charcoal hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-charcoal/50 sm:text-right',
    spf: 'mt-6 text-sm italic text-charcoal/70',
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
    number: 'font-serif text-[22px] italic leading-none text-rose',
    name: 'block text-[15px] font-semibold text-black',
    tag: 'mt-0.5 block text-[12px] text-black/45',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-black px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-black hover:bg-black hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-black/45 sm:text-right',
    spf: 'mt-6 text-sm italic text-black/55',
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
    number: 'font-serif text-[22px] italic leading-none text-[#b88e91]',
    name: 'block text-[15px] font-semibold text-[#332f2d]',
    tag: 'mt-0.5 block text-[12px] text-[#6e6763]',
    button:
      'inline-flex min-h-12 items-center gap-4 border border-[#332f2d] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#332f2d] hover:bg-[#332f2d] hover:text-white',
    note: 'mt-3 text-[11px] tracking-wide text-[#6e6763] sm:text-right',
    spf: 'mt-6 text-sm italic text-[#6e6763]',
  },
}

interface ProtocolOverviewSectionProps {
  tone?: ProtocolOverviewTone
  onCta: () => void
  imageSrc?: string
  imageAlt?: string
  id?: string
}

export default function ProtocolOverviewSection({
  tone = 'editorial',
  onCta,
  imageSrc = '/designs/clear/ritual-glow.jpg',
  imageAlt = 'A woman with glowing skin applying cream in warm morning light',
  id = 'what-is-the-protocol',
}: ProtocolOverviewSectionProps) {
  const t = TONE[tone]
  const stepGridRef = useProtocolStepReveal<HTMLOListElement>()

  return (
    <section id={id} className={t.section}>
      <div className={`${t.wrap} grid items-stretch gap-10 lg:grid-cols-[minmax(280px,0.9fr)_1.2fr] lg:gap-10 xl:gap-14`}>
        <div className={t.imageWell}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-[center_top]"
          />
        </div>
        <div className="flex flex-col lg:py-0">
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
            {PROTOCOL_SECTION.steps.map(step => (
              <li key={step.step} className={`${t.border} py-3`}>
                <span className="flex items-baseline gap-2.5">
                  <span className={t.number}>{String(step.step).padStart(2, '0')}</span>
                    <span>
                      <span className={t.name}>{step.name}</span>
                      <span className={t.tag}>{step.tag}</span>
                    </span>
                </span>
              </li>
            ))}
          </ol>
          <p className={t.spf}>{PROTOCOL_SECTION.spf}</p>
        </div>
      </div>
    </section>
  )
}
