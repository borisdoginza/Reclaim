import { useTranslation } from 'react-i18next'
import rating from '../data/rating.json'
import Divider from './Divider'
import Reveal from './Reveal'

export default function GoogleRating() {
  const { t } = useTranslation()

  if (rating.rating === null || rating.review_count === null) return null

  return (
    <Reveal as="section" className="mx-auto w-[min(calc(100%-40px),1280px)] py-8" aria-labelledby="rating-title">
      <Divider className="mb-8" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="rating-title" className="m-0 text-[14px] font-medium tracking-[0.1em] uppercase">
            {t('rating.title')}
          </h2>
          <p className="mt-2 mb-0 text-[16px]">
            {t('rating.score', { score: rating.rating })}
            <span className="ml-3 text-secondary">
              {t('rating.reviewCount', { count: rating.review_count })}
            </span>
          </p>
        </div>
        <a
          className="inline-flex min-h-11 items-center border border-ink px-4 text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors hover:bg-ink hover:text-paper"
          href={rating.google_maps_url}
          target="_blank"
          rel="noreferrer"
        >
          {t('rating.readReviews')}
        </a>
      </div>
    </Reveal>
  )
}
