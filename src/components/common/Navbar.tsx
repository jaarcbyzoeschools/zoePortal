import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
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

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const isActive = (link: NavLink) =>
    link.href === '/'
      ? pathname === '/'
      : [link.href, ...(link.also ?? [])].some((p) => startsWithPath(pathname, p))

  // Close the mobile menu after navigating
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const logo = (
    <Link to="/" className="shrink-0" aria-label="Zoe Schools home">
      <div className="w-20">
        <img src="/images/other/logo.png" alt="Zoe Schools logo" />
      </div>
    </Link>
  )

  return (
    <nav className="fixed left-0 right-0 top-0 z-100 bg-cream py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop: Logo | Centered Nav | Contact Button */}
        <div className="hidden h-16 items-center justify-between gap-8 md:flex">
          {logo}

          <div className="flex flex-1 justify-center">
            <div className="flex items-center gap-5 rounded-full bg-white px-8 py-2 shadow-[0_0_15px_4px_rgba(0,0,0,0.1)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive(link) ? 'page' : undefined}
                  className={`border-b-2 py-0.5 text-sm font-medium transition-colors duration-200 ${
                    isActive(link)
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-700 hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className="shrink-0 rounded-lg bg-linear-to-br from-accent to-[#5c0f0f] px-6 py-2 text-sm font-medium text-white transition-shadow duration-200 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile: Logo and Menu Toggle */}
        <div className="flex h-16 items-center justify-between md:hidden">
          {logo}

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
            {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isActive(link) ? 'page' : undefined}
                className={`block rounded-md px-3 py-3 text-base font-medium ${
                  isActive(link)
                    ? 'bg-gray-50 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="mt-4 block w-full rounded-md bg-linear-to-br from-accent to-[#5c0f0f] px-3 py-3 text-center text-base font-medium text-white transition-shadow duration-200 hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar