import { useTranslation } from 'react-i18next'
import FlowerMark from './FlowerMark'
import HeroDesktopCollage from './HeroDesktopCollage'
import HeroMobileSlider from './HeroMobileSlider'
import useMediaQuery from '../hooks/useMediaQuery'
import heroFit from '../config/heroFit'

export default function Hero() {
  const { t, i18n } = useTranslation()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section
      className="mx-auto grid w-[min(calc(100%-40px),1280px)] grid-cols-1 items-center gap-6 pt-5 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-[clamp(40px,calc(8vw-1.4rem),112px)] md:pt-30 md:pb-20"
      aria-labelledby="hero-title"
    >
      <div className="min-w-0 motion-safe:animate-hero-fade-in">
        {isDesktop ? <HeroDesktopCollage /> : <HeroMobileSlider />}
      </div>
      <div
        className="min-w-0 [container-type:inline-size] md:py-8"
        style={{
          '--hero-fit-en': heroFit.en,
          '--hero-fit-hu': heroFit.hu,
        }}
      >
        <div className="motion-safe:animate-hero-fade-in">
          <p className="mb-[14px] flex items-center gap-[9px] text-[12px] leading-[1.4] font-medium tracking-[0.12em] text-secondary uppercase">
            <FlowerMark className="h-5 w-5 shrink-0 fill-current" />
            {t('hero.eyebrow')}
          </p>
          <h1
            className="hero-title m-0 w-full max-w-[720px] min-w-0 font-display text-[clamp(2.25rem,14vw,4rem)] leading-[0.92] font-normal tracking-[-0.055em] uppercase"
            id="hero-title"
          >
            {i18n.resolvedLanguage === 'hu' ? (
              <>
                {t('hero.titleStart')}{' '}
                <br className="hidden md:block lg:hidden" />
                {t('hero.titleRest')}
              </>
            ) : t('hero.title')}
          </h1>
        </div>
        <div className="motion-safe:animate-hero-fade-in motion-safe:[animation-delay:500ms]">
          <p className="mt-[18px] mb-[22px] max-w-[320px] text-[16px] leading-[1.5] text-secondary md:my-6">
            {t('hero.description')}
          </p>
          <a
            className="inline-flex min-h-12 items-center justify-between gap-7 border border-ink bg-ink px-4 text-[13px] font-semibold tracking-[0.06em] text-paper uppercase transition-colors duration-150 hover:text-ink hover:bg-paper focus-visible:bg-secondary"
            href="#selected-pieces"
          >
            {t('hero.action')}<span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
