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

const CHAPTERS = [
  { id: 'room-open', label: 'Open' },
  { id: 'room-family', label: 'Family' },
  { id: 'room-protocol', label: 'Protocol' },
  { id: 'room-line', label: 'Line' },
  { id: 'room-studio', label: 'Studio' },
]

const LINE = ['clarifying-cleanser', 'hyaluronic-acid-serum', 'rich-barrier-cream', 'the-holy-grail']

export default function HomePage({ onNavigate }: HomePageProps) {
  const bottles = pickProducts(LINE)
  const [concern, setConcern] = useState('brightening')
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <article className="bg-[#0C0C0B] text-[#E8E2D6]">
      <div className="lg:grid lg:grid-cols-[7.5rem_1fr]">
        <aside className="sticky top-14 z-20 hidden h-[calc(100vh-3.5rem)] border-r border-white/10 lg:block">
          <nav className="flex h-full flex-col justify-between px-4 py-8">
            {CHAPTERS.map((chapter, index) => (
              <button key={chapter.id} type="button" onClick={() => go(chapter.id)} className="text-left">
                <span className="block font-display text-2xl leading-none">{String(index + 1).padStart(2, '0')}</span>
                <span className="mt-1 block text-[10px] tracking-[0.18em] uppercase text-[#A7A79F]">{chapter.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div>
          <section id="room-open" className="flex min-h-[calc(100vh-3.5rem)] scroll-mt-14 flex-col justify-end px-5 pb-12 pt-16 md:px-12">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4B49A]">Chapter 01</p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.84]">
              Less,
              <br />
              done
              <br />
              properly.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[#C8C2B6]">
              Skin Protocol RX is a family-owned New York line. A chemist, a nurse practitioner, and a licensed medical esthetician. Give the skin what it needs. Leave the rest out. Never tested on animals.
            </p>
            <div className="mt-10 flex flex-wrap gap-6 text-[11px] tracking-[0.22em] uppercase">
              <button type="button" onClick={() => onNavigate('shop')} className="border border-[#C4B49A] px-5 py-3 text-[#C4B49A]">
                Enter the line
              </button>
              <button type="button" onClick={() => go('room-protocol')} className="border-b border-[#C4B49A] pb-1 text-[#C4B49A]">
                Find your protocol
              </button>
            </div>
          </section>

          <section className="grid min-h-[70vh] md:grid-cols-2">
            <img src="/designs/night/hero.jpg" alt="A quiet evening still life for Skin Protocol RX" className="h-80 w-full object-cover md:h-full" />
            <div className="flex flex-col justify-center px-5 py-12 md:px-12">
              <p className="font-display text-3xl italic leading-snug md:text-5xl">Everything your skin needs. Nothing it does not.</p>
              <ul className="mt-8 space-y-3 text-sm text-[#C8C2B6]">
                {KEPT.slice(0, 3).map(item => <li key={item}>Kept — {item}</li>)}
                {LEFT_OUT.slice(0, 2).map(item => <li key={item}>Left out — {item}</li>)}
              </ul>
            </div>
          </section>

          <section id="room-family" className="scroll-mt-14 border-t border-white/10 px-5 py-16 md:px-12">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4B49A]">Chapter 02 — The family</p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] md:text-6xl">Three people. One standard.</h2>
            <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
              {FOUNDERS.map(founder => (
                <figure key={founder.name} className="w-64 shrink-0">
                  <img src={founder.image} alt={founder.alt} className="h-80 w-full object-cover" />
                  <figcaption className="mt-3">
                    <p className="font-display text-2xl">{founder.name}</p>
                    <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-[#C4B49A]">{founder.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#C8C2B6]">{founder.blurb}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="room-protocol" className="scroll-mt-14 border-t border-white/10">
            <div className="px-5 py-12 md:px-12">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4B49A]">Chapter 03 — The protocol</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Seven marks. Most days you need four.</h2>
            </div>
            <ol>
              {PROTOCOL_STEPS.map(step => {
                const row = (
                  <span className="grid w-full grid-cols-[4.5rem_1fr] items-baseline gap-4 px-5 py-6 text-left md:px-12">
                    <span className="font-display text-4xl text-[#C4B49A]">{String(step.step).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-display text-3xl md:text-4xl">{step.name}</span>
                      <span className="mt-1 block text-sm text-[#A7A79F]">{step.description}</span>
                    </span>
                  </span>
                )
                if (step.productBacked === false) return <li key={step.step} className="border-t border-white/10">{row}</li>
                return (
                  <li key={step.step} className="border-t border-white/10">
                    <button type="button" onClick={() => onNavigate('shop')} className="w-full hover:bg-white/5">{row}</button>
                  </li>
                )
              })}
            </ol>
            <div className="grid gap-8 border-t border-white/10 px-5 py-12 md:grid-cols-[16rem_1fr] md:px-12">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-[#C4B49A]">Name a concern</p>
                <div className="mt-4 flex flex-col items-start gap-2">
                  {SKIN_CONCERNS.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConcern(item.id)}
                      className={`text-left text-sm ${concern === item.id ? 'text-[#C4B49A]' : 'text-[#8E8E86]'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => onNavigate('product', focus.id)} className="flex items-center gap-6 text-left">
                <img src={focus.image} alt="" className="h-40 object-contain" />
                <span>
                  <span className="block text-[11px] tracking-[0.18em] uppercase text-[#C4B49A]">{stepLabel(focus.protocolStep)}</span>
                  <span className="mt-2 block font-display text-4xl">{focus.name}</span>
                  <span className="mt-2 block text-sm text-[#C8C2B6]">{focus.tagline} · ${focus.price}</span>
                </span>
              </button>
            </div>
          </section>

          <section id="room-line" className="scroll-mt-14 border-t border-white/10 px-5 py-14 md:px-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4B49A]">Chapter 04 — The line</p>
                <h2 className="mt-3 font-display text-5xl">Four to begin.</h2>
              </div>
              <button type="button" onClick={() => onNavigate('shop')} className="text-[11px] tracking-[0.18em] uppercase text-[#C4B49A]">
                All formulas
              </button>
            </div>
            <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {bottles.map(product => (
                <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="bg-[#0C0C0B] p-5 text-left">
                  <img src={product.image} alt="" className="h-44 object-contain" />
                  <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-[#C4B49A]">{stepLabel(product.protocolStep)}</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{product.name}</h3>
                  <p className="mt-2 text-sm">${product.price}</p>
                </button>
              ))}
            </div>
          </section>

          <section id="room-studio" className="scroll-mt-14 grid min-h-[70vh] border-t border-white/10 md:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-14 md:px-12">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4B49A]">Chapter 05 — The studio</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95]">After the appointment, the protocol stays.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#C8C2B6]">
                Spas use the same short line their clients take home. Recommendations stay clear. Results have somewhere to go between visits.
              </p>
              <button type="button" onClick={() => onNavigate('shop')} className="mt-8 self-start text-[11px] tracking-[0.2em] uppercase text-[#C4B49A]">
                The studio edit
              </button>
            </div>
            <img src="/designs/night/routine.jpg" alt="An evening skincare ritual" className="h-80 w-full object-cover md:h-full" />
          </section>

          <section className="border-t border-white/10 px-5 py-14 md:px-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-4xl">Heard after</h2>
              <div className="flex gap-5 text-[11px] tracking-[0.18em] uppercase">
                <button type="button" onClick={() => setVoices('clients')} className={voices === 'clients' ? 'text-[#C4B49A]' : 'text-[#8E8E86]'}>
                  Clients
                </button>
                <button type="button" onClick={() => setVoices('studios')} className={voices === 'studios' ? 'text-[#C4B49A]' : 'text-[#8E8E86]'}>
                  Studios
                </button>
              </div>
            </div>
            <div className="mt-8">
              {notes.map(note => (
                <blockquote key={note.name} className="border-t border-white/10 py-6">
                  <p className="max-w-3xl font-display text-2xl leading-snug md:text-3xl">&ldquo;{note.text}&rdquo;</p>
                  <footer className="mt-3 text-sm text-[#A7A79F]">{note.name} — {note.place}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
