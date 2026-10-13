import { useEffect, useState } from 'react'
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

const CHAPTERS = [
  { id: 'room-open', label: 'Open' },
  { id: 'room-line', label: 'Line' },
  { id: 'room-match', label: 'Build' },
  { id: 'room-protocol', label: 'Marks' },
  { id: 'room-family', label: 'Family' },
  { id: 'room-studio', label: 'Studio' },
]

const LINE = ['clarifying-cleanser', 'hyaluronic-acid-serum', 'rich-barrier-cream', 'the-holy-grail']

const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Chemist',
    blurb: 'Formulation-driven. Decades of ingredient development. Focused on stability, delivery, and performance.',
    image: '/original/founder-linda.jpg',
    alt: 'Linda D. Amend, MS, chemist and co-founder of Skin Protocol RX',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Nurse Practitioner',
    blurb: 'Patient-facing insight. Translates clinical needs into product design. Focus on real-world skin response.',
    image: '/original/founder-susanna.jpg',
    alt: 'Susanna Amend, NP, nurse practitioner and co-founder of Skin Protocol RX',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Licensed Medical Esthetician',
    blurb: 'Hands-on skin expertise. Refines formulations through treatment experience. Focus on texture, tolerance, and results.',
    image: '/original/founder-christina.jpg',
    alt: 'Christina Corbin, LME, licensed medical esthetician and co-founder of Skin Protocol RX',
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
  const bottles = pickProducts(LINE)
  const heroBottle = pickProducts(['hyaluronic-acid-serum'])[0]
  const [concern, setConcern] = useState('brightening')
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const [chapter, setChapter] = useState(CHAPTERS[0].id)
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES
  const [leadNote, ...restNotes] = notes
  const activeConcern = SKIN_CONCERNS.find(item => item.id === concern) ?? SKIN_CONCERNS[0]

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const nodes = CHAPTERS.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const id = visible[0]?.target.id
      if (id) setChapter(id)
    }, { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.45, 0.7] })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <article className="bg-[#0C0C0B] text-[#E8E2D6]">
      <div className="lg:pl-[8.5rem]">
        <aside className="fixed top-[4.25rem] bottom-0 left-0 z-20 hidden w-[8.5rem] border-r border-white/10 bg-[#0C0C0B] lg:block">
          <nav className="flex h-full flex-col justify-between px-4 py-8" aria-label="Chapters">
            {CHAPTERS.map((item, index) => {
              const current = chapter === item.id
              return (
                <button key={item.id} type="button" onClick={() => go(item.id)} aria-current={current ? 'true' : undefined} className="text-left">
                  <span className={`block font-display text-3xl leading-none ${current ? 'text-[#C4B49A]' : 'text-[#B7B1A6]'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`mt-1 block text-[11px] tracking-[0.16em] uppercase ${current ? 'text-[#E8E2D6]' : 'text-[#C8C2B6]'}`}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        <div>
          <section id="room-open" className="scroll-mt-28 bg-[#0C0C0B]">
            <nav className="flex gap-4 overflow-x-auto border-b border-white/10 px-4 py-3 lg:hidden" aria-label="Chapters">
              {CHAPTERS.map((item, index) => {
                const current = chapter === item.id
                return (
                  <button key={item.id} type="button" onClick={() => go(item.id)} aria-current={current ? 'true' : undefined} className="shrink-0 text-left">
                    <span className={`font-display text-lg leading-none ${current ? 'text-[#C4B49A]' : 'text-[#B7B1A6]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`ml-2 text-[11px] tracking-[0.14em] uppercase ${current ? 'text-[#E8E2D6]' : 'text-[#C8C2B6]'}`}>
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </nav>

            <div className="grid lg:min-h-[calc(100vh-4.25rem)] lg:grid-cols-12">
              <div className="relative z-10 order-2 -mt-12 flex flex-col justify-center bg-[#0C0C0B] px-5 py-10 lg:order-1 lg:col-span-5 lg:mt-0 lg:px-10 lg:py-12 xl:px-14">
                <p className="text-[11px] tracking-[0.38em] uppercase text-[#C4B49A]">New York · Family laboratory</p>
                <h1 className="mt-5 font-display text-[clamp(4rem,8vw,6.6rem)] leading-[0.82]">
                  Less.
                  <br />
                  done
                  <br />
                  properly.
                </h1>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-[#D5D0C6]">
                  A chemist, a nurse practitioner, and a licensed medical esthetician. Science with a short list. Give the skin what it needs, and leave the rest out.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <button type="button" onClick={() => onNavigate('shop')} className="bg-[#C4B49A] px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase text-[#161513]">
                    Shop the line
                  </button>
                  <button type="button" onClick={() => go('room-match')} className="border border-[#C4B49A] px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase text-[#C4B49A]">
                    Build your protocol
                  </button>
                </div>
              </div>

              <div className="relative order-1 flex min-h-[58vh] items-center bg-[#0C0C0B] lg:order-2 lg:col-span-7 lg:min-h-full">
                <img
                  src="/designs/night/hero.jpg"
                  alt="Skin Protocol RX bottles in a dark evening still life"
                  className="h-full max-h-[58vh] w-full object-contain lg:max-h-[calc(100vh-4.25rem)]"
                />
                {heroBottle && (
                  <button
                    type="button"
                    onClick={() => onNavigate('product', heroBottle.id)}
                    aria-label={`${heroBottle.name}, $${heroBottle.price}`}
                    className="absolute bottom-4 left-4 z-20 w-36 border border-[#C4B49A] bg-[#EDE6D8] p-3 text-left text-[#161513] shadow-[8px_8px_0_rgba(12,12,11,0.45)] sm:w-44 lg:bottom-8 lg:left-8"
                  >
                    <img src={heroBottle.image} alt="" className="h-28 w-full object-contain" />
                    <p className="mt-2 text-[10px] tracking-[0.16em] uppercase">{stepLabel(heroBottle.protocolStep)}</p>
                    <p className="mt-1 font-display text-lg leading-tight">{heroBottle.name}</p>
                    <p className="mt-1 text-sm">${heroBottle.price}</p>
                  </button>
                )}
              </div>
            </div>
          </section>

          <section id="room-line" className="scroll-mt-28 bg-[#EDE6D8] px-5 py-16 text-[#161513] md:px-12 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.38em] uppercase text-[#7A6240]">Chapter 02 — The line</p>
                <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">Four to begin.</h2>
              </div>
              <button type="button" onClick={() => onNavigate('shop')} className="border-b border-[#161513] px-1 py-2 text-[12px] tracking-[0.18em] uppercase">
                Shop all
              </button>
            </div>
            <div className="mt-10 grid gap-px bg-[#C4B49A] lg:grid-cols-2">
              {bottles.map((product, index) => {
                const lead = index === 0
                const dark = index % 2 === 1
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onNavigate('product', product.id)}
                    className={`group p-6 text-left md:p-8 ${lead ? 'lg:row-span-3' : ''} ${dark ? 'bg-[#12110F] text-[#EDE6D8]' : 'bg-[#EDE6D8] text-[#161513]'}`}
                  >
                    <img
                      src={product.image}
                      alt=""
                      className={`w-full object-contain transition duration-500 motion-safe:group-hover:scale-[1.04] ${lead ? 'h-72 md:h-96' : 'h-52 md:h-64'}`}
                    />
                    <div className="mt-6 flex items-end justify-between gap-4 border-t border-current/15 pt-4">
                      <div>
                        <p className={`text-[11px] tracking-[0.18em] uppercase ${dark ? 'text-[#C4B49A]' : 'text-[#7A6240]'}`}>{stepLabel(product.protocolStep)}</p>
                        <h3 className={`mt-2 font-display leading-tight ${lead ? 'text-4xl' : 'text-3xl'}`}>{product.name}</h3>
                      </div>
                      <p className="font-display text-2xl">${product.price}</p>
                    </div>
                    <p className="mt-4 text-[11px] tracking-[0.18em] uppercase">View formula</p>
                  </button>
                )
              })}
            </div>
          </section>

          <section id="room-match" className="scroll-mt-28 bg-[#E7E0D2] px-5 py-16 text-[#161513] md:px-12 md:py-24">
            <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-[11px] tracking-[0.38em] uppercase text-[#7A6240]">Chapter 03 — Build your protocol</p>
                <h2 className="mt-4 font-display text-5xl leading-[0.92] md:text-6xl">Name the concern. Meet one formula.</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#3C3832]">
                  Choose what is in front of you. We point to a single formula in the line — a place to start, not a diagnosis.
                </p>
                <div className="mt-8 grid border border-[#161513]/15 sm:grid-cols-2" role="group" aria-label="Skin concerns">
                  {SKIN_CONCERNS.map(item => {
                    const pressed = concern === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={pressed}
                        onClick={() => setConcern(item.id)}
                        className={`min-h-12 border-b border-r border-[#161513]/10 px-4 py-4 text-left transition-colors ${pressed ? 'bg-[#161513] text-[#EDE6D8]' : 'bg-transparent hover:bg-[#F4EFE6]'}`}
                      >
                        <span className="block font-display text-xl leading-tight">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="border border-[#C4B49A] bg-[#0C0C0B] p-6 text-[#E8E2D6] md:p-8">
                <button type="button" onClick={() => onNavigate('product', focus.id)} aria-label={focus.name} className="block w-full">
                  <img src={focus.image} alt="" className="mx-auto h-72 object-contain md:h-96" />
                </button>
                <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-[#C4B49A]">{stepLabel(focus.protocolStep)}</p>
                <p className="mt-2 text-sm text-[#C4B49A]">{activeConcern.label}</p>
                <h3 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{focus.name}</h3>
                <div className="mt-4 flex items-baseline gap-4">
                  <p className="font-display text-3xl">${focus.price}</p>
                  <p className="text-sm text-[#C8C2B6]">{focus.size}</p>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#C8C2B6]">{focus.tagline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => onNavigate('product', focus.id)} className="bg-[#C4B49A] px-5 py-3 text-[11px] tracking-[0.18em] uppercase text-[#161513]">
                    View the formula
                  </button>
                  <button type="button" onClick={() => onNavigate('shop')} className="border border-[#C4B49A] px-5 py-3 text-[11px] tracking-[0.18em] uppercase text-[#C4B49A]">
                    Shop the line
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="room-protocol" className="scroll-mt-28 bg-[#0C0C0B] px-5 py-16 md:px-12 md:py-24">
            <p className="text-[11px] tracking-[0.38em] uppercase text-[#C4B49A]">Chapter 04 — The marks</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.92] md:text-6xl">Seven marks. Most days you need four.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#C8C2B6]">
              Cleanse, one serum for the concern, moisturize, and morning SPF. Tone, eye care, and oil are there if you want them. You do not need every bottle.
            </p>
            <ol className="mt-12 grid gap-px bg-[#C4B49A]/35 md:grid-cols-2 xl:grid-cols-7">
              {PROTOCOL_STEPS.map(step => {
                const morning = step.step === 7
                const quiet = step.step === 2 || step.step === 4 || step.step === 6
                const shell = morning
                  ? 'bg-[#C4B49A] text-[#161513]'
                  : quiet
                    ? 'bg-[#12110F] text-[#C8C2B6]'
                    : 'bg-[#EDE6D8] text-[#161513]'
                const body = (
                  <span className="flex h-full min-h-56 flex-col p-5 text-left">
                    <span className="font-display text-5xl leading-none">{String(step.step).padStart(2, '0')}</span>
                    <span className={`mt-5 text-[10px] tracking-[0.2em] uppercase ${morning ? 'text-[#3C3428]' : quiet ? 'text-[#C4B49A]' : 'text-[#7A6240]'}`}>
                      {STEP_MARK[step.step]}
                    </span>
                    <span className="mt-2 font-display text-3xl leading-none">{step.name}</span>
                    <span className={`mt-3 text-sm leading-relaxed ${quiet ? 'text-[#A7A29A]' : 'text-[#3C3832]'}`}>{step.description}</span>
                    <span className="mt-auto pt-6 text-[11px] tracking-[0.16em] uppercase">
                      {morning ? 'Your own SPF 30+' : `${step.products.length} ${step.products.length === 1 ? 'formula' : 'formulas'}`}
                    </span>
                  </span>
                )
                if (step.productBacked === false) {
                  return <li key={step.step} className={shell}>{body}</li>
                }
                return (
                  <li key={step.step} className={shell}>
                    <button type="button" onClick={() => onNavigate('shop')} className="h-full w-full transition-colors hover:bg-white/10">
                      {body}
                    </button>
                  </li>
                )
              })}
            </ol>
          </section>

          <section id="room-family" className="scroll-mt-28 bg-[#E7E0D2] text-[#161513]">
            <div className="px-5 py-14 md:px-12 md:py-20">
              <p className="text-[11px] tracking-[0.38em] uppercase text-[#7A6240]">Chapter 05 — The family</p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">Three people. One standard.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3C3832]">
                A chemist builds the formula. A nurse practitioner watches how skin responds. A licensed medical esthetician keeps only what a client will still use at home.
              </p>
            </div>
            <div className="grid gap-px bg-[#161513] md:grid-cols-3">
              {FOUNDERS.map(founder => (
                <figure key={founder.name} className="bg-[#EDE6D8]">
                  <img src={founder.image} alt={founder.alt} className="aspect-[3/4] w-full object-cover" />
                  <figcaption className="px-5 py-6 md:px-6 md:py-8">
                    <p className="font-display text-3xl leading-tight">{founder.name}</p>
                    <p className="mt-2 text-[11px] tracking-[0.18em] uppercase text-[#7A6240]">Co-Founder · {founder.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#3C3832]">{founder.blurb}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-2">
            <div className="bg-[#EDE6D8] px-5 py-14 text-[#161513] md:px-12 md:py-20">
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#7A6240]">Kept</p>
              <ul className="mt-8 space-y-5">
                {KEPT.map(item => (
                  <li key={item} className="border-t border-[#161513]/15 pt-4 font-display text-2xl leading-snug md:text-3xl">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-[#161513] px-5 py-14 text-[#E8E2D6] md:px-12 md:py-20">
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#C4B49A]">Left out</p>
              <ul className="mt-8 space-y-5">
                {LEFT_OUT.map(item => (
                  <li key={item} className="border-t border-[#C4B49A]/30 pt-4 font-display text-2xl italic leading-snug text-[#B7B1A6] md:text-3xl">{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="room-studio" className="scroll-mt-28 relative bg-[#0C0C0B]">
            <img
              src="/designs/night/routine.jpg"
              alt="An evening skincare ritual"
              className="h-[68vh] w-full object-cover"
            />
            <div className="relative z-10 mx-5 -mt-36 mb-14 max-w-xl border border-[#C4B49A] bg-[#EDE6D8] px-6 py-8 text-[#161513] md:mx-12 md:-mt-48 md:px-10 md:py-12">
              <p className="text-[11px] tracking-[0.38em] uppercase text-[#7A6240]">Chapter 06 — For spas</p>
              <h2 className="mt-4 font-display text-4xl leading-[0.95] md:text-5xl">After the appointment, the protocol stays.</h2>
              <p className="mt-5 text-base leading-relaxed text-[#3C3832]">
                Offer clients the same short line they can keep at home. One cleanser, one serum for the concern, one moisturizer, and morning SPF. Professional care continues between visits, without a crowded shelf.
              </p>
              <button type="button" onClick={() => onNavigate('shop')} className="mt-8 bg-[#161513] px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase text-[#EDE6D8]">
                Explore the studio line
              </button>
            </div>
          </section>

          <section id="room-voices" className="scroll-mt-28 bg-[#E7E0D2] px-5 py-16 text-[#161513] md:px-12 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-5xl leading-none">Heard after</h2>
              <div className="flex gap-6 text-[11px] tracking-[0.18em] uppercase">
                <button type="button" onClick={() => setVoices('clients')} className={voices === 'clients' ? 'border-b border-[#161513] pb-1 text-[#161513]' : 'text-[#7A756C]'} aria-pressed={voices === 'clients'}>
                  Clients
                </button>
                <button type="button" onClick={() => setVoices('studios')} className={voices === 'studios' ? 'border-b border-[#161513] pb-1 text-[#161513]' : 'text-[#7A756C]'} aria-pressed={voices === 'studios'}>
                  Studios
                </button>
              </div>
            </div>
            {leadNote && (
              <blockquote className="mt-12 max-w-4xl border-l-2 border-[#C4B49A] pl-6 md:pl-10">
                <p className="font-display text-3xl leading-snug md:text-5xl">&ldquo;{leadNote.text}&rdquo;</p>
                <footer className="mt-6 text-[11px] tracking-[0.18em] uppercase text-[#7A6240]">{leadNote.name} · {leadNote.place}</footer>
              </blockquote>
            )}
            <div className="mt-12 grid gap-8 border-t border-[#161513]/15 pt-10 md:grid-cols-2">
              {restNotes.map(note => (
                <blockquote key={note.name}>
                  <p className="font-display text-2xl leading-snug">&ldquo;{note.text}&rdquo;</p>
                  <footer className="mt-4 text-sm text-[#5C574E]">{note.name} · {note.place}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
