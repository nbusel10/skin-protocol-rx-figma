type VariantId = 1 | 2 | 3 | 4

const VARIANTS: {
  id: VariantId
  title: string
  note: string
}[] = [
  {
    id: 1,
    title: 'Variation 1 — Layered Soft Arches',
    note: 'Ivory base with layered pale beige arches — refined medspa luxury.',
  },
  {
    id: 2,
    title: 'Variation 2 — Tone-on-Tone Blocks',
    note: 'Overlapping rectangular panels in soft ivory, beige, and stone — geometric editorial.',
  },
  {
    id: 3,
    title: 'Variation 3 — Spa Niche',
    note: 'Inset alcove with soft shadow — serene spa-interior calm.',
  },
  {
    id: 4,
    title: 'Variation 4 — Minimal Line Arch',
    note: 'One filled arch, one thin outline, generous negative space — quiet editorial.',
  },
]

function HeroCopy() {
  return (
    <div className="flex flex-col justify-center px-6 py-6 min-[681px]:py-8 min-[681px]:pr-[8%] min-[681px]:pl-[max(36px,8vw)]">
      <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Skincare with intention</p>
      <h1 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
        Your Skin Doesn&apos;t Need More. <em className="italic text-[#ab8584]">It Needs What Works.</em>
      </h1>
      <p className="mb-4 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
        Every formula is thoughtfully crafted with evidence-based science to support healthier skin—without trends or unnecessary extras.
      </p>
      <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
        <button type="button" className="inline-flex min-h-12 w-full items-center justify-center gap-4 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white hover:bg-[#4A4942] min-[480px]:w-auto">
          Explore the collection <span aria-hidden="true">↗</span>
        </button>
        <button type="button" className="inline-flex min-h-12 w-full items-center justify-center gap-4 border border-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#252520] hover:text-white min-[480px]:w-auto">
          Build your protocol <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  )
}

function ProductFrame({ overlayClass = 'bottom-8 left-8' }: { overlayClass?: string }) {
  return (
    <>
      <div className="absolute inset-[8%] overflow-hidden">
        <img
          src="/designs/working/shop-hero.jpg"
          alt="Skin Protocol RX bottles and jars on cream stone"
          className="h-full w-full object-cover"
        />
      </div>
      <p
        className={`absolute max-w-[250px] bg-[#EDE6DC]/40 px-5 py-4 font-serif text-xl italic leading-snug text-[#252520] backdrop-blur-sm ${overlayClass}`}
      >
        Science guided by nature.
      </p>
    </>
  )
}

function BackgroundArches() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[#F7F1E8]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F1] via-[#EFE8DD] to-[#E8DFD4]" />
      <div className="absolute -bottom-[18%] left-[6%] h-[128%] w-[58%] rounded-t-[220px] bg-[#E8DFD3]/70" />
      <div className="absolute -bottom-[12%] left-[18%] h-[118%] w-[52%] rounded-t-[200px] bg-[#F3EDE4]/85" />
      <div className="absolute -top-[8%] right-[4%] h-[120%] w-[56%] rounded-t-[210px] border-[28px] border-[#EDE6DC]/55" />
      <div className="absolute -top-[4%] right-[14%] h-[112%] w-[46%] rounded-t-[180px] bg-[#FAF6F0]/35" />
    </div>
  )
}

function BackgroundBlocks() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[#F8F4EF]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFA] to-[#F3EEE6]" />
      <div className="absolute top-[8%] left-[6%] h-[62%] w-[48%] bg-[#EDE6DC]/80" />
      <div className="absolute top-[18%] left-[22%] h-[58%] w-[42%] bg-[#F7F1E8]/90" />
      <div className="absolute right-[6%] bottom-[10%] h-[70%] w-[44%] bg-[#E8DFD4]/75" />
      <div className="absolute right-[16%] top-[12%] h-[46%] w-[36%] border border-[#D9D0C4]/80 bg-[#FFFDFA]/40" />
      <div className="absolute left-[10%] bottom-[8%] h-[28%] w-[34%] bg-[#FAF6F0]/70" />
    </div>
  )
}

function BackgroundNiche() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[#F4EFE8]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#EFE8DF] to-[#E6DDD2]" />
      <div
        className="absolute inset-[7%] rounded-[28px]"
        style={{
          background: 'linear-gradient(160deg, #F8F3EC 0%, #EBE3D8 55%, #E4DBD0 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.65), inset 18px 0 36px rgba(180,165,145,0.12), inset -18px 0 36px rgba(180,165,145,0.1), inset 0 24px 48px rgba(160,145,125,0.14)',
        }}
      />
      <div
        className="absolute inset-[14%] rounded-[18px]"
        style={{
          background: 'linear-gradient(180deg, #FFFDFA 0%, #F3EDE5 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(215,205,190,0.35), 0 18px 40px rgba(120,100,80,0.06)',
        }}
      />
    </div>
  )
}

function BackgroundMinimalArch() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[#FFFDFA]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDFA] via-[#F7F2EB] to-[#F0E9E0]" />
      <div className="absolute -bottom-[20%] right-[10%] h-[130%] w-[58%] rounded-t-[240px] bg-[#EDE6DC]/55" />
      <div className="absolute -bottom-[14%] right-[18%] h-[122%] w-[52%] rounded-t-[220px] border border-[#D6CEC3]/70 bg-transparent" />
      <div className="absolute top-[12%] left-[8%] h-[42%] w-[28%] rounded-full bg-[#F3EDE5]/40 blur-2xl" />
    </div>
  )
}

function HeroVariation({ id }: { id: VariantId }) {
  return (
    <section className="bg-[#FFFDFA] py-10 md:py-14">
      <div className="grid min-[681px]:min-h-[clamp(320px,36vw,520px)] min-[681px]:grid-cols-[48%_52%]">
        <HeroCopy />
        <div className="relative min-h-[300px] overflow-hidden">
          {id === 1 && <BackgroundArches />}
          {id === 2 && <BackgroundBlocks />}
          {id === 3 && <BackgroundNiche />}
          {id === 4 && <BackgroundMinimalArch />}
          <ProductFrame overlayClass={id === 3 ? 'bottom-10 left-10' : 'bottom-8 left-8'} />
        </div>
      </div>
    </section>
  )
}

export default function HeroBackgroundPreview() {
  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <header className="border-b border-[#D6CEC3] bg-[#FFFDFA] px-6 py-10 md:px-[max(36px,8vw)] md:py-12">
        <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Working · Preview</p>
        <h1 className="mt-3 max-w-[720px] font-serif text-[clamp(32px,5vw,48px)] font-normal leading-[1.1] tracking-[-0.04em]">
          Hero Background Explorations
        </h1>
        <p className="mt-3 max-w-[540px] text-[15px] leading-relaxed text-[#595750]">
          Same left-column copy and product photo. Only the right-column background treatment changes.
        </p>
        <a
          href="/designs/working"
          className="mt-5 inline-flex text-[12px] font-semibold tracking-[0.08em] uppercase text-[#252520] underline-offset-4 hover:text-[#ab8584] hover:underline"
        >
          ← Back to Working
        </a>
      </header>

      <div className="flex flex-col gap-10 py-10 md:gap-14 md:py-14">
        {VARIANTS.map(variant => (
          <div key={variant.id}>
            <div className="mb-4 px-6 md:px-[max(36px,8vw)]">
              <h2 className="font-serif text-[22px] leading-tight text-[#252520] md:text-[26px]">{variant.title}</h2>
              <p className="mt-1 max-w-[560px] text-[13px] leading-relaxed text-[#6D6A63]">{variant.note}</p>
            </div>
            <div className="border-y border-[#D6CEC3]">
              <HeroVariation id={variant.id} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
