import Link from "next/link";
import { FileText, ArrowRight, Database, QrCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Upload or extract your EPD",
    description:
      "Import an existing ISO 14025 PDF or connect your EPD programme operator. floilan's OCR engine parses carbon data, material declarations, and LCA stages automatically.",
    tag: "EPD Input",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    icon: Database,
    step: "02",
    title: "Data enrichment & validation",
    description:
      "Our pipeline cross-checks extracted values against EN 15804 schema rules, flags anomalies, fills supplier-side gaps from your onboarded partners, and maps everything to the ESPR DPP data model.",
    tag: "Transform",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: QrCode,
    step: "03",
    title: "Publish your Digital Product Passport",
    description:
      "One click generates a regulator-ready DPP with a QR code, NFC tag, and a shareable link. Specifiers, auditors, and OEM customers access live data — not a static PDF.",
    tag: "DPP Output",
    color: "bg-brand-50 text-brand-700 border-brand-200",
    iconBg: "bg-brand-100",
    iconColor: "text-brand-700",
  },
];

const benefits = [
  "Supports ISO 14025 / EN 15804 / EU Reg 2023/1542",
  "Structured JSON output via REST API",
  "Auto-classification of A1–A5 carbon stages",
  "Backwards-compatible with existing EPD PDFs",
  "QR & NFC passport generation included",
  "Supplier portal for upstream data gaps",
];

export function EpdPipeline() {
  return (
    <section className="section-padding bg-white border-t border-neutral-100">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            EPD → DPP Pipeline
          </span>
          <h2 className="text-4xl font-bold mb-5">
            Turn your EPD documents into<br className="hidden sm:block" /> living Digital Product Passports
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            ESPR 2024 requires a DPP — not a PDF. floilan bridges the gap by extracting your
            existing EPD data and publishing it as a regulator-ready, scannable passport.
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-amber-200 via-blue-200 to-brand-300" />

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                {/* Icon bubble */}
                <div className={`w-16 h-16 rounded-2xl ${s.iconBg} flex items-center justify-center mb-6 relative z-10 shadow-sm`}>
                  <s.icon className={`w-7 h-7 ${s.iconColor}`} />
                </div>

                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${s.color}`}>
                  {s.tag}
                </span>
                <p className="text-xs font-bold text-neutral-400 mb-2">STEP {s.step}</p>
                <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits + CTA row */}
        <div className="mt-16 bg-neutral-50 rounded-3xl p-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-bold text-2xl mb-6">What's included</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 w-full">
              <p className="text-sm text-neutral-500 mb-1">Average time from EPD upload to live DPP</p>
              <p className="text-4xl font-bold text-neutral-900">Under 5 min</p>
              <p className="text-xs text-neutral-400 mt-1">vs. 3 days manual process</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button href="/solutions/epd-to-dpp">
                See EPD-to-DPP pipeline <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Button>
              <Link
                href="/solutions/epd-api"
                className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
              >
                EPD Data Extraction API →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
