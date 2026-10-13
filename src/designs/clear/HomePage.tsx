import { useState } from 'react'
import { PROTOCOL_STEPS, SKIN_CONCERNS } from '../../data'
import {
  CLIENT_NOTES,
  FOUNDERS,
  KEPT,
  LEFT_OUT,
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

export default function HomePage({ onNavigate }: HomePageProps) {
  const bottles = pickProducts(SPREAD)
  const [concern, setConcern] = useState(SKIN_CONCERNS[7].id)
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES
  const lead = bottles[0]
  const rest = bottles.slice(1)

  return (
    <article className="bg-[#F7F4EF] text-[#1A1916]">
      <section id="feature" className="grid scroll-mt-32 lg:grid-cols-12 lg:min-h-[88vh]">
        <div className="flex flex-col justify-end px-5 pb-10 pt-8 md:px-10 lg:col-span-7 lg:pb-16 lg:pt-10">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#6E3B32]">Vol. 01 — The family issue</p>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.86] tracking-tight">
            Give the skin
            <br />
            exactly what
            <br />
            <em>it needs.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-[#3C3832]">
            And nothing it does not. Skin Protocol RX is a New York family line: a chemist, a nurse practitioner, and a licensed medical esthetician. One job per bottle. A short routine. Never tested on animals.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => onNavigate('shop')} className="bg-[#1A1916] px-5 py-3 text-[11px] tracking-[0.18em] uppercase text-[#F7F4EF]">
              Shop the issue
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-[#1A1916] px-5 py-3 text-[11px] tracking-[0.18em] uppercase"
            >
              Find your protocol
            </button>
          </div>
        </div>
        <figure className="relative lg:col-span-5">
          <img
            src="/original/shop-hero.jpg"
            alt="Skin Protocol RX bottles and jars on cream stone"
            className="h-[52vh] w-full object-cover lg:h-full"
          />
          <figcaption className="absolute bottom-6 left-0 max-w-xs bg-[#1A1916] px-4 py-3 text-[#F7F4EF] lg:-left-10">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#E4C7B8]">On the cover</p>
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
          <div key={n} className="border-[#1A1916] px-5 py-8 md:border-r md:px-8 md:last:border-r-0">
            <p className="font-serif text-3xl text-[#6E3B32]">{n}</p>
            <h2 className="mt-3 font-serif text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#3C3832]">{body}</p>
          </div>
        ))}
      </section>

      <section className="grid items-start gap-10 px-5 py-16 md:px-10 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#6E3B32]">The feature</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
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
        <div className="grid grid-cols-3 items-end gap-3 lg:col-span-7">
          {FOUNDERS.map((founder, index) => (
            <figure key={founder.name} className={index === 1 ? 'mb-10' : ''}>
              <img src={founder.image} alt={founder.alt} className="aspect-[3/4] w-full object-cover" />
              <figcaption className="mt-3">
                <p className="font-serif text-lg leading-tight">{founder.name}</p>
                <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-[#6E3B32]">{founder.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-5 grid gap-px bg-[#1A1916] md:mx-10 md:grid-cols-2">
        <div className="bg-[#F7F4EF] p-6 md:p-10">
          <h2 className="font-serif text-3xl">Kept</h2>
          <ul className="mt-6 space-y-3">
            {KEPT.map(item => (
              <li key={item} className="border-b border-[#D9D2C6] pb-3 font-serif text-xl">{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-[#1A1916] p-6 text-[#F7F4EF] md:p-10">
          <h2 className="font-serif text-3xl">Left out</h2>
          <ul className="mt-6 space-y-3">
            {LEFT_OUT.map(item => (
              <li key={item} className="border-b border-white/20 pb-3 font-serif text-xl text-white/85">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="protocol" className="scroll-mt-32 px-5 py-16 md:px-10 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#6E3B32]">Build your protocol</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">You do not need every bottle.</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#3C3832]">
              Cleanse. One serum for the concern you actually have. Moisturize. Morning sunscreen. Eye care and a facial oil only if you want them.
            </p>
          </div>
          <div className="lg:col-span-7">
            <label className="text-[11px] tracking-[0.22em] uppercase text-[#6E3B32]" htmlFor="editorial-concern">
              Start with a concern
            </label>
            <select
              id="editorial-concern"
              value={concern}
              onChange={event => setConcern(event.target.value)}
              className="mt-3 w-full border border-[#1A1916] bg-transparent px-3 py-3 font-serif text-2xl"
            >
              {SKIN_CONCERNS.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-10 grid items-center gap-8 border-t border-[#1A1916] pt-8 lg:grid-cols-[16rem_1fr]">
          <button type="button" onClick={() => onNavigate('product', focus.id)} className="bg-white p-6 text-left">
            <img src={focus.image} alt="" className="mx-auto h-48 object-contain" />
          </button>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#6E3B32]">{stepLabel(focus.protocolStep)}</p>
            <h3 className="mt-2 font-serif text-4xl">{focus.name}</h3>
            <p className="mt-2 text-lg">{focus.tagline}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#3C3832]">{focus.chooseIf}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="font-serif text-2xl">${focus.price}</p>
              <button type="button" onClick={() => onNavigate('product', focus.id)} className="text-[11px] tracking-[0.18em] uppercase underline underline-offset-4">
                Read the formula
              </button>
              <button type="button" onClick={() => onNavigate('shop')} className="text-[11px] tracking-[0.18em] uppercase underline underline-offset-4">
                Shop the full line
              </button>
            </div>
          </div>
        </div>
        <ol className="mt-12 grid gap-px bg-[#D9D2C6] sm:grid-cols-2 lg:grid-cols-4">
          {PROTOCOL_STEPS.map(step => {
            const card = (
              <>
                <span className="font-serif text-3xl text-[#6E3B32]">{String(step.step).padStart(2, '0')}</span>
                <span className="mt-2 block font-serif text-2xl">{step.name}</span>
                <span className="mt-2 block text-sm leading-relaxed text-[#3C3832]">{step.description}</span>
              </>
            )
            if (step.productBacked === false) {
              return <li key={step.step} className="bg-[#F7F4EF] p-5">{card}</li>
            }
            return (
              <li key={step.step}>
                <button type="button" onClick={() => onNavigate('shop')} className="h-full w-full bg-[#F7F4EF] p-5 text-left hover:bg-white">
                  {card}
                </button>
              </li>
            )
          })}
        </ol>
      </section>

      <section id="collection" className="scroll-mt-32 bg-[#EFEAE2] px-5 py-16 md:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-5xl md:text-6xl">The edit</h2>
          <button type="button" onClick={() => onNavigate('shop')} className="text-[11px] tracking-[0.2em] uppercase underline underline-offset-4">
            View all products
          </button>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <button type="button" onClick={() => onNavigate('product', lead.id)} className="bg-[#F7F4EF] p-6 text-left lg:col-span-5">
            <img src={lead.image} alt="" className="mx-auto h-72 object-contain" />
            <p className="mt-6 text-[11px] tracking-[0.18em] uppercase text-[#6E3B32]">{stepLabel(lead.protocolStep)}</p>
            <div className="mt-2 flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-3xl">{lead.name}</h3>
              <p className="font-serif text-2xl">${lead.price}</p>
            </div>
            <p className="mt-2 text-sm text-[#3C3832]">{lead.tagline}</p>
          </button>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            {rest.map(product => (
              <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="border-t border-[#1A1916] pt-4 text-left">
                <img src={product.image} alt="" className="h-36 object-contain" />
                <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-[#6E3B32]">{stepLabel(product.protocolStep)}</p>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl leading-tight">{product.name}</h3>
                  <p>${product.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl md:text-5xl">Shop by concern</h2>
          <p className="hidden max-w-xs text-sm text-[#3C3832] md:block">An index, not a quiz with a costume. Pick the focus. The line stays short.</p>
        </div>
        <div className="mt-8 border-t border-[#1A1916]">
          {SKIN_CONCERNS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate('shop')}
              className="grid w-full grid-cols-[3rem_1fr] gap-4 border-b border-[#D9D2C6] py-4 text-left md:grid-cols-[4rem_14rem_1fr_auto]"
            >
              <span className="font-serif text-[#6E3B32]">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-serif text-2xl">{item.label}</span>
              <span className="hidden text-sm text-[#3C3832] md:block">{item.description}</span>
              <span className="hidden text-[11px] tracking-[0.16em] uppercase md:block">Shop</span>
            </button>
          ))}
        </div>
      </section>

      <section id="studios" className="scroll-mt-32 grid lg:grid-cols-12">
        <img
          src="/original/spa-hero.jpg"
          alt="Skin Protocol RX bottles beside a cream treatment bed"
          className="h-80 w-full object-cover lg:col-span-7 lg:h-auto"
        />
        <div className="flex flex-col justify-center bg-[#1A1916] px-6 py-12 text-[#F7F4EF] lg:col-span-5 lg:px-10">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#E4C7B8]">For studios</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight">A home routine your clients will keep.</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Recommend a short, coordinated line between visits. The same formulas, explained in plain language, so the work in the treatment room does not stop at the door.
          </p>
          <button type="button" onClick={() => onNavigate('shop')} className="mt-8 self-start border-b border-[#E4C7B8] pb-1 text-[11px] tracking-[0.18em] uppercase text-[#E4C7B8]">
            See the professional line
          </button>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl">From the margin</h2>
          <div className="flex gap-4 text-[11px] tracking-[0.18em] uppercase">
            <button type="button" onClick={() => setVoices('clients')} className={voices === 'clients' ? 'border-b border-[#1A1916]' : 'text-[#5C574E]'}>
              Clients
            </button>
            <button type="button" onClick={() => setVoices('studios')} className={voices === 'studios' ? 'border-b border-[#1A1916]' : 'text-[#5C574E]'}>
              Spa professionals
            </button>
          </div>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {notes.map(note => (
            <blockquote key={note.name} className="border-t border-[#1A1916] pt-5">
              <p className="font-serif text-2xl leading-snug">&ldquo;{note.text}&rdquo;</p>
              <footer className="mt-4 text-sm">
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
