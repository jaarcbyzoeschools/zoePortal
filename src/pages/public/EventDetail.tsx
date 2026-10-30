import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  ImageIcon,
  MapPin,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { NotFound } from '@pages/errors'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ContentBlocks } from '@/components/common/ContentBlocks'
import { EventCard } from '@/components/public/events/EventCard'
import { EventCountdown } from '@/components/public/events/EventCountdown'
import { EventSidebar } from '@/components/public/events/EventSidebar'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { googleCalendarUrl } from '@/lib/calendar'
import { cldPhoto } from '@/lib/cloudinary'
import { dateRangeLabel, formatTime, isPast } from '@/lib/dates'
import {
  eventTimeLabel,
  getEvent,
  getUpcomingEvents,
  registrationHref,
} from '@/data/events.data'

const sectionTitle = 'text-xl font-bold text-gray-900 sm:text-2xl'

export const EventDetail: React.FC = () => {
  const { id = '' } = useParams()
  const event = getEvent(id)
  const [coverFailed, setCoverFailed] = useState(false)

  useEffect(() => setCoverFailed(false), [id])
  useDocumentTitle(event ? `${event.title} | Zoe Schools` : undefined)

  if (!event) return <NotFound />

  const past = isPast(event.endDate ?? event.date)
  const cover = event.cover ? cldPhoto(event.cover, { width: 1400, ratio: '4:3' }) : ''
  const about = event.about ?? [event.summary]
  const others = getUpcomingEvents().filter((e) => e.id !== event.id).slice(0, 2)

  const rows: { icon: LucideIcon; text: string }[] = [
    { icon: Calendar, text: dateRangeLabel(event.date, event.endDate) },
    { icon: Clock, text: eventTimeLabel(event).replace(' - ', ' – ') },
    {
      icon: MapPin,
      text: event.venue ? `${event.venue.name}, ${event.venue.address}` : event.location,
    },
    ...(event.audience ? [{ icon: Users, text: event.audience }] : []),
  ]

  return (
    <>
      {/* Top: breadcrumb, cover and key facts */}
      <section className="bg-cream pb-10 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
              <li>
                <Link to="/" className="transition-colors hover:text-accent">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link to="/news" className="transition-colors hover:text-accent">News &amp; Events</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li
                aria-current="page"
                className="max-w-[14rem] truncate font-medium text-accent sm:max-w-[26rem]"
              >
                {event.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-6">
            {/* Cover */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#e6e1dc] lg:aspect-auto lg:min-h-[22rem]">
              {cover && !coverFailed ? (
                <img
                  src={cover}
                  alt={event.title}
                  fetchPriority="high"
                  onError={() => setCoverFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">Event cover photo</span>
                </div>
              )}
            </div>

            {/* Key facts */}
            <div className="rounded-3xl bg-white p-6 shadow-md">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-700">
                  {event.category}
                </span>
                {event.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {event.title}
              </h1>

              <ul className="mt-5 space-y-3.5">
                {rows.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-[13px] text-gray-800">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-gray-200 pt-5">
                {past ? (
                  <p className="rounded-xl bg-gray-100 px-4 py-3 text-center text-sm text-gray-600">
                    This event has ended.
                  </p>
                ) : (
                  <>
                    <EventCountdown event={event} />
                    <div className="mt-4 space-y-3">
                      {event.registration && (
                        <Link
                          to={registrationHref(event)}
                          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-accent to-[#5c0f0f] px-5 py-3 text-sm font-medium text-white transition-shadow hover:shadow-lg"
                        >
                          Register to Attend
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                      <a
                        href={googleCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5"
                      >
                        Add to Calendar
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details + sidebar */}
      <section className="bg-cream pb-16 pt-4 lg:pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
          <div className="min-w-0">
            <h2 className={sectionTitle}>About this event</h2>
            <div className="mt-4 space-y-4">
              {about.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-[1.85] text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {event.programme && event.programme.length > 0 && (
              <>
                <h2 className={`${sectionTitle} mt-10`}>Programme</h2>
                <ol className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                  {event.programme.map((item) => (
                    <li
                      key={`${item.time}-${item.title}`}
                      className="grid grid-cols-[4.75rem_1fr] gap-4 px-5 py-4 even:bg-cream sm:grid-cols-[6rem_1fr]"
                    >
                      <span className="pt-0.5 text-[11px] font-semibold text-accent">
                        {formatTime(item.time)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-gray-900">{item.title}</span>
                        {item.description && (
                          <span className="mt-0.5 block text-xs text-gray-500">{item.description}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {event.bring && event.bring.length > 0 && (
              <>
                <h2 className={`${sectionTitle} mt-10`}>What to bring</h2>
                <div className="mt-4">
                  <ContentBlocks blocks={[{ type: 'list', items: event.bring }]} />
                </div>
              </>
            )}

            {event.body && (
              <div className="mt-10">
                <ContentBlocks blocks={event.body} />
              </div>
            )}
          </div>

          <EventSidebar event={event} />
        </div>
      </section>

      {/* More events */}
      {others.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading title="More" highlight="Events" />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
              {others.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default EventDetail