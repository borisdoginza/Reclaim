import FlowerMark from './FlowerMark'
import { useTranslation } from 'react-i18next'
import HoursWidget from './HoursWidget'
import StoreMap, { StoreMapDetails } from './StoreMap'
import location from '../data/location.json'
import GoogleRating from './GoogleRating'
import Divider from './Divider'
import Reveal from './Reveal'
import Label from './Label'

export default function VisitSection() {
  const { t } = useTranslation()

  return (
    <>
      <div className="mx-auto flex w-[min(calc(100%-40px),1280px)] flex-col gap-8 pb-8 md:gap-24 md:pb-0">
        <Divider />
        <Reveal
          as="section"
          className="grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-12 md:py-24 lg:gap-16"
          id="collection"
          aria-labelledby="visit-title"
        >
          <div className="flex flex-col gap-4">
            <Label className="flex items-center gap-[9px]">
              <FlowerMark className="h-5 w-5 shrink-0 fill-current" />
              {t('visit.eyebrow')}
            </Label>
            <h2
              className="m-0 max-w-[440px] font-display text-[34px] leading-[0.98] font-normal tracking-[-0.04em] uppercase md:text-[48px]"
              id="visit-title"
            >
              {t('visit.title')}
            </h2>
            <p className="m-0 max-w-[420px] text-[15px] leading-[1.55] text-secondary">
              {t('visit.description')}
            </p>
          </div>
          <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-8 lg:gap-x-8" id="visit">
            <section className="flex flex-col gap-4 md:col-start-1 md:row-start-1">
              <div className="flex flex-col gap-2">
                <Label as="h3">{t('visit.address')}</Label>
                <p className="m-0 text-[16px] leading-[1.5]">{location.address}</p>
              </div>
              <StoreMap />
              <StoreMapDetails />
            </section>
            <Divider className="md:hidden" />
            <section className="md:col-start-2 md:row-start-1">
              <HoursWidget />
            </section>
            <Divider className="md:col-start-2 md:row-start-2" />
            <section className="md:col-start-2 md:row-start-3">
              <GoogleRating />
            </section>
          </div>
        </Reveal>
      </div>
    </>
  )
}
