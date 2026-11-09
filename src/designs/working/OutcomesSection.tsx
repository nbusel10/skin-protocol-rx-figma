import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import OutcomeDecoration, { type OutcomeDecorationVariant } from './OutcomeDecorations'
import OffsetPhoto from './OffsetPhoto'
import { SAMPLE_OUTCOME_STUDIES } from './outcomeSampleStudies'
import {
  outcomeConcerns,
  publishedOutcomeStudies,
  studiesForConcern,
  type OutcomeAssessment,
  type OutcomePhotograph,
  type OutcomeStudy,
  type OutcomeStudyProduct,
} from './outcomeStudies'

const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const LABEL = 'text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]'

function concernDomId(concern: string) {
  return concern
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 border-b border-[#E4D6D2] py-[22px] first:pt-0 min-[520px]:grid-cols-[9.75rem_minmax(0,1fr)] min-[520px]:items-baseline min-[520px]:gap-8">
      <dt className={LABEL}>{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}

function ProductName({ product }: { product: OutcomeStudyProduct }) {
  const name = product.url?.trim() ? (
    <a
      href={product.url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 text-[15px] text-[#252520] transition-colors hover:text-[#ab8584]"
    >
      <span className="relative after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-[#ab8584] after:transition-[width] after:duration-300 group-hover:after:w-full">
        {product.name}
      </span>
      <span aria-hidden="true" className="text-[#ab8584]">
        ↗
      </span>
    </a>
  ) : (
    <span className="text-[15px] leading-snug text-[#252520]">{product.name}</span>
  )

  return (
    <span className="flex min-w-0 items-center gap-3">
      {product.image?.trim() ? (
        <img src={product.image} alt="" className="h-10 w-10 shrink-0 object-contain" />
      ) : null}
      {name}
    </span>
  )
}

function StudyPhotographs({ photographs }: { photographs: OutcomePhotograph[] }) {
  if (photographs.length === 0) return null
  const single = photographs.length === 1
  return (
    <div className={`mb-10 grid gap-8 ${single ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {photographs.map(photo => (
        <OffsetPhoto
          key={`${photo.src}-${photo.alt}`}
          src={photo.src}
          alt={photo.alt}
          caption={photo.caption}
          imgClassName={single ? 'aspect-[4/5] max-h-[520px]' : 'aspect-[3/4]'}
        />
      ))}
    </div>
  )
}

function pointAlong(progress: number, centers: number[]) {
  if (centers.length === 0) return 0
  const end = centers.length - 1
  const clamped = Math.min(end, Math.max(0, progress))
  const index = Math.min(end, Math.floor(clamped))
  const next = Math.min(end, index + 1)
  return centers[index] + (centers[next] - centers[index]) * (clamped - index)
}

const TIMELINE_CIRCLE = 2 * Math.PI * 6
const TIMELINE_LEAD = 0.32

function clamp01(amount: number) {
  return Math.min(1, Math.max(0, amount))
}

function circleDraw(progress: number, index: number) {
  const begin = index - TIMELINE_LEAD
  const finish = index + 0.06
  return clamp01((progress - begin) / (finish - begin))
}

function ResultsTimeline({
  assessments,
  animate = false,
  replay = 0,
}: {
  assessments: OutcomeAssessment[]
  animate?: boolean
  replay?: number
}) {
  const listRef = useRef<HTMLOListElement>(null)
  const centersRef = useRef<number[]>([])
  const recorded = assessments.filter(
    assessment => assessment.timePoint.trim() && assessment.heading.trim() && assessment.findings.trim(),
  )
  const drawing = animate && recorded.length >= 2
  const resting = Math.max(0, recorded.length - 1)
  const [progress, setProgress] = useState(drawing ? -TIMELINE_LEAD : resting)
  const [seenReplay, setSeenReplay] = useState(replay)
  if (seenReplay !== replay) {
    setSeenReplay(replay)
    setProgress(drawing ? -TIMELINE_LEAD : resting)
  }

  useEffect(() => {
    if (!drawing) return
    const node = listRef.current
    if (!node) return
    let frame = 0
    let cancel = false

    const measure = () => {
      const top = node.getBoundingClientRect().top
      return [...node.querySelectorAll<HTMLElement>('[data-timeline-mark]')].map(mark => {
        const box = mark.getBoundingClientRect()
        return box.top - top + box.height / 2
      })
    }

    const play = () => {
      const points = measure()
      centersRef.current = points
      if (cancel) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || points.length < 2) {
        setProgress(recorded.length - 1 + 0.08)
        return
      }
      const span = recorded.length - 1
      const end = span + 0.08
      const total = 700 * (end + TIMELINE_LEAD)
      const start = performance.now()
      const tick = (now: number) => {
        if (cancel) return
        const elapsed = now - start
        const nextPoints = measure()
        if (nextPoints.length >= 2) centersRef.current = nextPoints
        if (elapsed >= total) {
          setProgress(end)
          return
        }
        setProgress(-TIMELINE_LEAD + (end + TIMELINE_LEAD) * (elapsed / total))
        frame = requestAnimationFrame(tick)
      }
      setProgress(-TIMELINE_LEAD)
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(entries => {
      if (cancel || !entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      play()
    }, { threshold: 0.2 })
    observer.observe(node)
    return () => {
      cancel = true
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [drawing, recorded.length, replay])

  if (recorded.length === 0) return null

  const centers = centersRef.current
  const drawnHeight = centers.length >= 2 ? Math.max(0, pointAlong(progress, centers) - centers[0]) : 0

  return (
    <ol ref={listRef} className="relative m-0 list-none p-0">
      {drawing && centers.length >= 2 ? (
        <span
          aria-hidden="true"
          data-timeline-line
          className="absolute left-[6px] z-0 w-px bg-[#C4A8A6]"
          style={{ top: centers[0], height: drawnHeight }}
        />
      ) : null}
      {recorded.map((assessment, index) => {
        const last = index === recorded.length - 1
        const when = [assessment.timePoint, assessment.date].filter(Boolean).join(' · ')
        const stroke = drawing ? circleDraw(progress, index) : 1
        const fill = last ? (drawing ? clamp01((stroke - 0.62) / 0.38) : 1) : 0
        return (
          <li key={assessment.id} className={`relative pl-12 ${last ? '' : 'pb-[18px]'}`}>
            {drawing ? null : (
              <span
                aria-hidden="true"
                className={`absolute left-[6px] w-px bg-[#C4A8A6] ${last ? 'top-0 h-4' : 'top-[7px] bottom-0'}`}
              />
            )}
            <span
              aria-hidden="true"
              data-timeline-mark
              className={`absolute left-0 z-[1] h-3.5 w-3.5 ${last ? 'top-4' : 'top-0'}`}
            >
              <svg viewBox="0 0 14 14" className="h-full w-full overflow-visible">
                {stroke > 0 ? (
                  <circle cx="7" cy="7" r="5.2" fill={last ? '#fffdfa' : '#f5f0eb'} />
                ) : null}
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  fill="none"
                  stroke="#ab8584"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray={TIMELINE_CIRCLE}
                  strokeDashoffset={TIMELINE_CIRCLE * (1 - stroke)}
                  transform="rotate(-90 7 7)"
                />
                {fill > 0 ? <circle cx="7" cy="7" r={5.15 * fill} fill="#ab8584" /> : null}
              </svg>
            </span>
            <div className={last ? 'rounded-2xl bg-[#fffdfa] p-4' : ''}>
              <p className={LABEL}>{when}</p>
              <h3 className="mt-1.5 font-serif text-[28px] leading-tight font-normal tracking-[-0.03em] text-[#252520] md:text-[32px]">
                {assessment.heading}
              </h3>
              <p className="mt-2 max-w-[36rem] font-serif text-[17px] leading-[1.5] text-[#4c4943] italic">
                “{assessment.findings}”
              </p>
              {assessment.metric?.trim() ? (
                <p className="mt-4 font-serif text-[28px] leading-none text-[#ab8584] italic">{assessment.metric}</p>
              ) : null}
              {assessment.photograph ? (
                <OffsetPhoto
                  src={assessment.photograph.src}
                  alt={assessment.photograph.alt}
                  caption={assessment.photograph.caption}
                  className="mt-5 max-w-[280px]"
                  imgClassName="aspect-[3/4]"
                />
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function StudyPanel({
  study,
  animateTimeline = false,
  replay = 0,
}: {
  study: OutcomeStudy
  animateTimeline?: boolean
  replay?: number
}) {
  const products = study.products.filter(product => product.name.trim())
  return (
    <div className="grid grid-cols-1 items-start gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-0">
      <div className="min-[900px]:pr-16">
        <dl>
          <Field label="Concern">
            <p className="font-serif text-[28px] leading-none tracking-[-0.03em] text-[#252520] md:text-[32px]">{study.concern}</p>
          </Field>
          <Field label="Protocol used">
            <ul className="space-y-3">
              {products.map(product => (
                <li key={`${product.shopifyId ?? product.catalogId ?? product.name}`}>
                  <ProductName product={product} />
                </li>
              ))}
            </ul>
          </Field>
          <Field label="Study duration">
            <p className="font-serif text-[22px] leading-snug text-[#252520]">{study.duration}</p>
          </Field>
          <Field label="Study focus">
            <p className="max-w-[34rem] text-[15px] leading-relaxed text-[#3f3c37]">{study.focus}</p>
            {study.statistic?.trim() ? (
              <p className="mt-3 font-serif text-[28px] leading-none text-[#ab8584] italic">{study.statistic}</p>
            ) : null}
          </Field>
        </dl>
        {study.documentUrl?.trim() ? (
          <a
            href={study.documentUrl}
            className="group mt-8 inline-flex min-h-12 items-center gap-4 border border-[#252520]/70 px-5 text-[11px] font-semibold tracking-[0.1em] text-[#252520] uppercase transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584]"
          >
            Read the Full Study
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        ) : null}
      </div>
      <div className="min-[900px]:border-l min-[900px]:border-[#E4D6D2] min-[900px]:pl-16">
        <StudyPhotographs photographs={study.photographs ?? []} />
        <ResultsTimeline assessments={study.assessments} animate={animateTimeline} replay={replay} />
      </div>
    </div>
  )
}

export default function OutcomesSection({
  studies,
  decoration = 'bullseye',
  instanceId,
  animateTimeline = false,
  composedHeader = false,
}: {
  /** Approved records. When omitted, published studies are used, or the illustrative preview if none exist yet. */
  studies?: OutcomeStudy[]
  /** Upper-right ornament. The live section keeps the bullseye. */
  decoration?: OutcomeDecorationVariant
  /** Scopes tab and panel ids when more than one section is on the page. */
  instanceId?: string
  /** Draws the timeline when the section scrolls into view, and again when a concern is selected. */
  animateTimeline?: boolean
  /** Places the decoration beside the headline. Used by the preview page only. */
  composedHeader?: boolean
}) {
  const approved = studies ?? publishedOutcomeStudies()
  const illustrative = approved.length === 0
  const records = illustrative ? SAMPLE_OUTCOME_STUDIES : approved
  const concerns = outcomeConcerns(records)
  const preferred = concerns.find(item => item === 'Uneven Tone') ?? concerns[0] ?? ''
  const [concern, setConcern] = useState(preferred)
  const [studyId, setStudyId] = useState('')
  const [timelineRun, setTimelineRun] = useState(0)
  const activeConcern = concerns.includes(concern) ? concern : preferred
  const inConcern = studiesForConcern(records, activeConcern)
  const activeStudy = inConcern.find(study => study.id === studyId) ?? inConcern[0]
  const sectionId = instanceId ? `outcomes-${instanceId}` : 'outcomes'
  const panelId = instanceId ? `outcomes-${instanceId}-panel` : 'outcomes-study-panel'
  const concernTabId = (item: string) =>
    instanceId ? `outcomes-${instanceId}-concern-${concernDomId(item)}` : `outcome-concern-${concernDomId(item)}`

  function chooseConcern(next: string) {
    setConcern(next)
    const first = studiesForConcern(records, next)[0]
    setStudyId(first?.id ?? '')
    setTimelineRun(run => run + 1)
  }

  function onConcernKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (concerns.length < 2) return
    const current = concerns.indexOf(activeConcern)
    if (current < 0) return
    let next = current
    if (event.key === 'ArrowRight') next = (current + 1) % concerns.length
    else if (event.key === 'ArrowLeft') next = (current - 1 + concerns.length) % concerns.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = concerns.length - 1
    else return
    event.preventDefault()
    chooseConcern(concerns[next])
    const tabs = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs[next]?.focus()
  }

  if (!activeStudy) return null

  return (
    <section id={sectionId} className={`relative scroll-mt-28 overflow-hidden bg-[#f5f0eb] text-[#252520] ${composedHeader ? 'py-10 md:py-12' : 'py-12 md:py-14'}`}>
      {composedHeader ? null : <OutcomeDecoration variant={decoration} />}
      <div className="relative px-6 md:px-[max(36px,8vw)]">
        {composedHeader ? (
          <div className="grid items-center gap-8 min-[900px]:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] min-[900px]:gap-x-10">
            <div>
              <p className={EYEBROW}>The Outcomes</p>
              <h2 className={`my-3 max-w-[740px] ${HEADING}`}>
                The routine, <em className="text-[#ab8584] italic">observed over time.</em>
              </h2>
              <p className="max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
                Explore the products studied for different skin concerns and the observations recorded along the way.
              </p>
            </div>
            <div className="flex items-center justify-center min-[900px]:justify-start">
              <div className="w-full max-w-[440px] min-[900px]:max-w-none">
                <OutcomeDecoration variant={decoration} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className={EYEBROW}>The Outcomes</p>
            <h2 className={`my-3 max-w-[740px] ${HEADING}`}>
              The routine, <em className="text-[#ab8584] italic">observed over time.</em>
            </h2>
            <p className="max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              Explore the products studied for different skin concerns and the observations recorded along the way.
            </p>
          </>
        )}

        <div className="mt-7 border-t border-[#E4D6D2] pt-4">
          {illustrative ? <p className={`${LABEL} mb-3`}>Illustrative study preview</p> : null}
          <div
            role="tablist"
            aria-label="Skin concerns"
            onKeyDown={onConcernKeyDown}
            className="flex flex-wrap gap-2.5"
          >
            {concerns.map(item => {
              const selected = item === activeConcern
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  id={concernTabId(item)}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => chooseConcern(item)}
                  className={`inline-flex min-h-11 items-center rounded-full border px-5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584] ${
                    selected
                      ? 'border-[#ab8584] bg-[#f8f1ef] text-[#252520]'
                      : 'border-[#D6CEC3] bg-transparent text-[#6D6A63] hover:border-[#ab8584]/70 hover:text-[#252520]'
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>

          {inConcern.length > 1 ? (
            <div role="radiogroup" aria-label={`Studies for ${activeConcern}`} className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {inConcern.map(study => {
                const selected = study.id === activeStudy.id
                return (
                  <button
                    key={study.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setStudyId(study.id)}
                    className={`text-left text-[13px] tracking-[0.04em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584] ${
                      selected ? 'text-[#252520]' : 'text-[#6D6A63] hover:text-[#252520]'
                    }`}
                  >
                    <span className={selected ? 'border-b border-[#ab8584] pb-0.5' : ''}>{study.title}</span>
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>

        <div id={panelId} role="tabpanel" aria-labelledby={concernTabId(activeConcern)} aria-live="polite" className="mt-7">
          <div key={activeStudy.id} className="outcome-swap">
            <StudyPanel study={activeStudy} animateTimeline={animateTimeline} replay={timelineRun} />
          </div>
        </div>
      </div>
    </section>
  )
}
