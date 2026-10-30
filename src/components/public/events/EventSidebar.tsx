import React from 'react'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { ShareButtons } from '@/components/common/ShareButtons'
import { CONTACT, directionsUrl, telHref } from '@/data/contact.data'
import type { SchoolEvent } from '@/data/events.data'

const TOWN = 'Ogbomoso'
const card = 'rounded-2xl border border-gray-200 bg-white p-4 shadow-sm'

export const EventSidebar: React.FC<{ event: SchoolEvent }> = ({ event }) => {
  const { venue } = event
  const organiser = event.organiser ?? 'Admissions Office'
  const email = CONTACT.emails[1] ?? CONTACT.emails[0]

  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:-m-1 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:p-1">
      {venue && (
        <section className={card}>
          <div
            aria-hidden="true"
            className="flex h-32 items-center justify-center rounded-xl bg-[#e3eadf]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
              <MapPin className="h-4 w-4" />
            </span>
          </div>
          <h2 className="mt-3 text-sm font-semibold text-gray-900">{venue.name}</h2>
          <p className="mt-1 text-[11px] text-gray-500">
            {venue.address}, {TOWN}
          </p>
          <a
            href={directionsUrl(`Zoe Schools ${venue.name}, ${venue.address}, ${TOWN}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-accent hover:underline"
          >
            Get directions <ArrowRight className="h-3 w-3" />
          </a>
        </section>
      )}

      <section className={card}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Organiser</p>
        <h2 className="mt-2 text-sm font-semibold text-gray-900">{organiser}</h2>
        <div className="mt-3 space-y-2 text-[11px] text-gray-600">
          <a
            href={telHref(CONTACT.phones[0])}
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-accent" /> {CONTACT.phones[0]}
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 break-all transition-colors hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-accent" /> {email}
          </a>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-sm font-semibold text-gray-900">Share this event</h2>
        <div className="mt-3">
          <ShareButtons title={event.title} showLabel={false} />
        </div>
      </section>
    </aside>
  )
}

export default EventSidebar