import { useTranslation } from 'react-i18next'
import footerLogo from '../assets/images/design-pieces/logo.jpg'
import hours from '../data/hours.json'
import { groupConsecutiveHours } from '../data/hours'
import location from '../data/location.json'
import Divider from './Divider'

export default function Footer() {
  const { t } = useTranslation()
  const groupedHours = groupConsecutiveHours(hours)

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.9%27/%3E%3C/svg%3E")',
        }}
      />
      <div className="relative z-10 mx-auto grid w-[min(calc(100%-40px),1280px)] gap-8 py-8 md:grid-cols-3 md:gap-10 md:py-10">
        <div className="flex items-start gap-4">
          <img
            className="h-brand-width w-brand-width shrink-0 animate-stamp-spin motion-reduce:animate-none"
            src={footerLogo}
            alt={t('footer.brand')}
            width="112"
            height="112"
          />
          <div>
            <h2 className="mb-2 text-[14px] font-medium tracking-[0.1em] uppercase">{t('visit.address')}</h2>
            <p className="m-0 max-w-48 text-[14px] leading-[1.5]">{location.address}</p>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-[14px] font-medium tracking-[0.1em] uppercase">{t('visit.hours')}</h2>
          <div className="grid gap-2">
            {groupedHours.map(({ entries }) => {
              const firstDay = entries[0]
              const lastDay = entries[entries.length - 1]
              const dayRange = entries.length === 1
                ? t(`hours.shortDays.${firstDay.day}`)
                : `${t(`hours.shortDays.${firstDay.day}`)}-${t(`hours.shortDays.${lastDay.day}`)}`
              const times = firstDay.closed
                ? t('hours.closedDay')
                : `${firstDay.opening}-${firstDay.closing}`

              return (
                <p className="m-0 text-[14px] leading-[1.5]" key={firstDay.day}>
                  {dayRange} {times}
                </p>
              )
            })}
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-[14px] font-medium tracking-[0.1em] uppercase">{t('footer.social')}</h2>
          <p className="mt-0 mb-3 text-[14px] leading-[1.5] text-accent">{t('footer.note')}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
            <a className="inline-flex min-h-11 items-center underline underline-offset-4 transition-opacity duration-150 hover:opacity-70" href={location.instagramUrl} target="_blank" rel="noreferrer">
              {t('footer.instagram')} ↗
            </a>
            <a className="inline-flex min-h-11 items-center underline underline-offset-4 transition-opacity duration-150 hover:opacity-70" href={location.tiktokUrl} target="_blank" rel="noreferrer">
              {t('footer.tiktok')} ↗
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto w-[min(calc(100%-40px),1280px)]">
        <Divider />
      </div>
      <div className="relative z-10 mx-auto flex min-h-12 w-[min(calc(100%-40px),1280px)] items-center justify-between text-[12px] tracking-[0.08em] text-accent uppercase">
        <span>{t('footer.copyright')}</span>
        <span>{t('nav.code')}</span>
      </div>
    </footer>
  )
}
