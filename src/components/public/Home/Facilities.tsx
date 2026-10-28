import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Variants } from 'framer-motion'

interface Facility {
  id: number
  image: string
  title: string
  location: string
  description: string
  details?: string
}

interface FacilitiesProps {
  facilities?: Facility[]
}

export const Facilities: React.FC<FacilitiesProps> = ({
  facilities = [
    {
      id: 1,
      image: '/images/facilities/1.jpeg',
      title: 'Isale General, Ogbomoso',
      location: 'Citadel of Peace',
      description: 'A peaceful sanctuary for quality education with modern infrastructure',
    },
    {
      id: 2,
      image: '/images/facilities/2.jpeg',
      title: 'Orogun, Along Iresa Road',
      location: 'Citadel of Joy',
      description: 'Vibrant learning environment fostering joy and creativity',
    },
    {
      id: 3,
      image: '/images/facilities/3.jpg',
      title: 'Oke Alapata, Ogbomoso',
      location: 'Citadel of Flourish',
      description: 'A thriving hub of academic excellence and growth',
    },
    {
      id: 4,
      image: '/images/facilities/4.jpeg',
      title: 'Mooro, Iresa Road',
      location: 'Citadel of Glory 1',
      description: 'Excellence and achievement celebrated every day',
    },
    {
      id: 5,
      image: '/images/facilities/5.jpg',
      title: 'Abba, Ilerin Road',
      location: 'Citadel of Wisdom',
      description: 'Where knowledge and values converge',
    },
    {
      id: 6,
      image: '/images/facilities/6.jpg',
      title: 'Irewolede Estate, Iresa Road',
      location: 'Citadel of Grace',
      description: 'Nurturing excellence with compassion',
    },
    {
      id: 7,
      image: '/images/facilities/7.jpeg',
      title: 'Califonia Area, Ogbomoso',
      location: 'Citadel of Praise',
      description: 'A place to celebrate achievement',
    },
    {
      id: 8,
      image: '/images/facilities/8.jpg',
      title: 'Mooro, Iresa Road',
      location: 'Citadel of Glory 2',
      description: 'Continue the legacy of excellence',
    },
  ],
}) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)

  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const headerVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  }

  const modalVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const modalContentVariants:Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <section className="relative bg-cream py-16 lg:py-24 overflow-hidden">
      {/* Decorative elements */}

             <div className='absolute left-[-180px] top-20 w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>

             <div className='absolute right-[-180px] bottom-20 w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>

             <div className='absolute left-[-50px]  bottom-[-220px] w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className=" md:mx-14 mx-2 px-4 lg:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-4xl font-serif  lg:text-5xl font-bold mb-4"
          >
            Our <span className="text-[#02BB22] italic"><i>Facilities</i></span>
          </motion.h2>

          {/* Underline */}
          <div className=" my-4 flex items-center justify-center gap-4 ">
          <div className="w-8 h-1 bg-gradient-to-r from-[#02BB22] to-transparent" />
          <div className="w-2 h-2 bg-[#02BB22] rounded-full" />
          <div className="w-8 h-1 bg-gradient-to-l from-[#02BB22] to-transparent" />
        </div>

          {/* Description */}
          <motion.p
            variants={headerVariants}
            className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            With 8 campuses strategically located across Ogbomoso, Zoes Schools
            brings quality education closer to your home. Each campus maintains
            the same high standards of excellence, qualified staff, and
            world-class facilities.
          </motion.p>
        </motion.div>

        {/* Facilities Grid (4x2) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {facilities.map((facility) => (
            <motion.div
              key={facility.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => setSelectedFacility(facility)}
              className="bg-gray-50 z-10 rounded-[20px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 lg:h-56 bg-gray-200">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 lg:p-6">
                {/* Location Tag */}
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  {facility.location}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#02BB22] transition-colors duration-200">
                  {facility.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFacility(null)}
          >
            {/* Modal Content */}
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-6xl bg-white rounded-[25px] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>

              {/* Image */}
              <div className="relative w-full h-64 lg:h-80 overflow-hidden">
                <img
                  src={selectedFacility.image}
                  alt={selectedFacility.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="p-6 lg:p-8">
                {/* Location Badge */}
                <span className="inline-block px-4 py-2 bg-green-100 text-[#02BB22] font-semibold text-sm rounded-full mb-4">
                  {selectedFacility.location}
                </span>

                {/* Title */}
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {selectedFacility.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                  {selectedFacility.description}
                </p>

                {/* Details */}
                {selectedFacility.details && (
                  <div className="bg-gray-50 p-4 lg:p-6 rounded-[15px] mb-6">
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                      {selectedFacility.details}
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <motion.a
                  href="/admission"
                  className="inline-block px-6 py-3 bg-[#02BB22] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Facilities