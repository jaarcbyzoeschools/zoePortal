export interface Campus {
  id: number
  name: string
  address: string
  phone: string
}

// Phones are placeholders: replace with the real numbers.
export const campuses: Campus[] = [
  { id: 1, name: 'Citadel of Peace', address: 'Isale General, Ogbomoso', phone: '+234 800 000 0000' },
  { id: 2, name: 'Citadel of Joy', address: 'Orogun, Along Iresa Road', phone: '+234 800 000 0000' },
  { id: 3, name: 'Citadel of Flourish', address: 'Oke Alapata Road, Ogbomoso', phone: '+234 800 000 0000' },
  { id: 4, name: 'Citadel of Glory 1', address: 'Mooro, Iresa Road', phone: '+234 800 000 0000' },
  { id: 5, name: 'Citadel of Wisdom', address: 'Abba, Ilorin Road', phone: '+234 800 000 0000' },
  { id: 6, name: 'Citadel of Grace', address: 'Irewolede Estate, Iresa Rd.', phone: '+234 800 000 0000' },
  { id: 7, name: 'Citadel of Praise', address: 'California Area, Ogbomoso', phone: '+234 800 000 0000' },
  { id: 8, name: 'Citadel of Glory 2', address: 'Mooro, Iresa Road', phone: '+234 800 000 0000' },
]

export const campusLabel = (c: Campus) => `${c.name} — ${c.address.split(',')[0]}`
