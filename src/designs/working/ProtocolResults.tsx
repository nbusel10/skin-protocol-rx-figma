import { Fragment, useState, type ReactNode } from 'react'
import { getProtocolStepLabel, PROTECT_GUIDANCE, type Product } from '../../data'
import {
  funOption,
  isEveningOnlySerum,
  isVitaminC,
  otherVitaminC,
  routineEntries,
  routinePeriodLabel,
  type RoutinePeriod,
  vitaminCChoiceNote,
  vitaminCPair,
} from '../../lib/buildProtocol'
import {
  loadQuizSession,
  protocolFromSession,
  saveQuizSession,
  type QuizSession,
} from '../../lib/quizSession'

function QuietLink({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
    onClick={event => {
      event.stopPropagation()
      onClick()
    }}
    className={`inline-flex items-center gap-2 text-[13px] text-[#6D6A63] transition-colors duration-200 hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] ${className}`}
  >
      {children}
      <span aria-hidden="true">↗</span>
    </button>
  )
}

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

function serumPeriod(product: Product): RoutinePeriod {
  return isEveningOnlySerum(product) ? 'pm' : 'both'
}

function StrengthPills({
  selectedId,
  recommendedId,
  active,
  onSelect,
}: {
  selectedId: string
  recommendedId: string
  active: boolean
  onSelect: (id: string) => void
}) {
  const pair = vitaminCPair()
  const ordered = pair[0].id === recommendedId ? pair : [pair[1], pair[0]]
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Vitamin C strength">
      {ordered.map(option => {
        const selected = active && option.id === selectedId
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={event => {
              event.stopPropagation()
              onSelect(option.id)
            }}
            className={`rounded-full border px-3 py-1 text-[12px] leading-none ${selected ? 'border-[#252520] bg-[#252520] text-[#F7F4EF]' : 'border-[#D6CEC3] text-[#252520] hover:border-[#ab8584]'}`}
          >
            {option.name.replace('Brighten & Glow C Serum ', '')}
          </button>
        )
      })}
    </div>
  )
}

function VitaminCTitle({
  strengthId,
  recommendedId,
  active,
  compact = false,
  onSelect,
}: {
  strengthId: string
  recommendedId: string
  active: boolean
  compact?: boolean
  onSelect: (id: string) => void
}) {
  const showStamp = !compact && active && strengthId === recommendedId
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
      <h2 className={`font-serif leading-snug ${compact ? 'text-[1.15rem]' : 'text-[1.35rem]'}`}>Brighten & Glow C Serum</h2>
      <StrengthPills selectedId={strengthId} recommendedId={recommendedId} active={active} onSelect={onSelect} />
      {showStamp ? (
        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#ab8584]">Recommended for you</span>
      ) : null}
    </div>
  )
}

function ChoiceCard({
  stamp,
  selected,
  product,
  onSelect,
  onView,
  title,
}: {
  stamp: string
  selected: boolean
  product: Product
  onSelect: () => void
  onView: (id: string) => void
  title: ReactNode
}) {
  return (
    <div
      onClick={onSelect}
      className={`flex h-full cursor-pointer flex-col border p-3 text-left ${selected ? 'border-[#ab8584] bg-[#ab8584]/10' : 'border-[#D6CEC3] bg-transparent'}`}
    >
      <div className="flex gap-3">
        <img src={product.image} alt="" className="h-20 w-16 shrink-0 object-contain" />
        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#ab8584]">{stamp}</span>
          {title}
          <p className="mt-1 text-sm text-[#595750]">{product.tagline}</p>
          <p className="mt-2 text-sm font-semibold">${product.price}</p>
        </div>
      </div>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        {selected ? (
          <span className="border border-[#D6CEC3] px-2.5 py-1 text-[11px] tracking-wide text-[#6D6A63]">
            {routinePeriodLabel(serumPeriod(product))}
          </span>
        ) : (
          <span />
        )}
        <QuietLink onClick={() => onView(product.id)}>View</QuietLink>
      </div>
    </div>
  )
}

function VitaminCStep({
  recommended,
  alternative,
  strengthId,
  recommendedStrengthId,
  usingAlternative,
  reason,
  onStrength,
  onSelectAlternative,
  onSelectRecommended,
  onView,
}: {
  recommended: Product
  alternative: Product
  strengthId: string
  recommendedStrengthId: string
  usingAlternative: boolean
  reason: string
  onStrength: (id: string) => void
  onSelectAlternative: () => void
  onSelectRecommended: () => void
  onView: (id: string) => void
}) {
  const recommendedIsC = isVitaminC(recommended)
  const vitaminC = shownProduct(recommendedIsC ? recommended : alternative, strengthId)
  const vitaminCSelected = recommendedIsC ? !usingAlternative : usingAlternative
  const other = recommendedIsC ? alternative : recommended
  const title = (
    <VitaminCTitle
      strengthId={strengthId}
      recommendedId={recommendedStrengthId}
      active={vitaminCSelected}
      compact
      onSelect={onStrength}
    />
  )
  const recommendedStamp = recommendedIsC && vitaminCSelected && strengthId !== recommendedStrengthId
    ? '\u00a0'
    : 'Recommended for you'
  const vitaminCard = (
    <ChoiceCard
      stamp={recommendedIsC ? recommendedStamp : 'Also consider'}
      selected={vitaminCSelected}
      product={vitaminC}
      onSelect={recommendedIsC ? onSelectRecommended : onSelectAlternative}
      onView={onView}
      title={title}
    />
  )
  const otherCard = (
    <ChoiceCard
      stamp={recommendedIsC ? 'Also consider' : 'Recommended for you'}
      selected={!vitaminCSelected}
      product={other}
      onSelect={recommendedIsC ? onSelectAlternative : onSelectRecommended}
      onView={onView}
      title={<h2 className="mt-1 font-serif text-[1.15rem] leading-snug">{other.name}</h2>}
    />
  )

  return (
    <>
      <p className="mb-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">
        {getProtocolStepLabel(recommended.protocolStep)}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {recommendedIsC ? vitaminCard : otherCard}
        {recommendedIsC ? otherCard : vitaminCard}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#6D6A63]">
        {vitaminCSelected
          ? vitaminCChoiceNote(reason)
          : 'These two rank first for your answers. Choose the one you want in this step.'}
      </p>
    </>
  )
}

function SerumOptions({
  options,
  selectedId,
  onSelect,
}: {
  options: { id: string; product: Product; stamp: string }[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Serum options">
        {options.map(option => {
          const selected = option.id === selectedId
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(option.id)}
              className={`border px-3 py-3 text-left ${selected ? 'border-[#ab8584] bg-[#ab8584]/10' : 'border-[#D6CEC3] bg-transparent'}`}
            >
              <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#ab8584]">{option.stamp}</span>
              <span className="mt-1 block text-[13px] leading-snug text-[#252520]">{option.product.name}</span>
              <span className="mt-1 block text-[12px] font-semibold">${option.product.price}</span>
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[#6D6A63]">
        These two rank first for your answers. Choose the one you want in this step.
      </p>
    </div>
  )
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
  const step3 = built.products.find(product => product.protocolStep === 3) ?? null
  const runnerUp = built.alternative
  const routinePair = step3 && runnerUp && step3.id !== runnerUp.id ? { recommended: step3, alternative: runnerUp } : null
  const treatPair = !step3 && built.treatOffer && runnerUp && built.treatOffer.id !== runnerUp.id
    ? { recommended: built.treatOffer, alternative: runnerUp }
    : null
  const activePair = routinePair ?? treatPair
  const pairIncludesC = Boolean(activePair && (isVitaminC(activePair.recommended) || isVitaminC(activePair.alternative)))
  const usingAlternative = Boolean(activePair && current.serumChoiceId === activePair.alternative.id)
  const chosenSerum = activePair ? (usingAlternative ? activePair.alternative : activePair.recommended) : null
  const products = chosenSerum
    ? built.products.map(product => (product.protocolStep === 3 ? chosenSerum : product))
    : built.products
  const entries = routineEntries(products).map(entry => ({
    ...entry,
    product: shownProduct(entry.product, choiceId),
  }))
  const weekly = built.weekly ? shownProduct(built.weekly, choiceId) : null
  const alternative = !activePair && runnerUp ? shownProduct(runnerUp, choiceId) : null
  const treatOffer = built.treatOffer
    ? shownProduct(treatPair && usingAlternative ? treatPair.alternative : built.treatOffer, choiceId)
    : null
  const serumOptions = activePair
    ? [
        { id: activePair.recommended.id, product: shownProduct(activePair.recommended, choiceId), stamp: 'Recommended for you' },
        { id: activePair.alternative.id, product: shownProduct(activePair.alternative, choiceId), stamp: 'Also consider' },
      ]
    : null
  const selectedSerumId = activePair ? (usingAlternative ? activePair.alternative.id : activePair.recommended.id) : ''
  const bonus = built.bonus
  const total = [...entries.map(entry => entry.product), ...(weekly ? [weekly] : [])].reduce(
    (sum, product) => sum + product.price,
    0,
  )

  function chooseVitaminC(id: string) {
    const vitaminSerumId = activePair && isVitaminC(activePair.recommended)
      ? activePair.recommended.id
      : activePair && isVitaminC(activePair.alternative)
        ? activePair.alternative.id
        : ''
    const next = { ...current, cChoiceId: id, ...(vitaminSerumId ? { serumChoiceId: vitaminSerumId } : {}) }
    saveQuizSession(next)
    setSession(next)
  }

  function chooseSerum(id: string) {
    const next = { ...current, serumChoiceId: id }
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

        <div className="mt-10 flex justify-center">
          <QuietLink onClick={onStartOver}>Start over</QuietLink>
        </div>
        <ul className="mt-4 space-y-4">
          {entries.map(({ product, period }) => (
            <Fragment key={product.id}>
            <li className="border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              {product.protocolStep === 3 && activePair && pairIncludesC ? (
                <VitaminCStep
                  recommended={activePair.recommended}
                  alternative={shownProduct(activePair.alternative, choiceId)}
                  strengthId={choiceId || built.cRecommendedId}
                  recommendedStrengthId={built.cRecommendedId}
                  usingAlternative={usingAlternative}
                  reason={built.cReason}
                  onStrength={chooseVitaminC}
                  onSelectAlternative={() => chooseSerum(activePair.alternative.id)}
                  onSelectRecommended={() => chooseSerum(activePair.recommended.id)}
                  onView={onViewProduct}
                />
              ) : (
                <>
                  <div className="flex gap-5">
                    <img src={product.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">
                        {getProtocolStepLabel(product.protocolStep)}
                      </p>
                      {isVitaminC(product) ? (
                        <VitaminCTitle
                          strengthId={product.id}
                          recommendedId={built.cRecommendedId}
                          active
                          onSelect={chooseVitaminC}
                        />
                      ) : (
                        <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{product.name}</h2>
                      )}
                      <p className="mt-1 text-sm text-[#595750]">{product.tagline}</p>
                      <p className="mt-2 text-sm font-semibold">${product.price}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end justify-between gap-3">
                      <span className="border border-[#D6CEC3] px-2.5 py-1 text-[11px] tracking-wide text-[#6D6A63]">
                        {routinePeriodLabel(period)}
                      </span>
                      <QuietLink onClick={() => onViewProduct(product.id)}>View</QuietLink>
                    </div>
                  </div>
                  {isVitaminC(product) && (
                    <p className="mt-3 text-xs leading-relaxed text-[#6D6A63]">
                      {vitaminCChoiceNote(built.cReason)}
                    </p>
                  )}
                  {serumOptions && product.protocolStep === 3 && (
                    <SerumOptions options={serumOptions} selectedId={selectedSerumId} onSelect={chooseSerum} />
                  )}
                </>
              )}
            </li>
            {treatOffer && product.protocolStep === 2 && activePair && (
              <li className="border border-dashed border-[#ab8584]/50 bg-[#FFFDFA] p-5">
                {pairIncludesC ? (
                  <VitaminCStep
                    recommended={activePair.recommended}
                    alternative={shownProduct(activePair.alternative, choiceId)}
                    strengthId={choiceId || built.cRecommendedId}
                    recommendedStrengthId={built.cRecommendedId}
                    usingAlternative={usingAlternative}
                    reason={built.cReason}
                    onStrength={chooseVitaminC}
                    onSelectAlternative={() => chooseSerum(activePair.alternative.id)}
                    onSelectRecommended={() => chooseSerum(activePair.recommended.id)}
                    onView={onViewProduct}
                  />
                ) : (
                  <>
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
                      <QuietLink onClick={() => onViewProduct(treatOffer.id)} className="self-center">View</QuietLink>
                    </div>
                    {serumOptions && (
                      <SerumOptions options={serumOptions} selectedId={selectedSerumId} onSelect={chooseSerum} />
                    )}
                  </>
                )}
                <button
                  type="button"
                  onClick={addTreat}
                  className="mt-4 bg-[#252520] px-3 py-2 text-[12px] text-[#F7F4EF]"
                >
                  Add to my protocol
                </button>
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
              <QuietLink onClick={() => onViewProduct(weekly.id)} className="self-center">View</QuietLink>
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
              <QuietLink onClick={() => onViewProduct(bonus.id)} className="self-center">View</QuietLink>
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
              <QuietLink onClick={() => onViewProduct(alternative.id)} className="self-center">View</QuietLink>
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
          <QuietLink onClick={onStartOver}>Start over</QuietLink>
        </div>
      </div>
    </article>
  )
}
