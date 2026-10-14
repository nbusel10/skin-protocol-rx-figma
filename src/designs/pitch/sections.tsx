import { useState } from 'react'
import { pickProducts, type DesignNavigate } from '../shared'

const CARDS = pickProducts(['clarifying-cleanser', 'brighten-glow-c-20', 'rich-barrier-cream'])
const BLURBS = ['Gentle daily cleansing', 'Brightening treatment', 'Comfort and moisturize']
const EYEBROWS = ['Cleanse', 'Treat', 'Nourish']

export const FOUNDERS = [
  { name: 'Linda D. Amend, MS', role: 'Chemist', image: '/original/founder-linda.jpg', alt: 'Linda D. Amend, co-founder and chemist' },
  { name: 'Susanna Amend, NP', role: 'Nurse Practitioner', image: '/original/founder-susanna.jpg', alt: 'Susanna Amend, co-founder and nurse practitioner' },
  { name: 'Christina Corbin, LME', role: 'Licensed Medical Esthetician', image: '/original/founder-christina.jpg', alt: 'Christina Corbin, co-founder and licensed medical esthetician' },
]

const SKIN = ['Dry', 'Normal', 'Combination', 'Oily', 'Sensitive']
const GOALS = ['Aging', 'Brightening', 'Hyperpigmentation', 'Acne', 'Redness', 'Dry Skin']
const ROUTINES = ['Simple essentials', 'Essentials + treatments']
const CONCERNS = ['Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative Care', 'Sun Damage', 'Acne', 'Dry Skin', 'Redness', 'Eye Area']

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Assessment() {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  function choose(index: string, value: string) {
    setAnswers(current => ({ ...current, [index]: value }))
  }

  const count = Object.keys(answers).length
  let feedback = 'Choose your answers above to see how the assessment would guide your routine.'
  if (count > 0 && count < 3) feedback = `Great start. ${count} of 3 questions answered. Choose the remaining options to preview your routine.`
  if (count === 3) {
    const simple = answers['2'].startsWith('Simple')
    feedback = simple
      ? `Your preview: start with a cleanser suited to ${answers['0'].toLowerCase()} skin and a daily moisturizer. Keep the rest optional. Specific product matches will be confirmed before launch.`
      : `Your preview: start with a cleanser suited to ${answers['0'].toLowerCase()} skin and a daily moisturizer. Explore an optional targeted treatment for ${answers['1'].toLowerCase()}. Specific product matches will be confirmed before launch.`
  }

  return (
    <section className="section quiz-teaser" id="quiz">
      <div className="wrap">
        <div className="quiz-head">
          <span className="eyebrow">Your personalized skin assessment</span>
          <h2 className="heading">A little about your skin. A routine that feels right.</h2>
          <p className="intro">Preview the guided assessment right here. We will start with your skin type and priorities, then suggest a simple foundation with optional targeted care.</p>
        </div>
        <div className="quiz-grid">
          <Question index="0" step="01 / Your skin" title="Which sounds most like your skin?" options={SKIN} selected={answers['0']} onChoose={choose} />
          <Question index="1" step="02 / Your goal" title="What would you like to focus on?" options={GOALS} selected={answers['1']} onChoose={choose} />
          <Question index="2" step="03 / Your routine" title="What kind of routine feels right?" options={ROUTINES} selected={answers['2']} onChoose={choose} />
        </div>
        <div className="quiz-summary" aria-live="polite">
          <strong>Your preview protocol</strong>
          <p className="quiz-feedback">{feedback}</p>
          <p className="quiz-meta">Demonstration only. Specific recommendations will be matched to approved product attributes before launch.</p>
        </div>
      </div>
    </section>
  )
}

function Question({ index, step, title, options, selected, onChoose }: {
  index: string
  step: string
  title: string
  options: string[]
  selected?: string
  onChoose: (index: string, value: string) => void
}) {
  return (
    <div className="quiz-question">
      <span className="quiz-step">{step}</span>
      <h3>{title}</h3>
      <div className="quiz-choices">
        {options.map(option => (
          <button key={option} type="button" className={`quiz-choice${selected === option ? ' selected' : ''}`} aria-pressed={selected === option} onClick={() => onChoose(index, option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export function GuidedPreview() {
  return (
    <div className="quiz-preview">
      <div className="tiny">Guided quiz preview</div>
      <h3>A simple guided start, right from the homepage.</h3>
      <p>This homepage previews the future quiz experience instead of hiding it only behind a button. Customers answer a few quick questions and see a sample starting routine.</p>
      <div className="quiz-grid">
        <div className="quiz-card"><strong>Question 01</strong><span>What is your skin type?</span></div>
        <div className="quiz-card"><strong>Question 02</strong><span>What is your top concern?</span></div>
        <div className="quiz-card"><strong>Question 03</strong><span>How does your skin feel daily?</span></div>
        <div className="quiz-card"><strong>Question 04</strong><span>Do you want essentials only or targeted support?</span></div>
      </div>
      <div className="quiz-result">
        <div className="result-copy">
          <strong>Example recommendation</strong>
          Based on dry skin, redness, and a simple routine, the guided path would show Chamomile Cream Cleanser, Niacinamide Rosewater Restorative Toner, Hydration Cloud Cream, and optional Eye Recovery Complex or The Holy Grail Oil. This is a demonstration, not a professional recommendation.
        </div>
        <button type="button" className="btn" onClick={() => scrollTo('quiz')}>Build Your Protocol ↗</button>
      </div>
    </div>
  )
}

export function Steps({ dark = false, callout = false, action }: { dark?: boolean; callout?: boolean; action?: { label: string; id: string; light?: boolean } }) {
  return (
    <>
      <div className="steps">
        <div className="step"><small>01 / Cleanse</small><h3>Begin with the right cleanse.</h3><p>Choose Chamomile Cream Cleanser, Clarifying Gel Cleanser, or TripleGlow Exfoliating Cleanser based on your skin and frequency needs.</p></div>
        <div className="step"><small>02 / Treat</small><h3>Target what matters most.</h3><p>Layer Niacinamide Rosewater Restorative Toner, then add a serum such as Hyaluronic Acid Serum, Matrix Serum, Bakuchiol Serum, or Brighten & Glow C.</p></div>
        <div className="step"><small>03 / Hydrate</small><h3>Replenish and support.</h3><p>Follow with Hydration Cloud Cream for lighter moisture or Rich Barrier Cream when skin needs more comfort and support.</p></div>
        <div className="step"><small>04 / Protect</small><h3>Finish thoughtfully.</h3><p>In the morning, complete the routine with SPF. At night, The Holy Grail Oil or Eye Recovery Complex can be added where helpful.</p></div>
      </div>
      {callout && <p className="product-callout" style={dark ? { color: '#e6dbd4' } : undefined}>The homepage previews the quiz. The full guided experience will live on its own Build Your Protocol page.</p>}
      {action && (
        <div className="buttons">
          <button type="button" className="btn" style={action.light ? { background: '#d0abae', borderColor: '#d0abae', color: '#2d2826' } : undefined} onClick={() => scrollTo(action.id)}>{action.label}</button>
        </div>
      )}
    </>
  )
}

export function Collection({ onNavigate, linkLabel }: { onNavigate: DesignNavigate; linkLabel: string }) {
  return (
    <div>
      <div className="mini-collection">
        {CARDS.map((product, index) => (
          <article key={product.id} className="collection-card product-specific">
            <button type="button" className="crop" onClick={() => onNavigate('product', product.id)} style={{ width: '100%', border: 0, padding: 0, cursor: 'pointer' }}>
              <img alt={product.name} src={product.image} />
            </button>
            <div className="details">
              <span className="eyebrow">{EYEBROWS[index]}</span>
              <h3>{product.name}</h3>
              <p>{BLURBS[index]}</p>
              <button type="button" onClick={() => scrollTo('quiz')}>{linkLabel}</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function ConcernPills({ message }: { message: string }) {
  const [note, setNote] = useState(message)
  return (
    <>
      <div className="concerns">
        {CONCERNS.map(concern => (
          <button key={concern} type="button" onClick={() => setNote(`Selected: ${concern}. In the shop this will open the collection for this concern.`)}>{concern} ↗</button>
        ))}
      </div>
      <p className="disclaimer">{note}</p>
    </>
  )
}

export function ConcernTiles() {
  const [note, setNote] = useState('Select a category to explore the future filtered shopping experience.')
  return (
    <>
      <div className="c-concern-row">
        {CONCERNS.map(concern => (
          <button key={concern} type="button" onClick={() => setNote(`Selected: ${concern}. In the shop this will open the collection for this concern.`)} style={{ textAlign: 'left' }}>
            {concern}<span>Explore ↗</span>
          </button>
        ))}
      </div>
      <p className="disclaimer">{note}</p>
    </>
  )
}

export function FounderCards() {
  return (
    <div className="founder-row">
      {FOUNDERS.map(person => (
        <div key={person.name} className="founder">
          <img className="founder-graded" alt={person.alt} src={person.image} />
          <div className="caption">
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SpaClose({ background }: { background?: string }) {
  return (
    <section className="section" id="spa" style={background ? { background } : undefined}>
      <div className="wrap" style={{ textAlign: 'center', maxWidth: 800 }}>
        <span className="eyebrow">For estheticians & spas</span>
        <h2 className="heading" style={{ fontSize: 'clamp(38px, 5vw, 57px)', margin: '13px 0 20px' }}>Continue the care beyond the treatment room.</h2>
        <p className="intro" style={{ margin: '0 auto 24px' }}>Bring a thoughtfully edited skincare collection into the routines you help create for your clients.</p>
        <button type="button" className="btn">Explore Spa Partnerships ↗</button>
        <p className="disclaimer">Application form and final contact destination will be connected during Shopify development.</p>
      </div>
    </section>
  )
}
