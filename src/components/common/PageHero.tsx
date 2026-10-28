import React from 'react'
import { motion, type Variants } from 'framer-motion'

interface PageHeroProps {
  /** Small pill label above the title, e.g. "Gallery" */
  badge?: string
  /** Icon shown inside the badge (lucide-react or react-icons) */
  badgeIcon?: React.ReactNode
  /** Plain part of the title, e.g. "Explore Our" */
  title: string
  /** Coloured part of the title, e.g. "Campus Life" */
  highlight?: string
  /** Put the highlight before the title instead of after */
  highlightFirst?: boolean
  subtitle?: React.ReactNode
  /** Anything below the subtitle: filter tabs, buttons, search bar */
  children?: React.ReactNode
  /** Hide the background circles */
  showDecor?: boolean
  className?: string
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/** Faint concentric rings used as background decoration */
const Rings: React.FC<{ className: string }> = ({ className }) => (
  <div aria-hidden className={`pointer-events-none absolute ${className}`}>
    {[1, 2, 3].map((n) => (
      <span
        key={n}
        className="absolute rounded-full border border-black/[0.06]"
        style={{
          width: `${n * 180}px`,
          height: `${n * 180}px`,
          top: `-${n * 90}px`,
          left: `-${n * 90}px`,
        }}
      />
    ))}
  </div>
)

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  badgeIcon,
  title,
  highlight,
  highlightFirst = false,
  subtitle,
  children,
  showDecor = true,
  className = '',
}) => {
  const highlightEl = highlight && (
    <span className="text-accent">{highlight}</span>
  )

  return (
    <section
      className={`relative overflow-x-clip bg-cream pt-28 pb-14 lg:pt-36 lg:pb-20 ${className}`}
    >
      {showDecor && (
        <>
          <Rings className="top-10 left-[15%]" />
          <Rings className="bottom-0 right-[8%]" />
        </>
      )}

      <motion.div
        className="relative max-w-4xl mx-auto px-6 md:px-10 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {badge && (
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-white/60 px-4 py-1.5 text-xs font-medium text-gray-800 backdrop-blur-sm"
          >
            {badgeIcon && (
              <span className="text-accent [&>svg]:w-3.5 [&>svg]:h-3.5">{badgeIcon}</span>
            )}
            {badge}
          </motion.span>
        )}

        <motion.h1
          variants={item}
          className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]"
        >
          {highlightFirst ? (
            <>
              {highlightEl} {title}
            </>
          ) : (
            <>
              {title} {highlightEl}
            </>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={item}
            className="mt-5 mx-auto max-w-[36rem] text-base lg:text-lg leading-relaxed text-gray-600"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div variants={item} className="mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default PageHero