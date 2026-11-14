import { useMemo, useState } from 'react'
import { PRODUCTS } from '../../data'
import { INGREDIENTS } from '../../ingredients'
import { useSiteRoot } from './siteRoot'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const SECTION = 'px-6 text-[#252520] min-[681px]:px-[max(36px,8vw)]'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function letterClass(selected: boolean) {
  return [
    'min-h-8 min-w-8 px-2 text-xs font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]',
    selected
      ? 'border border-[#ab8584] bg-[#ab8584] text-white'
      : 'border border-[#D6C3C2] bg-transparent text-[#252520] hover:border-[#ab8584] hover:text-[#ab8584]',
  ].join(' ')
}

export default function IngredientGlossaryPage() {
  const site = useSiteRoot()
  const [query, setQuery] = useState('')
  const [letter, setLetter] = useState<string | null>(null)

  const letters = useMemo(() => {
    const present = new Set(INGREDIENTS.map(item => item.name[0].toUpperCase()))
    return ALPHABET.filter(item => present.has(item))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INGREDIENTS
      .filter(item => {
        if (letter && item.name[0].toUpperCase() !== letter) return false
        if (!q) return true
        return (
          item.name.toLowerCase().includes(q) ||
          (item.aka?.toLowerCase().includes(q) ?? false) ||
          item.benefit.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [query, letter])

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <section className="bg-[#2B2727] px-4 py-14 text-[#F7F4EF] sm:px-6 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className={`text-[#F7F4EF] ${HEADING}`}>Ingredient Glossary</h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#F7F4EF]/80">
            What is in the formulas, why it is there, and which products use it.
          </p>
        </div>
      </section>

      <section id="ingredient-search" className={`${SECTION} scroll-mt-28 border-b border-[#E4DCD3] bg-[#FFFDFA] py-8`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <label className="block">
            <span className="sr-only">Search ingredients</span>
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search ingredients"
              className="w-full border border-[#D6C3C2] bg-white px-3 py-3 text-sm text-[#252520] outline-none placeholder:text-[#A39E96] focus:border-[#ab8584]"
            />
          </label>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by letter">
            <button
              type="button"
              onClick={() => setLetter(null)}
              aria-pressed={letter === null}
              className={letterClass(letter === null)}
            >
              All
            </button>
            {letters.map(item => (
              <button
                key={item}
                type="button"
                onClick={() => setLetter(current => (current === item ? null : item))}
                aria-pressed={letter === item}
                className={letterClass(letter === item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-[#F7F4EF] py-14 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <p className={EYEBROW} aria-live="polite">
            {filtered.length} ingredient{filtered.length === 1 ? '' : 's'}
          </p>

          {filtered.length === 0 ? (
            <p className="mt-8 text-[15px] leading-relaxed text-[#595750]">No ingredients match that search.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {filtered.map(item => {
                const products = item.productIds
                  .map(id => PRODUCTS.find(product => product.id === id))
                  .filter(product => product != null)

                return (
                  <article
                    key={item.id}
                    id={item.id}
                    className="flex scroll-mt-28 flex-col gap-4 border border-[#D6C3C2] bg-[#fffdfa] px-6 py-7"
                  >
                    <div>
                      <h2 className="font-serif text-[clamp(26px,2vw,32px)] leading-[1.12] font-normal tracking-[-0.03em]">
                        {item.name}
                      </h2>
                      {item.aka ? (
                        <p className={`mt-2 ${EYEBROW}`}>Also known as {item.aka}</p>
                      ) : null}
                      <p className="mt-3 text-[15px] leading-relaxed text-[#595750]">{item.benefit}</p>
                    </div>
                    {products.length > 0 ? (
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#6D6A63] uppercase">Found in</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {products.map(product => (
                            <a
                              key={product.id}
                              href={site.product(product.id)}
                              className="border border-[#D6C3C2] px-3 py-1.5 text-xs text-[#252520] transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
                            >
                              {product.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </article>
                )
              })}
            </div>
          )}

          <div className="mt-16 flex flex-wrap gap-3 border-t border-[#E4DCD3] pt-10">
            <a
              href={site.shop}
              className="inline-flex min-h-12 items-center justify-center bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-colors duration-200 hover:bg-[#141412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
            >
              Explore the Collection
            </a>
            <a
              href={site.protocol}
              className="inline-flex min-h-12 items-center justify-center border border-[#252520]/70 bg-transparent px-5 text-[11px] font-semibold tracking-[0.1em] text-[#252520] uppercase transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
            >
              Build Your Protocol
            </a>
          </div>

          <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-[#6D6A63]">
            Ingredient descriptions are for educational purposes and reflect general cosmetic uses. They do not imply clinical testing or dermatologist endorsement of Skin Protocol RX products. This information does not replace professional medical advice.
          </p>
        </div>
      </section>
    </article>
  )
}
