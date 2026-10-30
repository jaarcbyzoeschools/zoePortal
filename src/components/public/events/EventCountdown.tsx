import React, { useEffect, useState } from 'react'
import { eventEnd, eventStart, type SchoolEvent } from '@/data/events.data'

const pad = (n: number) => String(n).padStart(2, '0')

export const EventCountdown: React.FC<{ event: SchoolEvent }> = ({ event }) => {
  const [now, setNow] = useState(() => Date.now())
  const start = eventStart(event).getTime()
  const end = eventEnd(event).getTime()

  useEffect(() => {
    if (Date.now() >= end) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [end])

  if (now >= end) {
    return (
      <p className="rounded-xl bg-gray-100 px-4 py-3 text-center text-sm text-gray-600">
        This event has ended.
      </p>
    )
  }

  if (now >= start) {
    return (
      <p className="rounded-xl bg-green-100 px-4 py-3 text-center text-sm font-semibold text-green-800">
        Happening now
      </p>
    )
  }

  const diff = start - now
  const parts = [
    { label: 'Days', value: Math.floor(diff / 86_400_000) },
    { label: 'Hours', value: Math.floor((diff % 86_400_000) / 3_600_000) },
    { label: 'Mins', value: Math.floor((diff % 3_600_000) / 60_000) },
    { label: 'Secs', value: Math.floor((diff % 60_000) / 1000) },
  ]

  return (
    <div role="timer" aria-label="Time until the event starts" className="grid grid-cols-4 gap-2">
      {parts.map((p) => (
        <div key={p.label} className="rounded-xl bg-accent/[0.07] px-1 py-3 text-center">
          <span className="block text-xl font-bold tabular-nums text-accent">{pad(p.value)}</span>
          <span className="mt-0.5 block text-[10px] text-gray-600">{p.label}</span>
        </div>
      ))}
    </div>
  )
}

export default EventCountdown