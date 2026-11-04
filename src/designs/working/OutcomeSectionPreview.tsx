import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react'

/** Working-design studies for a before-and-after outcome section. Photographs are placeholders. */

const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const BODY = 'max-w-[540px] text-[17px] leading-relaxed text-[#595750]'
const PAD = 'px-6 md:px-[max(36px,8vw)]'

const EXAMPLES = [
  { id: 'pair', num: '01', label: 'The Pair' },
  { id: 'compare', num: '02', label: 'The Compare' },
  { id: 'journal', num: '03', label: 'The Journal' },
  { id: 'weeks', num: '04', label: 'The Weeks' },
  { id: 'set', num: '05', label: 'The Set' },
  { id: 'note', num: '06', label: 'The Note' },
] as const

type Tone = 'before' | 'mid' | 'after'

const WASH: Record<Tone, string> = {
  before: 'linear-gradient(165deg, #D5D1C9 0%, #B3AEA4 100%)',
  mid: 'linear-gradient(165deg, #E8D4CB 0%, #C9A99C 100%)',
  after: 'linear-gradient(165deg, #F3D2C8 0%, #E09A8C 100%)',
}

function Slot({
  label,
  tone,
  className = '',
  labelSide = 'left',
}: {
  label: string
  tone: Tone
  className?: string
  labelSide?: 'left' | 'right'
}) {
  const fillsParent = className.includes('absolute')
  return (
    <div className={`overflow-hidden ${fillsParent ? '' : 'relative'} ${className}`}>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: WASH[tone] }} />
      <div
        aria-hidden="true"
        className="absolute top-[14%] left-1/2 aspect-square w-[36%] -translate-x-1/2 rounded-full"
        style={{ background: tone === 'before' ? 'rgba(255,252,250,0.16)' : 'rgba(255,252,250,0.55)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[44%] w-[82%] -translate-x-1/2 rounded-t-[999px]"
        style={{ background: tone === 'before' ? 'rgba(43,39,39,0.07)' : 'rgba(255,252,250,0.32)' }}
      />
      {tone === 'after' ? (
        <div aria-hidden="true" className="absolute -top-[18%] -right-[8%] h-[70%] w-[70%] rounded-full bg-[#ab8584]/35 blur-2xl" />
      ) : null}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3">
        <span className="absolute top-0 left-0 h-3.5 w-3.5 border-t border-l border-[#252520]/30" />
        <span className="absolute top-0 right-0 h-3.5 w-3.5 border-t border-r border-[#252520]/30" />
        <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-[#252520]/30" />
        <span className="absolute right-0 bottom-0 h-3.5 w-3.5 border-r border-b border-[#252520]/30" />
      </div>
      <p
        className={`absolute top-3 z-[1] bg-[#FFFDFA]/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#252520] uppercase backdrop-blur-sm ${
          labelSide === 'right' ? 'right-3' : 'left-3'
        }`}
      >
        {label}
      </p>
      <p className="absolute bottom-3 left-3 z-[1] text-[10px] font-medium tracking-[0.16em] text-[#252520]/50 uppercase">
        Photograph
      </p>
    </div>
  )
}

function ExampleLabel({
  num,
  title,
  note,
}: {
  num: string
  title: string
  note: string
}) {
  return (
    <div className={`border-t border-[#D6CEC3] bg-[#FFFDFA] py-5 ${PAD}`}>
      <p className="text-[11px] font-semibold tracking-[0.18em] text-[#ab8584] uppercase">Example {num}</p>
      <div className="mt-1 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
        <h2 className="font-serif text-[26px] leading-tight text-[#252520] md:text-[30px]">{title}</h2>
        <p className="max-w-md text-[13px] leading-relaxed text-[#6D6A63]">{note}</p>
      </div>
    </div>
  )
}

function Pair() {
  return (
    <div className={`bg-[#FFFDFA] py-16 text-[#252520] md:py-[75px] ${PAD}`}>
      <p className={EYEBROW}>Outcomes</p>
      <h3 className={`my-3 max-w-[650px] ${HEADING}`}>
        The change, <em className="text-[#ab8584] italic">side by side.</em>
      </h3>
      <p className={`mb-10 ${BODY}`}>
        Before on the left. After on the right. A short line under each frame names the moment, and the photographs do the rest.
      </p>
      <div className="grid max-w-5xl grid-cols-2 gap-3 sm:gap-8">
        <figure>
          <Slot label="Before" tone="before" className="aspect-[3/4]" />
          <figcaption className="mt-3">
            <span className="block text-[11px] font-semibold tracking-[0.16em] text-[#252520] uppercase">Before</span>
            <span className="mt-1 block text-[12px] text-[#6D6A63]">Day 1</span>
          </figcaption>
        </figure>
        <figure>
          <Slot label="After" tone="after" className="aspect-[3/4]" />
          <figcaption className="mt-3">
            <span className="block text-[11px] font-semibold tracking-[0.16em] text-[#252520] uppercase">After</span>
            <span className="mt-1 block text-[12px] text-[#6D6A63]">Week 8</span>
          </figcaption>
        </figure>
      </div>
      <p className="mt-8 text-[12px] tracking-[0.08em] text-[#6D6A63] uppercase">Sample layout · texture · eight weeks</p>
    </div>
  )
}

function Compare() {
  const frame = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const fromPointer = useRef(false)
  const [pos, setPos] = useState(54)

  function moveTo(clientX: number) {
    const rect = frame.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(92, Math.max(8, next)))
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    fromPointer.current = true
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    moveTo(event.clientX)
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current || !fromPointer.current) return
    moveTo(event.clientX)
  }

  function onMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.button !== 0 || fromPointer.current) return
    dragging.current = true
    moveTo(event.clientX)
  }

  function onMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (!dragging.current || fromPointer.current) return
    moveTo(event.clientX)
  }

  function endDrag() {
    dragging.current = false
    fromPointer.current = false
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setPos(value => Math.max(8, value - 4))
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setPos(value => Math.min(92, value + 4))
    }
  }

  return (
    <div className={`bg-[#f5f0eb] py-16 text-[#252520] md:py-[75px] ${PAD}`}>
      <p className={EYEBROW}>Outcomes</p>
      <h3 className={`my-3 max-w-[650px] ${HEADING}`}>
        One frame. <em className="text-[#ab8584] italic">Two moments.</em>
      </h3>
      <p className={`mb-10 ${BODY}`}>
        The line moves. The crop stays. Useful when both photographs were taken in the same light, and the change is the only thing that should shift.
      </p>
      <div
        ref={frame}
        role="slider"
        tabIndex={0}
        aria-label="Compare before and after"
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} percent toward after`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onClick={event => moveTo(event.clientX)}
        onMouseLeave={() => {
          if (fromPointer.current) return
          dragging.current = false
        }}
        onKeyDown={onKeyDown}
        className="relative h-[300px] w-full max-w-5xl cursor-ew-resize touch-none overflow-hidden select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] md:h-[420px]"
      >
        <Slot label="After" tone="after" labelSide="right" className="absolute inset-0" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Slot label="Before" tone="before" className="absolute inset-0" />
        </div>
        <div aria-hidden="true" className="absolute inset-y-0 z-10 w-11 -translate-x-1/2" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#252520]" />
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#252520] bg-[#FFFDFA] text-[15px] text-[#252520]">
            ↔
          </div>
        </div>
      </div>
      <p className="mt-4 text-[12px] tracking-[0.06em] text-[#6D6A63] uppercase">Drag the line. Arrow keys move it.</p>
    </div>
  )
}

const JOURNAL = [
  { term: 'Concern', detail: 'Uneven tone' },
  { term: 'Protocol', detail: 'Cleanse, treat, seal' },
  { term: 'Time', detail: 'Eight weeks' },
]

function Journal() {
  return (
    <div className="bg-[#FFFDFA] py-16 text-[#252520] md:py-[75px]">
      <div className="grid grid-cols-1 items-center gap-12 min-[681px]:grid-cols-[48%_52%]">
        <div className="flex flex-col px-6 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]">
          <p className={EYEBROW}>Outcomes</p>
          <h3 className={`my-3 max-w-[650px] ${HEADING}`}>
            What was asked <em className="text-[#ab8584] italic">of the routine.</em>
          </h3>
          <p className={`mb-8 ${BODY}`}>
            The photographs sit with the facts: the concern, the steps, and how long they were given.
          </p>
          <dl className="max-w-[420px] border-t border-[#D6CEC3]">
            {JOURNAL.map(row => (
              <div key={row.term} className="flex items-baseline justify-between gap-6 border-b border-[#D6CEC3] py-3.5">
                <dt className="text-[11px] font-semibold tracking-[0.16em] text-[#ab8584] uppercase">{row.term}</dt>
                <dd className="text-sm text-[#252520]">{row.detail}</dd>
              </div>
            ))}
          </dl>
          <span className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-4 self-start border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] text-[#252520] uppercase min-[480px]:w-auto">
            See the protocol <span aria-hidden="true">↗</span>
          </span>
          <p className="mt-4 text-[12px] text-[#6D6A63]">Sample layout. Not a client result.</p>
        </div>
        <div className="px-6 min-[681px]:pr-[max(36px,8vw)] min-[681px]:pl-[4%]">
          <div className="relative pt-5 pr-5">
            <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 bottom-0 left-8 border border-[#C4A8A6] sm:left-10" />
            <div className="relative z-[1] grid grid-cols-2">
              <Slot label="Before" tone="before" className="aspect-[3/4]" />
              <Slot label="After" tone="after" className="aspect-[3/4]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WEEKS: { label: string; time: string; tone: Tone; note: string }[] = [
  { label: 'Day 1', time: 'Day 1', tone: 'before', note: 'Where it started' },
  { label: 'Week 4', time: 'Week 4', tone: 'mid', note: 'The middle' },
  { label: 'Week 8', time: 'Week 8', tone: 'after', note: 'Later on' },
]

function Weeks() {
  return (
    <div className={`bg-[#f3eceb] py-16 text-[#252520] md:py-[75px] ${PAD}`}>
      <p className={EYEBROW}>Outcomes</p>
      <h3 className={`my-3 max-w-[650px] ${HEADING}`}>
        A record, <em className="text-[#ab8584] italic">not a reveal.</em>
      </h3>
      <p className={`mb-10 ${BODY}`}>
        Day one, the middle, and the later photograph. Time is the only structure.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5">
        {WEEKS.map(moment => (
          <figure key={moment.time}>
            <Slot label={moment.label} tone={moment.tone} className="aspect-[3/4]" />
            <figcaption className="mt-4 flex items-start gap-3">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ab8584]" />
              <span>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#252520] uppercase">{moment.time}</p>
                <p className="mt-1 text-[13px] text-[#6D6A63]">{moment.note}</p>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

const SET = [
  { name: 'Tone', note: 'Sample · eight weeks' },
  { name: 'Texture', note: 'Sample · six weeks' },
  { name: 'Calm', note: 'Sample · four weeks' },
]

function Set() {
  return (
    <div className={`bg-[#FFFDFA] py-16 text-[#252520] md:py-[75px] ${PAD}`}>
      <p className={EYEBROW}>Outcomes</p>
      <h3 className={`my-3 max-w-[650px] ${HEADING}`}>
        A few <em className="text-[#ab8584] italic">quiet changes.</em>
      </h3>
      <p className={`mb-12 ${BODY}`}>
        Tone, texture, and calm. Each keeps its own pair, so one section can hold more than a single result.
      </p>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        {SET.map(item => (
          <article key={item.name}>
            <h4 className="font-serif text-[28px] leading-none text-[#252520]">{item.name}</h4>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Slot label="Before" tone="before" className="aspect-[3/4]" />
              <Slot label="After" tone="after" className="aspect-[3/4]" />
            </div>
            <p className="mt-3 text-[12px] tracking-[0.06em] text-[#6D6A63] uppercase">{item.note}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function Note() {
  return (
    <div className="bg-[#2B2727] text-[#F7F4EF]">
      <div className="grid grid-cols-1 min-[900px]:min-h-[560px] min-[900px]:grid-cols-[minmax(0,0.82fr)_1.18fr]">
        <div className="flex flex-col justify-center px-6 py-16 min-[900px]:py-20 min-[900px]:pr-12 min-[900px]:pl-[max(36px,6vw)]">
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#C4A8A6] uppercase">Outcomes</p>
          <blockquote className="my-4 max-w-[520px] font-serif text-[clamp(32px,4vw,48px)] leading-[1.12] font-normal tracking-[-0.03em] text-[#F7F4EF]">
            <em className="text-[#E7C9C4] italic">“It still looks like my skin.”</em>
          </blockquote>
          <p className="text-[12px] tracking-[0.14em] text-[#C4A8A6] uppercase">Sample caption · not a client quote</p>
          <p className="mt-6 max-w-[420px] text-[17px] leading-relaxed text-[#E7E2DC]">
            The sentence only confirms what the photographs already show. The pictures stay larger than the line.
          </p>
        </div>
        <div className="grid h-full min-h-[320px] grid-cols-2 gap-px bg-[#3A3434]">
          <Slot label="Before" tone="before" className="h-full min-h-[320px]" />
          <Slot label="After" tone="after" labelSide="right" className="h-full min-h-[320px]" />
        </div>
      </div>
    </div>
  )
}

export default function OutcomeSectionPreview() {
  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <header className={`border-b border-[#D6CEC3] bg-[#FFFDFA] py-10 md:py-12 ${PAD}`}>
        <p className={EYEBROW}>Working · Preview</p>
        <h1 className="mt-3 max-w-[760px] font-serif text-[clamp(32px,5vw,48px)] leading-[1.1] font-normal tracking-[-0.04em]">
          Outcome sections
        </h1>
        <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-[#595750]">
          Six ways to show a before and an after. Every photograph is a placeholder. Nothing here is a client result.
        </p>
        <a
          href="/designs/working"
          className="mt-5 inline-flex text-[12px] font-semibold tracking-[0.08em] text-[#252520] uppercase underline-offset-4 hover:text-[#ab8584] hover:underline"
        >
          ← Back to Working
        </a>
      </header>

      <nav aria-label="Outcome examples" className="sticky top-11 z-40 border-b border-[#D6CEC3] bg-[#FFFDFA]/95 backdrop-blur-md">
        <div className={`flex gap-x-5 gap-y-2 overflow-x-auto py-3 ${PAD}`}>
          {EXAMPLES.map(example => (
            <a
              key={example.id}
              href={`#${example.id}`}
              className="shrink-0 text-[12px] font-semibold tracking-[0.08em] text-[#6D6A63] uppercase underline-offset-4 hover:text-[#ab8584] hover:underline"
            >
              {example.num} {example.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="pair" className="scroll-mt-16">
        <ExampleLabel num="01" title="The Pair" note="Two portraits, equal weight. The quietest way to show a result." />
        <Pair />
      </section>
      <section id="compare" className="scroll-mt-16">
        <ExampleLabel
          num="02"
          title="The Compare"
          note="Drag across one crop. Arrow keys move the line when the frame is focused."
        />
        <Compare />
      </section>
      <section id="journal" className="scroll-mt-16">
        <ExampleLabel
          num="03"
          title="The Journal"
          note="Copy on the left, the pair on the right, in the same split as Philosophy."
        />
        <Journal />
      </section>
      <section id="weeks" className="scroll-mt-16">
        <ExampleLabel
          num="04"
          title="The Weeks"
          note="Three moments, when a single before and after feels too abrupt."
        />
        <Weeks />
      </section>
      <section id="set" className="scroll-mt-16">
        <ExampleLabel num="05" title="The Set" note="Three small pairs under one headline." />
        <Set />
      </section>
      <section id="note" className="scroll-mt-16">
        <ExampleLabel
          num="06"
          title="The Note"
          note="A dark field, the way the spa section sits. The caption leads. The pictures follow."
        />
        <Note />
      </section>
    </article>
  )
}
