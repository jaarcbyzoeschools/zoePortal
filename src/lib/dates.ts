import { format, isBefore, isSameDay, isSameMonth, parse, parseISO, startOfDay } from 'date-fns'

export const dayOf = (iso: string) => format(parseISO(iso), 'dd')
export const monthShort = (iso: string) => format(parseISO(iso), 'MMM').toUpperCase()
export const monthLong = (iso: string) => format(parseISO(iso), 'MMMM yyyy')
export const shortDate = (iso: string) => format(parseISO(iso), 'MMM dd, yyyy')
export const longDate = (iso: string) => format(parseISO(iso), 'MMMM d, yyyy')

/** True once the whole day has passed. */
export const isPast = (iso: string) => isBefore(parseISO(iso), startOfDay(new Date()))

/** '14:00' -> '2:00 PM' */
export const formatTime = (hhmm: string) => format(parse(hhmm, 'HH:mm', new Date()), 'h:mm a')

/** 'Saturday, November 7, 2026' or 'Nov 30 – Dec 4, 2026' for multi-day events */
export const dateRangeLabel = (date: string, endDate?: string) => {
  const start = parseISO(date)
  if (!endDate || isSameDay(start, parseISO(endDate))) return format(start, 'EEEE, MMMM d, yyyy')
  const end = parseISO(endDate)
  return isSameMonth(start, end)
    ? `${format(start, 'MMM d')} – ${format(end, 'd, yyyy')}`
    : `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`
}
/** A moment in Nigerian time (WAT), whatever the visitor's own time zone. */
export const lagosDate = (date: string, time = '00:00') => new Date(`${date}T${time}:00+01:00`)