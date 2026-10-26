import { PRODUCTS } from '../src/data'
import {
  buildProtocol,
  scoreSerums,
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
/** "Typical" shoppers pick up to this many concerns; "all" enumerates every subset. */
const TYPICAL_MAX_CONCERNS = 3

function concernSets(maxSize: number): QuizConcern[][] {
  const out: QuizConcern[][] = []
  for (let mask = 0; mask < 1 << QUIZ_CONCERNS.length; mask++) {
    const set = QUIZ_CONCERNS.filter((_, i) => mask & (1 << i))
    if (set.length <= maxSize) out.push(set)
  }
  return out
}

function baseAnswers(maxConcerns: number): ProtocolAnswers[] {
  const out: ProtocolAnswers[] = []
  for (const skinType of QUIZ_SKIN_TYPES)
    for (const concerns of concernSets(maxConcerns))
      for (const reactivity of REACTIVITY)
        for (const stepsPreference of STEPS) out.push({ skinType, concerns, reactivity, stepsPreference })
  return out
}

const name = (id: string) => PRODUCTS.find(p => p.id === id)?.name ?? id
const pct = (n: number, total: number) => Math.round((n / total) * 1000) / 10

interface Tally {
  combos: number
  daily: Record<string, number>
  topSerum: Record<string, number>
  alternative: Record<string, number>
  weekly: Record<string, number>
  bonus: Record<string, number>
  serumChanged: number
}

function tally(runs: { answers: ProtocolAnswers; baseTop: string }[]): Tally {
  const t: Tally = { combos: runs.length, daily: {}, topSerum: {}, alternative: {}, weekly: {}, bonus: {}, serumChanged: 0 }
  const bump = (rec: Record<string, number>, id: string) => (rec[id] = (rec[id] ?? 0) + 1)
  for (const { answers, baseTop } of runs) {
    const result = buildProtocol(answers)
    result.products.forEach(p => bump(t.daily, p.id))
    bump(t.topSerum, result.serum.id)
    if (result.alternative) bump(t.alternative, result.alternative.id)
    if (result.weekly) bump(t.weekly, result.weekly.id)
    if (result.bonus) bump(t.bonus, result.bonus.id)
    if (result.serum.id !== baseTop) t.serumChanged++
  }
  return t
}

function asPercents(t: Tally) {
  const conv = (rec: Record<string, number>) =>
    Object.fromEntries(
      Object.entries(rec)
        .sort((a, b) => b[1] - a[1])
        .map(([id, n]) => [name(id), pct(n, t.combos)]),
    )
  return {
    combos: t.combos,
    daily: conv(t.daily),
    topSerum: conv(t.topSerum),
    alternative: conv(t.alternative),
    weekly: conv(t.weekly),
    bonus: conv(t.bonus),
    serumChangedPct: pct(t.serumChanged, t.combos),
  }
}

function scenarios(maxConcerns: number) {
  const base = baseAnswers(maxConcerns)
  const baseTop = new Map(base.map(a => [JSON.stringify(a), buildProtocol(a).serum.id]))
  const lookup = (a: ProtocolAnswers) => baseTop.get(JSON.stringify(a))!

  const out: Record<string, ReturnType<typeof asPercents> & { byAnswer?: Record<string, ReturnType<typeof asPercents>> }> = {
    baseline: asPercents(tally(base.map(answers => ({ answers, baseTop: lookup(answers) })))),
  }
  for (const q of FUN_QUESTIONS) {
    const runs = base.flatMap(a => q.options.map(o => ({ answers: { ...a, funAnswer: o.value }, baseTop: lookup(a) })))
    const byAnswer = Object.fromEntries(
      q.options.map(o => [
        o.label,
        asPercents(tally(base.map(a => ({ answers: { ...a, funAnswer: o.value }, baseTop: lookup(a) })))),
      ]),
    )
    out[q.id] = { ...asPercents(tally(runs)), byAnswer }
  }
  return out
}

function singleConcernTable() {
  const rows: Record<string, Record<string, string>> = {}
  for (const concern of [...QUIZ_CONCERNS, null]) {
    const label = concern ?? 'No specific concerns'
    rows[label] = {}
    for (const skinType of QUIZ_SKIN_TYPES) {
      for (const reactivity of ['never', 'often'] as const) {
        const answers: ProtocolAnswers = {
          skinType,
          concerns: concern ? [concern] : [],
          reactivity,
          stepsPreference: 'moderate',
        }
        const r = buildProtocol(answers)
        rows[label][`${skinType} / ${reactivity}`] =
          `${r.serum.name}${r.alternative ? ` (alt: ${r.alternative.name})` : ''}`
      }
    }
  }
  return rows
}

function orderCheck() {
  let mismatches = 0
  for (const a of baseAnswers(QUIZ_CONCERNS.length)) {
    const reversed = { ...a, concerns: [...a.concerns].reverse() }
    if (JSON.stringify(scoreSerums(a)) !== JSON.stringify(scoreSerums(reversed))) mismatches++
  }
  return mismatches
}

const report = {
  typical: scenarios(TYPICAL_MAX_CONCERNS),
  all: scenarios(QUIZ_CONCERNS.length),
  singleConcern: singleConcernTable(),
  concernOrderMismatches: orderCheck(),
  funQuestions: FUN_QUESTIONS.map(q => ({ id: q.id, title: q.title, options: q.options })),
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2))
} else {
  for (const [label, set] of [['Typical (0-3 concerns)', report.typical], ['All combinations', report.all]] as const) {
    console.log(`\n=== ${label} ===`)
    for (const [scenario, data] of Object.entries(set)) {
      console.log(`\n-- ${scenario} (${data.combos} combos, serum changed by fun answer: ${data.serumChangedPct}%)`)
      console.log('Top serum %:', data.topSerum)
      console.log('Daily routine %:', data.daily)
      console.log('Alternative %:', data.alternative)
      if (Object.keys(data.bonus).length) console.log('Bonus %:', data.bonus)
    }
  }
  console.log('\n=== Single concern, moderate routine ===')
  console.table(report.singleConcern)
  console.log(`\nConcern-order mismatches: ${report.concernOrderMismatches}`)
}
