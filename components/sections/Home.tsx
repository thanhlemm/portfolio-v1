"use client";
import { useState, useEffect, useCallback, memo, Suspense } from "react";
import { Mail, ExternalLink } from "lucide-react";
import { Easing, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ERASING_SPEED,
  PAUSE_DURATION,
  SOCIAL_LINKS,
  TECH_STACK,
  TYPING_SPEED,
  WORDS,
} from "@/constants/for-home-page";
import { Canvas as R3fCanvas } from "@react-three/fiber";
import DonutSphere from "../three/DonutSphere";

// Animation variants
const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as Easing },
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

const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as Easing },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as Easing },
  },
};

// Memoized Components
const MainTitle = memo(({ isDark }: { isDark: boolean }) => (
  <motion.div className="space-y-2" variants={slideInFromLeft}>
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-linear-to-r from-blue-400 to-blue-500 blur-2xl opacity-20"></span>
        <span
          className={`relative bg-clip-text text-transparent bg-linear-to-r ${
            isDark
              ? "from-white via-blue-100 to-blue-200"
              : "from-blue-600 via-blue-700 to-blue-800"
          }`}
        >
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-linear-to-r from-blue-400 to-blue-500 blur-2xl opacity-20"></span>
        <span className="relative bg-linear-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </motion.div>
));

const TechStack = memo(
  ({ tech, isDark }: { tech: string; isDark: boolean }) => (
    <motion.div
      className={`px-4 py-2 hidden sm:block rounded-full backdrop-blur-sm border text-sm font-semibold transition-colors ${
        isDark
          ? "bg-blue-200/5 border-blue-200/20 text-blue-200 hover:bg-blue-200/10"
          : "bg-blue-100/30 border-blue-300/40 text-blue-700 hover:bg-blue-100/50"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {tech}
    </motion.div>
  )
);

const CTAButton = memo(
  ({
    href,
    text,
    icon: Icon,
    isDark,
  }: {
    href: string;
    text: string;
    icon: any;
    isDark: boolean;
  }) => (
    <a href={href}>
      <motion.button
        className="group relative w-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400 to-blue-500 rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
        <div
          className={`relative h-11 backdrop-blur-xl rounded-lg border leading-none overflow-hidden ${
            isDark
              ? "bg-[#030014] border-blue-200/20"
              : "bg-white border-blue-300/30"
          }`}
        >
          <div
            className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${
              isDark
                ? "bg-linear-to-r from-blue-400/20 to-blue-500/20"
                : "bg-linear-to-r from-blue-400/10 to-blue-500/10"
            }`}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
            <span
              className={`bg-clip-text text-transparent font-medium z-10 ${
                isDark
                  ? "bg-linear-to-r from-blue-200 to-blue-100"
                  : "bg-linear-to-r from-blue-600 to-blue-700"
              }`}
            >
              {text}
            </span>
            <Icon
              className={`w-4 h-4 ${
                isDark ? "text-blue-200" : "text-blue-600"
              } ${
                text === "Contact"
                  ? "group-hover:translate-x-1"
                  : "group-hover:rotate-45"
              } transform transition-all duration-300 z-10`}
            />
          </span>
        </div>
      </motion.button>
    </a>
  )
);

const SocialLink = memo(
  ({
    icon: Icon,
    link,
    isDark,
  }: {
    icon: any;
    link: string;
    isDark: boolean;
  }) => (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <motion.button
        className="group relative p-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <div
          className={`relative rounded-xl backdrop-blur-xl p-2 flex items-center justify-center border transition-all duration-300 ${
            isDark
              ? "bg-black/50 border-blue-200/20 group-hover:border-blue-200/50"
              : "bg-white/50 border-blue-300/30 group-hover:border-blue-400/50"
          }`}
        >
          <Icon
            className={`w-5 h-5 transition-colors ${
              isDark
                ? "text-blue-200 group-hover:text-blue-100"
                : "text-blue-600 group-hover:text-blue-700"
            }`}
          />
        </div>
      </motion.button>
    </a>
  )
);

const Home = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.div
      className="min-h-screen dark:bg-[#030014] bg-white overflow-hidden px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%]"
      id="Home"
      initial={{ opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:h-screen md:justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-20">
          {/* Left Column */}
          <motion.div
            className="w-full md:w-1/2 absolute md:static inset-0 md:inset-auto space-y-4 sm:space-y-6 md:space-y-8 text-left order-1 flex flex-col justify-center md:justify-start z-10 md:z-auto px-[5%] md:px-0"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="space-y-3 sm:space-y-4 md:space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Title */}
              <MainTitle isDark={isDark} />

              {/* Typing Effect */}
              <motion.div
                className="h-8 flex items-center"
                variants={slideInFromLeft}
              >
                <span
                  className={`text-xl md:text-2xl bg-clip-text text-transparent font-light ${
                    isDark
                      ? "bg-linear-to-r from-blue-100 to-blue-200"
                      : "bg-linear-to-r from-blue-500 to-blue-600"
                  }`}
                >
                  {text}
                </span>
                <motion.span
                  className="w-[3px] h-6 bg-linear-to-t from-blue-400 to-blue-500 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                className={`text-base md:text-lg max-w-xl leading-relaxed font-light ${
                  isDark ? "text-blue-300/70" : "text-blue-700/80"
                }`}
                variants={slideInFromLeft}
              >
                Creating an Innovative, Functional, and User-Friendly Website.
              </motion.p>

              {/* Tech Stack */}
              <motion.div
                className="flex flex-wrap gap-3 justify-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {TECH_STACK.map((tech, index) => (
                  <motion.div key={index} variants={slideInFromLeft}>
                    <TechStack tech={tech} isDark={isDark} />
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-row gap-3 w-full justify-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={slideInFromLeft}>
                  <CTAButton
                    href="#Projects"
                    text="Projects"
                    icon={ExternalLink}
                    isDark={isDark}
                  />
                </motion.div>
                <motion.div variants={slideInFromLeft}>
                  <CTAButton
                    href="#Contact"
                    text="Contact"
                    icon={Mail}
                    isDark={isDark}
                  />
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex flex-row gap-4 w-full justify-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.div key={index} variants={slideInFromLeft}>
                    <SocialLink {...social} isDark={isDark} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Animation */}
          <motion.div
            className="w-full py-[75%] sm:py-[8%] md:py-0 lg:w-1/2 h-auto md:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-6 sm:mt-8 md:mt-0 lg:mt-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <R3fCanvas
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
              }}
            >
              <Suspense fallback={null}>
                <DonutSphere />
              </Suspense>
            </R3fCanvas>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Home);
