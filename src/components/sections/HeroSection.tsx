"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/custom-button";

const trustBadges = [
  { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "EU ESPR 2024 Ready" },
  { icon: <Zap className="h-3.5 w-3.5" />, label: "AI-Powered OCR" },
  { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "ISO 14025 Compliant" },
];

const annotations = [
  {
    title: "Structural Steel",
    id: "DPP-SS-001247",
    stat: "68% Recycled · EPD ✓",
    style: { top: "8%", left: "32%" },
    delay: 0.9,
  },
  {
    title: "Aluminum Facade",
    id: "DPP-AF-000581",
    stat: "75% Recycled · EPD ✓",
    style: { top: "14%", right: "2%" },
    delay: 1.05,
  },
  {
    title: "HVAC System",
    id: "DPP-HV-000772",
    stat: "Optimised Energy · EPD ✓",
    style: { top: "45%", right: "2%" },
    delay: 1.15,
  },
  {
    title: "Timber Flooring",
    id: "DPP-TF-001009",
    stat: "100% FSC · EPD ✓",
    style: { bottom: "10%", right: "3%" },
    delay: 1.25,
  },
  {
    title: "Carbon Summary",
    id: "6,712 t CO₂e",
    stat: "↓ 28% vs Industry Avg",
    style: { bottom: "8%", left: "2%" },
    delay: 1.2,
    highlight: true,
  },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center py-20 lg:py-0 overflow-hidden bg-white"
      aria-label="Hero — Floilan Digital Product Passport Platform"
    >
      {/* Subtle dot-grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
        }}
      />
      {/* Soft radial gradient fade */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236,253,245,0.6) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 xl:gap-20 items-center">

          {/* ── Left: Content ── */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AI-Powered Digital Product Passports
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[clamp(2.75rem,5vw,5rem)] font-extrabold tracking-tight text-zinc-900 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            >
              Every Building Product.{" "}
              <span className="text-emerald-500">One Digital Passport.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              Centralize product data, automate compliance, and unlock
              sustainability insights across the building lifecycle.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              <CustomButton
                variant="primary"
                size="lg"
                href="#cta"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Book a Demo
              </CustomButton>
              <CustomButton variant="secondary" size="lg" href="#features">
                Explore Platform
              </CustomButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-2 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              {trustBadges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-xs font-medium text-zinc-600"
                >
                  <span className="text-emerald-500">{b.icon}</span>
                  {b.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual ── */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Main image card */}
            <div className="relative rounded-[20px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.12)] ring-1 ring-zinc-200">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&fit=crop"
                alt="Modern commercial building with Digital Product Passport overlays showing structural steel, facade panels, HVAC systems, and timber flooring data"
                width={1200}
                height={750}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Subtle dark overlay for contrast */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
              />

              {/* DPP Annotation overlays */}
              {annotations.map((a) => (
                <motion.div
                  key={a.id}
                  className={`absolute rounded-xl shadow-lg border p-2.5 w-[152px] ${
                    a.highlight
                      ? "bg-zinc-900 border-zinc-700"
                      : "bg-white/96 border-zinc-100 backdrop-blur-sm"
                  }`}
                  style={a.style}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: a.delay, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  aria-hidden
                >
                  <div
                    className={`text-[11px] font-extrabold leading-tight ${
                      a.highlight ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {a.title}
                  </div>
                  <div
                    className={`text-[9px] font-mono mt-0.5 ${
                      a.highlight ? "text-zinc-400" : "text-zinc-400"
                    }`}
                  >
                    {a.id}
                  </div>
                  <div
                    className={`text-[10px] font-semibold mt-1 ${
                      a.highlight ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    {a.stat}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating metric pill */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-zinc-200 px-5 py-2.5 flex items-center gap-3 whitespace-nowrap"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.45 }}
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-zinc-900">97% ESPR Compliance</span>
              <span className="text-xs text-zinc-400">One Central Park, Sydney</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
