import { useState } from 'react'
import { PROTOCOL_STEPS, SKIN_CONCERNS } from '../../data'
import { CLIENT_NOTES, STUDIO_NOTES, focusProduct, pickProducts, stepLabel, type DesignNavigate } from '../shared'

interface HomePageProps {
  onNavigate: DesignNavigate
}

const wrap = 'mx-auto w-[min(1160px,calc(100%-38px))] min-[851px]:w-[min(1160px,calc(100%-76px))]'

const ESSENTIALS = [
  { id: 'clarifying-cleanser', kicker: '01 / Cleanse', note: 'Daily cleanser' },
  { id: 'rosewater-niacinamide-toner', kicker: '02 / Tone · Optional', note: 'Optional routine addition' },
  { id: 'hyaluronic-acid-serum', kicker: '03 / Treat · Optional', note: 'Optional targeted care' },
  { id: 'rich-barrier-cream', kicker: '04 / Moisturize', note: 'Daily moisturizer' },
]

const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Chemist',
    blurb: 'Formulation-driven. Decades of ingredient development. Focused on stability, delivery, and performance.',
    image: '/designs/grove/founder-linda.jpg',
    alt: 'Linda D. Amend, MS, chemist and co-founder of Skin Protocol RX',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Nurse practitioner',
    blurb: 'Patient-facing insight. Translates clinical needs into product design. Focus on real-world skin response.',
    image: '/original/founder-susanna.jpg',
    alt: 'Susanna Amend, NP, nurse practitioner and co-founder of Skin Protocol RX',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Licensed medical esthetician',
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

const STEP_NOTE: Record<number, string> = {
  1: 'Daily foundation',
  2: 'Optional',
  3: 'As needed',
  4: 'Optional',
  5: 'Daily foundation',
  6: 'Optional',
  7: 'Morning SPF',
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const products = pickProducts(ESSENTIALS.map(item => item.id))
  const [concern, setConcern] = useState('dry-skin')
  const [voices, setVoices] = useState<'clients' | 'studios'>('clients')
  const focus = focusProduct(concern)
  const notes = voices === 'clients' ? CLIENT_NOTES : STUDIO_NOTES
  const activeConcern = SKIN_CONCERNS.find(item => item.id === concern) ?? SKIN_CONCERNS[0]

  return (
    <article className="bg-[#F6F3E9] text-[#23332A]">
      <section className="relative overflow-hidden pb-[86px] pt-[65px] min-[851px]:pt-[90px]">
        <div className="pointer-events-none absolute -left-[175px] top-[75px] z-0 h-[280px] w-[280px] rounded-full bg-[#DFE7D9]" />
        <div className="pointer-events-none absolute -right-[110px] top-[145px] z-0 h-[190px] w-[190px] rounded-full bg-[#ECD9C5]" />
        <div className={`relative z-[1] ${wrap}`}>
          <div className="mx-auto mb-[53px] max-w-[740px] text-center">
            <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">Family laboratory · New York</p>
            <h1 className="mx-auto mt-[15px] mb-[23px] max-w-[770px] font-display text-[clamp(46px,5.4vw,77px)] leading-[1.14] tracking-[-0.035em]">
              Where nature meets <em className="italic">science.</em>
            </h1>
            <p className="mx-auto max-w-[525px] text-[#5D665C]">
              Science guided by nature, and a family who believes your skin needs thoughtful formulas — not an overwhelming routine.
            </p>
          </div>
          <div className="mx-auto grid max-w-[1000px] items-center gap-[26px] min-[851px]:grid-cols-[1.15fr_0.85fr] min-[851px]:gap-[35px]">
            <img
              src="/designs/grove/hero.jpg"
              alt="Skin Protocol RX bottles arranged with olive leaves in soft daylight"
              className="min-h-[290px] w-full object-cover min-[561px]:min-h-[380px] min-[851px]:min-h-[450px]"
              style={{ borderRadius: '48% 48% 42% 42% / 45% 45% 30% 30%' }}
            />
            <div className="max-w-none rounded-[12px_78px_12px_12px] bg-[#284235] px-7 py-7 text-[#FFFCF5] min-[851px]:max-w-[440px] min-[851px]:p-[42px]">
              <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#C8D4C4]">The people behind your skincare</p>
              <h2 className="mt-3.5 mb-[17px] font-display text-[34px] leading-[1.14] tracking-[-0.035em]">
                A chemist. A nurse practitioner. An esthetician.
              </h2>
              <p className="mb-[25px] text-sm leading-relaxed text-[#E3E8DE]">
                Three professional perspectives, one shared belief: purposeful ingredients and skincare simple enough to live with.
              </p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => scrollTo('founders')} className="rounded-[40px] border border-[#FFFCF5] bg-[#FFFCF5] px-5 py-3 text-xs font-bold text-[#284235]">
                  Meet the family
                </button>
                <button type="button" onClick={() => scrollTo('discovery')} className="rounded-[40px] border border-[#A9B7A9] bg-transparent px-5 py-3 text-xs font-bold text-white">
                  Find your protocol
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="scroll-mt-24 bg-[#FFFCF5] py-[65px] min-[851px]:py-[84px]">
        <div className={`${wrap} grid items-center gap-[26px] min-[851px]:grid-cols-2 min-[851px]:gap-[70px]`}>
          <img
            src="/original/founders-lab.jpg"
            alt="The founders with Skin Protocol RX bottles on a cream marble table"
            className="min-h-[380px] w-full object-cover min-[851px]:min-h-[500px]"
            style={{ borderRadius: '180px 180px 16px 16px' }}
          />
          <div>
            <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">What stays in the beaker</p>
            <h2 className="mt-2 mb-[18px] font-display text-[clamp(35px,3.4vw,52px)] leading-[1.14] tracking-[-0.035em]">
              Only what earns <em className="italic">its place.</em>
            </h2>
            <p className="text-[#5D665C]">
              We approach each formula with professional standards and a simple question: what does skin actually need?
            </p>
            <div className="mt-6 grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2">
              <div>
                <h3 className="mb-3.5 font-display text-[23px] tracking-[-0.035em]">Kept</h3>
                <ul className="list-disc pl-[17px] text-sm leading-8">
                  {KEPT.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[4px_35px_4px_4px] bg-[#E2EADD] p-[22px]">
                <h3 className="mb-3.5 font-display text-[23px] tracking-[-0.035em]">Left out</h3>
                <ul className="list-disc pl-[17px] text-sm leading-8">
                  {LEFT_OUT.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="scroll-mt-24 bg-[#E6EBDF] py-[65px] min-[851px]:py-[84px]">
        <div className={wrap}>
          <div className="mb-[35px] flex flex-col gap-6 min-[851px]:flex-row min-[851px]:items-end min-[851px]:justify-between min-[851px]:gap-[30px]">
            <div>
              <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">From the bench</p>
              <h2 className="mt-2 font-display text-[clamp(35px,3.5vw,51px)] leading-[1.14] tracking-[-0.035em]">
                Considered formulas.
                <br />
                <em className="italic">Simple beginnings.</em>
              </h2>
            </div>
            <div className="max-w-[390px]">
              <p className="text-sm text-[#5D665C]">
                Start with the essentials; add only what suits your skin. Explore a small selection from the range.
              </p>
              <button type="button" onClick={() => onNavigate('shop')} className="mt-3 border-b border-current pb-1 text-xs font-bold">
                Explore products ↗
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[15px] min-[561px]:gap-[22px] min-[851px]:grid-cols-4">
            {products.map((product, index) => {
              const meta = ESSENTIALS[index]
              return (
                <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="text-left">
                  <span className="flex min-h-[175px] items-center justify-center rounded-[120px_120px_12px_12px] bg-[#F0F3E9] px-4 py-6 min-[561px]:min-h-[225px]">
                    <img src={product.image} alt="" className="h-40 w-auto object-contain min-[561px]:h-48" />
                  </span>
                  <span className="mt-[15px] block text-[10px] tracking-[0.12em] uppercase text-[#61755B]">{meta.kicker}</span>
                  <span className="mt-1 block min-h-[2.6rem] font-display text-xl leading-snug tracking-[-0.035em]">{product.name}</span>
                  <span className="mt-1 block text-[13px] text-[#23332A]">${product.price} · {meta.note}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section id="routine" className="scroll-mt-24 py-[65px] min-[851px]:py-[84px]">
        <div className={`${wrap} grid items-center gap-[26px] min-[851px]:grid-cols-[1.05fr_0.95fr] min-[851px]:gap-[70px]`}>
          <div>
            <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">A ritual you can keep</p>
            <h2 className="mt-2 mb-[18px] font-display text-[clamp(35px,3.5vw,51px)] leading-[1.14] tracking-[-0.035em]">
              Your routine, <em className="italic">simplified.</em>
            </h2>
            <p className="text-[#5D665C]">
              Cleanse and moisturize as your everyday foundation. Add care for your concerns if it helps; finish mornings with SPF.
            </p>
            <ol className="mt-6 grid grid-cols-1 min-[561px]:grid-cols-2 min-[561px]:gap-x-[22px]">
              {PROTOCOL_STEPS.map(step => {
                const row = (
                  <span className="flex gap-[15px]">
                    <strong className="min-w-[30px] font-display text-[26px] italic leading-none text-[#61755B]">{step.step}</strong>
                    <span>
                      <b className="block text-[15px] font-semibold">{step.name}</b>
                      <small className="block text-xs text-[#5D665C]">{STEP_NOTE[step.step]}</small>
                    </span>
                  </span>
                )
                return (
                  <li key={step.step} className="border-t border-[#CBD2C4] py-[13px]">
                    {step.productBacked === false ? (
                      row
                    ) : (
                      <button type="button" onClick={() => onNavigate('shop')} className="w-full text-left hover:text-[#61755B]">
                        {row}
                      </button>
                    )}
                  </li>
                )
              })}
            </ol>
            <button type="button" onClick={() => scrollTo('discovery')} className="mt-6 rounded-[40px] border border-[#284235] bg-[#284235] px-5 py-3 text-xs font-bold text-white">
              Find your starting point
            </button>
          </div>
          <img
            src="/designs/grove/routine.jpg"
            alt="A quiet morning skincare ritual in natural light"
            className="min-h-[380px] w-full object-cover min-[851px]:min-h-[560px]"
            style={{ borderRadius: '16px 180px 16px 16px' }}
          />
        </div>
      </section>

      <section id="discovery" className="scroll-mt-24 bg-[#E9D8C5] py-[55px] min-[851px]:py-[75px]">
        <div className={`${wrap} grid items-center gap-[26px] min-[851px]:grid-cols-2 min-[851px]:gap-[65px]`}>
          <div>
            <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">Your skin, your routine</p>
            <h2 className="mt-2 mb-[18px] font-display text-[clamp(37px,3.5vw,54px)] leading-[1.14] tracking-[-0.035em]">
              Name the concern.
              <br />
              <em className="italic">We will point to a formula.</em>
            </h2>
            <p className="text-[#5D665C]">A gentle starting point for exploring products. Select a concern below.</p>
            <div className="mt-[25px] flex flex-wrap gap-[9px]" role="group" aria-label="Choose a skin concern">
              {SKIN_CONCERNS.map(item => {
                const selected = item.id === concern
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setConcern(item.id)}
                    className={`rounded-[30px] border px-3.5 py-[9px] text-[13px] ${selected ? 'border-[#284235] bg-[#284235] text-white' : 'border-[#B49F89] bg-transparent text-[#23332A] hover:border-[#284235] hover:bg-[#284235] hover:text-white'}`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[17px] rounded-[24px] bg-[#FFFCF5] p-[22px] min-[561px]:grid-cols-[42%_58%] min-[561px]:rounded-[80px_12px_12px_12px]">
            <button type="button" onClick={() => onNavigate('product', focus.id)} aria-label={focus.name} className="flex min-h-[230px] items-center justify-center rounded-[110px_110px_12px_12px] bg-[#F0F3E9] px-4 min-[561px]:min-h-[285px]">
              <img src={focus.image} alt="" className="h-52 w-auto object-contain" />
            </button>
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">{stepLabel(focus.protocolStep)}</p>
              <h3 className="mt-3 font-display text-[28px] leading-[1.14] tracking-[-0.035em]">{focus.name}</h3>
              <p className="mt-2 text-[13px]">${focus.price} · {focus.size}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5D665C]">{activeConcern.description}</p>
              <button type="button" onClick={() => onNavigate('product', focus.id)} className="mt-5 w-fit rounded-[40px] border border-[#284235] bg-[#284235] px-5 py-3 text-xs font-bold text-white">
                View formula ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="founders" className="scroll-mt-24 bg-[#284235] py-[65px] text-[#F6F3E9] min-[851px]:py-[84px]">
        <div className={wrap}>
          <p className="text-center text-[11px] font-bold tracking-[0.19em] uppercase text-[#C8D4C4]">Family-led, professionally informed</p>
          <h2 className="mt-2 text-center font-display text-[clamp(35px,3.5vw,51px)] leading-[1.14] tracking-[-0.035em]">
            Three perspectives. <em className="italic">One purpose.</em>
          </h2>
          <div className="mt-[42px] grid grid-cols-1 gap-[30px] min-[561px]:grid-cols-3 min-[561px]:gap-[15px] min-[851px]:gap-[30px]">
            {FOUNDERS.map(founder => (
              <article key={founder.name}>
                <img
                  src={founder.image}
                  alt={founder.alt}
                  className="h-[390px] w-full object-cover object-[center_18%] min-[561px]:h-[260px] min-[851px]:h-[320px]"
                  style={{ borderRadius: '160px 160px 9px 9px' }}
                />
                <h3 className="mt-4 font-display text-2xl tracking-[-0.035em]">{founder.name}</h3>
                <p className="text-xs tracking-[0.09em] uppercase text-[#BDD0C1]">{founder.role}</p>
                <p className="mt-2 max-w-[320px] text-[13px] leading-relaxed text-[#E0E9DB]">{founder.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="professionals" className="scroll-mt-24 bg-[#FFFCF5] py-[65px] min-[851px]:py-[84px]">
        <div className={`${wrap} grid grid-cols-1 items-stretch min-[851px]:grid-cols-2`}>
          <img
            src="/original/spa-hero.jpg"
            alt="A professional treatment setting with warm light"
            className="min-h-[350px] w-full rounded-[14px_14px_0_0] object-cover min-[851px]:min-h-[470px] min-[851px]:rounded-[14px_0_0_14px]"
          />
          <div className="flex flex-col justify-center rounded-[0_0_14px_14px] bg-[#E6E4D6] px-10 py-10 min-[851px]:rounded-[0_14px_14px_0] min-[851px]:p-[70px]">
            <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">For spa professionals</p>
            <h2 className="mt-[9px] mb-[18px] font-display text-[clamp(35px,3vw,48px)] leading-[1.14] tracking-[-0.035em]">
              The treatment continues <em className="italic">at home.</em>
            </h2>
            <p className="mb-6 text-sm text-[#23332A]">
              Give your clients a coordinated home-care routine that complements their in-person experience.
            </p>
            <button type="button" onClick={() => onNavigate('shop')} className="w-fit rounded-[40px] border border-[#284235] bg-[#284235] px-5 py-3 text-xs font-bold text-white">
              See the professional line
            </button>
          </div>
        </div>
      </section>

      <section className="py-[65px] min-[851px]:py-[84px]">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#61755B]">Real voices</p>
              <h2 className="mt-2 font-display text-[clamp(35px,3.5vw,51px)] leading-[1.14] tracking-[-0.035em]">Heard in the room.</h2>
            </div>
            <div className="flex gap-4 text-[13px] font-semibold">
              <button type="button" onClick={() => setVoices('clients')} className={voices === 'clients' ? 'border-b border-[#284235] text-[#284235]' : 'text-[#5D665C]'}>
                Clients
              </button>
              <button type="button" onClick={() => setVoices('studios')} className={voices === 'studios' ? 'border-b border-[#284235] text-[#284235]' : 'text-[#5D665C]'}>
                Studios
              </button>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-[25px] min-[561px]:grid-cols-3">
            {notes.map(note => (
              <blockquote key={note.name} className="border-t border-[#A7B7A5] pt-[22px]">
                <p className="mb-5 font-display text-[23px] italic leading-[1.45] tracking-[-0.035em]">&ldquo;{note.text}&rdquo;</p>
                <footer className="text-xs text-[#5D665C]">{note.name} · {note.place}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
