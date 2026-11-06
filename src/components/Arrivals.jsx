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
  const hovered = useRef(false)
  const touching = useRef(false)
  const swiping = useRef(false)
  const startAutoplayRef = useRef(() => {})
  const swipeCooldown = useRef(false)
  const resumeTimer = useRef(null)
  const pausedTransition = useRef(null)
  const resumeListener = useRef(null)
  const rampListener = useRef(null)
  const ramping = useRef(false)
  const rampPending = useRef(false)
  const baseSpeed = 7000

  const startAutoplay = useCallback((ramp = false) => {
    if (ramp) rampPending.current = true
    const swiper = swiperRef.current
    if (!swiper || reducedMotion || hovered.current || touching.current || swiping.current || swiper.autoplay?.running) return

    const resumeTransition = () => {
      if (!pausedTransition.current) {
        if (rampPending.current) {
          ramping.current = true
          swiper.params.speed = baseSpeed / 2
          swiper.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.33, 0, 0.8, 0.9)'
          const handleRampEnd = (event) => {
            if (event.target !== swiper.wrapperEl || event.propertyName !== 'transform') return
            swiper.wrapperEl.removeEventListener('transitionend', handleRampEnd)
            rampListener.current = null
            ramping.current = false
            swiper.params.speed = baseSpeed
            swiper.wrapperEl.style.transitionTimingFunction = 'linear'
          }
          rampListener.current = handleRampEnd
          swiper.wrapperEl.addEventListener('transitionend', handleRampEnd)
          rampPending.current = false
        }
        swiper.autoplay?.start()
        return
      }

      const { target, duration } = pausedTransition.current
      pausedTransition.current = null
      const handleTransitionEnd = (event) => {
        if (event.target !== swiper.wrapperEl || event.propertyName !== 'transform') return
        swiper.wrapperEl.removeEventListener('transitionend', handleTransitionEnd)
        resumeListener.current = null
        swiper.animating = false
        swiper.setTransition(0)
        swiper.params.speed = baseSpeed
        swiper.wrapperEl.style.transitionTimingFunction = 'linear'
        startAutoplayRef.current()
      }
      resumeListener.current = handleTransitionEnd
      swiper.wrapperEl.addEventListener('transitionend', handleTransitionEnd)
      swiper.setTransition(duration)
      swiper.setTranslate(target)
      swiper.animating = true
    }

    if (swiper.animating) {
      if (resumeListener.current) return
      const current = swiper.getTranslate()
      const target = swiper.rtlTranslate
        ? swiper.slidesGrid[swiper.activeIndex]
        : -swiper.slidesGrid[swiper.activeIndex]
      const totalDistance = Math.abs(target - swiper.previousTranslate)
      const remainingDistance = Math.abs(target - current)
      const duration = totalDistance > 0
        ? swiper.params.speed * remainingDistance / totalDistance
        : 0
      pausedTransition.current = duration > 0 && remainingDistance > 0
        ? { target, duration }
        : null
      swiper.setTransition(0)
      swiper.setTranslate(current)
      swiper.animating = false
    }

    resumeTransition()
  }, [baseSpeed, reducedMotion])

  const resumeAutoplay = useCallback(() => {
    if (hovered.current || touching.current || swiping.current) return
    if (swipeCooldown.current) {
      if (resumeTimer.current) return
      resumeTimer.current = setTimeout(() => {
        resumeTimer.current = null
        swipeCooldown.current = false
        startAutoplay(true)
      }, 3000)
      return
    }
    startAutoplay()
  }, [startAutoplay])

  useEffect(() => {
    startAutoplayRef.current = startAutoplay
  }, [startAutoplay])

  const pauseAutoplay = useCallback((preserveTransition = true, cancelCooldown = false) => {
    const swiper = swiperRef.current
    if (!swiper) return

    if (cancelCooldown && resumeTimer.current) {
      clearTimeout(resumeTimer.current)
      resumeTimer.current = null
    }
    if (resumeListener.current) {
      swiper.wrapperEl.removeEventListener('transitionend', resumeListener.current)
      resumeListener.current = null
    }
    if (rampListener.current) {
      swiper.wrapperEl.removeEventListener('transitionend', rampListener.current)
      rampListener.current = null
      ramping.current = false
      swiper.params.speed = baseSpeed
      swiper.wrapperEl.style.transitionTimingFunction = 'linear'
    }

    if (!preserveTransition) pausedTransition.current = null
    if (swiper.autoplay?.running) swiper.autoplay.stop()
    if (!swiper.animating) return

    const current = swiper.getTranslate()
    const target = swiper.rtlTranslate
      ? swiper.slidesGrid[swiper.activeIndex]
      : -swiper.slidesGrid[swiper.activeIndex]
    const totalDistance = Math.abs(target - swiper.previousTranslate)
    const remainingDistance = Math.abs(target - current)
    const duration = totalDistance > 0
      ? swiper.params.speed * remainingDistance / totalDistance
      : 0
    pausedTransition.current = preserveTransition && duration > 0 && remainingDistance > 0
      ? { target, duration }
      : null
    swiper.setTransition(0)
    swiper.setTranslate(current)
    swiper.animating = false
  }, [baseSpeed])

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper) return

    if (reducedMotion) {
      pauseAutoplay(false, true)
    } else {
      resumeAutoplay()
    }
  }, [pauseAutoplay, reducedMotion, resumeAutoplay])

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    const swiper = swiperRef.current
    if (swiper && resumeListener.current) {
      swiper.wrapperEl.removeEventListener('transitionend', resumeListener.current)
    }
    if (swiper && rampListener.current) {
      swiper.wrapperEl.removeEventListener('transitionend', rampListener.current)
    }
  }, [])

  const endSwipe = () => {
    if (!touching.current) return
    touching.current = false
    swiping.current = false
    resumeAutoplay()
  }

  return (
    <Reveal as="section" className="mt-12 pb-16 md:py-0 md:pb-24" id="selected-pieces" aria-labelledby="arrivals-title">
      <div className="mx-auto w-[min(calc(100%-40px),1280px)]">
        <Divider className="mb-16 md:mb-20" />
      </div>
      <div className="mx-auto w-[min(calc(100%-40px),1280px)] pb-[18px] md:pb-6">
        <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-secondary uppercase">
          {t('arrivals.eyebrow')}
        </p>
        <div className="flex items-center justify-between gap-3">
          <h2
            className="m-0 min-w-0 max-w-[720px] font-display text-[clamp(36px,6vw,56px)] leading-[0.92] font-normal tracking-[-0.055em] uppercase md:text-[64px]"
            id="arrivals-title"
          >
            {t('arrivals.title')}
          </h2>
          <FlowerMark className="h-[30px] w-[30px] shrink-0 fill-current" />
        </div>
        {/* <p className="mt-[18px] mb-0 text-[13px] text-secondary">
          {t('arrivals.swipeHint')}
        </p> */}
      </div>
      <div
        className="mx-auto w-[min(calc(100%-40px),1280px)] md:px-0"
        onMouseEnter={() => {
          hovered.current = true
          pauseAutoplay()
        }}
        onMouseLeave={() => {
          hovered.current = false
          resumeAutoplay()
        }}
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
            waitForTransition: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            swiper.params.speed = baseSpeed
            if (reducedMotion) {
              swiper.autoplay?.stop()
            } else {
              startAutoplay()
            }
          }}
          onTouchStart={() => {
            touching.current = true
            pauseAutoplay(true, true)
          }}
          onSliderFirstMove={() => {
            swiping.current = true
            swipeCooldown.current = true
            pausedTransition.current = null
            pauseAutoplay(false, true)
          }}
          onTouchEnd={endSwipe}
          onTouchCancel={endSwipe}
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
          {t('arrivals.browseAll')}<span aria-hidden="true" className="text-xl font-black flex items-center justify-center leading-none scale-x-65 select-none translate-y-[-2px] translate-x-[3px]">→</span>
        </a>
      </div>
    </Reveal>
  )
}
