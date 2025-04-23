import React from "react";
import { motion } from "framer-motion";
import Category from "./Category";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import Heading from "../../components/heading/Heading";
import { FaLeaf, FaTruck, FaHandshake } from "react-icons/fa";

function Home() {
  const features = [
    {
      icon: <FaLeaf className="text-4xl text-green-600" />,
      title: "Fresh Produce",
      description: "Direct from farm to your doorstep",
    },
    {
      icon: <FaTruck className="text-4xl text-blue-600" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery service",
    },
    {
      icon: <FaHandshake className="text-4xl text-amber-600" />,
      title: "Fair Trade",
      description: "Supporting local farmers directly",
    },
  ];

  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto w-11/12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories-section" className="py-12">
        <div className="mx-auto w-11/12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              text="Explore Categories"
              marginY="my-6 md:my-8"
              textAlign="text-center"
            />
            <Category />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home;
