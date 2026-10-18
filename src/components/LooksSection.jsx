import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Divider from './Divider'
import Label from './Label'
import Reveal from './Reveal'
import looks from '../data/looks.json'
import bigVerticalImage from '../assets/images/looks/big-vertical-rectangle.jpg'
import verticalImage from '../assets/images/looks/vertical-rectangle.jpg'
import smallSquare1Image from '../assets/images/looks/small-square-1.jpg'
import smallSquare2Image from '../assets/images/looks/small-square-2.jpg'
import smallSquare3Image from '../assets/images/looks/small-square-3.jpg'
import horizontalImage from '../assets/images/looks/horizontal-rectangle.jpg'
import vertical2Image from '../assets/images/looks/vertical-rectange-2.jpg'
import looksFit from '../config/looksFit'

const lookImages = {
  'big-vertical-rectangle.jpg': bigVerticalImage,
  'vertical-rectangle.jpg': verticalImage,
  'small-square-1.jpg': smallSquare1Image,
  'small-square-2.jpg': smallSquare2Image,
  'small-square-3.jpg': smallSquare3Image,
  'horizontal-rectangle.jpg': horizontalImage,
  'vertical-rectange-2.jpg': vertical2Image,
}

function LookLightbox({ look, onClose, t }) {
  const [visible, setVisible] = useState(false)
  const closeButton = useRef(null)
  const closeTimer = useRef(null)

  const close = useCallback(() => {
    if (closeTimer.current !== null) return

    setVisible(false)
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null
      onClose()
    }, 220)
  }, [onClose])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true))
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(frame)
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [close])

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-5 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={close} 
    >
      <div
        className={`relative flex max-h-[90vh] max-w-[90vw] items-center justify-center transition-transform duration-200 ${visible ? 'scale-100' : 'scale-95'}`}
        role="dialog"
        aria-modal="true"
        aria-label={look.alt}
        onClick={(event) => event.stopPropagation()}
      >
        {/* <button
          ref={closeButton}
          className="absolute top-0 right-0 z-10 grid size-11 translate-y-[-100%] place-items-center bg-paper text-ink"
          type="button"
          aria-label={t('looks.closeImage')}
          onClick={close}
        >
          <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button> */}
        <img
          className="block max-h-[90vh] max-w-[90vw] object-contain"
          src={look.src}
          alt={look.alt}
        />
      </div>
    </div>,
    document.body,
  )
}

export default function LooksSection() {
  const { t } = useTranslation()
  const [activeLook, setActiveLook] = useState(null)
  const closeLook = useCallback(() => setActiveLook(null), [])

  return (
    <div className="mx-auto flex w-[min(calc(100%-40px),1280px)] flex-col gap-8 md:gap-24" id="looks">
      <Divider className="mb-6 md:my-0" />
      <Reveal as="section" aria-labelledby="looks-title">
        <div
          className="mb-8 [container-type:inline-size] md:mb-12"
          style={{
            '--looks-fit-en': looksFit.en,
            '--looks-fit-hu': looksFit.hu,
          }}
        >
          <Label className="mb-3">{t('looks.eyebrow')}</Label>
          <h2
            className="looks-title m-0 min-w-0 max-w-[720px] font-display leading-[0.92] font-normal tracking-[-0.055em] uppercase"
            id="looks-title"
          >
            {t('looks.title')}
          </h2>
        </div>
        <div className="[container-type:inline-size]">
          <div
            className="mb-8 grid grid-cols-2 gap-2 [grid-template-areas:'bigVertical_vertical'_'bigVertical_smallSquare1'_'horizontal_horizontal'] [grid-template-rows:calc((100cqw_-_8px)*0.85)_calc((100cqw_-_8px)*0.425)_calc((100cqw_-_8px)*0.375)] md:grid-cols-3 md:gap-3 md:[grid-template-areas:'bigVertical_vertical_smallSquare1'_'bigVertical_vertical_smallSquare2'_'bigVertical_horizontal_horizontal'] md:[grid-template-rows:repeat(3,calc((100cqw_-_24px)*0.25))] lg:grid-cols-4 lg:gap-4 lg:[grid-template-areas:'smallSquare3_bigVertical_vertical_smallSquare2'_'vertical2_bigVertical_vertical_smallSquare1'_'vertical2_bigVertical_horizontal_horizontal'] lg:[grid-template-rows:repeat(3,calc((100cqw_-_48px)*0.18))]"
            aria-label={t('looks.galleryLabel')}
          >
            {looks.map((look, index) => {
              const desktopOnly = look.id === 'smallSquare3' || look.id === 'vertical2'
              const alt = t(`looks.images.${look.id}`)
              const image = lookImages[look.file]

              return (
              <Reveal
                as="figure"
                className={`relative m-0 min-w-0 overflow-hidden ${look.id === 'smallSquare2' ? 'hidden md:block' : ''} ${desktopOnly ? 'hidden lg:block' : ''}`}
                key={look.id}
                style={{
                  gridArea: look.id,
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <button
                  className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0"
                  type="button"
                  aria-label={t('looks.openImage', { description: alt })}
                  onClick={() => setActiveLook({ src: image, alt })}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    src={image}
                    alt={alt}
                    style={{ objectPosition: look.position }}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </Reveal>
              )
            })}
          </div>
        </div>
      </Reveal>
      {activeLook && <LookLightbox look={activeLook} onClose={closeLook} t={t} />}
    </div>
  )
}
