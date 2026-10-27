import { motion } from "framer-motion";
import {
  Phone,
  // Facebook,
  ArrowRight,
} from "lucide-react";

interface ContactInfo {
  phones: string[];
}

const contactInfo: ContactInfo = {
  phones: [
    "07032297830",
    "08139716452",
    "07045512602",
    "08169492664",
    "08062480259",
    "08125409123",
  ],
};

export default function FooterCTA(){
  return (
    <>
      {/* CTA SECTION */}

      <section className="relative overflow-hidden">
        <div
          className="
          bg-gradient-to-r
          from-[#00563f]
          via-[#004a36]
          to-[#222315]
          "
        >
          <div
            className="
            max-w-7xl
            mx-auto
            px-6
            lg:px-12
            py-14
            "
          >
            <div
              className="
              grid
              grid-cols-1
              lg:grid-cols-2
              items-center
              gap-10
              "
            >
              {/* LEFT */}

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full flex justify-center"
              >
                <div>
                <h2
                  className="
                  text-white
                  text-4xl
                  lg:text-5xl
                  font-bold
                  md:text-left
                  text-center
                  "
                >
                  READY TO BEGIN
                  <br />
                  THE JOURNEY?
                </h2>

                <p
                  className="
                  text-white/80
                  mt-4
                   md:text-left
                  text-center
                  "
                >
                  Admission forms are now available.
                </p>

            <div className="flex justify-center">
          <a target="blank" href="https://zoe.edossier.app/admission/#/signin">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="
                  mt-8
                  bg-white
                  text-[#00563f]
                  px-8
                  py-4
                  cursor-pointer
                  rounded-full
                  font-semibold
                  inline-flex
                  items-center
                  gap-2
                  "
                >
                  Apply For Admission
                  <ArrowRight size={18} />
                </motion.button>
                </a>
            </div>

                </div>
              </motion.div>

              {/* RIGHT */}

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="
                flex
                justify-center
                lg:justify-end
                "
              >
                <motion.img
                  src="/images/other/bag.png"
                  alt="School Bag"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                  w-[260px]
                  lg:w-[320px]
                  "
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        className="
        bg-[#f7f7f7]
        py-14
        
        "
      >
        <div className="mx-auto
        max-w-6xl">
        <div className="flex  justify-center mb-12">
  <motion.img
    whileHover={{ scale: 1.05 }}
    src="/images/other/logo.png"
    alt="Zoe Schools"
    className="w-28"
  />
</div>

<div
  className="
  grid
  grid-cols-1
  lg:grid-cols-3
  gap-10
  items-center
  "
>
  {/* CONTACTS */}
  <div className="flex justify-center  items-start gap-4">
    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
      <Phone size={18} />
    </div>

    <div className="grid grid-cols-2 gap-x-6 text-sm text-gray-700">
      {contactInfo.phones.map((phone) => (
        <span key={phone}>{phone}</span>
      ))}
    </div>
  </div>

  {/* INFO */}
  <p className="text-center text-sm text-gray-600">
    Contact your nearest Zoe Schools branch for enquiries
    and admission information.
  </p>

  {/* SOCIAL */}
  <div className="flex justify-center lg:justify-end">
    <motion.a
      whileHover={{ scale: 1.1 }}
      href="https://www.facebook.com/share/18korrasin/?mibextid=wwXIfr"
      target="blank"
      className="
      w-8
      h-8
      rounded-full
      bg-black
      text-white
      flex
      items-center
      justify-center
      "
    >
     <svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="currentColor"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
    </motion.a>
  </div>
</div>
</div>
      </footer>
    </>
  );
}
