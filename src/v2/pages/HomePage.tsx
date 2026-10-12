import { useEffect, useRef, useState } from 'react'
import { PRODUCTS, SKIN_CONCERNS, PROTOCOL_STEPS, getProtocolStepLabel } from '../../data'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface HomePageProps {
  onNavigate: (page: Page, productId?: string) => void
}

const DIFFERENCE = [
  {
    title: 'What it is',
    body: 'A clinical line with a natural point of view. Clear formulas, calm routines, and packaging you can recognize.',
  },
  {
    title: 'What makes it different',
    body: 'Each product has one job. Ingredients stay because they earn their place, not because a trend asked for them.',
  },
  {
    title: 'Why you can trust it',
    body: 'Built by a chemist, a nurse practitioner, and a licensed medical esthetician who work with skin every day.',
  },
]

const TESTIMONIALS_CUSTOMER = [
  { name: 'Rachel M.', location: 'Client', text: 'The Hyaluronic Acid Serum changed my morning routine completely. My skin has never felt this hydrated by midday.', rating: 5 },
  { name: 'Danielle K.', location: 'Client', text: 'I was hesitant to try a 20% vitamin C, but Brighten & Glow C Serum has been a game changer for my hyperpigmentation.', rating: 5 },
  { name: 'Sophia T.', location: 'Client', text: 'Simple products that do exactly what they say. I finally know what belongs in my routine.', rating: 5 },
]

const TESTIMONIALS_PRO = [
  { name: 'Maria L., LE', location: 'Skin studio', text: 'My clients love continuing their routine at home. The results show up between appointments.', rating: 5 },
  { name: 'Dr. Jennifer S.', location: 'Dermatology', text: 'Recommendations are simpler now. Clients follow through because the routine is clear.', rating: 5 },
  { name: 'Aisha C., LE', location: 'Wellness spa', text: 'The ingredient quality feels clinical, at a price my clients are comfortable with.', rating: 5 },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i <= rating ? '#B88E91' : 'none'}
          stroke="#B88E91"
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

const PRESCRIPTION = [
  'If an ingredient is in the bottle, it has a job.',
  'We keep formulas focused.',
  'Our formulas are never tested on animals.',
]

const PHILOSOPHY_LINKS: { label: string; body: string; page: Page; id?: string }[] = [
  { label: 'Ingredient Glossary', body: 'See what is in the formulas and why.', page: 'glossary' },
  { label: 'Product Education', body: 'Learn what each product is good for.', page: 'education' },
  { label: 'Our Standards', body: 'How we decide what stays and what stays out.', page: 'story', id: 'our-standards' },
]

function PrescriptionMark() {
  const ref = useRef<HTMLSpanElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setDrawn(true)
      observer.disconnect()
    }, { threshold: 0.6 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className="relative inline-block">
      <span className="font-serif text-6xl md:text-7xl text-charcoal leading-none">Rx</span>
      <svg
        viewBox="0 0 192 116"
        className="pointer-events-none absolute left-1/2 h-[6.05rem] w-[10rem] -translate-x-1/2 -top-[0.42rem] overflow-visible text-rose md:-top-2 md:h-[7.25rem] md:w-[12rem]"
        aria-hidden="true"
      >
        <ellipse
          cx="96"
          cy="52"
          rx="80"
          ry="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          pathLength={1}
          transform="rotate(-7 96 52)"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: drawn ? 'stroke-dashoffset 1.15s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        />
      </svg>
    </span>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="shrink-0">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProductCard({ product, onNavigate }: { product: typeof PRODUCTS[0]; onNavigate: (page: Page, id?: string) => void }) {
  const badge = product.badges[0]
  return (
    <button
      type="button"
      className="group flex flex-col text-left cursor-pointer"
      onClick={() => onNavigate('product', product.id)}
    >
      <div className="relative mb-4">
        <ProductImage src={product.image} alt={product.name} hover />
        {badge && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 font-medium bg-ivory/90 text-rose border border-rose/40">
            {badge}
          </span>
        )}
      </div>
      <p className="text-[11px] tracking-[0.16em] uppercase text-rose mb-1">
        {getProtocolStepLabel(product.protocolStep)}
      </p>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-sans text-base font-medium text-charcoal leading-snug">{product.name}</h3>
        <p className="font-sans text-base font-semibold text-charcoal whitespace-nowrap">${product.price}</p>
      </div>
      <p className="text-sm text-charcoal/75 leading-relaxed mt-1">{product.tagline}</p>
    </button>
  )
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [testimonialTab, setTestimonialTab] = useState<'customer' | 'pro'>('customer')
  const testimonials = testimonialTab === 'customer' ? TESTIMONIALS_CUSTOMER : TESTIMONIALS_PRO
  const featuredProducts = PRODUCTS.filter(p =>
    ['brighten-glow-c-20', 'hyaluronic-acid-serum', 'rich-barrier-cream', 'the-holy-grail'].includes(p.id)
  )

  return (
    <div className="bg-ivory font-sans text-charcoal">

      {/* CTA 1 — product-led hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center bg-ivory">
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-14 lg:py-16 order-2 lg:order-1">
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-5">
            Clinical Simplicity. Natural Intelligence.
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.12] text-charcoal mb-6">
            Your Skin Doesn&apos;t Need More.<br />
            <em>It Needs What Works.</em>
          </h1>
          <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-md mb-8">
            A calm clinical line for real skin. Start with the collection, or answer a few questions and we&apos;ll suggest a simple routine.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <button type="button" onClick={() => onNavigate('shop')} className="btn-primary">
              Explore the Collection
            </button>
            <button type="button" onClick={() => onNavigate('protocol')} className="btn-secondary">
              Find Your Protocol
            </button>
          </div>
        </div>
        <div className="lineup-frame order-1 lg:order-2 self-center">
          <img
            src="/v2-collection-lineup.jpg"
            alt="Skin Protocol RX bottles and jars arranged in warm spa light"
          />
        </div>
      </section>

      {/* What it is, why it is different, why to trust it */}
      <section className="bg-stone px-6 md:px-8 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIFFERENCE.map(item => (
            <div key={item.title} className="difference-card" tabIndex={0}>
              <h2 className="difference-title font-serif text-2xl">{item.title}</h2>
              <p className="text-base text-charcoal/85 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 3 — model and routine steps together */}
      <section className="px-6 md:px-8 py-16 bg-ivory">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="aspect-[4/5] bg-stone overflow-hidden">
            <img
              src="/our-story-ritual.jpg"
              alt="A woman applying Skin Protocol RX cream, with the collection beside her"
              className="w-full h-full object-cover object-[center_28%]"
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">A simple routine</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Start with the steps your skin actually needs
            </h2>
            <p className="text-base text-charcoal/85 leading-relaxed mb-6">
              Cleanse, treat, and moisturize. Add eye care or a facial oil only if you want them. Finish the morning with sunscreen.
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {PROTOCOL_STEPS.map(s => {
                const body = (
                  <>
                    <p className="text-[11px] tracking-[0.16em] uppercase text-rose">Step {s.step}</p>
                    <p className="font-serif text-lg text-charcoal">{s.name}</p>
                  </>
                )
                if (s.productBacked === false) {
                  return (
                    <li key={s.step} className="bg-stone px-4 py-3">
                      {body}
                    </li>
                  )
                }
                return (
                  <li key={s.step}>
                    <button
                      type="button"
                      onClick={() => onNavigate('shop', String(s.step))}
                      className="w-full bg-stone px-4 py-3 text-left border border-transparent transition-colors hover:bg-ivory hover:border-rose/50 focus-visible:bg-ivory focus-visible:border-rose/50"
                    >
                      {body}
                    </button>
                  </li>
                )
              })}
            </ol>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button type="button" onClick={() => onNavigate('protocol')} className="btn-primary">
                Build My Routine
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('skin-concerns')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Search by Skin Concern
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by skin concern — the Index */}
      <section id="skin-concerns" className="bg-ivory px-6 md:px-8 py-16 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">Find your focus</p>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Shop by skin concern</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="link-arrow text-sm text-charcoal hover:text-rose"
            >
              View the collection
            </button>
          </div>
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
      </section>

      {/* CTA 4 — featured products */}
      <section className="bg-ivory px-6 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">The collection</p>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Featured products</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="link-arrow text-sm text-charcoal hover:text-rose"
            >
              Explore the collection
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" className="bg-stone px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.75fr)] gap-10 lg:gap-16 items-center">
          <div className="bg-ivory border border-gray-soft px-8 md:px-12 py-12 md:py-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">The Natural Prescription</p>
                <PrescriptionMark />
              </div>
              <h2 className="font-serif text-xl text-charcoal leading-snug sm:text-right">
                Everything your skin needs.
                <br />
                Nothing it doesn&apos;t.
              </h2>
            </div>
            <ol className="border-t border-gray-soft">
              {PRESCRIPTION.map((line, index) => (
                <li key={line} className="grid grid-cols-[2.75rem_1fr] gap-3 py-5 border-b border-gray-soft last:border-b-0">
                  <span className="font-serif text-lg text-rose">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-xl md:text-2xl text-charcoal leading-snug">{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-2 pt-6 border-t border-gray-soft text-[11px] tracking-[0.18em] uppercase text-charcoal/55">
              Chemist · Nurse Practitioner · Esthetician
            </p>
          </div>
          <div className="border-t border-gray-soft">
            {PHILOSOPHY_LINKS.map(item => (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.page, item.id)}
                className="w-full flex items-center justify-between gap-6 py-5 border-b border-gray-soft text-left group"
              >
                <span>
                  <span className="block text-sm font-medium text-charcoal group-hover:text-rose transition-colors">{item.label}</span>
                  <span className="block text-sm text-charcoal/70 mt-1">{item.body}</span>
                </span>
                <span className="text-charcoal group-hover:text-rose group-hover:translate-x-1 transition-all">
                  <Arrow />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,24rem)] gap-10 lg:gap-16 lg:items-center">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-5">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.05] mb-10">
              Professional standards, personal care
            </h2>
            <p className="text-base text-charcoal/85 leading-[1.75] mb-6">
              <span className="float-left font-serif text-7xl leading-[0.75] pr-3 pt-1 text-charcoal">A</span>
              family built this line because healthy skin should not need a crowded shelf. A chemist, a nurse practitioner, and an esthetician share the bench, and the formulas follow that care.
            </p>
            <p className="text-base text-charcoal/85 leading-[1.75] mb-10">
              Ingredients stay because of how they behave on skin. The routine stays short: the products your skin needs, and nothing it doesn&apos;t.
            </p>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Why these formulas</p>
            <p className="font-serif italic text-2xl text-charcoal leading-snug mb-8">
              Clinical enough to trust. Natural enough to live with.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('story')}
              className="link-arrow self-start text-sm text-charcoal hover:text-rose"
            >
              Read our story
            </button>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-stone w-full max-w-md lg:max-w-none">
            <img
              src="/our-story-water-kissed.jpg"
              alt="A woman with glowing skin, her hand at her jaw as water splashes across her shoulder"
              className="w-full h-full object-cover object-[68%_16%]"
            />
          </div>
        </div>
      </section>

      {/* Spa teaser */}
      <section className="bg-stone px-6 md:px-8 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">For spas and estheticians</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              A home routine your clients can keep
            </h2>
            <p className="text-base text-charcoal/85 leading-relaxed mb-8">
              Recommend a short, coordinated line they can use between visits. The same formulas, explained in plain language.
            </p>
            <button type="button" onClick={() => onNavigate('spa')} className="btn-primary">
              Explore Spa Partnerships
            </button>
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-stone">
            <img
              src="/spa-partnership-shelf.jpg"
              alt="Skin Protocol RX products displayed on warm spa shelves"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory px-6 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">From the treatment room and at home</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">What people are saying</h2>
            <div className="inline-flex border border-gray-soft bg-stone">
              <button
                type="button"
                onClick={() => setTestimonialTab('customer')}
                className={`px-5 py-2.5 text-sm font-medium transition-colors ${testimonialTab === 'customer' ? 'bg-rose text-white' : 'text-charcoal hover:text-rose'}`}
              >
                Clients
              </button>
              <button
                type="button"
                onClick={() => setTestimonialTab('pro')}
                className={`px-5 py-2.5 text-sm font-medium transition-colors ${testimonialTab === 'pro' ? 'bg-rose text-white' : 'text-charcoal hover:text-rose'}`}
              >
                Spa professionals
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="bg-stone p-6 flex flex-col gap-4">
                <StarRating rating={t.rating} />
                <p className="font-serif text-base leading-relaxed text-charcoal">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-auto pt-4 border-t border-gray-soft">
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-charcoal/70">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
