import { useEffect, useState } from 'react'
import type { Product } from '../data'
import {
  DEFAULT_FUN_QUESTION,
  FUN_QUESTIONS,
  QUIZ_CONCERNS,
  QUIZ_SKIN_TYPES,
  REACTIVITY_OPTIONS,
  buildProtocol,
  funQuestionById,
  optionalTreat,
  recommendedVitaminCId,
  vitaminCReason,
  type FunQuestion,
  type FunQuestionId,
  type QuizConcern,
  type QuizSkinType,
  type Reactivity,
  type StepsPreference,
} from './buildProtocol'

const STORAGE_KEY = 'sprx-protocol-quiz'

const SKIN_TYPES = new Set<string>(QUIZ_SKIN_TYPES)
const CONCERNS = new Set<string>(QUIZ_CONCERNS)
const REACTIVITY = new Set<string>(REACTIVITY_OPTIONS.map(option => option.value))
const STEP_CHOICES = new Set<string>(['minimal', 'moderate', 'complete'])
const FUN_IDS = new Set<string>(FUN_QUESTIONS.map(question => question.id))

export type QuizSession = {
  step: number
  skinType: QuizSkinType | ''
  reactivity: Reactivity | ''
  concerns: QuizConcern[]
  noConcerns: boolean
  stepsPreference: StepsPreference
  funAnswer: string
  funQuestionId: FunQuestionId
  done: boolean
  cChoiceId: string
  /** Working-design results: serum the visitor picked when a runner-up was offered. */
  serumChoiceId?: string
  addedIds: string[]
  treatAdded: boolean
  treatOpen: boolean
  /** Working-design quiz: visitor chose "Not sure yet". */
  skinUnsure?: boolean
  /** Working-design quiz: visitor chose Sensitive, stored as a gentle Combination routine. */
  skinSensitive?: boolean
}

export type RestoredProtocol = {
  products: Product[]
  weekly: Product | null
  alternative: Product | null
  cleanserAlternative: Product | null
  bonus: Product | null
  tonerSwap: Product | null
  tonerOmitted: boolean
  cRecommendedId: string
  cReason: string
  treatOffer: Product | null
}

function isFunQuestionId(value: unknown): value is FunQuestionId {
  return typeof value === 'string' && FUN_IDS.has(value)
}

function isQuizSession(value: unknown): value is QuizSession {
  if (!value || typeof value !== 'object') return false
  const session = value as QuizSession
  if (typeof session.step !== 'number' || session.step < 0 || session.step > 4) return false
  if (session.skinType !== '' && !SKIN_TYPES.has(session.skinType)) return false
  if (session.reactivity !== '' && !REACTIVITY.has(session.reactivity)) return false
  if (!Array.isArray(session.concerns) || session.concerns.some(concern => !CONCERNS.has(concern))) return false
  if (typeof session.noConcerns !== 'boolean') return false
  if (!STEP_CHOICES.has(session.stepsPreference)) return false
  if (typeof session.funAnswer !== 'string') return false
  if (!isFunQuestionId(session.funQuestionId)) return false
  if (typeof session.done !== 'boolean') return false
  if (typeof session.cChoiceId !== 'string') return false
  if (session.serumChoiceId != null && typeof session.serumChoiceId !== 'string') return false
  if (!Array.isArray(session.addedIds) || session.addedIds.some(id => typeof id !== 'string')) return false
  if (typeof session.treatAdded !== 'boolean' || typeof session.treatOpen !== 'boolean') return false
  if (session.skinUnsure != null && typeof session.skinUnsure !== 'boolean') return false
  if (session.skinSensitive != null && typeof session.skinSensitive !== 'boolean') return false
  if (session.done && (!session.skinType || !session.reactivity)) return false
  if (session.done && session.concerns.length === 0 && !session.noConcerns) return false
  return true
}

export function loadQuizSession(): QuizSession | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
    return isQuizSession(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveQuizSession(session: QuizSession) {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Private mode and full storage can reject writes. The in-memory quiz still works.
  }
}

export function clearQuizSession() {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage failures. The in-memory quiz still resets.
  }
}

export function protocolFromSession(session: QuizSession): RestoredProtocol | null {
  if (!session.done || !session.skinType || !session.reactivity) return null
  try {
    const answers = {
      skinType: session.skinType,
      concerns: session.concerns,
      reactivity: session.reactivity,
      stepsPreference: session.stepsPreference,
      funAnswer: session.funAnswer,
    }
    const result = buildProtocol(answers)
    const offer = optionalTreat(answers)
    const products = session.treatAdded && offer
      ? [...result.products, offer].sort(
          (a, b) => a.protocolStep - b.protocolStep || a.name.localeCompare(b.name),
        )
      : result.products
    return {
      products,
      weekly: result.weekly,
      alternative: result.alternative,
      cleanserAlternative: result.cleanserAlternative,
      bonus: result.bonus,
      tonerSwap: result.tonerSwap,
      tonerOmitted: result.tonerOmitted,
      cRecommendedId: recommendedVitaminCId(answers),
      cReason: vitaminCReason(answers),
      treatOffer: session.treatAdded ? null : offer,
    }
  } catch {
    return null
  }
}

function previewFunQuestion(): FunQuestion | undefined {
  if (typeof window === 'undefined') return undefined
  const n = Number(new URLSearchParams(window.location.search).get('fun'))
  return FUN_QUESTIONS[n - 1]
}

function initialFunQuestion(saved: QuizSession | null): FunQuestion {
  const preview = previewFunQuestion()
  if (saved?.done) return funQuestionById(saved.funQuestionId)
  return preview ?? funQuestionById(saved?.funQuestionId ?? DEFAULT_FUN_QUESTION)
}

export function useQuizSessionState() {
  const [saved] = useState(loadQuizSession)
  const [restored] = useState(() => (saved ? protocolFromSession(saved) : null))

  const [step, setStep] = useState(saved?.step ?? 0)
  const [funQuestion] = useState(() => initialFunQuestion(saved))
  const [skinType, setSkinType] = useState<QuizSkinType | ''>(saved?.skinType ?? '')
  const [reactivity, setReactivity] = useState<Reactivity | ''>(saved?.reactivity ?? '')
  const [concerns, setConcerns] = useState<QuizConcern[]>(saved?.concerns ?? [])
  const [noConcerns, setNoConcerns] = useState(saved?.noConcerns ?? false)
  const [stepsPreference, setStepsPreference] = useState<StepsPreference>(saved?.stepsPreference ?? 'moderate')
  const [funAnswer, setFunAnswer] = useState(saved?.funAnswer ?? '')
  const [recommendations, setRecommendations] = useState<Product[]>(restored?.products ?? [])
  const [weekly, setWeekly] = useState<Product | null>(restored?.weekly ?? null)
  const [alternative, setAlternative] = useState<Product | null>(restored?.alternative ?? null)
  const [cleanserAlternative, setCleanserAlternative] = useState<Product | null>(
    restored?.cleanserAlternative ?? null,
  )
  const [bonus, setBonus] = useState<Product | null>(restored?.bonus ?? null)
  const [tonerSwap, setTonerSwap] = useState<Product | null>(restored?.tonerSwap ?? null)
  const [tonerOmitted, setTonerOmitted] = useState(restored?.tonerOmitted ?? false)
  const [cRecommendedId, setCRecommendedId] = useState(restored?.cRecommendedId ?? '')
  const [cReason, setCReason] = useState(restored?.cReason ?? '')
  const [cChoiceId, setCChoiceId] = useState(saved?.cChoiceId || restored?.cRecommendedId || '')
  const [done, setDone] = useState(Boolean(restored))
  const [addedIds, setAddedIds] = useState<string[]>(saved?.addedIds ?? [])
  const [treatOffer, setTreatOffer] = useState<Product | null>(restored?.treatOffer ?? null)
  const [treatOpen, setTreatOpen] = useState(saved?.treatOpen ?? false)
  const [treatAdded, setTreatAdded] = useState(saved?.treatAdded ?? false)

  const session: QuizSession = {
    step,
    skinType,
    reactivity,
    concerns,
    noConcerns,
    stepsPreference,
    funAnswer,
    funQuestionId: funQuestion.id,
    done,
    cChoiceId,
    addedIds,
    treatAdded,
    treatOpen,
  }
  const serialized = JSON.stringify(session)

  useEffect(() => {
    saveQuizSession(JSON.parse(serialized) as QuizSession)
  }, [serialized])

  const reset = () => {
    setDone(false)
    setStep(0)
    setWeekly(null)
    setRecommendations([])
    setAlternative(null)
    setCleanserAlternative(null)
    setBonus(null)
    setTonerSwap(null)
    setTonerOmitted(false)
    setCRecommendedId('')
    setCReason('')
    setCChoiceId('')
    setSkinType('')
    setReactivity('')
    setConcerns([])
    setNoConcerns(false)
    setStepsPreference('moderate')
    setFunAnswer('')
    setTreatOffer(null)
    setTreatOpen(false)
    setTreatAdded(false)
  }

  return {
    step,
    setStep,
    funQuestion,
    skinType,
    setSkinType,
    reactivity,
    setReactivity,
    concerns,
    setConcerns,
    noConcerns,
    setNoConcerns,
    stepsPreference,
    setStepsPreference,
    funAnswer,
    setFunAnswer,
    recommendations,
    setRecommendations,
    weekly,
    setWeekly,
    alternative,
    setAlternative,
    cleanserAlternative,
    setCleanserAlternative,
    bonus,
    setBonus,
    tonerSwap,
    setTonerSwap,
    tonerOmitted,
    setTonerOmitted,
    cRecommendedId,
    setCRecommendedId,
    cReason,
    setCReason,
    cChoiceId,
    setCChoiceId,
    done,
    setDone,
    addedIds,
    setAddedIds,
    treatOffer,
    setTreatOffer,
    treatOpen,
    setTreatOpen,
    setTreatAdded,
    reset,
  }
}
