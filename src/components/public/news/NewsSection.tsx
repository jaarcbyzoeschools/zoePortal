import React, { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FilterPills } from '@/components/common/FilterPills'
import { Pagination } from '@/components/common/Pagination'
import { NEWS_CATEGORIES, sortedArticles, type NewsCategory } from '@/data/news.data'
import { NewsCard } from './NewsCard'

const PAGE_SIZE = 6
type Filter = 'all' | NewsCategory

export const NewsSection: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const sectionRef = useRef<HTMLElement>(null)

  // Filter and page live in the URL (/news?category=sports&page=2)
  const rawCategory = params.get('category')
  const filter: Filter = NEWS_CATEGORIES.some((c) => c.id === rawCategory)
    ? (rawCategory as Filter)
    : 'all'

  // The featured story has its own spot at the top, so it's left out of the grid
  const list = useMemo(
    () => sortedArticles.filter((a) => !a.featured && (filter === 'all' || a.category === filter)),
    [filter],
  )

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const page = Math.min(Math.max(Number(params.get('page')) || 1, 1), totalPages)
  const visible = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const changeFilter = (next: Filter) => {
    const p = new URLSearchParams(params)
    p.delete('page')
    if (next === 'all') p.delete('category')
    else p.set('category', next)
    setParams(p, { replace: true })
  }

  const changePage = (n: number) => {
    const p = new URLSearchParams(params)
    if (n <= 1) p.delete('page')
    else p.set('page', String(n))
    setParams(p)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section ref={sectionRef} id="latest-news" className="scroll-mt-24 bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          title="Latest"
          highlight="News"
          subtitle="Stories from our classrooms, labs, fields and community."
        />

        <div className="mt-8">
          <FilterPills
            options={NEWS_CATEGORIES}
            active={filter}
            onChange={changeFilter}
            label="Filter stories by category"
          />
        </div>

        {visible.length > 0 ? (
          <div
            key={`${filter}-${page}`}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {visible.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500">No stories in this category yet.</p>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={changePage} />
      </div>
    </section>
  )
}

export default NewsSection