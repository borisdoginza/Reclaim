import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import products from '../data/products.js'
import { useTranslation } from 'react-i18next'
import FlowerMark from './FlowerMark'
import ProductCard from './ProductCard'
import useMediaQuery from '../hooks/useMediaQuery'
import Divider from './Divider'
import Reveal from './Reveal'

const PIXELS_PER_SECOND = 35
const RESUME_DELAY = 3000
const RAMP_DURATION = 1500

export default function Arrivals() {
  const { t } = useTranslation()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const setWidthRef = useRef(0)
  const factorRef = useRef(0)
  const velocityRef = useRef(0)
  const hoveredRef = useRef(false)
  const draggingRef = useRef(null)
  const cooldownUntilRef = useRef(0)
  const resumeTimerRef = useRef(null)
  const rampRef = useRef(null)
  const suppressClickRef = useRef(false)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    const measure = () => {
      viewport.style.setProperty('--arrivals-width', `${viewport.clientWidth}px`)
      const [firstSet, secondSet] = track.children
      if (!firstSet || !secondSet) return

      setWidthRef.current = secondSet.offsetLeft - firstSet.offsetLeft
      if (setWidthRef.current > 0) {
        offsetRef.current = ((offsetRef.current % setWidthRef.current) + setWidthRef.current)
          % setWidthRef.current
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
    }

    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    measure()

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frameId
    let previousTime

    const tick = (time) => {
      if (previousTime !== undefined && setWidthRef.current > 0) {
        const elapsedMs = Math.min(time - previousTime, 50)
        let movement = 0

        if (rampRef.current) {
          const progress = Math.min((time - rampRef.current.startedAt) / RAMP_DURATION, 1)
          factorRef.current = progress
          if (progress === 1) rampRef.current = null
        }

        if (!reducedMotion && !draggingRef.current) {
          if (Math.abs(velocityRef.current) >= 0.02) {
            movement += velocityRef.current * elapsedMs
            velocityRef.current *= 0.95 ** (elapsedMs / 16.67)
            if (Math.abs(velocityRef.current) < 0.02) velocityRef.current = 0
          }

          movement += PIXELS_PER_SECOND * factorRef.current * (elapsedMs / 1000)
        } else if (reducedMotion) {
          velocityRef.current = 0
        }

        if (movement !== 0) {
          offsetRef.current = ((offsetRef.current + movement) % setWidthRef.current + setWidthRef.current)
            % setWidthRef.current
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
        }
      }

      previousTime = time
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [reducedMotion])

  const pause = () => {
    rampRef.current = null
    factorRef.current = 0
  }

  const resume = useCallback(() => {
    if (reducedMotion || hoveredRef.current || draggingRef.current) return

    if (Date.now() < cooldownUntilRef.current) {
      factorRef.current = 0
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = setTimeout(() => {
        resumeTimerRef.current = null
        if (reducedMotion || hoveredRef.current || draggingRef.current) return
        rampRef.current = { startedAt: performance.now() }
      }, Math.max(cooldownUntilRef.current - Date.now(), 0))
      return
    }

    factorRef.current = 1
    rampRef.current = null
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      factorRef.current = 0
      rampRef.current = null
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = null
      }
    } else {
      resume()
    }
  }, [reducedMotion, resume])

  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }, [])

  const handlePointerDown = (event) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return

    draggingRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      moved: false,
    }
    velocityRef.current = 0
    pause()
  }

  const handlePointerMove = (event) => {
    const drag = draggingRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const delta = event.clientX - drag.startX
    const sampleDelta = event.clientX - drag.lastX
    const sampleElapsed = event.timeStamp - drag.lastTime
    if (Math.abs(delta) > 4) {
      if (!drag.moved) event.currentTarget.setPointerCapture(event.pointerId)
      drag.moved = true
      suppressClickRef.current = true
    }

    if (drag.moved && sampleElapsed > 0) {
      const instantaneousVelocity = -(sampleDelta / sampleElapsed)
      velocityRef.current = 0.7 * velocityRef.current + 0.3 * instantaneousVelocity
    }
    drag.lastX = event.clientX
    drag.lastTime = event.timeStamp

    if (!drag.moved || setWidthRef.current <= 0) return

    offsetRef.current = ((drag.startOffset - delta) % setWidthRef.current + setWidthRef.current)
      % setWidthRef.current
    trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
  }

  const handlePointerUp = (event) => {
    const drag = draggingRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    draggingRef.current = null
    cooldownUntilRef.current = drag.moved ? Date.now() + RESUME_DELAY : Date.now()
    resume()

    if (suppressClickRef.current) {
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 0)
    }
  }

  const handlePointerCancel = (event) => {
    const drag = draggingRef.current
    if (drag?.pointerId !== event.pointerId) return
    draggingRef.current = null
    cooldownUntilRef.current = drag.moved ? Date.now() + RESUME_DELAY : Date.now()
    if (!drag.moved) velocityRef.current = 0
    resume()
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
      </div>
      <div
        ref={viewportRef}
        className="arrivals-viewport mx-auto w-[min(calc(100%-40px),1280px)] md:px-0"
        role="region"
        aria-label={t('arrivals.listLabel')}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'mouse') return
          hoveredRef.current = true
          pause()
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== 'mouse') return
          hoveredRef.current = false
          resume()
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handlePointerCancel}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return
          event.preventDefault()
          event.stopPropagation()
          suppressClickRef.current = false
        }}
      >
        <div ref={trackRef} className="arrivals-track">
          {[0, 1, 2].map((copy) => (
            <div
              key={copy}
              className="arrivals-set"
              aria-hidden={copy === 1}
              inert={copy === 1}
            >
              {products.map((product) => (
                <div className="arrivals-card" key={`${copy}-${product.id}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ))}
        </div>
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
