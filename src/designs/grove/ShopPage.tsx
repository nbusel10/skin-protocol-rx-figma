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
      <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--d-accent)]">The collection</p>
      <h1 className="font-display mt-2 text-3xl md:text-4xl">Walk the line the way the day goes.</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--d-muted)]">
        The same short line the family built in New York. Choose the step, then the bottle that does that one job. Leave the rest on the shelf.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStep('all')}
          className={`rounded-full px-3 py-1.5 text-sm ${step === 'all' ? 'bg-[var(--d-accent)] text-[#F6F3EA]' : 'bg-[var(--d-field)]'}`}
        >
          All
        </button>
        {SHOP_STEPS.map(item => (
          <button
            key={item.step}
            type="button"
            onClick={() => setStep(item.step)}
            className={`rounded-full px-3 py-1.5 text-sm ${step === item.step ? 'bg-[var(--d-accent)] text-[#F6F3EA]' : 'bg-[var(--d-field)]'}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
        {items.map(product => (
          <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="text-left">
            <Bottle src={product.image} alt={product.name} />
            <span className="mt-3 block text-[11px] tracking-[0.16em] uppercase text-[var(--d-accent)]">{stepLabel(product.protocolStep)}</span>
            <span className="mt-1 block text-sm leading-snug">{product.name}</span>
            <span className="mt-1 block text-sm text-[var(--d-muted)]">{product.size}</span>
            <span className="mt-1 block text-sm">${product.price}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
