/** Client-facing quiz coverage: how often each product is recommended by routine-size choice. */

const PER_CHOICE = 4096
const ALL_COMBINATIONS = PER_CHOICE * 3

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

const COUNTS = {
  three: [2688, 1408, 3072, 0, 0, 0, 0, 728, 296, 0, 0, 2816, 1280, 0, 0],
  four: [2688, 1408, 3072, 2934, 420, 465, 84, 142, 20, 31, 0, 2816, 1280, 0, 0],
  six: [2688, 1408, 3072, 2934, 420, 465, 84, 142, 20, 31, 4096, 2816, 1280, 1024, 1524],
} as const

const SERIES = [
  { key: 'three' as const, label: '3 products', color: '#9A958C' },
  { key: 'four' as const, label: '4 products', color: '#6B8FAD' },
  { key: 'six' as const, label: 'Full (up to 6)', color: '#7A9B7E' },
]

function pct(count: number): number {
  return Math.round((count / PER_CHOICE) * 1000) / 10
}

function pctLabel(count: number): string {
  const value = pct(count)
  return value === 0 ? '0%' : `${value}%`
}

function shareOfAll(count: number): number {
  return Math.round((count / ALL_COMBINATIONS) * 1000) / 10
}

/** Runner-up serum shown as "Also consider". Summed across all 12,288 combinations. */
const ALSO_CONSIDER = [
  { name: 'Vitamin C 5%', three: 1051, four: 1269, six: 1269, total: 3589 },
  { name: 'Bakuchiol', three: 1387, four: 859, six: 859, total: 3105 },
  { name: 'Tri-peptide', three: 915, four: 1046, six: 1046, total: 3007 },
  { name: 'Hyaluronic Acid', three: 280, four: 409, six: 409, total: 1098 },
  { name: 'Vitamin C 20%', three: 296, four: 296, six: 296, total: 888 },
  { name: 'Matrix', three: 106, four: 156, six: 156, total: 418 },
  { name: 'Beauty Elixir', three: 55, four: 55, six: 55, total: 165 },
] as const

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
          combination was run — 4,096 per choice. Bars show how many of those answers include each product.
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
            Compare the three colored bars for one product. Example: Bakuchiol is 0% on the 3-product choice (no serum
            step), and about 72% on both the 4-product and full choices. Eye cream is only on the full choice (100%).
          </p>
        </div>

        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl tracking-[-0.02em]">Share of combinations by product</h2>
              <p className="mt-1 text-[13px] text-[#6D6A63]">
                % of the 4,096 answer combinations for that routine choice that include the product.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-[12px] font-medium">
              {SERIES.map(s => (
                <span key={s.key} className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: s.color }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5 md:p-6">
            {PRODUCTS.map((name, i) => (
              <div key={name}>
                <p className="mb-2 text-[13px] font-medium text-[#252520]">{name}</p>
                <div className="space-y-1.5">
                  {SERIES.map(s => {
                    const count = COUNTS[s.key][i]
                    const width = pct(count)
                    return (
                      <div key={s.key} className="grid grid-cols-[7.5rem_1fr_3.25rem] items-center gap-3">
                        <span className="text-[11px] tracking-wide text-[#6D6A63]">{s.label}</span>
                        <div className="h-3 bg-[#EDE8E0]">
                          <div
                            className="h-full transition-[width] duration-500"
                            style={{ width: `${Math.max(width, width > 0 ? 0.4 : 0)}%`, backgroundColor: s.color }}
                          />
                        </div>
                        <span className="text-right text-[12px] tabular-nums text-[#45403F]">{pctLabel(count)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-[#6D6A63]">
            Source: buildProtocol over 4 skin types × 256 concern sets × 4 reactivity answers, for each of the 3
            routine-size choices. TripleGlow is weekly only, never the daily cleanser.
          </p>
        </section>

        <section>
          <div className="mb-4">
            <h2 className="font-serif text-2xl tracking-[-0.02em]">Times each product is “Also consider”</h2>
            <p className="mt-1 text-[13px] text-[#6D6A63]">
              Total across all {ALL_COMBINATIONS.toLocaleString()} quiz combinations. “Also consider” is the next-ranked
              serum, shown as an alternative, not added to the routine. Cleansers, toner, creams, eye cream, oil, and
              TripleGlow are never the alternative.
            </p>
          </div>
          <div className="space-y-4 border border-[#D6CEC3] bg-[#FFFDFA] p-5 md:p-6">
            {ALSO_CONSIDER.map(item => {
              const width = shareOfAll(item.total)
              return (
                <div key={item.name}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <p className="text-[13px] font-medium text-[#252520]">{item.name}</p>
                    <p className="text-[12px] tabular-nums text-[#45403F]">
                      {item.total.toLocaleString()} · {width}%
                    </p>
                  </div>
                  <div className="h-3 bg-[#EDE8E0]">
                    <div className="h-full bg-[#ab8584]" style={{ width: `${Math.max(width, 0.4)}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 overflow-x-auto border border-[#D6CEC3] bg-[#FFFDFA]">
            <table className="min-w-full text-left text-[13px]">
              <thead className="border-b border-[#D6CEC3] bg-[#EDE8E0] text-[11px] tracking-[0.08em] text-[#6D6A63] uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Also consider</th>
                  <th className="px-4 py-3 font-semibold text-right">3 products</th>
                  <th className="px-4 py-3 font-semibold text-right">4 products</th>
                  <th className="px-4 py-3 font-semibold text-right">Full</th>
                  <th className="px-4 py-3 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {ALSO_CONSIDER.map(item => (
                  <tr key={item.name} className="border-b border-[#E8E2D8] last:border-0">
                    <td className="px-4 py-2.5 font-medium">{item.name}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{item.three.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{item.four.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{item.six.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[#6D6A63]">
            18 combinations have no alternative (6 per routine size), when only one serum scores. The 4-product and full
            choices match, because the runner-up serum does not depend on eye cream or oil.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-[-0.02em]">Exact counts</h2>
          <p className="mt-1 mb-4 text-[13px] text-[#6D6A63]">
            Out of 4,096 combinations per column. Toner is 75% (not 100%) because answering “Often” on reactivity drops
            the toner. On the 3-product choice, Hyaluronic Acid or Matrix can replace the toner when that happens.
          </p>
          <div className="overflow-x-auto border border-[#D6CEC3] bg-[#FFFDFA]">
            <table className="min-w-full text-left text-[13px]">
              <thead className="border-b border-[#D6CEC3] bg-[#EDE8E0] text-[11px] tracking-[0.08em] text-[#6D6A63] uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold text-right">3 count</th>
                  <th className="px-4 py-3 font-semibold text-right">3 %</th>
                  <th className="px-4 py-3 font-semibold text-right">4 count</th>
                  <th className="px-4 py-3 font-semibold text-right">4 %</th>
                  <th className="px-4 py-3 font-semibold text-right">Full count</th>
                  <th className="px-4 py-3 font-semibold text-right">Full %</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((name, i) => (
                  <tr key={name} className="border-b border-[#E8E2D8] last:border-0">
                    <td className="px-4 py-2.5 font-medium">{name}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{COUNTS.three[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{pctLabel(COUNTS.three[i])}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{COUNTS.four[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{pctLabel(COUNTS.four[i])}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{COUNTS.six[i].toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{pctLabel(COUNTS.six[i])}</td>
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
