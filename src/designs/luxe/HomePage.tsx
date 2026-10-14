import { useEffect } from 'react'
import type { DesignNavigate } from '../shared'
import { Assessment, Collection, ConcernPills, FOUNDERS, SpaClose, Steps, scrollTo } from '../pitch/sections'
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
          <span className="eyebrow">Skin Protocol RX · The natural prescription</span>
          <h1 className="heading">Less noise.<br /><em>More intention.</em></h1>
          <p className="lead">Where considered formulations meet the quiet luxury of a routine that feels entirely your own.</p>
          <div className="buttons">
            <button type="button" className="btn" onClick={() => scrollTo('collection')}>Explore the Collection ↗</button>
            <button type="button" className="btn outline" onClick={() => scrollTo('quiz')}>Take the Quiz ↗</button>
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
          <button type="button" className="btn" onClick={() => scrollTo('concerns')}>Explore your skin needs ↗</button>
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
            <button type="button" className="micro-link" onClick={() => scrollTo('concerns')}>Browse by concern ↗</button>
          </div>
          <Collection onNavigate={onNavigate} linkLabel="Find it in your protocol ↗" />
        </div>
      </section>
      <div className="b-quote">
        <span className="eyebrow" style={{ color: '#6d494c' }}>What we believe</span>
        <h2 className="heading">“Your skin does not need more.<br /><em>It needs what works.</em>”</h2>
        <p>Cruelty-free · Never tested on animals</p>
      </div>
      <section className="section" id="concerns">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Explore by skin concern</span>
              <h2 className="heading">Start with what is on your mind.</h2>
            </div>
          </div>
          <ConcernPills message="Shopping filters will be connected to product information in Shopify." />
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
              <img key={person.name} className="full-image founder-graded" alt={person.name} src={person.image} style={{ objectPosition: '50% 20%', height: '100%' }} />
            ))}
          </div>
        </div>
      </section>
      <SpaClose />
    </main>
  )
}
