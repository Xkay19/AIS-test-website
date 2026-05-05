import type { Metadata } from "next";
import {
  FileText,
  Search,
  Bell,
  ShieldCheck,
  Zap,
  Tag,
  Clock,
  ArrowRight,
  Upload,
  Brain,
  Database,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "AI Document Management | floilan",
  description:
    "Automatically classify, extract, and track every compliance document — EPDs, CE declarations, REACH filings, ISO certificates, and more.",
};

const docTypes = [
  { label: "Environmental Product Declaration", abbr: "EPD", color: "bg-green-50 text-green-700 border-green-100" },
  { label: "CE Declaration of Performance", abbr: "CE DoP", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "REACH Declaration", abbr: "REACH", color: "bg-purple-50 text-purple-700 border-purple-100" },
  { label: "RoHS Certificate", abbr: "RoHS", color: "bg-red-50 text-red-700 border-red-100" },
  { label: "ISO 14001", abbr: "ISO 14001", color: "bg-teal-50 text-teal-700 border-teal-100" },
  { label: "ISO 9001", abbr: "ISO 9001", color: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  { label: "Safety Data Sheet", abbr: "SDS", color: "bg-orange-50 text-orange-700 border-orange-100" },
  { label: "Carbon / LCA Report", abbr: "Carbon", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { label: "Audit Report", abbr: "Audit", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  { label: "Bill of Materials", abbr: "BOM", color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  { label: "Supplier Declaration", abbr: "Supply Chain", color: "bg-pink-50 text-pink-700 border-pink-100" },
  { label: "Test Report", abbr: "Test Report", color: "bg-sky-50 text-sky-700 border-sky-100" },
  { label: "Digital Product Passport", abbr: "DPP", color: "bg-brand-50 text-brand-700 border-brand-100" },
];

const features = [
  {
    icon: Brain,
    title: "AI Classification",
    body: "Upload any document and our model identifies the type, standard, issuer, dates, and key fields — no templates needed.",
  },
  {
    icon: Tag,
    title: "Field Extraction",
    body: "Pulls product ref, standard number, issue and expiry dates, and type-specific fields with high/medium/low confidence scores.",
  },
  {
    icon: Bell,
    title: "Expiry Alerts",
    body: "Know which certificates expire in the next 90 days and which are already lapsed. Never miss a renewal deadline.",
  },
  {
    icon: Search,
    title: "Full-text Search",
    body: "Find any document by keyword across title, issuer, standard, product reference, and extracted text preview.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Tracking",
    body: "Every document is tagged active, expiring soon, expired, or unverified. Filter your entire library by status.",
  },
  {
    icon: Database,
    title: "Linked to Products",
    body: "Associate documents directly with EPD records and product IDs. Build a traceable compliance data layer.",
  },
  {
    icon: Zap,
    title: "REST API",
    body: "Upload, retrieve, search, and delete via clean JSON endpoints. Integrate into your ERP, PIM, or supplier portal.",
  },
  {
    icon: Clock,
    title: "Audit Trail",
    body: "Every upload is timestamped and classified in under 3 seconds. A permanent record for due diligence and audits.",
  },
];

const steps = [
  {
    num: "01",
    title: "Upload",
    body: "Drag and drop any PDF — EPD, certificate, SDS, audit report — via the UI or REST API.",
    icon: Upload,
  },
  {
    num: "02",
    title: "Classify",
    body: "AI identifies the document type from 13 categories and assigns a confidence score with reasoning.",
    icon: Brain,
  },
  {
    num: "03",
    title: "Extract",
    body: "Key fields pulled: issuer, standard, dates, product reference, and type-specific compliance data.",
    icon: FileText,
  },
  {
    num: "04",
    title: "Track",
    body: "Documents are tagged with live status — active, expiring soon, or expired — and searchable instantly.",
    icon: CheckCircle,
  },
];

const apiEndpoints = [
  { method: "POST", path: "/api/docs/upload", desc: "Upload + AI classify a document" },
  { method: "GET",  path: "/api/docs",         desc: "List all documents with summary stats" },
  { method: "GET",  path: "/api/docs/:id",      desc: "Get a single document record" },
  { method: "GET",  path: "/api/docs/:id/extract", desc: "Get extracted fields & classification" },
  { method: "GET",  path: "/api/docs/search?q=", desc: "Full-text search across all documents" },
  { method: "GET",  path: "/api/docs/expiring", desc: "Documents expiring within 90 days" },
  { method: "DELETE", path: "/api/docs/:id",    desc: "Delete a document" },
];

const methodColor: Record<string, string> = {
  GET:    "bg-blue-50 text-blue-700",
  POST:   "bg-green-50 text-green-700",
  DELETE: "bg-red-50 text-red-700",
};

export default function DocsPage() {
  return (
    <main className="pt-16">

      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              AI Document Management
            </span>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Every compliance document. <br />
              <span className="text-brand-400">Classified, extracted, tracked.</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
              Upload EPDs, CE declarations, REACH filings, ISO certificates, and 9 other document types.
              AI identifies the type, pulls key fields, and alerts you before they expire.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" size="lg">Book a demo</Button>
              <a
                href="/api/docs"
                className="flex items-center gap-2 text-neutral-300 hover:text-white text-sm font-medium px-5 py-3 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors"
              >
                Explore the API <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mock document card */}
          <div className="mt-16 bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 max-w-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-white font-medium text-sm truncate">KONE-MonoSpace-EPD-2024.pdf</p>
                  <span className="text-xs bg-green-500/20 text-green-300 border border-green-400/30 px-2 py-0.5 rounded-full flex-shrink-0">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 text-xs">
                  {[
                    ["Type", "Environmental Product Declaration"],
                    ["Confidence", "94%"],
                    ["Issuer", "IES Ltd"],
                    ["Standard", "EN 15804+A2"],
                    ["Issued", "2024-03-15"],
                    ["Expires", "2029-03-15"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span className="text-neutral-500">{k}: </span>
                      <span className="text-neutral-200">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {["EPD", "EN 15804", "Construction"].map((tag) => (
                    <span key={tag} className="text-[10px] bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded-md">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document types */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">13 document types, one system</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              The AI recognises every compliance document format required under ESPR 2024, EU CBAM, and EN 15804.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {docTypes.map((t) => (
              <span
                key={t.abbr}
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border ${t.color}`}
              >
                <span className="font-bold">{t.abbr}</span>
                <span className="text-[11px] opacity-70 hidden sm:inline">— {t.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-neutral-50 border-t border-neutral-100">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">From upload to insight in seconds</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl border border-neutral-100 p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-brand-100">{s.num}</span>
                  <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-brand-600" />
                  </div>
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white border-t border-neutral-100">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Everything compliance teams need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-neutral-100 hover:border-brand-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API reference */}
      <section className="section-padding bg-neutral-950 border-t border-neutral-800">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                REST API
              </span>
              <h2 className="text-3xl font-bold text-white mb-3">Build on top of it</h2>
              <p className="text-neutral-400">
                Seven clean endpoints. Integrate document intelligence into any ERP, PIM, or supplier portal.
              </p>
            </div>

            <div className="space-y-2">
              {apiEndpoints.map((ep) => (
                <div
                  key={ep.path}
                  className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-3"
                >
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md w-16 text-center flex-shrink-0 ${methodColor[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-brand-300 font-mono flex-shrink-0">{ep.path}</code>
                  <span className="text-sm text-neutral-400 hidden sm:block">{ep.desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <p className="text-xs text-neutral-500 mb-3 font-mono">Example: upload a PDF</p>
              <pre className="text-sm text-green-300 font-mono leading-relaxed overflow-x-auto">{`curl -X POST https://app.floilan.com/api/docs/upload \\
  -F "file=@reach-declaration.pdf"

# → returns:
{
  "success": true,
  "doc": {
    "doc_type": "reach_declaration",
    "doc_type_label": "REACH Declaration",
    "confidence": 91,
    "issuer": "SGS Group",
    "issue_date": "2024-01-20",
    "expiry_date": "2026-01-20",
    "status": "active"
  },
  "ai_summary": "REACH Declaration from SGS Group...",
  "parse_ms": 843
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="section-padding bg-brand-600 text-white">
        <div className="container-wide">
          <div className="grid sm:grid-cols-4 gap-8 text-center">
            {[
              { val: "13", label: "Document types classified" },
              { val: "<3s", label: "Classification time" },
              { val: "90 day", label: "Expiry alert window" },
              { val: "100%", label: "ESPR 2024 coverage" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-black mb-1">{s.val}</p>
                <p className="text-brand-100 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white border-t border-neutral-100">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stop managing documents in spreadsheets</h2>
          <p className="text-neutral-500 mb-8">
            Let AI classify, extract, and track every compliance document automatically. Your team focuses on decisions, not admin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact" size="lg">Book a demo</Button>
            <Button href="/pricing" variant="outline" size="lg">See pricing</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
