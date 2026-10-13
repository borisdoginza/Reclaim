import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import FlowerMark from '../components/FlowerMark'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto flex min-h-[70vh] w-[min(calc(100%-40px),1280px)] flex-col items-start justify-center py-16">
      <p className="mb-4 flex items-center gap-2 text-[14px] tracking-[0.1em] text-secondary uppercase">
        <FlowerMark className="h-5 w-5 fill-current" />
        {t('notFound.brand')}
      </p>
      <h1 className="m-0 max-w-[720px] font-display text-[clamp(48px,14vw,96px)] leading-[0.92] tracking-[-0.055em] uppercase">
        {t('notFound.title')}
      </h1>
      <Link
        className="mt-8 inline-flex min-h-12 items-center justify-between gap-7 border border-ink bg-ink px-4 text-[13px] font-semibold tracking-[0.06em] text-paper uppercase"
        to="/"
      >
        {t('notFound.home')}<span aria-hidden="true">↗</span>
      </Link>
    </section>
  )
}
