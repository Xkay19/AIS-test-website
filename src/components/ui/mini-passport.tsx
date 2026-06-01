"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  QrCode,
  Leaf,
  Layers,
  FileCheck,
  Building,
  Activity,
  Compass,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

type TabType = "general" | "carbon" | "materials" | "compliance";

export function MiniPassport() {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col md:flex-row">
      {/* Left side: QR Code & Header */}
      <div className="p-6 md:p-8 bg-zinc-50 dark:bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-200/80 dark:border-zinc-800 flex flex-col items-center justify-between gap-6 md:w-2/5 shrink-0">
        <div className="text-center space-y-2 w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-100/50">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>DPP LIVE PASSPORT</span>
          </div>
          <h4 className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight mt-2">
            LiFePO4 Cell — 100Ah
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            ID: DPP-NVB-90214
          </p>
        </div>

        {/* Mock Scannable QR Code */}
        <div className="relative group p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="w-36 h-36 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden relative">
            <svg
              className="w-28 h-36 text-zinc-800 dark:text-zinc-200"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
              <rect x="40" y="10" width="10" height="10" />
              <rect x="50" y="20" width="10" height="10" />
              <rect x="40" y="40" width="20" height="20" />
              <rect x="10" y="40" width="10" height="10" />
              <rect x="20" y="50" width="10" height="10" />
              <rect x="70" y="40" width="10" height="10" />
              <rect x="80" y="50" width="10" height="10" />
              <rect x="40" y="70" width="10" height="10" />
              <rect x="50" y="80" width="10" height="10" />
              <rect x="70" y="70" width="10" height="10" />
              <rect x="80" y="80" width="10" height="10" />
              <rect x="90" y="90" width="10" height="10" />
              <rect x="10" y="90" width="10" height="10" />
              <rect x="90" y="10" width="10" height="10" />
            </svg>
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
              <QrCode className="h-8 w-8 text-emerald-600 animate-bounce" />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none uppercase tracking-wider">
            Scan to Verify
          </div>
        </div>

        <button
          onClick={handleCopyLink}
          className="text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
        >
          {copied ? "Copied Link!" : "floilan.com/passport/90214"}
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Right side: Interactive Tabs */}
      <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
        <div className="flex border-b border-zinc-100 dark:border-zinc-800 pb-2 overflow-x-auto gap-1 scrollbar-none">
          {[
            { id: "general", label: "General", icon: <Building className="h-3.5 w-3.5" /> },
            { id: "carbon", label: "Carbon", icon: <Leaf className="h-3.5 w-3.5" /> },
            { id: "materials", label: "Materials", icon: <Layers className="h-3.5 w-3.5" /> },
            { id: "compliance", label: "Compliance", icon: <FileCheck className="h-3.5 w-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/40"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-between min-h-[220px]">
          {activeTab === "general" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Manufacturer</span>
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">NovaBatt UK</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Facility</span>
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Sheffield, England</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Manufacture Date</span>
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">May 12, 2026</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Product Class</span>
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Industrial / EV Battery</p>
                </div>
              </div>
              <div className="border-t border-zinc-100 dark:border-zinc-800/60 pt-4 flex items-center gap-3">
                <Activity className="h-5 w-5 text-emerald-500" />
                <div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Lifecycle Status: Active</div>
                  <p className="text-[11px] text-zinc-500">Currently in service. Lifecycle events logged automatically.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "carbon" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/40 p-4 rounded-2xl">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Total Carbon Footprint</span>
                  <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-300">18.4 kg CO₂e</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">A Grade</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-500">A1-A3 Raw Materials & Production</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">14.2 kg</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "77%" }} />
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-500">A4-A5 Transport & Assembly</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">4.2 kg</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: "23%" }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "materials" && (
            <div className="space-y-4 animate-fade-in">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Material Composition</span>
              <div className="space-y-3">
                {[
                  { name: "Lithium Iron Phosphate (LFP)", pct: "42%", color: "bg-emerald-500" },
                  { name: "Copper (Anode Foil)", pct: "18%", color: "bg-teal-500" },
                  { name: "Aluminum (Casing & Cathode)", pct: "15%", color: "bg-blue-500" },
                  { name: "Graphite (Anode)", pct: "25%", color: "bg-zinc-400" },
                ].map((mat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-600 dark:text-zinc-300">{mat.name}</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-bold">{mat.pct}</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", mat.color)} style={{ width: mat.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "compliance" && (
            <div className="space-y-3 animate-fade-in">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">ESPR 2024 & EU Battery Regulation</span>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { label: "Carbon Footprint Disclosure", desc: "Compliant with EN 15804 standards" },
                  { label: "Material Circularity Index", desc: "68% recycled content verified" },
                  { label: "Supply Chain Due Diligence", desc: "Zero high-risk minerals flagged" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/20">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.label}</div>
                      <p className="text-[10px] text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-zinc-100 dark:border-zinc-800/60 pt-4 flex items-center justify-between text-xs text-zinc-400 mt-4">
            <div className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-emerald-500" />
              <span>EU Reg 2023/1542 Compliant</span>
            </div>
            <span>Verified: 2026-05-12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
