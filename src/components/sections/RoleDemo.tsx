"use client";

import { useState } from "react";
import { Eye, Factory, ShieldCheck, Building2, CheckCircle2, Lock, BarChart3, FileText, QrCode } from "lucide-react";

const roles = [
  {
    id: "public",
    label: "Consumer / Public",
    icon: Eye,
    description: "Anyone who scans the QR code — no login required.",
    color: "text-neutral-700",
    activeBg: "bg-neutral-900 text-white",
    inactiveBg: "bg-neutral-100 text-neutral-600",
    view: {
      headline: "What a consumer sees when they scan the QR code",
      badge: { text: "Public view", color: "bg-neutral-100 text-neutral-700" },
      items: [
        { icon: CheckCircle2, color: "text-green-600", label: "EU Compliant", value: "ESPR 2024 — verified" },
        { icon: BarChart3,    color: "text-blue-600",  label: "Carbon footprint", value: "4.2 kg CO₂e per unit" },
        { icon: FileText,     color: "text-amber-600", label: "Material composition", value: "94% organic cotton, Portugal" },
        { icon: QrCode,       color: "text-brand-600", label: "Repairability", value: "Score 8.2/10 — spare parts available" },
      ],
      locked: [],
      note: "Simple, readable sustainability information. No data overload.",
    },
  },
  {
    id: "manufacturer",
    label: "Manufacturer",
    icon: Factory,
    description: "Your internal team — full data and compliance dashboard.",
    color: "text-brand-700",
    activeBg: "bg-brand-600 text-white",
    inactiveBg: "bg-brand-50 text-brand-700",
    view: {
      headline: "Your team sees everything — plus compliance alerts",
      badge: { text: "Manufacturer view", color: "bg-brand-50 text-brand-700" },
      items: [
        { icon: CheckCircle2, color: "text-green-600", label: "Compliance status",    value: "✓ All 38 mandatory fields complete" },
        { icon: BarChart3,    color: "text-blue-600",  label: "Passport completeness", value: "100% — last verified 2 days ago" },
        { icon: FileText,     color: "text-amber-600", label: "Supplier data",         value: "14/14 suppliers responded" },
        { icon: ShieldCheck,  color: "text-purple-600",label: "Audit readiness",       value: "Ready — full trail available" },
        { icon: Factory,      color: "text-brand-600", label: "Active passports",      value: "2,400 live SKUs" },
        { icon: QrCode,       color: "text-rose-600",  label: "Scan analytics",        value: "1,247 scans this month" },
      ],
      locked: [],
      note: "Full compliance dashboard, supplier status, scan analytics, and renewal alerts.",
    },
  },
  {
    id: "auditor",
    label: "Auditor / Regulator",
    icon: ShieldCheck,
    description: "Authorised third parties — verification and audit trail.",
    color: "text-purple-700",
    activeBg: "bg-purple-600 text-white",
    inactiveBg: "bg-purple-50 text-purple-700",
    view: {
      headline: "Auditors see verification history and full data provenance",
      badge: { text: "Auditor view", color: "bg-purple-50 text-purple-700" },
      items: [
        { icon: ShieldCheck,  color: "text-green-600",  label: "Third-party verification", value: "IBU Berlin — March 2025" },
        { icon: FileText,     color: "text-blue-600",   label: "EPD source document",       value: "ISO 14025 — EPD-IES-00214" },
        { icon: CheckCircle2, color: "text-purple-600", label: "EN 15804 schema check",     value: "200/200 rules passed" },
        { icon: BarChart3,    color: "text-amber-600",  label: "Change log",                value: "3 updates — full audit trail" },
      ],
      locked: ["Scan analytics", "Commercial data"],
      note: "Full verification history, EPD source references, and field-level change logs.",
    },
  },
  {
    id: "oem",
    label: "OEM / Buyer",
    icon: Building2,
    description: "Supply chain customers — due diligence and supplier scorecard.",
    color: "text-amber-700",
    activeBg: "bg-amber-600 text-white",
    inactiveBg: "bg-amber-50 text-amber-700",
    view: {
      headline: "OEM customers see supply chain due diligence data",
      badge: { text: "OEM / Buyer view", color: "bg-amber-50 text-amber-700" },
      items: [
        { icon: CheckCircle2, color: "text-green-600", label: "Due diligence status",   value: "✓ OECD compliant — cobalt & lithium" },
        { icon: BarChart3,    color: "text-blue-600",  label: "Carbon — upstream",      value: "18.4 kg CO₂e (A1–A3 breakdown)" },
        { icon: FileText,     color: "text-amber-600", label: "Restricted substances",  value: "0 REACH substances flagged" },
        { icon: ShieldCheck,  color: "text-purple-600",label: "Supplier certification", value: "ISO 9001, ISO 14001 active" },
      ],
      locked: ["Internal cost data", "Production volumes"],
      note: "Configured exactly for what your OEM contracts require — nothing more, nothing less.",
    },
  },
];

export function RoleDemo() {
  const [active, setActive] = useState("public");
  const role = roles.find((r) => r.id === active)!;

  return (
    <section className="section-padding bg-white border-t border-neutral-100">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-50 text-brand-700 border border-brand-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Role-based access
          </span>
          <h2 className="text-4xl font-bold mb-4">
            The right data for every audience
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            One passport, four views. Consumers see sustainability facts. Auditors see
            verification trails. OEMs see due diligence. Your team sees everything.
          </p>
        </div>

        {/* Role selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${
                active === r.id ? r.activeBg : r.inactiveBg + " hover:opacity-80"
              }`}
            >
              <r.icon className="w-4 h-4" />
              {r.label}
            </button>
          ))}
        </div>

        {/* Demo card */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border-2 border-neutral-100 overflow-hidden shadow-xl">
            {/* Card top bar */}
            <div className="bg-neutral-50 border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-4 py-1.5 text-xs text-neutral-500 font-mono">
                floilan.com/passport/woven-jacket-ss25
              </div>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${role.view.badge.color}`}>
                {role.view.badge.text}
              </span>
            </div>

            {/* Card content */}
            <div className="bg-white px-8 py-7">
              <p className="text-sm font-semibold text-neutral-500 mb-6">{role.view.headline}</p>

              {/* Data rows */}
              <div className="space-y-2 mb-6">
                {role.view.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between bg-neutral-50 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                      <span className="text-sm text-neutral-600">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-neutral-900 text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}

                {/* Locked fields */}
                {role.view.locked.map((field) => (
                  <div
                    key={field}
                    className="flex items-center justify-between bg-neutral-50 rounded-xl px-4 py-3 opacity-40"
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                      <span className="text-sm text-neutral-400">{field}</span>
                    </div>
                    <span className="text-sm text-neutral-300">Not authorised</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-neutral-400 border-t border-neutral-100 pt-4">
                {role.view.note}
              </p>
            </div>
          </div>

          {/* Description below card */}
          <div className="text-center mt-6">
            <p className="text-sm text-neutral-500">
              <span className="font-semibold text-neutral-700">{role.label}:</span> {role.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
