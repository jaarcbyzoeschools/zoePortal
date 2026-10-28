import React from 'react'
import { motion } from 'framer-motion'
import { Flag } from 'lucide-react'
import { Variants } from 'framer-motion'

interface AboutHeroImage {
  id: number
  src: string
  alt: string
}

interface AboutHeroProps {
  images?: AboutHeroImage[]
  title?: string
  subtitle?: string
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  images = [
    {
      id: 1,
      src: '/images/facilities/5.jpg',
      alt: 'Zoe Schools Campus 1',
    },
    {
      id: 2,
      src: '/images/facilities/2.jpeg',
      alt: 'Zoe Schools Campus 2',
    },
    {
      id: 3,
      src: '/images/facilities/4.jpeg',
      alt: 'Zoe Schools Campus 3',
    },
  ],
  title = 'Meet Zoe Schools',
  subtitle = "Ogbomoso's Fastest-Growing Educational Institution",
}) => {
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

  const itemVariants:Variants = {
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

  const badgeVariants:Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const imageVariants:Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  }

  const decorativeVariants:Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: 'easeOut',
      },
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative pt-16 lg:pt-24 pb-12 lg:pb-10 overflow-hidden bg-[#FDFAFA]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-8 mg:px-13">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-400 rounded-full mb-6"
          >
            <Flag className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-800">About us</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Images Grid */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={imageVariants}
              whileHover="hover"
              className="relative group cursor-pointer"
              style={{
                // Slight offset for staggered look
                transform: index === 1 ? 'translateY(20px)' : undefined,
              }}
            >
              <div className="relative overflow-hidden rounded-[30px] shadow-lg">
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-[30px]" />
              </div>
            </motion.div>
          ))}

          {/* Decorative Red Circle */}
          <motion.div
            variants={decorativeVariants}
            animate="float"
            className="hidden lg:block absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg"
            style={{
              zIndex: -1,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutHero