import { useState } from 'react'

const QUESTIONS = [
  {
    id: 'practice',
    prompt: 'What kind of practice is this?',
    hint: 'We review the setting before we open a partner account.',
    options: ['Day spa', 'Med spa', 'Solo esthetician', 'Dermatology', 'Wellness center', 'Other'],
  },
  {
    id: 'license',
    prompt: 'Which license covers the work?',
    hint: 'A current credential is part of the review.',
    options: ['Esthetician license', 'Medical license', 'Both', 'In process'],
  },
  {
    id: 'rooms',
    prompt: 'How many treatment rooms?',
    hint: 'This tells us the scale of the practice.',
    options: ['Just me', '2–3 rooms', '4–6 rooms', '7 or more'],
  },
  {
    id: 'years',
    prompt: 'How many years has the practice been open?',
    hint: 'Choose the closest span. Opening soon is fine.',
    options: ['Opening soon', 'Under 2 years', '2–5 years', 'More than 5'],
  },
  {
    id: 'uses',
    prompt: 'Where would clients find these products?',
    hint: 'Select every place that fits. This is how the products would show up in the practice.',
    multiple: true,
    options: ['Sold for care at home', 'Used during treatments', 'Recommended by the staff', 'Not sure yet'],
  },
  {
    id: 'volume',
    prompt: 'How much do clients spend on products for home in a month?',
    hint: 'A rough total is enough. This is what you send home between visits.',
    options: ['Just starting', 'Under $1,000', '$1,000–$3,000', 'Over $3,000'],
  },
] as const

type ChoiceId = (typeof QUESTIONS)[number]['id']
type Answers = Record<ChoiceId, string | string[]> & {
  name: string
  business: string
  email: string
  city: string
  website: string
  agreed: boolean
}

const TOTAL = QUESTIONS.length + 1

const EMPTY: Answers = {
  practice: '',
  license: '',
  rooms: '',
  years: '',
  uses: [],
  volume: '',
  name: '',
  business: '',
  email: '',
  city: '',
  website: '',
  agreed: false,
}

function optionClass(selected: boolean) {
  return [
    'border px-4 py-3.5 text-left text-[14px] leading-snug transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]',
    selected
      ? 'border-[#ab8584] bg-[#f3eceb] text-[#2B2727]'
      : 'border-[#D6C3C2] bg-transparent text-[#2B2727] hover:border-[#ab8584]',
  ].join(' ')
}

export default function PracticeQuiz({ frame = 'card' }: { frame?: 'card' | 'rail' | 'plain' }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState<Answers>(EMPTY)
  const question = QUESTIONS[step]
  const contact = step === QUESTIONS.length

  function choose(option: string) {
    if (!question) return
    if ('multiple' in question && question.multiple) {
      const current = answers[question.id]
      const list = Array.isArray(current) ? current : []
      const next = list.includes(option) ? list.filter(item => item !== option) : [...list, option]
      setAnswers(value => ({ ...value, [question.id]: next }))
      return
    }
    setAnswers(value => ({ ...value, [question.id]: option }))
  }

  function selected(option: string) {
    if (!question) return false
    const current = answers[question.id]
    return Array.isArray(current) ? current.includes(option) : current === option
  }

  const canContinue = done
    ? false
    : contact
      ? Boolean(answers.name.trim() && answers.business.trim() && answers.email.includes('@') && answers.city.trim() && answers.agreed)
      : question
        ? Array.isArray(answers[question.id])
          ? answers[question.id].length > 0
          : Boolean(answers[question.id])
        : false

  function continueQuiz() {
    if (!canContinue) return
    if (contact) {
      setDone(true)
      return
    }
    setStep(value => value + 1)
  }

  const fieldClass =
    'w-full border border-[#D6C3C2] bg-white px-3 py-2.5 text-sm text-[#2B2727] outline-none placeholder:text-[#A39E96] focus:border-[#ab8584]'

  const body = done ? (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.2em] text-[#2B2727]/60 uppercase">Application received</p>
      <h3 className="mt-4 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
        Thank you. We will review the practice.
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#2B2727]/70">
        A note comes back within 3–5 business days, to {answers.email}.
      </p>
    </div>
  ) : (
    <>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#2B2727]/60 uppercase">
          Question {String(step + 1).padStart(2, '0')} of {String(TOTAL).padStart(2, '0')}
        </p>
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#2B2727]/60 uppercase">About 2 minutes</p>
      </div>
      <div className="mb-8 h-[2px] w-full overflow-hidden bg-[#D6C3C2]" aria-hidden="true">
        <div className="h-full bg-[#ab8584] transition-all duration-500 ease-out" style={{ width: `${((step + 1) / TOTAL) * 100}%` }} />
      </div>
      <div aria-live="polite">
        {contact ? (
          <>
            <h3 className="mb-3 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
              Who should we contact about this application?
            </h3>
            <p className="mb-6 text-[13px] leading-relaxed text-[#2B2727]/60">
              Add a name, the practice, an email, and the city. The website can wait. We write back within 3–5 business days.
            </p>
            <div className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                  Full name
                  <input value={answers.name} onChange={event => setAnswers(value => ({ ...value, name: event.target.value }))} autoComplete="name" className={fieldClass} />
                </label>
                <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                  Practice name
                  <input value={answers.business} onChange={event => setAnswers(value => ({ ...value, business: event.target.value }))} autoComplete="organization" className={fieldClass} />
                </label>
              </div>
              <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                Email
                <input type="email" value={answers.email} onChange={event => setAnswers(value => ({ ...value, email: event.target.value }))} autoComplete="email" className={fieldClass} />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                  City
                  <input value={answers.city} onChange={event => setAnswers(value => ({ ...value, city: event.target.value }))} autoComplete="address-level2" className={fieldClass} />
                </label>
                <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                  Website
                  <input value={answers.website} onChange={event => setAnswers(value => ({ ...value, website: event.target.value }))} autoComplete="url" placeholder="Optional" className={fieldClass} />
                </label>
              </div>
              <label className="mt-1 flex items-start gap-3 text-[14px] leading-relaxed text-[#2B2727]/75">
                <input
                  type="checkbox"
                  checked={answers.agreed}
                  onChange={event => setAnswers(value => ({ ...value, agreed: event.target.checked }))}
                  className="mt-1 h-4 w-4 accent-[#ab8584]"
                />
                <span>I understand this application is reviewed before partner access is granted.</span>
              </label>
            </div>
          </>
        ) : question ? (
          <>
            <h3 className="mb-3 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
              {question.prompt}
            </h3>
            {'hint' in question && question.hint ? (
              <p className="mb-6 text-[13px] leading-relaxed text-[#2B2727]/60">{question.hint}</p>
            ) : (
              <div className="mb-6" />
            )}
            <div className={`grid gap-2.5 ${question.options.length > 4 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
              {question.options.map(option => (
                <button key={option} type="button" onClick={() => choose(option)} className={optionClass(selected(option))}>
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep(value => Math.max(0, value - 1))}
          disabled={step === 0}
          className="text-[13px] text-[#2B2727]/60 transition-colors hover:text-[#2B2727] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] disabled:opacity-30"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={continueQuiz}
          disabled={!canContinue}
          className="bg-[#2B2727] px-6 py-3 text-[13px] tracking-wide text-[#fffdfa] transition-colors hover:bg-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] disabled:opacity-40"
        >
          {contact ? 'Submit application' : 'Continue →'}
        </button>
      </div>
    </>
  )

  const shell = 'border border-[#D6C3C2] bg-[#fffdfa] px-6 py-8 text-[#2B2727] md:px-9 md:py-10'

  if (frame === 'plain') {
    return <div className="px-6 py-8 text-[#252520] md:px-9 md:py-10">{body}</div>
  }

  if (frame === 'rail') {
    return (
      <div className={`${shell} grid gap-6 min-[700px]:grid-cols-[4.75rem_minmax(0,1fr)] min-[700px]:gap-8`}>
        <ol className="flex gap-2 min-[700px]:flex-col" aria-label="Application questions">
          {Array.from({ length: TOTAL }, (_, index) => {
            const current = !done && index === step
            const complete = done || index < step
            return (
              <li key={index}>
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border font-serif text-[13px] italic ${
                    current
                      ? 'border-[#ab8584] bg-[#f3eceb] text-[#2B2727]'
                      : complete
                        ? 'border-[#ab8584] text-[#ab8584]'
                        : 'border-[#D6C3C2] text-[#2B2727]/35'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </li>
            )
          })}
        </ol>
        <div>{body}</div>
      </div>
    )
  }

  return <div className={shell}>{body}</div>
}
