import { useEffect } from 'react'
import type { DesignNavigate } from '../shared'
import { Assessment, Collection, FounderCards, SpaClose, Steps, scrollTo } from '../pitch/sections'
import { consumeSection } from '../pitch/ui'

interface HomePageProps {
  onNavigate: DesignNavigate
}

export default function HomePage({ onNavigate }: HomePageProps) {
  useEffect(() => {
    const id = consumeSection()
    if (id) scrollTo(id)
  }, [])

  return (
    <main>
      <section className="hero-a">
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
          <img className="full-image" alt="Skin Protocol RX collection in a sunlit spa setting" src="/v2-collection-lineup.jpg" />
        </div>
      </section>
      <div className="value-strip">
        <span>Family-created</span>
        <span>Science guided</span>
        <span>Never tested on animals</span>
      </div>
      <section className="section" id="philosophy">
        <div className="wrap">
          <div className="section-top" style={{ marginBottom: 28 }}>
            <div>
              <span className="eyebrow">Our philosophy</span>
              <h2 className="heading">Everything your skin needs.<br /><em>Nothing it doesn&apos;t.</em></h2>
            </div>
            <p className="intro" style={{ maxWidth: '34rem' }}>We formulate with thoughtfully selected actives and botanical ingredients, each chosen for a reason—to support healthy, resilient skin. Every product has a clear role in a simplified, effective routine. Our focus is on high-quality formulas and useful product education, without chasing trends or adding unnecessary extras.</p>
          </div>
          <div className="c-points" style={{ marginBottom: 34 }}>
            <div className="c-point"><div className="symbol">✳</div><div><strong>Thoughtfully selected</strong><span>Purposeful formulations. A protocol with purpose.</span></div></div>
            <div className="c-point"><div className="symbol">◌</div><div><strong>Tried and true</strong><span>Supported by research and evidence-based information.</span></div></div>
            <div className="c-point"><div className="symbol">✧</div><div><strong>Results without hype</strong><span>Backed by research. No unnecessary extras.</span></div></div>
            <div className="c-point"><div className="symbol">+</div><div><strong>Clinical intention</strong><span>Where clinical intention meets natural intelligence.</span></div></div>
            <div className="c-point"><div className="symbol">♡</div><div><strong>Never tested on animals</strong><span>A standard we hold, not a badge.</span></div></div>
            <div className="c-point"><div className="symbol">◎</div><div><strong>Expert founded</strong><span>Chemist · Nurse Practitioner · Esthetician</span></div></div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
            <a className="micro-link" href="/our-story#our-standards">Our Standards ↗</a>
            <a className="micro-link" href="/ingredient-glossary">Ingredient Glossary ↗</a>
            <a className="micro-link" href="/product-education">Product Education ↗</a>
          </div>
        </div>
      </section>
      <Assessment />
      <section className="section a-dark" id="routine">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow" style={{ color: '#d4acae' }}>A routine made for you</span>
              <h2 className="heading">Your skin. Your protocol.</h2>
            </div>
            <p className="intro">A simple foundation. Targeted care when you need it.</p>
          </div>
          <Steps dark callout action={{ label: 'See the collection ↗', id: 'collection', light: true }} />
        </div>
      </section>
      <section className="section" id="collection">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Explore the collection</span>
              <h2 className="heading">The essentials, thoughtfully chosen.</h2>
            </div>
            <button type="button" className="micro-link" onClick={() => scrollTo('quiz')}>Build your protocol ↗</button>
          </div>
          <Collection onNavigate={onNavigate} linkLabel="Find it in your protocol ↗" />
        </div>
      </section>
      <section className="section a-story" id="story" style={{ background: '#fffdf9' }}>
        <div className="wrap story-layout">
          <div>
            <span className="eyebrow">Our family story</span>
            <h2 className="heading">Three perspectives. One shared belief.</h2>
            <p className="intro">Created by a chemist, a nurse practitioner, and a licensed medical esthetician, Skin Protocol RX brings professional experience and personal care together.</p>
            <button type="button" className="micro-link" onClick={() => scrollTo('spa')}>Get to know the brand ↗</button>
          </div>
          <FounderCards lindaImage="/designs/boutique/founder-linda.jpg" />
        </div>
      </section>
      <SpaClose background="#e5dbd2" />
    </main>
  )
}
