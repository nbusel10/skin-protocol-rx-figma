import { useEffect, useRef, useState } from 'react'
import { PRODUCTS, PROTOCOL_STEP_META } from '../../data'
import { PROTOCOL_SECTION } from '../protocolSectionContent'
import ProtocolQuizSection from './ProtocolQuizSection'
import ProtocolResults from './ProtocolResults'
import { useProtocolQuizResults } from './useProtocolQuizResults'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'

const TIMELINE_STEPS = [
  { step: 1, name: 'Cleanse' },
  { step: 2, name: 'Tone' },
  { step: 3, name: 'Target' },
  { step: 4, name: 'Eye Care' },
  { step: 5, name: 'Moisturize' },
  { step: 6, name: 'Oil' },
] as const

const HOW_IT_WORKS = [
  {
    title: 'Tell us about your skin',
    body: "A few thoughtful questions about your skin's needs.",
  },
  {
    title: 'Discover your essentials',
    body: 'Receive personalized product recommendations.',
  },
  {
    title: 'Make it yours',
    body: 'Start with the essentials or explore additional steps.',
  },
] as const

const ACCORDION_STEPS = [
  {
    step: 1,
    name: 'Cleanse',
    tag: 'Purify & prepare',
    detail: 'Clears the skin and prepares it for the rest of the routine.',
  },
  {
    step: 2,
    name: 'Tone',
    tag: 'Refresh & rebalance',
    detail: 'Balances and primes the skin after cleansing.',
  },
  {
    step: 3,
    name: 'Target',
    tag: 'Address specific concerns',
    detail: 'A serum step for the concerns you want to address.',
  },
  {
    step: 4,
    name: 'Eye Care',
    tag: 'Nourish & revive',
    detail: 'Care for the eye area, applied before moisturizer.',
  },
  {
    step: 5,
    name: 'Moisturize',
    tag: 'Hydrate & restore',
    detail: "Supports the skin after the steps that come before.",
  },
  {
    step: 6,
    name: 'Oil',
    tag: 'Seal in moisture',
    detail: 'A facial oil used after moisturizer, when you want it.',
  },
] as const

function catalogBenefit(step: number) {
  return PROTOCOL_STEP_META.find(item => item.step === step)?.description ?? ''
}

function useTimelinePlaying() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { rootRef, playing }
}

function RefineHero() {
  const { rootRef, playing } = useTimelinePlaying()

  return (
    <section className="bg-[#2B2727] px-6 py-14 text-[#F7F4EF] md:py-16">
      <div className="mx-auto flex flex-col items-center">
        <h1 className={`text-center text-[#F7F4EF] ${HEADING}`}>Build your protocol</h1>
        <p className="mt-4 text-center text-[15px] leading-relaxed text-[#F7F4EF]/80">
          A few questions. Six thoughtful steps.
        </p>
        <div ref={rootRef} className={`protocol-timeline protocol-timeline-numbers protocol-refine-timeline mt-12 w-full md:mt-14 md:max-w-5xl ${playing ? 'is-playing' : ''}`}>
          <div className="protocol-timeline-line" aria-hidden="true">
            <span className="protocol-timeline-line-draw" />
          </div>
          <ol className="protocol-timeline-steps" aria-label="Protocol steps">
            {TIMELINE_STEPS.map(step => (
              <li key={step.step} className="protocol-timeline-step" aria-label={`${step.step}. ${step.name}`}>
                <span className="protocol-timeline-mark" aria-hidden="true">
                  <span className="protocol-refine-step-word">step</span>
                  <span>{String(step.step).padStart(2, '0')}</span>
                </span>
                <span className="protocol-timeline-name" aria-hidden="true">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="bg-[#FFFDFA] px-6 py-16 text-[#252520] min-[681px]:px-[max(36px,8vw)] md:py-[75px]">
      <ol className="grid grid-cols-1 md:grid-cols-3">
        {HOW_IT_WORKS.map((item, index) => (
          <li
            key={item.title}
            className={`group py-8 md:py-4 ${
              index === 0
                ? 'md:pr-12'
                : index === HOW_IT_WORKS.length - 1
                  ? 'border-t border-[#E4DDD4] md:border-t-0 md:border-l md:pl-12'
                  : 'border-t border-[#E4DDD4] md:border-t-0 md:border-l md:px-12'
            }`}
          >
            <span className="font-serif text-[2.75rem] italic leading-none text-[#ab8584] transition-colors duration-200 group-hover:text-[#C4A8A6] md:text-[3.25rem]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="mt-5 font-serif text-[1.65rem] font-normal leading-snug tracking-[-0.03em]">
              {item.title}
            </h2>
            <p className="mt-3 max-w-[18rem] text-[15px] leading-relaxed text-[#595750]">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ToggleMark({ open }: { open: boolean }) {
  return (
    <span className="relative h-3.5 w-3.5 shrink-0 text-[#6D6A63]" aria-hidden="true">
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
      <span className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? 'scale-y-0' : 'scale-y-100'}`} />
    </span>
  )
}

function ProtocolExplore({ onViewProduct }: { onViewProduct: (productId: string) => void }) {
  const [openSteps, setOpenSteps] = useState<number[]>([])

  function toggle(step: number) {
    setOpenSteps(current => (current.includes(step) ? current.filter(item => item !== step) : [...current, step]))
  }

  function moveFocus(current: number, key: string) {
    const steps = ACCORDION_STEPS.map(item => item.step)
    const index = steps.indexOf(current as (typeof steps)[number])
    if (index < 0) return
    const nextIndex =
      key === 'Home' ? 0 : key === 'End' ? steps.length - 1 : key === 'ArrowDown' ? (index + 1) % steps.length : (index - 1 + steps.length) % steps.length
    document.getElementById(`refine-step-${steps[nextIndex]}-button`)?.focus()
  }

  return (
    <section className="bg-[#FFFDFA] py-16 text-[#252520] md:py-[75px]">
      <div className="px-6 min-[681px]:w-[42%] min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[3.36%]">
        <p className="text-[13px] font-semibold tracking-[0.21em] text-[#ab8584] uppercase">What you leave with</p>
        <h2 className={`my-3 max-w-[650px] ${HEADING}`}>Explore the protocol</h2>
        <p className="max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
          Your answers help shape a personalized protocol, with recommended essentials and optional additions you can explore and shop. Choose what works for your skin and your routine.
        </p>
      </div>
      <div className="mt-10 px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[max(36px,8vw)]">
        <div className="flex flex-col md:grid md:grid-cols-2 md:items-start md:gap-x-16">
          {[0, 1].map(column => (
            <ol key={column} className="contents md:block">
              {ACCORDION_STEPS.filter((_, index) => index % 2 === column).map(step => {
                const open = openSteps.includes(step.step)
                const panelId = `refine-step-${step.step}-panel`
                const buttonId = `refine-step-${step.step}-button`
                const products = PRODUCTS.filter(product => product.protocolStep === step.step)
                const benefit = catalogBenefit(step.step)
                const order =
                  step.step === 1 ? 'order-1' : step.step === 2 ? 'order-2' : step.step === 3 ? 'order-3' : step.step === 4 ? 'order-4' : step.step === 5 ? 'order-5' : 'order-6'
                return (
                  <li key={step.step} className={`border-t border-[#E4DDD4] ${order} md:order-none`}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => toggle(step.step)}
                        onKeyDown={event => {
                          if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
                          event.preventDefault()
                          moveFocus(step.step, event.key)
                        }}
                        className="group flex w-full items-center gap-5 py-7 text-left transition-colors duration-200 hover:bg-[#F6F1EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
                      >
                        <span className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-[#C4A8A6]">
                          <span className="font-serif text-[20px] italic leading-none text-[#ab8584]">
                            {String(step.step).padStart(2, '0')}
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[18px] font-semibold leading-snug text-[#252520] transition-colors duration-200 group-hover:text-[#ab8584]">{step.name}</span>
                          <span className="mt-1 block text-[13px] leading-snug text-[#6D6A63]">{step.tag}</span>
                        </span>
                        <ToggleMark open={open} />
                      </button>
                    </h3>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!open} inert={!open} className="min-h-0 overflow-hidden">
                        <div className="pb-7 pl-[calc(4.5rem+1.25rem)]">
                          <p className="text-[14px] leading-relaxed text-[#595750]">{step.detail}</p>
                          {benefit ? <p className="mt-2 text-[13px] leading-relaxed text-[#6D6A63]">{benefit}</p> : null}
                          {products.length > 0 ? (
                            <ul className="mt-4">
                              {products.map(product => (
                                <li key={product.id} className="border-t border-[#E4DDD4]">
                                  <a
                                    href={`/designs/working/product/${product.id}`}
                                    onClick={event => {
                                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
                                      event.preventDefault()
                                      onViewProduct(product.id)
                                    }}
                                    className="group/product flex items-center gap-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
                                  >
                                    <img src={product.image} alt="" className="h-12 w-12 shrink-0 object-contain" />
                                    <span className="min-w-0 flex-1 text-[15px] leading-snug text-[#252520] transition-colors duration-200 group-hover/product:text-[#ab8584]">
                                      {product.name}
                                    </span>
                                    <span className="shrink-0 text-[12px] tracking-[0.04em] text-[#6D6A63] transition-colors duration-200 group-hover/product:text-[#ab8584]">
                                      View product <span aria-hidden="true">↗</span>
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          <a
                            href={`/designs/working/shop?step=${step.step}`}
                            className="mt-4 inline-flex items-center gap-2 text-[13px] text-[#6D6A63] transition-colors duration-200 hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
                          >
                            Shop this step <span aria-hidden="true">↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          ))}
        </div>
        <p className="mt-10 text-[15px] italic text-[#6D6A63]">{PROTOCOL_SECTION.spf}</p>
      </div>
    </section>
  )
}

export default function ProtocolRefinePreview({ onViewProduct }: { onViewProduct: (productId: string) => void }) {
  const { showResults, revealResults, startOver } = useProtocolQuizResults('protocol')

  if (showResults) {
    return (
      <ProtocolResults
        onViewProduct={onViewProduct}
        onStartOver={startOver}
      />
    )
  }

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <RefineHero />
      <HowItWorks />
      <ProtocolQuizSection refined onComplete={revealResults} />
      <ProtocolExplore onViewProduct={onViewProduct} />
    </article>
  )
}
