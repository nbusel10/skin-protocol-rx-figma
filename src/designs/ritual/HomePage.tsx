import { useEffect } from 'react'
import type { DesignNavigate } from '../shared'
import { Assessment, Collection, ConcernTiles, FounderCards, SpaClose, Steps, scrollTo } from '../pitch/sections'
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
      <section className="hero-c">
        <div className="c-inner">
          <div className="copy">
            <span className="eyebrow">The natural prescription</span>
            <h1 className="heading">A little less.<br /><em>A lot more you.</em></h1>
            <p className="lead">Beautifully considered skincare for real skin and real routines. Discover what feels right for you, without the overwhelm.</p>
            <div className="buttons">
              <button type="button" className="btn" onClick={() => scrollTo('quiz')}>Build Your Protocol ↗</button>
              <button type="button" className="btn outline" onClick={() => scrollTo('collection')}>Explore the Collection ↗</button>
            </div>
          </div>
          <div className="scene">
            <img className="full-image" alt="Skin Protocol RX products photographed in a tranquil treatment room" src="/original/shop-hero.jpg" />
          </div>
        </div>
      </section>
      <div className="c-ribbon">Skin science meets everyday care · Created with expertise · Never tested on animals</div>
      <section className="section">
        <div className="wrap c-philosophy">
          <div>
            <span className="eyebrow">A thoughtful approach</span>
            <h2 className="heading">Skincare that makes <em>space for you.</em></h2>
            <p className="intro">A collection grounded in professional experience and made to be understood. Choose your essentials, then add targeted support based on your own skin.</p>
          </div>
          <div className="c-points">
            <div className="c-point"><div className="symbol">✳</div><div><strong>Selected with intention</strong><span>Ingredients chosen for a clear purpose.</span></div></div>
            <div className="c-point"><div className="symbol">◌</div><div><strong>Professional perspective</strong><span>Three co-founders with complementary expertise.</span></div></div>
            <div className="c-point"><div className="symbol">✧</div><div><strong>A simpler routine</strong><span>Good foundations before optional extras.</span></div></div>
          </div>
        </div>
      </section>
      <section className="section c-concern-block" id="concerns">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Your skin is the starting point</span>
              <h2 className="heading">What does your skin need today?</h2>
            </div>
            <button type="button" className="micro-link" onClick={() => scrollTo('quiz')}>Take the protocol quiz ↗</button>
          </div>
          <ConcernTiles />
        </div>
      </section>
      <Assessment />
      <section className="section" id="routine">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Build your protocol</span>
              <h2 className="heading">Simple steps. Personal to you.</h2>
            </div>
            <p className="intro">Start with essentials, then choose what fits.</p>
          </div>
          <Steps callout action={{ label: 'See the collection ↗', id: 'collection' }} />
        </div>
      </section>
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
          <FounderCards />
        </div>
      </section>
      <SpaClose background="#e4d3c8" />
    </main>
  )
}
