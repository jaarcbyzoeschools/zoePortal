import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Check, ChevronDown, LoaderCircle } from 'lucide-react'
import { campuses } from '@/data/campuses.data'
import { SUBJECTS } from '@/data/contact.data'
import { sendContactMessage } from '@/lib/contactApi'

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name'),
  email: z.email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v === '' || /^\+?\d{10,15}$/.test(v.replace(/[\s-]/g, '')),
      'Enter a valid phone number',
    ),
  campus: z.string(),
  subject: z.string().min(1, 'Please choose a subject'),
  message: z.string().trim().min(10, 'Please write at least 10 characters'),
  consent: z.boolean().refine((v) => v, 'Please agree so we can respond to you'),
  /** Honeypot: real visitors never see or fill this */
  website: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export interface SubjectRequest {
  subject: string
  message?: string
  /** Changes on every request so repeated clicks still apply */
  nonce: number
}

interface ContactFormProps {
  subjectRequest?: SubjectRequest | null
}

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

export const ContactForm: React.FC<ContactFormProps> = ({ subjectRequest }) => {
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      campus: '',
      subject: SUBJECTS[0],
      message: '',
      consent: false,
      website: '',
    },
  })

  // "Book a School Tour" pre-selects the subject
  useEffect(() => {
    if (!subjectRequest) return
    setValue('subject', subjectRequest.subject)
    if (subjectRequest.message) setValue('message', subjectRequest.message)
  }, [subjectRequest, setValue])

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    const firstName = values.fullName.split(' ')[0]

    // Honeypot filled in: it's a bot. Pretend it worked and send nothing.
    if (values.website) {
      setSentTo(firstName)
      return
    }

    try {
      await sendContactMessage(values)
      setSentTo(firstName)
      reset()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (sentTo) {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-gray-900">Message sent</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
          Thank you, {sentTo}. Our team will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="mt-6 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
      <p className="mt-3 text-sm text-gray-600">
        Fill the form and our team will get back to you within 24 hours.
      </p>

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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              aria-invalid={!!errors.fullName}
              className={inputClass(!!errors.fullName)}
              {...register('fullName')}
            />
          </Field>
          <Field label="Email address" htmlFor="email" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className={inputClass(!!errors.email)}
              {...register('email')}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone number" htmlFor="phone" error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234"
              aria-invalid={!!errors.phone}
              className={inputClass(!!errors.phone)}
              {...register('phone')}
            />
          </Field>
          <Field label="Preferred campus" htmlFor="campus">
            <div className="relative">
              <select id="campus" className={`${inputClass(false)} appearance-none pr-10`} {...register('campus')}>
                <option value="">Select a campus</option>
                {campuses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </Field>
        </div>

        <Field label="Subject" htmlFor="subject" error={errors.subject?.message}>
          <div className="relative">
            <select
              id="subject"
              aria-invalid={!!errors.subject}
              className={`${inputClass(!!errors.subject)} appearance-none pr-10`}
              {...register('subject')}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>

        <Field label="Message" htmlFor="message" error={errors.message?.message}>
          <textarea
            id="message"
            rows={5}
            placeholder="Write your message…"
            aria-invalid={!!errors.message}
            className={`${inputClass(!!errors.message)} resize-y`}
            {...register('message')}
          />
        </Field>

        <div>
          <label className="flex items-start gap-2.5 text-xs text-gray-700">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-accent"
              {...register('consent')}
            />
            I agree to be contacted by Zoe Schools about my enquiry.
          </label>
          {errors.consent && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.consent.message}
            </p>
          )}
        </div>

        {serverError && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              Sending <LoaderCircle className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Send Message <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </>
  )
}

export default ContactForm