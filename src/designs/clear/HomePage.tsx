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
  2: 'Optional',
  3: 'Optional',
  4: 'Optional',
  5: 'Essential',
  6: 'Optional',
  7: 'AM · SPF',
}

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
      <section id="feature" className="scroll-mt-28 bg-[#FFFDFA]">
        <div className="grid min-[681px]:min-h-[clamp(320px,36vw,520px)] min-[681px]:grid-cols-[48%_52%]">
          <div className="flex flex-col justify-center px-6 py-8 min-[681px]:py-8 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]">
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">Considered skincare · New York</p>
            <h1 className="my-3 max-w-[650px] font-serif text-[clamp(49px,12vw,67px)] leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(52px,4.6vw,72px)]">
              Give your skin exactly what <em className="italic whitespace-nowrap">it needs.</em>
            </h1>
            <p className="mb-4 max-w-[420px] text-[15px] leading-relaxed text-[#595750]">
              And nothing it does not. Professional skincare shaped by a chemist, a nurse practitioner, and an esthetician. Purposeful formulas. A simpler routine.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex min-h-12 items-center gap-4 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white hover:bg-[#4A4942]">
                Explore the collection <span aria-hidden="true">↗</span>
              </button>
              <button type="button" onClick={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex min-h-12 items-center gap-4 border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#252520] hover:text-white">
                Find your protocol <span aria-hidden="true">↗</span>
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
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">The family behind the formulas</p>
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
              <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">The collection</p>
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

      <section className="bg-[#252520] py-16 text-[#FFFDFA] md:py-[75px]">
        <div className="mx-auto grid w-[min(940px,calc(100%-2.75rem))] gap-8 md:w-[min(940px,calc(100%-5.5rem))] md:grid-cols-2 md:gap-0">
          <div className="md:pr-9">
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">Our philosophy</p>
            <h2 className="mt-1 font-serif text-[41px] italic leading-none">Kept.</h2>
            <ul className="mt-5">
              {KEPT.map(item => (
                <li key={item} className="flex gap-4 border-b border-white/20 py-2.5 text-sm">
                  <span className="text-[#B99C77]">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-[#655F55] md:pl-9">
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">Without the unnecessary</p>
            <h2 className="mt-1 font-serif text-[41px] italic leading-none">Left out.</h2>
            <ul className="mt-5 text-[#CAC5BB]">
              {LEFT_OUT.map(item => (
                <li key={item} className="flex gap-4 border-b border-white/20 py-2.5 text-sm">
                  <span className="text-[#B99C77]">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid items-center gap-8 bg-[#FFFDFA] px-6 py-10 sm:px-8 lg:grid-cols-[280px_1fr] lg:gap-16 lg:px-[max(36px,6vw)] lg:py-16">
        <img
          src="/designs/clear/ritual-glow.jpg"
          alt="A woman with glowing skin applying cream in warm morning light"
          className="mx-auto h-auto w-full max-w-[220px] object-cover lg:mx-0 lg:max-w-none"
        />
        <div className="lg:py-2 lg:pr-[clamp(1rem,4vw,3rem)]">
          <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">The daily ritual</p>
          <h2 className="mt-3 max-w-[460px] font-serif text-[clamp(2.125rem,3.5vw,3.2rem)] leading-[1.12] tracking-[-0.044em]">
            A routine that makes <em>room for real life.</em>
          </h2>
          <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-[#6D6A63]">
            You do not need every bottle. Start with a cleanser and moisturizer; choose additional care for your skin, and finish mornings with SPF.
          </p>
          <ol className="mt-8 grid grid-cols-2 gap-x-3 sm:gap-x-6">
            {PROTOCOL_STEPS.map(step => {
              const mark = STEP_MARK[step.step]
              const row = (
                <span className="flex items-baseline gap-2.5 border-t border-[#D6CEC3] py-3">
                  <span className="font-serif text-[15px] italic text-[#9E8060]">{String(step.step).padStart(2, '0')}</span>
                  <span className="text-[13px] font-semibold">{step.name}</span>
                  <span className="ml-auto text-[10px] whitespace-nowrap text-[#6D6A63]">{mark}</span>
                </span>
              )
              if (step.productBacked === false) return <li key={step.step}>{row}</li>
              return (
                <li key={step.step}>
                  <button type="button" onClick={() => onNavigate('shop')} className="w-full text-left hover:text-[#9E8060]">
                    {row}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="protocol" className="scroll-mt-28 bg-[#EDE8DF] py-16 md:py-[90px]">
        <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[39%_1fr] lg:gap-[60px]`}>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">Find your formula</p>
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
              <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">{stepLabel(focus.protocolStep)}</p>
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

      <section id="concerns" className="scroll-mt-28 py-16 md:py-[90px]">
        <div className={wrap}>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">Explore your options</p>
              <h2 className="mt-1.5 font-serif text-[clamp(2rem,3.2vw,3.05rem)] leading-[1.12] tracking-[-0.044em]">Shop by concern.</h2>
            </div>
            <p className="max-w-[390px] text-sm text-[#6D6A63]">Find the formulas that fit the way your skin feels today.</p>
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-x-10">
            {SKIN_CONCERNS.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate('product', focusProduct(item.id).id)}
                className="group flex min-h-14 items-center justify-between gap-4 border-t border-[#D6CEC3] py-4 text-left"
              >
                <span className="font-serif text-[22px] leading-tight group-hover:italic">{item.label}</span>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#9E8060]">Explore ↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="studios" className="scroll-mt-28 grid bg-[#252520] text-white lg:min-h-[440px] lg:grid-cols-2">
        <img src="/original/spa-hero.jpg" alt="Skin Protocol RX bottles beside a cream treatment bed" className="h-[300px] w-full object-cover lg:h-auto lg:min-h-[440px]" />
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-[clamp(2.5rem,8vw,7.8rem)]">
          <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">For professionals</p>
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
              <p className="text-[11px] font-semibold tracking-[0.21em] uppercase text-[#9C755C]">Real perspectives</p>
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
