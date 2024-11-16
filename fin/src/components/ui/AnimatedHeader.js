"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const AnimatedHeader = () => {
  const [hovered, setHovered] = useState(false);

  const finVariants = {
    initial: { opacity: 1 },
    hover: {
      x: [0, -20, 20], // Move letters left and right before fading out
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const fundsVariants = {
    initial: { opacity: 0, y: -20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8, // Start after "F.I.N" fades out
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <header
      className="font-vcr absolute top-4 left-4 text-4xl font-extrabold tracking-widest text-white cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ zIndex: 2 }}
    >
      <motion.div className="relative">
        {/* Render "F.I.N" */}
        <motion.div
          className="flex space-x-2"
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          variants={finVariants}
        >
          {["F", "I", "N"].map((letter, index) => (
            <motion.span key={index}>{letter}.</motion.span>
          ))}
        </motion.div>

        {/* Render "Funds In Need" */}
        <motion.div
          className="absolute top-0 left-0 z-10 text-white"
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          variants={fundsVariants}
        >
          <motion.span className="block">Funds</motion.span>
          <motion.span className="block">In</motion.span>
          <motion.span className="block">Need</motion.span>
        </motion.div>
      </motion.div>
    </header>
  );
};
