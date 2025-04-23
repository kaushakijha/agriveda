import React from "react";
import { motion } from "framer-motion";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";
import { FaArrowDown } from "react-icons/fa";

function Hero() {
  const [src, { blur }] = useProgressiveImg(
    "/images/home-banner/home-compressed.webp",
    "/images/home-banner/home.webp"
  );

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById("categories-section");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative overflow-hidden lg:flex h-[30vh] sm:h-[30vh] lg:h-screen lg:items-center">
        <div className="z-10 absolute mx-auto max-w-screen-xl lg:px-24 px-4 sm:px-6 top-[50%] -translate-y-[50%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-center sm:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold md:text-6xl lg:text-7xl"
            >
              AGRI
              <strong className="font-bold text-rose-700">VEDA</strong>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 max-w-lg text-lg sm:text-xl sm:leading-relaxed text-gray-700"
            >
              Connecting Farmers and Consumers - Bringing Fresh Produce to Your
              Doorstep!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={scrollToCategories}
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Categories
                <FaArrowDown className="ml-2" />
              </button>
            </motion.div>
          </motion.div>
        </div>
        <div
          className="relative w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.25)), url(${src})`,
            filter: blur ? "blur(20px)" : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </section>
    </>
  );
}

export default Hero;
