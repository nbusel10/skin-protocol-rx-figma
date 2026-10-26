import { useEffect } from 'react'
import type { DesignNavigate } from '../shared'
import { Assessment, Collection, FOUNDERS, SpaClose, Steps, scrollTo } from '../pitch/sections'
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
      <section className="hero-b">
        <img alt="Skin Protocol RX skincare range in a beautiful, naturally lit medspa" src="/original/spa-hero.jpg" />
        <div className="copy">
          <span className="eyebrow">Skincare with intention</span>
          <h1 className="heading">Your Skin Doesn&apos;t Need More.<br /><em>It Needs What Works.</em></h1>
          <p className="lead" style={{ maxWidth: '42rem' }}>Each formula is constructed for performance — using only what the skin needs to function, repair, and improve. Formulated with proven actives chosen for performance, not trends. Thoughtfully selected ingredients and formulas, bringing professional skincare into your everyday routine. Every formulation is created with one goal: effective, evidence-driven skincare that supports long-term skin function. Just thoughtful formulas, professional insight, and a routine that feels right for you.</p>
          <div className="buttons">
            <button type="button" className="btn" onClick={() => scrollTo('collection')}>Explore the collection ↗</button>
            <button type="button" className="btn outline" onClick={() => scrollTo('quiz')}>Build your protocol ↗</button>
          </div>
        </div>
      </section>
      <section className="section" id="philosophy" style={{ background: '#f4ebe4' }}>
        <div className="wrap">
          <div className="section-top" style={{ marginBottom: 30 }}>
            <div>
              <span className="eyebrow">Our philosophy</span>
              <h2 className="heading">Everything your skin needs.<br /><em>Nothing it doesn&apos;t.</em></h2>
            </div>
            <p className="intro" style={{ maxWidth: '34rem' }}>We formulate with thoughtfully selected actives and botanical ingredients, each chosen for a reason—to support healthy, resilient skin. Every product has a clear role in a simplified, effective routine. Our focus is on high-quality formulas and useful product education, without chasing trends or adding unnecessary extras.</p>
          </div>
          <div className="c-points" style={{ marginBottom: 32 }}>
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
      <section className="b-intro">
        <span className="eyebrow">Clinical knowledge. Human touch.</span>
        <h2 className="heading">Skincare should feel as considered as the care behind it.</h2>
        <p className="intro">Family-created formulas inspired by the experience of a chemist, nurse practitioner, and licensed medical esthetician. Designed to make a good routine feel a little simpler.</p>
      </section>
      <section className="b-split" id="routine">
        <div className="copy">
          <span className="eyebrow">The everyday ritual</span>
          <h2 className="heading">A few good steps. <em>One beautiful routine.</em></h2>
          <p className="intro">Cleansing. Thoughtful treatment. Daily hydration. Protection. Your protocol begins with a strong foundation and grows around your skin.</p>
          <button type="button" className="btn" onClick={() => scrollTo('quiz')}>Build your protocol ↗</button>
        </div>
        <div className="image">
          <img className="full-image" alt="A woman with glowing skin applying serum in warm light" src="/designs/luxe/ritual-glow.jpg" style={{ objectPosition: 'center 30%' }} />
        </div>
        <p className="product-callout">The homepage previews the quiz. The full guided experience will live on its own Build Your Protocol page.</p>
      </section>
      <Assessment />
      <section className="section" style={{ background: '#fbf7f1' }}>
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Built for real life</span>
              <h2 className="heading">The steps, without the excess.</h2>
            </div>
          </div>
          <Steps />
        </div>
      </section>
      <section className="section" id="collection">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">A curated collection</span>
              <h2 className="heading">Discover what belongs in your routine.</h2>
            </div>
            <button type="button" className="micro-link" onClick={() => scrollTo('quiz')}>Build your protocol ↗</button>
          </div>
          <Collection onNavigate={onNavigate} linkLabel="Find it in your protocol ↗" />
        </div>
      </section>
      <section className="b-split flip" id="story" style={{ background: '#eee5dc' }}>
        <div className="copy">
          <span className="eyebrow">Meet the founders</span>
          <h2 className="heading">Behind every formula, <em>a family.</em></h2>
          <p className="intro">Skin Protocol RX was created by a family that believes healthy skin should not require complicated routines or overloaded formulas.</p>
          <button type="button" className="micro-link" onClick={() => scrollTo('spa')}>Read our story ↗</button>
        </div>
        <div className="image" style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, width: '100%', minHeight: 450 }}>
            {FOUNDERS.map(person => (
              <img key={person.name} className="full-image founder-graded" alt={person.name} src={person.name.startsWith('Linda') ? '/designs/luxe/founder-linda.jpg' : person.image} style={{ objectPosition: '50% 20%', height: '100%' }} />
            ))}
          </div>
        </div>
      </section>
      <SpaClose />
    </main>
  )
}
