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
      <h1 className="font-display text-3xl italic md:text-4xl">The line</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--d-muted)]">
        Short on purpose. Each bottle earns the step it sits in. Choose the one your skin is actually asking for.
      </p>
      <div className="mt-6 flex gap-5 overflow-x-auto border-b border-[var(--d-line)]">
        <button
          type="button"
          onClick={() => setStep('all')}
          className={`shrink-0 pb-3 text-[11px] tracking-[0.16em] uppercase ${step === 'all' ? 'border-b border-[var(--d-accent)] text-[var(--d-accent)]' : 'text-[var(--d-muted)]'}`}
        >
          All
        </button>
        {SHOP_STEPS.map(item => (
          <button
            key={item.step}
            type="button"
            onClick={() => setStep(item.step)}
            className={`shrink-0 pb-3 text-[11px] tracking-[0.16em] uppercase ${step === item.step ? 'border-b border-[var(--d-accent)] text-[var(--d-accent)]' : 'text-[var(--d-muted)]'}`}
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
            <span className="mt-3 block text-[10px] tracking-[0.16em] uppercase text-[var(--d-accent)]">{stepLabel(product.protocolStep)}</span>
            <span className="mt-1 flex items-start justify-between gap-3">
              <span className="text-sm leading-snug">{product.name}</span>
              <span className="shrink-0 text-sm text-[var(--d-accent)]">${product.price}</span>
            </span>
            <span className="mt-1 block text-sm text-[var(--d-muted)]">{product.size}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
