import { useMemo, useState } from 'react'
import { PRODUCTS, SKIN_CONCERNS, type SkinType } from '../../data'
import { focusProduct, type DesignNavigate } from '../shared'
import { ProductTile } from './ui'

const SKIN: SkinType[] = ['Dry', 'Normal', 'Combination', 'Oily', 'Sensitive']

const ROUTINES = [
  { id: 'simple', label: 'A simple foundation' },
  { id: 'plus', label: 'A foundation plus targeted treatments' },
]

type Answers = {
  skin: SkinType | ''
  concern: string
  routine: string
}

function sampleProducts(answers: Answers) {
  const cleanserId = answers.skin === 'Oily' || answers.skin === 'Combination'
    ? 'clarifying-gel-cleanser'
    : 'clarifying-cleanser'
  const focus = focusProduct(answers.concern || 'dry-skin')
  const creamId = answers.skin === 'Dry' || answers.concern === 'dry-skin'
    ? 'rich-barrier-cream'
    : 'hydration-cloud-cream'
  const ids = [cleanserId]
  if (answers.routine === 'plus') ids.push('rosewater-niacinamide-toner')
  ids.push(focus.id, creamId)
  const unique = [...new Set(ids)]
  return unique
    .map(id => PRODUCTS.find(product => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
}

interface QuizPreviewProps {
  onNavigate: DesignNavigate
}

export default function QuizPreview({ onNavigate }: QuizPreviewProps) {
  const [answers, setAnswers] = useState<Answers>({ skin: '', concern: '', routine: '' })
  const [step, setStep] = useState(0)
  const ready = Boolean(answers.skin && answers.concern && answers.routine)
  const products = useMemo(() => (ready ? sampleProducts(answers) : []), [answers, ready])
  const concern = SKIN_CONCERNS.find(item => item.id === answers.concern)

  const questions = [
    { n: '01', title: 'What is your skin type?', key: 'skin' as const },
    { n: '02', title: 'What is your primary skin concern?', key: 'concern' as const },
    { n: '03', title: 'What kind of routine are you looking for?', key: 'routine' as const },
  ]

  return (
    <div id="quiz" className="scroll-mt-24 border border-[#DED7CE] bg-white/80 p-5 sm:p-8">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#B88E91] uppercase">Build Your Protocol</p>
      <h2 className="mt-2 max-w-xl font-serif text-[clamp(1.8rem,3vw,2.7rem)] leading-[1.1] tracking-[-0.03em]">
        A simple foundation, then only the treatments you actually want.
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6E6763]">
        Demonstration only. This preview uses sample pairings so you can see the idea. It is not a medical or professionally approved recommendation.
      </p>
      <ol className="mt-6 grid gap-3">
        {questions.map((question, index) => {
          const open = step === index
          return (
            <li key={question.key} className="border border-[#E7E0D6] bg-[#FFFDFA]">
              <button
                type="button"
                onClick={() => setStep(index)}
                className="flex min-h-12 w-full items-center gap-3 px-4 text-left"
              >
                <span className="text-[11px] font-semibold tracking-[0.16em] text-[#B88E91]">{question.n}</span>
                <span className="font-medium">{question.title}</span>
              </button>
              {open && question.key === 'skin' && (
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                  {SKIN.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setAnswers(current => ({ ...current, skin: option }))
                        setStep(1)
                      }}
                      className={`min-h-11 px-4 text-sm ${answers.skin === option ? 'bg-[#45403F] text-white' : 'bg-[#F3EEE7]'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {open && question.key === 'concern' && (
                <div className="grid grid-cols-2 gap-2 px-4 pb-4 sm:grid-cols-3">
                  {SKIN_CONCERNS.map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setAnswers(current => ({ ...current, concern: option.id }))
                        setStep(2)
                      }}
                      className={`min-h-11 px-3 text-left text-sm ${answers.concern === option.id ? 'bg-[#45403F] text-white' : 'bg-[#F3EEE7]'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              {open && question.key === 'routine' && (
                <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                  {ROUTINES.map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setAnswers(current => ({ ...current, routine: option.id }))}
                      className={`min-h-12 px-4 text-left text-sm ${answers.routine === option.id ? 'bg-[#45403F] text-white' : 'bg-[#F3EEE7]'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {ready && (
        <div className="mt-6">
          <p className="text-sm leading-relaxed text-[#6E6763]">
            Sample preview for {answers.skin?.toLowerCase()} skin
            {concern ? `, with ${concern.label.toLowerCase()} as the focus` : ''}.
            {answers.routine === 'plus' ? ' The toner stands in for an optional treatment step.' : ' Essentials only.'}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map(product => (
              <ProductTile key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setStep(0)
          document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        className="mt-6 inline-flex min-h-12 items-center bg-[#B88E91] px-6 text-[12px] font-semibold tracking-[0.14em] text-[#332F2D] uppercase"
      >
        Build Your Protocol
      </button>
    </div>
  )
}
