import {
  buildProtocol,
  DEFAULT_FUN_QUESTION,
  funQuestionById,
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

/** Non-empty Q5 multi-select combos for the default upgrade question. */
function funAnswerSubsets(): string[][] {
  const values = funQuestionById(DEFAULT_FUN_QUESTION).options.map(o => o.value)
  const out: string[][] = [[]]
  for (const value of values) {
    for (let i = 0, n = out.length; i < n; i++) out.push([...out[i], value])
  }
  return out.filter(set => set.length > 0)
}

const concernsList = concernSubsets()
const funList = funAnswerSubsets()
const keys = { minimal: 'three', moderate: 'four', complete: 'six' } as const

console.log(`funAnswer combos=${funList.length}; per choice=${QUIZ_SKIN_TYPES.length * concernsList.length * REACTIVITY.length * funList.length}`)

for (const steps of STEPS) {
  const inRoutine = Object.fromEntries(IDS.map(id => [id, 0])) as Record<string, number>
  const also = Object.fromEntries(IDS.map(id => [id, 0])) as Record<string, number>
  let n = 0
  for (const skinType of QUIZ_SKIN_TYPES) {
    for (const concerns of concernsList) {
      for (const reactivity of REACTIVITY) {
        for (const funAnswers of funList) {
          const answers: ProtocolAnswers = { skinType, concerns, reactivity, stepsPreference: steps, funAnswers }
          const result = buildProtocol(answers)
          n++
          for (const p of result.products) inRoutine[p.id]++
          if (result.weekly) inRoutine[result.weekly.id]++
          if (result.alternative) also[result.alternative.id]++
          if (result.cleanserAlternative) also[result.cleanserAlternative.id]++
        }
      }
    }
  }
  console.log(`${keys[steps]} n=${n}`)
  console.log(`IN_ROUTINE.${keys[steps]} = [${IDS.map(id => inRoutine[id]).join(', ')}]`)
  console.log(`ALSO_CONSIDER.${keys[steps]} = [${IDS.map(id => also[id]).join(', ')}]`)
}
