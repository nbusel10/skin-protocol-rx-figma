import { useEffect } from 'react'
import type { DesignNavigate } from '../shared'
import { Assessment, Collection, ConcernPills, FounderCards, SpaClose, Steps, scrollTo } from '../pitch/sections'
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
          <h1 className="heading">Your skin deserves <em>thoughtful</em> care.</h1>
          <p className="lead">A family-created collection of thoughtfully selected ingredients and formulas, bringing professional skincare into your everyday routine.</p>
          <div className="buttons">
            <button type="button" className="btn" onClick={() => scrollTo('collection')}>Explore the Collection ↗</button>
            <button type="button" className="btn outline" onClick={() => scrollTo('quiz')}>Take the Quiz ↗</button>
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
      <section className="section">
        <div className="wrap a-feature">
          <div>
            <span className="eyebrow">The philosophy</span>
            <h2 className="heading">Good skincare does not have to be <em>complicated.</em></h2>
          </div>
          <div>
            <p className="intro">We believe in a considered approach: formulas chosen for what they do, rather than how many ingredients they contain. Start with what your skin needs and build from there.</p>
            <button type="button" className="micro-link" onClick={() => scrollTo('routine')}>See how a routine comes together ↗</button>
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
          <Steps dark callout action={{ label: 'Find your starting point ↗', id: 'concerns', light: true }} />
        </div>
      </section>
      <section className="section" id="collection">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Explore the collection</span>
              <h2 className="heading">The essentials, thoughtfully chosen.</h2>
            </div>
            <button type="button" className="micro-link" onClick={() => scrollTo('concerns')}>Shop by skin concern ↗</button>
          </div>
          <Collection onNavigate={onNavigate} linkLabel="Find it in your protocol ↗" />
        </div>
      </section>
      <section className="section" id="concerns" style={{ background: '#e8d3cc' }}>
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Explore by need</span>
              <h2 className="heading">What would you like to focus on?</h2>
            </div>
          </div>
          <ConcernPills message="Choose a concern to preview the future Shopify shopping journey." />
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
