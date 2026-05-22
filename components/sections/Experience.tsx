"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { EXPERIENCE_ITEMS } from "@/constants/for-experience-page";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as any },
  },
};

const Experience = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="Experience" className="px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%] py-20">
      <div className="container mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold font-bbh-hegarty tracking-tight">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className={`absolute left-4 sm:left-6 top-2 bottom-2 w-px ${
              isDark ? "bg-blue-200/30" : "bg-blue-400/30"
            }`}
          />

          <div className="space-y-8">
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <motion.article
                key={`${item.company}-${idx}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
                className="relative pl-12 sm:pl-14"
              >
                <div
                  className={`absolute -left-2 top-6 w-3 h-3 rounded-full ${
                    isDark ? "bg-blue-400" : "bg-blue-500"
                  } shadow-[0_0_22px_rgba(59,130,246,0.45)]`}
                />

                <div
                  className={`rounded-2xl border backdrop-blur-md p-6 shadow-lg transition-all duration-300 ${
                    isDark
                      ? "bg-black/10 border-blue-200/20 hover:border-blue-400/50"
                      : "bg-white/30 border-blue-300/30 hover:border-blue-400/60"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold font-bbh-hegarty">{item.company}</h3>
                      <p className="text-base font-mono text-gray-500 dark:text-gray-300">{item.role}</p>
                    </div>
                    <p className="text-sm font-mono opacity-70">{item.duration}</p>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-base leading-relaxed font-mono">
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Experience);

