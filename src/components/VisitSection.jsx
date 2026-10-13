import FlowerMark from './FlowerMark'
import { useTranslation } from 'react-i18next'
import HoursWidget from './HoursWidget'
import StoreMap from './StoreMap'
import location from '../data/location.json'
import Divider from './Divider'
import Reveal from './Reveal'

export default function VisitSection() {
  const { t } = useTranslation()

  return (
    <>
      <div className="mx-auto w-[min(calc(100%-40px),1280px)]">
        <Divider className="mb-12 md:mb-24" />
      </div>
      <Reveal
        as="section"
        className="mx-auto grid w-[min(calc(100%-40px),1280px)] gap-7 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-12 md:py-24 lg:gap-16"
        id="collection"
        aria-labelledby="visit-title"
      >
        <div>
          <p className="mb-[14px] flex items-center gap-[9px] text-[12px] leading-[1.4] font-medium tracking-[0.12em] text-secondary uppercase">
            <FlowerMark className="h-5 w-5 shrink-0 fill-current" />
            {t('visit.eyebrow')}
          </p>
          <h2
            className="mb-[14px] max-w-[440px] font-display text-[34px] leading-[0.98] font-normal tracking-[-0.04em] uppercase md:text-[48px]"
            id="visit-title"
          >
            {t('visit.title')}
          </h2>
          <p className="m-0 max-w-[420px] text-[15px] leading-[1.55] text-secondary">
            {t('visit.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-8" id="visit">
          <Divider className="col-span-full mb-5" />
          <div>
            <h3 className="mb-2 text-[11px] font-medium tracking-[0.1em] text-secondary uppercase">{t('visit.address')}</h3>
            <p className="m-0 text-[14px]">{location.address}</p>
            <StoreMap />
          </div>
          <div>
            <h3 className="mb-2 text-[11px] font-medium tracking-[0.1em] text-secondary uppercase">{t('visit.hours')}</h3>
            <HoursWidget />
          </div>
        </div>
      </Reveal>
    </>
  )
}
