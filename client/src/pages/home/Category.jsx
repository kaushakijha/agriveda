import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "../../components/home/CategoryCard";
import { Link } from "react-router-dom";

const categoryProductData = [
  {
    title: "Rice",
    image: "/images/product-category/rice.webp",
    compressedImg: "/images/product-category/rice-compressed.webp",
  },
  {
    title: "Wheat",
    image: "/images/product-category/wheat.webp",
    compressedImg: "/images/product-category/wheat-compressed.webp",
  },
  {
    title: "Nuts",
    image: "/images/product-category/nuts.webp",
    compressedImg: "/images/product-category/nuts-compressed.webp",
  },
  {
    title: "Sugar",
    image: "/images/product-category/sugar.webp",
    compressedImg: "/images/product-category/sugar-compressed.webp",
  },
  {
    title: "Spices",
    image: "/images/product-category/spices.webp",
    compressedImg: "/images/product-category/spices-compressed.webp",
  },
  {
    title: "Fruits",
    image: "/images/product-category/fruits.webp",
    compressedImg: "/images/product-category/fruits-compressed.webp",
  },
  {
    title: "Vegetables",
    image: "/images/product-category/vegetables.webp",
    compressedImg: "/images/product-category/vegetables-compressed.webp",
  },
  {
    title: "Pulses",
    image: "/images/product-category/pulses.webp",
    compressedImg: "/images/product-category/pulses-compressed.webp",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Category() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {categoryProductData.map((item, index) => (
        <motion.div key={index} variants={item}>
          <Link to={`/category/${item.title.toLowerCase()}`}>
            <CategoryCard
              title={item.title}
              image={item.image}
              compressedImg={item.compressedImg}
            />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Category;
