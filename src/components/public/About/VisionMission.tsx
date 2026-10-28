import React from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { Variants } from 'framer-motion'

interface VisionMissionProps {
  visionTitle?: string
  visionText?: string
  missionTitle?: string
  missionText?: string
}

export const VisionMission: React.FC<VisionMissionProps> = ({
  visionTitle = 'The Vision',
  visionText = 'To be a beacon of educational excellence in Ogbomosloland and the nation at large, known for producing graduates who are academically outstanding, technologically proficient, morally upright, and prepared to make meaningful contributions to society and lead innovation in their chosen fields.',
  missionTitle = 'The Mission',
  missionText = 'Our mission is to be the incubator of knowledge and orientation required to provide and create the change needed for national development and transformation.',
}) => {
  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
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

  const iconVariants:Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative py-5 lg:py-5 bg-cream overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-8 md:px-14">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Our{' '}
            <span className="text-[#02BB22] italic">Vision & Mission</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gray-400"></div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Vision Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="relative rounded-[25px] p-8 lg:p-10 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #8B1C1C 0%, #1B4D2B 100%)',
            }}
          >
            {/* Top Icon */}
            <motion.div
              variants={iconVariants}
              className="mb-6 inline-flex items-center justify-center"
            >
              <div className="relative w-14 h-14 rounded-full bg-white bg-opacity-10 border-2 border-[#D4A574] flex items-center justify-center">
                <Eye className="w-7 h-7 text-[#D4A574]" />
              </div>
            </motion.div>

            {/* Label */}
            <p className="text-[#02BB22] text-xs font-bold  tracking-widest uppercase mb-4">
              Our Vision
            </p>

            {/* Content */}
            <p className="text-white text-base lg:text-md leading-relaxed mb-8">
              {visionText}
            </p>

            {/* Left Accent Line */}
            <div className="absolute left-0 bottom-0 w-1 h-16 bg-gradient-to-t from-[#02BB22] to-transparent" />

            {/* Bottom Text */}
            <p className="text-white text-opacity-70  border-l-2 border-[#02BB22]  p-4 w-full bg-black/10   rounded-tr-sm rounded-br-sm italic font-serif text-sm">
              {visionTitle}
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="relative rounded-[25px] p-8 lg:p-10 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #1B4D2B 0%, #8B1C1C 100%)',
            }}
          >
            {/* Top Icon */}
            <motion.div
              variants={iconVariants}
              className="mb-6 inline-flex items-center justify-center"
            >
              <div className="relative w-14 h-14 rounded-full bg-white bg-opacity-10 border-2 border-[#02BB22] flex items-center justify-center">
                <Eye className="w-7 h-7 text-[#02BB22]" />
              </div>
            </motion.div>

            {/* Label */}
            <p className="text-[#02BB22] text-xs font-bold tracking-widest uppercase mb-4">
              Our Mission
            </p>

            {/* Content */}
            <p className="text-white text-base lg:text-md leading-relaxed mb-8">
              {missionText}
            </p>

            {/* Left Accent Line */}
            <div className="absolute left-0 bottom-0 w-1 h-16 bg-gradient-to-t from-[#8B1C1C] to-transparent" />

            {/* Bottom Text */}
            <p className="text-white text-opacity-70 border-l-2 border-[#02BB22]  w-full bg-black/10   rounded-tr-sm rounded-br-sm p-4 bg-gray-[20px] italic font-serif text-sm">
              {missionTitle}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default VisionMission