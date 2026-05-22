"use client";
import { useEffect, useState, memo } from "react";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -90 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 90 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const About = () => {
  const { theme } = useTheme();
  // Avoid setState-in-effect cascading renders; render immediately since About visual is already ssr:false.
  const isDark = theme === "dark";

  const aboutContent = [
    "Full-stack Developer focused on React.js and Next.js applications.",
    "Building scalable, responsive, and user-focused web experiences.",
    "Experienced with TypeScript, Node.js, PostgreSQL, and AWS services.",
  ];

  return (
    <section
      id="About"
      className="px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%] py-20 transition-colors"
    >
      <div className="container mx-auto relative">
        {/* Decorative floating glows (hero-aligned) */}
        <div
          className={`pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-25 ${
            isDark ? "bg-blue-400" : "bg-blue-500"
          }`}
        />
        <div
          className={`pointer-events-none absolute top-24 -right-12 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-blue-400" : "bg-blue-500"
          }`}
        />

        {/* Editorial header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold font-bbh-hegarty tracking-tight">
            About
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ">
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <h3
                className={`text-2xl md:text-3xl font-bold font-bbh-hegarty ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Editorial interfaces with real engineering depth
              </h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {aboutContent.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className={`text-base leading-relaxed font-mono ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);

