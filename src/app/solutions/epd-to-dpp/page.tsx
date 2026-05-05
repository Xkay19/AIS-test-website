import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { Button }  from "@/components/ui/Button";
import {
  FileText, ArrowRight, Database, QrCode, CheckCircle2,
  BarChart3, Clock, ShieldCheck
} from "lucide-react";

const pipeline = [
  {
    step: "01",
    icon: FileText,
    title: "EPD ingestion",
    desc: "Upload PDF or connect your EPD programme operator API. floilan accepts ISO 14025 PDFs, ILCD+EPD XML, and live programme feeds from EPD Norway, IBU, and BRE.",
    color: "border-amber-300 bg-amber-50",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Structured data extraction",
    desc: "Our OCR and NLP pipeline parses every lifecycle stage (A1–D), material declarations, programme metadata, and declared units into a typed data model validated against EN 15804.",
    color: "border-orange-300 bg-orange-50",
    iconColor: "text-orange-700",
    iconBg: "bg-orange-100",
  },
  {
    step: "03",
    icon: Database,
    title: "Supply chain data enrichment",
    desc: "EPD data is combined with upstream supplier data collected via the floilan portal — filling gaps in material provenance, restricted substance declarations, and end-of-life routes.",
    color: "border-blue-300 bg-blue-50",
    iconColor: "text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    step: "04",
    icon: ShieldCheck,
    title: "ESPR schema mapping & validation",
    desc: "The enriched dataset is mapped to the ESPR 2024 DPP data model. Our rules engine performs 200+ compliance checks and flags any missing mandatory fields before publication.",
    color: "border-purple-300 bg-purple-50",
    iconColor: "text-purple-700",
    iconBg: "bg-purple-100",
  },
  {
    step: "05",
    icon: QrCode,
    title: "Live DPP publication",
    desc: "A regulator-ready Digital Product Passport is published with a permanent QR code, NFC tag option, and shareable URL. Auditors, OEMs, and specifiers access live data — not a PDF snapshot.",
    color: "border-brand-300 bg-brand-50",
    iconColor: "text-brand-700",
    iconBg: "bg-brand-100",
  },
];

const comparisons = [
  { label: "EPD to published DPP", manual: "3–5 days",     floilan: "< 5 minutes" },
  { label: "Data entry errors",    manual: "Common",        floilan: "Eliminated" },
  { label: "Audit readiness",      manual: "Inconsistent", floilan: "Always ready" },
  { label: "QR code generation",  manual: "Manual / none", floilan: "Automatic" },
  { label: "Supply chain gaps",   manual: "Unresolved",    floilan: "Filled via portal" },
  { label: "Regulatory updates",  manual: "Manual rework", floilan: "Auto schema updates" },
];

const caseStudies = [
  {
    company: "FrameWorks Ltd",
    industry: "Construction",
    result: "68% reduction in EPD preparation time — 3 days down to 5 minutes per product.",
    href: "/case-studies/frameworks",
  },
  {
    company: "NovaBatt UK",
    industry: "Batteries",
    result: "12,000 cells passported in 6 weeks. OEM contract secured — supplier was first to arrive with a compliant DPP.",
    href: "/case-studies/novabatt",
  },
];

export default function EpdToDppPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-brand-50 py-20">
          <div className="container-narrow text-center">
            <span className="inline-block bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full mb-5">
              EPD → DPP Pipeline
            </span>
            <h1 className="text-5xl font-bold mb-6">
              The complete pipeline from Environmental Product Declaration to Digital Product Passport
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-8">
              ESPR 2024 requires a live, scannable DPP — not a static EPD document. floilan
              automates every step of the conversion, from data extraction to passport publication.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">See it live — book a demo</Button>
              <Button href="/solutions/epd" variant="outline" size="lg">
                EPD Factory details →
              </Button>
            </div>
          </div>
        </section>

        {/* Stat bar */}
        <section className="py-12 bg-white border-y border-neutral-100">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { v: "< 5 min", l: "EPD to live DPP" },
                { v: "200+",    l: "compliance checks run" },
                { v: "40+",     l: "EPD fields extracted" },
                { v: "100%",    l: "ESPR schema coverage" },
              ].map((m) => (
                <div key={m.l}>
                  <p className="text-4xl font-bold text-neutral-900 mb-1">{m.v}</p>
                  <p className="text-sm text-neutral-500">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline steps */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">How the pipeline works</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Five automated stages replace a process that used to take compliance teams days.
              </p>
            </div>

            <div className="space-y-4">
              {pipeline.map((s, i) => (
                <div key={s.step} className={`flex items-start gap-6 rounded-2xl border-2 p-7 ${s.color}`}>
                  <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-neutral-400">STEP {s.step}</span>
                      <h3 className="font-semibold text-lg">{s.title}</h3>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  {i < pipeline.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <h2 className="text-3xl font-bold mb-10 text-center">Manual process vs. floilan</h2>
            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200 px-6 py-4 text-sm font-semibold text-neutral-600">
                <span></span>
                <span className="text-center">Manual</span>
                <span className="text-center text-brand-700">floilan</span>
              </div>
              {comparisons.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
                >
                  <span className="font-medium text-neutral-700">{r.label}</span>
                  <span className="text-center text-neutral-500">{r.manual}</span>
                  <span className="text-center font-semibold text-brand-700 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />{r.floilan}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-10 text-center">Customers who made the switch</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.map((c) => (
                <div key={c.company} className="bg-white rounded-2xl border border-neutral-100 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full border border-brand-200">
                      {c.industry}
                    </span>
                    <span className="font-semibold text-neutral-900">{c.company}</span>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5">{c.result}</p>
                  <a href={c.href} className="text-sm text-brand-600 font-medium hover:underline">
                    Read full case study →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-neutral-900 text-white text-center">
          <div className="container-narrow">
            <Clock className="w-12 h-12 mx-auto mb-5 text-amber-400" />
            <h2 className="text-3xl font-bold mb-4">
              Stop spending days on what should take minutes
            </h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
              Book a demo and watch us take one of your EPDs all the way to a published DPP, live on the call.
            </p>
            <Button href="/contact" size="lg">
              Book a live demo
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
