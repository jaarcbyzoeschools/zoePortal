import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Variants } from 'framer-motion'

interface GalleryImage {
  id: number
  src: string
  alt: string
  width: number
  height: number
}

interface CampusGalleryProps {
  images?: GalleryImage[]
}

export const CampusGallery: React.FC<CampusGalleryProps> = ({
  images = [
    {
      id: 1,
      src: '/images/gallery/1.jpg',
      alt: 'Students in school uniforms',
      width: 400,
      height: 300,
    },
    {
      id: 2,
      src: '/images/gallery/2.jpg',
      alt: 'School activity and events',
      width: 300,
      height: 400,
    },
    {
      id: 3,
      src: '/images/gallery/3.jpg',
      alt: 'Learning moments in classroom',
      width: 400,
      height: 300,
    },
    {
      id: 4,
      src: '/images/gallery/4.jpg',
      alt: 'Student engagement',
      width: 300,
      height: 400,
    },
    {
      id: 5,
      src: '/images/gallery/5.jpg',
      alt: 'Campus life moments',
      width: 400,
      height: 300,
    },
  ],
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const headerVariants: Variants = {
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

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  }

  const lightboxVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const imageModalVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentIndex(images.findIndex((img) => img.id === image.id))
  }

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length
    setCurrentIndex(nextIndex)
    setSelectedImage(images[nextIndex])
  }

  const handlePrevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(prevIndex)
    setSelectedImage(images[prevIndex])
  }

  return (
    <section className="relative py-12   bg-cream overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Label */}
          <motion.p
            variants={headerVariants}
            className="text-sm text-gray-600 font-medium tracking-widest uppercase mb-4"
          >
           
             <div className="mt-2 lg:mt-2 flex items-center justify-center gap-4">
          <div className="w-6 h-[2px] bg-[#820203] mr-[-10px]" />
           Gallery
          <div className="w-6 h-[2px] bg-[#820203]  ml-[-10px] " />
        </div>
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-4xl font-serif text-[#820203] lg:text-5xl font-bold mb-4"
          >
            Explore Our{' '}
            <span className="text-[#02BB22] italic"><i>Campus Life</i></span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="text-gray-600 text-base lg:text-lg max-w-7xl mx-auto"
          >
            A glimpse into our classrooms, activities, events, and everyday
            learning moments.
          </motion.p>
        </motion.div>

        {/* Horizontal Scrollable Gallery */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          {images.map((image, index) => {
            // Vary image widths dramatically for visual interest
            const widthClass = 
              index % 4 === 0 ? 'w-78' :      // 224px - medium large
              index % 4 === 1 ? 'w-40' :      // 160px - small
              index % 4 === 2 ? 'w-48' :      // 192px - medium
              'w-32'                           // 128px - very small

            return (
              <motion.div
                key={image.id}
                variants={imageVariants}
                whileHover="hover"
                className={`${widthClass} flex-shrink-0 cursor-pointer group rounded-[20px] overflow-hidden shadow-lg`}
                onClick={() => handleImageClick(image)}
                style={{
                  aspectRatio: `${image.width}/${image.height}`,
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[20px] bg-gray-200">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-[20px]" />

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center rounded-[20px]"
                  >
                    <div className="bg-white bg-opacity-90 px-4 py-2 rounded-full text-sm font-medium text-gray-800">
                      View
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Modal content */}
            <motion.div
              variants={imageModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative flex-1 overflow-hidden rounded-[20px] bg-gray-900">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Image info */}
              <div className="mt-4 text-white text-center">
                <p className="text-sm text-gray-300">
                  {currentIndex + 1} / {images.length}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  {/* Previous */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Next */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CampusGallery