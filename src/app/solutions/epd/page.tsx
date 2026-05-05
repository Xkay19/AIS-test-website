import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { Button }  from "@/components/ui/Button";
import {
  FileText, UploadCloud, CheckCircle2, Zap, ArrowRight,
  BarChart3, Database, Globe, ShieldCheck
} from "lucide-react";

const features = [
  {
    icon: UploadCloud,
    title: "PDF EPD Ingestion",
    description: "Upload any ISO 14025-compliant EPD PDF. floilan's OCR pipeline extracts carbon data, material declarations, LCA stages, and programme operator metadata automatically.",
  },
  {
    icon: BarChart3,
    title: "Stage-by-stage carbon breakdown",
    description: "A1–A5, B1–B7, and C1–D lifecycle modules parsed and stored as structured data. Compare embodied carbon across product variants at a glance.",
  },
  {
    icon: Database,
    title: "EN 15804 schema mapping",
    description: "All extracted values are validated against EN 15804:2012+A2:2019 and mapped to the ESPR DPP data model — no manual data entry required.",
  },
  {
    icon: Globe,
    title: "EPD Programme integration",
    description: "Connect directly to EPD Norway, IBU, BRE, and other programme operators via API. New EPDs published by your products are automatically ingested.",
  },
  {
    icon: ShieldCheck,
    title: "Validation & anomaly detection",
    description: "Our rules engine flags values outside typical ranges, missing mandatory fields, and data inconsistencies before your DPP goes live.",
  },
  {
    icon: Zap,
    title: "One-click DPP generation",
    description: "Once your EPD data is validated, publish a regulator-ready Digital Product Passport with QR code in under 5 minutes. No consultant required.",
  },
];

const supportedFormats = [
  "ISO 14025 EPD PDFs",
  "EPD Norway / IBU / BRE formats",
  "ILCD+EPD XML data format",
  "EN 15804 lifecycle modules",
  "REACH substance declarations",
  "RoHS compliance documentation",
];

const metrics = [
  { value: "< 5 min", label: "EPD to published DPP" },
  { value: "68%",     label: "less time vs. manual" },
  { value: "40+",     label: "EPD fields extracted" },
  { value: "100%",    label: "EN 15804 schema coverage" },
];

export default function EpdFactoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-neutral-50 py-20">
          <div className="container-narrow text-center">
            <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full mb-5">
              EPD Factory
            </span>
            <h1 className="text-5xl font-bold mb-6">
              From EPD PDF to Digital Product Passport — automatically
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-8">
              ESPR 2024 demands a DPP, not a PDF. floilan extracts your Environmental Product
              Declaration data and publishes a regulator-ready, scannable passport in minutes.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">Request a demo</Button>
              <Button href="/solutions/epd-api" variant="outline" size="lg">
                See API docs <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Button>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-14 bg-white border-y border-neutral-100">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-4xl font-bold text-neutral-900 mb-1">{m.value}</p>
                  <p className="text-sm text-neutral-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">How EPD Factory works</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Three automated steps replace weeks of manual data entry.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Upload your EPD",
                  body: "Drag and drop any ISO 14025 EPD PDF or connect via our programme operator API. floilan handles any format.",
                  color: "bg-amber-600",
                },
                {
                  step: "02",
                  title: "Review extracted data",
                  body: "Our pipeline parses carbon values, material declarations, and LCA stages. You review and approve — the AI does the heavy lifting.",
                  color: "bg-blue-600",
                },
                {
                  step: "03",
                  title: "Publish your DPP",
                  body: "One click generates a QR-linked, ESPR-compliant Digital Product Passport ready to share with customers, specifiers, and regulators.",
                  color: "bg-brand-600",
                },
              ].map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-8 border border-neutral-100">
                  <div className={`w-10 h-10 rounded-xl ${s.color} text-white flex items-center justify-center font-bold text-sm mb-5`}>
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">Everything in EPD Factory</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl p-7 border border-neutral-100 hover:border-amber-200 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                    <f.icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported formats */}
        <section className="section-padding bg-neutral-50">
          <div className="container-narrow">
            <h2 className="text-3xl font-bold mb-10 text-center">Supported formats & standards</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {supportedFormats.map((f) => (
                <div key={f} className="flex items-center gap-3 bg-white rounded-xl border border-neutral-100 px-5 py-4">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-neutral-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-amber-600 text-white text-center">
          <div className="container-narrow">
            <FileText className="w-12 h-12 mx-auto mb-5 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Ready to turn your EPDs into live DPPs?</h2>
            <p className="text-amber-100 mb-8 max-w-lg mx-auto">
              Book a 30-minute demo and we&apos;ll process one of your existing EPDs live on the call.
            </p>
            <Button href="/contact" variant="ghost-white" size="lg">
              Book a live EPD demo
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
