import { PRODUCTS, PROTECT_GUIDANCE, type Product, type SkinConcern, type SkinType } from '../data'

export type StepsPreference = 'minimal' | 'moderate' | 'complete'
export type SkinState = 'calm' | 'dehydrated' | 'breakout' | 'irritated'

export interface ProtocolAnswers {
  skinType: SkinType
  concerns: SkinConcern[]
  stepsPreference: StepsPreference
  sensitive: boolean
  skinRightNow: SkinState
}

export interface ProtocolRecommendation {
  products: Product[]
  weekly: Product | null
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

const PIGMENT: SkinConcern[] = ['Hyperpigmentation', 'Brightening', 'Sun Damage']
const WEEKLY_CONCERNS: SkinConcern[] = [
  'Acne', 'Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Sun Damage',
]

function byId(id: string): Product {
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) throw new Error(`Unknown protocol product: ${id}`)
  return product
}

function hasConcern(concerns: SkinConcern[], list: SkinConcern[]): boolean {
  return list.some(c => concerns.includes(c))
}

export function preferGentleSkin(answers: Pick<ProtocolAnswers, 'skinType' | 'sensitive'>): boolean {
  return !!answers.sensitive || answers.skinType === 'Sensitive'
}

/**
 * Expected product count for the recommendation.
 * Essentials always include cleanser + toner + moisturizer.
 * Minimal omits treat; moderate adds one serum; complete may add eye and/or oil.
 */
export function protocolSize(answers: Pick<ProtocolAnswers, 'stepsPreference' | 'skinRightNow' | 'concerns'>): number {
  if (answers.skinRightNow === 'irritated') return 4
  if (answers.stepsPreference === 'minimal') return 3
  let n = 4 // cleanser, toner, treat, moisturizer
  if (answers.stepsPreference === 'complete') {
    const wantEye = answers.concerns.includes('Eye Area')
    const includeOil = answers.skinRightNow !== 'breakout'
    if (wantEye) n += 1
    if (includeOil) n += 1
  }
  return n
}

function pickCleanser(answers: ProtocolAnswers, gentle: boolean): Product {
  if (answers.skinRightNow === 'irritated') return byId(IDS.chamomile)
  if (gentle || answers.skinType === 'Dry') return byId(IDS.chamomile)
  if (
    answers.skinRightNow === 'breakout' ||
    answers.skinType === 'Oily' ||
    answers.concerns.includes('Acne') ||
    answers.concerns.includes('Large Pores')
  ) {
    return byId(IDS.gel)
  }
  return byId(IDS.chamomile)
}

function pickVitaminC(gentle: boolean): Product {
  return byId(gentle ? IDS.c5 : IDS.c20)
}

function pickTreatment(answers: ProtocolAnswers, gentle: boolean): Product {
  const { concerns } = answers
  if (answers.skinRightNow === 'irritated') return byId(IDS.matrix)
  if (answers.skinRightNow === 'breakout') return gentle ? byId(IDS.matrix) : byId(IDS.bakuchiol)
  if (hasConcern(concerns, PIGMENT)) return pickVitaminC(gentle)
  if (concerns.includes('Aging')) return byId(IDS.bakuchiol)
  if (concerns.includes('Redness')) return byId(IDS.matrix)
  if (concerns.includes('Dry Skin')) return byId(IDS.elixir)
  if (concerns.includes('Acne') || concerns.includes('Large Pores')) {
    return gentle ? byId(IDS.matrix) : byId(IDS.bakuchiol)
  }
  // Dehydrated skin: HA is the treat serum (folded from former Restore step)
  if (answers.skinRightNow === 'dehydrated') return byId(IDS.ha)
  if (concerns.includes('Preventative') || concerns.includes('Eye Area')) return byId(IDS.peptide)
  return byId(IDS.peptide)
}

function pickMoisturizer(answers: ProtocolAnswers): Product {
  if (answers.skinRightNow === 'irritated') return byId(IDS.rich)
  if (answers.skinType === 'Dry' || answers.concerns.includes('Dry Skin')) return byId(IDS.rich)
  if (answers.skinRightNow === 'breakout') return byId(IDS.cloud)
  if (answers.skinRightNow === 'dehydrated' && answers.skinType !== 'Oily') return byId(IDS.rich)
  return byId(IDS.cloud)
}

function pickWeekly(answers: ProtocolAnswers, gentle: boolean): Product | null {
  if (answers.skinRightNow === 'dehydrated' || answers.skinRightNow === 'irritated') return null
  if (answers.stepsPreference !== 'complete' || gentle || answers.skinType === 'Dry') return null
  if (!hasConcern(answers.concerns, WEEKLY_CONCERNS)) return null
  return byId(IDS.tripleglow)
}

function uniqueProducts(list: Product[]): Product[] {
  const seen = new Set<string>()
  return list.filter(p => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })
}

/** Application order: Cleanse → Tone → Treat → Eye Care → Moisturize → Nourish */
function displayOrder(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.protocolStep - b.protocolStep || a.name.localeCompare(b.name))
}

export function isEveningOnlySerum(product: Product): boolean {
  return product.id === IDS.bakuchiol
}

export function buildProtocol(answers: ProtocolAnswers): ProtocolRecommendation {
  const gentle = preferGentleSkin(answers)
  const wantEye =
    answers.stepsPreference === 'complete' &&
    answers.concerns.includes('Eye Area') &&
    answers.skinRightNow !== 'irritated'
  const includeOil =
    answers.stepsPreference === 'complete' &&
    answers.skinRightNow !== 'breakout' &&
    answers.skinRightNow !== 'irritated'

  const cleanser = pickCleanser(answers, gentle)
  const toner = byId(IDS.toner)
  const moisturizer = pickMoisturizer(answers)
  const eye = byId(IDS.eye)
  const oil = byId(IDS.oil)

  // Recovery: cleanse, tone, calm serum, moisturize
  if (answers.skinRightNow === 'irritated') {
    return {
      products: displayOrder(uniqueProducts([cleanser, toner, byId(IDS.matrix), moisturizer])),
      weekly: null,
    }
  }

  // Daily essentials: cleanser + toner + moisturizer. Tone stays required.
  const picked: Product[] = [cleanser, toner]

  // Moderate / complete: one Treat serum (start with one)
  if (answers.stepsPreference !== 'minimal') {
    picked.push(pickTreatment(answers, gentle))
  }

  picked.push(moisturizer)

  if (wantEye) picked.push(eye)
  if (includeOil) picked.push(oil)

  return {
    products: displayOrder(uniqueProducts(picked)),
    weekly: pickWeekly(answers, gentle),
  }
}

/** Serum a 3-product Essentials result can opt into. Null when already included or on recovery. */
export function optionalTreat(answers: ProtocolAnswers): Product | null {
  if (answers.skinRightNow === 'irritated') return null
  if (answers.stepsPreference !== 'minimal') return null
  return pickTreatment(answers, preferGentleSkin(answers))
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
