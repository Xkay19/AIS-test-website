"use client";

import { useState } from "react";
import { QrCode, CheckCircle2, Leaf, Recycle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const examples = [
  {
    id: "battery",
    industry: "Batteries",
    emoji: "🔋",
    product: "LiFePO4 Cell — 100Ah",
    brand: "NovaBatt UK",
    color: "from-blue-600 to-blue-800",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    carbon: "18.4 kg CO₂e",
    material: "Lithium Iron Phosphate",
    compliance: "EU Reg 2023/1542",
    status: "Compliant",
    fields: [
      { label: "Cell chemistry", value: "LiFePO4" },
      { label: "Capacity", value: "100 Ah" },
      { label: "State of health", value: "98.2%" },
      { label: "Carbon (A1–A3)", value: "18.4 kg CO₂e" },
      { label: "Cobalt due diligence", value: "✓ OECD certified" },
      { label: "Second-life route", value: "Grid storage" },
    ],
  },
  {
    id: "steel",
    industry: "Construction",
    emoji: "🏗️",
    product: "HEB 200 Structural Steel",
    brand: "FrameWorks Ltd",
    color: "from-amber-600 to-amber-800",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    carbon: "1.84 kg CO₂e/kg",
    material: "71% recycled steel scrap",
    compliance: "EN 15804 / ESPR 2024",
    status: "Compliant",
    fields: [
      { label: "Steel grade", value: "S355" },
      { label: "Declared unit", value: "1 kg" },
      { label: "Carbon A1–A3", value: "1.84 kg CO₂e" },
      { label: "Recycled content", value: "71.2%" },
      { label: "EPD verified by", value: "IBU Berlin" },
      { label: "Valid until", value: "March 2029" },
    ],
  },
  {
    id: "jacket",
    industry: "Fashion",
    emoji: "👚",
    product: "Organic Cotton Jacket — SS25",
    brand: "Woven & Co.",
    color: "from-rose-500 to-rose-700",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    carbon: "4.2 kg CO₂e",
    material: "94% organic cotton",
    compliance: "ESPR Ecodesign",
    status: "Compliant",
    fields: [
      { label: "Fibre composition", value: "94% organic cotton" },
      { label: "Country of origin", value: "Portugal" },
      { label: "Microplastic shed", value: "< 0.1 mg/wash" },
      { label: "Carbon footprint", value: "4.2 kg CO₂e" },
      { label: "Repair availability", value: "✓ spare parts listed" },
      { label: "Take-back scheme", value: "✓ active" },
    ],
  },
  {
    id: "tyre",
    industry: "Tyres",
    emoji: "🛞",
    product: "225/45 R17 Summer Tyre",
    brand: "Tread Systems",
    color: "from-slate-600 to-slate-800",
    badge: "bg-slate-50 text-slate-700 border-slate-200",
    carbon: "12.6 kg CO₂e",
    material: "Natural rubber 38%",
    compliance: "EU Tyre Label Reg",
    status: "Compliant",
    fields: [
      { label: "Fuel efficiency", value: "A (highest)" },
      { label: "Wet grip", value: "A" },
      { label: "Noise level", value: "68 dB" },
      { label: "Carbon footprint", value: "12.6 kg CO₂e" },
      { label: "Retreading possible", value: "Yes — 3×" },
      { label: "End-of-life route", value: "TyreCycle UK" },
    ],
  },
  {
    id: "furniture",
    industry: "Furniture",
    emoji: "🪑",
    product: "Office Chair — Ergo Pro",
    brand: "Nordic Form",
    color: "from-orange-500 to-orange-700",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    carbon: "22.4 kg CO₂e",
    material: "68% recycled aluminium",
    compliance: "ESPR 2024",
    status: "Compliant",
    fields: [
      { label: "Repairability score", value: "8.2 / 10" },
      { label: "Recyclability", value: "82%" },
      { label: "REACH substances", value: "✓ none flagged" },
      { label: "Carbon footprint", value: "22.4 kg CO₂e" },
      { label: "Spare parts", value: "✓ 14 listed" },
      { label: "Disassembly time", value: "< 12 min" },
    ],
  },
];

export function DppShowcase() {
  const [active, setActive] = useState("battery");
  const example = examples.find((e) => e.id === active)!;

  return (
    <section className="section-padding bg-neutral-950 text-white overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-white/10 border border-white/20 text-xs font-semibold px-3 py-1 rounded-full mb-4 text-white">
            Live examples
          </span>
          <h2 className="text-4xl font-bold mb-4">
            See what a floilan passport looks like
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Every passport is unique to your product and regulation. QR-linked, always live,
            accessible to anyone you authorise.
          </p>
        </div>

        {/* Industry tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {examples.map((e) => (
            <button
              key={e.id}
              onClick={() => setActive(e.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === e.id
                  ? "bg-white text-neutral-900 shadow-lg"
                  : "bg-white/10 text-neutral-300 hover:bg-white/20"
              }`}
            >
              <span>{e.emoji}</span>
              {e.industry}
            </button>
          ))}
        </div>

        {/* Passport card + data panel */}
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Passport card */}
          <div className={`rounded-3xl bg-gradient-to-br ${example.color} p-8 shadow-2xl`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border bg-white/20 text-white border-white/30 mb-2`}>
                  {example.industry}
                </span>
                <h3 className="text-white font-bold text-xl leading-tight">{example.product}</h3>
                <p className="text-white/70 text-sm mt-1">{example.brand}</p>
              </div>
              {/* QR code placeholder */}
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <QrCode className="w-10 h-10 text-neutral-800" />
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <Leaf className="w-4 h-4 text-green-300 mx-auto mb-1" />
                <p className="text-white text-xs font-bold leading-tight">{example.carbon}</p>
                <p className="text-white/60 text-[10px] mt-0.5">Carbon</p>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <Recycle className="w-4 h-4 text-blue-300 mx-auto mb-1" />
                <p className="text-white text-xs font-bold leading-tight">{example.material}</p>
                <p className="text-white/60 text-[10px] mt-0.5">Material</p>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 mx-auto mb-1" />
                <p className="text-white text-xs font-bold leading-tight">{example.status}</p>
                <p className="text-white/60 text-[10px] mt-0.5">Status</p>
              </div>
            </div>

            {/* Compliance tag */}
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
              <AlertCircle className="w-4 h-4 text-white/60 flex-shrink-0" />
              <span className="text-white/80 text-xs">Verified under <span className="font-semibold text-white">{example.compliance}</span></span>
            </div>

            {/* Bottom */}
            <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
              <p className="text-white/50 text-xs">floilan.com/passport/…</p>
              <span className="text-[10px] bg-green-400/20 text-green-300 border border-green-400/30 px-2 py-0.5 rounded-full font-medium">
                ● Live
              </span>
            </div>
          </div>

          {/* Data panel */}
          <div>
            <p className="text-neutral-400 text-sm mb-4 uppercase tracking-widest font-medium">
              What's inside this passport
            </p>
            <div className="space-y-2">
              {example.fields.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                    i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                  }`}
                >
                  <span className="text-neutral-400 text-sm">{f.label}</span>
                  <span className="text-white text-sm font-medium text-right max-w-[55%]">{f.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" size="lg">
                Build my passport
              </Button>
              <Button href="/solutions/epd-to-dpp" variant="outline" size="lg">
                See EPD → DPP pipeline
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-neutral-500 text-sm mt-12">
          Every passport is QR-linked and live. Regulators, OEM customers, and end consumers scan the same code.
        </p>
      </div>
    </section>
  );
}
