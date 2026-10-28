import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import type { Variants } from "framer-motion";

import FeatureCard from "./FeatureCard";

type FeatureIcon =
  | "calculator"
  | "laptop"
  | "atom"
  | "palette"
  | "music"
  | "bus"
  | "users"
  | "heart"
  | "car";


interface Feature {
  icon: FeatureIcon;
  title: string;
}

const features: Feature[] = [
  {
    icon: "calculator",
    title: "Abacus & Finger Mathematics",
  },
  {
    icon: "laptop",
    title: "ICT & Hybrid Learning",
  },
  {
    icon: "atom",
    title: "Science & Innovation",
  },
  {
    icon: "palette",
    title: "Arts, Crafts & Culture",
  },
  {
    icon: "music",
    title: "Musical Instrument Training",
  },
  {
    icon: "bus",
    title: "Excursions & Exposure Tours",
  },
  {
    icon: "users",
    title: "Community Service",
  },
  {
    icon: "heart",
    title: "Moral & Spiritual Training",
  },
  {
    icon: "car",
    title: "Automotive",
  },
];

const admission: string[] = [
  "Creche",
  "KG Classes",
  "Nursery Classes",
  "Basic Classes",
  "JSS 1 - JSS 3",
  "SS 1 - SS 3",
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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function WhyChoose() {
  return (
    <section className="relative bg-cream py-16 overflow-hidden">
      {/* Decorative Background */}

      <div className="absolute right-0 top-0 w-[500px] h-full bg-gray-50 rotate-12 opacity-50" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-[#202020] mb-10"
        >
          Why Choose Zoe Schools?
        </motion.h2>

        {/* FEATURES */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <FeatureCard
                icon={item.icon}
                title={item.title}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* LOWER SECTION */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 items-start">
          {/* EXAM DETAILS */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-2">
              Entrance Exam Details
            </h3>

            <p className="text-sm font-bold text-gray-400 mb-3">
              For Onsite Exam
            </p>

            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="grid grid-cols-3 bg-gray-50 rounded-md px-3 py-2 text-sm"
              >
                <span>Saturday</span>
                <span>June 13th, 2026</span>
                <span className="text-right">9:00 AM</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="grid grid-cols-3 bg-gray-50 rounded-md px-3 py-2 text-sm"
              >
                <span>Saturday</span>
                <span>July 4th, 2026</span>
                <span className="text-right">9:00 AM</span>
              </motion.div>
            </div>

            <p className="text-sm font-bold text-gray-400 mt-5 mb-3">
              For Virtual Exam
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border border-red-100 rounded-md bg-gray-50 px-3 py-3 grid grid-cols-3 text-sm"
            >
              <span>Anyday</span>

              <span>
                From June 20th
                <br />
                - Sept 27th, 2026
              </span>

              <span className="text-right">Anytime</span>
            </motion.div>

            <h3 className="text-2xl font-bold mt-6 mb-4">
              Available as:
            </h3>

            <div className="flex gap-4">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  borderColor: "#00563f",
                }}
                whileTap={{ scale: 0.98 }}
                className="border border-gray-200 rounded-full px-6 py-3 text-sm w-full"
              >
                Day School
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  borderColor: "#00563f",
                }}
                whileTap={{ scale: 0.98 }}
                className="border border-gray-200 rounded-full px-6 py-3 text-sm w-full"
              >
                Boarding School
              </motion.button>
            </div>
          </motion.div>

          {/* ADMISSION CARD */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-md p-8 w-full max-full"
          >
            <h3 className="text-2xl font-bold mb-6">
              Admission Into:
            </h3>

            <div className="space-y-4">
              {admission.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <CircleCheckBig
                    size={18}
                    className="text-[#b40000]"
                  />

                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}