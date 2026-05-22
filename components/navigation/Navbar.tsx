"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { ModeToggle } from "@/components/toggle/modeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const mounted = useMounted();

  const navItems = React.useMemo(
    () => [
    { href: "#Home", label: "Home" },
    { href: "#Experience", label: "Experience" },
    { href: "#Projects", label: "Projects" },
    { href: "#Contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href) as HTMLElement | null;
          if (!section) return null;

          return {
            id: item.href.replace("#", ""),
            offset: section.offsetTop - 550,
            height: section.offsetHeight,
          };
        })
        .filter((v): v is { id: string; offset: number; height: number } => Boolean(v));

      const currentPosition = window.scrollY;

      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) setActiveSection(active.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href) as HTMLElement;
    if (section) {
      const top = section.offsetTop - 100;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const navActiveClass = mounted
    ? isDark
      ? "bg-pink-300/95 text-black"
      : "bg-black/90 text-white"
    : "bg-black/90 text-white";

  const navInactiveClass = mounted
    ? isDark
      ? "text-pink-200/90 hover:text-pink-100"
      : "text-gray-600 hover:text-gray-900"
    : "text-gray-600 hover:text-gray-900";

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-white/30 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      {/* Outer navbar wrapper */}
      <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
        {/* compact row */}
        <div className="relative flex items-center justify-between h-14">
          {/* Left: Logo */}
          <div className="shrink-0 min-w-fit">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className="text-xl font-bbh-hegarty"
            >
              LEM
            </a>
          </div>

          {/* Center: floating rounded navigation */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center">
            <div
              className={
                "flex items-center rounded-2xl px-2 py-2 backdrop-blur-xl border shadow-[0_10px_30px_rgba(0,0,0,0.08)] " +
                (mounted && isDark
                  ? "bg-black/35 border-white/10"
                  : "bg-white/60 border-black/10")
              }
              role="navigation"
              aria-label="Primary"
            >
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={
                        "relative z-10 px-3 py-2 rounded-xl text-sm font-bbh-hegarty transition-colors duration-300 " +
                        (isActive
                          ? navActiveClass
                          : "bg-transparent " + navInactiveClass)
                      }
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Theme toggle (inside navbar) */}
          <div className="shrink-0">
            <div className="hidden md:block">
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 ${
                  isDark && mounted ? "text-pink-300" : "text-black"
                } transition-transform duration-300 ease-in-out transform ${
                  isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                }`}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ease font-bbh-hegarty ${
                  isActive
                    ? navActiveClass
                    : "bg-transparent " + (mounted && isDark
                        ? "text-pink-200/90 hover:text-pink-100"
                        : "text-gray-600 hover:text-gray-900")
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isOpen ? "translateX(0)" : "translateX(50px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            );
          })}

          {/* Ensure theme toggle is always present on mobile too */}
          <div className="pt-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
