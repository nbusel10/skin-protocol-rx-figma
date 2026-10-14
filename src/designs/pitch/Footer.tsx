import type { DesignNavigate } from '../shared'
import { scrollTo } from './sections'

interface FooterProps {
  onNavigate: DesignNavigate
  onPicker: () => void
}

export default function Footer({ onNavigate, onPicker }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wordmark">SKIN PROTOCOL RX<span>THE NATURAL PRESCRIPTION</span></div>
      <p>Thoughtful skincare, made to fit real life.<br />Prototype layout · Shopify implementation pending</p>
      <div className="footlinks">
        <button type="button" onClick={() => onNavigate('shop')} style={{ background: 'none', border: 0, color: 'inherit' }}>Collection</button>
        <button type="button" onClick={() => scrollTo('routine')} style={{ background: 'none', border: 0, color: 'inherit' }}>Routine</button>
        <button type="button" onClick={() => scrollTo('story')} style={{ background: 'none', border: 0, color: 'inherit' }}>Our Story</button>
        <button type="button" onClick={onPicker} style={{ background: 'none', border: 0, color: 'inherit' }}>All designs</button>
      </div>
    </footer>
  )
}
