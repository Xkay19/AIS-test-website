"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MiniPassport } from "@/components/ui/mini-passport";

export default function PassportSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" ref={ref} className="py-28 bg-white border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-bold">
              Live Demo — Click the tabs
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Every product. A living{" "}
              <span className="text-emerald-600">Digital Passport.</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-md">
              Each Floilan passport is scannable, regulator-verified, and updates in real time
              as lifecycle data changes — from raw materials to end-of-life.
            </p>
            <ul className="space-y-3 text-sm text-zinc-600 font-medium">
              {[
                "General metadata, issued dates, blockchain verification",
                "Embodied carbon breakdown by lifecycle stage (A1–A5)",
                "Material composition index with recycled content %",
                "Live ESPR 2024 compliance checklist",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                >
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Component */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <MiniPassport />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
