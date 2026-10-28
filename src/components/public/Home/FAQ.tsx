import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Variants } from 'framer-motion'

interface FAQItem {
  id: number
  question: string
  answer: string | string[]
}

interface FAQProps {
  faqs?: FAQItem[]
}

export const FAQ: React.FC<FAQProps> = ({
  faqs = [
    {
      id: 1,
      question: 'What are the entry requirements?',
      answer: [
        'Completed application form (available online)',
        'Birth certificate (original or certified copy)',
        'Parental/Guardian information',
        'In some cases, entrance assessment results (for higher classes)',
      ],
    },
    {
      id: 2,
      question: 'Is there an entrance examination?',
      answer:
        'Entrance examinations may be required for higher classes. Please check our admission requirements page for specific details based on the class level.',
    },
    {
      id: 3,
      question: 'How long does it take to get an admission decision?',
      answer:
        'Typically, admission decisions are made within 2-3 weeks of submitting a complete application. You will be notified via email or phone call.',
    },
    {
      id: 4,
      question: 'Can my child join mid-term?',
      answer:
        'Yes, mid-term admissions are possible subject to availability and academic readiness. Please contact our admissions office to discuss your specific situation.',
    },
    {
      id: 5,
      question: 'Are there extracurricular activities?',
      answer:
        'Yes! We offer a wide range of extracurricular activities including sports, arts, music, robotics, coding clubs, and community service programs.',
    },
  ],
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(1)

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

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const chevronVariants:Variants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 },
  }

  const answerVariants:Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="relative  py-12  bg-cream rounded-[20px] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Section */}
          <motion.div
            className="flex flex-col flex-start  justify-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
              {/* FAQ Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center bg-white gap-2 w-fit px-4 py-2 rounded-full border-2 border-gray-300 mb-8"
            >
              <span className="text-lg">❉</span>
              <span className="text-sm font-medium text-gray-800">FAQ</span>
            </motion.div>
            {/* Heading */}

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                Frequently Asked{' '}
                <span className="text-[#02BB22]">Questions?</span>
              </h2>
            </motion.div>

            {/* Contact CTA */}
            <motion.div variants={itemVariants} className="mb-4 p-6 w-full md:w-80 bg-white rounded-[20px]">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Still have a question?
              </h3>
              <p className="text-gray-600  text-sm lg:text-base mb-6">
                Can't find the answer to your question? Send us an email and
                we'll get back to you as soon as possible!
              </p>
            </motion.div>

            {/* Email Input */}
            {/* <motion.div variants={itemVariants} className="flex gap-2">
              <input
                type="text"
                placeholder="Type Question?"
                className="flex-1 px-4 py-3 rounded-full border-2 border-gray-300 focus:border-[#02BB22] focus:outline-none text-sm transition-colors duration-200"
              />
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-[#451F17] text-white hover:bg-opacity-90 transition-all duration-200">
                <Send className="w-5 h-5" />
              </button>
            </motion.div> */}
          </motion.div>

          {/* Right Side - FAQ Accordion */}
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
          
            {/* Accordion Items */}
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="bg-white rounded-[15px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      variants={chevronVariants}
                      animate={expandedId === faq.id ? 'expanded' : 'collapsed'}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-[#02BB22]" />
                    </motion.div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence>
                    {expandedId === faq.id && (
                      <motion.div
                        variants={answerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="px-6 py-4 text-gray-600 text-sm lg:text-base leading-relaxed">
                          {Array.isArray(faq.answer) ? (
                            <ul className="space-y-2">
                              {faq.answer.map((item, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="text-[#02BB22] font-bold flex-shrink-0">
                                    •
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{faq.answer}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQ