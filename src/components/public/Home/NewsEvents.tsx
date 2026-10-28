import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Variants } from 'framer-motion'

interface NewsCard {
  id: number
  image: string
  categories: string[]
  title: string
  description: string
  link?: string
}

interface NewsEventsProps {
  news?: NewsCard[]
}

export const NewsEvents: React.FC<NewsEventsProps> = ({
  news = [
    {
      id: 1,
      image: '/images/news/1.png',
      categories: ['Design System', 'Figma'],
      title: 'How Modern Classrooms Are Transforming Student...',
      description:
        'Discover how smart technology, interactive teaching, and digital tools are shaping a better learning experience for our students.',
      link: '#',
    },
    {
      id: 2,
      image: '/images/news/2.png',
      categories: ['Design System', 'Figma'],
      title: 'How Modern Classrooms Are Transforming Student...',
      description:
        'Discover how smart technology, interactive teaching, and digital tools are shaping a better learning experience for our students.',
      link: '#',
    },
    {
      id: 3,
      image: '/images/news/3.png',
      categories: ['Design System', 'Figma'],
      title: 'How Modern Classrooms Are Transforming Student...',
      description:
        'Discover how smart technology, interactive teaching, and digital tools are shaping a better learning experience for our students.',
      link: '#',
    },
  ],
}) => {
  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const headerVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <section className="relative py-16 lg:py-24 bg-cream overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-10 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-4xl lg:text-5xl font-serif font-bold mb-4"
          >
            Trending <span className="text-[#02BB22] italic">Blogs</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="text-gray-600 text-base lg:text-lg max-w-7xl mx-auto"
          >
            Stay informed with articles, school activities, learning tips, and
            community updates.
          </motion.p>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {news.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 lg:h-56 bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.categories.map((category, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#02BB22] transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-3 mb-4">
                  {item.description}
                </p>

                {/* Read More Link */}
                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 text-[#02BB22] font-semibold text-sm hover:gap-3 transition-all duration-200"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default NewsEvents