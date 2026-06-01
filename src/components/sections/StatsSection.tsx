"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";

const metrics = [
  { value: "50,000+", label: "Products Managed", description: "Successfully mapped to the EU ESPR data schema across 18 countries." },
  { value: "95%", label: "Faster Compliance Retrieval", description: "Instant QR code lookup for auditors, regulators, and procurement teams." },
  { value: "100%", label: "Digital Documentation", description: "Fully compliant with the latest EU Battery Regulation and ESPR rules." },
  { value: "< 5 min", label: "EPD to Live DPP", description: "Automated OCR parsing saves days of manual data entry work." },
];

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px)",
        backgroundSize: "24px 32px",
      }} />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />

      <div className="container max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <SectionHeader
          id="stats-heading"
          eyebrow="Proven Performance"
          title="Trusted Infrastructure for the Built Environment"
          description="Floilan delivers measurable value for building owners, developers, and manufacturers navigating the circular economy."
          align="center"
          maxWidth="max-w-3xl"
          className="[&_span]:bg-emerald-900/40 [&_span]:text-emerald-400 [&_span]:border-emerald-800 [&_h2]:text-white [&_p]:text-zinc-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-800">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="bg-zinc-900 p-8 md:p-10 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.span
                className="text-[clamp(2.5rem,5vw,3.5rem)] font-black text-emerald-400 tracking-tight leading-none tabular-nums"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: "backOut" }}
              >
                {m.value}
              </motion.span>
              <span className="text-sm font-bold text-white uppercase tracking-widest">{m.label}</span>
              <p className="text-xs text-zinc-400 leading-relaxed">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
