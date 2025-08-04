import React from 'react';
import { motion } from 'framer-motion';
import SVG from '../../assets/images/SVG.png'// Put an image here

const Welcome = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[80vh] gap-10 px-6 text-center">
      {/* Animation for text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-semibold text-blue-600"
      >
        Welcome to the Admin Dashboard!
      </motion.div>

      {/* Animated image */}
      <motion.img
        src={SVG}
        alt="Admin Dashboard Illustration"
        className="w-[300px] md:w-[400px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </div>
  );
};

export default Welcome;
