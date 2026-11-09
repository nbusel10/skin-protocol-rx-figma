import {
  buildProtocol,
  QUIZ_CONCERNS,
  QUIZ_SKIN_TYPES,
  REACTIVITY_OPTIONS,
  type ProtocolAnswers,
  type StepsPreference,
} from '../src/lib/buildProtocol'

const STEPS: StepsPreference[] = ['minimal', 'moderate', 'complete']
const REACTIVITY = REACTIVITY_OPTIONS.map(r => r.value)

/** Order matches QuizCoveragePreview PRODUCTS. */
const IDS = [
  'clarifying-cleanser',
  'clarifying-gel-cleanser',
  'rosewater-niacinamide-toner',
  'bakuchiol-renewal-serum',
  'amino-acid-serum',
  'brighten-glow-c-5',
  'brighten-glow-c-20',
  'hyaluronic-acid-serum',
  'matrix-serum',
  'beauty-elixir-serum',
  'eye-cream',
  'rich-barrier-cream',
  'hydration-cloud-cream',
  'the-holy-grail',
  'tripleglow-exfoliating-cleanser',
] as const

function concernSubsets(): (typeof QUIZ_CONCERNS)[number][][] {
  const out: (typeof QUIZ_CONCERNS)[number][][] = []
  for (let mask = 0; mask < 1 << QUIZ_CONCERNS.length; mask++) {
    out.push(QUIZ_CONCERNS.filter((_, i) => mask & (1 << i)))
  }
  return out
}

const concernsList = concernSubsets()
const keys = { minimal: 'three', moderate: 'four', complete: 'six' } as const

for (const steps of STEPS) {
  const inRoutine = Object.fromEntries(IDS.map(id => [id, 0])) as Record<string, number>
  const also = Object.fromEntries(IDS.map(id => [id, 0])) as Record<string, number>
  let n = 0
  for (const skinType of QUIZ_SKIN_TYPES) {
    for (const concerns of concernsList) {
      for (const reactivity of REACTIVITY) {
        const answers: ProtocolAnswers = { skinType, concerns, reactivity, stepsPreference: steps }
        const result = buildProtocol(answers)
        n++
        for (const p of result.products) inRoutine[p.id]++
        if (result.weekly) inRoutine[result.weekly.id]++
        if (result.alternative) also[result.alternative.id]++
        if (result.cleanserAlternative) also[result.cleanserAlternative.id]++
      }
    }
  }
  console.log(`${keys[steps]} n=${n}`)
  console.log(`IN_ROUTINE.${keys[steps]} = [${IDS.map(id => inRoutine[id]).join(', ')}]`)
  console.log(`ALSO_CONSIDER.${keys[steps]} = [${IDS.map(id => also[id]).join(', ')}]`)
}
