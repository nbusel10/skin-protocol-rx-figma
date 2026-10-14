import { useState } from 'react'
import { PRODUCTS } from '../../data'
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
      <div className="py-16">
        <p>This formula is not in the catalog.</p>
        <button type="button" onClick={() => onNavigate('shop')} className="mt-4 underline">Back to the catalog</button>
      </div>
    )
  }

  const related = relatedProducts(product)

  return (
    <article>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center bg-[#F3EEE7] p-8">
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
        </div>
        <div>
          <button type="button" onClick={() => onNavigate('shop')} className="text-[11px] font-semibold tracking-[0.16em] text-[#B88E91] uppercase">Catalog</button>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] text-[#B88E91] uppercase">{stepLabel(product.protocolStep)}</p>
          <h1 className="mt-2 font-serif text-4xl tracking-[-0.03em]">{product.name}</h1>
          <div className="mt-4 flex items-baseline justify-between border-b border-[#DED7CE] pb-4">
            <p className="text-2xl tabular-nums">${product.price}</p>
            <p className="text-sm text-[#6E6763]">{product.size}</p>
          </div>
          <p className="mt-6 leading-relaxed text-[#6E6763]">{product.description}</p>
          <button
            type="button"
            className="mt-8 min-h-12 w-full bg-[#45403F] text-[12px] font-semibold tracking-[0.14em] text-white uppercase"
            onClick={() => {
              onAdd()
              setAdded(true)
              window.setTimeout(() => setAdded(false), 1400)
            }}
          >
            {added ? 'Added to bag' : 'Add to bag'}
          </button>
        </div>
      </div>
      <section className="mt-12 border-t border-[#DED7CE] pt-8">
        <h2 className="font-serif text-2xl">Also in the catalog</h2>
        <div className="mt-4">
          {related.map(item => (
            <button key={item.id} type="button" onClick={() => onNavigate('product', item.id)} className="flex min-h-16 w-full items-center justify-between gap-4 border-b border-[#DED7CE] py-3 text-left">
              <span>
                <span className="block text-[11px] font-semibold tracking-[0.14em] text-[#B88E91] uppercase">{stepLabel(item.protocolStep)}</span>
                <span className="mt-1 block">{item.name}</span>
              </span>
              <span className="tabular-nums">${item.price}</span>
            </button>
          ))}
        </div>
      </section>
    </article>
  )
}
