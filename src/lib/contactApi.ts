export interface ContactPayload {
  fullName: string
  email: string
  phone: string
  campus: string
  subject: string
  message: string
}

export interface TourBookingPayload {
  fullName: string
  email: string
  phone: string
  campus: string
  /** Already formatted for reading, e.g. "Saturday, November 7, 2026" */
  preferredDate: string
  /** e.g. "10:30 AM" */
  preferredTime: string
  visitors: string
}

const ENDPOINT = 'https://api.web3forms.com/submit'

async function submit(fields: Record<string, string>): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
  if (!accessKey) {
    throw new Error('The form is not set up yet. Please call or email us instead.')
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: 'Zoe Schools Website',
      ...fields,
    }),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok || !data?.success) {
    throw new Error(
      data?.message || 'We could not send your request. Please try again or call us directly.',
    )
  }
}

export const sendContactMessage = (p: ContactPayload) =>
  submit({
    subject: `[Zoe Schools website] ${p.subject}`,
    name: p.fullName,
    email: p.email, // used as the reply-to address
    phone: p.phone || 'Not provided',
    preferred_campus: p.campus || 'No preference',
    message: p.message,
  })

export const sendTourBooking = (p: TourBookingPayload) =>
  submit({
    subject: `[Zoe Schools website] Tour booking: ${p.campus}`,
    name: p.fullName,
    email: p.email,
    phone: p.phone,
    campus: p.campus,
    preferred_date: p.preferredDate,
    preferred_time: p.preferredTime,
    visitors: p.visitors,
    message: `School tour booking request\n\nCampus: ${p.campus}\nDate: ${p.preferredDate}\nTime: ${p.preferredTime}\nVisitors: ${p.visitors}`,
  })