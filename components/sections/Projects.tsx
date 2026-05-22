"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { PROJECTS } from "@/constants/for-projects-page";
import { Github, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
} as const;



const Projects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="Projects" className="px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%] py-20">
      <div className="container mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold font-bbh-hegarty tracking-tight">
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {PROJECTS.map((p, idx) => {
            // Editorial/bento layout (index-driven) to prevent squeezed cards.
            // 0 = featured primary, 1 = featured secondary, 2..3 = secondary.
            const spanClass = (() => {
              switch (idx) {
                case 0:
                  return "md:col-span-8";
                case 1:
                  return "md:col-span-4";
                case 2:
                  return "md:col-span-5";
                case 3:
                  return "md:col-span-7";
                default:
                  return "md:col-span-6";
              }
            })();

            const rowSpanClass = (() => {
              switch (idx) {
                case 0:
                  return "md:row-span-2";
                case 1:
                  return "md:row-span-1";
                case 2:
                  return "md:row-span-1";
                case 3:
                  return "md:row-span-1";
                default:
                  return "md:row-span-1";
              }
            })();



            return (
              <motion.article
                key={`${p.title}-${idx}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`${spanClass} ${rowSpanClass} rounded-2xl border backdrop-blur-md overflow-hidden shadow-lg transition-all duration-300 ${
                  isDark
                    ? "bg-black/10 border-blue-200/20 hover:border-blue-400/50"
                    : "bg-white/30 border-blue-300/30 hover:border-blue-400/60"
                }`}
                whileHover={{ y: -6 }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Image
                      src={p.thumbnailSrc}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                  </motion.div>
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                        : "bg-gradient-to-t from-white/70 via-white/30 to-transparent"
                    }`}
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold font-bbh-hegarty">{p.title}</h3>
                      <p className={`mt-2 text-base font-mono ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className={`px-3 py-1 rounded-full border text-sm font-mono ${
                          isDark
                            ? "bg-black/20 border-blue-200/20 hover:border-blue-400/50"
                            : "bg-white/30 border-blue-300/30 hover:border-blue-400/60"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <motion.a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm text-sm font-mono transition-colors ${
                        isDark
                          ? "bg-blue-500/10 border-blue-200/20 hover:border-blue-400/60"
                          : "bg-blue-500/10 border-blue-400/30 hover:border-blue-400/70"
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </motion.a>
                    <motion.a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm text-sm font-mono transition-colors ${
                        isDark
                          ? "bg-black/20 border-blue-200/20 hover:border-blue-400/60"
                          : "bg-white/30 border-blue-300/30 hover:border-blue-400/60"
                      }`}
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);

