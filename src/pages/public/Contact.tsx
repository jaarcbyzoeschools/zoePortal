import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { FaqSection } from '@/components/common/FaqSection'
import { ContactInfoCards } from '@/components/public/contact/ContactInfoCards'
import { ContactForm, type SubjectRequest } from '@/components/public/contact/ContactForm'
import { ContactAside } from '@/components/public/contact/ContactAside'
import { CampusGrid } from '@/components/public/contact/CampusGrid'
import { TourBookingModal } from '@/components/public/contact/TourBookingModal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SUBJECTS } from '@/data/contact.data'

export const Contact: React.FC = () => {
  useDocumentTitle('Contact Us | Zoe Schools')
  const [params] = useSearchParams()

  // Links like /contact?subject=Event%20registration pre-fill the message form
  const [subjectRequest] = useState<SubjectRequest | null>(() => {
    const subject = params.get('subject')
    return subject && SUBJECTS.includes(subject)
      ? { subject, message: params.get('message') ?? undefined, nonce: 1 }
      : null
  })

  // /contact?tour=1 opens the tour booking straight away
  const [tourOpen, setTourOpen] = useState(() => params.get('tour') === '1')

  return (
    <>
      {/* Swap for your own hero if you've already built one */}
      <PageHero
        badge="Contact"
        badgeIcon={<Phone />}
        title="Get in"
        highlight="Touch"
        subtitle="Questions about admission, fees or a campus visit? Reach out and our team will help."
      />

      <section className="bg-cream pb-16 lg:pb-24">
        <div className="mx-auto max-w-6xl space-y-6 px-6 md:px-10 lg:space-y-8">
          <ContactInfoCards />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
            <div id="contact-form" className="scroll-mt-28 rounded-3xl bg-white p-6 shadow-md sm:p-8">
              <ContactForm subjectRequest={subjectRequest} />
            </div>
            <ContactAside onBookTour={() => setTourOpen(true)} />
          </div>
        </div>
      </section>

      <CampusGrid />
      <FaqSection />

      <TourBookingModal open={tourOpen} onClose={() => setTourOpen(false)} />
    </>
  )
}

export default Contact