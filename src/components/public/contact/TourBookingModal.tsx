import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addDays, format, getDay, parseISO } from 'date-fns'
import { ArrowRight, Check, ChevronDown, Info, LoaderCircle, X } from 'lucide-react'
import { campuses, campusLabel } from '@/data/campuses.data'
import { TOUR } from '@/data/contact.data'
import { dateRangeLabel, formatTime } from '@/lib/dates'
import { sendTourBooking } from '@/lib/contactApi'

const toISO = (d: Date) => format(d, 'yyyy-MM-dd')
const todayISO = () => toISO(new Date())

const isWeekend = (d: Date) => [0, 6].includes(getDay(d))

/** Tomorrow, or the next Monday if that falls on a weekend. */
const firstTourDate = () => {
  let d = addDays(new Date(), 1)
  while (isWeekend(d)) d = addDays(d, 1)
  return toISO(d)
}

const schema = z.object({
  campus: z.string().min(1, 'Please choose a campus'),
  date: z
    .string()
    .min(1, 'Please pick a date')
    .refine((v) => v >= todayISO(), 'Please choose today or a later date')
   .refine(
      (v) => !isWeekend(parseISO(v)),
      'Tours run Monday to Friday. Please choose a weekday.',
    ),
  visitors: z.string().min(1, 'Please choose the number of visitors'),
  time: z.string().min(1, 'Please choose a time'),
  fullName: z.string().trim().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .trim()
    .refine((v) => /^\+?\d{10,15}$/.test(v.replace(/[\s-]/g, '')), 'Enter a valid phone number'),
  email: z.email('Enter a valid email address'),
  /** Honeypot: real visitors never see or fill this */
  website: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])'

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-200 focus:border-accent focus:ring-accent/20'
  }`

const Field: React.FC<{
  label: string
  htmlFor: string
  error?: string
  className?: string
  children: React.ReactNode
}> = ({ label, htmlFor, error, className = '', children }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-gray-900">
      {label}
    </label>
    {children}
    {error && (
      <p role="alert" className="mt-1 text-xs text-red-600">
        {error}
      </p>
    )}
  </div>
)

const SelectChevron = () => (
  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
)

/** Mounted only while the modal is open, so it starts fresh every time. */
const TourForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [done, setDone] = useState<{ name: string; summary: string } | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

   const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      campus: campuses[0] ? campusLabel(campuses[0]) : '',
      date: firstTourDate(),
      visitors: TOUR.defaultVisitors,
      time: TOUR.defaultTime,
      fullName: '',
      phone: '',
      email: '',
      website: '',
    },
  })

  const onSubmit = async (v: FormValues) => {
    setServerError(null)
    const preferredDate = dateRangeLabel(v.date)
    const preferredTime = formatTime(v.time)
    const result = {
      name: v.fullName.split(' ')[0],
      summary: `${preferredDate} at ${preferredTime}, ${v.campus}`,
    }

    // Honeypot filled in: it's a bot. Pretend it worked and send nothing.
    if (v.website) {
      setDone(result)
      return
    }

    try {
      await sendTourBooking({
        fullName: v.fullName,
        email: v.email,
        phone: v.phone,
        campus: v.campus,
        preferredDate,
        preferredTime,
        visitors: v.visitors,
      })
      setDone(result)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (done) {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check className="h-7 w-7" />
        </span>
        <h2 id="tour-title" className="mt-5 text-xl font-bold text-gray-900">
          Booking request sent
        </h2>
        <p id="tour-desc" className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
          Thank you, {done.name}. We have your request for {done.summary}. {TOUR.confirmationNote}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="tour-title" className="text-xl font-bold text-gray-900">
            Book a School Tour
          </h2>
          <p id="tour-desc" className="mt-2 max-w-sm text-xs leading-relaxed text-gray-600">
                       See our classrooms, ICT lab and boarding facilities. Tours take about {TOUR.duration},{' '}
            {TOUR.days}.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3ede8] text-gray-700 transition-colors hover:bg-[#ebe3dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative mt-6 space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...register('website')}
        />

        <Field label="Campus to visit" htmlFor="tour-campus" error={errors.campus?.message}>
          <div className="relative">
            <select
              id="tour-campus"
              aria-invalid={!!errors.campus}
              className={`${inputClass(!!errors.campus)} appearance-none pr-10`}
              {...register('campus')}
            >
              {campuses.map((c) => (
                <option key={c.id} value={campusLabel(c)}>
                  {campusLabel(c)}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preferred date" htmlFor="tour-date" error={errors.date?.message}>
            <input
              id="tour-date"
              type="date"
              min={todayISO()}
              aria-invalid={!!errors.date}
              className={inputClass(!!errors.date)}
                {...register('date', { onChange: () => trigger('date') })}
            />
          </Field>
          <Field label="Number of visitors" htmlFor="tour-visitors" error={errors.visitors?.message}>
            <div className="relative">
              <select
                id="tour-visitors"
                className={`${inputClass(!!errors.visitors)} appearance-none pr-10`}
                {...register('visitors')}
              >
                {TOUR.visitors.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold text-gray-900">Available times</legend>
          <div className="flex flex-wrap gap-2.5">
            {TOUR.slots.map((slot) => (
              <label key={slot} className="cursor-pointer">
                <input type="radio" value={slot} className="peer sr-only" {...register('time')} />
                <span className="block rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-800 transition-colors hover:border-accent/50 peer-checked:border-transparent peer-checked:bg-linear-to-br peer-checked:from-accent peer-checked:to-[#5c0f0f] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2">
                  {formatTime(slot)}
                </span>
              </label>
            ))}
          </div>
          {errors.time && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.time.message}
            </p>
          )}
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Parent / guardian name" htmlFor="tour-name" error={errors.fullName?.message}>
            <input
              id="tour-name"
              type="text"
              autoComplete="name"
              placeholder="Enter full name"
              aria-invalid={!!errors.fullName}
              className={inputClass(!!errors.fullName)}
              {...register('fullName')}
            />
          </Field>
          <Field label="Phone number" htmlFor="tour-phone" error={errors.phone?.message}>
            <input
              id="tour-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234"
              aria-invalid={!!errors.phone}
              className={inputClass(!!errors.phone)}
              {...register('phone')}
            />
          </Field>
        </div>

        <Field label="Email address" htmlFor="tour-email" error={errors.email?.message}>
          <input
            id="tour-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
            {...register('email')}
          />
        </Field>

        <p className="flex items-start gap-2 rounded-lg bg-[#e3eee3] px-4 py-2.5 text-[11px] text-[#1b4d2b]">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" />
          {TOUR.confirmationNote}
        </p>

        {serverError && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </p>
        )}

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-accent to-[#5c0f0f] px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                Booking <LoaderCircle className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Confirm Booking <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

interface TourBookingModalProps {
  open: boolean
  onClose: () => void
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({ open, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key !== 'Tab') return

      // Keep Tab inside the dialog
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    const raf = requestAnimationFrame(() =>
      dialogRef.current?.querySelector<HTMLElement>('select, input')?.focus(),
    )

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="tour-backdrop"
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/55 p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-title"
            aria-describedby="tour-desc"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-h-[calc(100dvh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <TourForm onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default TourBookingModal