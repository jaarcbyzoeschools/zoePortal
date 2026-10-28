import React, { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { campuses } from '@/data/campuses.data'

const FOUNDED_YEAR = 2004

interface Stat {
  id: number
  value: number
  suffix?: string
  label: string
}

interface JourneyProps {
  stats?: Stat[]
  title?: string
}

// Students and staff are typed in by hand. Campuses and years work themselves out.
const defaultStats: Stat[] = [
  { id: 1, value: 3000, suffix: '+', label: 'Students' },
  { id: 2, value: 211, label: 'Staff Members' },
  { id: 3, value: campuses.length, label: 'Campuses' },
  { id: 4, value: new Date().getFullYear() - FOUNDED_YEAR, label: 'Years of Excellence' },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const format = (n: number) => n.toLocaleString('en-US')

const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  const shown = reduceMotion ? value : count

  return (
    <span ref={ref} className="block text-3xl font-medium text-white sm:text-4xl">
      {/* Screen readers get the final number, not every step of the count */}
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {format(shown)}
        {suffix}
      </span>
    </span>
  )
}

export const Journey: React.FC<JourneyProps> = ({
  stats = defaultStats,
  title = 'Our Journey of Growth, Excellence, and Unmatched Educational Impact',
}) => (
  <MotionConfig reducedMotion="user">
    <section className="px-4 sm:px-6 bg-cream py-10 md:px-10">
      <motion.div
        className="mx-auto max-w-6xl rounded-3xl bg-linear-to-br from-[#6e1212] via-[#4a1c16] to-[#14442b] px-4 py-10 sm:px-8 lg:py-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={item}
          className="mx-auto max-w-3xl text-balance text-center text-xl font-semibold leading-snug text-white sm:text-2xl"
        >
          {title}
        </motion.h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={item}
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-6 text-center backdrop-blur-sm"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  </MotionConfig>
)

export default Journey