import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'
import heroImages from '../data/heroImages'
import tapeImage from '../assets/images/pngs/vector-illustration-set-different-slices-adhesive-tape-with-shadow-wrinkles.png'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Arrow({ direction }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {direction === 'previous'
        ? <path d="M10 3 5 8l5 5M5 8h8" stroke="currentColor" strokeWidth="1.5" />
        : <path d="m6 3 5 5-5 5m5-5H3" stroke="currentColor" strokeWidth="1.5" />}
    </svg>
  )
}

export default function HeroMobileSlider() {
  const { t } = useTranslation()

  return (
    <div className="w-full">
      <Swiper
        className="hero-mobile-swiper aspect-hero-image w-full"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop
        navigation={{ prevEl: '.hero-mobile-previous', nextEl: '.hero-mobile-next' }}
        pagination={{ el: '.hero-mobile-pagination', clickable: true }}
        aria-label={t('hero.galleryLabel')}
      >
        <span
          className="pointer-events-none absolute top-3 left-3 z-10 h-7 w-[84px] -rotate-2 overflow-hidden"
          aria-hidden="true"
        >
          <img
            className="absolute top-[-80%] left-[-23%] w-[280%] max-w-none"
            src={tapeImage}
            alt=""
          />
        </span>
        {heroImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <img
              className="block aspect-hero-image w-full object-cover"
              src={image.src}
              alt={t(image.altKey)}
              width="1170"
              height="1460"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-between pt-2">
        <button
          className="grid size-11 shrink-0 place-items-center border border-ink bg-paper text-ink"
          type="button"
          aria-label={t('hero.previousImage')}
          className="hero-mobile-previous grid size-11 shrink-0 place-items-center border border-ink bg-paper text-ink"
        >
          <Arrow direction="previous" />
        </button>
        <div className="hero-mobile-pagination flex items-center justify-center gap-2" />
        <button
          className="grid size-11 shrink-0 place-items-center border border-ink bg-paper text-ink"
          type="button"
          aria-label={t('hero.nextImage')}
          className="hero-mobile-next grid size-11 shrink-0 place-items-center border border-ink bg-paper text-ink"
        >
          <Arrow direction="next" />
        </button>
      </div>
    </div>
  )
}
