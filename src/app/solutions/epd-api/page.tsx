import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { Button }  from "@/components/ui/Button";
import { Code2, Zap, ShieldCheck, ArrowRight, Database, Globe, CheckCircle2 } from "lucide-react";

const endpoints = [
  {
    method: "POST",
    path: "/v1/epd/extract",
    description: "Upload an EPD PDF and receive structured JSON with all carbon and material data extracted.",
    color: "bg-green-100 text-green-700",
  },
  {
    method: "GET",
    path: "/v1/epd/{id}",
    description: "Retrieve a previously processed EPD by ID. Returns full data model including lifecycle stages.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    method: "POST",
    path: "/v1/epd/{id}/validate",
    description: "Run EN 15804 schema validation against an extracted EPD. Returns field-level pass/fail results.",
    color: "bg-green-100 text-green-700",
  },
  {
    method: "POST",
    path: "/v1/epd/{id}/dpp",
    description: "Convert a validated EPD into a Digital Product Passport. Returns DPP ID, QR code URL, and shareable link.",
    color: "bg-green-100 text-green-700",
  },
  {
    method: "GET",
    path: "/v1/epd/compare",
    description: "Compare carbon and material data across multiple EPDs. Useful for specifier benchmarking tools.",
    color: "bg-blue-100 text-blue-700",
  },
];

const features = [
  {
    icon: Zap,
    title: "Sub-second extraction",
    description: "Our OCR + structured extraction pipeline processes a typical 20-page EPD in under 3 seconds, returning a fully typed JSON response.",
  },
  {
    icon: Code2,
    title: "Typed JSON schema",
    description: "Responses follow a documented, versioned schema with 40+ EPD fields. TypeScript types, Python models, and OpenAPI spec included.",
  },
  {
    icon: ShieldCheck,
    title: "EN 15804 validation",
    description: "Built-in rules engine validates extracted data against the EN 15804:2012+A2 schema before returning it. Anomalies are flagged with field-level detail.",
  },
  {
    icon: Database,
    title: "Persistent storage",
    description: "All processed EPDs are stored and versioned in your floilan account. Access historic extractions, audit trails, and delta comparisons via API.",
  },
  {
    icon: Globe,
    title: "Programme operator feeds",
    description: "Subscribe to EPD programme webhooks (EPD Norway, IBU, BRE) and receive real-time notifications when your products publish new declarations.",
  },
  {
    icon: ArrowRight,
    title: "DPP generation endpoint",
    description: "Chain extraction directly to DPP generation. A single API call can take an EPD PDF all the way to a published, QR-linked Digital Product Passport.",
  },
];

const useCases = [
  { title: "EPD comparison platforms", description: "Build specifier tools that compare embodied carbon across competing products using structured data rather than PDFs." },
  { title: "BIM / Revit plugins", description: "Pull EPD carbon data directly into design tools. Display A1–A5 carbon values inside Revit models as products are specified." },
  { title: "Procurement portals", description: "Screen suppliers by embodied carbon automatically. Reject non-compliant products before they reach the shortlist." },
  { title: "Carbon accounting software", description: "Ingest EPD data as a verified carbon source for Scope 3 emissions reporting without manual data entry." },
];

const sampleResponse = `{
  "epd_id": "ds_epd_01J3K2V...",
  "product": "FrameSteel S355 HEB200",
  "programme": "IBU",
  "standard": "EN 15804:2012+A2:2019",
  "declared_unit": "1 kg",
  "carbon": {
    "a1_a3": 1.84,
    "a4":    0.02,
    "a5":    0.04,
    "c3":   -0.12,
    "d":    -0.43,
    "unit":  "kg CO2e"
  },
  "materials": [
    { "name": "Steel scrap", "pct": 71.2 },
    { "name": "Pig iron",    "pct": 22.1 },
    { "name": "Other",       "pct":  6.7 }
  ],
  "valid_until": "2027-03-15",
  "dpp_ready":  true
}`;

export default function EpdApiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-800 py-20 text-white">
          <div className="container-narrow text-center">
            <span className="inline-block bg-white/10 border border-white/20 text-xs font-semibold px-3 py-1 rounded-full mb-5 text-white">
              EPD Data Extraction API
            </span>
            <h1 className="text-5xl font-bold mb-6">
              Structured EPD data,<br /> delivered via REST API
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8">
              Upload any ISO 14025 EPD PDF. Get back clean, validated, schema-mapped JSON in under
              3 seconds. Build EPD comparison tools, carbon calculators, and DPP pipelines on top.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">Get API access</Button>
              <Button href="/solutions/epd-to-dpp" variant="outline" size="lg">
                See EPD-to-DPP pipeline →
              </Button>
            </div>
          </div>
        </section>

        {/* Sample response */}
        <section className="section-padding bg-neutral-950">
          <div className="container-narrow">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sample API response</h2>
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-neutral-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-neutral-500 font-mono">POST /v1/epd/extract → 200 OK</span>
              </div>
              <pre className="px-6 py-5 text-sm text-green-400 font-mono overflow-x-auto leading-relaxed">
                {sampleResponse}
              </pre>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">API endpoints</h2>
              <p className="text-neutral-500">Everything you need to build EPD-powered applications.</p>
            </div>
            <div className="space-y-3">
              {endpoints.map((e) => (
                <div
                  key={e.path}
                  className="flex items-start gap-5 bg-neutral-50 rounded-xl border border-neutral-100 px-6 py-5"
                >
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0 mt-0.5 ${e.color}`}>
                    {e.method}
                  </span>
                  <div>
                    <code className="text-sm font-mono text-neutral-800 font-medium">{e.path}</code>
                    <p className="text-sm text-neutral-500 mt-1">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-12 text-center">Built for developers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-7 border border-neutral-100 hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <f.icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-12 text-center">What developers build with it</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {useCases.map((u) => (
                <div key={u.title} className="flex items-start gap-4 rounded-2xl border border-neutral-100 p-7">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{u.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{u.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-slate-900 text-white text-center">
          <div className="container-narrow">
            <Code2 className="w-12 h-12 mx-auto mb-5 text-blue-400" />
            <h2 className="text-3xl font-bold mb-4">Ready to build on EPD data?</h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
              Get sandbox API access and process your first EPD free. Production access from £199/mo.
            </p>
            <Button href="/contact" size="lg">Get API access</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
