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

const BENCH = ['clarifying-cleanser', 'rosewater-niacinamide-toner', 'hyaluronic-acid-serum', 'rich-barrier-cream', 'the-holy-grail']

export default function HomePage({ onNavigate }: HomePageProps) {
  const bottles = pickProducts(BENCH)
  const [concern, setConcern] = useState('dry-skin')
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES

  return (
    <article className="overflow-hidden bg-[#F3EEE4] text-[#243026]">
      <section className="relative px-5 pb-16 pt-6 md:px-8">
        <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#D7E0CC]" />
        <div className="pointer-events-none absolute -right-10 top-24 h-40 w-40 rounded-full bg-[#E7D7C3]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm tracking-[0.22em] uppercase text-[#3E5236]">Family laboratory · New York</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.4rem)] italic leading-[1.02]">
            Where the leaf meets the formula.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#3E4A38]">
            Science guided by nature, and a family who would rather leave an ingredient out. Skin Protocol RX gives skin what it needs — and nothing it does not.
          </p>
        </div>
        <div className="relative mx-auto mt-10 grid max-w-5xl items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <img
            src="/designs/grove/hero.jpg"
            alt="Olive branches and cream stone in soft daylight"
            className="lab-blob h-[28rem] w-full object-cover"
          />
          <div className="rounded-[2rem] bg-[#E7EFE0] p-6 md:p-8">
            <p className="font-display text-3xl italic leading-snug">A chemist. A nurse practitioner. An esthetician.</p>
            <p className="mt-4 leading-relaxed text-[#3E4A38]">
              Linda builds the formula. Susanna watches how skin actually responds. Christina will not keep a texture a client will not use after the appointment. The routine that came out of that bench is short: cleanse, one serum, moisturize, morning SPF.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => onNavigate('shop')} className="rounded-full bg-[#3E5236] px-5 py-3 text-sm text-[#F6F3EA]">
                Walk the bench
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('grove-protocol')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border border-[#3E5236] px-5 py-3 text-sm"
              >
                Find your protocol
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 rounded-[2.5rem] bg-[#2A3328] px-5 py-12 text-[#F3EEE4] md:mx-8 md:px-10">
        <h2 className="text-center font-display text-4xl italic">The people at the bench</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FOUNDERS.map(founder => (
            <figure key={founder.name} className="text-center">
              <img src={founder.image} alt={founder.alt} className="mx-auto h-44 w-44 rounded-full object-cover" />
              <figcaption className="mt-4">
                <p className="font-display text-2xl italic">{founder.name}</p>
                <p className="mt-1 text-sm text-[#C9D3BE]">{founder.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{founder.blurb}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
        <img
          src="/original/founders-lab.jpg"
          alt="The founders working with black and white bottles on a cream marble table"
          className="h-80 w-full rounded-[2rem] object-cover"
        />
        <div>
          <p className="text-sm tracking-[0.18em] uppercase text-[#3E5236]">What stays in the beaker</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl italic">Kept</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                {KEPT.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl italic">Left out</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5C6556]">
                {LEFT_OUT.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="grove-protocol" className="scroll-mt-28 px-5 pb-8 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#E7EFE0] px-5 py-10 md:px-10">
          <h2 className="font-display text-4xl italic md:text-5xl">A day, drawn simply.</h2>
          <p className="mt-3 max-w-xl leading-relaxed">
            Choose one cleanser and one moisturizer. Add a serum for the concern in front of you. Eye care and oil are optional. Finish the morning with sunscreen you already trust.
          </p>
          <ol className="mt-8 space-y-3">
            {PROTOCOL_STEPS.map(step => {
              const body = (
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-3xl italic text-[#3E5236]">{step.step}</span>
                  <span>
                    <span className="block text-lg">{step.name}</span>
                    <span className="block text-sm text-[#3E4A38]">{step.description}</span>
                  </span>
                </span>
              )
              if (step.productBacked === false) {
                return <li key={step.step} className="rounded-full bg-[#F3EEE4] px-5 py-3">{body}</li>
              }
              return (
                <li key={step.step}>
                  <button type="button" onClick={() => onNavigate('shop')} className="w-full rounded-full bg-[#F3EEE4] px-5 py-3 text-left hover:bg-white">
                    {body}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <h2 className="font-display text-4xl italic">Name the concern. We will point to one formula.</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {SKIN_CONCERNS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setConcern(item.id)}
              className={`rounded-full px-4 py-2 text-sm ${concern === item.id ? 'bg-[#3E5236] text-[#F6F3EA]' : 'bg-[#E7E1D0]'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-6 rounded-[2rem] bg-white/70 p-6 sm:flex-row">
          <img src={focus.image} alt="" className="h-40 object-contain" />
          <div className="text-center sm:text-left">
            <p className="text-sm text-[#3E5236]">{stepLabel(focus.protocolStep)}</p>
            <h3 className="font-display text-3xl italic">{focus.name}</h3>
            <p className="mt-1">{focus.tagline} · ${focus.price}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#3E4A38]">{SKIN_CONCERNS.find(item => item.id === concern)?.description}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <button type="button" onClick={() => onNavigate('product', focus.id)} className="rounded-full bg-[#243026] px-4 py-2 text-sm text-[#F3EEE4]">
                Open this formula
              </button>
              <button type="button" onClick={() => onNavigate('shop')} className="rounded-full border border-[#243026] px-4 py-2 text-sm">
                Shop by concern
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-5xl items-end justify-between gap-4">
          <h2 className="font-display text-4xl italic">From the bench</h2>
          <button type="button" onClick={() => onNavigate('shop')} className="text-sm underline underline-offset-4">
            The whole collection
          </button>
        </div>
        <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {bottles.map(product => (
            <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="rounded-[1.6rem] bg-[#E7EFE0] p-4 text-left">
              <img src={product.image} alt="" className="mx-auto h-36 object-contain" />
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#3E5236]">{stepLabel(product.protocolStep)}</p>
              <h3 className="mt-1 font-display text-xl italic leading-tight">{product.name}</h3>
              <p className="mt-1 text-sm">${product.price}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-4 my-8 grid items-center gap-8 overflow-hidden rounded-[2.5rem] bg-[#E7D7C3] md:mx-8 md:grid-cols-2">
        <img src="/designs/grove/routine.jpg" alt="A quiet skincare ritual in warm daylight" className="h-80 w-full object-cover md:h-full" />
        <div className="px-6 py-10 md:pr-10">
          <p className="text-sm tracking-[0.18em] uppercase text-[#3E5236]">For spas</p>
          <h2 className="mt-3 font-display text-4xl italic leading-tight">The treatment continues at home.</h2>
          <p className="mt-4 leading-relaxed">
            Give clients a short line they can keep between visits. Professional care, written so a person can follow it without a crowded shelf.
          </p>
          <button type="button" onClick={() => onNavigate('shop')} className="mt-6 rounded-full bg-[#3E5236] px-5 py-3 text-sm text-[#F6F3EA]">
            Explore the studio line
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-4xl italic">Heard in the room</h2>
          <div className="flex rounded-full bg-[#E7E1D0] p-1 text-sm">
            <button type="button" onClick={() => setVoices('clients')} className={`rounded-full px-4 py-2 ${voices === 'clients' ? 'bg-[#3E5236] text-[#F6F3EA]' : ''}`}>
              Clients
            </button>
            <button type="button" onClick={() => setVoices('studios')} className={`rounded-full px-4 py-2 ${voices === 'studios' ? 'bg-[#3E5236] text-[#F6F3EA]' : ''}`}>
              Studios
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {notes.map(note => (
            <blockquote key={note.name} className="rounded-[1.8rem] bg-white/80 p-5">
              <p className="font-display text-xl italic leading-snug">&ldquo;{note.text}&rdquo;</p>
              <footer className="mt-4 text-sm text-[#5C6556]">{note.name} · {note.place}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </article>
  )
}
