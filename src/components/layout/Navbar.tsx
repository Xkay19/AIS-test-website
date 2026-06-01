"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, TreePine, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    href: "#",
    children: [
      { label: "Digital Product Passports", desc: "Regulator-ready DPPs in seconds" },
      { label: "EPD Converter", desc: "AI-powered PDF → live data pipeline" },
      { label: "Compliance Dashboard", desc: "Real-time ESPR 2024 tracking" },
      { label: "API & Integrations", desc: "Connect your existing systems" },
    ],
  },
  {
    label: "Industries",
    href: "#",
    children: [
      { label: "Construction", desc: "Materials passports for the built environment" },
      { label: "Manufacturing", desc: "ESPR compliance at production scale" },
      { label: "Batteries & EV", desc: "EU Battery Regulation 2023/1542" },
      { label: "Building Products", desc: "Facades, insulation, glazing & more" },
    ],
  },
  { label: "Pricing", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-10"
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex items-center justify-between h-16 px-5 md:px-8 rounded-2xl mt-3 transition-all duration-300"
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.12)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          boxShadow: scrolled ? "0 1px 32px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
            <TreePine className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl font-black tracking-tight transition-colors"
            style={{ color: scrolled ? "#18181B" : "white" }}
          >
            Floilan
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                style={{ color: scrolled ? "#3f3f46" : "rgba(255,255,255,0.92)" }}
              >
                {link.label}
                {link.children && (
                  <ChevronDown
                    className="h-3.5 w-3.5 transition-transform"
                    style={{ transform: openMenu === link.label ? "rotate(180deg)" : "rotate(0)" }}
                  />
                )}
              </a>

              {/* Dropdown */}
              <AnimatePresence>
                {link.children && openMenu === link.label && (
                  <motion.div
                    className="absolute top-full left-0 pt-2 w-64"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-2 overflow-hidden">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href="#"
                          className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                        >
                          <span className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                            {child.label}
                          </span>
                          <span className="text-xs text-zinc-400">{child.desc}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-semibold transition-colors px-3 py-2"
            style={{ color: scrolled ? "#3f3f46" : "rgba(255,255,255,0.9)" }}
          >
            Log in
          </a>
          <motion.a
            href="#"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-colors"
            style={{ backgroundColor: scrolled ? "#18181B" : "#18181B" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Demo
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl"
          style={{ color: scrolled ? "#18181B" : "white" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mx-3 mt-1 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-zinc-100 mt-2 pt-3 flex flex-col gap-2">
                <a href="#" className="px-4 py-3 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50">
                  Log in
                </a>
                <a
                  href="#"
                  className="px-4 py-3 rounded-xl text-sm font-bold text-white bg-zinc-900 text-center"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
