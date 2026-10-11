import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { PRODUCTS, SKIN_CONCERNS, type Product } from '../../data'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface SkinConcernSectionPreviewProps {
  onNavigate: (page: Page, productId?: string) => void
}

type Concern = (typeof SKIN_CONCERNS)[number]

const FAMILIES: { id: string; num: string; name: string; line: string; concernIds: string[] }[] = [
  {
    id: 'tone',
    num: '01',
    name: 'Tone',
    line: 'A more even look.',
    concernIds: ['brightening', 'hyperpigmentation', 'sun-damage'],
  },
  {
    id: 'texture',
    num: '02',
    name: 'Texture',
    line: 'Smoother-looking skin.',
    concernIds: ['acne', 'large-pores', 'aging'],
  },
  {
    id: 'comfort',
    num: '03',
    name: 'Comfort',
    line: 'Skin that feels settled.',
    concernIds: ['dry-skin', 'redness', 'eye-area', 'preventative'],
  },
]

/** Two real products that are a sensible place to start for each concern. */
const STARTS: Record<string, string[]> = {
  aging: ['bakuchiol-renewal-serum', 'amino-acid-serum'],
  brightening: ['brighten-glow-c-20', 'tripleglow-exfoliating-cleanser'],
  hyperpigmentation: ['brighten-glow-c-20', 'brighten-glow-c-5'],
  'large-pores': ['clarifying-gel-cleanser', 'rosewater-niacinamide-toner'],
  preventative: ['brighten-glow-c-5', 'hyaluronic-acid-serum'],
  'sun-damage': ['brighten-glow-c-20', 'bakuchiol-renewal-serum'],
  acne: ['clarifying-gel-cleanser', 'tripleglow-exfoliating-cleanser'],
  'dry-skin': ['rich-barrier-cream', 'hyaluronic-acid-serum'],
  redness: ['clarifying-cleanser', 'beauty-elixir-serum'],
  'eye-area': ['eye-cream', 'hyaluronic-acid-serum'],
}

const LAYOUTS = [
  { id: 'current', num: '00', name: 'Current', note: 'Ten equal cards. The same icon sits on every one.' },
  { id: 'index', num: '01', name: 'The Index', note: 'A numbered directory. You scan names, not boxes.' },
  { id: 'focus', num: '02', name: 'The Focus', note: 'Choose a concern and the section answers with two products.' },
  { id: 'families', num: '03', name: 'Three Families', note: 'Tone, texture, and comfort. Ten concerns with a point of view.' },
  { id: 'strip', num: '04', name: 'The Strip', note: 'Large type in a sideways row. The name is the design.' },
  { id: 'name-it', num: '05', name: 'Name It', note: 'One question, then a place to start. Closer to the protocol builder.' },
  { id: 'peek', num: '06', name: 'Peek', note: 'A few cards in view, the next one showing. Arrows, and a line that tracks the scroll.' },
  { id: 'stage', num: '07', name: 'The Stage', note: 'One concern at a time. The next slide stays just in frame.' },
  { id: 'reel', num: '08', name: 'The Reel', note: 'The concern name is the slide. Neighbors stay in frame, faded. No product photos.' },
]

function concernById(id: string): Concern | undefined {
  return SKIN_CONCERNS.find(concern => concern.id === id)
}

function productsFor(concernId: string): Product[] {
  return (STARTS[concernId] ?? [])
    .map(id => PRODUCTS.find(product => product.id === id))
    .filter((product): product is Product => product !== undefined)
}

function LayoutFrame({
  id,
  num,
  name,
  note,
  children,
}: {
  id: string
  num: string
  name: string
  note: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-[10rem] md:scroll-mt-[12rem]">
      <div className="bg-[#241F1E] text-white px-5 md:px-8 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-2">Layout {num}</p>
            <h2 className="font-serif text-2xl md:text-3xl">{name}</h2>
          </div>
          <p className="text-sm text-white/50 max-w-md leading-relaxed">{note}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function ConcernIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="shrink-0">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHeading({ onNavigate, title = 'Shop by skin concern' }: { onNavigate: SkinConcernSectionPreviewProps['onNavigate']; title?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">Find your focus</p>
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal">{title}</h3>
      </div>
      <button
        type="button"
        onClick={() => onNavigate('shop')}
        className="link-arrow text-sm text-charcoal hover:text-rose"
      >
        View the collection
      </button>
    </div>
  )
}

function ProductStart({ product, onNavigate }: { product: Product; onNavigate: SkinConcernSectionPreviewProps['onNavigate'] }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate('product', product.id)}
      className="group flex items-baseline justify-between gap-4 border-b border-gray-soft py-3 text-left"
    >
      <span>
        <span className="block text-sm font-medium text-charcoal group-hover:text-rose transition-colors">{product.name}</span>
        <span className="block text-sm text-charcoal/70 mt-0.5">{product.tagline}</span>
      </span>
      <span className="text-sm text-charcoal">${product.price}</span>
    </button>
  )
}

function CurrentLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  return (
    <div className="bg-stone px-6 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading onNavigate={onNavigate} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SKIN_CONCERNS.map(concern => (
            <button
              key={concern.id}
              type="button"
              onClick={() => onNavigate('shop')}
              className="bg-ivory border border-gray-soft hover:border-rose p-5 text-left transition-colors"
            >
              <div className="text-rose mb-3">
                <ConcernIcon />
              </div>
              <h4 className="text-sm font-medium text-charcoal mb-1">{concern.label}</h4>
              <p className="text-sm text-charcoal/80 leading-relaxed">{concern.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function IndexLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  return (
    <div className="bg-ivory px-6 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading onNavigate={onNavigate} />
        <div className="grid grid-cols-2 gap-x-6 md:grid-cols-5 md:gap-x-8">
          {SKIN_CONCERNS.map((concern, index) => (
            <button
              key={concern.id}
              type="button"
              onClick={() => onNavigate('shop')}
              className={`flex h-full flex-col border-b border-gray-soft py-5 text-left group ${index < 2 ? 'border-t' : ''} ${index >= 2 && index < 5 ? 'md:border-t' : ''}`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-[11px] tracking-[0.18em] text-rose">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-charcoal transition-all group-hover:translate-x-1 group-hover:text-rose">
                  <Arrow />
                </span>
              </span>
              <span className="mt-3 block font-serif text-lg leading-snug text-charcoal transition-colors group-hover:text-rose">{concern.label}</span>
              <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">{concern.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FocusLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  const [activeId, setActiveId] = useState(SKIN_CONCERNS[0].id)
  const active = concernById(activeId) ?? SKIN_CONCERNS[0]
  const products = productsFor(active.id)

  return (
    <div className="bg-stone px-6 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading onNavigate={onNavigate} />
        <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 lg:pb-0 lg:overflow-visible">
            {SKIN_CONCERNS.map(concern => {
              const selected = concern.id === active.id
              return (
                <button
                  key={concern.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(concern.id)}
                  className={`shrink-0 lg:shrink lg:w-full text-left px-4 py-3 text-sm transition-colors border-l-2 ${
                    selected
                      ? 'bg-ivory border-rose text-charcoal font-medium'
                      : 'border-transparent text-charcoal/75 hover:text-charcoal'
                  }`}
                >
                  {concern.label}
                </button>
              )
            })}
          </div>
          <div className="bg-ivory border border-gray-soft p-6 md:p-10">
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">A place to start</p>
            <h4 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">{active.label}</h4>
            <p className="text-base text-charcoal/80 leading-relaxed max-w-lg mb-8">{active.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {products.map(product => (
                <ProductStart key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
            <button type="button" onClick={() => onNavigate('shop')} className="btn-primary">
              Shop {active.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FamiliesLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  return (
    <div className="bg-stone px-6 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading onNavigate={onNavigate} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {FAMILIES.map(family => (
            <div key={family.id} className="bg-ivory border border-gray-soft px-6 py-8 flex flex-col">
              <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">{family.num}</p>
              <h4 className="font-serif text-3xl text-charcoal">{family.name}</h4>
              <p className="text-sm text-charcoal/75 mt-2 mb-6">{family.line}</p>
              <ul className="border-t border-gray-soft">
                {family.concernIds.map(id => {
                  const concern = concernById(id)
                  if (!concern) return null
                  return (
                    <li key={concern.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate('shop')}
                        className="w-full text-left py-4 border-b border-gray-soft group"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-charcoal group-hover:text-rose transition-colors">{concern.label}</span>
                          <span className="text-charcoal/50 group-hover:text-rose group-hover:translate-x-1 transition-all">
                            <Arrow />
                          </span>
                        </span>
                        <span className="block text-sm text-charcoal/70 mt-1 leading-relaxed pr-6">{concern.description}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StripLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  return (
    <div className="bg-ivory py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading onNavigate={onNavigate} />
        <p className="text-sm text-charcoal/60 -mt-4 mb-6">Scroll sideways to move through the concerns.</p>
      </div>
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
        <div className="flex gap-3 w-max px-6 md:px-8">
          {SKIN_CONCERNS.map((concern, index) => (
            <button
              key={concern.id}
              type="button"
              onClick={() => onNavigate('shop')}
              className="snap-start shrink-0 w-[20rem] min-h-[19rem] bg-stone border border-transparent hover:border-rose p-6 text-left flex flex-col transition-colors"
            >
              <span className="text-[11px] tracking-[0.22em] text-rose">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-serif text-3xl text-charcoal leading-tight mt-8">{concern.label}</span>
              <span className="text-sm text-charcoal/75 leading-relaxed mt-4">{concern.description}</span>
              <span className="mt-auto pt-8 inline-flex items-center gap-2 text-sm text-charcoal">
                Shop
                <Arrow />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function useConcernCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const pendingRef = useRef<number | null>(null)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const closestIndex = (node: HTMLDivElement) => {
    const slides = [...node.querySelectorAll<HTMLElement>('[data-slide]')]
    if (!slides.length) return 0
    const focus = node.scrollLeft + slides[0].offsetLeft
    let closest = 0
    let best = Number.POSITIVE_INFINITY
    slides.forEach((slide, i) => {
      const delta = Math.abs(slide.offsetLeft - focus)
      if (delta < best) {
        best = delta
        closest = i
      }
    })
    return closest
  }

  const read = useCallback(() => {
    const node = scrollerRef.current
    if (!node) return
    const slides = [...node.querySelectorAll<HTMLElement>('[data-slide]')]
    const max = node.scrollWidth - node.clientWidth
    const seen = node.scrollWidth === 0 ? 0 : (node.scrollLeft + node.clientWidth) / node.scrollWidth
    setProgress(Math.min(1, Math.max(0, seen)))
    const closest = closestIndex(node)
    const pending = pendingRef.current
    if (pending != null && slides[pending]) {
      const dest = slides[pending].offsetLeft - slides[0].offsetLeft
      const arrived = Math.abs(node.scrollLeft - Math.min(dest, max)) <= 4
      if (arrived) pendingRef.current = null
    }
    const shown = pendingRef.current ?? closest
    indexRef.current = shown
    setIndex(shown)
    setAtStart(shown <= 0)
    setAtEnd(slides.length === 0 || shown >= slides.length - 1 || max <= 4)
  }, [])

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) return
    const release = () => {
      pendingRef.current = null
    }
    read()
    node.addEventListener('scroll', read, { passive: true })
    node.addEventListener('pointerdown', release)
    window.addEventListener('resize', read)
    return () => {
      node.removeEventListener('scroll', read)
      node.removeEventListener('pointerdown', release)
      window.removeEventListener('resize', read)
    }
  }, [read])

  const go = (direction: -1 | 1) => {
    const node = scrollerRef.current
    if (!node) return
    const slides = [...node.querySelectorAll<HTMLElement>('[data-slide]')]
    if (!slides.length) return
    const base = pendingRef.current ?? indexRef.current
    const next = Math.max(0, Math.min(slides.length - 1, base + direction))
    const max = node.scrollWidth - node.clientWidth
    const left = Math.min(slides[next].offsetLeft - slides[0].offsetLeft, max)
    if (direction === 1 && left <= node.scrollLeft + 2) {
      pendingRef.current = null
      setAtEnd(true)
      return
    }
    if (direction === -1 && node.scrollLeft <= 2) {
      pendingRef.current = null
      setAtStart(true)
      return
    }
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    pendingRef.current = next
    indexRef.current = next
    setIndex(next)
    setAtStart(next <= 0)
    setAtEnd(next >= slides.length - 1)
    node.scrollTo({ left, behavior })
  }

  return { scrollerRef, index, progress, atStart, atEnd, go }
}

function CarouselArrows({
  atStart,
  atEnd,
  onPrev,
  onNext,
}: {
  atStart: boolean
  atEnd: boolean
  onPrev: () => void
  onNext: () => void
}) {
  const buttonClass = 'flex h-10 w-10 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-rose hover:text-rose disabled:pointer-events-none disabled:opacity-30'
  return (
    <div className="flex gap-2">
      <button type="button" className={buttonClass} aria-label="Previous concern" disabled={atStart} onClick={onPrev}>
        <Chevron direction="left" />
      </button>
      <button type="button" className={buttonClass} aria-label="Next concern" disabled={atEnd} onClick={onNext}>
        <Chevron direction="right" />
      </button>
    </div>
  )
}

function ProgressLine({ progress }: { progress: number }) {
  return (
    <div className="mt-6 h-px bg-gray-soft" aria-hidden="true">
      <div className="h-px bg-rose" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

function PeekLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  const { scrollerRef, progress, atStart, atEnd, go } = useConcernCarousel()

  return (
    <div className="bg-ivory py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">Find your focus</p>
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal">Shop by skin concern</h3>
          </div>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => onNavigate('shop')} className="link-arrow text-sm text-charcoal hover:text-rose">
              View the collection
            </button>
            <CarouselArrows atStart={atStart} atEnd={atEnd} onPrev={() => go(-1)} onNext={() => go(1)} />
          </div>
        </div>
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Shop by skin concern"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SKIN_CONCERNS.map((concern, i) => (
            <button
              key={concern.id}
              type="button"
              data-slide
              onClick={() => onNavigate('shop')}
              className="flex min-h-[16rem] w-[18.5rem] shrink-0 snap-start flex-col bg-stone p-6 text-left sm:w-[22rem]"
            >
              <span className="text-[11px] tracking-[0.22em] text-rose">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-8 font-serif text-3xl leading-tight text-charcoal">{concern.label}</span>
              <span className="mt-4 text-sm leading-relaxed text-charcoal/75">{concern.description}</span>
            </button>
          ))}
        </div>
        <ProgressLine progress={progress} />
      </div>
    </div>
  )
}

function StageLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  const { scrollerRef, index, progress, atStart, atEnd, go } = useConcernCarousel()
  const active = SKIN_CONCERNS[index] ?? SKIN_CONCERNS[0]

  return (
    <div className="bg-stone py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">Find your focus</p>
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal">Shop by skin concern</h3>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-[11px] tracking-[0.18em] text-charcoal/70" aria-live="polite">
              {String(index + 1).padStart(2, '0')}
              <span className="text-charcoal/40"> / {String(SKIN_CONCERNS.length).padStart(2, '0')}</span>
            </p>
            <CarouselArrows atStart={atStart} atEnd={atEnd} onPrev={() => go(-1)} onNext={() => go(1)} />
          </div>
        </div>
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Shop by skin concern"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SKIN_CONCERNS.map((concern, i) => {
            const current = concern.id === active.id
            return (
              <article
                key={concern.id}
                data-slide
                aria-current={current ? 'true' : undefined}
                className="flex min-h-[18rem] w-[calc(100%-3.25rem)] shrink-0 snap-start flex-col justify-end bg-ivory p-6 sm:p-8 md:min-h-[22rem] md:w-[calc(100%-4.5rem)] md:p-12"
              >
                <p className="text-[11px] tracking-[0.22em] text-rose">{String(i + 1).padStart(2, '0')}</p>
                <h4 className="mt-6 font-serif text-4xl leading-none text-charcoal md:text-6xl">{concern.label}</h4>
                <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal/80">{concern.description}</p>
                <button type="button" onClick={() => onNavigate('shop')} className="btn-primary mt-8 self-start">
                  Shop {concern.label}
                </button>
              </article>
            )
          })}
        </div>
        <ProgressLine progress={progress} />
      </div>
    </div>
  )
}

function ReelLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const pendingRef = useRef<number | null>(null)
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)
  const active = SKIN_CONCERNS[index] ?? SKIN_CONCERNS[0]

  const scrollToIndex = useCallback((next: number, behavior: ScrollBehavior) => {
    const node = scrollerRef.current
    if (!node) return
    const slides = [...node.querySelectorAll<HTMLElement>('[data-slide]')]
    const slide = slides[next]
    if (!slide) return
    const left = slide.offsetLeft + slide.offsetWidth / 2 - node.clientWidth / 2
    pendingRef.current = next
    indexRef.current = next
    setIndex(next)
    node.scrollTo({ left: Math.max(0, left), behavior })
  }, [])

  const read = useCallback(() => {
    const node = scrollerRef.current
    if (!node) return
    const slides = [...node.querySelectorAll<HTMLElement>('[data-slide]')]
    if (!slides.length) return
    const mid = node.scrollLeft + node.clientWidth / 2
    let closest = 0
    let best = Number.POSITIVE_INFINITY
    slides.forEach((slide, i) => {
      const center = slide.offsetLeft + slide.offsetWidth / 2
      const delta = Math.abs(center - mid)
      if (delta < best) {
        best = delta
        closest = i
      }
    })
    if (pendingRef.current != null) {
      if (closest === pendingRef.current) pendingRef.current = null
      else return
    }
    indexRef.current = closest
    setIndex(closest)
  }, [])

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) return
    const frame = requestAnimationFrame(() => scrollToIndex(0, 'auto'))
    const onPointer = () => {
      pendingRef.current = null
    }
    const onResize = () => scrollToIndex(indexRef.current, 'auto')
    node.addEventListener('scroll', read, { passive: true })
    node.addEventListener('pointerdown', onPointer)
    window.addEventListener('resize', onResize)
    const fonts = document.fonts?.ready.then(() => {
      if (pendingRef.current == null) scrollToIndex(indexRef.current, 'auto')
    })
    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('scroll', read)
      node.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('resize', onResize)
      void fonts
    }
  }, [read, scrollToIndex])

  const go = (direction: -1 | 1) => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    const base = pendingRef.current ?? indexRef.current
    scrollToIndex(Math.max(0, Math.min(SKIN_CONCERNS.length - 1, base + direction)), behavior)
  }

  return (
    <div className="bg-ivory py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <p className="text-center text-[11px] tracking-[0.22em] uppercase text-rose">Shop by skin concern</p>
        <div className="relative mt-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ivory to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ivory to-transparent md:w-20" />
          <div
            ref={scrollerRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Shop by skin concern"
            className="flex items-center overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div aria-hidden="true" className="w-1/2 shrink-0" />
            {SKIN_CONCERNS.map((concern, i) => {
              const selected = i === index
              return (
                <button
                  key={concern.id}
                  type="button"
                  data-slide
                  aria-current={selected ? 'true' : undefined}
                  onClick={() => {
                    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                    scrollToIndex(i, behavior)
                  }}
                  className={`snap-center shrink-0 whitespace-nowrap px-5 font-serif leading-none transition-colors duration-500 md:px-8 text-[clamp(2rem,5.2vw,4.75rem)] ${
                    selected ? 'text-charcoal' : 'text-charcoal/20 hover:text-charcoal/45'
                  }`}
                >
                  <span className="relative">
                    {concern.label}
                    <span className={`absolute -bottom-3 left-0 right-0 h-px bg-rose transition-opacity duration-500 ${selected ? 'opacity-100' : 'opacity-0'}`} />
                  </span>
                </button>
              )
            })}
            <div aria-hidden="true" className="w-1/2 shrink-0" />
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-6 md:gap-10">
          <button
            type="button"
            aria-label="Previous concern"
            disabled={index === 0}
            onClick={() => go(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-rose hover:text-rose disabled:pointer-events-none disabled:opacity-30"
          >
            <Chevron direction="left" />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[11px] tracking-[0.22em] text-rose">{String(index + 1).padStart(2, '0')}</p>
            <p className="mt-3 min-h-[3rem] text-base leading-relaxed text-charcoal/80">{active.description}</p>
            <button type="button" onClick={() => onNavigate('shop')} className="link-arrow mx-auto mt-5 text-sm text-charcoal hover:text-rose">
              Shop {active.label}
            </button>
          </div>
          <button
            type="button"
            aria-label="Next concern"
            disabled={index === SKIN_CONCERNS.length - 1}
            onClick={() => go(1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-rose hover:text-rose disabled:pointer-events-none disabled:opacity-30"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
    </div>
  )
}

function NameItLayout({ onNavigate }: SkinConcernSectionPreviewProps) {
  const [activeId, setActiveId] = useState(SKIN_CONCERNS[0].id)
  const active = concernById(activeId) ?? SKIN_CONCERNS[0]
  const products = productsFor(active.id)

  return (
    <div className="bg-ivory px-6 md:px-8 py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Find your focus</p>
        <h3 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">What are you working on?</h3>
        <p className="text-base text-charcoal/80 leading-relaxed mt-4">
          Choose a concern. Two products are a place to start.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {SKIN_CONCERNS.map(concern => {
            const selected = concern.id === active.id
            return (
              <button
                key={concern.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(concern.id)}
                className={`px-4 py-2 text-sm transition-colors ${
                  selected
                    ? 'bg-charcoal text-ivory'
                    : 'border border-gray-soft text-charcoal hover:border-rose'
                }`}
              >
                {concern.label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-10 pt-8 border-t border-gray-soft text-left">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">{active.label}</p>
        <p className="font-serif text-2xl text-charcoal leading-snug mb-8">{active.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map(product => (
            <ProductStart key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
        <button type="button" onClick={() => onNavigate('shop')} className="btn-primary mt-8">
          Shop {active.label}
        </button>
      </div>
    </div>
  )
}

export default function SkinConcernSectionPreview({ onNavigate }: SkinConcernSectionPreviewProps) {
  return (
    <div className="bg-ivory font-sans">
      <section className="bg-ivory px-5 md:px-8 py-16 md:py-20 border-b border-gray-soft">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-5">Layout review</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-5 max-w-3xl">
            Shop by skin concern, eight other ways
          </h1>
          <p className="text-charcoal/85 leading-relaxed max-w-2xl mb-10">
            The live homepage keeps ten equal cards. The Reel is a type carousel: the concern name is the slide, and the neighbors stay visible beside it.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {LAYOUTS.map(layout => (
              <a
                key={layout.id}
                href={`#${layout.id}`}
                className="border border-gray-soft text-charcoal hover:border-rose hover:text-rose px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors"
              >
                {layout.num} {layout.name}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-sm text-charcoal/70 hover:text-rose transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </section>

      <LayoutFrame id="current" num="00" name="Current" note={LAYOUTS[0].note}>
        <CurrentLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="index" num="01" name="The Index" note={LAYOUTS[1].note}>
        <IndexLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="focus" num="02" name="The Focus" note={LAYOUTS[2].note}>
        <FocusLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="families" num="03" name="Three Families" note={LAYOUTS[3].note}>
        <FamiliesLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="strip" num="04" name="The Strip" note={LAYOUTS[4].note}>
        <StripLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="name-it" num="05" name="Name It" note={LAYOUTS[5].note}>
        <NameItLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="peek" num="06" name="Peek" note={LAYOUTS[6].note}>
        <PeekLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="stage" num="07" name="The Stage" note={LAYOUTS[7].note}>
        <StageLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="reel" num="08" name="The Reel" note={LAYOUTS[8].note}>
        <ReelLayout onNavigate={onNavigate} />
      </LayoutFrame>
    </div>
  )
}
