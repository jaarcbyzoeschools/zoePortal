import PageHero from '@/components/common/PageHero'
import React, { useEffect, useState } from 'react'
import { GraduationCap } from 'lucide-react'

interface PolicySection {
  id: string
  title: string
  body: string[]
}

const placeholder =
  'Zoe Schools collects only the information needed to process admissions, manage student records and communicate with parents and guardians. Replace this placeholder with the school’s approved policy text, reviewed against the Nigeria Data Protection Act (NDPA) 2023.'

const sections: PolicySection[] = [
  { id: 'information-we-collect', title: 'Information we collect', body: [placeholder] },
  { id: 'how-we-use-information', title: 'How we use information', body: [placeholder] },
  { id: 'childrens-data', title: 'Children’s data', body: [placeholder] },
  { id: 'data-sharing', title: 'Data sharing', body: [placeholder] },
  { id: 'data-security', title: 'Data security', body: [placeholder] },
  { id: 'your-rights', title: 'Your rights', body: [placeholder] },
  { id: 'contact-us', title: 'Contact us', body: [placeholder] },
]

/** Height of your fixed navbar plus a little breathing room. Adjust to match. */
const HEADER_OFFSET = 96

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // A section becomes "active" once its heading crosses the top band of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -65% 0px`, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))

    // Make sure the last section can become active when the page bottoms out
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) setActive(ids[ids.length - 1])
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return [active, setActive] as const
}

export const Policy: React.FC = () => {
  const ids = sections.map((s) => s.id)
  const [active, setActive] = useActiveSection(ids)

  const goTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
    setActive(id)
  }

  return (
    <>
       <PageHero
  badge="Legal"
  badgeIcon={<GraduationCap />}
  title="Privacy Policy"
  highlight=""
  subtitle="Last updated: October 1, 2026"
/>
    <main className="bg-cream  pb-20 pt-5">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
    
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Mobile: sticky horizontal tab strip */}
          <nav
            aria-label="On this page"
            className="sticky top-20 z-20 -mx-6 overflow-x-auto bg-cream/95 px-6 py-3 backdrop-blur-sm md:-mx-10 md:px-10 lg:hidden"
          >
            <ul className="flex gap-2 whitespace-nowrap">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={goTo(s.id)}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`block rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                      active === s.id
                        ? 'border-accent/40 bg-accent/10 text-accent'
                        : 'border-black/10 bg-white text-gray-700'
                    }`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop: sticky sidebar card */}
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-28 self-start rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm"
            >
              <p className="px-3 pb-3 pt-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                On this page
              </p>
              <ul className="space-y-1">
                {sections.map((s) => {
                  const isActive = active === s.id
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={goTo(s.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`block rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          isActive
                            ? 'bg-accent/10 font-semibold text-accent'
                            : 'text-gray-700 hover:bg-black/[0.04] hover:text-gray-900'
                        }`}
                      >
                        {s.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="max-w-3xl">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                style={{ scrollMarginTop: HEADER_OFFSET }}
                className={i === sections.length - 1 ? '' : 'mb-12'}
              >
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {i + 1}. {s.title}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
    </>
  )
}

export default Policy