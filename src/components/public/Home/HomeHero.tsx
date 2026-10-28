import React from 'react'
import { Link } from 'react-router-dom'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import { ArrowRight, GraduationCap } from 'lucide-react'

interface StudentImage {
  id: number
  src: string
  alt: string
  /** Colour behind the cut-out photo */
  bgColor: string
  shape: 'circle' | 'rounded'
}

interface HomeHeroProps {
  studentImages?: StudentImage[]
}

// Colours are matched by eye to the design: adjust if you have the exact hex values.
const defaultImages: StudentImage[] = [
  { id: 1, src: '/images/students/Hero1.png', alt: 'Smiling Zoe Schools student in uniform', bgColor: '#0d4d2e', shape: 'circle' },
  { id: 2, src: '/images/students/Hero2.png', alt: 'Zoe Schools student posing with a hand on her cheek', bgColor: '#8c1414', shape: 'rounded' },
  { id: 3, src: '/images/students/Hero3.png', alt: 'Zoe Schools student standing confidently', bgColor: '#14b514', shape: 'rounded' },
  { id: 4, src: '/images/students/Hero4.png', alt: 'Zoe Schools student smiling in uniform', bgColor: '#7ed27e', shape: 'circle' },
]

const textContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const textItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const gridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
}

const gridItem: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

/** Faint concentric rings on the left edge (desktop only) */
const Rings: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute -left-52 top-1/2 hidden -translate-y-1/2 lg:block"
  >
    {[440, 600, 760].map((size) => (
      <span
        key={size}
        className="absolute rounded-full border border-black/[0.06]"
        style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
      />
    ))}
  </div>
)

export const HomeHero: React.FC<HomeHeroProps> = ({ studentImages = defaultImages }) => (
  // reducedMotion="user" switches the movement off for people who ask for less motion
  <MotionConfig reducedMotion="user">
    {/*
      Mobile: content stacks and the section grows with it (no forced full-height),
      so the photo grid sits right under the text instead of being pushed off screen.
      Desktop: full-height, two columns, vertically centred.
    */}
    <section className="relative overflow-hidden bg-cream pt-24 pb-12 sm:pt-28 lg:flex lg:min-h-svh lg:items-center lg:pt-32 lg:pb-5">
      <Rings />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            className="flex flex-col items-start"
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={textItem}
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-white/60 px-4 py-1.5 text-xs font-medium text-gray-800 backdrop-blur-sm"
            >
              <GraduationCap className="h-3.5 w-3.5 text-accent" />
              A Better Place to Learn
            </motion.span>

            <motion.h1
              variants={textItem}
              className="mt-5 text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:mt-6 lg:text-6xl xl:text-7xl"
            >
              <span className="block">
                <span className="font-bold text-gray-900">Education</span>{' '}
                <span className="font-normal text-gray-700">for</span>
              </span>
              <span className="block">
                <span className="font-normal text-gray-700">a</span>{' '}
                <span className="font-bold text-accent">Bright Future.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={textItem}
              className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 lg:mt-6 lg:text-lg"
            >
              A modern learning environment where education meets innovation, inspiring every
              student to succeed.
            </motion.p>

            <motion.div variants={textItem} className="mt-6 lg:mt-8">
              <Link
                to="/admission"
                className="group inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-accent to-[#5c0f0f] px-6 py-3 text-sm font-medium text-white transition-shadow duration-200 hover:shadow-lg"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Photo grid: always rendered, compact on mobile */}
          <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-sm lg:ml-auto lg:mr-0 lg:max-w-[30rem]">
            {/* Accent dot beside the grid (desktop only, so it can't overflow on phones) */}
            <span
              aria-hidden
              className="absolute -left-8 top-1/2 hidden -translate-y-1/2 lg:block"
            >
              <motion.span
                className="block h-4 w-4 rounded-full bg-accent"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>

            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-5"
              variants={gridContainer}
              initial="hidden"
              animate="visible"
            >
              {studentImages.map((image, index) => (
                <motion.div key={image.id} variants={gridItem}>
                  {/* Floats gently, and the whole shape moves with it */}
                  <motion.div
                    className={`aspect-square overflow-hidden shadow-lg ${
                      image.shape === 'circle' ? 'rounded-full' : 'rounded-[22%]'
                    }`}
                    style={{ backgroundColor: image.bgColor }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 5 + index * 0.6,
                      delay: index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      className="h-full w-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  </MotionConfig>
)

export default HomeHero