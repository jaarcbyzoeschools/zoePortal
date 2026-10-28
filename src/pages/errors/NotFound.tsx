import React from 'react'
import { Link } from 'react-router-dom'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Update these paths to match your router.
const popularLinks = [
  { label: 'Admission', to: '/admission' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'News & Events', to: '/news' },
]

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/** Faint concentric rings centred behind the content */
const Rings: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    {[360, 520, 680,].map((size) => (
      <span
        key={size}
        className="absolute rounded-full border border-black/[0.06]"
        style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
      />
    ))}
  </div>
)

export const NotFound: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <main className="relative flex min-h-[75svh] items-center justify-center overflow-hidden bg-cream px-6 pb-16 pt-28">
      <Rings />

      <motion.div
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          aria-hidden
          className="bg-linear-to-r from-[#8c1414] to-[#0d4d2e] bg-clip-text text-8xl font-extrabold leading-none tracking-tight text-transparent sm:text-9xl"
        >
          404
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl"
        >
          Oops! This page skipped class.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 max-w-[480px] text-sm leading-relaxed text-gray-600 sm:text-base"
        >
          The page you’re looking for may have moved or no longer exists. Let’s get you back on
          track.
        </motion.p>

        <motion.div variants={item} className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-accent to-[#5c0f0f] px-6 py-3 text-sm font-medium text-white transition-shadow duration-200 hover:shadow-lg"
          >
            Back to Home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg border border-black/10 bg-white px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-black/[0.03]"
          >
            Contact Us
          </Link>
        </motion.div>

        <motion.nav
          variants={item}
          aria-label="Popular pages"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="mr-1 text-xs text-gray-500">Popular:</span>
          {popularLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium text-gray-800 transition-colors hover:border-accent/50 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>
      </motion.div>
    </main>
  </MotionConfig>
)

export default NotFound