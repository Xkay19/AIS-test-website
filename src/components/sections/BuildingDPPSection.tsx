"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle2, TrendingDown } from "lucide-react";

/* ── DPP annotation cards on the building ─────────────────────────── */
const buildingAnnotations = [
  { title: "Structural Steel", id: "DPP-SS-001247", stat1: "68% Recycled Content", stat2: "526 kg CO₂e / m²", verified: true, top: "5%", left: "32%", delay: 0.8 },
  { title: "Low-E Glass", id: "DPP-LG-000992", stat1: "32% Recycled Content", stat2: "210 kg CO₂e / m²", verified: true, top: "30%", left: "22%", delay: 1.0 },
  { title: "Green Roof System", id: "DPP-GR-001338", stat1: "89% Recycled Content", stat2: "45 kg CO₂e / m²", verified: true, top: "52%", left: "25%", delay: 1.2 },
  { title: "Aluminum Facade Panel", id: "DPP-AF-000581", stat1: "75% Recycled Content", stat2: "320 kg CO₂e / m²", verified: true, top: "10%", right: "2%", delay: 0.9 },
  { title: "HVAC System", id: "DPP-HV-000772", stat1: "Optimised Energy Use", stat2: "550 kg CO₂e / kW", verified: true, top: "36%", right: "2%", delay: 1.1 },
  { title: "Timber Flooring", id: "DPP-TF-001009", stat1: "100% FSC Certified", stat2: "12.5 kg CO₂e / m²", verified: true, top: "62%", right: "2%", delay: 1.3 },
];

/* ── Left panels ───────────────────────────────────────────────────── */
function BuiltIDPanel({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/60 p-5 w-[240px]"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* BuiltID header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-[9px] font-black">B</span>
        </div>
        <span className="text-sm font-black text-zinc-900">BuiltID</span>
      </div>
      <div className="text-base font-extrabold text-zinc-900 leading-tight">One Central Park</div>
      <div className="text-xs text-zinc-500 mb-3">Sydney, NSW 2008</div>
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full text-[10px] font-bold text-emerald-700 border border-emerald-100">
        <CheckCircle2 className="h-3 w-3" /> Operational
      </span>

      <div className="mt-4 pt-4 border-t border-zinc-100">
        <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-2">Digital Product Passport</div>
        <div className="text-[9px] text-zinc-500 mb-2">Building Overview</div>
        {[["Structure","100%"],["Facade","95%"],["MEP Systems","100%"],["Interiors","98%"],["Site & Landscape","100%"]].map(([k,v]) => (
          <div key={k} className="flex items-center justify-between py-0.5">
            <span className="text-[9px] text-zinc-600">{k}</span>
            <span className="text-[9px] font-bold text-emerald-600">{v}</span>
          </div>
        ))}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
          <span className="text-[9px] font-bold text-zinc-900">Overall Compliance</span>
          <span className="text-[9px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded-full">97%</span>
        </div>
        <button className="mt-3 text-[9px] font-semibold text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition-colors">
          View Full Passport →
        </button>
      </div>
    </motion.div>
  );
}

function CarbonPanel({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/60 p-5 w-[240px]"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.7, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingDown className="h-4 w-4 text-emerald-600" />
        <span className="text-xs font-black text-zinc-900">Carbon Summary</span>
      </div>
      <div className="text-[10px] text-zinc-400 mb-1">Total Embodied Carbon</div>
      <div className="text-2xl font-black text-zinc-900 leading-none">6,712
        <span className="text-sm font-normal text-zinc-400 ml-1">t CO₂e</span>
      </div>
      <div className="flex items-center gap-1.5 mt-1.5">
        <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-[10px] font-bold text-emerald-600">-28% vs Industry Average</span>
      </div>

      {/* Mini line chart */}
      <div className="mt-3 h-14 w-full">
        <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
          <defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.15"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></linearGradient></defs>
          <path d="M0,40 L30,35 L60,30 L80,32 L110,25 L140,28 L170,20 L200,15 L200,50 L0,50Z" fill="url(#cg2)" />
          <path d="M0,40 L30,35 L60,30 L80,32 L110,25 L140,28 L170,20 L200,15" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="170" cy="20" r="2.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
          <circle cx="200" cy="15" r="2.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
        </svg>
        <div className="flex justify-between text-[7px] text-zinc-400 -mt-1">
          {["Jan","Feb","Mar","Apr","May","Jun"].map(m => <span key={m}>{m}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Annotation card ───────────────────────────────────────────────── */
function AnnotationCard({ ann, inView }: { ann: (typeof buildingAnnotations)[0]; inView: boolean }) {
  const style: React.CSSProperties = { top: ann.top };
  if ("left" in ann) style.left = ann.left;
  if ("right" in ann) style.right = ann.right;

  return (
    <motion.div
      className="absolute bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/60 p-3 w-44 pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: ann.delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="text-[10px] font-extrabold text-zinc-900 leading-tight">{ann.title}</div>
      <div className="text-[8px] font-mono text-zinc-400 mt-0.5">{ann.id}</div>
      <div className="text-[9px] text-zinc-600 mt-1.5">{ann.stat1}</div>
      <div className="text-[9px] text-zinc-600">{ann.stat2}</div>
      {ann.verified && (
        <div className="flex items-center gap-1 mt-1.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span className="text-[9px] font-bold text-emerald-600">EPD Verified</span>
        </div>
      )}
    </motion.div>
  );
}

/* ── Main section ──────────────────────────────────────────────────── */
export function BuildingDPPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#e8ecf0] overflow-hidden"
      aria-label="One Central Park — Digital Product Passport visualization"
    >
      {/* Building background image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.04 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=90&fit=crop"
          alt="One Central Park, Sydney — building with Digital Product Passport data overlays"
          className="w-full h-full object-cover object-center"
        />
        {/* Light gradient overlay so panels stay readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/10" />

        {/* Green glowing highlight boxes on building */}
        {[
          { top: "15%", left: "38%", w: "14%", h: "22%", delay: 1.0 },
          { top: "38%", left: "42%", w: "12%", h: "16%", delay: 1.2 },
          { top: "55%", left: "35%", w: "18%", h: "14%", delay: 1.4 },
          { top: "12%", left: "55%", w: "10%", h: "18%", delay: 1.1 },
          { top: "36%", left: "57%", w: "11%", h: "14%", delay: 1.3 },
        ].map((box, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-emerald-400/70 rounded-sm shadow-[0_0_16px_rgba(52,211,153,0.4)]"
            style={{ top: box.top, left: box.left, width: box.w, height: box.h }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: box.delay, duration: 0.5 }}
            aria-hidden
          />
        ))}
      </motion.div>

      {/* Left panels */}
      <div className="absolute left-4 md:left-8 top-8 z-20 flex flex-col gap-4">
        <BuiltIDPanel inView={inView} />
        <CarbonPanel inView={inView} />
      </div>

      {/* Building annotation cards */}
      <div className="absolute inset-0 z-10">
        {buildingAnnotations.map((ann) => (
          <AnnotationCard key={ann.id} ann={ann} inView={inView} />
        ))}
      </div>
    </section>
  );
}
