import { motion } from "framer-motion";
import { BookOpen, Laptop, Users } from "lucide-react";

import FloatingCard from "./FloatingCard";
import FeatureItem from "./FeatureItem";
import type { Variants } from "framer-motion";



const features: string[] = [
  "Day & Boarding Facilities",
  "Nursery, Primary & College",
  "ICT & Hybrid Learning",
  "WAEC CBT Preparation",
];

const fadeUp:Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AdmissionHero(){
  return (
    <section className="relative overflow-hidden bg-cream pt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative w-full"
          >
            <img
              src="/images/other/heroCircles.png"
              alt=""
              className="absolute -left-40 top-14 w-[380px] pointer-events-none select-none opacity-70"
            />

            <div className="relative z-10 flex w-full justify-center lg:justify-start">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
    

                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
                >
                  <span className="text-[#17213d]">ADMISSION</span>

                  <br />

                  <span className="text-[#9c0808]">2026/2027</span>

                  <span className="text-[#17213d]"> IS</span>

                  <br />

                  <span className="text-[#17213d]">OPEN!</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 max-w-3xl text-md text-gray-600"
                >
                  Secure Your Child&apos;s Future at Zoe Schools.
                  <br />
                  We don&apos;t just teach, we TRAIN.
                </motion.p>

                  <a target="blank" href="https://zoe.edossier.app/admission/#/signin">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 bg-[#00563f] cursor-pointer text-white rounded-md px-10 py-4 font-medium shadow-lg"
                >
                  APPLY FOR ADMISSION
                </motion.button>
                  </a>

              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-[500px] mx-auto flex justify-center items-center min-h-[420px]"
          >
            <div >            
              
              <img
              src="/images/other/heroCircles.png"
              alt=""
              className="absolute -right-40 -bottom-35 w-[380px] pointer-events-none select-none opacity-70"
            />

            <div className="absolute w-[350px] h-[350px] -left-[20px] rounded-full bg-white border border-emerald-900" />

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-20 w-[350px] h-[350px] bg-[#00563f] rounded-full"
            >
              <img
                src="/images/students/Hero1.png"
                alt="Student"
                className="w-[300px] lg:w-[290px] absolute left-6 object-cover rounded-full"
              />
            </motion.div>

            <div className="absolute left-8 bottom-8 w-[28px] h-[28px] rounded-full bg-[#00563f] z-30" />

            <FloatingCard
              icon={<BookOpen size={18} />}
              text1="Fully Equipped"
              text2="Classroom"
              className="-left-10 top-[45%] z-50"
            />

            <FloatingCard
              icon={<Laptop size={18} />}
              text1="ICT & Hybrid"
              text2="Learning Environment"
              className="right-0 top-5 z-50"
            />

            <FloatingCard
              icon={<Users size={18} />}
              text1="Experienced"
              text2="Teachers & Staff"
              className="right-0 bottom-12 z-50"
            />
            </div>

          </motion.div>
        </div>
      </div>

      {/* FEATURES */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-red-50"
      >
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4 lg:px-12 px-6 max-w-6xl mx-auto">
          {features.map((item: string) => (
            <motion.div key={item} variants={fadeUp}>
              <FeatureItem text={item} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}