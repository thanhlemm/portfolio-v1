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
const MainTitle = memo(
  ({ isDark, isHovering }: { isDark: boolean; isHovering: boolean }) => (
    <motion.div
      className="space-y-2 flex [@media(min-width:1116px)]:justify-center justify-start mt-25"
      variants={slideInFromLeft}
    >
      <h1 className="text-9xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight font-bbh-hegarty md:mt-50">
        <span className="relative inline-block">
          <span className="absolute -inset-2 bg-linear-to-r from-blue-400 to-blue-500 blur-2xl opacity-20"></span>
          <span className={`relative bg-clip-text `}>
            FR
            <span className="relative inline-block w-[1em] h-[1em] align-middle mx-1">
              <R3fCanvas
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "5em",
                  height: "1.5em",
                }}
              >
                <Suspense fallback={null}>
                  <DonutSphere />
                </Suspense>
              </R3fCanvas>
            </span>
            NTEND {"  "}
            <br className="hidden [@media(max-width:1115px)]:block" />
            DEVEL
            <span className="relative inline-block w-[1em] h-[1em] align-middle mx-1">
              <R3fCanvas
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "1.2em",
                  height: "1.5em",
                }}
              >
                <Suspense fallback={null}>
                  <DonutSphere />
                </Suspense>
              </R3fCanvas>
            </span>
            PER
          </span>
        </span>
        <br />
      </h1>
    </motion.div>
  )
);

const TechStack = memo(
  ({ tech, isDark }: { tech: string; isDark: boolean }) => (
    <motion.div
      className={`px-4 py-2 hidden sm:block rounded-full backdrop-blur-sm border border-blue-400/25 text-lg font-extralight font-bbh-bogle transition-colors bg-transparent`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {tech}
    </motion.div>
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
        <div className="absolute inset-0  opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <div
          className={`relative rounded-xl backdrop-blur-xl p-2 flex items-center justify-center border transition-all duration-300 ${
            isDark
              ? "bg-black/50 border-blue-200/20 group-hover:border-blue-200/50"
              : "bg-white/50 border-blue-300/30 group-hover:border-blue-400/50"
          }`}
        >
          <Icon className={`w-5 h-5 transition-colors `} />
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
      className="min-h-screen overflow-hidden px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%]"
      id="Home"
      initial={{ opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:h-screen md:justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-20 md:items-start">
          {/* Left Column */}
          <motion.div
            className="w-full md:max-w-11/12 absolute md:static inset-0 md:inset-auto space-y-4 sm:space-y-6 md:space-y-8 text-left order-1 flex flex-col justify-center md:justify-start z-10 md:z-auto px-[5%] md:px-0"
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
              <MainTitle isDark={isDark} isHovering={isHovering} />

              {/* Typing Effect */}
              <motion.div
                className="h-8 flex [@media(min-width:1116px)]:justify-center justify-start"
                variants={slideInFromLeft}
              >
                <span
                  className={`text-xl md:text-2xl font-light font-bbh-bogle `}
                >
                  {text}
                </span>
                <motion.span
                  className="w-0.75 h-6 bg-linear-to-t from-blue-400 to-blue-500 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                className="flex flex-wrap [@media(min-width:1116px)]:justify-center gap-3 justify-start mt-20"
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

              {/* Social Links */}
              <motion.div
                className="flex flex-row gap-4 mt-15 w-full justify-start [@media(min-width:1116px)]:justify-center"
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
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Home);
