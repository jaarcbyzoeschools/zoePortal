import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ArrowRight, ArrowLeft  } from 'lucide-react'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import { Variants } from 'framer-motion'


interface TeamMember {
  id: number
  name: string
  title: string
  image: string
}

interface ManagementProps {
  members?: TeamMember[]
  title?: string
  subtitle?: string
}

export const Management: React.FC<ManagementProps> = ({
  members = [
    {
      id: 1,
      name: 'Bessie Cooper',
      title: 'Accounting Teacher',
      image: '/images/students/Hero1.png',
    },
    {
      id: 2,
      name: 'Bessie Cooper',
      title: 'Math Teacher',
      image: '/images/team/member-2.jpg',
    },
    {
      id: 3,
      name: 'Bessie Cooper',
      title: 'Science Teacher',
      image: '/images/team/member-3.jpg',
    },
    {
      id: 4,
      name: 'Bessie Cooper',
      title: 'English Teacher',
      image: '/images/team/member-4.jpg',
    },
    {
      id: 5,
      name: 'Bessie Cooper',
      title: 'Principal',
      image: '/images/team/member-5.jpg',
    },
  ],
  subtitle = 'Experienced, caring, and committed to building a strong foundation for every student.',
}) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  // Animation variants
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
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative py-5 bg-cream   overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gray-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16 flex justify-between items-start"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Our <span className="text-[#02BB22] italic ">Management</span>
            </h2>
            <p className="text-gray-600 text-base lg:text-lg max-w-[400px]">
              {subtitle}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="flex items-center justify-center w-12 h-12 rounded-[14px] border-[1px] border-gray-200 bg-white text-black hover:bg-[#2a0f0c] hover:text-white transition-colors duration-300 flex-shrink-0"
              aria-label="Previous team member"
            >
              < ArrowLeft className="w-6 h-4" />
            </button>
            <button
              ref={nextRef}
              className="flex items-center justify-center w-12 h-12 rounded-[14px] bg-[#451F17] text-white hover:bg-[#2a0f0c] transition-colors duration-300 flex-shrink-0"
              aria-label="Next team member"
            >
              < ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
         <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation
              if (nav && typeof nav !== 'boolean') {
                nav.prevEl = prevRef.current
                nav.nextEl = nextRef.current
              }
            }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            style={{ paddingBottom: '20px' } as React.CSSProperties}
          >
            {members.map((member) => (
              <SwiperSlide key={member.id} style={{ height: 'auto' }}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="group cursor-pointer h-full"
                >
                  <div className="rounded-[25px] overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    {/* Image Section with Green Background */}
                    <div className="relative bg-[#02BB22] h-64 lg:h-72 overflow-hidden">
                       <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Fade white gradient at bottom (blends into text section) */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white opacity-100" />
                      
                      {/* Green overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#02BB22] via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </div>
 
                    {/* Text Section with White Background */}
                    <div className="flex-1  p-4 lg:p-6 flex flex-col justify-center">
                        
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 text-sm lg:text-base">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

     
    </section>
  )
}

export default Management