import { OffsetFrame } from './OffsetPhoto'
import PracticeQuiz from './PracticeQuiz'
import SunbeamMatGlow from './SunbeamMatGlow'

const HEADING =
  'font-serif text-[clamp(36px,6vw,52px)] font-normal leading-[1.08] tracking-[-0.044em]'
const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const PAD = 'px-6 min-[681px]:px-[max(36px,8vw)]'

const CHARCOAL = [
  { id: 'charcoal-beside', num: '07', label: 'Beside', note: 'Apply, Review, Access, and Recommend stay in a list. The quiz sits in the same row.' },
  { id: 'charcoal-across', num: '08', label: 'Across', note: 'The four steps run the width of the band, and the quiz uses that same width underneath.' },
  { id: 'charcoal-card', num: '09', label: 'One card', note: 'The four steps are the top of the quiz card, so the path and the questions are one object.' },
] as const

const LAYOUTS = [
  ...CHARCOAL,
  { id: 'alongside', num: '01', label: 'Alongside', note: 'The path stays in a short list. The quiz sits in the same row.' },
  { id: 'consultation', num: '02', label: 'Consultation', note: 'Same split as Build Your Protocol: photo and copy on the left, questions on the right.' },
  { id: 'focused', num: '03', label: 'Focused', note: 'The section is the quiz. No second column.' },
  { id: 'rail', num: '04', label: 'Rail', note: 'Question numbers stay visible beside the current prompt.' },
  { id: 'offset', num: '05', label: 'Offset', note: 'The card overlaps the treatment room, so the form is held by the photograph.' },
  { id: 'charcoal', num: '06', label: 'Charcoal', note: 'A dark band, with the quiz as the light object inside it.' },
] as const

const PATH = [
  { title: 'Apply', body: 'A few questions about the practice.' },
  { title: 'Review', body: 'We follow up within 3–5 business days.' },
  { title: 'Access', body: 'Approved partners receive pricing and education.' },
  { title: 'Recommend', body: 'Clients continue the protocol at home.' },
]

function ExampleLabel({ num, title, note }: { num: string; title: string; note: string }) {
  return (
    <div id={LAYOUTS.find(item => item.num === num)?.id} className={`scroll-mt-24 border-t border-[#D6CEC3] bg-[#FFFDFA] py-5 ${PAD}`}>
      <p className="text-[11px] font-semibold tracking-[0.18em] text-[#ab8584] uppercase">Layout {num}</p>
      <div className="mt-1 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
        <h2 className="font-serif text-[26px] leading-tight text-[#252520] md:text-[30px]">{title}</h2>
        <p className="max-w-md text-[13px] leading-relaxed text-[#6D6A63]">{note}</p>
      </div>
    </div>
  )
}

function Intro({ light = false }: { light?: boolean }) {
  return (
    <div>
      <p className={light ? 'text-[13px] font-semibold tracking-[0.21em] text-[#C4A8A6] uppercase' : EYEBROW}>03 / Apply</p>
      <h3 className={`mt-3 ${HEADING} ${light ? 'text-[#F7F4EF]' : 'text-[#252520]'}`}>A short path to the treatment room.</h3>
      <p className={`mt-4 max-w-[34rem] text-[17px] leading-relaxed ${light ? 'text-[#F7F4EF]/80' : 'text-[#595750]'}`}>
        Tell us about the practice. We review each application and follow up within 3–5 business days.
      </p>
    </div>
  )
}

function pathEdge(index: number, line: string) {
  if (index === 0) return 'py-5'
  if (index === 1) return `border-t ${line} py-5 sm:border-t-0 sm:border-l sm:pl-6`
  if (index === 2) return `border-t ${line} py-5 lg:border-t-0 lg:border-l lg:pl-6`
  return `border-t ${line} py-5 sm:border-l sm:pl-6 lg:border-t-0`
}

function PathList({ light = false }: { light?: boolean }) {
  const line = light ? 'border-white/15' : 'border-[#E4DCD3]'
  const title = light ? 'text-[#F7F4EF]' : 'text-[#252520]'
  const copy = light ? 'text-[#F7F4EF]/70' : 'text-[#595750]'
  return (
    <ol className={`mt-6 max-w-[34rem] border-t ${line}`}>
      {PATH.map((step, index) => (
        <li key={step.title} className={`grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-3 border-b py-3 ${line}`}>
          <p className="font-serif text-[1.25rem] italic leading-none text-[#ab8584]">{String(index + 1).padStart(2, '0')}</p>
          <div>
            <p className={`font-serif text-[1.25rem] leading-none tracking-[-0.03em] ${title}`}>{step.title}</p>
            <p className={`mt-1.5 text-[15px] leading-snug ${copy}`}>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function PathRow({ on = 'dark' }: { on?: 'dark' | 'ivory' }) {
  const ivory = on === 'ivory'
  const line = ivory ? 'border-[#E4DCD3]' : 'border-white/15'
  const title = ivory ? 'text-[#252520]' : 'text-[#F7F4EF]'
  const copy = ivory ? 'text-[#595750]' : 'text-[#F7F4EF]/70'
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {PATH.map((step, index) => (
        <li key={step.title} className={pathEdge(index, line)}>
          <p className="font-serif text-[1.75rem] italic leading-none text-[#ab8584]">{String(index + 1).padStart(2, '0')}</p>
          <p className={`mt-3 font-serif text-[1.35rem] leading-none tracking-[-0.03em] ${title}`}>{step.title}</p>
          <p className={`mt-2 max-w-[16rem] text-[15px] leading-snug ${copy}`}>{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

function RoomPhoto({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
      <SunbeamMatGlow />
      <div className="absolute inset-[8%] z-[1]">
        <OffsetFrame />
        <div className="relative z-[1] h-full overflow-hidden">
          <img
            src="/designs/working/spa-room.jpg"
            alt="A linen treatment bed with a dusty rose throw in a quiet spa room"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  )
}

export default function ApplyLayoutsPreview() {
  return (
    <div className="bg-[#F7F4EF] font-sans text-[#252520]">
      <header className={`${PAD} bg-[#2B2727] py-12 text-[#F7F4EF] md:py-16`}>
        <p className="text-[13px] font-semibold tracking-[0.21em] text-[#C4A8A6] uppercase">Spa partners</p>
        <h1 className={`mt-3 max-w-[14ch] ${HEADING}`}>Six ways to ask about the practice.</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#F7F4EF]/75">
          The questions are the same in each layout. They cover the setting, the license, the scale, and how the line would be used.
        </p>
        <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2" aria-label="Apply layouts">
          {LAYOUTS.map(item => (
            <a key={item.id} href={`#${item.id}`} className="text-[12px] font-semibold tracking-[0.08em] text-[#F7F4EF]/80 uppercase hover:text-white">
              {item.num} {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className={`border-b border-[#D6CEC3] bg-[#F7F4EF] py-8 ${PAD}`}>
        <p className={EYEBROW}>Charcoal</p>
        <h2 className={`mt-2 max-w-[18ch] font-serif text-[clamp(28px,3vw,40px)] leading-tight font-normal tracking-[-0.03em]`}>
          The quiz, with the four steps.
        </h2>
      </div>

      <ExampleLabel num="07" title="Beside" note={CHARCOAL[0].note} />
      <section className={`bg-[#2B2727] py-12 text-[#F7F4EF] md:py-16 ${PAD}`}>
        <div className="grid items-start gap-8 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(300px,1fr)] min-[900px]:gap-14">
          <div>
            <Intro light />
            <PathList light />
          </div>
          <div className="min-[900px]:self-center">
            <PracticeQuiz />
          </div>
        </div>
      </section>

      <ExampleLabel num="08" title="Across" note={CHARCOAL[1].note} />
      <section className={`bg-[#2B2727] py-12 text-[#F7F4EF] md:py-16 ${PAD}`}>
        <Intro light />
        <div className="mt-8 border-t border-white/15">
          <PathRow />
        </div>
        <div className="mt-8">
          <PracticeQuiz />
        </div>
      </section>

      <ExampleLabel num="09" title="One card" note={CHARCOAL[2].note} />
      <section className={`bg-[#2B2727] py-12 text-[#F7F4EF] md:py-16 ${PAD}`}>
        <Intro light />
        <div className="mt-8 border border-[#D6C3C2] bg-[#fffdfa] text-[#252520]">
          <div className="border-b border-[#E4DCD3] px-6 pt-2 md:px-9">
            <PathRow on="ivory" />
          </div>
          <PracticeQuiz frame="plain" />
        </div>
      </section>

      <ExampleLabel num="01" title="Alongside" note={LAYOUTS.find(item => item.num === '01')?.note ?? ''} />
      <section className={`bg-[#FFFDFA] py-12 md:py-14 ${PAD}`}>
        <div className="grid items-start gap-8 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(300px,1fr)] min-[900px]:gap-12">
          <div>
            <Intro />
            <PathList />
          </div>
          <PracticeQuiz />
        </div>
      </section>

      <ExampleLabel num="02" title="Consultation" note={LAYOUTS.find(item => item.num === '02')?.note ?? ''} />
      <section className="bg-[#f5f0eb] py-12 md:py-16">
        <div className="grid items-center gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-0">
          <div className={`min-[900px]:pr-10 ${PAD}`}>
            <Intro />
            <RoomPhoto className="mt-8 aspect-[4/3] w-full max-w-[460px]" />
          </div>
          <div className={`${PAD} min-[900px]:pl-4 min-[900px]:pr-[max(36px,8vw)]`}>
            <PracticeQuiz />
          </div>
        </div>
      </section>

      <ExampleLabel num="03" title="Focused" note={LAYOUTS.find(item => item.num === '03')?.note ?? ''} />
      <section className={`bg-[#FFFDFA] py-12 md:py-16 ${PAD}`}>
        <div className="mx-auto max-w-2xl">
          <Intro />
          <div className="mt-8">
            <PracticeQuiz />
          </div>
        </div>
      </section>

      <ExampleLabel num="04" title="Rail" note={LAYOUTS.find(item => item.num === '04')?.note ?? ''} />
      <section className={`bg-[#f5f0eb] py-12 md:py-16 ${PAD}`}>
        <Intro />
        <div className="mt-8 max-w-3xl">
          <PracticeQuiz frame="rail" />
        </div>
      </section>

      <ExampleLabel num="05" title="Offset" note={LAYOUTS.find(item => item.num === '05')?.note ?? ''} />
      <section className="relative overflow-hidden bg-[#FFFDFA] py-12 md:py-16">
        <div className={`grid items-center gap-8 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] ${PAD}`}>
          <div className="relative z-10 min-[900px]:py-6">
            <Intro />
            <div className="mt-8 min-[900px]:mr-[-8%]">
              <PracticeQuiz />
            </div>
          </div>
          <RoomPhoto className="aspect-[4/5] min-h-[320px] min-[900px]:aspect-auto min-[900px]:min-h-[560px]" />
        </div>
      </section>

      <ExampleLabel num="06" title="Charcoal" note={LAYOUTS.find(item => item.num === '06')?.note ?? ''} />
      <section className={`bg-[#2B2727] py-12 text-[#F7F4EF] md:py-16 ${PAD}`}>
        <div className="grid items-center gap-8 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(300px,1fr)] min-[900px]:gap-14">
          <Intro light />
          <PracticeQuiz />
        </div>
      </section>
    </div>
  )
}
