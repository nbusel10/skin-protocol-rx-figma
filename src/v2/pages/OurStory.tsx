import { useEffect } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface OurStoryProps {
  onNavigate: (page: Page, productId?: string) => void
  scrollToId?: string
}

const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Co-Founder | Chemist',
    blurb: 'Formulation-driven. Decades of ingredient development. Focused on stability, delivery, and performance.',
    image: '/linda-amend-chemist-co-founder-skin-protocol-rx.jpg',
    alt: 'Linda D. Amend, MS — chemist and co-founder of Skin Protocol RX, in a branded white lab coat',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Co-Founder | Nurse Practitioner',
    blurb: 'Patient-facing insight. Translates clinical needs into product design. Focus on real-world skin response.',
    image: '/susanna-amend-np-co-founder-skin-protocol-rx.jpg',
    alt: 'Susanna Amend, NP — nurse practitioner and co-founder of Skin Protocol RX, in a branded white lab coat',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Co-Founder | Licensed Medical Esthetician',
    blurb: 'Hands-on skin expertise. Refines formulations through treatment experience. Focus on texture, tolerance, and results.',
    image: '/christina-corbin-lme-co-founder-skin-protocol-rx.jpg',
    alt: 'Christina Corbin, LME — licensed medical esthetician and co-founder of Skin Protocol RX',
  },
]

const WHAT_YOU_FIND = [
  'Clinically relevant active ingredients',
  'Intentional concentrations',
  'Balanced, skin-supportive formulas',
  'Multi-functional ingredients selected with purpose',
  'Formulation decisions grounded in long-term skin health',
]

const WHAT_YOU_WONT_FIND = [
  'Overloaded ingredient lists',
  'Redundant actives',
  'Trend-driven formulation',
  'Unnecessary fillers',
  'Fragrance added without purpose',
]

const STANDARDS = [
  {
    title: 'Expert-Led',
    body: 'Every formula is shaped by a chemist, nurse practitioner, and licensed medical esthetician.',
  },
  {
    title: 'Focused formulas',
    body: 'We keep ingredients that support function, tolerance, and consistency over time.',
  },
  {
    title: 'Less, Done Properly',
    body: 'We do not believe more products, more steps, or more actives automatically lead to better skin.',
  },
]

const CLINICAL_PHILOSOPHY = [
  'Skin is a biological system, not a trend.',
  'Precision outperforms excess.',
  'Long-term skin health matters more than short-term stimulation.',
  'Every ingredient must earn its place.',
]

const PHILOSOPHY_SECTIONS = [
  {
    title: 'Why Skin Protocol RX Was Created',
    body: 'The brand was born from a simple frustration: too many skincare products, too little clarity. A family that had spent years in the professional skincare world decided to build something different — a line where every product has a purpose, every formula has a reason, and every step makes sense.',
  },
  {
    title: 'Treatment-room quality, at home',
    body: 'The same care you would expect in a spa, written as a short routine you can follow on an ordinary morning.',
  },
  {
    title: 'Our Ingredient Philosophy',
    body: 'We start with the goal — what the skin needs — and work backward. We do not add ingredients for marketing appeal or trend cycles. If an ingredient is in our formula, it has a documented role in supporting skin health.',
  },
  {
    title: 'Our Commitment to Cruelty-Free Skincare',
    body: 'Skin Protocol RX products are never tested on animals. We believe effective skincare does not require that compromise. Our commitment to cruelty-free practices is not a marketing claim — it is a standard we hold without exception.',
  },
  {
    title: 'Why we call it a routine',
    body: 'Skincare works better as a sequence than as a pile of products. Each step has a reason, and you can stop when your skin has what it needs.',
  },
  {
    title: 'Supporting Healthy Skin at Home and in the Treatment Room',
    body: 'When a client leaves a spa after a professional treatment, the results do not have to stop there. Skin Protocol RX gives spa professionals a coordinated home-care line that supports their work and keeps clients connected to their skincare goals between visits.',
  },
]

export default function OurStory({ onNavigate, scrollToId }: OurStoryProps) {
  useEffect(() => {
    if (!scrollToId) return
    const el = document.getElementById(scrollToId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [scrollToId])

  return (
    <div className="bg-ivory font-sans">
      <section className="bg-ivory">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[60vh] py-16">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Our story</p>
            <h1 className="font-serif text-4xl md:text-6xl text-charcoal">
              A family line, made for real skin
            </h1>
            <p className="text-base text-charcoal/85 leading-relaxed mt-6 max-w-lg">
              Skin Protocol RX started with three people who already worked with skin: a chemist, a nurse practitioner, and a licensed medical esthetician.
            </p>
          </div>
          <div className="aspect-[4/3] bg-stone overflow-hidden">
            <img
              src="/family-owned-skin-protocol-rx-founders-skincare-lab-new-york.png"
              alt="The Skin Protocol RX founders working together in the lab"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-stone">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 text-center">
          <p className="font-serif text-xl md:text-2xl text-charcoal leading-relaxed mb-6">
            Healthy skin should not need a crowded shelf.
          </p>
          <p className="text-base text-charcoal/85 leading-relaxed">
            We built a short line. Each formula has a job. The Natural Prescription is the idea we come back to: clinical clarity, with the warmth of someone guiding you through it.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-soft" />

      {/* Split editorial */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">The Foundation</p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">Family-owned, and hands-on</h2>
          <p className="text-base text-charcoal/85 leading-relaxed mb-5">
            This is not a faceless brand. A family built it from the work they already do: formulation, clinical care, and treatment-room experience.
          </p>
          <p className="text-base text-charcoal/85 leading-relaxed mb-8">
            The formulas follow that work. Fewer steps. Ingredients that earn a place. A routine you can explain out loud.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-3 text-sm font-medium text-charcoal group"
          >
            <span className="border-b border-black pb-0.5 group-hover:text-rose group-hover:border-rose transition-colors">Explore the Collection</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform group-hover:text-rose">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="aspect-[3/2] bg-stone overflow-hidden">
          <img
            src="/our-story-foundation-lab.jpg"
            alt="Three people in Skin Protocol RX coats formulating together at a shared lab bench"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-stone py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">The Founders</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-5">
              Built by people who treat skin.
            </h2>
            <p className="font-serif text-xl text-charcoal/80 mb-3">Three disciplines. One line.</p>
            <p className="text-[11px] tracking-[0.22em] uppercase text-charcoal/70">
              Chemist · Nurse Practitioner · Esthetician
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {FOUNDERS.map(founder => (
              <article key={founder.name}>
                <div className="aspect-[4/5] bg-ivory overflow-hidden mb-6">
                  <img
                    src={founder.image}
                    alt={founder.alt}
                    title={`${founder.name} — ${founder.role.replace('|', '·')}, Skin Protocol RX`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">{founder.name}</h3>
                <p className="text-[11px] tracking-[0.2em] uppercase text-rose mb-3">{founder.role}</p>
                <p className="text-charcoal/80 leading-relaxed text-sm">{founder.blurb}</p>
              </article>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-16 pt-12 border-t border-gray-soft">
            <p className="text-charcoal/85 leading-relaxed text-base">
              Formulation, treatment, and skin physiology sit at the same table. The result is a shorter line, not a louder one.
            </p>
          </div>
        </div>
      </section>

      {/* Our Standards — formulation doctrine from The Facts */}
      <section
        id="our-standards"
        className="bg-stone border-t border-gray-soft py-20 px-5 md:px-8 scroll-mt-[7rem] md:scroll-mt-[8.5rem] lg:scroll-mt-[9rem]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-16 pb-16 border-b border-gray-soft">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Standards</p>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-5">
                What matters. What doesn&apos;t.
              </h2>
              <p className="text-black/55 leading-relaxed">
                Skin Protocol RX is built on disciplined formulation, clinical perspective, and intentional restraint.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-black mb-5">Included</p>
                <ul className="space-y-3">
                  {WHAT_YOU_FIND.map(item => (
                    <li key={item} className="text-sm text-black/70 leading-relaxed flex gap-3">
                      <span className="text-rose shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-black/35 mb-5">Left Out</p>
                <ul className="space-y-3">
                  {WHAT_YOU_WONT_FIND.map(item => (
                    <li key={item} className="text-sm text-black/40 leading-relaxed flex gap-3">
                      <span className="shrink-0">−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-gray-soft mb-16">
            {STANDARDS.map((s, i) => (
              <div key={s.title} className="py-6 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0">
                <p className="text-[11px] tracking-[0.25em] uppercase text-rose mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-xl text-black mb-3">{s.title}</h3>
                <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-soft pt-10">
            <p className="font-serif text-xl md:text-2xl text-black mb-6">
              Minimal formulas. Maximum performance.
            </p>
            <p className="text-sm text-black/45 leading-relaxed max-w-2xl">
              {CLINICAL_PHILOSOPHY.join(' ')}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy sections */}
      <section className="bg-white border-t border-gray-soft py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-12 text-center">Our Values</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PHILOSOPHY_SECTIONS.map(s => (
              <div key={s.title} className="border-l-2 border-rose pl-8">
                <h3 className="font-serif text-xl text-black mb-4">{s.title}</h3>
                <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-5 md:px-8 bg-ivory">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl text-charcoal italic mb-6">
            &ldquo;Your skin doesn&apos;t need more. It needs what works.&rdquo;
          </p>
          <p className="text-rose text-sm tracking-[0.18em] uppercase">The Natural Prescription</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-8 text-center bg-stone border-t border-gray-soft">
        <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Start Your Protocol</p>
        <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">Ready to Build a Better Routine?</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('protocol')}
            className="btn-primary"
          >
            Build My Routine
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="btn-secondary"
          >
            Explore the Collection
          </button>
        </div>
      </section>
    </div>
  )
}
