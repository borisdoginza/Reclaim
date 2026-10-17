import { useTranslation } from 'react-i18next'
import footerLogo from '../assets/images/design-pieces/logo.jpg'
import hours from '../data/hours.json'
import { groupConsecutiveHours } from '../data/hours'
import location from '../data/location.json'
import Divider from './Divider'
import Label from './Label'

export default function Footer() {
  const { t } = useTranslation()
  const groupedHours = groupConsecutiveHours(hours)

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        aria-hidden="true"
        // style={{
        //   backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.9%27/%3E%3C/svg%3E")',
        // }}
      />
      <div className="relative z-10 mx-auto grid w-[min(calc(100%-40px),1280px)] grid-cols-1 gap-8 py-8 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:items-start md:py-10 lg:w-[min(calc(100%-40px),1280px)] lg:grid-flow-row lg:grid-cols-3 lg:grid-rows-1 lg:gap-10 lg:items-stretch">
        <div className="md:contents lg:!flex lg:flex-col lg:gap-8" style={{ display: 'contents' }}>
          <div className="flex items-center justify-between md:justify-start md:col-span-3 md:col-start-1 md:row-start-1 md:gap-6 md:whitespace-nowrap lg:col-span-1">
            <img
              className="h-brand-width w-brand-width shrink-0 animate-stamp-spin [animation-direction:reverse] motion-reduce:animate-none"
              src={footerLogo}
              alt={t('footer.brand')}
              width="112"
              height="112"
            />
            <p className="m-0 text-[16px] leading-[1.5]">{t('footer.note')}</p>
          </div>
          <section className="flex flex-col gap-2 md:col-start-1 md:row-start-2 lg:col-span-1 lg:col-start-auto lg:row-start-auto">
            <Label as="h2" tone="dark">
              {t('visit.address')}
            </Label>
            <a
              className="relative inline-flex text-[16px] leading-[1.5] transition-opacity duration-150 after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] hover:opacity-70 md:text-balance"
              href={location.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {location.address}
            </a>
          </section>
        </div>
        <section className="flex flex-col gap-2 md:col-start-2 md:row-start-2 lg:col-span-1 lg:col-start-auto lg:row-start-auto">
          <Label as="h2" tone="dark">
            {t('visit.hours')}
          </Label>
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
                <p className="m-0 text-[16px] leading-[1.5]" key={firstDay.day}>
                  {dayRange} {times}
                </p>
              )
            })}
          </div>
        </section>
        <section className="flex flex-col gap-2 md:col-start-3 md:row-start-2 lg:col-span-1 lg:col-start-auto lg:row-start-auto">
          <Label as="h2" tone="dark">
            {t('footer.social')}
          </Label>
          <div className="flex gap-5 md:flex-wrap">
            <a
              className="relative inline-flex text-[16px] underline underline-offset-4 transition-opacity duration-150 after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] hover:opacity-70"
              href={location.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('footer.instagram')} ↗
            </a>
            <a
              className="relative inline-flex text-[16px] underline underline-offset-4 transition-opacity duration-150 after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] hover:opacity-70"
              href={location.tiktokUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('footer.tiktok')} ↗
            </a>
          </div>
        </section>
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
