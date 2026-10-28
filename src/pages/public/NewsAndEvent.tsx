import PageHero from "@/components/common/PageHero"
import FeaturedStory from "@/components/public/news/FeaturedStory"
import NewsSection from "@/components/public/news/NewsSection"
import EventsSection from "@/components/public/events/EventsSection"
import { featuredArticle } from '@/data/news.data'

import { GraduationCap, } from 'lucide-react'


export const NewsAndEvent: React.FC = () => {
  return (
    <div>
      <PageHero
  badge="News & Events"
  badgeIcon={<GraduationCap />}
  title="What’s Happening at "
  highlight="Zoe"
  subtitle="School news, achievements, announcements and upcoming events from across all our campuses."
/>
  {/* your filter tabs go here */}

       <section className="bg-cream pb-14 ">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {featuredArticle && <FeaturedStory article={featuredArticle} />}
        <EventsSection className="mt-16 lg:mt-20" />
      </div>
    </section>

    <NewsSection />
    </div>
  )
}