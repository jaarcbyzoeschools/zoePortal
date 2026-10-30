// Placeholders: replace with the real details.
export const CONTACT = {
  phones: ['+234 800 000 0000', '+234 800 000 0001'],
  emails: ['info@zoeschools.ng', 'admissions@zoeschools.ng'],
  headOffice: {
    name: 'Citadel of Peace (Head Office)',
    address: 'Isale General, Ogbomoso',
    lines: ['Citadel of Peace,', 'Isale General, Ogbomoso'],
  },
  hours: ['Mon - Fri: 7:30 AM - 4:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
  /** International format, digits only (no + or spaces) */
  whatsapp: '2348000000000',
  /** Google Maps > Share > Embed a map > copy the src="..." link from the code */
  mapEmbedUrl: '',
}

export const SUBJECTS = [
  'Admission enquiry',
  'Event registration',
  'Fees & payments',
  'Careers',
  'General enquiry',
]

export const TOUR = {
  duration: '45 minutes',
  days: 'Monday to Friday',
  slots: ['09:00', '10:30', '12:00', '14:00'],
  defaultTime: '10:30',
  visitors: ['1 adult', '1 adult, 1 child', '2 adults', '2 adults, 1 child', '2 adults, 2 children', '3 or more people'],
  defaultVisitors: '2 adults, 1 child',
  confirmationNote: 'Our team will confirm your booking by phone or email within 24 hours.',
}
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
export const directionsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`