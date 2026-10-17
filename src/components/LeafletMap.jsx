import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { useTranslation } from 'react-i18next'
import location from '../data/location.json'
import { TILE_LAYER_URL } from '../config/map'
import FlowerMark from './FlowerMark'

function InvalidateSizeOnResize() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()
    const observer = new ResizeObserver(() => map.invalidateSize({ pan: false }))
    const frame = window.requestAnimationFrame(() => map.invalidateSize({ pan: false }))

    observer.observe(container)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [map])

  return null
}

export default function LeafletMap() {
  const { t } = useTranslation()
  const marker = useMemo(() => L.divIcon({
    className: 'reclaim-map-marker',
    html: renderToStaticMarkup(
      <FlowerMark className="h-8 w-8 fill-ink" />,
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  }), [])

  return (
    <MapContainer
      className="aspect-[4/3] w-full border border-accent md:aspect-[16/7] md:min-h-[280px] lg:aspect-[4/3] lg:min-h-0"
      center={[location.latitude, location.longitude]}
      zoom={16}
      scrollWheelZoom={false}
      attributionControl={false}
      aria-label={t('map.label')}
    >
      <InvalidateSizeOnResize />
      <TileLayer url={TILE_LAYER_URL} />
      <Marker position={[location.latitude, location.longitude]} icon={marker} />
    </MapContainer>
  )
}
