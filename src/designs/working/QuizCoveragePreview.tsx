/** Client-facing quiz coverage: how often each product is recommended by routine-size choice. */

const PER_CHOICE = 4096

const PRODUCTS = [
  'Chamomile cleanser',
  'Gel cleanser',
  'Toner',
  'Bakuchiol',
  'Tri-peptide',
  'Vitamin C 5%',
  'Vitamin C 20%',
  'Hyaluronic Acid',
  'Matrix',
  'Beauty Elixir',
  'Eye cream',
  'Rich cream',
  'Cloud cream',
  'Holy Grail Oil',
  'TripleGlow (weekly)',
] as const

/** Times each product is in the recommended routine. */
const IN_ROUTINE = {
  three: [2996, 1100, 3072, 0, 0, 0, 0, 608, 416, 0, 0, 2816, 1280, 0, 0],
  four: [2996, 1100, 3072, 2958, 435, 467, 84, 24, 24, 104, 0, 2816, 1280, 0, 0],
  six: [2996, 1100, 3072, 2958, 435, 467, 84, 24, 24, 104, 4096, 2816, 1280, 1024, 1524],
} as const

/**
 * Times each product is an "Also consider" runner-up (serum or daily cleanser).
 * Index order matches PRODUCTS. Toner, creams, eye cream, oil, and TripleGlow stay 0.
 */
const ALSO_CONSIDER = {
  three: [1008, 2888, 0, 1373, 950, 1106, 296, 61, 125, 179, 0, 0, 0, 0, 0],
  four: [1008, 2888, 0, 840, 1100, 1354, 296, 115, 189, 196, 0, 0, 0, 0, 0],
  six: [1008, 2888, 0, 840, 1100, 1354, 296, 115, 189, 196, 0, 0, 0, 0, 0],
} as const

const GROUPS = [
  {
    sizeKey: 'three' as const,
    sizeLabel: '3 products',
    sizeColor: '#9A958C',
    alsoLabel: 'Also · 3',
  },
  {
    sizeKey: 'four' as const,
    sizeLabel: '4 products',
    sizeColor: '#6B8FAD',
    alsoLabel: 'Also · 4',
  },
  {
    sizeKey: 'six' as const,
    sizeLabel: 'Full (up to 6)',
    sizeColor: '#7A9B7E',
    alsoLabel: 'Also · Full',
  },
] as const

const ALSO_COLOR = '#ab8584'

function pct(count: number): number {
  return Math.round((count / PER_CHOICE) * 1000) / 10
}

function pctLabel(count: number): string {
  const value = pct(count)
  return value === 0 ? '0%' : `${value}%`
}

export default function QuizCoveragePreview() {
  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#252520]">
      <div className="border-b border-[#D6CEC3] bg-[#FFFDFA]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-[#ab8584] uppercase">Quiz coverage</p>
            <h1 className="mt-1 font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight tracking-[-0.03em]">
              How often each product is recommended
            </h1>
          </div>
          <a
            href="/designs/working"
            className="text-[12px] font-semibold tracking-[0.08em] text-[#6D6A63] uppercase underline-offset-4 hover:text-[#ab8584] hover:underline"
          >
            ← Back to Working
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-10 md:px-10 md:py-14">
        <p className="max-w-3xl text-[16px] leading-relaxed text-[#595750]">
          For each routine-size choice in the quiz (3 products, 4 products, or full up to 6), every other answer
          combination was run — 4,096 per choice. Bars show how many of those answers include each product in the
          routine, or as an “Also consider” alternative serum or daily cleanser.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ['4,096', 'Combinations for 3-product choice'],
            ['4,096', 'Combinations for 4-product choice'],
            ['4,096', 'Combinations for full (up to 6)'],
          ].map(([value, label]) => (
            <div key={label} className="border border-[#D6CEC3] bg-[#FFFDFA] px-5 py-4">
              <p className="font-serif text-3xl tracking-[-0.03em]">{value}</p>
              <p className="mt-1 text-[13px] text-[#6D6A63]">{label}</p>
            </div>
          ))}
        </div>

        <div className="border border-[#D6CEC3] bg-[#EDE8E0] px-5 py-4 text-[14px] leading-relaxed text-[#45403F]">
          <p className="font-semibold text-[#252520]">How to read the chart</p>
          <p className="mt-1">
            For each product, the gray / blue / green bars are times it lands in the recommended routine. The rose bars
            are times it is an “Also consider” runner-up serum or daily cleanser. Example: Bakuchiol is never in the
            3-product routine (0%), but it is Also consider for about a third of those answers.
          </p>
        </div>

        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl tracking-[-0.02em]">Share of combinations by product</h2>
              <p className="mt-1 text-[13px] text-[#6D6A63]">
                % of the 4,096 answer combinations for that routine choice.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-[12px] font-medium">
              {GROUPS.map(g => (
                <span key={g.sizeKey} className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: g.sizeColor }} />
                  {g.sizeLabel}
                </span>
              ))}
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: ALSO_COLOR }} />
                Also consider
              </span>
            </div>
          </div>

          <div className="space-y-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5 md:p-6">
            {PRODUCTS.map((name, i) => (
              <div key={name}>
                <p className="mb-2 text-[13px] font-medium text-[#252520]">{name}</p>
                <div className="space-y-1.5">
                  {GROUPS.map(g => {
                    const inCount = IN_ROUTINE[g.sizeKey][i]
                    const alsoCount = ALSO_CONSIDER[g.sizeKey][i]
                    const inWidth = pct(inCount)
                    const alsoWidth = pct(alsoCount)
                    return (
                      <div key={g.sizeKey} className="space-y-1">
                        <div className="grid grid-cols-[7.5rem_1fr_3.25rem] items-center gap-3">
                          <span className="text-[11px] tracking-wide text-[#6D6A63]">{g.sizeLabel}</span>
                          <div className="h-3 bg-[#EDE8E0]">
                            <div
                              className="h-full"
                              style={{
                                width: `${Math.max(inWidth, inWidth > 0 ? 0.4 : 0)}%`,
                                backgroundColor: g.sizeColor,
                              }}
                            />
                          </div>
                          <span className="text-right text-[12px] tabular-nums text-[#45403F]">{pctLabel(inCount)}</span>
                        </div>
                        <div className="grid grid-cols-[7.5rem_1fr_3.25rem] items-center gap-3">
                          <span className="text-[11px] tracking-wide text-[#6D6A63]">{g.alsoLabel}</span>
                          <div className="h-3 bg-[#EDE8E0]">
                            <div
                              className="h-full"
                              style={{
                                width: `${Math.max(alsoWidth, alsoWidth > 0 ? 0.4 : 0)}%`,
                                backgroundColor: ALSO_COLOR,
                              }}
                            />
                          </div>
                          <span className="text-right text-[12px] tabular-nums text-[#45403F]">{pctLabel(alsoCount)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-[#6D6A63]">
            Source: buildProtocol over 4 skin types × 256 concern sets × 4 reactivity answers, for each of the 3
            routine-size choices. “Also consider” covers the next-ranked serum and the losing daily cleanser when it
            scored. Toner, creams, eye cream, oil, and TripleGlow are never the alternative. The 4-product and full
            Also-consider bars match, because runner-ups do not depend on eye cream or oil.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-[-0.02em]">Exact counts</h2>
          <p className="mt-1 mb-4 text-[13px] text-[#6D6A63]">
            Out of 4,096 combinations per routine-size column. In routine = placed in the protocol. Also = shown as
            “Also consider.”
          </p>
          <div className="overflow-x-auto border border-[#D6CEC3] bg-[#FFFDFA]">
            <table className="min-w-full text-left text-[13px]">
              <thead className="border-b border-[#D6CEC3] bg-[#EDE8E0] text-[11px] tracking-[0.08em] text-[#6D6A63] uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold text-right">3 in</th>
                  <th className="px-4 py-3 font-semibold text-right">3 also</th>
                  <th className="px-4 py-3 font-semibold text-right">4 in</th>
                  <th className="px-4 py-3 font-semibold text-right">4 also</th>
                  <th className="px-4 py-3 font-semibold text-right">Full in</th>
                  <th className="px-4 py-3 font-semibold text-right">Full also</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((name, i) => (
                  <tr key={name} className="border-b border-[#E8E2D8] last:border-0">
                    <td className="px-4 py-2.5 font-medium">{name}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{IN_ROUTINE.three[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{ALSO_CONSIDER.three[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{IN_ROUTINE.four[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{ALSO_CONSIDER.four[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{IN_ROUTINE.six[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{ALSO_CONSIDER.six[i].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="border border-[#D6B8A8] bg-[#F6EDE8] px-5 py-4 text-[14px] leading-relaxed text-[#45403F]">
          <p className="font-semibold text-[#252520]">Why the 4-product choice is not always 4 products</p>
          <p className="mt-1">
            If someone picks “4 products” but also answers “Often” on reactivity, the toner is left out, so the routine
            has 3 products (cleanser + serum + moisturizer). That happens in 1,024 of the 4,096 four-product
            combinations (25%). The full choice always includes eye cream; oil is only added when Acne and Oily Skin
            are not selected (25% of full combinations).
          </p>
        </div>
      </div>
    </div>
  )
}
