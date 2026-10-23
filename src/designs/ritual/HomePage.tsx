import { useEffect, useState } from 'react'
import type { DesignNavigate } from '../shared'
import { Assessment, Collection, FounderCards, SpaClose, scrollTo } from '../pitch/sections'
import { consumeSection } from '../pitch/ui'
import ProtocolOverviewSection from '../ProtocolOverviewSection'

interface HomePageProps {
  onNavigate: DesignNavigate
}

const RIBBON_PHRASES = [
  'Skin science meets everyday care',
  'Created with expertise',
  'Never tested on animals',
  'Everything your skin needs',
  'Nothing it doesn\'t',
  'Thoughtfully selected',
  'Clinical intention',
  'Expert founded',
  'Purposeful formulations',
  'Family-created formulas',
]

function RibbonBanner() {
  const [paused, setPaused] = useState(false)
  const sequence = `${RIBBON_PHRASES.join('     ·     ')}     ·     `

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true)
    }
  }, [])

  return (
    <div className={`c-ribbon${paused ? ' is-paused' : ''}`}>
      <p className="c-ribbon-sr">{RIBBON_PHRASES.join('. ')}</p>
      <div className="c-ribbon-viewport" aria-hidden="true">
        <div className="c-ribbon-track">
          <span className="c-ribbon-group">{sequence}</span>
          <span className="c-ribbon-group">{sequence}</span>
        </div>
      </div>
      <button
        type="button"
        className="c-ribbon-pause"
        aria-pressed={paused}
        aria-label={paused ? 'Play scrolling banner' : 'Pause scrolling banner'}
        onClick={() => setPaused(p => !p)}
      >
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  )
}

export default function HomePage({ onNavigate }: HomePageProps) {
  useEffect(() => {
    const id = consumeSection()
    if (id) scrollTo(id)
  }, [])

  return (
    <main>
      <section className="hero-c">
        <div className="c-inner">
          <div className="copy">
            <span className="eyebrow">Skincare with intention</span>
            <h1 className="heading">Your Skin Doesn&apos;t Need More.<br /><em>It Needs What Works.</em></h1>
            <p className="lead">Each formula is constructed for performance — using only what the skin needs to function, repair, and improve. Formulated with proven actives chosen for performance, not trends. Thoughtfully selected ingredients and formulas, bringing professional skincare into your everyday routine. Every formulation is created with one goal: effective, evidence-driven skincare that supports long-term skin function. Just thoughtful formulas, professional insight, and a routine that feels right for you.</p>
            <div className="buttons">
              <button type="button" className="btn" onClick={() => scrollTo('collection')}>Explore the collection ↗</button>
              <button type="button" className="btn outline" onClick={() => scrollTo('quiz')}>Build your protocol ↗</button>
            </div>
          </div>
          <div className="scene">
            <img className="full-image" alt="Skin Protocol RX products photographed in a tranquil treatment room" src="/original/shop-hero.jpg" />
          </div>
        </div>
      </section>
      <RibbonBanner />
      <section className="section" id="philosophy">
        <div className="wrap c-philosophy">
          <div>
            <span className="eyebrow">Our philosophy</span>
            <h2 className="heading">Everything your skin needs.<br /><em>Nothing it doesn&apos;t.</em></h2>
            <p className="intro">We formulate with thoughtfully selected actives and botanical ingredients, each chosen for a reason—to support healthy, resilient skin. Every product has a clear role in a simplified, effective routine. Our focus is on high-quality formulas and useful product education, without chasing trends or adding unnecessary extras.</p>
            <div className="phil-link-row">
              <a className="phil-link" href="/our-story#our-standards">
                <span>
                  <span className="phil-link-title">Our Standards</span>
                  <span className="phil-link-body">How we decide what stays and what stays out.</span>
                </span>
                <span className="phil-link-arrow" aria-hidden="true">→</span>
              </a>
              <a className="phil-link" href="/ingredient-glossary">
                <span>
                  <span className="phil-link-title">Ingredient Glossary</span>
                  <span className="phil-link-body">See what is in the formulas and why.</span>
                </span>
                <span className="phil-link-arrow" aria-hidden="true">→</span>
              </a>
              <a className="phil-link" href="/product-education">
                <span>
                  <span className="phil-link-title">Product Education</span>
                  <span className="phil-link-body">Learn what each product is good for.</span>
                </span>
                <span className="phil-link-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="c-points c-points-grid">
            <div className="c-point"><div className="symbol">✳</div><div><strong>Thoughtfully selected</strong><span>Purposeful formulations. A protocol with purpose.</span></div></div>
            <div className="c-point"><div className="symbol">◌</div><div><strong>Tried and true</strong><span>Supported by research and evidence-based information.</span></div></div>
            <div className="c-point"><div className="symbol">✧</div><div><strong>Results without hype</strong><span>Backed by research. No unnecessary extras.</span></div></div>
            <div className="c-point"><div className="symbol">+</div><div><strong>Clinical intention</strong><span>Where clinical intention meets natural intelligence.</span></div></div>
            <div className="c-point"><div className="symbol">♡</div><div><strong>Never tested on animals</strong><span>A standard we hold, not a badge.</span></div></div>
            <div className="c-point"><div className="symbol">◎</div><div><strong>Expert founded</strong><span>Chemist · Nurse Practitioner · Esthetician</span></div></div>
          </div>
        </div>
      </section>
      <ProtocolOverviewSection
        tone="ritual"
        id="routine"
        onCta={() => scrollTo('quiz')}
      />
      <Assessment />
      <section className="section" id="collection" style={{ background: '#f1eae3' }}>
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Discover your essentials</span>
              <h2 className="heading">A collection made to work together.</h2>
            </div>
          </div>
          <Collection onNavigate={onNavigate} linkLabel="Find it in your protocol ↗" />
        </div>
      </section>
      <section className="section" id="story">
        <div className="wrap c-founder">
          <div>
            <span className="eyebrow">Meet our founders</span>
            <h2 className="heading">A family behind the formulas.</h2>
            <p className="intro">A chemist, a nurse practitioner, and a licensed medical esthetician came together around a simple conviction: caring for skin should feel clear, personal, and considered.</p>
            <button type="button" className="micro-link" onClick={() => scrollTo('spa')}>Our story ↗</button>
          </div>
          <FounderCards lindaImage="/designs/ritual/founder-linda.jpg" />
        </div>
      </section>
      <SpaClose background="#e4d3c8" />
    </main>
  )
}
