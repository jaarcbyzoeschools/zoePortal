import { dateRangeLabel, formatTime, isPast, lagosDate } from '@/lib/dates'
import type { ArticleBlock } from '@/data/news.data'

export type EventCategory = 'Calendar' | 'Admission' | 'Sports' | 'Celebration' | 'Academics'

export interface EventProgrammeItem {
  /** 24-hour 'HH:mm' */
  time: string
  title: string
  description?: string
}

export interface SchoolEvent {
  /** Also the page URL: /events/<id>. Don't rename once links are shared. */
  id: string
  title: string
  /** 'YYYY-MM-DD' */
  date: string
  /** Last day, for multi-day events */
  endDate?: string
  allDay?: boolean
  /** 24-hour 'HH:mm' */
  startTime?: string
  endTime?: string
  /** Short place name used on cards */
  location: string
  category: EventCategory
  /** One or two sentences, used on cards and in the calendar entry */
  summary: string
  /** Cloudinary link. Leave out to show the placeholder tile. */
  cover?: string
  /** Small grey pills next to the category, e.g. 'Free entry' */
  tags?: string[]
  /** Who the event is for */
  audience?: string
  /** A specific place: adds the map card and the directions link */
  venue?: { name: string; address: string }
  /** Shows the "Register to Attend" button */
  registration?: boolean
  /** Name on the organiser card. Defaults to "Admissions Office". */
  organiser?: string
  /** "About this event" paragraphs. Falls back to the summary. */
  about?: string[]
  programme?: EventProgrammeItem[]
  /** "What to bring" checklist */
  bring?: string[]
  /** Optional free-form content shown after the sections above */
  body?: ArticleBlock[]
}

// Placeholder content: replace with the real school calendar.
export const events: SchoolEvent[] = [
  {
    id: 'first-term-resumption',
    title: 'First Term Resumption',
    date: '2026-09-14',
    allDay: true,
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Pupils and students resume for the new term across all campuses.',
  },
  {
    id: 'parents-teachers-meeting',
    title: 'Parents–Teachers Meeting',
    date: '2026-10-17',
    startTime: '10:00',
    endTime: '12:00',
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Meet your child’s teachers to discuss progress, goals and any concerns.',
  },
  {
    id: 'mid-term-break',
    title: 'Mid-Term Break Begins',
    date: '2026-10-31',
    allDay: true,
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Classes pause for the mid-term break. Lessons resume on the date in the school calendar.',
  },
  {
    id: 'open-day',
    title: 'Open Day & School Tour',
    date: '2026-11-07',
    startTime: '10:00',
    endTime: '14:00',
    location: 'Citadel of Joy, Orogun',
    category: 'Admission',
    summary: 'Tour the campus, meet our teachers and learn how admission works for 2026/2027.',
    tags: ['Free entry'],
    audience: 'Parents, guardians & prospective pupils',
    venue: { name: 'Citadel of Joy', address: 'Orogun, Along Iresa Road' },
    registration: true,
    about: [
      'Come and experience Zoe Schools for yourself. Our Open Day is the best way to see our classrooms, ICT and robotics lab, boarding house and sports facilities, meet our teachers and get your questions about admission answered on the spot.',
    ],
    programme: [
      { time: '10:00', title: 'Welcome & introduction', description: 'Meet the Proprietor and Director of Studies.' },
      { time: '10:30', title: 'Guided campus tour', description: 'Classrooms, ICT lab, library and boarding facilities.' },
      { time: '11:30', title: 'Live class demos', description: 'Abacus maths, coding and robotics in action.' },
      { time: '12:30', title: 'Admission desk & Q&A', description: 'Fees, exam dates, transport and boarding.' },
      { time: '13:30', title: 'Refreshments', description: 'Light refreshments for families.' },
    ],
    bring: [
      'Your child (they’ll love the robotics demo!)',
      'Questions about admission and fees',
      'Last school report, if you plan to apply on the day',
    ],
  },
  {
    id: 'entrance-exam',
    title: 'Entrance Examination',
    date: '2026-11-14',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Citadel of Peace, Isale General',
    category: 'Admission',
    summary: 'Entrance examination for prospective pupils applying for the 2026/2027 session.',
    venue: { name: 'Citadel of Peace', address: 'Isale General' },
  },
  {
    id: 'inter-house-sports',
    title: 'Inter-House Sports Competition',
    date: '2026-11-21',
    startTime: '08:00',
    endTime: '16:00',
    location: 'Citadel of Glory 1, Mooro',
    category: 'Sports',
    summary: 'A full day of track and field events, team games and house pride.',
    audience: 'Pupils, parents & guardians',
    venue: { name: 'Citadel of Glory 1', address: 'Mooro, Iresa Road' },
    about: [
      'Placeholder: the four houses compete in track and field events, relays and team games. Parents and guardians are welcome to cheer from the stands.',
    ],
    programme: [
      { time: '08:00', title: 'March-past and opening' },
      { time: '09:00', title: 'Track and field events' },
      { time: '12:30', title: 'Lunch break' },
      { time: '13:30', title: 'Relays and team games' },
      { time: '15:30', title: 'Prize presentation' },
    ],
  },
  {
    id: 'term-exams',
    title: 'First Term Examinations',
    date: '2026-11-30',
    endDate: '2026-12-04',
    allDay: true,
    location: 'All campuses',
    category: 'Academics',
    summary: 'First term examinations run for the week across all campuses.',
  },
  {
    id: 'carol-prize-giving',
    title: 'Christmas Carol & Prize-Giving Day',
    date: '2026-12-12',
    startTime: '16:00',
    endTime: '19:00',
    location: 'Citadel of Peace, Isale General',
    category: 'Celebration',
    summary: 'An evening of carols, performances and awards for outstanding pupils.',
    venue: { name: 'Citadel of Peace', address: 'Isale General' },
    about: [
      'Placeholder: join us to celebrate the term with carols, drama and music from our pupils, followed by the presentation of prizes for academic and character excellence.',
    ],
  },
  {
    id: 'christmas-break',
    title: 'Christmas Break Begins',
    date: '2026-12-18',
    allDay: true,
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Schools close for the Christmas holiday.',
  },
]

const lastDay = (e: SchoolEvent) => e.endDate ?? e.date

export const getEvent = (id: string) => events.find((e) => e.id === id)

/** Upcoming first-to-last. Past events drop off automatically. */
export const getUpcomingEvents = () =>
  events.filter((e) => !isPast(lastDay(e))).sort((a, b) => a.date.localeCompare(b.date))

/** Most recent first. */
export const getPastEvents = () =>
  events.filter((e) => isPast(lastDay(e))).sort((a, b) => b.date.localeCompare(a.date))

/** 'All day', '10:00 AM - 2:00 PM' or '4:00 PM' */
export const eventTimeLabel = (e: SchoolEvent) => {
  if (e.allDay || !e.startTime) return 'All day'
  return e.endTime ? `${formatTime(e.startTime)} - ${formatTime(e.endTime)}` : formatTime(e.startTime)
}

/** When the event starts and ends, in Nigerian time. */
export const eventStart = (e: SchoolEvent) =>
  lagosDate(e.date, e.allDay ? '00:00' : (e.startTime ?? '00:00'))
export const eventEnd = (e: SchoolEvent) =>
  lagosDate(lastDay(e), e.allDay ? '23:59' : (e.endTime ?? '23:59'))

/** Link to the contact form with the subject and message already filled in. */
export const registrationHref = (e: SchoolEvent) => {
  const params = new URLSearchParams({
    subject: 'Event registration',
    message: `Hello, I would like to register for "${e.title}" on ${dateRangeLabel(e.date, e.endDate)}.\n\nNumber of people attending: `,
  })
  return `/contact?${params.toString()}#contact-form`
}