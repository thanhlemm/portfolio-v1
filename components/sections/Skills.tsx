"use client";
import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { SKILLS_GROUPS } from "@/constants/for-skills-page";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as any },
  },
};

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeCategory, setActiveCategory] = useState(SKILLS_GROUPS[0]?.title ?? "");

  const activeTags = useMemo(() => {
    return SKILLS_GROUPS.find((g) => g.title === activeCategory)?.tags ?? [];
  }, [activeCategory]);

  const progressPct = Math.min(100, 35 + activeTags.length * 8);

  return (
    <section id="Skills" className="px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%] py-20">
      <div className="container mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold font-bbh-hegarty tracking-tight">
            Skills
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div
              className={`rounded-2xl border backdrop-blur-md p-6 shadow-lg ${
                isDark ? "bg-black/10 border-blue-200/20" : "bg-white/30 border-blue-300/30"
              }`}
            >
              <h3 className="text-lg font-bold font-bbh-hegarty">Categories</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {SKILLS_GROUPS.map((g) => {
                  const active = g.title === activeCategory;
                  return (
                    <motion.button
                      key={g.title}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveCategory(g.title)}
                      className={`px-4 py-2 rounded-full border text-sm font-mono transition-colors ${
                        active
                          ? isDark
                            ? "bg-blue-400/15 border-blue-400/60"
                            : "bg-blue-500/15 border-blue-400/60"
                          : isDark
                          ? "bg-black/20 border-blue-200/20 hover:border-blue-400/50"
                          : "bg-white/30 border-blue-300/30 hover:border-blue-400/60"
                      }`}
                    >
                      {g.title}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-8 space-y-2">
                <div className="flex items-center justify-between text-sm font-mono opacity-70">
                  <span>Level</span>
                  <span>{progressPct}%</span>
                </div>
                <div
                  className={`h-2 rounded-full overflow-hidden ${
                    isDark ? "bg-blue-200/10" : "bg-blue-400/10"
                  }`}
                >
                  <motion.div
                    className={`h-full ${isDark ? "bg-blue-400" : "bg-blue-500"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border backdrop-blur-md p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold font-bbh-hegarty">{activeCategory}</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {activeTags.map((t) => (
                  <motion.span
                    key={t.label}
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-full border text-sm font-mono cursor-default transition-all duration-300 ${
                      isDark
                        ? "bg-black/20 border-blue-200/20 hover:border-blue-400/60 shadow-[0_0_22px_rgba(59,130,246,0.18)]"
                        : "bg-white/30 border-blue-300/30 hover:border-blue-400/60 shadow-[0_0_22px_rgba(59,130,246,0.12)]"
                    }`}
                  >
                    {t.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);

