"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#059669" }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full px-4 gap-0">
        {/* Top: FLOILAN */}
        <motion.h1
          className="font-black text-white uppercase leading-[0.85] tracking-tighter text-center select-none"
          style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
          initial={{ opacity: 0, y: -48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          FLOILAN
        </motion.h1>

        {/* Centre: building card */}
        <motion.div
          className="relative w-full"
          style={{ maxWidth: "min(78vw, 980px)" }}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-[20px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85&fit=crop"
              alt="One Central Park — Digital Product Passport"
              width={1400}
              height={820}
              className="w-full h-auto object-cover"
              priority
            />
            {/* DPP overlay annotations — matching reference image */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top-left: Building ID card */}
              <motion.div
                className="absolute top-[6%] left-[3%] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 w-44"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">BuiltID</span>
                </div>
                <div className="text-xs font-extrabold text-zinc-900 leading-tight">One Central Park</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Sydney, NSW 2008</div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">Operational</span>
                </div>
                <div className="mt-2 space-y-1">
                  {["Structure", "Facade", "MEP Systems"].map((item, i) => (
                    <div key={i} className="flex justify-between text-[9px]">
                      <span className="text-zinc-400">{item}</span>
                      <span className="font-bold text-emerald-600">{["100%", "95%", "100%"][i]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Top-center: Structural Steel */}
              <motion.div
                className="absolute top-[5%] left-[38%] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 w-44"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
              >
                <div className="text-[10px] font-extrabold text-zinc-900">Structural Steel</div>
                <div className="text-[9px] text-zinc-400 font-mono mb-1.5">DPP-SS-001247</div>
                <div className="space-y-0.5 text-[9px] text-zinc-600">
                  <div>68% Recycled Content</div>
                  <div>526 kg CO₂e / m²</div>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="h-3 w-3 rounded-full bg-emerald-100 flex items-center justify-center text-[7px]">✓</span>
                    EPD Verified
                  </div>
                </div>
              </motion.div>

              {/* Right: Aluminum Facade */}
              <motion.div
                className="absolute top-[12%] right-[2%] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 w-44"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="text-[10px] font-extrabold text-zinc-900">Aluminum Facade Panel</div>
                <div className="text-[9px] text-zinc-400 font-mono mb-1.5">DPP-AF-000581</div>
                <div className="space-y-0.5 text-[9px] text-zinc-600">
                  <div>75% Recycled Content</div>
                  <div>320 kg CO₂e / m²</div>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="h-3 w-3 rounded-full bg-emerald-100 flex items-center justify-center text-[7px]">✓</span>
                    EPD Verified
                  </div>
                </div>
              </motion.div>

              {/* Right-middle: HVAC */}
              <motion.div
                className="absolute top-[42%] right-[2%] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 w-44"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <div className="text-[10px] font-extrabold text-zinc-900">HVAC System</div>
                <div className="text-[9px] text-zinc-400 font-mono mb-1.5">DPP-HV-000772</div>
                <div className="space-y-0.5 text-[9px] text-zinc-600">
                  <div>Optimised Energy Use</div>
                  <div>550 kg CO₂e / kW</div>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="h-3 w-3 rounded-full bg-emerald-100 flex items-center justify-center text-[7px]">✓</span>
                    EPD Verified
                  </div>
                </div>
              </motion.div>

              {/* Bottom-right: Timber Flooring */}
              <motion.div
                className="absolute bottom-[8%] right-[2%] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 w-44"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-[10px] font-extrabold text-zinc-900">Timber Flooring</div>
                <div className="text-[9px] text-zinc-400 font-mono mb-1.5">DPP-TF-001009</div>
                <div className="space-y-0.5 text-[9px] text-zinc-600">
                  <div>100% FSC Certified</div>
                  <div>12.5 kg CO₂e / m²</div>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="h-3 w-3 rounded-full bg-emerald-100 flex items-center justify-center text-[7px]">✓</span>
                    EPD Verified
                  </div>
                </div>
              </motion.div>

              {/* Bottom-left: Carbon Summary */}
              <motion.div
                className="absolute bottom-[6%] left-[3%] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 w-44"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.15, duration: 0.5 }}
              >
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Carbon Summary</div>
                <div className="text-xs font-extrabold text-zinc-900">Total Embodied Carbon</div>
                <div className="text-xl font-black text-zinc-900 mt-0.5">6,712 <span className="text-sm font-bold text-zinc-400">t CO₂e</span></div>
                <div className="text-[9px] text-emerald-600 font-bold mt-0.5">↓ 28% vs Industry Average</div>
              </motion.div>
            </div>

            {/* Green highlight glow on building edges */}
            <div className="absolute inset-0 pointer-events-none ring-[3px] ring-emerald-400/30 rounded-[20px]" />
          </div>
        </motion.div>

        {/* Bottom: PASSPORTS */}
        <motion.h2
          className="font-black text-white uppercase leading-[0.85] tracking-tighter text-center select-none"
          style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          PASSPORTS
        </motion.h2>
      </div>
    </section>
  );
}
