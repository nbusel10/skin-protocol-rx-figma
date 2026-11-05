import OffsetPhoto from './OffsetPhoto'
import ProtocolHero from './ProtocolHero'
import ProtocolQuizSection from './ProtocolQuizSection'
import SunbeamMatGlow from './SunbeamMatGlow'

/** Five page-opening heroes. The homepage protocol section sits under each one, unchanged. */

const EYEBROW_ROSE = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const PAD = 'px-6 md:px-[max(36px,8vw)]'

const EXAMPLES = [
  { id: 'split', num: '01', label: 'Split' },
  { id: 'offset', num: '02', label: 'Offset' },
  { id: 'rule', num: '03', label: 'Rule' },
  { id: 'plate', num: '04', label: 'Plate' },
  { id: 'consultation', num: '05', label: 'Consultation' },
] as const

const SHELL = 'px-6 py-10 md:px-[max(36px,8vw)] md:py-14'

function HeroWords({ headingClass = 'text-[#252520]' }: { headingClass?: string }) {
  return <h2 className={`max-w-[650px] ${HEADING} ${headingClass}`}>Build your protocol</h2>
}

function ExampleLabel({ num, title, note }: { num: string; title: string; note: string }) {
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

function Split() {
  return (
    <section className={`bg-[#F7F4EF] text-[#252520] ${SHELL}`}>
      <div className="mx-auto grid max-w-5xl overflow-hidden bg-[#FFFDFA] min-[681px]:min-h-[320px] min-[681px]:grid-cols-[minmax(0,0.92fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col justify-center px-6 py-8 min-[681px]:px-10">
          <HeroWords />
        </div>
        <div className="relative min-h-[220px] overflow-hidden bg-[#FFFDFA]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
          <div className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[130%] w-[58%] rounded-t-[180px] bg-[#f3eceb]" />
          <div className="pointer-events-none absolute -bottom-[14%] right-[18%] h-[122%] w-[52%] rounded-t-[160px] border border-[#D6C3C2] bg-transparent" />
          <div className="pointer-events-none absolute top-[12%] left-[8%] h-[42%] w-[28%] rounded-full bg-[#F3EDE5]/40 blur-2xl" />
          <SunbeamMatGlow />
          <div className="absolute inset-[10%] z-[1] overflow-hidden">
            <img
              src="/designs/working/protocol-hero.jpg"
              alt="Skin Protocol RX bottles and jars on stone in sunlit spa light"
              className="h-full w-full object-cover object-[center_40%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Offset() {
  return (
    <section className={`overflow-hidden bg-white text-[#252520] ${SHELL}`}>
      <div className="relative mx-auto grid max-w-5xl min-[681px]:min-h-[300px] min-[681px]:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-10 z-[1] h-[180px] w-[180px]">
          <div className="absolute inset-0 rounded-full border border-[#C4A8A6]" />
          <div className="absolute inset-[9%] origin-center animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#C4A8A6] motion-reduce:animate-none" />
        </div>
        <div className="relative z-10 flex flex-col justify-center py-8 pr-6">
          <HeroWords />
        </div>
        <div className="relative z-10 flex flex-col justify-center py-6">
          <OffsetPhoto
            src="/designs/working/protocol-hero.jpg"
            alt="Skin Protocol RX bottles and jars on stone in sunlit spa light"
            imgClassName="h-[clamp(200px,24vw,300px)] object-[center_40%]"
          />
        </div>
      </div>
    </section>
  )
}

function Rule() {
  return (
    <section className="bg-[#FFFDFA] px-6 py-14 text-[#252520] md:px-[max(36px,8vw)] md:py-16">
      <div className="mx-auto max-w-xl">
        <HeroWords />
        <div className="mt-6 h-px w-16 bg-[#ab8584]" aria-hidden="true" />
      </div>
    </section>
  )
}

function Plate() {
  return (
    <section className={`bg-[#FFFDFA] text-[#252520] ${SHELL}`}>
      <div className="mx-auto grid max-w-3xl items-center gap-8 min-[681px]:grid-cols-[minmax(0,1fr)_200px]">
        <HeroWords />
        <img
          src="/designs/working/protocol-hero.jpg"
          alt="Skin Protocol RX bottles and jars on stone in sunlit spa light"
          className="aspect-square w-full max-w-[200px] border border-[#C4A8A6] object-cover object-[center_40%]"
        />
      </div>
    </section>
  )
}

export default function HeroSectionPreview() {
  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <header className={`border-b border-[#D6CEC3] bg-[#FFFDFA] py-10 md:py-12 ${PAD}`}>
        <p className={EYEBROW_ROSE}>Working · Preview</p>
        <h1 className="mt-3 max-w-[760px] font-serif text-[clamp(32px,5vw,48px)] leading-[1.1] font-normal tracking-[-0.04em]">
          Hero sections
        </h1>
        <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-[#595750]">
          Five ways to open the page. The hero is the page name. The homepage section sits underneath, unchanged.
        </p>
        <a
          href="/designs/working"
          className="mt-5 inline-flex text-[12px] font-semibold tracking-[0.08em] text-[#252520] uppercase underline-offset-4 hover:text-[#ab8584] hover:underline"
        >
          ← Back to Working
        </a>
      </header>

      <nav aria-label="Hero examples" className="sticky top-11 z-40 border-b border-[#D6CEC3] bg-[#FFFDFA]/95 backdrop-blur-md">
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

      <section id="split" className="scroll-mt-16">
        <ExampleLabel num="01" title="Split" note="A narrower split. The name on the left, the sunbeam frame on the right." />
        <Split />
        <ProtocolQuizSection id="split-quiz" />
      </section>
      <section id="offset" className="scroll-mt-16">
        <ExampleLabel num="02" title="Offset" note="The same pair, held to a narrower width, with a smaller ring." />
        <Offset />
        <ProtocolQuizSection id="offset-quiz" />
      </section>
      <section id="rule" className="scroll-mt-16">
        <ExampleLabel num="03" title="Rule" note="The page name only, in a narrow column, with a short rose rule." />
        <Rule />
        <ProtocolQuizSection id="rule-quiz" />
      </section>
      <section id="plate" className="scroll-mt-16">
        <ExampleLabel num="04" title="Plate" note="The name beside a small framed photograph. The pair stays compact." />
        <Plate />
        <ProtocolQuizSection id="plate-quiz" />
      </section>
      <section id="consultation" className="scroll-mt-16">
        <ExampleLabel num="05" title="Consultation" note="The page name, centered. Step names sit under the numbers on tablet and desktop. Phones show the numbers only." />
        <ProtocolHero />
        <ProtocolQuizSection id="consultation-quiz" />
      </section>
    </article>
  )
}
