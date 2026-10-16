import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import location from '../data/location.json'

const LeafletMap = lazy(() => import('./LeafletMap.jsx'))

function MapPlaceholder({ children }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center border border-accent p-4 text-center">
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
    <div className="mt-4 lg:col-start-1 lg:row-start-2">
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

export function StoreMapDetails() {
  const { t } = useTranslation()
  const hasCoordinates = Number.isFinite(location.latitude) && Number.isFinite(location.longitude)

  return (
    <div className="lg:col-start-1 lg:row-start-3">
      {hasCoordinates && (
        <p className="mt-2 mb-0 text-[14px] font-medium tracking-[0.1em] uppercase">
          {`${Math.abs(location.latitude).toFixed(4)}° ${location.latitude < 0 ? 'S' : 'N'} · ${Math.abs(location.longitude).toFixed(4)}° ${location.longitude < 0 ? 'W' : 'E'}`}
        </p>
      )}
      <p className="mt-2 mb-0 text-[12px]">
        <a href="https://www.openstreetmap.org/copyright">
          {t('map.attribution')}
        </a>
      </p>
      <a
        className={`mt-3 inline-flex min-h-11 items-center justify-between gap-6 border border-ink px-4 text-[13px] font-semibold tracking-[0.06em] uppercase ${location.googleMapsUrl ? 'bg-paper text-ink transition-colors duration-150 hover:bg-ink hover:text-paper' : 'pointer-events-none bg-accent text-ink'}`}
        href={location.googleMapsUrl ?? '#visit'}
        aria-disabled={!location.googleMapsUrl}
        onClick={(event) => {
          if (!location.googleMapsUrl) event.preventDefault()
        }}
      >
        {t('map.openGoogleMaps')}<span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}
