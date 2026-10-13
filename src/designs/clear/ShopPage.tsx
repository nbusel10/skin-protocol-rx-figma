import { useState } from 'react'
import { PRODUCTS } from '../../data'
import Bottle from '../Bottle'
import { SHOP_STEPS, stepLabel, type DesignNavigate } from '../shared'

interface ShopPageProps {
  onNavigate: DesignNavigate
}

export default function ShopPage({ onNavigate }: ShopPageProps) {
  const [step, setStep] = useState<number | 'all'>('all')
  const items = step === 'all' ? PRODUCTS : PRODUCTS.filter(product => product.protocolStep === step)

  return (
    <div>
      <h1 className="text-3xl font-medium tracking-tight md:text-4xl">The catalog, in order</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--d-muted)]">
        You do not need every formula. A protocol is one cleanser, one serum for your concern, and one moisturizer. Eye care and oil are optional. Morning still ends with sunscreen.
      </p>
      <div className="mt-6 flex gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setStep('all')}
          className={`shrink-0 px-1 py-2 text-sm ${step === 'all' ? 'font-semibold text-[var(--d-accent)]' : ''}`}
        >
          All
        </button>
        {SHOP_STEPS.map(item => (
          <button
            key={item.step}
            type="button"
            onClick={() => setStep(item.step)}
            className={`shrink-0 px-1 py-2 text-sm ${step === item.step ? 'font-semibold text-[var(--d-accent)]' : ''}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
        {items.map(product => (
          <button
            key={product.id}
            type="button"
            onClick={() => onNavigate('product', product.id)}
            className="text-left"
          >
            <Bottle src={product.image} alt={product.name} />
            <p className="mt-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--d-accent)]">
              {stepLabel(product.protocolStep)}
            </p>
            <span className="mt-1 flex items-start justify-between gap-3">
              <span className="text-sm font-medium leading-snug">{product.name}</span>
              <span className="shrink-0 text-sm tabular-nums">${product.price}</span>
            </span>
            <span className="mt-1 block text-sm text-[var(--d-muted)]">{product.size}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
