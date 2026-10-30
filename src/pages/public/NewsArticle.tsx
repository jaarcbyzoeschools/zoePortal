import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, ChevronRight, Clock, ImageIcon } from 'lucide-react'
import { NotFound } from '@pages/errors'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ContentBlocks } from '@/components/common/ContentBlocks'
import { ShareButtons } from '@/components/common/ShareButtons'
import { NewsCard } from '@/components/public/news/NewsCard'
import { ArticleSidebar } from '@/components/public/news/ArticleSidebar'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { cldPhoto } from '@/lib/cloudinary'
import { longDate } from '@/lib/dates'
import { getArticle, getRelated,breadcrumbTitle, newsCategoryLabel, type ArticleBlock } from '@/data/news.data'

export const NewsArticle: React.FC = () => {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  const [coverFailed, setCoverFailed] = useState(false)

  useEffect(() => setCoverFailed(false), [slug])
  useDocumentTitle(article ? `${article.title} | Zoe Schools` : undefined)

  if (!article) return <NotFound />

  const cover = cldPhoto(article.cover, { width: 1800, ratio: '2:1' })
  const body: ArticleBlock[] = article.body ?? [{ type: 'p', text: article.excerpt }]
  const tags = article.tags ?? [article.tag]
  const related = getRelated(article)
  const secondary =
    article.secondaryCategory && article.secondaryCategory !== article.category
      ? article.secondaryCategory
      : null

  return (
    <>
      <article>
        {/* Header */}
        <header className="bg-cream pb-8 pt-28 lg:pt-32">
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-500">
                <li>
                  <Link to="/" className="transition-colors hover:text-accent">Home</Link>
                </li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li>
                  <Link to="/news" className="transition-colors hover:text-accent">News &amp; Events</Link>
                </li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li
                    aria-current="page"
                    className="max-w-[16rem] truncate font-medium text-accent sm:max-w-[24rem]"
                  >
                    {breadcrumbTitle(article)}
                  </li>
              </ol>
            </nav>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-700">
                {newsCategoryLabel(article.category)}
              </span>
              {secondary && (
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
                  {newsCategoryLabel(secondary)}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-600">
              <span className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-accent/10" aria-hidden="true" />
                By <span className="font-semibold text-gray-900">{article.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {longDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {article.readTime} min read
              </span>
            </div>
          </div>

          {/* Hero image */}
          <div className="mx-auto mt-8 max-w-6xl px-6 md:px-10">
            <div className="relative aspect-[2/1] overflow-hidden rounded-3xl bg-[#e6e1dc]">
              {cover && !coverFailed ? (
                <img
                  src={cover}
                  alt={article.title}
                  fetchPriority="high"
                  onError={() => setCoverFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">Article hero photo</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Body + sidebar */}
        <div className="bg-cream pb-16 pt-10 lg:pb-24 lg:pt-12">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
            <div className="min-w-0">
              <ContentBlocks blocks={body} />

              <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/news?q=${encodeURIComponent(tag)}#latest-news`}
                      className="rounded-full bg-gray-200/70 px-3 py-1 text-[11px] font-medium text-gray-700 transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <ShareButtons title={article.title} />
              </div>
            </div>

            <ArticleSidebar current={article} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading title="Related" highlight="Stories" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default NewsArticle