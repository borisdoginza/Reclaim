import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import hours from '../data/hours.json'
import { groupConsecutiveHours } from '../data/hours'

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
  const groups = groupConsecutiveHours(hours)

  return (
    <div aria-label={t('hours.statusLabel')}>
      <p className="mb-3 text-[14px] font-medium tracking-[0.1em] uppercase" aria-live="polite">
        {isOpen ? t('hours.openNow') : t('hours.closedNow')}
      </p>
      <div className="mb-4 flex gap-2" role="group" aria-label={t('hours.weekLabel')}>
        {hours.map((entry) => {
          const isToday = entry.day === currentTime.day

          return (
            <span
              className={`size-4 border border-ink ${isToday ? 'bg-ink' : 'bg-transparent'}`}
              key={entry.day}
              role="img"
              aria-label={t('hours.dayStatus', {
                day: t(`hours.days.${entry.day}`),
                status: isToday ? t('hours.today') : '',
              })}
              aria-current={isToday ? 'date' : undefined}
            />
          )
        })}
      </div>
      <dl className="m-0">
        {groups.map(({ entries }) => {
          const firstDay = entries[0]
          const lastDay = entries[entries.length - 1]
          const dayLabel = entries.length === 1
            ? t(`hours.days.${firstDay.day}`)
            : `${t(`hours.shortDays.${firstDay.day}`)}-${t(`hours.shortDays.${lastDay.day}`)}`
          const timeLabel = firstDay.closed
            ? t('hours.closedDay')
            : `${firstDay.opening}-${firstDay.closing}`

          return (
            <div className="grid grid-cols-[1fr_auto] gap-x-3 py-2 text-[14px] tracking-[0.1em] uppercase" key={firstDay.day}>
              <dt>{dayLabel}</dt>
              <dd className="m-0 text-right">{timeLabel}</dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
