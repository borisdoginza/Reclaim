import { useTranslation } from 'react-i18next'
import rating from '../data/rating.json'
import Label from './Label'

export default function GoogleRating() {
  const { t } = useTranslation()

  if (rating.rating === null || rating.review_count === null) return null

  return (
    <div className="flex flex-col items-start gap-4" aria-labelledby="rating-title">
      <div className="flex flex-col gap-2">
        <Label as="h3" id="rating-title">
          {t('rating.title')}
        </Label>
        <p className="m-0 flex flex-wrap gap-x-3 text-[16px]">
          <span className="whitespace-nowrap">{t('rating.score', { score: rating.rating })}</span>
          <span className="whitespace-nowrap">
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
