import FlowerMark from './FlowerMark'

export default function VisitSection() {
  return (
    <section
      className="mx-auto grid w-[min(calc(100%-40px),1280px)] gap-7 border-t border-ink py-12 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-20 md:py-24"
      id="collection"
      aria-labelledby="visit-title"
    >
      <div>
        <p className="mb-[14px] flex items-center gap-[9px] text-[12px] leading-[1.4] font-medium tracking-[0.12em] text-secondary uppercase">
          <FlowerMark className="h-5 w-5 shrink-0 fill-current" />
          A note from the shop
        </p>
        <h2
          className="mb-[14px] max-w-[440px] font-display text-[34px] leading-[0.98] font-normal tracking-[-0.04em] uppercase md:text-[48px]"
          id="visit-title"
        >
          Come find your next favourite.
        </h2>
        <p className="m-0 max-w-[420px] text-[15px] leading-[1.55] text-secondary">
          A considered mix of vintage, archive and workwear. Come browse, take your time, and see what finds you.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-accent pt-5 md:gap-6" id="visit">
        <div>
          <h3 className="mb-2 text-[11px] font-medium tracking-[0.1em] text-secondary uppercase">Address</h3>
          <p className="m-0 text-[14px]">[TODO]</p>
        </div>
        <div>
          <h3 className="mb-2 text-[11px] font-medium tracking-[0.1em] text-secondary uppercase">Opening hours</h3>
          <p className="m-0 text-[14px]">[TODO]</p>
        </div>
      </div>
    </section>
  )
}
