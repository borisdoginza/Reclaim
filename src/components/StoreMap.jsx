import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import location from '../data/location.json'
import Label from './Label'


const LeafletMap = lazy(() => import('./LeafletMap.jsx'))

function MapPlaceholder({ children }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center border border-accent p-4 text-center md:aspect-[16/7] md:min-h-[280px] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto lg:min-h-0">
      <p className="m-0 text-[14px] font-medium tracking-[0.1em] uppercase">
        {children}
      </p>
    </div>
  )
}

export default function StoreMap() {
  const { t } = useTranslation()
  const hasCoordinates = Number.isFinite(location.latitude) && Number.isFinite(location.longitude)

  return (
    <div className="md:col-span-12 md:col-start-1 md:row-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:relative lg:self-stretch lg:min-h-[15rem]">
      {hasCoordinates ? (
        <Suspense fallback={<MapPlaceholder>{t('map.loading')}</MapPlaceholder>}>
          <LeafletMap />
        </Suspense>
      ) : (
        <MapPlaceholder>{t('map.coordinatesTodo')}</MapPlaceholder>
      )}
    </div>
  )
}

export function StoreAddress() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2 md:col-span-3 md:col-start-6 md:row-start-1 lg:col-span-1 lg:col-start-1">
      <Label as="h3" className="md:leading-4 lg:leading-4">{t('visit.address')}</Label>
      <p className="m-0 text-[16px] leading-[1.5]">{t('visit.addressValue')}</p>
    </div>
  )
}

export function StoreMapCaption() {
  const { t } = useTranslation()
  const hasCoordinates = Number.isFinite(location.latitude) && Number.isFinite(location.longitude)

  return (
    <div className="flex flex-col gap-2 text-[12px] leading-[1.5] text-secondary lg:col-start-3 lg:row-start-2">
      {hasCoordinates && (
        <p className="m-0 tracking-[0.1em]">
          {`${Math.abs(location.latitude).toFixed(4)}° ${location.latitude < 0 ? 'S' : 'N'} · ${Math.abs(location.longitude).toFixed(4)}° ${location.longitude < 0 ? 'W' : 'E'}`}
        </p>
      )}
      <p className="m-0">
        <a href="https://www.openstreetmap.org/copyright">
          {t('map.attribution')}
        </a>
      </p>
    </div>
  )
}

export function StoreMapButton() {
  const { t } = useTranslation()

  return (
    <a
      className={`inline-flex min-h-11 w-fit items-center justify-between gap-6 border border-ink px-4 text-[13px] font-semibold tracking-[0.06em] uppercase md:whitespace-nowrap lg:whitespace-nowrap ${location.googleMapsUrl ? 'bg-paper text-ink transition-colors duration-150 hover:bg-ink hover:text-paper' : 'pointer-events-none bg-accent text-ink'}`}
      href={location.googleMapsUrl ?? '#visit'}
      aria-disabled={!location.googleMapsUrl}
      onClick={(event) => {
        if (!location.googleMapsUrl) event.preventDefault()
      }}
    >
      {t('map.openGoogleMaps')}<span aria-hidden="true">↗</span>
    </a>
  )
}

export function StoreMapDetails() {
  return (
    <div className="flex flex-col gap-4 md:col-span-12 md:col-start-1 md:row-start-3 md:flex-row md:items-center md:justify-between lg:col-span-1 lg:col-start-1 lg:row-start-3 lg:flex-col lg:items-start">
      <StoreAddress />
      <StoreMapCaption />
      <StoreMapButton />
    </div>
  )
}
