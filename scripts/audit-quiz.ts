import { PRODUCTS } from '../src/data'
import {
  buildProtocol,
  optionalTreat,
  protocolSize,
  isReactive,
  splitRoutine,
  routineEntries,
  scoreSerums,
  recommendedVitaminCId,
  SERUM_RANKINGS,
  FUN_QUESTIONS,
  QUIZ_CONCERNS,
  QUIZ_SKIN_TYPES,
  REACTIVITY_OPTIONS,
  type ProtocolAnswers,
  type QuizConcern,
  type StepsPreference,
} from '../src/lib/buildProtocol'

const STEPS: StepsPreference[] = ['minimal', 'moderate', 'complete']
const REACTIVITY = REACTIVITY_OPTIONS.map(r => r.value)
const FUN_ANSWERS: (string | undefined)[] = [undefined, ...FUN_QUESTIONS.flatMap(q => q.options.map(o => o.value))]

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

const SERUMS = new Set([CORE.c5, CORE.c20, CORE.matrix, CORE.peptide, CORE.elixir, CORE.bakuchiol, CORE.ha])
const CLEANSERS = new Set([CORE.chamomile, CORE.gel])
const MOISTURIZERS = new Set([CORE.cloud, CORE.rich])

function concernSubsets(): QuizConcern[][] {
  const out: QuizConcern[][] = []
  for (let mask = 0; mask < 1 << QUIZ_CONCERNS.length; mask++) {
    out.push(QUIZ_CONCERNS.filter((_, i) => mask & (1 << i)))
  }
  return out
}

function shuffled<T>(list: T[], seed: number): T[] {
  const out = [...list]
  let s = seed
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const failures: string[] = []
const seenTopSerums = new Set<string>()
const seenDaily = new Set<string>()
let checked = 0

const rankedSerums = new Set(Object.values(SERUM_RANKINGS).flat())
if (rankedSerums.size !== 6) failures.push(`serum guide covers ${rankedSerums.size} serums, expected 6`)

for (const skinType of QUIZ_SKIN_TYPES) {
  for (const concerns of concernSubsets()) {
    for (const reactivity of REACTIVITY) {
      for (const stepsPreference of STEPS) {
        for (const funAnswer of FUN_ANSWERS) {
          const answers: ProtocolAnswers = { skinType, concerns, reactivity, stepsPreference, funAnswer }
          const result = buildProtocol(answers)
          const daily = result.products.map(p => p.id)
          const label = `${skinType} | ${concerns.join('+') || 'none'} | ${reactivity} | ${stepsPreference} | ${funAnswer ?? '-'}`
          const often = reactivity === 'often'
          const reactive = isReactive(answers)
          const has = (c: QuizConcern) => concerns.includes(c)
          const serumsInRoutine = daily.filter(id => SERUMS.has(id))

          checked++
          daily.forEach(id => seenDaily.add(id))
          seenTopSerums.add(result.serum.id)

          if (daily.length !== protocolSize(answers)) {
            failures.push(`${label}: expected ${protocolSize(answers)} products, got ${daily.length} [${daily.join(', ')}]`)
          }
          if (new Set(daily).size !== daily.length) failures.push(`${label}: duplicate ids`)
          if (daily.some(id => !PRODUCTS.some(p => p.id === id))) failures.push(`${label}: unknown product`)
          if (!CLEANSERS.has(daily[0])) failures.push(`${label}: first product is not a daily cleanser`)
          if (!daily.some(id => MOISTURIZERS.has(id))) failures.push(`${label}: missing moisturizer`)
          if (serumsInRoutine.length > 1) failures.push(`${label}: ${serumsInRoutine.length} serums in one routine`)

          // Toner and exfoliation stay out for "often" reactive skin.
          if (often && daily.includes(CORE.toner)) failures.push(`${label}: toner on often-reactive skin`)
          if (!often && !daily.includes(CORE.toner)) failures.push(`${label}: missing toner`)
          if (often && (result.weekly || result.bonus?.id === CORE.tripleglow)) {
            failures.push(`${label}: exfoliating cleanser on often-reactive skin`)
          }
          if (often !== result.tonerOmitted) failures.push(`${label}: tonerOmitted flag is wrong`)
          if (often && stepsPreference === 'minimal') {
            if (!result.tonerSwap || ![CORE.ha, CORE.matrix].includes(result.tonerSwap.id)) {
              failures.push(`${label}: toner not swapped for a calming serum`)
            }
          } else if (result.tonerSwap) {
            failures.push(`${label}: unexpected toner swap`)
          }

          // Serum placement
          if (stepsPreference !== 'minimal' && !daily.includes(result.serum.id)) {
            failures.push(`${label}: top serum ${result.serum.id} missing from routine`)
          }
          if (stepsPreference === 'minimal' && !often && serumsInRoutine.length) {
            failures.push(`${label}: serum in an Essentials routine`)
          }
          const offer = optionalTreat(answers)
          if (stepsPreference === 'minimal' && !often) {
            if (offer?.id !== result.serum.id) failures.push(`${label}: Essentials offer is not the top serum`)
          } else if (offer) {
            failures.push(`${label}: unexpected Essentials serum offer`)
          }
          if (result.alternative) {
            if (daily.includes(result.alternative.id)) failures.push(`${label}: alternative already in routine`)
            if (offer && result.alternative.id === offer.id) failures.push(`${label}: alternative equals the offer`)
          }

          // Vitamin C strength
          const expectedC = has('Acne') || reactive ? CORE.c5 : CORE.c20
          if (recommendedVitaminCId(answers) !== expectedC) failures.push(`${label}: wrong recommended vitamin C`)
          for (const p of [result.serum, result.alternative, ...result.products]) {
            if (p && (p.id === CORE.c5 || p.id === CORE.c20) && p.id !== expectedC) {
              failures.push(`${label}: ${p.id} recommended, expected ${expectedC}`)
            }
          }
          if (reactive && daily.includes(CORE.c20)) failures.push(`${label}: 20% C on reactive skin`)

          // Cleanser and moisturizer
          const expectedCleanser =
            skinType === 'Dry' || reactive
              ? CORE.chamomile
              : skinType === 'Oily' || has('Acne') || has('Large Pores') || has('Oily Skin')
                ? CORE.gel
                : CORE.chamomile
          if (daily[0] !== expectedCleanser) failures.push(`${label}: cleanser ${daily[0]} != ${expectedCleanser}`)
          const expectedMoisturizer =
            skinType === 'Dry' || has('Dryness') || (often && skinType !== 'Oily') ? CORE.rich : CORE.cloud
          if (!daily.includes(expectedMoisturizer)) failures.push(`${label}: moisturizer ${expectedMoisturizer} missing`)

          // Eye cream, oil, weekly
          const complete = stepsPreference === 'complete'
          if (complete !== daily.includes(CORE.eye)) failures.push(`${label}: eye cream should be ${complete ? 'in' : 'out'}`)
          const expectsOil = complete && !has('Acne') && !has('Oily Skin')
          if (expectsOil !== daily.includes(CORE.oil)) failures.push(`${label}: oil should be ${expectsOil ? 'in' : 'out'}`)
          if (daily.includes(CORE.tripleglow)) failures.push(`${label}: TripleGlow in daily routine`)
          if (result.weekly && (!complete || skinType === 'Dry' || reactive)) {
            failures.push(`${label}: weekly exfoliant where it is excluded`)
          }
          if (result.bonus && (daily.includes(result.bonus.id) || result.bonus.id === result.weekly?.id)) {
            failures.push(`${label}: bonus pick already in the routine`)
          }

          // Order independence
          const reordered = { ...answers, concerns: shuffled(concerns, checked) }
          if (JSON.stringify(scoreSerums(answers)) !== JSON.stringify(scoreSerums(reordered))) {
            failures.push(`${label}: concern order changed the scores`)
          }

          // AM/PM split
          const routine = splitRoutine(result.products)
          const ids = (lines: typeof routine.morning) => lines.flatMap(l => (l.kind === 'product' ? [l.product.id] : []))
          const morningIds = ids(routine.morning)
          const eveningIds = ids(routine.evening)
          if (!routine.morning.some(l => l.kind === 'protect')) failures.push(`${label}: morning missing Protect guidance`)
          if (morningIds.includes(CORE.bakuchiol)) failures.push(`${label}: Bakuchiol in morning routine`)
          if (daily.includes(CORE.bakuchiol) && !eveningIds.includes(CORE.bakuchiol)) {
            failures.push(`${label}: Bakuchiol missing from evening routine`)
          }
          const entries = routineEntries(result.products)
          if (entries.length !== result.products.length) failures.push(`${label}: routine entries mismatch`)
          for (const entry of entries) {
            if (!morningIds.includes(entry.product.id) && !eveningIds.includes(entry.product.id)) {
              failures.push(`${label}: ${entry.product.id} is in neither routine`)
            }
          }
        }
      }
    }
  }
}

const neverTop = [...SERUMS].filter(id => !seenTopSerums.has(id))
if (neverTop.length) failures.push(`serums never the top pick: ${neverTop.join(', ')}`)
const neverDaily = PRODUCTS.map(p => p.id).filter(id => id !== CORE.tripleglow && !seenDaily.has(id))
if (neverDaily.length) failures.push(`products never in a routine: ${neverDaily.join(', ')}`)

console.log(`Checked ${checked} quiz combinations`)
console.log(`Top serums seen: ${[...seenTopSerums].sort().join(', ')}`)
if (failures.length) {
  console.error(`FAILED ${failures.length} checks`)
  failures.slice(0, 40).forEach(f => console.error(' - ' + f))
  if (failures.length > 40) console.error(` ... and ${failures.length - 40} more`)
  process.exit(1)
}
console.log('All quiz paths passed')
