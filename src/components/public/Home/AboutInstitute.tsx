import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Variants } from 'framer-motion'

interface AboutImage {
  id: number
  src: string
  alt: string
  isMain?: boolean
}

interface AboutInstituteProps {
  images?: AboutImage[]
}

export const AboutInstitute: React.FC<AboutInstituteProps> = ({
  images = [
    {
      id: 1,
      src: '/images/other/auditorium.jpg',
      alt: 'School Auditorium Event',
      isMain: true,
    },
    {
      id: 2,
      src: '/images/other/studentaward.jpg',
      alt: 'Modern Classroom',
    },
    {
      id: 3,
      src: '/images/other/sport.jpg',
      alt: 'Sports Activity',
    },
    {
      id: 4,
      src: '/images/other/lab.jpg',
      alt: 'Science Lab',
    },
  ],
}) => {
  const [mainImageId, setMainImageId] = useState(1)
  const mainImage = images.find((img) => img.id === mainImageId)
  const thumbnails = images.filter((img) => img.id !== mainImageId).slice(0, 3)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

 

  const mainImageVariants:Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const thumbnailVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const thumbnailHoverVariants:Variants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
      },
    },
  }

  const textFadeInVariants:Variants = {
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

  const checkmarkVariants:Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const features = [
    'Modern classroom facilities',
    'Experienced teachers',
    'Safe and supportive environment',
    'ICT and Hybrid Learning',
    'Comprehensive curriculum',
  ]

 return (
    <section className="relative py-6  bg-cream   overflow-hidden">
      {/* Decorative dots pattern - top left */}
             <div className='absolute right-[-160px] bottom-[-160px] w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>
   
 
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-48 h-48  bg-green-50 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gray-100 rounded-full blur-3xl opacity-20 -z-10" />
 
      <div className="px-2 max-w-6xl bg-white rounded-[30px]  mx-auto mx-2 p-4  lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image Gallery with gray background */}
          <motion.div
            className="flex flex-col p-6 lg:p-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Main Image */}
            <motion.div
              variants={mainImageVariants}
              className="relative w-full overflow-hidden rounded-[25px] shadow-lg mb-4"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={mainImage?.src}
                alt={mainImage?.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
 
            {/* Thumbnail Images - Overlapping */}
            <div className="flex gap-4  mx-4 relative z-10">
              {thumbnails.map((thumbnail) => (
                <motion.button
                  key={thumbnail.id}
                  variants={thumbnailVariants}
                  whileHover="hover"
                  onClick={() => setMainImageId(thumbnail.id)}
                  className="relative overflow-hidden rounded-[15px] border-2 border-transparent hover:border-[#02BB22] transition-all duration-300 cursor-pointer flex-1 shadow-md"
                  style={{ aspectRatio: '1/1' }}
                >
                  <motion.div
                    variants={thumbnailHoverVariants}
                    className="w-full h-full"
                  >
                    <img
                      src={thumbnail.src}
                      alt={thumbnail.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
 
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300" />
                </motion.button>
              ))}
            </div>
 
           
          </motion.div>
 
          {/* Right - Content */}
          <motion.div
            className="flex flex-col px-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Heading */}
            <motion.div variants={textFadeInVariants} className="mb-6">
              <h2 className="text-4xl font-serif lg:text-5xl font-bold mb-2">
                About <span className="text-[#02BB22] italic">Our Institute</span>
              </h2>
            </motion.div>
 
            {/* Description */}
            <motion.p
              variants={textFadeInVariants}
              className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8"
            >
              Zoe Schools Ogbomoso is a leading educational institution serving
              over 3,000 students across 8 strategic locations. Founded in 2004
              with just 13 students, we've grown into one of Nigeria's
              fastest-growing schools, combining traditional academic excellence
              with cutting-edge technology including coding, robotics, and
              artificial intelligence. Every student graduates with both WAEC
              certification and practical vocational skills.
            </motion.p>
 
            {/* Features List */}
            <motion.div className="flex flex-col gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={checkmarkVariants}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 border-[#8C1414] bg-white">
                    <Check className="w-3 h-3 text-[#8C1414]" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
 
            {/* CTA Button */}
            <motion.div
              variants={textFadeInVariants}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#451F17] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
 
export default AboutInstitute
 




