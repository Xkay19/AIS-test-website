"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PdfConverterSimulator } from "@/components/ui/pdf-converter-simulator";

export default function ConverterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 bg-zinc-50/60 border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Component first on desktop */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <PdfConverterSimulator />
          </motion.div>

          {/* Copy */}
          <motion.div
            className="order-1 lg:order-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-bold">
              Try it — Drag any PDF below
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Static PDF in.{" "}
              <span className="text-emerald-600">Live DPP out.</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-md">
              Floilan's AI OCR engine reads any ISO 14025 EPD document and automatically
              maps extracted data to the EU ESPR schema — with 99%+ confidence scores.
            </p>
            <ul className="space-y-3 text-sm text-zinc-600 font-medium">
              {[
                "Drag & drop any EPD PDF — real file or simulation",
                "Multi-stage pipeline: upload → extract → map → publish",
                "Extracts A1-A3, A4, A5 lifecycle carbon stages automatically",
                "Outputs scannable QR-linked DPP in under 5 seconds",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                >
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
