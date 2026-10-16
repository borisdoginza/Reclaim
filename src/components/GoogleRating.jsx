import { useTranslation } from 'react-i18next'
import rating from '../data/rating.json'

export default function GoogleRating() {
  const { t } = useTranslation()

  if (rating.rating === null || rating.review_count === null) return null

  return (
    <div className="flex flex-col items-start gap-3" aria-labelledby="rating-title">
      <div>
        <h3 id="rating-title" className="m-0 text-[14px] font-medium tracking-[0.1em] uppercase">
          {t('rating.title')}
        </h3>
        <p className="mt-2 mb-0 text-[14px]">
          {t('rating.score', { score: rating.rating })}
          <span className="ml-3">
            {t('rating.reviewCount', { count: rating.review_count })}
          </span>
        </p>
      </div>
      <a
        className="inline-flex min-h-11 items-center border border-ink bg-paper px-3 text-[14px] font-semibold tracking-[0.06em] uppercase transition-colors duration-150 hover:bg-ink hover:text-paper"
        href={rating.google_maps_url}
        target="_blank"
        rel="noreferrer"
      >
        {t('rating.readReviews')}
      </a>
    </div>
  )
}
