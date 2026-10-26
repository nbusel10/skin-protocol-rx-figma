import { useState } from 'react'
import { PROTOCOL_STEPS, SKIN_CONCERNS } from '../../data'
import {
  CLIENT_NOTES,
  STUDIO_NOTES,
  focusProduct,
  pickProducts,
  stepLabel,
  type DesignNavigate,
} from '../shared'
import ProtocolOverviewSection from '../ProtocolOverviewSection'

interface HomePageProps {
  onNavigate: DesignNavigate
}

const ESSENTIALS = [
  'clarifying-cleanser',
  'rosewater-niacinamide-toner',
  'hyaluronic-acid-serum',
  'rich-barrier-cream',
]

const ESSENTIAL_NOTE = ['Daily essential', 'Optional care', 'Optional care', 'Daily essential']

const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Co-Founder · Chemist',
    blurb: 'Formulation-driven. Decades of ingredient development. Focused on stability, delivery, and performance.',
    image: '/designs/clear/founder-linda.jpg',
    alt: 'Linda D. Amend, MS — chemist and co-founder of Skin Protocol RX, in a branded white lab coat',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Co-Founder · Nurse Practitioner',
    blurb: 'Patient-facing insight. Translates clinical needs into product design. Focus on real-world skin response.',
    image: '/original/founder-susanna.jpg',
    alt: 'Susanna Amend, NP — nurse practitioner and co-founder of Skin Protocol RX, in a branded white lab coat',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Co-Founder · Licensed Medical Esthetician',
    blurb: 'Hands-on skin expertise. Refines formulations through treatment experience. Focus on texture, tolerance, and results.',
    image: '/original/founder-christina.jpg',
    alt: 'Christina Corbin, LME — licensed medical esthetician and co-founder of Skin Protocol RX',
  },
]

const wrap = 'mx-auto w-[min(1120px,calc(100%-2.75rem))] md:w-[min(1120px,calc(100%-5.5rem))]'

export default function HomePage({ onNavigate }: HomePageProps) {
  const essentials = pickProducts(ESSENTIALS)
  const [concern, setConcern] = useState('dry-skin')
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES
  const activeConcern = SKIN_CONCERNS.find(item => item.id === concern) ?? SKIN_CONCERNS[0]

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <section id="feature" className="scroll-mt-28 bg-[#FFFDFA] py-10 md:py-14">
        <div className="grid min-[681px]:min-h-[clamp(320px,36vw,520px)] min-[681px]:grid-cols-[48%_52%]">
          <div className="flex flex-col justify-center px-6 py-6 min-[681px]:py-8 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]">
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Skincare with intention</p>
            <h1 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
              Your Skin Doesn&apos;t Need More. <em className="italic text-[#ab8584]">It Needs What Works.</em>
            </h1>
            <p className="mb-4 max-w-[540px] text-[15px] leading-relaxed text-[#595750]">
              Each formula is constructed for performance — using only what the skin needs to function, repair, and improve. Formulated with proven actives chosen for performance, not trends. Thoughtfully selected ingredients and formulas, bringing professional skincare into your everyday routine. Every formulation is created with one goal: effective, evidence-driven skincare that supports long-term skin function. Just thoughtful formulas, professional insight, and a routine that feels right for you.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex min-h-12 items-center gap-4 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white hover:bg-[#4A4942]">
                Explore the collection <span aria-hidden="true">↗</span>
              </button>
              <button type="button" onClick={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex min-h-12 items-center gap-4 border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#252520] hover:text-white">
                Build your protocol <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-[#EEE8DD] via-[#D5CABE] to-[#FAF8F3]">
            <div className="pointer-events-none absolute -top-[10%] right-[8%] h-[125%] w-[62%] rounded-t-[200px] border-[32px] border-white/50" />
            <div className="absolute inset-[8%] overflow-hidden">
              <img
                src="/original/shop-hero.jpg"
                alt="Skin Protocol RX bottles and jars on cream stone"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="absolute bottom-8 left-8 max-w-[250px] bg-[#252520] px-5 py-4 font-serif text-xl italic leading-snug text-white">
              Science guided by nature.
            </p>
          </div>
        </div>
      </section>

      <section id="philosophy" className="scroll-mt-28 bg-[#252520] py-16 text-[#FFFDFA] md:py-[75px]">
        <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16`}>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Our philosophy</p>
            <h2 className="mt-3 mb-7 font-serif text-[clamp(2.25rem,3.5vw,3.4rem)] leading-[1.1] tracking-[-0.044em]">
              Everything your skin needs.
              <br />
              <em className="text-[#ab8584]">Nothing it doesn&apos;t.</em>
            </h2>
            <p className="text-sm leading-relaxed text-[#CAC5BB]">
              We formulate with thoughtfully selected actives and botanical ingredients, each chosen for a reason—to support healthy, resilient skin. Every product has a clear role in a simplified, effective routine. Our focus is on high-quality formulas and useful product education, without chasing trends or adding unnecessary extras.
            </p>
            <div className="mt-7 grid grid-cols-1 border-t border-white/20 min-[701px]:grid-cols-3">
              {[
                { href: '/our-story#our-standards', label: 'Our Standards', body: 'How we decide what stays and what stays out.' },
                { href: '/ingredient-glossary', label: 'Ingredient Glossary', body: 'See what is in the formulas and why.' },
                { href: '/product-education', label: 'Product Education', body: 'Learn what each product is good for.' },
              ].map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center justify-between gap-2.5 border-b border-white/20 py-[18px] text-left min-[701px]:border-b-0 min-[701px]:border-l min-[701px]:px-3 min-[701px]:py-5 min-[701px]:first:border-l-0 min-[701px]:first:pl-0 min-[701px]:last:pr-0 ${i === 2 ? 'border-b-0' : ''}`}
                >
                  <span>
                    <span className="relative inline-block whitespace-nowrap text-sm font-semibold text-[#F7F1E8] transition-colors group-hover:text-[#B99C77] after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-[#B99C77] after:transition-[width] after:duration-300 group-hover:after:w-full">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-[#CAC5BB]">{item.body}</span>
                  </span>
                  <span className="shrink-0 text-[#F7F1E8] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#B99C77]" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-7">
            {[
              ['✳', 'Thoughtfully selected', 'Purposeful formulations. A protocol with purpose.'],
              ['◌', 'Tried and true', 'Supported by research and evidence-based information.'],
              ['✧', 'Results without hype', 'Backed by research. No unnecessary extras.'],
              ['+', 'Clinical intention', 'Where clinical intention meets natural intelligence.'],
              ['♡', 'Never tested on animals', 'A standard we hold, not a badge.'],
              ['◎', 'Expert founded', 'Chemist · Nurse Practitioner · Esthetician'],
            ].map(([symbol, title, body], i, arr) => (
              <div
                key={title}
                className={`flex items-center gap-5 border-t border-white/20 py-6 ${i >= arr.length - 2 ? 'border-b border-white/20' : ''}`}
              >
                <span className="shrink-0 font-serif text-[30px] leading-none text-[#ab8584]" aria-hidden="true">{symbol}</span>
                <div>
                  <p className="font-serif text-[22px] leading-tight text-[#F7F1E8]">{title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#CAC5BB]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProtocolOverviewSection
        tone="editorial"
        onCta={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <div className="border-y border-[#D6CEC3] bg-[#EDE8DF]">
        <div className={`${wrap} grid md:grid-cols-3`}>
          {[
            ['01', 'What it is', 'Purposeful skincare for daily routines, made with professional expertise.'],
            ['02', 'What is different', 'Three complementary disciplines. One carefully considered line.'],
            ['03', 'Why trust it', 'Family-owned, hands-on, and grounded in the work of real skin professionals.'],
          ].map(([n, title, body]) => (
            <div key={n} className="border-[#C9BFB3] py-5 md:border-r md:px-6 md:py-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <p className="font-serif text-[17px] italic text-[#9E8060]">{n}</p>
              <h2 className="mt-1 font-serif text-[22px]">{title}</h2>
              <p className="mt-1 max-w-[300px] text-xs leading-relaxed text-[#66615A]">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <section id="story" className="scroll-mt-28 py-16 md:py-[90px]">
        <div className={`${wrap} grid items-start gap-8 lg:grid-cols-[32%_1fr] lg:gap-11`}>
          <div className="lg:pt-4">
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">The family behind the formulas</p>
            <h2 className="mt-3 font-serif text-[clamp(2.125rem,3.2vw,3.25rem)] leading-[1.12] tracking-[-0.044em]">
              Three perspectives.
              <br />
              <em>One purpose.</em>
            </h2>
            <p className="mt-5 max-w-[330px] text-sm leading-relaxed text-[#5B574F]">
              A chemist, a nurse practitioner, and a licensed medical esthetician bring three perspectives to one practical idea: skincare should make sense.
            </p>
            <p className="mt-3 max-w-[330px] text-sm leading-relaxed text-[#5B574F]">
              From formulation to treatment room to daily routine, every product has a purpose.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {FOUNDERS.map(founder => (
              <figure key={founder.name}>
                <img src={founder.image} alt={founder.alt} className="aspect-[3/4] w-full object-cover object-[center_22%]" />
                <figcaption>
                  <h3 className="mt-3 font-serif text-sm leading-tight sm:text-[17px]">{founder.name}</h3>
                  <p className="mt-0.5 min-h-[2.8rem] text-[10px] font-semibold leading-snug tracking-[0.1em] uppercase text-[#9E8060]">{founder.role}</p>
                  <p className="mt-2 hidden text-xs leading-relaxed text-[#6D6A63] sm:block">{founder.blurb}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="scroll-mt-28 bg-[#EEEAE2] py-16 md:py-[90px]">
        <div className={wrap}>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">The collection</p>
              <h2 className="mt-1.5 font-serif text-[clamp(2rem,3.2vw,3.05rem)] leading-[1.12] tracking-[-0.044em]">A good place to start.</h2>
              <p className="mt-3 max-w-[390px] text-sm text-[#6D6A63]">Cleanse and moisturize every day. Add targeted care only when your skin calls for it.</p>
            </div>
            <button type="button" onClick={() => onNavigate('shop')} className="border-b border-[#252520] pb-1 text-[11px] font-semibold tracking-[0.12em] uppercase hover:text-[#9E8060]">
              Shop all products ↗
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-[18px]">
            {essentials.map((product, index) => (
              <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="group text-left">
                <span className="flex aspect-[1/1.03] items-center justify-center bg-[#FFFDFA]">
                  <img src={product.image} alt="" className="h-[90%] w-[90%] object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
                </span>
                <span className="mt-3 block border-t border-[#BDB5AA] pt-3.5">
                  <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#9E8060]">{String(index + 1).padStart(2, '0')} · {PROTOCOL_STEPS.find(step => step.step === product.protocolStep)?.name}</span>
                  <span className="mt-1 block min-h-[2.7rem] font-serif text-[19px] leading-tight group-hover:text-[#9E8060]">{product.name}</span>
                  <span className="mt-1 block text-[13px]">${product.price} · {ESSENTIAL_NOTE[index]}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="protocol" className="scroll-mt-28 bg-[#EDE8DF] py-16 md:py-[90px]">
        <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[39%_1fr] lg:gap-[60px]`}>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Find your formula</p>
            <h2 className="mt-2 font-serif text-[clamp(2.25rem,3.3vw,3.2rem)] leading-[1.12] tracking-[-0.044em]">
              You do not need <em>every bottle.</em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#6D6A63]">
              Start with what matters to your skin. Explore a concern and discover a formula that may fit your routine.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Skin concerns">
              {SKIN_CONCERNS.map(item => {
                const selected = item.id === concern
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setConcern(item.id)}
                    className={`min-h-10 border px-3 py-2 text-xs ${selected ? 'border-[#252520] bg-[#252520] text-white' : 'border-[#BFB6A9] bg-transparent hover:border-[#252520] hover:bg-[#252520] hover:text-white'}`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid min-h-[290px] grid-cols-[40%_1fr] border border-[#E1D9CD] bg-[#FFFDFA] sm:grid-cols-[45%_1fr]">
            <button type="button" onClick={() => onNavigate('product', focus.id)} aria-label={focus.name} className="flex items-center justify-center bg-[#E3DFD5]">
              <img src={focus.image} alt="" className="h-[90%] w-[90%] object-contain" />
            </button>
            <div className="flex flex-col justify-center px-4 py-5 sm:px-6">
              <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">{stepLabel(focus.protocolStep)}</p>
              <h3 className="mt-1 font-serif text-[21px] leading-tight sm:text-[26px]">{focus.name}</h3>
              <p className="mt-2 text-sm">${focus.price} · {focus.size}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#6D6A63]">{activeConcern.description}</p>
              <button type="button" onClick={() => onNavigate('product', focus.id)} className="mt-4 self-start border-b border-[#252520] pb-1 text-[11px] font-semibold tracking-[0.12em] uppercase hover:text-[#9E8060]">
                Explore formula ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="studios" className="scroll-mt-28 grid bg-[#252520] text-white lg:min-h-[440px] lg:grid-cols-2">
        <img src="/original/spa-hero.jpg" alt="Skin Protocol RX bottles beside a cream treatment bed" className="h-[300px] w-full object-cover lg:h-auto lg:min-h-[440px]" />
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-[clamp(2.5rem,8vw,7.8rem)]">
          <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">For professionals</p>
          <h2 className="mt-2 max-w-md font-serif text-[clamp(2.125rem,3.2vw,3.05rem)] leading-[1.12] tracking-[-0.044em]">
            A home routine your clients <em>will keep.</em>
          </h2>
          <p className="mt-4 max-w-[390px] text-sm leading-relaxed text-[#DED8CF]">
            Give clients a thoughtful, coordinated line they can continue using between visits. Professional formulas, simple routines, and a story worth sharing.
          </p>
          <button type="button" onClick={() => onNavigate('shop')} className="mt-5 self-start border-b border-white pb-1 text-[11px] font-semibold tracking-[0.12em] uppercase hover:text-[#E4C7B8]">
            See the professional line ↗
          </button>
        </div>
      </section>

      <section className="bg-[#FFFDFA] py-16 md:py-[90px]">
        <div className={wrap}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Real perspectives</p>
              <h2 className="mt-1.5 font-serif text-[clamp(2rem,3.2vw,3.05rem)] leading-[1.12] tracking-[-0.044em]">In their words.</h2>
            </div>
            <div className="flex gap-5 text-[11px] font-semibold tracking-[0.12em] uppercase">
              <button type="button" onClick={() => setVoices('clients')} className={voices === 'clients' ? 'border-b border-[#252520] pb-1' : 'pb-1 text-[#6D6A63] hover:text-[#252520]'}>
                Clients
              </button>
              <button type="button" onClick={() => setVoices('studios')} className={voices === 'studios' ? 'border-b border-[#252520] pb-1' : 'pb-1 text-[#6D6A63] hover:text-[#252520]'}>
                Studios
              </button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {notes.map(note => (
              <blockquote key={note.name} className="border-t border-[#D6CEC3] pt-5">
                <p className="font-serif text-[21px] italic leading-snug">&ldquo;{note.text}&rdquo;</p>
                <footer className="mt-5 text-[11px] text-[#6D6A63]">{note.name} · {note.place}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
