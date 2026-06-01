"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle2, Recycle, Leaf } from "lucide-react";

/* ── Left side material label tags ─────────────────────────────────── */
const materialTags = [
  { label: "STRUCTURAL STEEL", sub: "ASTM A992", stat: "98% RECYCLED CONTENT", top: "6%", left: "2%", delay: 0.6 },
  { label: "CROSS-LAMINATED TIMBER (CLT)", sub: "FSC® CERTIFIED", stat: "", top: "26%", left: "2%", delay: 0.75 },
  { label: "LOW-CARBON CONCRETE", sub: "30% LOWER CO₂e", stat: "", top: "48%", left: "2%", delay: 0.9 },
  { label: "HIGH-PERFORMANCE INSULATION", sub: "RECYCLED CONTENT", stat: "", top: "66%", left: "2%", delay: 1.05, icon: true },
];

const bottomTags = [
  { label: "98%\nRECYCLED\nSTEEL", x: "8%", y: "72%", delay: 1.1 },
  { label: "FSC® CERTIFIED\nCROSS-LAMINATED\nTIMBER", x: "32%", y: "78%", delay: 1.2 },
  { label: "RECYCLED CONTENT\nINSULATION", x: "58%", y: "80%", delay: 1.3 },
  { label: "LOW-CARBON\nRECYCLED\nCONCRETE", x: "20%", y: "88%", delay: 1.4 },
];

/* ── Circularity donut ─────────────────────────────────────────────── */
function CircularityDonut({ pct = 76 }: { pct?: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const dash = c * (pct / 100);
  return (
    <div className="relative w-[130px] h-[130px]">
      <svg viewBox="0 0 130 130" className="w-full h-full">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#1e3a2f" strokeWidth="14" />
        <circle cx="65" cy="65" r={r} fill="none" stroke="#22c55e" strokeWidth="14"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeDashoffset={c / 4}
          strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white leading-none">{pct}%</span>
        <span className="text-[9px] text-zinc-400 text-center mt-0.5 leading-tight">CIRCULARITY<br />INDEX</span>
      </div>
    </div>
  );
}

/* ── Full DMP Card (right side) ────────────────────────────────────── */
function DMPCard() {
  return (
    <div className="bg-[#1a2535] rounded-2xl overflow-hidden shadow-2xl border border-white/5 text-white text-xs w-full max-w-[440px]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#1e2d3d]">
        <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Digital Material Passport</span>
        <span className="text-[10px] text-zinc-400 font-mono">ID: DMP-2024-07-3186</span>
      </div>

      {/* Building info */}
      <div className="flex gap-4 p-5 border-b border-white/5">
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&q=80&fit=crop" alt="Greenview Office Building" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-extrabold text-white leading-tight mb-1">Greenview Office Building</div>
          <div className="text-zinc-400 text-[10px] mb-2">123 Sustainable Way, Portland, OR</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
            {[["STAGE", "Construction"], ["ISSUED", "May 24, 2024"], ["VALID UNTIL", "May 24, 2034"]].map(([k, v]) => (
              <div key={k} className="contents">
                <span className="text-zinc-500 uppercase tracking-wider">{k}</span>
                <span className="text-zinc-200">{v}</span>
              </div>
            ))}
          </div>
        </div>
        {/* QR code */}
        <div className="shrink-0 flex flex-col items-center gap-1">
          <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
            <svg className="w-full h-full text-zinc-900" viewBox="0 0 100 100" fill="currentColor" aria-label="QR code">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
              <rect x="40" y="10" width="10" height="10" /><rect x="50" y="20" width="10" height="10" />
              <rect x="40" y="40" width="20" height="20" /><rect x="10" y="40" width="10" height="10" />
              <rect x="70" y="40" width="10" height="10" /><rect x="80" y="50" width="10" height="10" />
              <rect x="40" y="70" width="10" height="10" /><rect x="50" y="80" width="10" height="10" />
              <rect x="70" y="70" width="10" height="10" /><rect x="80" y="80" width="10" height="10" />
            </svg>
          </div>
          <span className="text-[8px] font-bold tracking-wider text-zinc-400 text-center">SCAN TO VERIFY</span>
        </div>
      </div>

      {/* Material Circularity */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-4">Material Circularity</div>
        <div className="flex items-center gap-6">
          <CircularityDonut pct={76} />
          <div className="flex flex-col gap-2 flex-1">
            {[
              ["Total Materials", "1,248 t"],
              ["Recycled Content", "821 t (66%)"],
              ["Reusable / Recyclable", "1,102 t (88%)"],
              ["Landfill Diversion", "95%"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wide">{k}</span>
                <span className="text-zinc-200 text-[10px] font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ESG Metrics */}
      <div className="p-5 border-b border-white/5">
        <div className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-4">Environmental &amp; ESG Metrics</div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "☁️", label: "Embodied Carbon", value: "412", unit: "kg CO₂e / m²", note: "30% BELOW BENCHMARK" },
            { icon: "💧", label: "Water Use", value: "1,285", unit: "L / m²", note: "20% BELOW BENCHMARK" },
            { icon: "♻️", label: "Waste Diversion", value: "95%", unit: "", note: "DIVERTED FROM LANDFILL" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1">
              <span className="text-lg" role="img" aria-label={m.label}>{m.icon}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-wider leading-tight">{m.label}</span>
              <span className="text-xl font-black text-white">{m.value}</span>
              {m.unit && <span className="text-[8px] text-zinc-400">{m.unit}</span>}
              <span className="text-[8px] text-emerald-400 font-semibold text-center leading-tight">{m.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Material Inventory */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Material Inventory</span>
          <button className="text-[9px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">VIEW ALL</button>
        </div>
        <table className="w-full text-[9px]">
          <thead><tr className="border-b border-white/5">
            {["Material", "QTY", "Unit", "Recycled Content", "Certifications"].map((h) => (
              <th key={h} className="text-left text-zinc-500 pb-2 pr-2 uppercase tracking-wide font-semibold">{h}</th>
            ))}
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {[
              ["Structural Steel", "320", "t", "98%", "EPD, ISO 14001"],
              ["CLT Panels", "210", "m³", "FSC® Certified", "FSC®"],
              ["Concrete", "450", "m³", "30%", "EPD"],
              ["Insulation", "120", "m³", "60%", "GREENGUARD"],
              ["Glazing", "1,100", "m³", "25%", "EPD"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className={`py-1.5 pr-2 ${i === 0 ? "text-zinc-200 font-medium" : "text-zinc-400"}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 text-[9px]">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span>VERIFIED BY: GreenBuild Labs</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span className="font-bold text-emerald-400">BLOCKCHAIN VERIFIED</span>
          <span className="text-emerald-400">⬡</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────────── */
export function MaterialPassportSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#0d1a14] overflow-hidden"
      aria-label="Digital Material Passport showcase"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ── Left: Construction scene with material tags ── */}
        <div className="relative min-h-[60vh] lg:min-h-screen overflow-hidden">
          {/* Background construction image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&fit=crop"
              alt="Construction site with sustainable building materials"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a14]/80 via-[#0d1a14]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a14]/60 to-transparent" />
          </motion.div>

          {/* Material annotation tags — left side */}
          {materialTags.map((tag) => (
            <motion.div
              key={tag.label}
              className="absolute flex items-start gap-2"
              style={{ top: tag.top, left: tag.left }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: tag.delay, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              {tag.icon && <Leaf className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />}
              <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-lg px-3 py-2 shadow-lg">
                <div className="text-[10px] font-extrabold text-white uppercase tracking-wide leading-tight">{tag.label}</div>
                {tag.sub && <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">{tag.sub}</div>}
                {tag.stat && <div className="text-[9px] text-zinc-400 mt-0.5">{tag.stat}</div>}
              </div>
            </motion.div>
          ))}

          {/* Bottom material tags with icons */}
          <div className="absolute bottom-0 inset-x-0 h-40">
            {bottomTags.map((tag) => (
              <motion.div
                key={tag.label}
                className="absolute bg-zinc-900/85 backdrop-blur-sm border border-zinc-700/40 rounded-lg px-3 py-2 shadow"
                style={{ left: tag.x, bottom: `${100 - parseInt(tag.y)}%` }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: tag.delay, duration: 0.5 }}
              >
                {tag.label.includes("RECYCLED STEEL") && <Recycle className="h-4 w-4 text-zinc-400 mb-1" aria-hidden />}
                <div className="text-[9px] font-bold text-white uppercase whitespace-pre-line leading-tight">{tag.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right: DMP Card ── */}
        <div className="flex items-center justify-center p-6 lg:p-10 bg-[#111a24]">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-[440px]"
          >
            <DMPCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
