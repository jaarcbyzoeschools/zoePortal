import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, MessageCircle, Star } from 'lucide-react'
import { cldPhoto } from '@/lib/cloudinary'
import { testimonials as defaultTestimonials, type Testimonial } from '@/data/testimonials.data'
import 'swiper/css'

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

const navButton = (enabled: boolean) =>
  `flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
    enabled
      ? 'border-transparent bg-linear-to-br from-accent to-[#5c0f0f] text-white shadow-lg hover:scale-105'
      : 'cursor-not-allowed border-white/30 bg-white/10 text-white/60'
  }`

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = defaultTestimonials,
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const sync = (s: SwiperType) =>
    setEdges((prev) =>
      prev.start === s.isBeginning && prev.end === s.isEnd
        ? prev
        : { start: s.isBeginning, end: s.isEnd },
    )

  // Hide the arrows when every testimonial already fits on screen
  const canScroll = !(edges.start && edges.end)

  return (
    <section className="px-4 sm:px-6 md:px-10 bg-cream">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-linear-to-br from-[#6e1212] via-[#4a1c16] to-[#14442b] px-4 py-14 sm:px-8 lg:py-16">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            Testimonials
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-white sm:text-4xl">
            What <span className="italic text-[#02BB22]">Parents Say</span> About Us
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-[#02BB22]" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="mt-10 lg:mt-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <Swiper
            onSwiper={(s) => {
              setSwiper(s)
              sync(s)
            }}
            onSlideChange={sync}
            onBreakpoint={sync}
            onResize={sync}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {testimonials.map((t) => {
              const photo = t.photo ? cldPhoto(t.photo, { width: 96, ratio: '1:1' }) : ''
              return (
                <SwiperSlide key={t.id} className="h-auto!">
                  <article className="flex h-full flex-col rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#f6e7e7]">
                        {photo && <img src={photo} alt="" className="h-full w-full object-cover" />}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold">{t.name}</h3>
                        <div
                          role="img"
                          aria-label={`${t.rating} out of 5 stars`}
                          className="mt-1 flex gap-0.5"
                        >
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#f5b82e] text-[#f5b82e]" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex-1 text-[13px] leading-relaxed text-white/90">
                      “{t.text}”
                    </p>

                    <div className="mt-4 flex items-center justify-between text-[11px] text-white/70">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {t.role} · {t.location}
                      </span>
                      <MessageCircle className="h-4 w-4 text-white/60" aria-hidden="true" />
                    </div>
                  </article>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </motion.div>

        {/* Arrows */}
        {canScroll && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              disabled={edges.start}
              onClick={() => swiper?.slidePrev()}
              className={navButton(!edges.start)}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              disabled={edges.end}
              onClick={() => swiper?.slideNext()}
              className={navButton(!edges.end)}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials