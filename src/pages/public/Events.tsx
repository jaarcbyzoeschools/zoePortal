import React from 'react'
import { CalendarDays } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { SectionHeading } from '@/components/common/SectionHeading'
import {EventCard} from '@/components/public/events/EventCard'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { monthLong } from '@/lib/dates'
import { getPastEvents, getUpcomingEvents, type SchoolEvent } from '@/data/events.data'

/** Keeps the order of the list it is given (already sorted). */
const groupByMonth = (list: SchoolEvent[]) => {
  const map = new Map<string, SchoolEvent[]>()
  list.forEach((e) => {
    const key = monthLong(e.date)
    map.set(key, [...(map.get(key) ?? []), e])
  })
  return [...map.entries()]
}

const MonthGroups: React.FC<{ list: SchoolEvent[] }> = ({ list }) => (
  <div className="space-y-10">
    {groupByMonth(list).map(([month, items]) => (
      <div key={month}>
        <div className="mb-4 flex items-center gap-4">
          <h3 className="font-serif text-xl font-bold text-gray-900 sm:text-2xl">{month}</h3>
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">
            {items.length} {items.length === 1 ? 'event' : 'events'}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {items.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    ))}
  </div>
)

export const Events: React.FC = () => {
  useDocumentTitle('School Calendar | Zoe Schools')

  const upcoming = getUpcomingEvents()
  const past = getPastEvents()

  return (
    <>
      <PageHero
        badge="Calendar"
        badgeIcon={<CalendarDays />}
        title="School"
        highlight="Calendar"
        subtitle="Every date that matters for the session: resumptions, exams, open days, competitions and celebrations."
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {upcoming.length > 0 ? (
            <MonthGroups list={upcoming} />
          ) : (
            <p className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-sm text-gray-500">
              No upcoming events right now. Check back soon.
            </p>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="bg-cream py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading align="left" title="Past" highlight="Events" className="mb-10" />
            <MonthGroups list={past} />
          </div>
        </section>
      )}
    </>
  )
}

export default Events