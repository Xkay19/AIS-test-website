"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { value: "1,248+", label: "DPPs Generated", sub: "across 14 countries" },
  { value: "99.2%", label: "OCR Accuracy", sub: "on ISO 14025 EPDs" },
  { value: "< 5s", label: "EPD to DPP", sub: "average conversion time" },
  { value: "ESPR 2024", label: "Fully Compliant", sub: "audit-ready output" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-white border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: "backOut" }}
              >
                {stat.value}
              </motion.span>
              <span className="text-sm font-bold text-zinc-700">{stat.label}</span>
              <span className="text-xs text-zinc-400">{stat.sub}</span>
              <motion.div
                className="h-px bg-emerald-500/40 mt-1"
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
