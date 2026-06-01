"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

/* ── Mini dashboard preview (matches Image 3) ────────────────────── */
function DashboardPreview() {
  const cards = [
    { label: "Digital Product Passports", value: "1,248", sub: "Total Passports", trend: "+18.2%", up: true, color: "#6366f1" },
    { label: "ESPR 2024 Compliance Score", value: "92/100", sub: "Excellent", trend: "+8 pts", up: true, color: "#10b981" },
    { label: "Total Carbon (kg CO₂e)", value: "2,45,680", sub: "Total Emissions", trend: "-12.6%", up: false, color: "#10b981" },
    { label: "Materials in Scope", value: "342", sub: "Unique Materials", trend: "+7.3%", up: true, color: "#8b5cf6" },
  ];

  const dppRows = [
    { name: "Steel Beam – S355", id: "SB-355-2024-001", cat: "Steel", catColor: "bg-blue-100 text-blue-700", score: 95, grade: "Excellent", carbon: "18,450" },
    { name: "Concrete – C30/37", id: "CON-C3037-2024-045", cat: "Concrete", catColor: "bg-amber-100 text-amber-700", score: 90, grade: "Excellent", carbon: "12,750" },
    { name: "EV Battery Cell – NMC 811", id: "BATT-NMC811-2024-009", cat: "Battery", catColor: "bg-violet-100 text-violet-700", score: 88, grade: "Good", carbon: "8,230" },
  ];

  const compliance = [
    { label: "Durability", ok: true },
    { label: "Reusability", ok: true },
    { label: "Upgradability", ok: true },
    { label: "Reparability", ok: true },
    { label: "Recycled Content", ok: false },
    { label: "Carbon Footprint Disclosure", ok: true },
    { label: "Digital Product Passport", ok: true },
  ];

  return (
    <div className="flex h-full w-full bg-[#f8fafc] overflow-hidden rounded-2xl text-[10px]">
      {/* Sidebar */}
      <div className="w-[160px] shrink-0 bg-white border-r border-zinc-100 flex flex-col p-3 gap-1">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="h-5 w-5 rounded bg-emerald-600 flex items-center justify-center">
            <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-black text-xs text-zinc-900">Floilan</span>
        </div>
        {["Overview","Digital Product Passports","Materials","Compliance","Carbon Analytics","Supply Chain","Reports","Integrations","Settings"].map((item, i) => (
          <div key={item} className={`px-2 py-1.5 rounded text-[9px] font-medium ${i === 0 ? "bg-emerald-50 text-emerald-700" : "text-zinc-500"}`}>
            {item}
          </div>
        ))}
        <div className="mt-auto pt-3 border-t border-zinc-100">
          <div className="text-[8px] font-bold text-zinc-900">Acme Construction</div>
          <div className="text-[7px] text-zinc-400">Enterprise Plan</div>
          <div className="flex items-center gap-1 mt-1.5">
            <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-[7px] font-bold text-indigo-700">JC</span>
            </div>
            <div>
              <div className="text-[8px] font-semibold text-zinc-800">James Carter</div>
              <div className="text-[7px] text-zinc-400">james@acmebuild.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-100 shrink-0">
          <div>
            <div className="text-xs font-bold text-zinc-900">Good morning, James 👋</div>
            <div className="text-[8px] text-zinc-400">Here&apos;s what&apos;s happening with your product compliance today.</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-44 bg-zinc-50 rounded border border-zinc-200 px-2 flex items-center text-[8px] text-zinc-400">
              Search for materials, passports...
            </div>
            <div className="h-6 w-6 bg-violet-600 rounded text-white flex items-center justify-center text-[8px] font-bold">+</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-2">
            {cards.map((c) => (
              <div key={c.label} className="bg-white rounded-xl border border-zinc-100 shadow-sm p-2.5 flex flex-col gap-1">
                <div className="text-[8px] text-zinc-400 font-medium leading-tight">{c.label}</div>
                <div className="text-sm font-black text-zinc-900">{c.value}</div>
                <div className="text-[7px] text-zinc-400">{c.sub}</div>
                <div className={`text-[8px] font-bold ${c.up ? "text-emerald-600" : "text-red-500"}`}>
                  {c.up ? "↑" : "↓"} {c.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-[3fr_2fr] gap-2">
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-3">
              <div className="text-[9px] font-bold text-zinc-900 mb-1">Carbon Emissions Over Time</div>
              <div className="text-sm font-black text-zinc-900">2,45,680 <span className="text-[8px] font-normal text-zinc-400">kg CO₂e</span></div>
              <div className="mt-2 h-16 w-full bg-zinc-50 rounded-lg overflow-hidden relative">
                <svg viewBox="0 0 300 60" className="w-full h-full" preserveAspectRatio="none">
                  <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></linearGradient></defs>
                  <path d="M0,40 L40,35 L80,28 L120,32 L160,25 L200,28 L240,20 L280,15 L300,18 L300,60 L0,60Z" fill="url(#cg)" />
                  <path d="M0,40 L40,35 L80,28 L120,32 L160,25 L200,28 L240,20 L280,15 L300,18" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  {[40,80,120,160,200,240,280].map((x,i) => <circle key={i} cx={x} cy={[35,28,32,25,28,20,15][i]} r="2.5" fill="#10b981" stroke="#fff" strokeWidth="1"/>)}
                </svg>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-3">
              <div className="text-[9px] font-bold text-zinc-900 mb-2">Emissions by Material Type</div>
              <div className="flex items-center gap-2">
                <div className="relative w-16 h-16 shrink-0">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="32" cy="32" r="24" fill="none" stroke="#e4e4e7" strokeWidth="8"/>
                    {[{d:0.489,c:"#10b981"},{d:0.347,c:"#6366f1"},{d:0.105,c:"#a78bfa"},{d:0.052,c:"#c4b5fd"},{d:0.007,c:"#d1d5db"}].reduce((acc,s,i) => {
                      const prev = acc.cum;
                      const circ = 2*Math.PI*24;
                      acc.els.push(<circle key={i} cx="32" cy="32" r="24" fill="none" stroke={s.c} strokeWidth="8"
                        strokeDasharray={`${circ*s.d} ${circ*(1-s.d)}`}
                        strokeDashoffset={-circ*prev + circ/4}/>);
                      acc.cum += s.d;
                      return acc;
                    },{cum:0,els:[] as React.ReactElement[]}).els}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[7px] font-black text-zinc-900">2,45,680</span>
                    <span className="text-[5px] text-zinc-400">kg CO₂e</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 text-[7px]">
                  {[["#10b981","Concrete","48.9%"],["#6366f1","Steel","34.7%"],["#a78bfa","Battery","10.5%"],["#c4b5fd","Aluminum","5.2%"],["#d1d5db","Other","0.7%"]].map(([c,l,v]) => (
                    <div key={l} className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{background:c}}/>
                      <span className="text-zinc-600">{l}</span>
                      <span className="text-zinc-400 ml-auto">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-[3fr_2fr] gap-2">
            {/* DPP Table */}
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100">
                <span className="text-[9px] font-bold text-zinc-900">Recent Digital Product Passports</span>
                <span className="text-[8px] text-emerald-600 font-semibold">View all Passports</span>
              </div>
              <table className="w-full text-[8px]">
                <thead><tr className="border-b border-zinc-50">
                  {["Material / Product","Category","Manufacturer","ESPR Score","Carbon","Passport QR"].map(h=><th key={h} className="px-2 py-1.5 text-left text-zinc-400 font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>
                  {dppRows.map(r => (
                    <tr key={r.id} className="border-b border-zinc-50 last:border-0">
                      <td className="px-2 py-2"><div className="font-semibold text-zinc-800">{r.name}</div><div className="text-zinc-400 font-mono">{r.id}</div></td>
                      <td className="px-2 py-2"><span className={`px-1.5 py-0.5 rounded-full text-[7px] font-bold ${r.catColor}`}>{r.cat}</span></td>
                      <td className="px-2 py-2 text-zinc-500">Europe</td>
                      <td className="px-2 py-2"><span className="font-bold text-emerald-600">{r.score}</span> <span className="text-zinc-400">{r.grade}</span></td>
                      <td className="px-2 py-2 font-semibold text-zinc-700">{r.carbon}</td>
                      <td className="px-2 py-2"><div className="h-5 w-5 bg-zinc-900 rounded flex items-center justify-center"><span className="text-white text-[6px]">QR</span></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Compliance */}
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold text-zinc-900">ESPR 2024 Compliance Checklist</span>
                <span className="text-[8px] text-emerald-600 font-semibold">View all</span>
              </div>
              <div className="flex flex-col divide-y divide-zinc-50">
                {compliance.map(c => (
                  <div key={c.label} className="flex items-center justify-between py-1.5">
                    <span className="text-[8px] text-zinc-600">{c.label}</span>
                    <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${c.ok ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {c.ok ? "✓ Compliant" : "⏳ In Progress"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="dashboard"
      className="bg-white border-t border-zinc-100 py-10"
      aria-labelledby="dashboard-heading"
    >
      <div className="container max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
            Live Platform
          </span>
          <h2 id="dashboard-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
            The Floilan Dashboard
          </h2>
          <p className="text-zinc-500 text-lg mt-3 max-w-xl mx-auto">
            Real-time compliance, carbon tracking, and DPP management — all in one place.
          </p>
        </motion.div>
      </div>

      <ContainerScroll titleComponent={<div />}>
        <DashboardPreview />
      </ContainerScroll>
    </section>
  );
}
