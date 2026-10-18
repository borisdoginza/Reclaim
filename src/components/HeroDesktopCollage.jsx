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

    const handleTransitionRun = (event) => {
      if (event.propertyName !== 'transform') return
      activeTransitions.current.add(event.target)
      setIsAnimating(true)
    }
    const handleTransitionFinish = (event) => {
      if (event.propertyName !== 'transform') return
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
              <img
                className={`block h-full w-full object-cover transition-[filter] duration-[600ms] ease-in-out ${isActive ? '' : 'grayscale-[70%] contrast-[1.2]'}`}
                src={image.src}
                alt={t(image.altKey)}
                width="1170"
                height="1460"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
