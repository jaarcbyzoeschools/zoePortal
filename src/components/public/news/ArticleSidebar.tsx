import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ImageIcon } from 'lucide-react'
import { cldPhoto } from '@/lib/cloudinary'
import { dateRangeLabel, formatTime, shortDate } from '@/lib/dates'
import { getUpcomingEvents } from '@/data/events.data'
import { articles, NEWS_CATEGORIES, sortedArticles, type Article } from '@/data/news.data'

const ADMISSION_SESSION = '2026/2027'

const card = 'rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'

const Thumb: React.FC<{ src: string }> = ({ src }) => {
  const url = cldPhoto(src, { width: 160, ratio: '4:3' })
  return (
    <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md bg-[#e6e1dc]">
      {url ? (
        <img src={url} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-gray-400">
          <ImageIcon className="h-3.5 w-3.5" />
        </span>
      )}
    </span>
  )
}

export const ArticleSidebar: React.FC<{ current: Article }> = ({ current }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const recent = sortedArticles.filter((a) => a.slug !== current.slug).slice(0, 3)
  const categories = NEWS_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
    ...c,
    count: articles.filter((a) => a.category === c.id).length,
  }))
  // The next entrance exam comes from the events data, so it never goes stale
  const exam = getUpcomingEvents().find((e) => e.category === 'Admission' && /exam/i.test(e.title))

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/news?q=${encodeURIComponent(q)}#latest-news` : '/news#latest-news')
  }

  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:-m-1 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:p-1">
      <form onSubmit={onSearch} role="search">
        <label htmlFor="article-search" className="mb-1.5 block text-[11px] font-semibold text-gray-700">
          Search
        </label>
        <input
          id="article-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </form>

      <section className={card}>
        <h2 className="text-sm font-bold text-gray-900">Recent Posts</h2>
        <ul className="mt-4 space-y-4">
          {recent.map((a) => (
            <li key={a.slug}>
              <Link to={`/news/${a.slug}`} className="group flex items-center gap-3">
                <Thumb src={a.cover} />
                <span className="min-w-0">
                  <span className="line-clamp-2 text-xs font-semibold leading-snug text-gray-900 transition-colors group-hover:text-accent">
                    {a.title}
                  </span>
                  <span className="mt-1 block text-[10px] text-gray-500">{shortDate(a.date)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className="text-sm font-bold text-gray-900">Categories</h2>
        <ul className="mt-4 space-y-3">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                to={`/news?category=${c.id}#latest-news`}
                className="flex items-center justify-between text-xs text-gray-700 transition-colors hover:text-accent"
              >
                {c.label}
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                  {c.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-linear-to-br from-[#6e1212] via-[#4a1c16] to-[#14442b] p-6 text-white">
        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium">
          Admission {ADMISSION_SESSION}
        </span>
        <h2 className="mt-4 text-lg font-semibold leading-snug">
          Admission is open! Secure your child’s place today.
        </h2>
        {exam && (
          <p className="mt-3 text-xs leading-relaxed text-white/80">
            Next onsite entrance exam: {dateRangeLabel(exam.date, exam.endDate)}
            {exam.startTime && ` · ${formatTime(exam.startTime)}`}
          </p>
        )}
        <Link
          to="/admission"
          className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-gray-100"
        >
          Apply Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </aside>
  )
}

export default ArticleSidebar