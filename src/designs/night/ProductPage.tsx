import { useState } from 'react'
import { PRODUCTS } from '../../data'
import Bottle from '../Bottle'
import { relatedProducts, stepLabel, type DesignNavigate } from '../shared'

interface ProductPageProps {
  productId: string
  onNavigate: DesignNavigate
  onAdd: () => void
}

export default function ProductPage({ productId, onNavigate, onAdd }: ProductPageProps) {
  const product = PRODUCTS.find(item => item.id === productId)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="px-6 py-24">
        <p className="font-display text-4xl italic">Not in the collection.</p>
        <button type="button" onClick={() => onNavigate('shop')} className="d-line mt-6">Back</button>
      </div>
    )
  }

  const related = relatedProducts(product)

  return (
    <article>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <Bottle src={product.image} alt={product.name} className="d-bottle-stage" />
        <div>
          <button type="button" onClick={() => onNavigate('shop')} className="text-[11px] tracking-[0.2em] uppercase text-[var(--d-accent)]">
            Collection
          </button>
          <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-[var(--d-muted)]">{stepLabel(product.protocolStep)}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display max-w-md text-3xl italic leading-tight md:text-4xl">{product.name}</h1>
            <p className="text-xl text-[var(--d-accent)]">${product.price}</p>
          </div>
          <p className="mt-3 text-sm text-[var(--d-muted)]">{product.size} · {product.reviews} reviews</p>
          <p className="mt-8 max-w-lg leading-relaxed text-[var(--d-muted)]">{product.description}</p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--d-ink)]">
            Kept because it earns the step. The line is a family standard from New York, and it is never tested on animals.
          </p>
          <button
            type="button"
            className="d-fill mt-8"
            onClick={() => {
              onAdd()
              setAdded(true)
              window.setTimeout(() => setAdded(false), 1400)
            }}
          >
            {added ? 'Added' : 'Add to bag'}
          </button>
          <div className="mt-12 grid gap-8 border-t border-[var(--d-line)] pt-8 md:grid-cols-2">
            <div>
              <h2 className="text-[11px] tracking-[0.18em] uppercase text-[var(--d-accent)]">Good for</h2>
              <p className="mt-3 text-sm leading-relaxed">{product.goodFor}</p>
            </div>
            <div>
              <h2 className="text-[11px] tracking-[0.18em] uppercase text-[var(--d-accent)]">How to use</h2>
              <p className="mt-3 text-sm leading-relaxed">{product.howToUse}</p>
            </div>
          </div>
          <ul className="mt-8 space-y-4">
            {product.keyIngredients.map(item => (
              <li key={item.name} className="border-t border-[var(--d-line)] pt-4">
                <p className="text-[var(--d-accent)]">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--d-muted)]">{item.benefit}</p>
              </li>
            ))}
          </ul>
          <details className="mt-8 border-t border-[var(--d-line)] pt-4">
            <summary className="cursor-pointer text-[11px] tracking-[0.18em] uppercase text-[var(--d-accent)]">Full ingredient list</summary>
            <p className="mt-3 text-sm leading-relaxed text-[var(--d-muted)]">{product.fullIngredients.join(', ')}</p>
          </details>
        </div>
      </div>
      <section className="mt-12 border-t border-[var(--d-line)] pt-8">
        <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--d-muted)]">Continue</p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:gap-10">
          {related.map(item => (
            <button key={item.id} type="button" onClick={() => onNavigate('product', item.id)} className="text-left">
              <span className="text-base">{item.name}</span>
              <span className="mt-1 block text-sm text-[var(--d-accent)]">${item.price}</span>
            </button>
          ))}
        </div>
      </section>
    </article>
  )
}
