"use client";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CONTACT_SOCIALS } from "@/constants/for-contact-page";
import { Github, Linkedin, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as any },
  },
};

const SocialIcon = ({ label }: { label: string }) => {
  if (label.toLowerCase().includes("github")) return <Github className="w-4 h-4" />;
  if (label.toLowerCase().includes("linked")) return <Linkedin className="w-4 h-4" />;
  return <Mail className="w-4 h-4" />;
};

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="Contact" className="px-[5%] sm:px-[5%] md:px-[7%] lg:px-[10%] py-20">
      <div className="container mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold font-bbh-hegarty tracking-tight">
            Let’s build something premium
          </h2>
          <p className={`mt-4 text-base font-mono ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Minimal form. Smooth focus states. Fast response.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`rounded-2xl border backdrop-blur-md p-6 shadow-lg ${
                isDark ? "bg-black/10 border-blue-200/20" : "bg-white/30 border-blue-300/30"
              }`}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`text-sm font-mono ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Name
                  </label>
                  <motion.input
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    whileFocus={{ boxShadow: "0 0 0 6px rgba(59,130,246,0.15)" }}
                    className={`w-full rounded-full border px-5 py-3 bg-transparent outline-none transition-all font-mono ${
                      isDark
                        ? "border-blue-200/20 focus:border-blue-400/60 text-gray-100"
                        : "border-blue-300/30 focus:border-blue-400/60 text-gray-900"
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-mono ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Email
                  </label>
                  <motion.input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    whileFocus={{ boxShadow: "0 0 0 6px rgba(59,130,246,0.15)" }}
                    className={`w-full rounded-full border px-5 py-3 bg-transparent outline-none transition-all font-mono ${
                      isDark
                        ? "border-blue-200/20 focus:border-blue-400/60 text-gray-100"
                        : "border-blue-300/30 focus:border-blue-400/60 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className={`text-sm font-mono ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Message
                </label>
                <motion.textarea
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  whileFocus={{ boxShadow: "0 0 0 6px rgba(59,130,246,0.15)" }}
                  rows={5}
                  className={`w-full rounded-2xl border px-5 py-3 bg-transparent outline-none transition-all font-mono resize-none ${
                    isDark
                      ? "border-blue-200/20 focus:border-blue-400/60 text-gray-100"
                      : "border-blue-300/30 focus:border-blue-400/60 text-gray-900"
                  }`}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border backdrop-blur-sm text-sm font-mono transition-all ${
                    isDark
                      ? "bg-blue-500/10 border-blue-200/20 hover:border-blue-400/60"
                      : "bg-blue-500/10 border-blue-400/30 hover:border-blue-400/70"
                  }`}
                >
                  Send message
                </motion.button>
              </div>
            </motion.form>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-6">
              <div
                className={`rounded-2xl border backdrop-blur-md p-6 shadow-lg ${
                  isDark ? "bg-black/10 border-blue-200/20" : "bg-white/30 border-blue-300/30"
                }`}
              >
                <h3 className="text-lg font-bold font-bbh-hegarty">Social</h3>
                <div className="mt-4 flex flex-col gap-3">
                  {CONTACT_SOCIALS.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 6 }}
                      className={`inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all font-mono ${
                        isDark
                          ? "bg-black/20 border-blue-200/20 hover:border-blue-400/60"
                          : "bg-white/30 border-blue-300/30 hover:border-blue-400/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <SocialIcon label={s.label} />
                        {s.label}
                      </span>
                      <span className={`text-sm opacity-70 ${isDark ? "text-blue-200" : "text-blue-700"}`}>
                        Open
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`text-base font-mono leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Prefer email? Send a short note and I’ll reply with next steps.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);

