import { useState } from 'react'
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

const FOUNDERS = [
  {
    name: 'Linda D. Amend',
    role: 'Chemist',
    image: '/linda-amend-chemist-co-founder-skin-protocol-rx.png',
    alt: 'Linda D. Amend, chemist and co-founder, in the lab',
  },
  {
    name: 'Susanna Amend',
    role: 'Nurse Practitioner',
    image: '/susanna-amend-np-co-founder-skin-protocol-rx.png',
    alt: 'Susanna Amend, nurse practitioner and co-founder',
  },
  {
    name: 'Christina Corbin',
    role: 'Licensed Medical Esthetician',
    image: '/christina-corbin-lme-co-founder-skin-protocol-rx.png',
    alt: 'Christina Corbin, licensed medical esthetician and co-founder',
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

function ConcernIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
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
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] bg-ivory">
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-14 lg:py-16 order-2 lg:order-1">
          <p className="font-serif text-lg text-rose mb-3">The Natural Prescription</p>
          {/* Directional kicker — not final approved copy */}
          <p className="text-[11px] tracking-[0.22em] uppercase text-charcoal/70 mb-5">
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
        <div className="lineup-frame order-1 lg:order-2 min-h-[320px] lg:min-h-[80vh] bg-stone">
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
            <div key={item.title}>
              <h2 className="font-serif text-2xl text-charcoal mb-3">{item.title}</h2>
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
              src="/hydrated-glowing-skin-water-splash-skin-protocol-rx.png"
              alt="A person with healthy, hydrated skin"
              className="w-full h-full object-cover object-[58%_center]"
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
              {PROTOCOL_STEPS.map(s => (
                <li key={s.step} className="bg-stone px-4 py-3">
                  <p className="text-[11px] tracking-[0.16em] uppercase text-rose">Step {s.step}</p>
                  <p className="font-serif text-lg text-charcoal">{s.name}</p>
                </li>
              ))}
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

      {/* Concern cards */}
      <section id="skin-concerns" className="bg-stone px-6 md:px-8 py-16 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">Find your focus</p>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Shop by skin concern</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="text-sm text-charcoal underline underline-offset-4 hover:text-rose"
            >
              View the collection
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SKIN_CONCERNS.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => onNavigate('shop')}
                className="bg-ivory border border-gray-soft hover:border-rose p-5 text-left transition-colors"
              >
                <div className="text-rose mb-3">
                  <ConcernIcon />
                </div>
                <h3 className="text-sm font-medium text-charcoal mb-1">{c.label}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{c.description}</p>
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
              className="text-sm text-charcoal underline underline-offset-4 hover:text-rose"
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

      {/* CTA 2 — philosophy, education bridge, cruelty-free */}
      <section className="bg-stone px-6 md:px-8 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Our philosophy</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-5">
              Everything your skin needs. Nothing it doesn&apos;t.
            </h2>
            <p className="text-base text-charcoal/85 leading-relaxed mb-6">
              We keep formulas focused. If an ingredient is in the bottle, it has a job. That is the idea behind The Natural Prescription.
            </p>
            <div className="bg-ivory border border-gray-soft p-5">
              <p className="text-[11px] tracking-[0.18em] uppercase text-rose mb-2">Never tested on animals</p>
              <p className="text-base text-charcoal leading-relaxed">
                Cruelty-free is a standard we hold, not a badge on the homepage. Our formulas are never tested on animals.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Ingredient Glossary', body: 'See what is in the formulas and why.', page: 'glossary' as Page },
              { label: 'Product Education', body: 'Learn what each product is good for.', page: 'education' as Page },
              { label: 'Our Standards', body: 'How we decide what stays and what stays out.', page: 'story' as Page, id: 'our-standards' },
            ].map(item => (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.page, 'id' in item ? item.id : undefined)}
                className="flex items-center gap-4 bg-ivory border border-gray-soft px-5 py-4 text-left hover:border-rose transition-colors"
              >
                <span className="text-rose shrink-0">
                  <ConcernIcon />
                </span>
                <span>
                  <span className="block font-medium text-charcoal">{item.label}</span>
                  <span className="block text-sm text-charcoal/75 mt-0.5">{item.body}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 5 — science guided by nature, the charcoal anchor */}
      <section className="bg-charcoal text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="min-h-[280px] lg:min-h-[460px]">
            <img
              src="/family-owned-skin-protocol-rx-founders-skincare-lab-new-york.png"
              alt="The founders formulating Skin Protocol RX together"
              className="w-full h-full object-cover object-center min-h-[280px]"
            />
          </div>
          <div className="px-6 md:px-12 py-14 flex flex-col justify-center">
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Science guided by nature</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-5">Why these formulas</h2>
            <p className="text-base text-white/85 leading-relaxed mb-4">
              Clinical enough to trust. Natural enough to live with. We choose ingredients for how they behave on skin, then keep the routine short.
            </p>
            <p className="text-base text-white/85 leading-relaxed">
              That is why a chemist, a nurse practitioner, and an esthetician share the bench. The result should feel clear, not crowded.
            </p>
          </div>
        </div>
      </section>

      {/* CTA 6 — founders, small and in action */}
      <section className="bg-ivory px-6 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">The founders</p>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Meet the people behind the line</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('story')}
              className="text-sm text-charcoal underline underline-offset-4 hover:text-rose"
            >
              About us
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {FOUNDERS.map(founder => (
              <button
                key={founder.name}
                type="button"
                onClick={() => onNavigate('story')}
                className="text-left"
              >
                <div className="aspect-[3/4] bg-stone overflow-hidden mb-3">
                  <img src={founder.image} alt={founder.alt} className="w-full h-full object-cover object-top" />
                </div>
                <p className="text-sm font-medium text-charcoal">{founder.name}</p>
                <p className="text-xs text-charcoal/70">{founder.role}</p>
              </button>
            ))}
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
          <div className="lineup-frame aspect-[4/3] bg-ivory">
            <img
              src="/v2-collection-lineup.jpg"
              alt="Skin Protocol RX products in a calm treatment setting"
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
