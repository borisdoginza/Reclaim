import FlowerMark from './FlowerMark'
import { useTranslation } from 'react-i18next'
import HoursWidget from './HoursWidget'
import StoreMap, {
  StoreAddress,
  StoreMapButton,
  StoreMapCaption,
  StoreMapDetails,
} from './StoreMap'
import GoogleRating from './GoogleRating'
import Divider from './Divider'
import Reveal from './Reveal'
import Label from './Label'
import useMediaQuery from '../hooks/useMediaQuery'

function VisitIntro({ t }) {
  return (
    <div className="flex flex-col gap-4 md:col-span-5 md:row-start-1 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-2">
      <Label className="flex items-center gap-[9px] md:leading-4 lg:leading-4">
        <FlowerMark className="h-5 w-5 shrink-0 fill-current md:h-4 md:w-4 lg:h-5 lg:w-5" />
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
  )
}

function MobileTabletVisit({ t }) {
  return (
    <>
      <VisitIntro t={t} />
      <div className="flex flex-col gap-8 md:contents">
        <section className="flex flex-col gap-4 md:contents">
          <StoreMap />
          <StoreMapDetails />
        </section>
        <Divider className="my-2 md:hidden" />
        <section className="flex flex-col gap-8 md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:justify-self-end">
          <HoursWidget />
          <Divider className="my-8 md:my-0" />
          <GoogleRating />
        </section>
      </div>
    </>
  )
}

function DesktopVisit({ t }) {
  return (
    <div
      className="lg:grid lg:grid-cols-[minmax(18rem,25rem)_minmax(2rem,1fr)_var(--visit-col)_2rem_var(--visit-col)] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-0 lg:gap-y-8 lg:[container-type:inline-size]"
      id="visit"
      style={{ '--visit-col': 'clamp(17.5rem, 26cqw, 21rem)' }}
    >
      <VisitIntro t={t} />
      <StoreMap />
      <section className="flex flex-col gap-8 lg:col-start-5 lg:row-start-1">
        <div className="flex flex-col gap-8">
          <StoreAddress />
          <StoreMapButton />
        </div>
        <Divider className="lg:my-0" />
        <HoursWidget />
        <Divider className="lg:my-0" />
      </section>
      <StoreMapCaption />
      <div className="lg:col-start-5 lg:row-start-2">
        <GoogleRating />
      </div>
    </div>
  )
}

export default function VisitSection() {
  const { t } = useTranslation()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <>
      <div className="mx-auto flex w-[min(calc(100%-40px),1280px)] flex-col gap-8 pb-8 md:gap-24 md:pb-0">
        <Divider />
        <Reveal
          as="section"
          className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-12 md:py-24 lg:block"
          id="collection"
          aria-labelledby="visit-title"
        >
          {isDesktop ? (
            <DesktopVisit t={t} />
          ) : (
            <div className="flex flex-col gap-8 md:contents" id="visit">
              <MobileTabletVisit t={t} />
            </div>
          )}
        </Reveal>
      </div>
    </>
  )
}
