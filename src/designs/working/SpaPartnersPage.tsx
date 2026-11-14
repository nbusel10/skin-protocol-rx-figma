import { useEffect, useLayoutEffect, useRef, useState, type AnimationEvent, type MouseEvent } from 'react'
import { OffsetFrame } from './OffsetPhoto'
import PracticeQuiz from './PracticeQuiz'
import { useSiteRoot } from './siteRoot'
import SunbeamMatGlow from './SunbeamMatGlow'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const SECTION = 'scroll-mt-28 px-6 text-[#252520] outline-none min-[681px]:px-[max(36px,8vw)]'

const CHAPTERS = [
  { id: 'partnership', label: 'Partnership' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'apply', label: 'Apply' },
] as const

const BENEFITS = [
  {
    index: '01',
    title: 'Coordinated care',
    body: 'Products designed to work together, so a recommendation stays clear from cleanse to oil.',
  },
  {
    index: '02',
    title: 'Easier guidance',
    body: 'Recommend by skin and protocol step, without asking clients to assemble a routine on their own.',
  },
  {
    index: '03',
    title: 'Partner pricing',
    body: 'Approved partners receive professional pricing across the line.',
  },
  {
    index: '04',
    title: 'Direct support',
    body: 'Education, product guidance, and a family-owned team behind the formulas.',
  },
]

const STEPS = [
  { title: 'Apply', body: 'A few questions about the practice.' },
  { title: 'Review', body: 'We follow up within 3–5 business days.' },
  { title: 'Access', body: 'Approved partners receive pricing and education.' },
  { title: 'Recommend', body: 'Clients continue the protocol at home.' },
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollToChapter(id: string, behavior: ScrollBehavior) {
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}

function SpaHero({ onOpen }: { onOpen: (id: string) => void }) {
  const site = useSiteRoot()
  const [settled, setSettled] = useState(() => prefersReducedMotion())

  function onAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.animationName !== 'about-label-in') return
    const names = event.currentTarget.querySelectorAll('.protocol-timeline-name')
    if (event.target === names[names.length - 1]) setSettled(true)
  }

  function openChapter(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    const current = window.history.state
    const nextState = current && typeof current === 'object' ? { ...current, hash: id } : { hash: id }
    const nextUrl = `${site.spa}#${id}`
    if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
      window.history.pushState(nextState, '', nextUrl)
    }
    onOpen(id)
  }

  return (
    <section className="bg-[#2B2727] px-4 py-14 text-[#F7F4EF] sm:px-6 md:py-16">
      <div className="mx-auto flex flex-col items-center">
        <h1 className={`text-center text-[#F7F4EF] ${HEADING}`}>Spa Partners</h1>
        <p className="mt-4 max-w-md text-center text-[15px] leading-relaxed text-[#F7F4EF]/80">
          A coordinated home routine for the clients you already see.
        </p>
        <div
          onAnimationEnd={onAnimationEnd}
          className={`protocol-timeline protocol-timeline-numbers about-timeline is-playing mt-12 w-full max-w-sm md:max-w-3xl ${settled ? 'is-settled' : ''}`}
        >
          <div className="protocol-timeline-line" aria-hidden="true">
            <span className="protocol-timeline-line-draw" />
          </div>
          <ol className="protocol-timeline-steps" aria-label="Spa partner page sections">
            {CHAPTERS.map((chapter, index) => (
              <li key={chapter.id} className="protocol-timeline-step">
                <a
                  href={`${site.spa}#${chapter.id}`}
                  className="about-timeline-link"
                  onClick={event => openChapter(event, chapter.id)}
                >
                  <span className="protocol-timeline-mark">{String(index + 1).padStart(2, '0')}</span>
                  <span className="protocol-timeline-name">{chapter.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function PhotoWell({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:min-h-[320px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
      <SunbeamMatGlow />
      <div className="absolute inset-[8%] z-[1]">
        <OffsetFrame />
        <div className="relative z-[1] h-full overflow-hidden">
          <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
        </div>
      </div>
    </div>
  )
}

export default function SpaPartnersPage({ hash = '' }: { hash?: string }) {
  const [chapter, setChapter] = useState(() => (hash || window.location.hash).replace(/^#/, ''))
  const [scrollNonce, setScrollNonce] = useState(0)
  const landed = useRef(false)
  const seenHash = useRef(hash)

  useEffect(() => {
    if (seenHash.current === hash) return
    seenHash.current = hash
    setChapter(hash.replace(/^#/, ''))
  }, [hash])

  useLayoutEffect(() => {
    const first = !landed.current
    landed.current = true
    const known = CHAPTERS.some(item => item.id === chapter)
    const behavior: ScrollBehavior = first || prefersReducedMotion() ? 'auto' : 'smooth'
    if (!known) {
      if (!first) window.scrollTo({ top: 0, behavior })
      return
    }
    scrollToChapter(chapter, behavior)
    if (!first) document.getElementById(chapter)?.focus({ preventScroll: true })
  }, [chapter, scrollNonce])

  function openChapter(id: string) {
    setChapter(id)
    setScrollNonce(value => value + 1)
  }

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <SpaHero onOpen={openChapter} />

      <section id="partnership" tabIndex={-1} className={`${SECTION} bg-[#FFFDFA] py-14 md:py-16`}>
        <div className="grid items-center gap-12 min-[900px]:grid-cols-2 min-[900px]:gap-16">
          <PhotoWell
            src="/designs/working/spa-room.jpg"
            alt="A linen treatment bed with a dusty rose throw in a quiet spa room"
          />
          <div>
            <p className={EYEBROW}>01 / Partnership</p>
            <h2 className={`mt-4 ${HEADING}`}>
              Care that continues
              <br />
              between visits.
            </h2>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              Skin Protocol RX gives your practice a home routine that supports the work you do in the treatment room. Clients leave with a clear protocol, and a reason to stay with it.
            </p>
            <p className="mt-4 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              The line is family-owned and made in New York, with formulas chosen for a purpose rather than a crowded shelf.
            </p>
          </div>
        </div>
      </section>

      <section id="benefits" tabIndex={-1} className={`${SECTION} bg-[#f5f0eb] py-14 md:py-16`}>
        <p className={EYEBROW}>02 / Benefits</p>
        <h2 className={`mt-4 max-w-[16ch] ${HEADING}`}>A line you can recommend with confidence.</h2>
        <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed text-[#595750]">
          Professional pricing, a simple system, and support from the people who make the formulas.
        </p>
        <ol className="mt-10 grid gap-x-16 min-[900px]:grid-cols-2">
          {BENEFITS.map(item => (
            <li key={item.title} className="border-b border-[#E4DCD3] py-6">
              <p className="font-serif text-[26px] leading-none tracking-[0.14em] text-[#ab8584] italic">{item.index}</p>
              <h3 className="mt-3.5 font-serif text-[clamp(28px,2.1vw,34px)] leading-[1.12] font-normal tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 max-w-[36rem] text-[16px] leading-relaxed text-[#595750]">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="apply" tabIndex={-1} className="scroll-mt-28 bg-[#2B2727] px-6 py-12 text-[#F7F4EF] outline-none min-[681px]:px-[max(36px,8vw)] md:py-16">
        <div className="grid items-start gap-8 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(300px,1fr)] min-[900px]:gap-14">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.21em] text-[#C4A8A6] uppercase">03 / Apply</p>
            <h2 className={`mt-3 ${HEADING}`}>A short path to the treatment room.</h2>
            <p className="mt-4 max-w-[34rem] text-[17px] leading-relaxed text-[#F7F4EF]/80">
              Tell us about the practice. We review each application and follow up within 3–5 business days.
            </p>
            <ol className="mt-6 max-w-[34rem] border-t border-white/15">
              {STEPS.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-white/15 py-3">
                  <p className="font-serif text-[1.25rem] italic leading-none text-[#ab8584]">{String(index + 1).padStart(2, '0')}</p>
                  <div>
                    <h3 className="font-serif text-[1.25rem] font-normal leading-none tracking-[-0.03em] text-[#F7F4EF]">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-snug text-[#F7F4EF]/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-[900px]:self-center">
            <PracticeQuiz />
          </div>
        </div>
      </section>
    </article>
  )
}
