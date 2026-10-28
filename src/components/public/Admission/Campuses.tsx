import { motion } from "framer-motion";
import SectionHeading from "@/components/common/SectionHeading";

interface Campus {
  id: number;
  image: string;
  road: string;
  campus: string;
}

const campuses: Campus[] = [
  {
    id: 1,
    image: "/images/facilities/1.jpeg",
    road: "Isale General, Ogbomoso",
    campus: "Citadel Of Peace",
  },
  {
    id: 2,
    image: "/images/facilities/2.jpeg",
    road: "Orogun, Along Iresa Road",
    campus: "Citadel Of Joy",
  },
  {
    id: 3,
    image: "/images/facilities/3.jpg",
    road: "Oke Alapata Road, Ogbomoso",
    campus: "Citadel Of Flourish",
  },
  {
    id: 4,
    image: "/images/facilities/7.jpeg",
    road: "Mooro, Iresa Road",
    campus: "Citadel Of Glory I",
  },
  {
    id: 5,
    image: "/images/facilities/4.jpeg",
    road: "Abba, Ilorin Road",
    campus: "Citadel Of Wisdom",
  },
  {
    id: 6,
    image: "/images/facilities/5.jpg",
    road: "Irewolede Estate, Iresa Rd.",
    campus: "Citadel Of Grace",
  },
  {
    id: 7,
    image: "/images/facilities/6.jpg",
    road: "California Area, Ogbomoso",
    campus: "Citadel Of Praise",
  },
  {
    id: 8,
    image: "/images/facilities/8.jpg",
    road: "Mooro, Iresa Road",
    campus: "Citadel Of Glory II",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Campuses(){
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-14"
        >
                  <SectionHeading align="center" title="Our" highlight="Campuses" />
          

          <p className="text-gray-500 mt-3">
            Discover our vibrant learning environments.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {campuses.map((campus) => (
            <motion.div
              key={campus.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                h-[320px]
                cursor-pointer
                shadow-md
              "
            >
              <motion.img
                src={campus.image}
                alt={campus.campus}
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                "
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.6,
                }}
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/30
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  text-white
                "
              >
                <p
                  className="
                    text-sm
                    text-gray-200
                  "
                >
                  {campus.road}
                </p>

                <h3
                  className="
                    text-lg
                    font-semibold
                    mt-1
                  "
                >
                  {campus.campus}
                </h3>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}