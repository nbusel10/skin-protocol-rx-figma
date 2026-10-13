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
        <p>This formula is not in the catalog.</p>
        <button type="button" onClick={() => onNavigate('shop')} className="d-line mt-6">Back to the catalog</button>
      </div>
    )
  }

  const related = relatedProducts(product)

  return (
    <article>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <Bottle src={product.image} alt={product.name} className="d-bottle-stage" />
        <div>
          <button type="button" onClick={() => onNavigate('shop')} className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--d-accent)]">
            Catalog
          </button>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--d-accent)]">
            {stepLabel(product.protocolStep)}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">{product.name}</h1>
          <div className="mt-4 flex items-baseline justify-between border-b border-[var(--d-line)] pb-4">
            <p className="text-2xl font-medium tabular-nums">${product.price}</p>
            <p className="text-sm text-[var(--d-muted)]">{product.size}</p>
          </div>
          <p className="mt-3 text-sm text-[var(--d-muted)]">{product.rating} · {product.reviews} reviews</p>
          <p className="mt-6 leading-relaxed text-[var(--d-muted)]">{product.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink)]">
            It belongs in a protocol, not a crowded shelf. Family-owned in New York. Never tested on animals.
          </p>
          <button
            type="button"
            className="d-fill mt-8 w-full"
            onClick={() => {
              onAdd()
              setAdded(true)
              window.setTimeout(() => setAdded(false), 1400)
            }}
          >
            {added ? 'Added to bag' : 'Add to bag'}
          </button>
          <dl className="mt-10 border-t border-[var(--d-line)]">
            <div className="grid gap-2 border-b border-[var(--d-line)] py-4 md:grid-cols-[8rem_1fr]">
              <dt className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--d-muted)]">Good for</dt>
              <dd className="text-sm leading-relaxed">{product.goodFor}</dd>
            </div>
            <div className="grid gap-2 border-b border-[var(--d-line)] py-4 md:grid-cols-[8rem_1fr]">
              <dt className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--d-muted)]">How to use</dt>
              <dd className="text-sm leading-relaxed">{product.howToUse}</dd>
            </div>
            {product.keyIngredients.map(item => (
              <div key={item.name} className="grid gap-2 border-b border-[var(--d-line)] py-4 md:grid-cols-[8rem_1fr]">
                <dt className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--d-muted)]">Ingredient</dt>
                <dd className="text-sm leading-relaxed">
                  <span className="font-medium text-[var(--d-ink)]">{item.name}. </span>
                  {item.benefit}
                </dd>
              </div>
            ))}
          </dl>
          <details className="border-b border-[var(--d-line)] py-4">
            <summary className="cursor-pointer text-[11px] font-semibold tracking-[0.16em] uppercase">Full ingredient list</summary>
            <p className="mt-3 text-sm leading-relaxed text-[var(--d-muted)]">{product.fullIngredients.join(', ')}</p>
          </details>
        </div>
      </div>
      <section className="mt-12 border-t border-[var(--d-line)] pt-8">
        <h2 className="text-xl font-medium tracking-tight">Also in the catalog</h2>
        <div className="mt-4 border-t border-[var(--d-line)]">
          {related.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate('product', item.id)}
              className="flex w-full items-center justify-between gap-4 border-b border-[var(--d-line)] py-4 text-left"
            >
              <span>
                <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--d-accent)]">{stepLabel(item.protocolStep)}</span>
                <span className="mt-1 block font-medium">{item.name}</span>
              </span>
              <span className="tabular-nums">${item.price}</span>
            </button>
          ))}
        </div>
      </section>
    </article>
  )
}
