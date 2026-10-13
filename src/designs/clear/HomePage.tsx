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

interface HomePageProps {
  onNavigate: DesignNavigate
}

const SPREAD = [
  'hyaluronic-acid-serum',
  'brighten-glow-c-20',
  'rich-barrier-cream',
  'the-holy-grail',
  'clarifying-cleanser',
]

const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Co-Founder · Chemist',
    blurb: 'Formulation-driven. Decades of ingredient development. Focused on stability, delivery, and performance.',
    image: '/original/founder-linda.jpg',
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

const KEPT = [
  'Clinically relevant active ingredients',
  'Intentional concentrations',
  'Balanced, skin-supportive formulas',
  'Multi-functional ingredients selected with purpose',
  'Formulation decisions grounded in long-term skin health',
]

const LEFT_OUT = [
  'Overloaded ingredient lists',
  'Redundant actives',
  'Trend-driven formulation',
  'Unnecessary fillers',
  'Fragrance added without purpose',
]

const STEP_MARK: Record<number, string> = {
  1: 'Essential',
  2: 'If you want it',
  3: 'For the concern',
  4: 'Optional',
  5: 'Essential',
  6: 'Optional',
  7: 'Morning',
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const bottles = pickProducts(SPREAD)
  const [concern, setConcern] = useState(SKIN_CONCERNS[7].id)
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES
  const activeConcern = SKIN_CONCERNS.find(item => item.id === concern) ?? SKIN_CONCERNS[0]
  const lead = bottles[0]
  const rest = bottles.slice(1)

  return (
    <article className="bg-[#F7F4EF] text-[#1A1916]">
      <section id="feature" className="grid scroll-mt-40 lg:grid-cols-12 lg:min-h-[86vh]">
        <div className="flex flex-col justify-end px-5 pb-12 pt-10 md:px-10 lg:col-span-7 lg:pb-20 lg:pt-14">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#6E3B32]">Skin Protocol RX · New York</p>
          <h1 className="mt-8 max-w-4xl font-serif text-[clamp(3.2rem,7.4vw,6.6rem)] leading-[0.88] tracking-tight">
            Give the skin
            <br />
            exactly what
            <br />
            <em>it needs.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-[#3C3832]">
            And nothing it does not. Skin Protocol RX is a New York family line: a chemist, a nurse practitioner, and a licensed medical esthetician. One job per bottle. A short routine. Never tested on animals.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="bg-[#1A1916] px-7 py-3.5 text-[13px] tracking-[0.16em] uppercase text-[#F7F4EF] hover:bg-[#6E3B32]"
            >
              Shop the collection
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-b-2 border-[#1A1916] pb-1 font-serif text-xl italic hover:border-[#6E3B32] hover:text-[#6E3B32]"
            >
              Build your protocol
            </button>
          </div>
        </div>
        <figure className="relative min-h-[46vh] lg:col-span-5 lg:min-h-full">
          <img
            src="/original/shop-hero.jpg"
            alt="Skin Protocol RX bottles and jars on cream stone"
            className="h-full min-h-[46vh] w-full object-cover lg:absolute lg:inset-0"
          />
          <figcaption className="absolute bottom-6 left-5 max-w-[16rem] bg-[#1A1916] px-4 py-3 text-[#F7F4EF] md:left-8 lg:-left-8">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#E4C7B8]">Skin Protocol RX</p>
            <p className="mt-1 font-serif text-lg leading-snug">The collection, arranged the way a day actually goes.</p>
          </figcaption>
        </figure>
      </section>

      <section className="grid border-y border-[#1A1916] md:grid-cols-3">
        {[
          ['01', 'What it is', 'Professional formulas with a natural point of view. Clear enough to explain. Calm enough to keep.'],
          ['02', 'What is different', 'Each product has one job. Ingredients stay because they earn a place, not because a trend asked.'],
          ['03', 'Why trust it', 'Linda formulates. Susanna watches how skin responds. Christina tests what a client will actually use at home.'],
        ].map(([n, title, body]) => (
          <div key={n} className="border-[#1A1916] px-5 py-8 md:border-r md:px-8 md:py-10 md:last:border-r-0">
            <p className="font-serif text-3xl text-[#6E3B32]">{n}</p>
            <h2 className="mt-3 font-serif text-2xl">{title}</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#3C3832]">{body}</p>
          </div>
        ))}
      </section>

      <section className="grid items-start gap-12 px-5 py-16 md:px-10 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-5 lg:pt-4">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#6E3B32]">The feature</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.02] md:text-6xl">
            Three disciplines.
            <br />
            One bench.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#3C3832]">
            <span className="float-left pr-3 font-serif text-7xl leading-[0.75]">A</span>
            family built this line because healthy skin should not need a crowded shelf. The chemist keeps the formula honest. The nurse practitioner brings back what she sees on real skin. The esthetician will not keep a product a client will not finish.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#3C3832]">
            Born in New York. The mission stayed small on purpose: the products your skin needs, and nothing it does not.
          </p>
        </div>
        <div className="grid grid-cols-3 items-end gap-3 sm:gap-5 lg:col-span-7">
          {FOUNDERS.map((founder, index) => (
            <figure key={founder.name} className={index === 1 ? 'mb-8 md:mb-12' : ''}>
              <img src={founder.image} alt={founder.alt} className="aspect-[3/4] w-full object-cover" />
              <figcaption className="mt-3 border-t border-[#1A1916] pt-3">
                <p className="font-serif text-base leading-tight sm:text-xl">{founder.name}</p>
                <p className="mt-1 text-xs leading-snug tracking-[0.12em] uppercase text-[#6E3B32]">{founder.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">{founder.blurb}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="collection" className="scroll-mt-40 px-5 py-16 md:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#6E3B32]">The collection</p>
            <h2 className="mt-2 font-serif text-5xl md:text-6xl">The edit</h2>
          </div>
          <button type="button" onClick={() => onNavigate('shop')} className="border-b-2 border-[#1A1916] py-2 text-[13px] tracking-[0.16em] uppercase hover:border-[#6E3B32] hover:text-[#6E3B32]">
            Shop all products
          </button>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <button type="button" onClick={() => onNavigate('product', lead.id)} className="group text-left lg:col-span-5">
            <span className="block bg-[#EFEAE2] px-6 py-10">
              <img src={lead.image} alt={lead.name} className="mx-auto h-80 object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.03] md:h-96" />
            </span>
            <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-[#6E3B32]">{stepLabel(lead.protocolStep)}</p>
            <h3 className="mt-2 font-serif text-4xl leading-tight group-hover:text-[#6E3B32]">{lead.name}</h3>
            <p className="mt-2 text-sm text-[#3C3832]">{lead.tagline}</p>
            <p className="mt-3 font-serif text-2xl">${lead.price} <span className="font-sans text-sm text-[#5C574E]">{lead.size}</span></p>
          </button>
          <div className="grid content-start gap-10 sm:grid-cols-2 lg:col-span-7">
            {rest.map(product => (
              <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="group border-t border-[#1A1916] pt-4 text-left">
                <img src={product.image} alt={product.name} className="h-60 object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.03] md:h-64" />
                <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-[#6E3B32]">{stepLabel(product.protocolStep)}</p>
                <h3 className="mt-1 font-serif text-2xl leading-tight group-hover:text-[#6E3B32]">{product.name}</h3>
                <p className="mt-1 text-sm text-[#3C3832]">{product.tagline}</p>
                <p className="mt-2 font-serif text-xl">${product.price}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#1A1916]">
        <div className="grid md:grid-cols-2">
          <div className="px-5 py-12 md:px-10 md:py-16">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#6E3B32]">In the formula</p>
            <h2 className="mt-3 font-serif text-5xl md:text-6xl">Kept</h2>
            <ol className="mt-8">
              {KEPT.map((item, index) => (
                <li key={item} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-t border-[#1A1916] py-4">
                  <span className="font-serif text-lg text-[#6E3B32]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-2xl leading-snug">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-[#1A1916] px-5 py-12 text-[#F7F4EF] md:px-10 md:py-16">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#E4C7B8]">Not in the formula</p>
            <h2 className="mt-3 font-serif text-5xl italic md:text-6xl">Left out</h2>
            <ol className="mt-8">
              {LEFT_OUT.map((item, index) => (
                <li key={item} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-t border-white/25 py-4">
                  <span className="font-serif text-lg text-[#E4C7B8]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-2xl italic leading-snug text-white/80">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="protocol" className="scroll-mt-40 bg-[#EFEAE2] px-5 py-16 md:px-10 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#6E3B32]">Build your protocol</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] md:text-6xl">You do not need every bottle.</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#3C3832] lg:col-span-6 lg:justify-self-end">
            Cleanse. One serum for the concern you actually have. Moisturize. Morning sunscreen. Eye care and a facial oil only if you want them.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 border-t border-[#1A1916] pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p id="editorial-concern-label" className="text-[11px] tracking-[0.22em] uppercase text-[#6E3B32]">
              Start with a concern
            </p>
            <div aria-labelledby="editorial-concern-label" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {SKIN_CONCERNS.map(item => {
                const selected = item.id === concern
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setConcern(item.id)}
                    className={`inline-flex min-h-11 items-center font-serif text-2xl leading-tight md:text-3xl ${selected ? 'italic text-[#6E3B32] underline decoration-[#6E3B32] underline-offset-[6px]' : 'text-[#1A1916] hover:text-[#6E3B32]'}`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid items-center gap-6 sm:grid-cols-[14rem_1fr]">
            <button type="button" onClick={() => onNavigate('product', focus.id)} aria-label={focus.name} className="bg-[#F7F4EF] px-4 py-8">
              <img src={focus.image} alt={focus.name} className="mx-auto h-64 object-contain sm:h-72" />
            </button>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#6E3B32]">{stepLabel(focus.protocolStep)}</p>
              <h3 className="mt-2 font-serif text-4xl leading-[1.05]">{focus.name}</h3>
              <p className="mt-3 font-serif text-3xl">${focus.price}</p>
              <p className="mt-1 text-sm text-[#5C574E]">{focus.size}</p>
              <p className="mt-4 text-base leading-relaxed text-[#3C3832]">{focus.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">{activeConcern.description}</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('product', focus.id)}
                  className="bg-[#1A1916] px-5 py-3 text-[12px] tracking-[0.16em] uppercase text-[#F7F4EF] hover:bg-[#6E3B32]"
                >
                  Read the formula
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="border-b border-[#1A1916] pb-0.5 text-[12px] tracking-[0.16em] uppercase hover:border-[#6E3B32] hover:text-[#6E3B32]"
                >
                  Shop the full line
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-serif text-4xl">The day, in order</h3>
            <p className="max-w-sm text-sm leading-relaxed text-[#3C3832]">
              Four marks carry the day. Tone, eye care, and a facial oil stay optional, for the days you want them.
            </p>
          </div>
          <ol className="mt-6 border-t border-[#1A1916]">
            {PROTOCOL_STEPS.map(step => {
              const mark = STEP_MARK[step.step]
              const quiet = mark === 'Optional' || mark === 'If you want it'
              const row = (
                <>
                  <span className={`font-serif ${quiet ? 'text-2xl text-[#6E3B32]' : 'text-4xl text-[#6E3B32]'}`}>
                    {String(step.step).padStart(2, '0')}
                  </span>
                  <span>
                    <span className={`block font-serif leading-tight ${quiet ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>{step.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#3C3832]">{step.description}</span>
                  </span>
                  <span className={`text-[11px] tracking-[0.16em] uppercase ${quiet ? 'text-[#8A847A]' : 'text-[#6E3B32]'}`}>{mark}</span>
                </>
              )
              if (step.productBacked === false) {
                return (
                  <li key={step.step} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-[#C9C1B4] py-5 sm:grid-cols-[4.5rem_1fr_auto]">
                    {row}
                  </li>
                )
              }
              return (
                <li key={step.step} className="border-b border-[#C9C1B4]">
                  <button
                    type="button"
                    onClick={() => onNavigate('shop')}
                    className="grid w-full grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 text-left hover:bg-[#F7F4EF] sm:grid-cols-[4.5rem_1fr_auto]"
                  >
                    {row}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="concerns" className="scroll-mt-40 border-t border-[#1A1916] px-5 py-16 md:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#6E3B32]">An index</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight md:text-6xl">Shop by concern</h2>
          <p className="mt-4 text-base leading-relaxed text-[#3C3832]">Pick the focus. The line stays short.</p>
        </div>
        <div className="mt-10 grid gap-x-16 md:grid-cols-2">
          {SKIN_CONCERNS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate('product', focusProduct(item.id).id)}
              className="group min-h-16 border-b border-[#D9D2C6] py-6 text-left"
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-[11px] tracking-[0.18em] text-[#6E3B32]">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[11px] tracking-[0.16em] uppercase text-[#6E3B32]">Open</span>
              </span>
              <span className="mt-2 block font-serif text-3xl leading-tight transition-colors group-hover:text-[#6E3B32] md:text-4xl">{item.label}</span>
              <span className="mt-2 block max-w-md text-sm leading-relaxed text-[#3C3832]">{item.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="studios" className="scroll-mt-40 grid lg:grid-cols-12">
        <img
          src="/original/spa-hero.jpg"
          alt="Skin Protocol RX bottles beside a cream treatment bed"
          className="h-[28rem] w-full object-cover lg:col-span-7 lg:h-auto lg:min-h-[36rem]"
        />
        <div className="flex flex-col justify-center bg-[#1A1916] px-6 py-14 text-[#F7F4EF] md:px-10 lg:col-span-5 lg:py-20">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#E4C7B8]">For studios</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">A home routine your clients will keep.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
            Recommend a short, coordinated line between visits. The same formulas, explained in plain language, so the work in the treatment room does not stop at the door.
          </p>
          <button type="button" onClick={() => onNavigate('shop')} className="mt-8 self-start border-b border-[#E4C7B8] pb-1 text-[13px] tracking-[0.16em] uppercase text-[#E4C7B8] hover:text-white">
            See the professional line
          </button>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-5xl">In their words</h2>
          <div className="flex gap-6 text-[13px] tracking-[0.16em] uppercase">
            <button type="button" onClick={() => setVoices('clients')} className={voices === 'clients' ? 'border-b-2 border-[#1A1916] pb-1' : 'pb-1 text-[#5C574E] hover:text-[#1A1916]'}>
              Clients
            </button>
            <button type="button" onClick={() => setVoices('studios')} className={voices === 'studios' ? 'border-b-2 border-[#1A1916] pb-1' : 'pb-1 text-[#5C574E] hover:text-[#1A1916]'}>
              Spa professionals
            </button>
          </div>
        </div>
        <div className="mt-14 grid gap-16 lg:grid-cols-3 lg:gap-12">
          {notes.map(note => (
            <blockquote key={note.name}>
              <p className="font-serif text-5xl leading-none text-[#6E3B32]" aria-hidden="true">&ldquo;</p>
              <p className="mt-4 font-serif text-2xl leading-snug md:text-[1.7rem]">&ldquo;{note.text}&rdquo;</p>
              <footer className="mt-6 border-t border-[#1A1916] pt-4 text-sm">
                {note.name}
                <span className="text-[#5C574E]"> — {note.place}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </article>
  )
}
