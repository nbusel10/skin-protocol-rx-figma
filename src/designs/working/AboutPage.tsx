import { useEffect, useLayoutEffect, useRef, useState, type AnimationEvent, type MouseEvent } from 'react'
import { OffsetFrame } from './OffsetPhoto'
import SunbeamMatGlow from './SunbeamMatGlow'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const SECTION = 'scroll-mt-28 px-6 text-[#252520] outline-none min-[681px]:px-[max(36px,8vw)]'

const CHAPTERS = [
  { id: 'our-story', label: 'Our Story' },
  { id: 'our-standards', label: 'Our Standards' },
  { id: 'our-approach', label: 'Our Approach' },
] as const

const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Chemist',
    contribution: 'Selects each ingredient with care, then balances the formula for performance and feel.',
    image: '/original/founder-linda.jpg',
    alt: 'Linda D. Amend, MS — chemist and co-founder of Skin Protocol RX, in a branded white lab coat',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Nurse Practitioner',
    contribution: 'Connects the formula to everyday skin, so care stays practical and personal.',
    image: '/original/founder-susanna.jpg',
    alt: 'Susanna Amend, NP — nurse practitioner and co-founder of Skin Protocol RX, in a branded white lab coat',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Licensed Medical Esthetician',
    contribution: "Sees how a client's skin changes over time, from the treatment room into daily care.",
    image: '/original/founder-christina.jpg',
    alt: 'Christina Corbin, LME — licensed medical esthetician and co-founder of Skin Protocol RX',
  },
]

const PRINCIPLES = [
  {
    index: '01',
    title: 'Ingredient Selection',
    body: 'Ingredients are chosen for a clear purpose within each formula, balancing function, compatibility, and the needs of the skin.',
  },
  {
    index: '02',
    title: 'Thoughtful Formulation',
    body: 'Each product is designed to serve a distinct purpose, with carefully considered combinations rather than unnecessary complexity.',
  },
  {
    index: '03',
    title: 'Intentional Restraint',
    body: 'Ingredients are not added for marketing appeal or trend cycles. Priority stays with function, tolerance, and consistency over time.',
  },
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function chapterId(id: string) {
  if (id === 'our-expertise') return 'our-story'
  return id
}

function scrollToChapter(id: string, behavior: ScrollBehavior) {
  const node = document.getElementById(chapterId(id))
  if (!node) return
  node.scrollIntoView({ behavior, block: 'start' })
}

function AboutHero({ onOpen }: { onOpen: (id: string) => void }) {
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
    const nextUrl = `/about#${id}`
    if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
      window.history.pushState(nextState, '', nextUrl)
    }
    onOpen(id)
  }

  return (
    <section className="bg-[#2B2727] px-4 py-14 text-[#F7F4EF] sm:px-6 md:py-16">
      <div className="mx-auto flex flex-col items-center">
        <h1 className={`text-center text-[#F7F4EF] ${HEADING}`}>About Us</h1>
        <div
          onAnimationEnd={onAnimationEnd}
          className={`protocol-timeline protocol-timeline-numbers about-timeline is-playing mt-12 w-full max-w-sm md:max-w-3xl ${settled ? 'is-settled' : ''}`}
        >
          <div className="protocol-timeline-line" aria-hidden="true">
            <span className="protocol-timeline-line-draw" />
          </div>
          <ol className="protocol-timeline-steps" aria-label="About page sections">
            {CHAPTERS.map((chapter, index) => (
              <li key={chapter.id} className="protocol-timeline-step">
                <a
                  href={`/about#${chapter.id}`}
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

function PhotoWell({
  src,
  alt,
  position = 'object-center',
  tall = false,
}: {
  src: string
  alt: string
  position?: string
  tall?: boolean
}) {
  const frame = tall
    ? 'relative aspect-[5/4] w-full min-[900px]:ml-auto min-[900px]:max-w-[560px]'
    : 'relative aspect-[3/2] w-full min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:min-h-[320px]'
  return (
    <div className={`${frame} overflow-hidden bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]`}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
      <SunbeamMatGlow />
      <div className="absolute inset-[8%] z-[1]">
        <OffsetFrame />
        <div className="relative z-[1] h-full overflow-hidden">
          <img src={src} alt={alt} className={`h-full w-full object-cover ${position}`} />
        </div>
      </div>
    </div>
  )
}

export default function AboutPage({ hash = '' }: { hash?: string }) {
  const [chapter, setChapter] = useState(() => chapterId((hash || window.location.hash).replace(/^#/, '')))
  const [scrollNonce, setScrollNonce] = useState(0)
  const landed = useRef(false)
  const seenHash = useRef(hash)

  useEffect(() => {
    if (seenHash.current === hash) return
    seenHash.current = hash
    setChapter(chapterId(hash.replace(/^#/, '')))
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
      <AboutHero onOpen={openChapter} />

      <section id="our-story" tabIndex={-1} className={`${SECTION} bg-[#FFFDFA] py-14 md:py-16`}>
        <div className="grid items-center gap-12 min-[900px]:grid-cols-2 min-[900px]:gap-16">
          <PhotoWell
            src="/our-story-foundation-lab.jpg"
            alt="Linda D. Amend, Susanna Amend, and Christina Corbin formulating together at the lab bench"
            position="object-[center_32%]"
          />
          <div>
            <p className={EYEBROW}>01 / Our Story</p>
            <h2 className={`mt-4 ${HEADING}`}>Family-owned and created in New York.</h2>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              Skin Protocol RX was created by a family that believes healthy skin should not require complicated routines or overloaded formulas.
            </p>
            <p className="mt-4 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              Every product reflects a commitment to purposeful ingredients, professional performance, and honest skincare — built in New York and shared with the world.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[904px] md:mt-12">
          <h3 className={HEADING}>Different expertise. Shared intention.</h3>
          <p className="mt-4 max-w-[36rem] text-[17px] leading-relaxed text-[#595750]">
            Three professional perspectives, brought together by one belief in purposeful skincare.
          </p>
          <div className="mt-7 grid grid-cols-1 justify-items-center gap-10 min-[900px]:grid-cols-3 min-[900px]:gap-x-8">
            {FOUNDERS.map(founder => (
              <article key={founder.name} className="w-full max-w-[280px] min-[900px]:max-w-none">
                <div className="aspect-[4/5] overflow-hidden bg-[#f5f0eb]">
                  <img
                    src={founder.image}
                    alt={founder.alt}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <h4 className="mt-5 font-serif text-[23px] leading-tight tracking-[-0.02em] text-[#252520]">{founder.name}</h4>
                <p className="mt-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#ab8584]">{founder.role}</p>
                <p className="mt-3 text-[16px] leading-relaxed text-[#595750]">{founder.contribution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="our-standards" tabIndex={-1} className={`${SECTION} bg-[#f5f0eb] py-14 md:pt-16 md:pb-12`}>
        <p className={EYEBROW}>02 / Our Standards</p>
        <div className="mt-4 grid items-start gap-y-12 min-[900px]:mt-5 min-[900px]:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] min-[900px]:gap-x-16">
          <div>
            <h2 className={HEADING}>
              <span className="block">Thoughtful by design.</span>
              <em className="italic text-[#ab8584]">Purposeful by nature.</em>
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[#595750]">
              Every formula begins with a question: What does your skin actually need? From ingredient selection to the finished product, every decision is made with intention.
            </p>
            <div className="mt-8 border-t border-[#E4DCD3] pt-6">
              <p className={EYEBROW}>Our Commitment</p>
              <p className="mt-3 text-[16px] leading-relaxed text-[#595750]">Never tested on animals.</p>
            </div>
          </div>
          <ol>
            {PRINCIPLES.map(item => (
              <li key={item.title} className="border-b border-[#E4DCD3] py-6 first:pt-0 last:border-b-0 last:pb-0">
                <p className="font-serif text-[26px] leading-none tracking-[0.14em] text-[#ab8584] italic">{item.index}</p>
                <h3 className="mt-3.5 font-serif text-[clamp(28px,2.1vw,34px)] leading-[1.12] font-normal tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 max-w-[36rem] text-[16px] leading-relaxed text-[#595750]">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="our-approach" tabIndex={-1} className={`${SECTION} bg-[#FFFDFA] py-14 md:py-16`}>
        <div className="grid items-center gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-14">
          <div>
            <p className={EYEBROW}>03 / Our Approach</p>
            <h2 className={`mt-4 ${HEADING}`}>A routine that works for you.</h2>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              We believe skincare should fit your skin, not the other way around. Our six-step protocol provides a thoughtful framework, but every step is yours to choose. Build a complete routine or simply add the products that complement what you already use.
            </p>
            <a
              href="/designs/working/protocol"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white transition-colors duration-200 hover:bg-[#141412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
            >
              Build Your Protocol
              <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-4 text-[15px] italic text-[#6D6A63]">Start with the essentials. Add what feels right.</p>
          </div>
          <PhotoWell
            src="/designs/working/protocol-hero.jpg"
            alt="Skin Protocol RX bottles and jars on stone in sunlit spa light"
            position="object-[center_54%]"
            tall
          />
        </div>
      </section>
    </article>
  )
}
