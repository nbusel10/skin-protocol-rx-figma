import { useMemo, useState } from 'react'
import { PRODUCTS } from '../data'
import { INGREDIENTS } from '../ingredients'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface IngredientGlossaryProps {
  onNavigate: (page: Page, productId?: string) => void
}

export default function IngredientGlossary({ onNavigate }: IngredientGlossaryProps) {
  const [query, setQuery] = useState('')
  const [letter, setLetter] = useState<string | null>(null)

  const letters = useMemo(() => {
    const set = new Set(INGREDIENTS.map(i => i.name[0].toUpperCase()))
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => set.has(l))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INGREDIENTS
      .filter(ing => {
        if (letter && ing.name[0].toUpperCase() !== letter) return false
        if (!q) return true
        return (
          ing.name.toLowerCase().includes(q) ||
          (ing.aka?.toLowerCase().includes(q) ?? false) ||
          ing.benefit.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [query, letter])

  return (
    <div className="bg-white font-sans min-h-[70vh]">
      <section className="bg-black py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Learn</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Ingredient Glossary</h1>
          <p className="text-white/55 leading-relaxed max-w-xl mx-auto">
            A clear reference for the purposeful ingredients in Skin Protocol RX formulas — what they do, why they&apos;re included, and which products contain them.
          </p>
        </div>
      </section>

      <section className="bg-ivory border-b border-gray-soft px-5 md:px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <label className="block">
            <span className="sr-only">Search ingredients</span>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search ingredients…"
              className="w-full border border-gray-soft bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-rose"
            />
          </label>
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            <button
              onClick={() => setLetter(null)}
              className="min-w-8 h-8 px-2 text-xs font-medium transition-colors"
              style={{
                backgroundColor: letter === null ? '#B8878B' : 'transparent',
                color: letter === null ? '#fff' : '#252525',
                border: letter === null ? 'none' : '1px solid #E5E5E5',
              }}
            >
              All
            </button>
            {letters.map(l => (
              <button
                key={l}
                onClick={() => setLetter(prev => (prev === l ? null : l))}
                className="w-8 h-8 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: letter === l ? '#B8878B' : 'transparent',
                  color: letter === l ? '#fff' : '#252525',
                  border: letter === l ? 'none' : '1px solid #E5E5E5',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-8">
            {filtered.length} ingredient{filtered.length === 1 ? '' : 's'}
          </p>

          {filtered.length === 0 ? (
            <p className="text-charcoal/50 text-sm">No ingredients match your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map(ing => {
                const products = ing.productIds
                  .map(id => PRODUCTS.find(p => p.id === id))
                  .filter(Boolean)

                return (
                  <article
                    key={ing.id}
                    className="border border-gray-soft bg-white p-6 md:p-7 flex flex-col gap-4"
                  >
                    <div>
                      <h2 className="font-serif text-xl text-charcoal mb-1">{ing.name}</h2>
                      {ing.aka && (
                        <p className="text-[11px] tracking-[0.2em] uppercase text-rose mb-3">
                          Also known as {ing.aka}
                        </p>
                      )}
                      <p className="text-sm text-charcoal/60 leading-relaxed">{ing.benefit}</p>
                    </div>
                    {products.length > 0 && (
                      <div>
                        <p className="text-[11px] tracking-widest uppercase text-charcoal/40 mb-2">
                          Found in
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {products.map(p => (
                            <button
                              key={p!.id}
                              onClick={() => onNavigate('product', p!.id)}
                              className="text-xs border border-gray-soft px-3 py-1.5 text-charcoal/70 hover:border-rose hover:text-rose transition-colors"
                            >
                              {p!.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}

          <div className="mt-16 pt-10 border-t border-gray-soft flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-black text-white px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-rose transition-colors"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => onNavigate('protocol')}
              className="border border-charcoal/20 text-charcoal px-7 py-3.5 text-sm tracking-wide font-medium hover:border-rose hover:text-rose transition-colors"
            >
              Build Your Protocol
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
