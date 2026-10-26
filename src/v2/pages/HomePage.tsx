import { useState } from 'react'
import { PRODUCTS, getProtocolStepLabel } from '../../data'
import ProtocolOverviewSection from '../../designs/ProtocolOverviewSection'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface HomePageProps {
  onNavigate: (page: Page, productId?: string) => void
}

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

const PHILOSOPHY_POINTS = [
  { symbol: '✳', title: 'Thoughtfully selected', body: 'Purposeful formulations. A protocol with purpose.' },
  { symbol: '◌', title: 'Tried and true', body: 'Supported by research and evidence-based information.' },
  { symbol: '✧', title: 'Results without hype', body: 'Backed by research. No unnecessary extras.' },
  { symbol: '+', title: 'Clinical intention', body: 'Where clinical intention meets natural intelligence.' },
  { symbol: '♡', title: 'Never tested on animals', body: 'A standard we hold, not a badge.' },
  { symbol: '◎', title: 'Expert founded', body: 'Chemist · Nurse Practitioner · Esthetician' },
]

const PHILOSOPHY_LINKS: { label: string; body: string; page: Page; id?: string }[] = [
  { label: 'Our Standards', body: 'How we decide what stays and what stays out.', page: 'story', id: 'our-standards' },
  { label: 'Ingredient Glossary', body: 'See what is in the formulas and why.', page: 'glossary' },
  { label: 'Product Education', body: 'Learn what each product is good for.', page: 'education' },
]

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
      <section className="bg-ivory py-10 md:py-14">
        <div className="grid items-center min-[681px]:min-h-[clamp(320px,36vw,520px)] min-[681px]:grid-cols-[48%_52%]">
          <div className="flex flex-col justify-center px-6 py-6 order-2 min-[681px]:order-1 min-[681px]:py-8 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]">
            <p className="text-[11px] tracking-[0.21em] uppercase text-rose font-medium">
              Skincare with intention
            </p>
            <h1 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] leading-[1.08] tracking-[-0.044em] text-charcoal min-[681px]:text-[clamp(44px,4vw,60px)]">
              Your Skin Doesn&apos;t Need More.<br />
              <em>It Needs What Works.</em>
            </h1>
            <p className="mb-4 max-w-[540px] text-[15px] leading-relaxed text-charcoal/85">
              Every formula is thoughtfully crafted with evidence-based science to support healthier skin—without trends or unnecessary extras.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => onNavigate('shop')} className="btn-primary">
                Explore the collection
              </button>
              <button type="button" onClick={() => onNavigate('protocol')} className="btn-secondary">
                Build your protocol
              </button>
            </div>
          </div>
          <div className="lineup-frame order-1 aspect-auto h-full min-h-[300px] self-stretch min-[681px]:order-2 min-[681px]:min-h-[clamp(320px,36vw,520px)]">
            <img
              src="/v2-collection-lineup.jpg"
              alt="Skin Protocol RX bottles and jars arranged in warm spa light"
            />
          </div>
        </div>
      </section>

      <section id="philosophy" className="bg-stone px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 lg:items-center">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Our philosophy</p>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal leading-[1.08] mb-7">
              Everything your skin needs.
              <br />
              <em>Nothing it doesn&apos;t.</em>
            </h2>
            <p className="text-base md:text-lg text-charcoal/85 leading-relaxed">
              We formulate with thoughtfully selected actives and botanical ingredients, each chosen for a reason—to support healthy, resilient skin. Every product has a clear role in a simplified, effective routine. Our focus is on high-quality formulas and useful product education, without chasing trends or adding unnecessary extras.
            </p>
            <div className="mt-7 grid grid-cols-1 border-t border-gray-soft min-[701px]:grid-cols-3">
              {PHILOSOPHY_LINKS.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onNavigate(item.page, item.id)}
                  className={`group flex w-full items-center justify-between gap-2.5 border-b border-gray-soft py-[18px] text-left min-[701px]:border-b-0 min-[701px]:border-l min-[701px]:px-3 min-[701px]:py-5 min-[701px]:first:border-l-0 min-[701px]:first:pl-0 min-[701px]:last:pr-0 ${i === 2 ? 'border-b-0' : ''}`}
                >
                  <span>
                    <span className="relative inline-block whitespace-nowrap text-sm font-medium text-charcoal transition-colors group-hover:text-rose after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-rose after:transition-[width] after:duration-300 group-hover:after:w-full">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-charcoal/70">{item.body}</span>
                  </span>
                  <span className="shrink-0 text-charcoal transition-all duration-200 group-hover:translate-x-1 group-hover:text-rose" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-7">
            {PHILOSOPHY_POINTS.map((point, i) => (
              <div
                key={point.title}
                className={`flex items-center gap-5 border-t border-gray-soft py-6 ${i >= PHILOSOPHY_POINTS.length - 2 ? 'border-b border-gray-soft' : ''}`}
              >
                <span className="shrink-0 font-serif text-[30px] leading-none text-rose" aria-hidden="true">{point.symbol}</span>
                <div>
                  <p className="font-serif text-[22px] text-charcoal leading-tight">{point.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-charcoal/60">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProtocolOverviewSection
        tone="rose"
        id="protocol-overview"
        onCta={() => onNavigate('protocol')}
      />

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
