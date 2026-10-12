import heroImage from '../assets/images/interior/We are beyond grateful that so many of you came to our opening weekend. Thank you for all the lo.jpg'
import FlowerMark from './FlowerMark'

export default function Hero() {
  return (
    <section
      className="mx-auto w-[min(calc(100%-40px),1280px)] pt-5 pb-12 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-[clamp(40px,8vw,112px)] md:pt-10 md:pb-20"
      aria-labelledby="hero-title"
    >
      <div className="relative">
        <img
          className="block aspect-[4/5] w-full object-cover object-[center_46%] md:max-h-[760px]"
          src={heroImage}
          alt="Inside the ReClaim vintage shop, with clothing racks and a bright, open interior"
          width="1170"
          height="1460"
          fetchPriority="high"
        />
        <span className="absolute top-4 right-3 rotate-[4deg] border border-ink bg-accent px-3 py-2.5 text-[11px] font-semibold tracking-[0.12em] text-ink">
          ONE OF A KIND
        </span>
      </div>
      <div className="pt-6 pb-12 md:py-8">
        <p className="mb-[14px] flex items-center gap-[9px] text-[12px] leading-[1.4] font-medium tracking-[0.12em] text-secondary uppercase">
          <FlowerMark className="h-5 w-5 shrink-0 fill-current" />
          Vintage shop · Budapest
        </p>
        <h1
          className="m-0 max-w-[720px] font-display text-[clamp(44px,14vw,64px)] leading-[0.92] font-normal tracking-[-0.055em] uppercase md:text-[clamp(64px,8vw,96px)]"
          id="hero-title"
        >
          Good things, found again.
        </h1>
        <p className="mt-[18px] mb-[22px] max-w-[320px] text-[16px] leading-[1.5] text-secondary md:my-6">
          A little something with a past, waiting for its next chapter.
        </p>
        <a
          className="inline-flex min-h-12 items-center justify-between gap-7 border border-ink bg-ink px-4 text-[13px] font-semibold tracking-[0.06em] text-paper uppercase transition-colors duration-150 hover:bg-secondary focus-visible:bg-secondary"
          href="#new-arrivals"
        >
          Meet the edit<span aria-hidden="true">↘</span>
        </a>
      </div>
    </section>
  )
}
