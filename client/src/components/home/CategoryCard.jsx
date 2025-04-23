import React from "react";
import { motion } from "framer-motion";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";

function CategoryCard(props) {
  const [src, { blur }] = useProgressiveImg(props.compressedImg, props.image);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-xl bg-cover bg-no-repeat shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={src}
        loading="lazy"
        className={`w-full h-32 md:h-48 lg:h-56 object-cover transition-transform duration-500 hover:scale-110 ${
          blur ? "blur" : "blur-none"
        }`}
        alt={props.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <motion.h5
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl font-semibold text-white"
          >
            {props.title}
          </motion.h5>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default CategoryCard;
