import React from 'react'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import { Cpu, GraduationCap, House, BookOpen, Trophy, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'

interface Program {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

interface ProgramsProps {
  programs?: Program[]
}

const defaultPrograms: Program[] = [
  {
    id: 1,
    title: 'Creche & KG',
    description: 'Early learning, big dreams — a joyful space where young learners play, explore and grow.',
    icon: House,
  },
  {
    id: 2,
    title: 'Nursery & Primary',
    description: 'Strong foundations through creative discovery, technology and hands-on experiences.',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'High School',
    description: 'Preparing for life after school with academic excellence and real-world skills.',
    icon: GraduationCap,
  },
  {
    id: 4,
    title: 'Digital Learning',
    description: 'Coding, robotics, AI and cybersecurity — creators of technology, not just users.',
    icon: Cpu,
  },
  {
    id: 5,
    title: 'Extra-Curricular',
    description: 'Sports, arts, clubs and competitions where students discover talents and build community.',
    icon: Trophy,
  },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const Programs: React.FC<ProgramsProps> = ({ programs = defaultPrograms }) => (
  <MotionConfig reducedMotion="user">
    <section className="bg-cream py-5">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          title="Our"
          highlight="Programs"
          subtitle="Discover our comprehensive educational programs designed to nurture every aspect of student development."
        />

        {/* Flex + wrap so an odd last card sits centred instead of hanging left */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-5 lg:mt-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {programs.map(({ id, title, description, icon: Icon }) => (
            <motion.article
              key={id}
              variants={card}
              whileHover={{ y: -6 }}
              className="flex basis-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(20%-1rem)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-gray-600">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  </MotionConfig>
)

export default Programs