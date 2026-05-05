"use client";

import { useState } from "react";
import { Building2, Battery, Circle, Sofa, Shirt } from "lucide-react";

const industries = [
  {
    id: "construction",
    label: "Construction",
    icon: Building2,
    front: { title: "Steel Beam A36", sku: "SB-A36-6M", status: "Compliant" },
    back: {
      fields: [
        { label: "Material",      value: "Carbon Steel A36" },
        { label: "Carbon (kg)",   value: "2.4 CO₂e/kg" },
        { label: "Manufacturer",  value: "UK Steel Ltd" },
        { label: "Standard",      value: "EN 10025-2" },
        { label: "Recycled %",    value: "68%" },
      ],
    },
  },
  {
    id: "batteries",
    label: "Batteries",
    icon: Battery,
    front: { title: "EV Battery Pack", sku: "EVB-100KWH", status: "Compliant" },
    back: {
      fields: [
        { label: "Chemistry",     value: "NMC 811" },
        { label: "Capacity",      value: "100 kWh" },
        { label: "Carbon",        value: "61 kg CO₂e/kWh" },
        { label: "Reg",           value: "EU 2023/1542" },
        { label: "State of Health", value: "97%" },
      ],
    },
  },
  {
    id: "tyres",
    label: "Tyres",
    icon: Circle,
    front: { title: "All-Season Tyre", sku: "AST-205-55R16", status: "Compliant" },
    back: {
      fields: [
        { label: "Size",          value: "205/55 R16" },
        { label: "Rolling resist.",value: "B" },
        { label: "Wet grip",      value: "A" },
        { label: "Recycled rubber",value: "22%" },
        { label: "End-of-life",   value: "Retreadable" },
      ],
    },
  },
  {
    id: "furniture",
    label: "Furniture",
    icon: Sofa,
    front: { title: "Oak Dining Chair", sku: "ODC-2024", status: "Compliant" },
    back: {
      fields: [
        { label: "Material",      value: "FSC Oak" },
        { label: "Finish",        value: "Water-based lacquer" },
        { label: "Carbon",        value: "12.4 kg CO₂e" },
        { label: "Repairability", value: "9 / 10" },
        { label: "Disassembly",   value: "Yes" },
      ],
    },
  },
  {
    id: "fashion",
    label: "Fashion",
    icon: Shirt,
    front: { title: "Merino Wool Jumper", sku: "MWJ-S-GRN", status: "Compliant" },
    back: {
      fields: [
        { label: "Fabric",        value: "100% Merino Wool" },
        { label: "Origin",        value: "New Zealand" },
        { label: "Carbon",        value: "8.1 kg CO₂e" },
        { label: "Microplastics", value: "None" },
        { label: "Care",          value: "Hand wash, dry flat" },
      ],
    },
  },
];

export function DppDemo() {
  const [active, setActive] = useState("construction");

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">See a Digital Product Passport</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Each product gets a structured, scannable passport with full lifecycle data. Hover a card to see what regulators and buyers actually see.
          </p>
        </div>

        {/* Industry tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === ind.id
                  ? "bg-brand-600 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <ind.icon className="w-4 h-4" />
              {ind.label}
            </button>
          ))}
        </div>

        {/* Flip card */}
        {industries.filter((i) => i.id === active).map((ind) => (
          <div key={ind.id} className="max-w-sm mx-auto flip-card h-72">
            <div className="flip-card-inner w-full h-full">
              {/* Front */}
              <div className="flip-card-front absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-8 flex flex-col justify-between text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-widest opacity-70">Digital Product Passport</span>
                  <ind.icon className="w-5 h-5 opacity-70" />
                </div>
                <div>
                  <p className="text-xs opacity-60 mb-1">{ind.front.sku}</p>
                  <h3 className="text-2xl font-bold">{ind.front.title}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm bg-white/20 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    {ind.front.status}
                  </span>
                  <span className="text-xs opacity-50">Hover to inspect</span>
                </div>
              </div>

              {/* Back */}
              <div className="flip-card-back absolute inset-0 bg-white border border-neutral-200 rounded-2xl p-8 shadow-xl">
                <p className="text-xs font-medium text-brand-600 uppercase tracking-widest mb-4">Product Data</p>
                <ul className="space-y-2">
                  {ind.back.fields.map((f) => (
                    <li key={f.label} className="flex justify-between text-sm">
                      <span className="text-neutral-500">{f.label}</span>
                      <span className="font-medium text-neutral-900">{f.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
