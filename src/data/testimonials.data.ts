export interface Testimonial {
  id: number
  name: string
  /** 1 to 5 */
  rating: number
  text: string
  role: string
  location: string
  /** Optional Cloudinary link. Without one, the avatar is a plain circle. */
  photo?: string
}

// The first three come from the design and the last three are fillers so the carousel has
// something to scroll. Replace all of them with real testimonials from parents who agreed
// to be quoted.
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mrs. Funmi Adeyemi',
    rating: 5,
    text: 'My child has become more confident and active since joining Zoe. The teachers genuinely care about each student.',
    role: 'Parent',
    location: 'Isale General',
  },
  {
    id: 2,
    name: 'Mr. Tunde Olaniyan',
    rating: 5,
    text: 'The ICT and robotics classes are a game-changer. My son now builds his own little projects at home.',
    role: 'Parent',
    location: 'Orogun',
  },
  {
    id: 3,
    name: 'Mrs. Bisi Akande',
    rating: 5,
    text: 'Boarding has been safe and well-organised. We get regular updates and our daughter is thriving.',
    role: 'Parent',
    location: 'Mooro',
  },
  {
    id: 4,
    name: 'Placeholder Parent',
    rating: 5,
    text: 'Placeholder: replace with a real testimonial from a parent.',
    role: 'Parent',
    location: 'Abba',
  },
  {
    id: 5,
    name: 'Placeholder Parent',
    rating: 5,
    text: 'Placeholder: replace with a real testimonial from a parent.',
    role: 'Parent',
    location: 'Irewolede',
  },
  {
    id: 6,
    name: 'Placeholder Parent',
    rating: 5,
    text: 'Placeholder: replace with a real testimonial from a parent.',
    role: 'Parent',
    location: 'California Area',
  },
]