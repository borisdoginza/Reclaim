import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import fabricImage from '../assets/images/pngs/fabric_bg.png'
import heroTilt from '../config/heroTilt'
import heroImages from '../data/heroImages'
import useMediaQuery from '../hooks/useMediaQuery'

const smallImagePositions = [
  'left-[72%] top-[4%]',
  'left-[2%] top-[66%]',
]

export default function HeroDesktopCollage() {
  const { t } = useTranslation()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerReset, setTimerReset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const activeTransitions = useRef(new Set())
  const collageRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    let timer
    const scheduleNextImage = () => {
      window.clearTimeout(timer)
      if (document.visibilityState === 'visible') {
        timer = window.setTimeout(() => {
          setActiveIndex((index) => (index + 1) % heroImages.length)
        }, 4500)
      }
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        window.clearTimeout(timer)
      } else {
        scheduleNextImage()
      }
    }

    scheduleNextImage()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [activeIndex, prefersReducedMotion, timerReset])

  useEffect(() => {
    const collage = collageRef.current
    if (!collage) return undefined

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let detachPointerHandlers = () => {}

    const resetPointerTilt = (layer) => {
      if (!layer) return

      layer.style.setProperty('--mx', '0')
      layer.style.setProperty('--my', '0')
      layer.style.removeProperty('will-change')
    }

    const updatePointerHandlers = () => {
      detachPointerHandlers()
      detachPointerHandlers = () => {}

      const mainSlot = collage.querySelector('button[data-slot="main"]')
      const pointerLayer = mainSlot?.querySelector('.hero-pointer-tilt')

      if (!pointerLayer) return

      resetPointerTilt(pointerLayer)
      if (!hoverQuery.matches || reducedMotionQuery.matches || document.visibilityState !== 'visible') return

      let animationFrame = null
      let nextX = 0
      let nextY = 0

      const flushPointerTilt = () => {
        animationFrame = null
        if (!Number.isFinite(nextX) || !Number.isFinite(nextY)) {
          resetPointerTilt(pointerLayer)
          return
        }

        pointerLayer.style.setProperty('--mx', String(nextX))
        pointerLayer.style.setProperty('--my', String(nextY))
      }

      const schedulePointerTilt = (x, y) => {
        nextX = x
        nextY = y
        if (animationFrame === null) animationFrame = window.requestAnimationFrame(flushPointerTilt)
      }

      const handlePointerMove = (event) => {
        const rect = mainSlot.getBoundingClientRect()
        if (!Number.isFinite(rect.width) || !Number.isFinite(rect.height) || rect.width <= 0 || rect.height <= 0) {
          pointerLayer.style.removeProperty('will-change')
          schedulePointerTilt(0, 0)
          return
        }

        const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
          pointerLayer.style.removeProperty('will-change')
          schedulePointerTilt(0, 0)
          return
        }

        pointerLayer.style.willChange = 'transform'
        schedulePointerTilt(
          Math.min(1, Math.max(-1, x)),
          Math.min(1, Math.max(-1, y)),
        )
      }

      const handlePointerLeave = () => {
        pointerLayer.style.removeProperty('will-change')
        schedulePointerTilt(0, 0)
      }

      mainSlot.addEventListener('pointermove', handlePointerMove)
      mainSlot.addEventListener('pointerleave', handlePointerLeave)
      detachPointerHandlers = () => {
        mainSlot.removeEventListener('pointermove', handlePointerMove)
        mainSlot.removeEventListener('pointerleave', handlePointerLeave)
        if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
        resetPointerTilt(pointerLayer)
      }
    }

    const handleVisibilityChange = () => updatePointerHandlers()
    hoverQuery.addEventListener('change', updatePointerHandlers)
    reducedMotionQuery.addEventListener('change', updatePointerHandlers)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    updatePointerHandlers()

    return () => {
      hoverQuery.removeEventListener('change', updatePointerHandlers)
      reducedMotionQuery.removeEventListener('change', updatePointerHandlers)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      detachPointerHandlers()
    }
  }, [activeIndex, prefersReducedMotion])

  useEffect(() => {
    const collage = collageRef.current
    if (!collage) return undefined

    const handleTransitionRun = (event) => {
      if (event.propertyName !== 'transform' || !event.target.matches('.hero-desktop-image')) return
      activeTransitions.current.add(event.target)
      setIsAnimating(true)
    }
    const handleTransitionFinish = (event) => {
      if (event.propertyName !== 'transform' || !event.target.matches('.hero-desktop-image')) return
      activeTransitions.current.delete(event.target)
      if (activeTransitions.current.size === 0) setIsAnimating(false)
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') return

      activeTransitions.current.clear()
      setIsAnimating(false)
    }

    collage.addEventListener('transitionrun', handleTransitionRun)
    collage.addEventListener('transitionend', handleTransitionFinish)
    collage.addEventListener('transitioncancel', handleTransitionFinish)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      collage.removeEventListener('transitionrun', handleTransitionRun)
      collage.removeEventListener('transitionend', handleTransitionFinish)
      collage.removeEventListener('transitioncancel', handleTransitionFinish)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  function selectImage(index) {
    setActiveIndex(index)
    setTimerReset((value) => value + 1)
  }

  return (
    <div ref={collageRef} className="hero-desktop-collage relative aspect-hero-collage w-full" aria-label={t('hero.galleryLabel')}>
      <img
        className="pointer-events-none absolute top-[8%] left-[10%] h-[80%] w-[82%] scale-[1.15] -rotate-[3deg] object-contain"
        src={fabricImage}
        alt=""
        aria-hidden="true"
      />
      {heroImages.map((image, index) => {
        const isActive = index === activeIndex
        const positionIndex = (index - activeIndex + heroImages.length) % heroImages.length - 1
        const position = isActive
          ? 'top-[14%] left-[20%] z-30 w-[60%]'
          : `${smallImagePositions[positionIndex]} z-20 w-[28%]`
        const rotation = isActive ? '' : positionIndex === 0 ? '-rotate-[3deg]' : 'rotate-[2deg]'
        const slot = isActive ? 'main' : positionIndex === 0 ? 'a' : 'b'

        return (
          <button
            className={`absolute aspect-hero-image border-2 border-none bg-transparent p-0 transition-[top,left,width,rotate] duration-[600ms] ease-in-out ${rotation} ${position}`}
            key={image.id}
            type="button"
            aria-label={t('hero.selectImage', { number: index + 1 })}
            aria-pressed={isActive}
            onClick={() => selectImage(index)}
            data-slot={slot}
            style={heroTilt[slot]}
          >
            <span
              className={`hero-desktop-image block h-full w-full${isAnimating ? ' hero-desktop-image-animating' : ''}`}
            >
              <span className="hero-pointer-tilt block h-full w-full" style={heroTilt.pointer}>
                <img
                  className={`block h-full w-full object-cover transition-[filter] duration-[600ms] ease-in-out ${isActive ? '' : 'grayscale-[70%] contrast-[1.2]'}`}
                  src={image.src}
                  alt={t(image.altKey)}
                  width="1170"
                  height="1460"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
