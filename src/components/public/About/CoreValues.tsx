import React from 'react'
import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'
import {
  Star,
  Lightbulb,
  Shield,
  Users,
  Heart,
  Zap,
} from 'lucide-react'

interface CoreValue {
  id: number
  title: string
  description: string
  gradient: string
}

interface CoreValuesProps {
  values?: CoreValue[]
}

export const CoreValues: React.FC<CoreValuesProps> = ({
  values = [
    {
      id: 1,
      title: 'Excellence',
      description:
        'We strive for the highest standards in all we do. Excellence is not just a goal—it is our commitment to providing quality education, supporting every student\'s potential, and continuously improving our systems and processes.',
      gradient: 'linear-gradient(135deg, #A71930 0%, #2D5F3F 100%)',
    },
    {
      id: 2,
      title: 'Innovation',
      description:
        'We embrace creativity and modern approaches to education. From introducing coding and robotics programs to developing AI curricula, we believe in using innovation to enhance learning experiences and prepare students for the future.',
      gradient: 'linear-gradient(135deg, #1B4D2B 0%, #3A6B47 100%)',
    },
    {
      id: 3,
      title: 'Integrity',
      description:
        'We uphold honesty, transparency, and strong moral principles in all our dealings. We believe that character development is as important as academic achievement.',
      gradient: 'linear-gradient(135deg, #8B1C1C 0%, #2D5F3F 100%)',
    },
    {
      id: 4,
      title: 'Inclusivity',
      description:
        'We provide a welcoming, supportive environment for all students regardless of background or ability. Every child deserves access to quality education, and we are committed to making that possible.',
      gradient: 'linear-gradient(135deg, #A71930 0%, #2D5F3F 100%)',
    },
    {
      id: 5,
      title: 'Community',
      description:
        'We value partnerships with families, staff, and the broader community. Education is a collective effort, and we believe in working together to create an environment where every student can flourish.',
      gradient: 'linear-gradient(135deg, #1B4D2B 0%, #3A6B47 100%)',
    },
    {
      id: 6,
      title: 'Transformation',
      description:
        'We are dedicated to creating positive change through education. Our goal is to develop graduates who will transform themselves and contribute meaningfully to society.',
      gradient: 'linear-gradient(135deg, #8B1C1C 0%, #2D5F3F 100%)',
    },
  ],
}) => {
  const iconMap = {
    1: Star,
    2: Lightbulb,
    3: Shield,
    4: Users,
    5: Heart,
    6: Zap,
  }
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -15,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
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
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <section className="relative py-16 lg:py-24 bg-cream overflow-hidden">

        
             <div className='absolute left-[-180px]  top-58 w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>

          
             <div className='absolute right-[-200px] z-10 bottom-[-100px] w-90'>
            <img src='/images/other/star.png' alt='star' />
          </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-4">
            Our <span className="text-[#02BB22] italic ">Core Value</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-[#02BB22]"></div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value) => {
            const IconComponent = iconMap[value.id as keyof typeof iconMap]
            return (
              <motion.div
                key={value.id}
                variants={cardVariants}
                whileHover="hover"
                className="relative rounded-[25px] p-8 lg:p-10 overflow-hidden cursor-pointer group flex flex-col items-center text-center"
                style={{
                  background: value.gradient,
                }}
              >
                {/* Icon - Centered */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="mb-6 flex items-center justify-center"
                >
                  <div className="relative w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-bold text-white uppercase tracking-widest mb-4">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-white text-sm lg:text-base leading-relaxed text-opacity-90">
                  {value.description}
                </p>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-[25px]" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#02BB22] to-transparent rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

export default CoreValues