import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import location from '../data/location.json'
import { TILE_LAYER_URL } from '../config/map'
import MapLogo from '../assets/images/design-pieces/inverted-logo.png'

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
  const marker = useMemo(() => L.icon({
    iconUrl: MapLogo,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  }), [])

  return (
    <MapContainer
      className="aspect-[4/3] w-full border border-accent md:aspect-[16/7] md:min-h-[280px] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto lg:min-h-0"
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
