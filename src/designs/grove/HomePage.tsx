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

const BENCH = ['clarifying-cleanser', 'rosewater-niacinamide-toner', 'hyaluronic-acid-serum', 'rich-barrier-cream', 'the-holy-grail']

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
  const bottles = pickProducts(BENCH)
  const [concern, setConcern] = useState('dry-skin')
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES
  const activeConcern = SKIN_CONCERNS.find(item => item.id === concern) ?? SKIN_CONCERNS[0]

  return (
    <article className="overflow-hidden bg-[#F3EEE4] text-[#243026]">
      <section className="relative px-5 pb-8 pt-4 md:px-8">
        <div className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#D7E0CC]" />
        <div className="pointer-events-none absolute -right-8 top-28 h-44 w-44 rounded-full bg-[#E7D7C3]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-center text-[12px] tracking-[0.24em] uppercase text-[#3E5236]">Family laboratory · New York</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-center font-display text-[clamp(3rem,6.4vw,5.6rem)] italic leading-[0.98]">
            Where the leaf meets the formula.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xl leading-relaxed text-[#243026] md:text-2xl">
            Science guided by nature, and a family who would rather leave an ingredient out. Skin Protocol RX gives skin what it needs — and nothing it does not.
          </p>
        </div>
        <div className="relative mx-auto mt-12 grid max-w-5xl items-center gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-0">
          <img
            src="/designs/grove/hero.jpg"
            alt="Skin Protocol RX bottles with olive leaves in soft daylight"
            className="lab-blob h-[26rem] w-full object-cover md:h-[32rem]"
          />
          <div className="rounded-[2rem] bg-[#243026] p-7 text-[#F3EEE4] shadow-[0_18px_40px_rgba(36,48,38,0.12)] md:-ml-10 md:p-9">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C9D3BE]">At the bench</p>
            <p className="mt-3 font-display text-3xl italic leading-snug md:text-4xl">A chemist. A nurse practitioner. An esthetician.</p>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Linda builds the formula. Susanna watches how skin actually responds. Christina will not keep a texture a client will not use after the appointment. The routine that came out of that bench is short: cleanse, one serum, moisturize, morning SPF.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => onNavigate('shop')} className="rounded-full bg-[#E7EFE0] px-5 py-3 text-sm text-[#243026]">
                Walk the bench
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('grove-match')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border border-[#C9D3BE] px-5 py-3 text-sm text-[#F3EEE4]"
              >
                Find your protocol
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="grove-philosophy" className="scroll-mt-28 mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-20">
        <img
          src="/original/founders-lab.jpg"
          alt="The founders working with black and white bottles on a cream marble table"
          className="h-80 w-full rounded-[2rem] object-cover md:h-[28rem]"
        />
        <div>
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#3E5236]">What stays in the beaker</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.6rem] bg-[#E7EFE0] p-5">
              <h3 className="font-display text-3xl italic">Kept</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                {KEPT.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-[1.6rem] bg-[#243026] p-5 text-[#F3EEE4]">
              <h3 className="font-display text-3xl italic">Left out</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/75">
                {LEFT_OUT.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="grove-bench" className="scroll-mt-28 px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto flex max-w-5xl items-end justify-between gap-4">
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#3E5236]">A short shelf</p>
            <h2 className="mt-1 font-display text-4xl italic md:text-5xl">From the bench</h2>
          </div>
          <button type="button" onClick={() => onNavigate('shop')} className="border-b border-[#243026] py-2 text-sm hover:text-[#3E5236]">
            Shop all
          </button>
        </div>
        <p className="mx-auto mt-3 max-w-5xl text-base leading-relaxed text-[#3E4A38]">Five formulas from the bench. A place to begin, not a shelf you have to finish.</p>
        <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {bottles.map((product, index) => {
            const lead = index === 0
            return (
              <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className={`group text-left ${lead ? 'sm:col-span-2' : ''}`}>
                <span
                  className={`flex items-center justify-center bg-[#E7EFE0] transition-colors group-hover:bg-[#D7E0CC] ${lead ? 'h-72' : 'h-56'}`}
                  style={{ borderRadius: lead ? '58% 42% 62% 38% / 46% 54% 42% 58%' : `${46 + index * 4}% ${54 - index * 3}% ${48 + index}% ${52 - index}% / 55% 45% 58% 42%` }}
                >
                  <img src={product.image} alt={product.name} className={`object-contain transition-transform duration-500 motion-safe:group-hover:scale-105 ${lead ? 'h-56' : 'h-40'}`} />
                </span>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[#3E5236]">{stepLabel(product.protocolStep)}</p>
                <h3 className={`mt-1 font-display italic leading-tight ${lead ? 'text-3xl' : 'text-2xl'}`}>{product.name}</h3>
                <p className="mt-1 text-base">${product.price}</p>
                <p className="mt-1 text-sm leading-snug text-[#3E4A38]">{product.tagline}</p>
              </button>
            )
          })}
        </div>
      </section>

      <section id="grove-protocol" className="scroll-mt-28 px-5 pb-6 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#E7EFE0] px-5 py-10 md:px-10 md:py-12">
          <h2 className="font-display text-4xl italic md:text-5xl">A day, drawn simply.</h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed">
            Choose one cleanser and one moisturizer. Add a serum for the concern in front of you. Eye care and oil are optional. Finish the morning with sunscreen you already trust.
          </p>
          <ol className="mt-8 space-y-2">
            {PROTOCOL_STEPS.map(step => {
              const mark = STEP_MARK[step.step]
              const quiet = mark === 'Optional' || mark === 'If you want it'
              const body = (
                <span className="flex w-full items-center gap-4">
                  <span className={`w-8 shrink-0 font-display italic ${quiet ? 'text-2xl text-[#7A8A6E]' : 'text-4xl text-[#243026]'}`}>{step.step}</span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className={`block ${quiet ? 'text-base' : 'text-lg'}`}>{step.name}</span>
                    <span className="block text-sm text-[#3E4A38]">{step.description}</span>
                    <span className={`mt-1 block text-[11px] tracking-[0.14em] uppercase ${quiet ? 'text-[#7A8A6E]' : 'text-[#3E5236]'}`}>{mark}</span>
                  </span>
                </span>
              )
              const shell = quiet ? 'bg-[#F3EEE4]/70' : 'bg-[#F7F3EA]'
              if (step.productBacked === false) {
                return <li key={step.step} className={`rounded-2xl px-4 py-3 ${shell}`}>{body}</li>
              }
              return (
                <li key={step.step}>
                  <button type="button" onClick={() => onNavigate('shop')} className={`w-full rounded-2xl px-4 py-3 text-left transition-colors hover:bg-white ${shell}`}>
                    {body}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="grove-match" className="scroll-mt-28 mx-4 my-8 rounded-[2.5rem] bg-[#E7D7C3] px-5 py-12 md:mx-8 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#3E5236]">One concern</p>
            <h2 className="mt-2 font-display text-4xl italic leading-tight md:text-5xl">Name it. We will point to one formula.</h2>
            <div className="mt-6 flex flex-col items-start gap-1">
              {SKIN_CONCERNS.map(item => {
                const selected = item.id === concern
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setConcern(item.id)}
                    className={`min-h-11 py-1 text-left font-display text-2xl italic leading-tight ${selected ? 'text-[#243026] underline decoration-[#3E5236] underline-offset-4' : 'text-[#243026]/75 hover:text-[#243026]'}`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid items-center gap-6 rounded-[2rem] bg-[#F7F3EA] p-6 sm:grid-cols-[14rem_1fr] md:p-8">
            <button type="button" onClick={() => onNavigate('product', focus.id)} aria-label={focus.name} className="rounded-full bg-[#E7EFE0] px-4 py-8">
              <img src={focus.image} alt="" className="mx-auto h-64 object-contain md:h-72" />
            </button>
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-[#3E5236]">{stepLabel(focus.protocolStep)}</p>
              <h3 className="mt-1 font-display text-3xl italic leading-tight">{focus.name}</h3>
              <p className="mt-2 text-xl">${focus.price}</p>
              <p className="text-sm text-[#5C6556]">{focus.size}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#3E4A38]">{activeConcern.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={() => onNavigate('product', focus.id)} className="rounded-full bg-[#243026] px-5 py-3 text-sm text-[#F3EEE4]">
                  Open this formula
                </button>
                <button type="button" onClick={() => onNavigate('shop')} className="rounded-full border border-[#243026] px-5 py-3 text-sm">
                  Shop all
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="grove-founders" className="scroll-mt-28 mx-4 mt-8 rounded-[2.5rem] bg-[#243026] px-5 py-14 text-[#F3EEE4] md:mx-8 md:px-12 md:py-16">
        <p className="text-center text-[11px] tracking-[0.22em] uppercase text-[#C9D3BE]">Three disciplines</p>
        <h2 className="mt-3 text-center font-display text-4xl italic md:text-5xl">The people at the bench</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {FOUNDERS.map(founder => (
            <figure key={founder.name} className="text-center">
              <img src={founder.image} alt={founder.alt} className="mx-auto h-52 w-52 rounded-full object-cover ring-4 ring-[#3E5236] md:h-56 md:w-56" />
              <figcaption className="mx-auto mt-6 max-w-xs">
                <p className="font-display text-2xl italic leading-tight">{founder.name}</p>
                <p className="mt-2 text-[11px] tracking-[0.14em] uppercase text-[#C9D3BE]">{founder.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{founder.blurb}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="grove-spas" className="scroll-mt-28 mx-4 my-6 grid items-stretch overflow-hidden rounded-[2.5rem] bg-[#243026] text-[#F3EEE4] md:mx-8 md:grid-cols-2">
        <img src="/designs/grove/routine.jpg" alt="A quiet skincare ritual in warm daylight" className="h-80 w-full object-cover md:h-full md:min-h-[28rem]" />
        <div className="flex flex-col justify-center px-6 py-12 md:px-10">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#C9D3BE]">For spas</p>
          <h2 className="mt-3 font-display text-4xl italic leading-tight md:text-5xl">The treatment continues at home.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
            Give clients a short line they can keep between visits. Professional care, written so a person can follow it without a crowded shelf.
          </p>
          <button type="button" onClick={() => onNavigate('shop')} className="mt-8 self-start rounded-full bg-[#E7EFE0] px-6 py-3 text-sm text-[#243026]">
            Explore the studio line
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl italic md:text-5xl">Heard in the room</h2>
          <div className="flex gap-2 rounded-full bg-[#E7E1D0] p-1 text-sm">
            <button type="button" onClick={() => setVoices('clients')} className={`rounded-full px-4 py-2 ${voices === 'clients' ? 'bg-[#243026] text-[#F6F3EA]' : ''}`}>
              Clients
            </button>
            <button type="button" onClick={() => setVoices('studios')} className={`rounded-full px-4 py-2 ${voices === 'studios' ? 'bg-[#243026] text-[#F6F3EA]' : ''}`}>
              Studios
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {notes.map(note => (
            <blockquote key={note.name} className="flex min-h-64 flex-col rounded-[1.8rem] bg-white p-6 shadow-[0_10px_30px_rgba(36,48,38,0.05)]">
              <p className="font-display text-5xl italic leading-none text-[#3E5236]" aria-hidden="true">&ldquo;</p>
              <p className="mt-3 flex-1 font-display text-xl italic leading-snug">&ldquo;{note.text}&rdquo;</p>
              <footer className="mt-6 border-t border-[#E7E1D0] pt-3 text-sm text-[#5C6556]">{note.name} · {note.place}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </article>
  )
}
