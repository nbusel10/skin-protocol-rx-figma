import { PRODUCTS, PROTECT_GUIDANCE, type Product, type SkinType } from '../data'

export type QuizSkinType = Exclude<SkinType, 'Sensitive'>
export const QUIZ_SKIN_TYPES: QuizSkinType[] = ['Combination', 'Dry', 'Normal', 'Oily']

export type QuizConcern =
  | 'Fine Lines & Firmness'
  | 'Aging'
  | 'Dark Spots & Uneven Skin Tone'
  | 'Dullness'
  | 'Large Pores'
  | 'Dryness'
  | 'Acne'
  | 'Oily Skin'

export const QUIZ_CONCERNS: QuizConcern[] = [
  'Fine Lines & Firmness',
  'Aging',
  'Dark Spots & Uneven Skin Tone',
  'Dullness',
  'Large Pores',
  'Dryness',
  'Acne',
  'Oily Skin',
]

/** How often skin stings, burns, or turns red from new products or weather. */
export type Reactivity = 'never' | 'rarely' | 'sometimes' | 'often'
export const REACTIVITY_OPTIONS: { value: Reactivity; label: string }[] = [
  { value: 'never', label: 'Never' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'often', label: 'Often' },
]

export type StepsPreference = 'minimal' | 'moderate' | 'complete'

export type SerumKey = 'peptide' | 'c' | 'bakuchiol' | 'ha' | 'elixir' | 'matrix'
export type BonusKind = 'eye' | 'oil' | 'tripleglow' | 'pamper'

export type FunQuestionId = 'upgrade' | 'mood' | 'vibe' | 'extra'

export interface FunOption {
  /** Unique across every fun question so an answer identifies its question. */
  value: string
  label: string
  serum?: SerumKey
  bonus?: BonusKind
}

export interface FunQuestion {
  id: FunQuestionId
  title: string
  options: FunOption[]
}

export const FUN_QUESTIONS: FunQuestion[] = [
  {
    id: 'upgrade',
    title: 'If your skin could ask for one little upgrade, what would it choose?',
    options: [
      { value: 'upgrade-glow', label: 'A little more glow', serum: 'elixir' },
      { value: 'upgrade-smooth', label: 'A smoother feel', serum: 'peptide' },
      { value: 'upgrade-hydration', label: 'Extra hydration', serum: 'ha' },
      { value: 'upgrade-calm', label: 'A calmer complexion', serum: 'matrix' },
      { value: 'upgrade-pores', label: 'Clearer-looking pores', serum: 'bakuchiol' },
    ],
  },
  {
    id: 'mood',
    title: 'If your skin had a mood today, what would it be?',
    options: [
      { value: 'mood-glowing', label: 'Glowing', serum: 'elixir' },
      { value: 'mood-thirsty', label: 'Thirsty', serum: 'ha' },
      { value: 'mood-stressed', label: 'A little stressed', serum: 'matrix' },
      { value: 'mood-balanced', label: 'Feeling balanced', serum: 'peptide' },
      { value: 'mood-reset', label: 'Ready for a reset', serum: 'bakuchiol', bonus: 'tripleglow' },
    ],
  },
  {
    id: 'vibe',
    title: 'What is your ideal skincare routine vibe?',
    options: [
      { value: 'vibe-quick', label: 'A quick and easy reset' },
      { value: 'vibe-ritual', label: 'A calming nighttime ritual', serum: 'bakuchiol', bonus: 'oil' },
      { value: 'vibe-pamper', label: 'A few extra minutes of pampering', bonus: 'pamper' },
    ],
  },
  {
    id: 'extra',
    title: 'If you had an extra five minutes for your skin, what would you reach for?',
    options: [
      { value: 'extra-mask', label: 'A soothing mask', serum: 'matrix' },
      { value: 'extra-massage', label: 'A face massage', bonus: 'oil' },
      { value: 'extra-hydration', label: 'An extra layer of hydration', serum: 'ha' },
      { value: 'extra-glow', label: 'A little glow boost', serum: 'c' },
    ],
  },
]

export const DEFAULT_FUN_QUESTION: FunQuestionId = 'upgrade'

export function funQuestionById(id: FunQuestionId): FunQuestion {
  return FUN_QUESTIONS.find(q => q.id === id) ?? FUN_QUESTIONS[0]
}

export function funOption(value: string | undefined): FunOption | undefined {
  if (!value) return undefined
  for (const q of FUN_QUESTIONS) {
    const option = q.options.find(o => o.value === value)
    if (option) return option
  }
  return undefined
}

export interface ProtocolAnswers {
  skinType: QuizSkinType
  /** Empty when the user answered "No specific concerns". */
  concerns: QuizConcern[]
  reactivity: Reactivity
  stepsPreference: StepsPreference
  funAnswer?: string
}

export interface ProtocolRecommendation {
  products: Product[]
  weekly: Product | null
  /** Highest-scoring serum, at the recommended vitamin C strength when it is C. */
  serum: Product
  /** Best-scoring serum other than the one in the routine or offered. */
  alternative: Product | null
  /** Extra suggestion driven by the fun question; never part of the routine total. */
  bonus: Product | null
  /** Calming serum that took the toner's place on an "often" Essentials routine. */
  tonerSwap: Product | null
  tonerOmitted: boolean
}

export type RoutineLine =
  | { kind: 'product'; product: Product }
  | { kind: 'protect'; label: string; description: string; note: string }

export interface SplitRoutine {
  morning: RoutineLine[]
  evening: RoutineLine[]
}

export type RoutinePeriod = 'am' | 'pm' | 'both'

export interface RoutineEntry {
  product: Product
  period: RoutinePeriod
}

const IDS = {
  chamomile: 'clarifying-cleanser',
  gel: 'clarifying-gel-cleanser',
  tripleglow: 'tripleglow-exfoliating-cleanser',
  toner: 'rosewater-niacinamide-toner',
  c5: 'brighten-glow-c-5',
  c20: 'brighten-glow-c-20',
  ha: 'hyaluronic-acid-serum',
  matrix: 'matrix-serum',
  peptide: 'amino-acid-serum',
  elixir: 'beauty-elixir-serum',
  bakuchiol: 'bakuchiol-renewal-serum',
  cloud: 'hydration-cloud-cream',
  rich: 'rich-barrier-cream',
  eye: 'eye-cream',
  oil: 'the-holy-grail',
} as const

/** Client serum guide: per concern, serums in priority order. */
export const SERUM_RANKINGS: Record<QuizConcern, SerumKey[]> = {
  'Fine Lines & Firmness': ['peptide', 'bakuchiol', 'ha', 'elixir'],
  Aging: ['peptide', 'bakuchiol', 'c', 'matrix'],
  'Dark Spots & Uneven Skin Tone': ['c', 'bakuchiol', 'matrix'],
  Dullness: ['c', 'bakuchiol', 'elixir'],
  'Large Pores': ['bakuchiol', 'peptide', 'c', 'ha', 'matrix'],
  Dryness: ['ha', 'elixir', 'peptide', 'matrix'],
  Acne: ['c', 'bakuchiol', 'ha', 'peptide'],
  'Oily Skin': ['bakuchiol', 'matrix', 'ha'],
}

const RANK_POINTS = [4, 3, 2, 1, 1]
const SKIN_TYPE_NUDGES: Partial<Record<QuizSkinType, Partial<Record<SerumKey, number>>>> = {
  Dry: { elixir: 2 },
  Oily: { matrix: 2 },
}
const REACTIVITY_NUDGES: Partial<Record<Reactivity, Partial<Record<SerumKey, number>>>> = {
  often: { matrix: 1, ha: 1 },
}
const FUN_NUDGE = 1
const NO_CONCERN_FALLBACK: SerumKey = 'peptide'
const NO_CONCERN_POINTS = 1
/** Final tie-break when points and first-place rankings are equal. */
const SERUM_ORDER: SerumKey[] = ['peptide', 'c', 'bakuchiol', 'ha', 'elixir', 'matrix']

const SERUM_IDS: Record<Exclude<SerumKey, 'c'>, string> = {
  peptide: IDS.peptide,
  bakuchiol: IDS.bakuchiol,
  ha: IDS.ha,
  elixir: IDS.elixir,
  matrix: IDS.matrix,
}

const WEEKLY_CONCERNS: QuizConcern[] = [
  'Fine Lines & Firmness', 'Aging', 'Dark Spots & Uneven Skin Tone', 'Dullness', 'Large Pores', 'Acne', 'Oily Skin',
]

function byId(id: string): Product {
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) throw new Error(`Unknown protocol product: ${id}`)
  return product
}

function hasConcern(concerns: QuizConcern[], list: QuizConcern[]): boolean {
  return list.some(c => concerns.includes(c))
}

/** Sometimes or often reactive skin gets gentler picks. */
export function isReactive(answers: Pick<ProtocolAnswers, 'reactivity'>): boolean {
  return answers.reactivity === 'sometimes' || answers.reactivity === 'often'
}

export interface SerumScore {
  key: SerumKey
  points: number
  firsts: number
}

/** Every selected concern counts equally, so the order concerns are chosen in never matters. */
export function scoreSerums(answers: ProtocolAnswers): SerumScore[] {
  const points = Object.fromEntries(SERUM_ORDER.map(k => [k, 0])) as Record<SerumKey, number>
  const firsts = Object.fromEntries(SERUM_ORDER.map(k => [k, 0])) as Record<SerumKey, number>

  for (const concern of answers.concerns) {
    SERUM_RANKINGS[concern].forEach((key, rank) => {
      points[key] += RANK_POINTS[rank] ?? 0
      if (rank === 0) firsts[key] += 1
    })
  }
  if (!answers.concerns.length) points[NO_CONCERN_FALLBACK] += NO_CONCERN_POINTS

  const nudges = [SKIN_TYPE_NUDGES[answers.skinType], REACTIVITY_NUDGES[answers.reactivity]]
  for (const nudge of nudges) {
    for (const [key, value] of Object.entries(nudge ?? {})) points[key as SerumKey] += value ?? 0
  }
  const fun = funOption(answers.funAnswer)
  if (fun?.serum) points[fun.serum] += FUN_NUDGE

  return SERUM_ORDER.map(key => ({ key, points: points[key], firsts: firsts[key] })).sort(
    (a, b) => b.points - a.points || b.firsts - a.firsts || SERUM_ORDER.indexOf(a.key) - SERUM_ORDER.indexOf(b.key),
  )
}

export function recommendedVitaminCId(answers: Pick<ProtocolAnswers, 'concerns' | 'reactivity'>): string {
  return answers.concerns.includes('Acne') || isReactive(answers) ? IDS.c5 : IDS.c20
}

/** One line explaining why the recommended vitamin C strength was chosen. */
export function vitaminCReason(answers: Pick<ProtocolAnswers, 'concerns' | 'reactivity'>): string {
  if (isReactive(answers)) return 'Gentler for skin that reacts sometimes or often.'
  if (answers.concerns.includes('Acne')) return 'Gentler strength for acne-prone skin.'
  return 'Full strength for visible brightening, since your skin rarely reacts.'
}

export function isVitaminC(product: Product): boolean {
  return product.id === IDS.c5 || product.id === IDS.c20
}

/** Both Brighten & Glow C strengths, 5% first. */
export function vitaminCPair(): [Product, Product] {
  return [byId(IDS.c5), byId(IDS.c20)]
}

/** The other Brighten & Glow C strength. */
export function otherVitaminC(product: Product): Product {
  return byId(product.id === IDS.c5 ? IDS.c20 : IDS.c5)
}

function serumProduct(key: SerumKey, answers: ProtocolAnswers): Product {
  return byId(key === 'c' ? recommendedVitaminCId(answers) : SERUM_IDS[key])
}

/**
 * Expected daily product count.
 * Essentials: cleanser + toner (or a calming serum on "often") + moisturizer.
 * Moderate adds one serum; "often" drops the toner. Complete adds eye cream and, unless acne or oily, oil.
 */
export function protocolSize(answers: ProtocolAnswers): number {
  if (answers.stepsPreference === 'minimal') return 3
  let n = answers.reactivity === 'often' ? 3 : 4
  if (answers.stepsPreference === 'complete') {
    n += 1
    if (includesOil(answers)) n += 1
  }
  return n
}

function includesOil(answers: ProtocolAnswers): boolean {
  return answers.stepsPreference === 'complete' && !oilExcluded(answers)
}

function oilExcluded(answers: ProtocolAnswers): boolean {
  return hasConcern(answers.concerns, ['Acne', 'Oily Skin'])
}

function tripleGlowExcluded(answers: ProtocolAnswers): boolean {
  return answers.skinType === 'Dry' || isReactive(answers)
}

function pickCleanser(answers: ProtocolAnswers): Product {
  if (answers.skinType === 'Dry' || isReactive(answers)) return byId(IDS.chamomile)
  if (answers.skinType === 'Oily' || hasConcern(answers.concerns, ['Acne', 'Large Pores', 'Oily Skin'])) {
    return byId(IDS.gel)
  }
  return byId(IDS.chamomile)
}

function pickMoisturizer(answers: ProtocolAnswers): Product {
  if (answers.skinType === 'Dry' || answers.concerns.includes('Dryness')) return byId(IDS.rich)
  if (answers.reactivity === 'often' && answers.skinType !== 'Oily') return byId(IDS.rich)
  return byId(IDS.cloud)
}

function pickWeekly(answers: ProtocolAnswers): Product | null {
  if (answers.stepsPreference !== 'complete' || tripleGlowExcluded(answers)) return null
  if (!hasConcern(answers.concerns, WEEKLY_CONCERNS)) return null
  return byId(IDS.tripleglow)
}

function pickBonus(answers: ProtocolAnswers, taken: Product[]): Product | null {
  const kind = funOption(answers.funAnswer)?.bonus
  if (!kind) return null
  const free = (id: string) => !taken.some(p => p.id === id)
  const oilOk = !oilExcluded(answers) && free(IDS.oil)
  if (kind === 'eye') return free(IDS.eye) ? byId(IDS.eye) : null
  if (kind === 'oil') return oilOk ? byId(IDS.oil) : null
  if (kind === 'tripleglow') return !tripleGlowExcluded(answers) && free(IDS.tripleglow) ? byId(IDS.tripleglow) : null
  if (free(IDS.eye)) return byId(IDS.eye)
  return oilOk ? byId(IDS.oil) : null
}

/** Application order: Cleanse → Tone → Treat → Eye Care → Moisturize → Nourish */
function displayOrder(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.protocolStep - b.protocolStep || a.name.localeCompare(b.name))
}

export function isEveningOnlySerum(product: Product): boolean {
  return product.id === IDS.bakuchiol
}

export function buildProtocol(answers: ProtocolAnswers): ProtocolRecommendation {
  const scores = scoreSerums(answers)
  const serum = serumProduct(scores[0].key, answers)
  const often = answers.reactivity === 'often'

  const picked: Product[] = [pickCleanser(answers)]
  let tonerSwap: Product | null = null
  let shownKey = scores[0].key

  if (!often) picked.push(byId(IDS.toner))
  if (answers.stepsPreference === 'minimal') {
    if (often) {
      shownKey = scores.find(s => s.key === 'ha' || s.key === 'matrix')!.key
      tonerSwap = serumProduct(shownKey, answers)
      picked.push(tonerSwap)
    }
  } else {
    picked.push(serum)
  }
  picked.push(pickMoisturizer(answers))
  if (answers.stepsPreference === 'complete') picked.push(byId(IDS.eye))
  if (includesOil(answers)) picked.push(byId(IDS.oil))

  const runnerUp = scores.find(s => s.key !== shownKey && s.points > 0)
  const weekly = pickWeekly(answers)
  const products = displayOrder(picked)

  return {
    products,
    weekly,
    serum,
    alternative: runnerUp ? serumProduct(runnerUp.key, answers) : null,
    bonus: pickBonus(answers, weekly ? [...products, weekly] : products),
    tonerSwap,
    tonerOmitted: often,
  }
}

/** Serum an Essentials result can opt into. Null when a serum is already in the routine. */
export function optionalTreat(answers: ProtocolAnswers): Product | null {
  if (answers.stepsPreference !== 'minimal' || answers.reactivity === 'often') return null
  return serumProduct(scoreSerums(answers)[0].key, answers)
}

/**
 * Split recommended products into morning and evening application order.
 * Bakuchiol is evening-only; Protect guidance always closes the morning list.
 */
export function splitRoutine(products: Product[]): SplitRoutine {
  const byStep = (step: number) => products.filter(p => p.protocolStep === step)
  const cleanser = byStep(1)[0]
  const toner = byStep(2)[0]
  const treat = byStep(3)[0]
  const eye = byStep(4)[0]
  const moisturizer = byStep(5)[0]
  const oil = byStep(6)[0]

  const line = (product: Product | undefined): RoutineLine | null =>
    product ? { kind: 'product', product } : null

  const morningTreat = treat && !isEveningOnlySerum(treat) ? treat : undefined
  const eveningTreat = treat

  const morning: RoutineLine[] = [
    line(cleanser),
    line(toner),
    line(morningTreat),
    line(eye),
    line(moisturizer),
    {
      kind: 'protect',
      label: PROTECT_GUIDANCE.label,
      description: PROTECT_GUIDANCE.description,
      note: PROTECT_GUIDANCE.note,
    },
  ].filter(Boolean) as RoutineLine[]

  const evening: RoutineLine[] = [
    line(cleanser),
    line(toner),
    line(eveningTreat),
    line(eye),
    line(moisturizer),
    line(oil),
  ].filter(Boolean) as RoutineLine[]

  return { morning, evening }
}

/**
 * One entry per product, tagged with when it is applied.
 * Derived from splitRoutine so the two views can never disagree.
 */
export function routineEntries(products: Product[]): RoutineEntry[] {
  const { morning, evening } = splitRoutine(products)
  const productIds = (lines: RoutineLine[]) =>
    new Set(lines.flatMap(l => (l.kind === 'product' ? [l.product.id] : [])))
  const amIds = productIds(morning)
  const pmIds = productIds(evening)

  return products.map(product => {
    const am = amIds.has(product.id)
    const pm = pmIds.has(product.id)
    return { product, period: am && pm ? 'both' : am ? 'am' : 'pm' }
  })
}

export function routinePeriodLabel(period: RoutinePeriod): string {
  if (period === 'both') return 'AM & PM'
  return period === 'am' ? 'AM only' : 'PM only'
}
