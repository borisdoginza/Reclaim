import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import hours from '../data/hours.json'
import Divider from './Divider'

function getBudapestTime() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Budapest',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())

  return {
    day: parts.find((part) => part.type === 'weekday')?.value.toLowerCase(),
    minutes: Number(parts.find((part) => part.type === 'hour')?.value) * 60
      + Number(parts.find((part) => part.type === 'minute')?.value),
  }
}

function toMinutes(time) {
  const [hoursValue, minutesValue] = time.split(':').map(Number)
  return hoursValue * 60 + minutesValue
}

export default function HoursWidget() {
  const { t } = useTranslation()
  const [currentTime, setCurrentTime] = useState(getBudapestTime)

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(getBudapestTime()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const today = hours.find((entry) => entry.day === currentTime.day)
  const isOpen = today && !today.closed
    && currentTime.minutes >= toMinutes(today.opening)
    && currentTime.minutes < toMinutes(today.closing)

  return (
    <div aria-label={t('hours.statusLabel')}>
      <p className="mb-3 text-[14px] font-medium tracking-[0.1em] text-secondary uppercase" aria-live="polite">
        {isOpen ? t('hours.openNow') : t('hours.closedNow')}
      </p>
      <dl className="m-0">
        {hours.map((entry) => {
          const isToday = entry.day === currentTime.day

          return (
            <div
              className={`grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 py-2.5 text-[14px] tracking-[0.1em] uppercase ${isToday ? 'font-semibold text-ink' : 'text-secondary'}`}
              key={entry.day}
              aria-current={isToday ? 'date' : undefined}
            >
              <Divider className="col-span-2" />
              <dt>{t(`hours.days.${entry.day}`)}</dt>
              <dd className="m-0 text-right">
                {entry.closed ? t('hours.closedDay') : `${entry.opening}–${entry.closing}`}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
