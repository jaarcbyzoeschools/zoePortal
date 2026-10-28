import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ChevronRight, Mail, MapPin, Phone, Send } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { CONTACT, telHref } from '@/data/contact.data'

interface FooterLink {
  label: string
  href: string
}

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

interface FooterProps {
  companyLinks?: FooterLink[]
  socialLinks?: SocialLink[]
}

const defaultCompanyLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Admission', href: '/admission' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News & Events', href: '/news' },
]

// Placeholders: replace each '#' with the school's real page URL.
const defaultSocialLinks: SocialLink[] = [
  { icon: <FaFacebookF className="h-3.5 w-3.5" />, href: '#', label: 'Facebook' },
  { icon: <FaInstagram className="h-4 w-4" />, href: '#', label: 'Instagram' },
  { icon: <FaLinkedinIn className="h-3.5 w-3.5" />, href: '#', label: 'LinkedIn' },
  { icon: <Send className="h-4 w-4" />, href: '#', label: 'Telegram' },
]

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const headingClass = 'text-base font-bold text-gray-900'

export const Footer: React.FC<FooterProps> = ({
  companyLinks = defaultCompanyLinks,
  socialLinks = defaultSocialLinks,
}) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    // TODO: send the email to a real list. This only simulates a request for now.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setEmail('')
    setStatus('done')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <footer>
      {/* CTA banner */}
      <div className="bg-cream px-6 pb-12 pt-6 md:px-10 lg:pb-16">
        <motion.section
          className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-linear-to-br from-[#6e1212] via-[#4a1c16] to-[#14442b] px-6 py-14 text-center lg:py-16"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="mx-auto max-w-4xl"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={item} className="flex items-center justify-center gap-3 text-white/90">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em]">Join us</span>
              <span className="h-px w-8 bg-white/40" />
            </motion.div>

            <motion.h2
              variants={item}
              className="mt-5 text-3xl  font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {"Let's secure your"}
              <br />
              {"kid's future"}
            </motion.h2>

            <motion.div variants={item} className="mt-8">
              <Link
                to="/admission"
                className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-accent"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>

      {/* Main footer */}
      <div className="bg-[#f2eeea] px-6 pb-8 pt-14 md:px-10 lg:pt-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_1.3fr_1.5fr] lg:gap-12"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Brand + social */}
            <motion.div variants={item}>
              <Link to="/" aria-label="Zoe Schools home" className="inline-block w-20">
                <img src="/images/other/logo.png" alt="Zoe Schools logo" />
              </Link>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600">
                Nurturing academically sound, morally upright and technologically proficient
                children in Ogbomoso since 2004.
              </p>
              <div className="mt-5 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Company */}
            <motion.nav variants={item} aria-label="Footer">
              <h3 className={headingClass}>Company</h3>
              <ul className="mt-5 space-y-3.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Contact */}
            <motion.div variants={item}>
              <h3 className={headingClass}>Contact</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{CONTACT.headOffice.address}, Oyo State</span>
                </li>
                <li>
                  <a
                    href={telHref(CONTACT.phones[0])}
                    className="flex items-center gap-3 transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    {CONTACT.phones[0]}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.emails[0]}`}
                    className="flex items-center gap-3 break-all transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    {CONTACT.emails[0]}
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={item}>
              <h3 className={headingClass}>Newsletter</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Get school news, events and admission updates straight to your inbox.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="mt-5 flex items-center rounded-full border border-gray-200 bg-white p-1.5 transition-shadow focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/10"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-linear-to-br from-accent to-[#5c0f0f] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <span className="animate-pulse">Subscribing…</span>
                  ) : status === 'done' ? (
                    'Subscribed'
                  ) : (
                    <>
                      Subscribe <ChevronRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 rounded-3xl border border-gray-300/80 px-6 py-4 text-xs text-gray-600 md:flex-row md:rounded-full lg:mt-14">
            <p>© {new Date().getFullYear()} Zoe Schools, Ogbomoso. Built by JaarcTechsphere.</p>
            <div className="flex gap-5">
              <Link to="/privacy" className="transition-colors hover:text-accent">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-accent">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer