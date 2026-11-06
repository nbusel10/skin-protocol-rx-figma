import { useState } from 'react'
import {
  DEFAULT_FUN_QUESTION,
  FUN_QUESTIONS,
  QUIZ_CONCERNS,
  QUIZ_SKIN_TYPES,
  REACTIVITY_OPTIONS,
  funQuestionById,
  recommendedVitaminCId,
  type FunQuestion,
  type QuizConcern,
  type QuizSkinType,
  type Reactivity,
  type StepsPreference,
} from '../../lib/buildProtocol'
import { saveQuizSession, type QuizSession } from '../../lib/quizSession'
import OffsetPhoto, { OffsetFrame } from './OffsetPhoto'
import { QuietGeometryFrame } from './quiet-geometry/QuietGeometryMotif'
import SunbeamMatGlow from './SunbeamMatGlow'

/** Same questions as the original protocol quiz, plus Not Sure on skin type. */
const NOT_SURE = 'Not Sure'
const SKIN_OPTIONS = [...QUIZ_SKIN_TYPES, NOT_SURE] as const
type SkinChoice = (typeof SKIN_OPTIONS)[number]

const STEPS_PREFERENCE: { value: StepsPreference; label: string; desc: string }[] = [
  { value: 'minimal', label: 'Essentials · 3 products', desc: 'Cleanser, toner, moisturizer' },
  { value: 'moderate', label: 'Essentials + serum · 4 products', desc: 'Add one personalized treatment' },
  { value: 'complete', label: 'Full personalized · up to 6 products', desc: 'Serum, eye cream, and finishing oil' },
]

const NO_CONCERNS_LABEL = 'No specific concerns'
const TOTAL_STEPS = 5

function activeFunQuestion(): FunQuestion {
  if (typeof window === 'undefined') return funQuestionById(DEFAULT_FUN_QUESTION)
  const n = Number(new URLSearchParams(window.location.search).get('fun'))
  return FUN_QUESTIONS[n - 1] ?? funQuestionById(DEFAULT_FUN_QUESTION)
}

const optionBtn = (selected: boolean, lighter = false, refined = false) =>
  lighter
    ? [
        'border px-3 py-3.5 text-[13px] transition-colors',
        selected
          ? 'border-[#ab8584] bg-[#ab8584]/20 text-[#F7F4EF]'
          : 'border-white/25 bg-transparent text-[#F7F4EF] hover:border-[#ab8584]/70',
      ].join(' ')
    : refined
      ? [
          'border px-4 py-4 text-left text-[14px] leading-snug transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]',
          selected
            ? 'border-[#ab8584] bg-[#f3eceb] text-[#2B2727]'
            : 'border-[#D6C3C2] bg-transparent text-[#2B2727] hover:border-[#ab8584]',
        ].join(' ')
      : [
          'border px-3 py-3.5 text-[13px] transition-colors',
          selected
            ? 'border-[#ab8584] bg-[#ab8584]/10 text-[#252520]'
            : 'border-[#D6CEC3] bg-transparent text-[#252520] hover:border-[#ab8584]/60',
        ].join(' ')

const EYEBROW_QUIET = 'text-[11px] font-medium tracking-[0.16em] uppercase text-[#6D6A63]'
const EYEBROW_ROSE = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'

export default function ProtocolQuizSection({
  quietGeometry = false,
  lighter = false,
  refined = false,
  id = 'protocol',
  onComplete,
}: {
  quietGeometry?: boolean
  lighter?: boolean
  /** Presentation-only refinements for the protocol comparison preview. */
  refined?: boolean
  id?: string
  /** Called after answers are saved. When omitted, the working protocol page opens. */
  onComplete?: () => void
}) {
  const [step, setStep] = useState(0)
  const [funQuestion] = useState(activeFunQuestion)
  const [skinType, setSkinType] = useState<SkinChoice | ''>('')
  const [reactivity, setReactivity] = useState<Reactivity | ''>('')
  const [concerns, setConcerns] = useState<QuizConcern[]>([])
  const [noConcerns, setNoConcerns] = useState(false)
  const [stepsPreference, setStepsPreference] = useState<StepsPreference>('moderate')
  const [funAnswer, setFunAnswer] = useState('')

  const progress = (step + 1) / TOTAL_STEPS
  const canContinue = [
    skinType !== '',
    reactivity !== '',
    concerns.length > 0 || noConcerns,
    true,
    funAnswer !== '',
  ][step]

  function toggleConcern(c: QuizConcern) {
    setNoConcerns(false)
    setConcerns(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]))
  }

  function chooseNoConcerns() {
    setConcerns([])
    setNoConcerns(prev => !prev)
  }

  function handleContinue() {
    if (!canContinue) return
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1)
      return
    }
    if (!reactivity) return
    const skinUnsure = skinType === NOT_SURE
    const mappedSkin: QuizSkinType = skinUnsure ? 'Combination' : (skinType as QuizSkinType)
    const answers = {
      skinType: mappedSkin,
      concerns: noConcerns ? [] : concerns,
      reactivity,
      stepsPreference,
      funAnswer,
    }
    const session: QuizSession = {
      step: 4,
      ...answers,
      noConcerns,
      funQuestionId: funQuestion.id,
      done: true,
      cChoiceId: recommendedVitaminCId(answers),
      addedIds: [],
      treatAdded: false,
      treatOpen: false,
      skinUnsure,
    }
    saveQuizSession(session)
    if (onComplete) onComplete()
    else window.location.assign('/designs/working/protocol')
  }

  const questionHeading = refined
    ? 'mb-8 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] font-normal leading-snug tracking-[-0.02em]'
    : 'mb-7 font-serif text-[clamp(1.45rem,2.6vw,1.85rem)] font-normal leading-snug tracking-[-0.01em]'

  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-[75px] ${lighter ? 'overflow-visible text-[#252520]' : 'overflow-hidden bg-[#f5f0eb] text-[#2B2727]'}`}>
      <div className={`grid grid-cols-1 items-stretch min-[681px]:gap-0 ${refined ? 'gap-10 min-[681px]:grid-cols-[42%_58%]' : 'gap-12 min-[681px]:grid-cols-[48%_52%]'}`}>
        {/* Left — copy + product image (same inset / title scale as philosophy) */}
        <div className="flex flex-col px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[8%]">
          <p className={lighter ? EYEBROW_QUIET : EYEBROW_ROSE}>
            What&apos;s Your Protocol?
          </p>
          <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
            Your skin has a story.
            <br />
            <em className="italic text-[#ab8584]">Let&apos;s get to know it.</em>
          </h2>
          <p className={`max-w-[540px] text-[17px] leading-relaxed ${refined ? 'mb-8 text-[#2B2727]/75 md:mb-10' : 'mb-10 text-[#595750]'}`}>
            {refined
              ? "Tell us a little about your skin, your concerns, and your goals. We'll help you discover a thoughtful routine built around what matters to you."
              : 'A few thoughtful questions help you begin with the essentials and find the right place for extra care. Think of it as a conversation about your skin — not another complicated beauty routine.'}
          </p>

          <div className={`relative w-full overflow-visible ${refined ? 'max-w-[420px]' : 'max-w-[463px]'}`}>
            {lighter ? (
              <>
                <OffsetPhoto
                  src="/designs/working/lighter/find-your-routine.jpg"
                  alt="A woman resting her chin in her hand in warm sunlight"
                  className="relative z-[1]"
                  imgClassName="aspect-[4/3] object-[center_22%]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute top-full left-0 z-0 h-[250px] w-[250px] -translate-x-[48%] -translate-y-10 md:h-[280px] md:w-[280px]">
                  <div className="absolute inset-0 rounded-full border border-[#C4A8A6]" />
                  <div className="absolute inset-[9%] origin-center animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#C4A8A6] motion-reduce:animate-none" />
                </div>
              </>
            ) : quietGeometry ? (
              <QuietGeometryFrame variant="quiz" className="w-full">
                <img
                  src="/find-your-routine.jpg"
                  alt="A woman resting her chin in her hand in warm sunlight"
                  className="aspect-[4/3] h-auto w-full object-cover object-[center_22%]"
                />
              </QuietGeometryFrame>
            ) : (
              <>
                <SunbeamMatGlow intensity="soft" />
                <div className="relative z-[1] aspect-[4/3]">
                  <OffsetFrame borderClassName={refined ? 'border-[#D6C3C2]' : undefined} />
                  <div className="relative z-[1] h-full overflow-hidden">
                    <img
                      src="/find-your-routine.jpg"
                      alt="A woman resting her chin in her hand in warm sunlight"
                      className="h-full w-full object-cover object-[center_22%]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right — same column geometry as ProtocolOverview image (90% centered), slightly wider */}
        <div className={`flex items-center justify-center px-6 ${refined ? 'min-[681px]:pr-[max(36px,8vw)] min-[681px]:pl-[4%]' : 'min-[681px]:px-0'}`}>
          <div className={`relative ${refined ? 'w-full' : 'w-[94%]'}`}>
            {lighter ? (
              <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-0 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 md:h-[168px] md:w-[168px]">
                <div className="absolute inset-0 rounded-full border border-[#C4A8A6]" />
                <div className="absolute inset-[9%] origin-center animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#C4A8A6] motion-reduce:animate-none" />
              </div>
            ) : null}
            <div className={`relative z-[1] ${refined ? 'border border-[#D6C3C2] bg-[#fffdfa] px-7 py-9 md:px-11 md:py-12' : lighter ? 'bg-[#2B2727] p-7 text-[#F7F4EF] md:p-10' : 'border border-[#D6CEC3] bg-[#FFFDFA] p-7 md:p-10'}`}>
            {lighter ? (
              <h3 className="mb-6 font-serif text-[1.35rem] font-normal leading-snug tracking-[-0.01em]">
                Discover your protocol
              </h3>
            ) : null}
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${lighter ? 'text-[#F7F4EF]/70' : refined ? 'text-[#2B2727]/60' : 'text-[#6D6A63]'}`}>
                {refined
                  ? `Question ${String(step + 1).padStart(2, '0')} of ${String(TOTAL_STEPS).padStart(2, '0')}`
                  : `Question ${step + 1} of ${TOTAL_STEPS}`}
              </p>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${lighter ? 'text-[#F7F4EF]/70' : refined ? 'text-[#2B2727]/60' : 'text-[#6D6A63]'}`}>
                About 1 minute
              </p>
            </div>

            <div className={`${refined ? 'mb-10' : 'mb-8'} h-[2px] w-full overflow-hidden ${lighter ? 'bg-white/15' : refined ? 'bg-[#D6C3C2]' : 'bg-[#E8E0D6]'}`}>
              <div
                className="h-full bg-[#ab8584] transition-all duration-500 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div aria-live="polite">
            <div key={step} className={refined ? 'protocol-refine-question' : undefined}>
            {step === 0 && (
              <>
                <h3 className={questionHeading}>
                  What is your skin type?
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {SKIN_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSkinType(opt)}
                      className={`${optionBtn(skinType === opt, lighter, refined)} text-center`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3 className={questionHeading}>
                  How often does your skin sting, burn, or turn red from new products or weather?
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {REACTIVITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setReactivity(opt.value)}
                      className={`${optionBtn(reactivity === opt.value, lighter, refined)} text-center`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className={refined ? 'mb-3 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] font-normal leading-snug tracking-[-0.02em]' : 'mb-3 font-serif text-[clamp(1.45rem,2.6vw,1.85rem)] font-normal leading-snug tracking-[-0.01em]'}>
                  What are your top skin concerns?
                </h3>
                <p className={`mb-7 text-[13px] leading-relaxed ${lighter ? 'text-[#F7F4EF]/70' : refined ? 'text-[#2B2727]/60' : 'text-[#6D6A63]'}`}>Select all that apply</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {QUIZ_CONCERNS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleConcern(c)}
                      className={`${optionBtn(concerns.includes(c), lighter, refined)} text-left`}
                    >
                      {c}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={chooseNoConcerns}
                    className={`${optionBtn(noConcerns, lighter, refined)} text-left sm:col-span-2`}
                  >
                    {NO_CONCERNS_LABEL}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className={questionHeading}>
                  How personalized should your routine be?
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {STEPS_PREFERENCE.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setStepsPreference(option.value)}
                      className={`${optionBtn(stepsPreference === option.value, lighter, refined)} text-left`}
                    >
                      <span className="block">{option.label}</span>
                      <span className={`mt-1 block text-[12px] leading-snug ${lighter ? 'text-[#F7F4EF]/70' : refined ? 'text-[#2B2727]/60' : 'text-[#6D6A63]'}`}>
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className={questionHeading}>
                  {funQuestion.title}
                </h3>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {funQuestion.options.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFunAnswer(option.value)}
                      className={`${optionBtn(funAnswer === option.value, lighter, refined)} text-left`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
            </div>
            </div>

            <div className={`${lighter ? 'mt-9' : 'mt-6'} flex items-center justify-between gap-4`}>
              <button
                type="button"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className={`text-[13px] transition-opacity disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] ${lighter ? 'text-[#F7F4EF]/70 hover:text-[#F7F4EF]' : refined ? 'text-[#2B2727]/60 hover:text-[#2B2727]' : 'text-[#6D6A63] hover:text-[#252520]'}`}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleContinue}
                disabled={!canContinue}
                className={`px-6 py-3 text-[13px] tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] disabled:opacity-40 ${lighter ? 'bg-[#F7F4EF] text-[#252520] hover:bg-white' : refined ? 'bg-[#2B2727] text-[#fffdfa] hover:bg-[#ab8584]' : 'bg-[#252520] text-[#F7F4EF] hover:bg-[#141412]'}`}
              >
                {step < TOTAL_STEPS - 1 ? 'Continue →' : 'Build My Protocol'}
              </button>
            </div>

          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
