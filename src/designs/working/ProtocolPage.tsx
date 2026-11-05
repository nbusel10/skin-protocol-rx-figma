import { useState } from 'react'
import { PRODUCTS } from '../../data'
import { PROTOCOL_SECTION } from '../protocolSectionContent'
import { loadQuizSession, clearQuizSession, protocolFromSession } from '../../lib/quizSession'
import ProtocolHero from './ProtocolHero'
import ProtocolQuizSection from './ProtocolQuizSection'
import ProtocolResults from './ProtocolResults'

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

function ProtocolFacts() {
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
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#6D6A63]" aria-hidden="true">
      <path d="M2.5 8h11" fill="none" stroke="currentColor" strokeWidth="1" />
      {open ? null : <path d="M8 2.5v11" fill="none" stroke="currentColor" strokeWidth="1" />}
    </svg>
  )
}

function ProtocolPayoff({ onViewProduct }: { onViewProduct: (productId: string) => void }) {
  const [openSteps, setOpenSteps] = useState<number[]>([])

  function toggle(step: number) {
    setOpenSteps(current => (current.includes(step) ? current.filter(item => item !== step) : [...current, step]))
  }

  function moveFocus(current: number, key: string) {
    const steps = PROTOCOL_SECTION.steps.map(item => item.step)
    const index = steps.indexOf(current as (typeof steps)[number])
    if (index < 0) return
    const nextIndex =
      key === 'Home' ? 0 : key === 'End' ? steps.length - 1 : key === 'ArrowDown' ? (index + 1) % steps.length : (index - 1 + steps.length) % steps.length
    document.getElementById(`protocol-step-${steps[nextIndex]}-button`)?.focus()
  }

  return (
    <section className="bg-[#FFFDFA] py-16 text-[#252520] md:py-[75px]">
      <div className="px-6 min-[681px]:w-[48%] min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[3.84%]">
        <p className="text-[13px] font-semibold tracking-[0.21em] text-[#ab8584] uppercase">What you leave with</p>
        <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
          Explore the protocol
        </h2>
        <p className="max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
          Your answers help shape a personalized protocol, with recommended essentials and optional additions you can explore and shop. Choose what works for your skin and your routine.
        </p>
      </div>
      <div className="mt-10 px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[1.56%]">
        <div className="flex flex-col md:grid md:grid-cols-2 md:items-start md:gap-x-16">
          {[0, 1].map(column => (
            <ol key={column} className="contents md:block">
          {PROTOCOL_SECTION.steps.filter((_, index) => index % 2 === column).map(step => {
            const open = openSteps.includes(step.step)
            const panelId = `protocol-step-${step.step}-panel`
            const buttonId = `protocol-step-${step.step}-button`
            const products = PRODUCTS.filter(product => product.protocolStep === step.step)
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
                    className="group flex w-full items-center gap-5 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
                  >
                    <span className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center">
                      <span className="font-serif text-[18px] italic leading-none text-[#ab8584]">
                        {String(step.step).padStart(2, '0')}
                      </span>
                      <svg viewBox="0 0 64 64" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#D6CEC3" strokeWidth="1.15" />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#ab8584"
                          strokeWidth="1.35"
                          strokeLinecap="round"
                          pathLength={1}
                          className="opacity-0 transition-[stroke-dashoffset,opacity] duration-700 ease-out [stroke-dasharray:1] [stroke-dashoffset:1.02] group-hover:opacity-100 group-hover:[stroke-dashoffset:0] group-focus-visible:opacity-100 group-focus-visible:[stroke-dashoffset:0] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:[stroke-dashoffset:0]"
                          transform="rotate(-90 32 32)"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[17px] font-semibold leading-snug text-[#252520]">{step.name}</span>
                      <span className="mt-1 block text-[13px] leading-snug text-[#6D6A63]">{step.tag}</span>
                    </span>
                    <ToggleMark open={open} />
                  </button>
                </h3>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!open} inert={!open} className="min-h-0 overflow-hidden">
                    <ul className="pb-6 pl-[calc(4rem+1.25rem)]">
                      {products.map(product => (
                        <li key={product.id} className="border-t border-[#E4DDD4]">
                          <a
                            href={`/designs/working/product/${product.id}`}
                            onClick={event => {
                              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
                              event.preventDefault()
                              onViewProduct(product.id)
                            }}
                            className="group flex items-center gap-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
                          >
                            <img src={product.image} alt="" className="h-12 w-12 shrink-0 object-contain" />
                            <span className="min-w-0 flex-1 text-[15px] leading-snug text-[#252520] transition-colors duration-200 group-hover:text-[#ab8584]">
                              {product.name}
                            </span>
                            <span className="shrink-0 text-[12px] tracking-[0.04em] text-[#6D6A63] transition-colors duration-200 group-hover:text-[#ab8584]">
                              View product <span aria-hidden="true">↗</span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
            </ol>
          ))}
        </div>
        <p className="mt-10 flex items-center gap-1 text-[15px] italic text-[#6D6A63]">
          <svg viewBox="0 0 28 24.5" className="h-[1.15em] w-[1.25em] shrink-0 text-[#ab8584]" aria-hidden="true">
            <path
              d="M12 1C12 7.2 7.4 11.4 1 12.2 7.4 13 12 17.2 12 23.4 12 17.2 16.6 13 23 12.2 16.6 11.4 12 7.2 12 1Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />
            <path
              d="M24.4 3.1v3.6M22.6 4.9h3.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
          For daytime routines, finish with your favorite SPF.
        </p>
      </div>
    </section>
  )
}

export default function ProtocolPage({ onViewProduct }: { onViewProduct: (productId: string) => void }) {
  const [showResults, setShowResults] = useState(() => {
    const saved = loadQuizSession()
    return Boolean(saved?.done && protocolFromSession(saved))
  })

  if (showResults) {
    return (
      <ProtocolResults
        onViewProduct={onViewProduct}
        onStartOver={() => {
          clearQuizSession()
          setShowResults(false)
        }}
      />
    )
  }

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <ProtocolHero />
      <ProtocolFacts />
      <ProtocolQuizSection refined onComplete={() => setShowResults(true)} />
      <ProtocolPayoff onViewProduct={onViewProduct} />
    </article>
  )
}
