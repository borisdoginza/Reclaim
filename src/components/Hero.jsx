import { useTranslation } from 'react-i18next'
import FlowerMark from './FlowerMark'
import HeroDesktopCollage from './HeroDesktopCollage'
import HeroMobileSlider from './HeroMobileSlider'
import useMediaQuery from '../hooks/useMediaQuery'

export default function Hero() {
  const { t } = useTranslation()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section
      className="mx-auto grid w-[min(calc(100%-40px),1280px)] grid-cols-1 items-center gap-6 pt-5 pb-12 md:grid-cols-[1.05fr_0.95fr] md:gap-[clamp(40px,8vw,112px)] md:pt-10 md:pb-20"
      aria-labelledby="hero-title"
    >
      {isDesktop ? <HeroDesktopCollage /> : <HeroMobileSlider />}
      <div className="md:py-8">
        <p className="mb-[14px] flex items-center gap-[9px] text-[12px] leading-[1.4] font-medium tracking-[0.12em] text-secondary uppercase">
          <FlowerMark className="h-5 w-5 shrink-0 fill-current" />
          {t('hero.eyebrow')}
        </p>
        <h1
          className="m-0 max-w-[720px] font-display text-[clamp(44px,14vw,64px)] leading-[0.92] font-normal tracking-[-0.055em] uppercase md:text-[clamp(64px,8vw,96px)]"
          id="hero-title"
        >
          {t('hero.title')}
        </h1>
        <p className="mt-[18px] mb-[22px] max-w-[320px] text-[16px] leading-[1.5] text-secondary md:my-6">
          {t('hero.description')}
        </p>
        <a
          className="inline-flex min-h-12 items-center justify-between gap-7 border border-ink bg-ink px-4 text-[13px] font-semibold tracking-[0.06em] text-paper uppercase transition-colors duration-150 hover:bg-secondary focus-visible:bg-secondary"
          href="#new-arrivals"
        >
          {t('hero.action')}<span aria-hidden="true">↘</span>
        </a>
      </div>
    </section>
  )
}
