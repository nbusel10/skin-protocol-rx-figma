import { PRODUCTS } from '../src/data'
import {
  buildProtocol,
  optionalTreat,
  protocolSize,
  preferGentleSkin,
  splitRoutine,
  routineEntries,
  isEveningOnlySerum,
  type ProtocolAnswers,
  type SkinState,
  type StepsPreference,
} from '../src/lib/buildProtocol'
import type { SkinConcern, SkinType } from '../src/data'

const SKIN_TYPES: SkinType[] = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']
const CONCERNS: SkinConcern[] = [
  'Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area',
  'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage',
]
const STEPS: StepsPreference[] = ['minimal', 'moderate', 'complete']
const SKIN_STATES: SkinState[] = ['calm', 'dehydrated', 'breakout', 'irritated']

const CORE = {
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
}

const TREATMENTS = new Set([
  CORE.c5, CORE.c20, CORE.matrix, CORE.peptide, CORE.elixir, CORE.bakuchiol, CORE.ha,
])
const CLEANSERS = new Set([CORE.chamomile, CORE.gel])
const MOISTURIZERS = new Set([CORE.cloud, CORE.rich])

function concernSubsets(): SkinConcern[][] {
  const out: SkinConcern[][] = []
  const n = CONCERNS.length
  for (let mask = 1; mask < 1 << n; mask++) {
    const subset: SkinConcern[] = []
    for (let i = 0; i < n; i++) if (mask & (1 << i)) subset.push(CONCERNS[i])
    out.push(subset)
  }
  return out
}

function ids(products: { id: string }[]): string[] {
  return products.map(p => p.id)
}

function expectedTreatment(answers: ProtocolAnswers): string | null {
  if (answers.stepsPreference === 'minimal' && answers.skinRightNow !== 'irritated') return null
  const { concerns } = answers
  const gentle = preferGentleSkin(answers)
  const has = (c: SkinConcern) => concerns.includes(c)
  if (answers.skinRightNow === 'irritated') return CORE.matrix
  if (answers.skinRightNow === 'breakout') return gentle ? CORE.matrix : CORE.bakuchiol
  if (has('Hyperpigmentation') || has('Brightening') || has('Sun Damage')) return gentle ? CORE.c5 : CORE.c20
  if (has('Aging')) return CORE.bakuchiol
  if (has('Redness')) return CORE.matrix
  if (has('Dry Skin')) return CORE.elixir
  if (has('Acne') || has('Large Pores')) return gentle ? CORE.matrix : CORE.bakuchiol
  if (answers.skinRightNow === 'dehydrated') return CORE.ha
  return CORE.peptide
}

function expectedCleanser(answers: ProtocolAnswers): string {
  const gentle = preferGentleSkin(answers)
  if (answers.skinRightNow === 'irritated' || gentle || answers.skinType === 'Dry') return CORE.chamomile
  if (
    answers.skinRightNow === 'breakout' ||
    answers.skinType === 'Oily' ||
    answers.concerns.includes('Acne') ||
    answers.concerns.includes('Large Pores')
  ) {
    return CORE.gel
  }
  return CORE.chamomile
}

function expectedMoisturizer(answers: ProtocolAnswers): string {
  if (answers.skinRightNow === 'irritated') return CORE.rich
  if (answers.skinType === 'Dry' || answers.concerns.includes('Dry Skin')) return CORE.rich
  if (answers.skinRightNow === 'breakout') return CORE.cloud
  if (answers.skinRightNow === 'dehydrated' && answers.skinType !== 'Oily') return CORE.rich
  return CORE.cloud
}

const failures: string[] = []
const seenProducts = new Set<string>()
const seenWeekly = new Set<string>()
let checked = 0

for (const skinType of SKIN_TYPES) {
  for (const concerns of concernSubsets()) {
    for (const stepsPreference of STEPS) {
      for (const sensitive of [false, true]) {
        for (const skinRightNow of SKIN_STATES) {
          const answers: ProtocolAnswers = { skinType, concerns, stepsPreference, sensitive, skinRightNow }
          const result = buildProtocol(answers)
          const daily = ids(result.products)
          const size = protocolSize(answers)
          const gentle = preferGentleSkin(answers)
          const label = `${skinType} | ${concerns.join('+')} | ${stepsPreference} | ${sensitive ? 'sensitive' : 'not-sensitive'} | ${skinRightNow}`
          const wantEye =
            stepsPreference === 'complete' &&
            concerns.includes('Eye Area') &&
            skinRightNow !== 'irritated'
          const expectsOil =
            stepsPreference === 'complete' && skinRightNow !== 'breakout' && skinRightNow !== 'irritated'
          const treatmentId = expectedTreatment(answers)

          checked++
          daily.forEach(id => seenProducts.add(id))
          if (result.weekly) seenWeekly.add(result.weekly.id)

          if (!result.products.length) failures.push(`${label}: empty protocol`)
          if (result.products.length !== size) {
            failures.push(`${label}: expected ${size} products, got ${result.products.length} [${daily.join(', ')}]`)
          }
          if (new Set(daily).size !== daily.length) failures.push(`${label}: duplicate ids`)
          if (daily.some(id => !PRODUCTS.some(p => p.id === id))) failures.push(`${label}: unknown product`)
          if (!CLEANSERS.has(daily[0])) failures.push(`${label}: first product is not a daily cleanser`)
          if (!daily.includes(CORE.toner)) failures.push(`${label}: missing toner`)
          if (!daily.some(id => MOISTURIZERS.has(id))) failures.push(`${label}: missing moisturizer`)
          if (treatmentId && !daily.includes(treatmentId)) {
            failures.push(`${label}: treatment ${treatmentId} missing`)
          }
          if (!treatmentId && daily.some(id => TREATMENTS.has(id))) {
            failures.push(`${label}: unexpected treatment on essentials-only path`)
          }
          if (daily.includes(CORE.tripleglow)) failures.push(`${label}: TripleGlow in daily routine`)
          if (gentle && daily.includes(CORE.c20)) failures.push(`${label}: 20% C on sensitive skin`)
          if (gentle && daily.includes(CORE.gel)) failures.push(`${label}: gel cleanser on sensitive skin`)
          if (skinType === 'Dry' && daily.includes(CORE.gel)) failures.push(`${label}: gel cleanser on dry skin`)
          if (daily[0] !== expectedCleanser(answers)) {
            failures.push(`${label}: cleanser ${daily[0]} != ${expectedCleanser(answers)}`)
          }
          if (!daily.includes(expectedMoisturizer(answers))) {
            failures.push(`${label}: moisturizer ${expectedMoisturizer(answers)} missing`)
          }
          if (wantEye && !daily.includes(CORE.eye)) failures.push(`${label}: missing eye cream`)
          if (!wantEye && daily.includes(CORE.eye)) failures.push(`${label}: eye cream without Eye Area / complete`)
          if (expectsOil && !daily.includes(CORE.oil)) failures.push(`${label}: missing finishing oil`)
          if (!expectsOil && daily.includes(CORE.oil)) failures.push(`${label}: unexpected finishing oil`)
          if (result.weekly && (gentle || skinType === 'Dry')) {
            failures.push(`${label}: weekly exfoliant on gentle/dry path`)
          }
          if (result.weekly && result.weekly.id !== CORE.tripleglow) {
            failures.push(`${label}: unexpected weekly product`)
          }

          // AM/PM split checks
          const routine = splitRoutine(result.products)
          const morningIds = routine.morning
            .filter(l => l.kind === 'product')
            .map(l => l.kind === 'product' ? l.product.id : '')
          const eveningIds = routine.evening
            .filter(l => l.kind === 'product')
            .map(l => l.kind === 'product' ? l.product.id : '')
          if (!routine.morning.some(l => l.kind === 'protect')) {
            failures.push(`${label}: morning missing Protect guidance`)
          }
          if (daily.includes(CORE.bakuchiol) && morningIds.includes(CORE.bakuchiol)) {
            failures.push(`${label}: Bakuchiol appears in morning routine`)
          }
          if (daily.includes(CORE.bakuchiol) && !eveningIds.includes(CORE.bakuchiol)) {
            failures.push(`${label}: Bakuchiol missing from evening routine`)
          }
          const treatProduct = result.products.find(p => p.protocolStep === 3)
          if (treatProduct && isEveningOnlySerum(treatProduct) && morningIds.includes(treatProduct.id)) {
            failures.push(`${label}: evening-only serum in morning`)
          }

          // Single-list view: one row per product, priced once, period agreeing with the AM/PM split
          const entries = routineEntries(result.products)
          if (entries.length !== result.products.length) {
            failures.push(`${label}: ${entries.length} routine entries for ${result.products.length} products`)
          }
          if (new Set(entries.map(e => e.product.id)).size !== entries.length) {
            failures.push(`${label}: duplicate product in routine entries`)
          }
          for (const entry of entries) {
            const am = morningIds.includes(entry.product.id)
            const pm = eveningIds.includes(entry.product.id)
            const expected = am && pm ? 'both' : am ? 'am' : 'pm'
            if (entry.period !== expected) {
              failures.push(`${label}: ${entry.product.id} period ${entry.period} != ${expected}`)
            }
            if (!am && !pm) failures.push(`${label}: ${entry.product.id} is in neither routine`)
          }
          const listedTotal = entries.reduce((sum, e) => sum + e.product.price, 0)
          const shownTotal = result.products.reduce((sum, p) => sum + p.price, 0)
          if (listedTotal !== shownTotal) {
            failures.push(`${label}: listed rows total ${listedTotal} but protocol total is ${shownTotal}`)
          }

          const offer = optionalTreat(answers)
          if (skinRightNow === 'irritated' || stepsPreference !== 'minimal') {
            if (offer) failures.push(`${label}: optionalTreat should be null`)
          } else {
            if (!offer) failures.push(`${label}: optionalTreat missing on Essentials`)
            else if (daily.includes(offer.id)) {
              failures.push(`${label}: optionalTreat ${offer.id} is already in the protocol`)
            }
          }

          if (skinRightNow === 'irritated') {
            const recovery = [CORE.chamomile, CORE.toner, CORE.matrix, CORE.rich]
            if (size !== 4) failures.push(`${label}: irritated protocol is ${size} steps, expected 4`)
            if (recovery.some(id => !daily.includes(id))) {
              failures.push(`${label}: recovery protocol missing [${recovery.filter(id => !daily.includes(id)).join(', ')}]`)
            }
            const banned = [CORE.c5, CORE.c20, CORE.bakuchiol, CORE.tripleglow, CORE.oil, CORE.gel]
            const found = banned.filter(id => daily.includes(id))
            if (found.length) failures.push(`${label}: active in recovery protocol [${found.join(', ')}]`)
            if (result.weekly) failures.push(`${label}: weekly exfoliant on irritated skin`)
          }

          if (skinRightNow === 'breakout') {
            if (daily.includes(CORE.oil)) failures.push(`${label}: finishing oil while breaking out`)
            if (stepsPreference !== 'minimal' && !gentle && !daily.includes(CORE.bakuchiol)) {
              failures.push(`${label}: breakout treatment is not the bakuchiol`)
            }
          }

          if (skinRightNow === 'dehydrated') {
            if (stepsPreference !== 'minimal' && treatmentId === CORE.ha && !daily.includes(CORE.ha)) {
              failures.push(`${label}: dehydrated protocol missing HA serum`)
            }
            if (result.weekly) failures.push(`${label}: weekly exfoliant on dehydrated skin`)
          }

          // Eye product step number
          const eyeProduct = result.products.find(p => p.id === CORE.eye)
          if (eyeProduct && eyeProduct.protocolStep !== 4) {
            failures.push(`${label}: eye cream protocolStep is ${eyeProduct.protocolStep}, expected 4`)
          }
          const haProduct = PRODUCTS.find(p => p.id === CORE.ha)
          if (haProduct && haProduct.protocolStep !== 3) {
            failures.push(`HA serum protocolStep is ${haProduct.protocolStep}, expected 3`)
          }
        }
      }
    }
  }
}

const catalogIds = PRODUCTS.map(p => p.id)
const unusedDaily = catalogIds.filter(id => id !== CORE.tripleglow && !seenProducts.has(id))
const unusedWeekly = !seenWeekly.has(CORE.tripleglow)

if (unusedDaily.length) failures.push(`products never recommended: ${unusedDaily.join(', ')}`)
if (unusedWeekly) failures.push('TripleGlow never recommended as weekly')

console.log(`Checked ${checked} quiz combinations`)
console.log(`Daily products seen: ${[...seenProducts].sort().join(', ')}`)
console.log(`Weekly products seen: ${[...seenWeekly].join(', ') || '(none)'}`)
if (failures.length) {
  console.error(`FAILED ${failures.length} checks`)
  failures.slice(0, 40).forEach(f => console.error(' - ' + f))
  if (failures.length > 40) console.error(` ... and ${failures.length - 40} more`)
  process.exit(1)
}
console.log('All quiz paths passed')
