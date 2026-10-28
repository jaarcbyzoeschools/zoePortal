import React, { useRef } from 'react'
import { motion, useScroll, useSpring, type Variants } from 'framer-motion'
interface TimelineItem {
  id: number
  year: string
  points: string[]
  isActive?: boolean
}

interface Campus {
  id: number
  name: string
}

interface GrowthProps {
  timeline?: TimelineItem[]
  campuses?: Campus[]
  historyTitle?: string
  historyText?: string
}

export const Growth: React.FC<GrowthProps> = ({
  timeline = [
    {
      id: 1,
      year: '2004',
      points: [
        '15 students and 8 teachers',
        'Location: Isale General, Ogbomoso',
        'Despite initial skepticism, the vision remained strong',
      ],
      isActive: true,
    },
    {
      id: 2,
      year: '2008 - 2012',
      points: [
        'First expansion phase',
        'Growing reputation for quality education',
        'Increasing enrollment year-on-year',
      ],
    },
    {
      id: 3,
      year: '2015 - 2018',
      points: [
        'Multi-branch expansion begins',
        'Establishing presence across Ogbomoso',
        'Recognition for academic excellence',
      ],
    },
    {
      id: 4,
      year: '2020 - 2024',
      points: [
        'Technology revolution phase',
        'Introduction of ICT-focused programs',
        'Expansion to 8 branches',
        '3,000+ students enrollment',
      ],
    },
    {
      id: 5,
      year: '2024 - Present',
      points: [
        'Technology revolution phase',
        'Introduction of ICT-focused programs',
        'Expansion to 8 branches',
        '3,000+ students enrollment',
      ],
    },
  ],
  campuses = [
    { id: 1, name: 'Citadel of Peace - Isale General, Ogbomoso.' },
    { id: 2, name: 'Citadel of Joy — Orogun, Along Iresa Road.' },
    { id: 3, name: 'Citadel of Flourish — Oke Alapata Road, Ogbomoso.' },
    { id: 4, name: 'Citadel of Glory 1 — Mooro, Iresa Road.' },
    { id: 5, name: 'Citadel of Wisdom — Abba, Ilorin Road.' },
    { id: 6, name: 'Citadel of Grace — Irewolede Estate, Iresa Rd.' },
    { id: 7, name: 'Citadel of Praise — California Area, Ogbomoso.' },
    { id: 8, name: 'Citadel of Glory 2 — Mooro, Iresa Road' },


  ],
  historyTitle = 'Where it all Began',
  historyText = `Zoe Schools Ogbomoso was founded on September 13, 2004, with a bold vision and humble beginnings. Starting with just 15 students and 8 dedicated teachers in a rented space at Isale General, Ogbomoso, the school was initially met with skepticism. The caretaker of the property even reported the school to the Ministry of Education, claiming the founders were defrauding parents by using the name "Zoe Group of Schools" without substantial enrollment.

Despite these early challenges and criticisms, the school's commitment to excellence and innovative educational methods proved the doubters wrong. Today, just two decades later, Zoe Schools has grown into one of Ogbomoso's fastest-growing educational institutions, serving over 3,000 pupils and students across 8 strategically located branches with a dedicated team of 211 staff members.

This remarkable growth is a testament to our unwavering commitment to quality education, staff excellence, and meeting the educational needs of families across Oyo State and beyond.`,
}) => {

    // Scroll-linked timeline line
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 60%'],
  })
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const timelineItemVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const campusItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    // overflow-x-clip (not overflow-hidden) so sticky still works inside
    <section className="relative py-8 lg:py-10 bg-cream overflow-x-clip">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* Two-Column Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left Side - History (sticky on desktop) */}
          <motion.div
            variants={itemVariants}
            className="lg:sticky  lg:top-28 lg:self-start"
          >
            <h2 className="text-4xl font-serif lg:text-5xl font-bold mb-6 leading-tight">
              {historyTitle.split(' ').map((word, index) => (
                <span key={index}>
                  {word === 'Began' ? (
                    <span className="text-[#02BB22] italic">Began</span>
                  ) : (
                    <span>{word}</span>
                  )}{' '}
                </span>
              ))}
            </h2>
            <p className="text-gray-600 text-base lg:text-md leading-relaxed whitespace-pre-line">
              {historyText}
            </p>
          </motion.div>

          {/* Right Side - Timeline (scrolls) */}
                    {/* Right Side - Timeline (scrolls) */}
          <motion.div className="relative lg:px-8" variants={itemVariants}>
            {/* Timeline Header */}
            <div
              className="mb-8 p-6 rounded-[20px] lg:mb-12"
              style={{ background: 'linear-gradient(135deg, #451F17 0%, #1B4D2B 100%)' }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Timeline of Growth
              </h3>
              <p className="text-white/80 text-sm">
                Over 2 decades of academic excellence and character formation in Nigeria
              </p>
            </div>

            {/* Timeline Items */}
            <div ref={timelineRef} className="relative space-y-10">
              {/* Track (grey) */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 rounded-full bg-gray-200" />

              {/* Progress (fills on scroll) */}
              <motion.div
                className="absolute left-[7px] top-2 bottom-2 w-0.5 rounded-full origin-top bg-linear-to-b from-[#02BB22] to-[#1B4D2B]"
                style={{ scaleY: lineProgress }}
              />

              {timeline.map((item) => (
                <motion.div
                  key={item.id}
                  variants={timelineItemVariants}
                  className="relative pl-10"
                >
                  {/* Dot — lights up as the line reaches it */}
                  <div className="absolute left-0 top-1.5 w-4 h-4">
                    {item.isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#02BB22] animate-ping opacity-60" />
                    )}
                    <motion.span
                      className="relative block w-4 h-4 rounded-full border-2 shadow-sm"
                      initial={{ scale: 0.7, backgroundColor: '#ffffff', borderColor: '#d1d5db' }}
                      whileInView={{ scale: 1, backgroundColor: '#02BB22', borderColor: '#02BB22' }}
                      viewport={{ once: false, margin: '0px 0px -40% 0px' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="group">
                    <h4 className="text-lg lg:text-xl font-bold text-black mb-2 transition-colors duration-300 group-hover:text-[#02BB22]">
                      {item.year}
                    </h4>
                    <ul className="space-y-1.5">
                      {item.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-black/70 text-sm flex items-start gap-2"
                        >
                          <span className="mt-[7px] w-1.5 h-1.5 shrink-0 rounded-full bg-[#02BB22]/60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                 
                </motion.div>
              ))}
               
            </div>
            <div className='bg-white p-6 rounded-[10px] mt-4 '>
                                <div className='font-bold text-2xl'>Our Campuses</div>



                                  <motion.div
            className="gap-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {campuses.map((campus) => (
              <motion.div
                key={campus.id}
                variants={campusItemVariants}
                className="flex items-start gap-3 py-2 bg-white rounded-[15px]   transition-shadow duration-300"
              >
                
                <p className="text-gray-700 text-sm lg:text-base">{campus.name}</p>
              </motion.div>
            ))}
          </motion.div> 
                  </div>
          </motion.div>
          
        </motion.div>

        
      </div>
    </section>
  )
}

export default Growth