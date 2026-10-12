import FlowerMark from './FlowerMark'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid w-[min(calc(100%-40px),1280px)] gap-4 py-7 md:grid-cols-[1fr_1fr_auto] md:items-center md:py-9">
        <a className="inline-flex w-fit items-center gap-2 font-display text-2xl tracking-[-0.06em]" href="#top">
          ReClaim<FlowerMark className="h-[18px] w-[18px] fill-current" />
        </a>
        <p className="m-0 text-[14px] text-accent">Good finds, good stories.</p>
        <div className="flex gap-5 pt-1 text-[13px]">
          <a className="inline-flex min-h-9 items-center" href="https://www.instagram.com/reclaimvintage.bp/" target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a className="inline-flex min-h-9 items-center" href="https://www.tiktok.com/@reclaimvintage.bp" target="_blank" rel="noreferrer">
            TikTok ↗
          </a>
        </div>
      </div>
      <div className="mx-auto flex min-h-12 w-[min(calc(100%-40px),1280px)] items-center justify-between border-t border-secondary text-[11px] tracking-[0.08em] text-accent uppercase">
        <span>ReClaim Vintage Budapest</span>
        <span>EN</span>
      </div>
    </footer>
  )
}
