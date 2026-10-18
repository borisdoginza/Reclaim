import { useCallback, useEffect, useRef } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import products from '../data/products.js'
import { useTranslation } from 'react-i18next'
import FlowerMark from './FlowerMark'
import ProductCard from './ProductCard'
import useMediaQuery from '../hooks/useMediaQuery'
import Divider from './Divider'
import Reveal from './Reveal'

export default function Arrivals() {
  const { t } = useTranslation()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const swiperRef = useRef(null)
  const interactionPaused = useRef(false)
  const resumeSegment = useRef(null)
  const resumeListener = useRef(null)
  const activeSegment = useRef(null)

  const stopAutoplay = useCallback((preservePosition = false) => {
    const swiper = swiperRef.current
    if (!swiper) return

    if (resumeListener.current) {
      swiper.wrapperEl.removeEventListener('transitionend', resumeListener.current)
      resumeListener.current = null
    }

    if (!preservePosition) {
      resumeSegment.current = null
      activeSegment.current = null
    }

    const autoplayRunning = swiper.autoplay?.running
    if (!autoplayRunning && !swiper.animating) return
    const translate = swiper.getTranslate()
    if (preservePosition) {
      const target = swiper.rtlTranslate
        ? swiper.slidesGrid[swiper.activeIndex]
        : -swiper.slidesGrid[swiper.activeIndex]
      const remainingDistance = Math.abs(target - translate)
      const previousSegment = activeSegment.current
      const totalDistance = previousSegment
        ? Math.abs(previousSegment.target - previousSegment.from)
        : Math.abs(target - swiper.previousTranslate)
      const remainingDuration = previousSegment
        ? previousSegment.duration * remainingDistance / totalDistance
        : swiper.params.speed * remainingDistance / totalDistance

      resumeSegment.current = totalDistance > 0 && remainingDistance > 0
        ? {
            target,
            duration: remainingDuration,
          }
        : null
    }

    if (autoplayRunning) swiper.autoplay.stop()
    activeSegment.current = null
    swiper.setTransition(0)
    swiper.setTranslate(translate)
    swiper.animating = false
  }, [])

  const startAutoplay = useCallback(() => {
    const swiper = swiperRef.current
    if (!swiper || swiper.autoplay.running || reducedMotion || interactionPaused.current) return

    const segment = resumeSegment.current
    resumeSegment.current = null

    if (segment) {
      const from = swiper.getTranslate()
      const handleTransitionEnd = (event) => {
        if (event.target !== swiper.wrapperEl || event.propertyName !== 'transform') return
        swiper.wrapperEl.removeEventListener('transitionend', handleTransitionEnd)
        resumeListener.current = null
        activeSegment.current = null
        swiper.animating = false
        swiper.setTransition(0)
        swiper.autoplay.start()
      }
      activeSegment.current = { ...segment, from }
      resumeListener.current = handleTransitionEnd
      swiper.wrapperEl.addEventListener('transitionend', handleTransitionEnd)
      swiper.setTransition(segment.duration)
      swiper.setTranslate(segment.target)
      swiper.animating = true
      return
    }

    swiper.autoplay.start()
  }, [reducedMotion])

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper) return

    if (reducedMotion) {
      stopAutoplay(false)
    } else if (!interactionPaused.current) {
      startAutoplay()
    }
  }, [reducedMotion, startAutoplay, stopAutoplay])

  function pauseAutoplay() {
    interactionPaused.current = true
    stopAutoplay(true)
  }

  function resumeAutoplay() {
    interactionPaused.current = false
    startAutoplay()
  }

  return (
    <Reveal as="section" className="mt-12 pb-16 md:py-20 md:pb-24" id="selected-pieces" aria-labelledby="arrivals-title">
      <div className="mx-auto w-[min(calc(100%-40px),1280px)]">
        <Divider className="mb-16 md:mb-20" />
      </div>
      <div className="mx-auto w-[min(calc(100%-40px),1280px)] pb-[18px] md:pb-6">
        <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-secondary uppercase">
          {t('arrivals.eyebrow')}
        </p>
        <div className="flex items-center justify-between gap-3">
          <h2
            className="m-0 max-w-[720px] font-display text-[clamp(40px,12vw,56px)] leading-[0.92] font-normal tracking-[-0.055em] uppercase md:text-[64px]"
            id="arrivals-title"
          >
            {t('arrivals.title')}
          </h2>
          <FlowerMark className="mb-[3px] h-[30px] w-[30px] shrink-0 fill-current" />
        </div>
        {/* <p className="mt-[18px] mb-0 text-[13px] text-secondary">
          {t('arrivals.swipeHint')}
        </p> */}
      </div>
      <div
        className="mx-auto w-[min(calc(100%-40px),1280px)] md:px-0"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onTouchStart={pauseAutoplay}
        onTouchMove={() => {
          resumeSegment.current = null
        }}
        onTouchEnd={resumeAutoplay}
        onTouchCancel={resumeAutoplay}
      >
        <Swiper
          className="arrivals-slider"
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={12}
          loop
          speed={7000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            if (reducedMotion) stopAutoplay()
          }}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          aria-label={t('arrivals.listLabel')}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mx-auto w-[min(calc(100%-40px),1280px)] pt-[24px]">
        <a
          className="inline-flex min-h-12 w-full items-center justify-between gap-7 border border-ink bg-paper px-4 text-[13px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper md:w-auto"
          href="https://www.instagram.com/reclaimvintage.bp/"
          target="_blank"
          rel="noreferrer"
        >
          {t('arrivals.browseAll')}<span aria-hidden="true">↗</span>
        </a>
      </div>
    </Reveal>
  )
}
