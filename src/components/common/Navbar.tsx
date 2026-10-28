import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, type Variants } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface NavLink {
  label: string
  href: string
  /** Other paths that should also light up this link */
  also?: string[]
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Admission', href: '/admission' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News & Events', href: '/news', also: ['/events'] },
]

const startsWithPath = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(`${base}/`)

/** The full-screen menu opens as a circle growing out of the toggle button (top right). */
const CLIP_ORIGIN = '90% 40px'

const menuList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}

const menuItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  const isActive = (link: NavLink) =>
    link.href === '/'
      ? pathname === '/'
      : [link.href, ...(link.also ?? [])].some((p) => startsWithPath(pathname, p))

  const contactActive = startsWithPath(pathname, '/contact')

  // Close the mobile menu after navigating
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Soft background + shadow once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the menu is open, close on Escape,
  // and close if the screen grows to desktop size
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const onResize = () => mq.matches && setIsMenuOpen(false)

    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [isMenuOpen])

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? 'bg-cream/90 shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md'
            : 'bg-cream'
        }`}
      >
        <nav aria-label="Main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between gap-8 transition-[height] duration-300 ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              aria-label="Zoe Schools home"
              className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <img
                src="/images/other/logo.png"
                alt="Zoe Schools logo"
                className={`w-auto object-contain transition-[height] duration-300 ${
                  scrolled ? 'h-10' : 'h-12'
                }`}
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_0_15px_4px_rgba(0,0,0,0.08)] md:flex">
              {navLinks.map((link) => {
                const active = isActive(link)
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        active ? 'text-accent' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-accent/10"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Desktop CTA */}
            <Link
              to="/contact"
              aria-current={contactActive ? 'page' : undefined}
              className="hidden shrink-0 rounded-lg bg-linear-to-br from-accent to-[#5c0f0f] px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:inline-flex"
            >
              Contact Us
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu (sits above the header, with its own logo + close button) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-linear-to-br from-accent to-[#3d0a0a] text-white md:hidden"
            initial={{ clipPath: `circle(0% at ${CLIP_ORIGIN})` }}
            animate={{ clipPath: `circle(150% at ${CLIP_ORIGIN})` }}
            exit={{ clipPath: `circle(0% at ${CLIP_ORIGIN})` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Top bar */}
            <div className="flex h-20 shrink-0 items-center justify-between px-4 sm:px-6">
              <Link
                to="/"
                aria-label="Zoe Schools home"
                className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {/* brightness-0 + invert turns a dark/colour logo white on the red background */}
                <img
                  src="/images/other/logo.png"
                  alt="Zoe Schools logo"
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </Link>

              <button
                type="button"
                autoFocus
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="sr-only">Close main menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <motion.nav
              aria-label="Mobile"
              className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-20"
              variants={menuList}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col items-center gap-5 text-center">
                {navLinks.map((link) => {
                  const active = isActive(link)
                  return (
                    <motion.li key={link.href} variants={menuItem}>
                      <Link
                        to={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`block rounded-md text-3xl font-extrabold uppercase tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-4xl ${
                          active
                            ? 'text-white underline decoration-[#7ed27e] decoration-4 underline-offset-8'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              <motion.div variants={menuItem}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-accent transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Contact Us
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

export default Navbar