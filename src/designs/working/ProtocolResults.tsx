import { Fragment, useState } from 'react'
import { getProtocolStepLabel, PROTECT_GUIDANCE, type Product } from '../../data'
import {
  funOption,
  isVitaminC,
  otherVitaminC,
  routineEntries,
  routinePeriodLabel,
  vitaminCPair,
} from '../../lib/buildProtocol'
import {
  loadQuizSession,
  protocolFromSession,
  saveQuizSession,
  type QuizSession,
} from '../../lib/quizSession'

function summary(session: QuizSession): string {
  const concernText = session.noConcerns || session.concerns.length === 0
    ? ''
    : ` and ${session.concerns.slice(0, 2).join(', ').toLowerCase()} concerns`
  const tail = ' Daily essentials are cleanser, moisturizer, and morning sunscreen — personalized additions only where they help.'
  if (session.skinUnsure) return `Based on your answers${concernText}.${tail}`
  return `Based on your ${session.skinType.toLowerCase()} skin type${concernText}.${tail}`
}

function shownProduct(product: Product, choiceId: string): Product {
  return isVitaminC(product) && choiceId && product.id !== choiceId ? otherVitaminC(product) : product
}

export default function ProtocolResults({
  onViewProduct,
  onStartOver,
}: {
  onViewProduct: (productId: string) => void
  onStartOver: () => void
}) {
  const [session, setSession] = useState(loadQuizSession)
  const built = session?.done ? protocolFromSession(session) : null
  if (!session || !built) return null

  const current = session
  const choiceId = current.cChoiceId
  const entries = routineEntries(built.products).map(entry => ({
    ...entry,
    product: shownProduct(entry.product, choiceId),
  }))
  const weekly = built.weekly ? shownProduct(built.weekly, choiceId) : null
  const alternative = built.alternative ? shownProduct(built.alternative, choiceId) : null
  const treatOffer = built.treatOffer ? shownProduct(built.treatOffer, choiceId) : null
  const bonus = built.bonus
  const total = [...entries.map(entry => entry.product), ...(weekly ? [weekly] : [])].reduce(
    (sum, product) => sum + product.price,
    0,
  )

  function chooseVitaminC(id: string) {
    const next = { ...current, cChoiceId: id }
    saveQuizSession(next)
    setSession(next)
  }

  function addTreat() {
    const next = { ...current, treatAdded: true, treatOpen: false }
    saveQuizSession(next)
    setSession(next)
  }

  return (
    <article className="bg-[#F7F4EF] px-6 py-16 text-[#252520] md:px-[max(36px,8vw)] md:py-[75px]">
      <div className="mx-auto max-w-3xl">
        <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Your protocol</p>
        <h1 className="mt-3 font-serif text-[clamp(40px,6vw,56px)] font-normal leading-[1.08] tracking-[-0.044em]">
          Your recommended protocol
        </h1>
        <p className="mt-5 max-w-[40rem] text-[17px] leading-relaxed text-[#595750]">{summary(current)}</p>

        {built.tonerOmitted && (
          <p className="mt-8 border border-[#ab8584]/40 bg-[#FFFDFA] px-6 py-5 text-[15px] leading-relaxed text-[#595750]">
            {built.tonerSwap
              ? `Because your skin often stings or turns red, we swapped the toner for ${built.tonerSwap.name}, a calming serum, and left out exfoliating products.`
              : 'Because your skin often stings or turns red, we left out the toner and exfoliating products to keep your routine gentle.'}
          </p>
        )}

        <ul className="mt-10 space-y-4">
          {entries.map(({ product, period }) => (
            <Fragment key={product.id}>
            <li className="border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              <div className="flex gap-5">
                <img src={product.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">
                    {getProtocolStepLabel(product.protocolStep)}
                  </p>
                  <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{product.name}</h2>
                  <p className="mt-1 text-sm text-[#595750]">{product.tagline}</p>
                  <p className="mt-2 text-sm font-semibold">${product.price}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-between gap-3">
                  <span className="border border-[#D6CEC3] px-2.5 py-1 text-[11px] tracking-wide text-[#6D6A63]">
                    {routinePeriodLabel(period)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onViewProduct(product.id)}
                    className="text-[13px] text-[#ab8584] underline underline-offset-2"
                  >
                    View
                  </button>
                </div>
              </div>
              {isVitaminC(product) && (
                <>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {vitaminCPair().map(option => {
                      const selected = option.id === product.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => chooseVitaminC(option.id)}
                          className={`border px-3 py-2 text-left text-[13px] ${selected ? 'border-[#ab8584] bg-[#ab8584]/10' : 'border-[#D6CEC3] bg-transparent'}`}
                        >
                          {option.name.replace('Brighten & Glow C Serum ', '')} · ${option.price}
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#6D6A63]">
                    {built.cReason} You can choose the other strength if you prefer.
                  </p>
                </>
              )}
            </li>
            {treatOffer && product.protocolStep === 2 && (
              <li className="border border-dashed border-[#ab8584]/50 bg-[#FFFDFA] p-5">
                <div className="flex gap-5">
                  <img src={treatOffer.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">
                      {getProtocolStepLabel(treatOffer.protocolStep)}
                    </p>
                    <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{treatOffer.name}</h2>
                    <p className="mt-1 text-sm text-[#595750]">Add a personalized serum</p>
                    <p className="mt-2 text-sm font-semibold">${treatOffer.price}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-center gap-3">
                    <button
                      type="button"
                      onClick={addTreat}
                      className="bg-[#252520] px-3 py-2 text-[12px] text-[#F7F4EF]"
                    >
                      Add to my protocol
                    </button>
                    <button
                      type="button"
                      onClick={() => onViewProduct(treatOffer.id)}
                      className="text-[13px] text-[#ab8584] underline underline-offset-2"
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            )}
            </Fragment>
          ))}
          <li className="border border-[#D6CEC3] bg-[#FFFDFA] p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">{PROTECT_GUIDANCE.label}</p>
            <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">Broad-spectrum SPF 30+</h2>
            <p className="mt-1 text-sm text-[#595750]">{PROTECT_GUIDANCE.description}</p>
            <p className="mt-1 text-sm text-[#6D6A63]">{PROTECT_GUIDANCE.note}</p>
          </li>
        </ul>

        {weekly && (
          <div className="mt-10">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Weekly · Polish</p>
            <div className="mt-4 flex gap-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              <img src={weekly.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Occasional alternative cleanser</p>
                <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{weekly.name}</h2>
                <p className="mt-1 text-sm text-[#595750]">Use 1 to 3 times per week in place of your daily cleanser, as tolerated.</p>
                <p className="mt-2 text-sm font-semibold">${weekly.price}</p>
              </div>
              <button
                type="button"
                onClick={() => onViewProduct(weekly.id)}
                className="self-center text-[13px] text-[#ab8584] underline underline-offset-2"
              >
                View
              </button>
            </div>
          </div>
        )}

        {bonus && (
          <div className="mt-10">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">A little extra</p>
            <div className="mt-4 flex gap-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              <img src={bonus.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Bonus pick</p>
                <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{bonus.name}</h2>
                <p className="mt-1 text-sm text-[#595750]">
                  Because you chose “{funOption(current.funAnswer)?.label ?? ''}”.
                </p>
                <p className="mt-2 text-sm font-semibold">${bonus.price}</p>
              </div>
              <button
                type="button"
                onClick={() => onViewProduct(bonus.id)}
                className="self-center text-[13px] text-[#ab8584] underline underline-offset-2"
              >
                View
              </button>
            </div>
          </div>
        )}

        {alternative && (
          <div className="mt-10">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Also consider</p>
            <div className="mt-4 flex gap-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              <img src={alternative.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Alternative serum</p>
                <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{alternative.name}</h2>
                <p className="mt-1 text-sm text-[#595750]">Ranked next for your answers. Use it in place of your serum, not alongside it.</p>
                <p className="mt-2 text-sm font-semibold">${alternative.price}</p>
              </div>
              <button
                type="button"
                onClick={() => onViewProduct(alternative.id)}
                className="self-center text-[13px] text-[#ab8584] underline underline-offset-2"
              >
                View
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 flex items-end justify-between bg-[#252520] px-6 py-7 text-[#F7F4EF]">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Protocol total</p>
            <p className="mt-1 font-serif text-4xl">${total}</p>
          </div>
          <p className="text-sm text-[#F7F4EF]/70">{entries.length} products · AM & PM</p>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onStartOver}
            className="text-[13px] text-[#6D6A63] underline underline-offset-2 hover:text-[#252520]"
          >
            Start over
          </button>
        </div>
      </div>
    </article>
  )
}
