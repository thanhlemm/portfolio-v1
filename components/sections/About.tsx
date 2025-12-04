"use client";
import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Code, Zap, Users, Target } from "lucide-react";
import { SKILLS, STATS } from "@/constants/for-about-page";

// Animation variants
const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
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
      staggerChildren: 0.2,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Stats Card Component
const StatsCard = memo(
  ({
    icon: Icon,
    number,
    label,
    isDark,
  }: {
    icon: any;
    number: string;
    label: string;
    isDark: boolean;
  }) => (
    <motion.div
      variants={itemVariants}
      className={`p-6 rounded-2xl backdrop-blur-xl border transition-all ${
        isDark
          ? "bg-blue-500/10 border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-400/50"
          : "bg-blue-100/30 border-blue-300/40 hover:bg-blue-100/50 hover:border-blue-400/50"
      }`}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon
          className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`}
        />
        <span
          className={`text-2xl sm:text-3xl font-bold ${
            isDark ? "text-blue-300" : "text-blue-500"
          }`}
        >
          {number}
        </span>
      </div>
      <p
        className={`text-sm ${
          isDark ? "text-blue-300/70" : "text-blue-700/70"
        }`}
      >
        {label}
      </p>
    </motion.div>
  )
);

// Skills Badge Component
const SkillBadge = memo(
  ({ skill, isDark }: { skill: string; isDark: boolean }) => (
    <motion.div
      variants={itemVariants}
      className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border transition-colors ${
        isDark
          ? "bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
          : "bg-blue-100/40 border-blue-300/40 text-blue-700 hover:bg-blue-100/60"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {skill}
    </motion.div>
  )
);

const About = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section
      id="About"
      className={`min-h-screen  px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%] transition-colors ${
        isDark ? "dark:bg-[#030014]" : "bg-white"
      }`}
    >
      <div className="container mx-auto min-h-screen">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              isDark
                ? "bg-linear-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
                : "bg-linear-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent"
            }`}
          >
            About Me
          </h2>
          <div
            className={`h-1 w-20 rounded-full mx-auto ${
              isDark
                ? "bg-linear-to-r from-blue-400 to-blue-500"
                : "bg-linear-to-r from-blue-500 to-blue-600"
            }`}
          ></div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
          {/* Left Column - About Text */}
          <motion.div
            className="space-y-6"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div
              className={`space-y-4 text-base md:text-lg leading-relaxed ${
                isDark ? "text-blue-300/70" : "text-blue-700/80"
              }`}
            >
              <p>
                Hi! I'm a passionate Frontend Developer with a strong foundation
                in modern web technologies. With expertise in React and Next.js,
                I specialize in creating beautiful, performant, and user-centric
                web applications.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {STATS.map((stat, index) => (
                <StatsCard
                  key={index}
                  icon={stat.icon}
                  number={stat.number}
                  label={stat.label}
                  isDark={isDark}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-8 ${
              isDark ? "text-white" : "text-blue-400"
            }`}
          >
            Skills & Technologies
          </h3>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SKILLS.map((skill, index) => (
              <SkillBadge key={index} skill={skill} isDark={isDark} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(About);
