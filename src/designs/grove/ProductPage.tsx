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
        <p className="font-display text-3xl">This bottle is not in the collection.</p>
        <button type="button" onClick={() => onNavigate('shop')} className="d-line mt-6">Back to the collection</button>
      </div>
    )
  }

  const related = relatedProducts(product)

  return (
    <article>
      <button type="button" onClick={() => onNavigate('shop')} className="text-sm text-[var(--d-accent)]">
        Collection
      </button>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
        <Bottle src={product.image} alt={product.name} className="d-bottle-stage" />
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--d-accent)]">{stepLabel(product.protocolStep)}</p>
          <h1 className="font-display mt-3 text-3xl leading-tight md:text-4xl">{product.name}</h1>
          <p className="mt-4 text-lg text-[var(--d-muted)]">{product.tagline}</p>
          <p className="mt-6 text-2xl">${product.price} <span className="text-base text-[var(--d-muted)]">{product.size}</span></p>
          <p className="mt-6 leading-relaxed text-[var(--d-muted)]">{product.description}</p>
          <p className="mt-4 text-sm leading-relaxed">
            One job in the day the family designed: cleanse, treat what you need, moisturize, and protect in the morning. This bottle does its part of that, and nothing extra.
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
          <div className="mt-10 space-y-6 border-t border-[var(--d-line)] pt-6">
            <div>
              <h2 className="font-display text-2xl">Good for</h2>
              <p className="mt-2 leading-relaxed text-[var(--d-muted)]">{product.goodFor}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl">How to use</h2>
              <p className="mt-2 leading-relaxed text-[var(--d-muted)]">{product.howToUse}</p>
            </div>
            <ul className="space-y-3">
              {product.keyIngredients.map(item => (
                <li key={item.name} className="border-l-2 border-[var(--d-accent)] pl-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-[var(--d-muted)]">{item.benefit}</p>
                </li>
              ))}
            </ul>
            <details>
              <summary className="cursor-pointer font-display text-2xl">Full ingredient list</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--d-muted)]">{product.fullIngredients.join(', ')}</p>
            </details>
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="font-display text-2xl">Alongside it</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
          {related.map(item => (
            <button key={item.id} type="button" onClick={() => onNavigate('product', item.id)} className="text-left">
              <Bottle src={item.image} alt={item.name} />
              <span className="mt-3 block text-sm leading-snug">{item.name}</span>
              <span className="text-sm text-[var(--d-muted)]">${item.price}</span>
            </button>
          ))}
        </div>
      </section>
    </article>
  )
}
