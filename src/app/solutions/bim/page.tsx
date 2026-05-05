import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { Button }  from "@/components/ui/Button";
import {
  Layers, BarChart3, CheckCircle2, ArrowRight, FileText,
  Zap, Globe, ShieldCheck, Download, RefreshCw, Link2
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const workflow = [
  {
    step: "01",
    color: "bg-brand-600",
    title: "Specify a product in your BIM model",
    body: "Choose a structural element, façade panel, window, or MEP component in Revit or ArchiCAD. floilan's BIM connector searches its EPD library and auto-links the matching product passport.",
  },
  {
    step: "02",
    color: "bg-amber-600",
    title: "EPD carbon data pulls in automatically",
    body: "A1–A3 embodied carbon, material composition, and lifecycle data are attached to the BIM object as shared parameters. No copy-paste from PDFs. No manual data entry.",
  },
  {
    step: "03",
    color: "bg-blue-600",
    title: "Whole-building carbon calculated live",
    body: "As you design, floilan aggregates carbon across every specified product using EN 15978 methodology. Your running tally updates in real time against RIBA 2030 targets.",
  },
  {
    step: "04",
    color: "bg-purple-600",
    title: "Export to planning submissions & tools",
    body: "One click generates a carbon report for planning submissions. Export structured data to One Click LCA, EC3, or Structural Benchmark. The DPP QR code is embedded in the IFC file.",
  },
];

const features = [
  {
    icon: Layers,
    title: "Revit Connector",
    description: "Autodesk App Store plugin. Search the floilan EPD library from within Revit, link EPD data to families, and view carbon dashboards without leaving your model.",
    badge: "Revit 2023–2026",
  },
  {
    icon: Globe,
    title: "ArchiCAD GDL Objects",
    description: "Download BIM objects with EPD data pre-embedded as properties. Compatible with ArchiCAD 26+. GDL library updated monthly as new EPDs are registered.",
    badge: "ArchiCAD 26+",
  },
  {
    icon: FileText,
    title: "IFC 4.3 DPP Embedding",
    description: "Export IFC files with Digital Product Passport data embedded as IfcDocumentReference properties. Regulators and contractors scan the QR to access live passport data.",
    badge: "IFC 4.3",
  },
  {
    icon: BarChart3,
    title: "Whole-Building LCA (EN 15978)",
    description: "Aggregate EPD carbon data across every product in your model. Get a certified EN 15978 whole-building carbon assessment from your BIM model without a separate tool.",
    badge: "EN 15978",
  },
  {
    icon: ShieldCheck,
    title: "RIBA 2030 Carbon Budget Checker",
    description: "Live dashboard showing embodied carbon per m² against RIBA 2030 targets (UK) and LEVEL(s) benchmarks (EU). Flags elements that need lower-carbon alternatives.",
    badge: "RIBA 2030 / LEVEL(s)",
  },
  {
    icon: Download,
    title: "Carbon Material Schedule Export",
    description: "Generate a full material schedule with EPD references, A1–A3 carbon per element, and total embodied carbon — ready for planning authority submissions and BREEAM assessments.",
    badge: "BREEAM / LEED",
  },
  {
    icon: RefreshCw,
    title: "EPD Update Notifications",
    description: "When a manufacturer updates or renews their EPD, floilan notifies you and re-validates the linked BIM elements. Your whole-building carbon figure stays current.",
    badge: "Live sync",
  },
  {
    icon: Link2,
    title: "One Click LCA / EC3 Export",
    description: "Export structured EPD data directly to One Click LCA and the EC3 (Embodied Carbon in Construction Calculator) without manual re-entry. Cuts reporting time by 90%.",
    badge: "One Click LCA / EC3",
  },
];

const integrations = [
  { name: "Autodesk Revit",     years: "2023–2026",  type: "Plugin"      },
  { name: "ArchiCAD",           years: "26+",         type: "GDL Library" },
  { name: "IES VE",             years: "all",         type: "API"         },
  { name: "Nemetschek Allplan", years: "2024+",       type: "API"         },
  { name: "One Click LCA",      years: "all",         type: "Export"      },
  { name: "EC3 (Carbon Cure)",  years: "all",         type: "Export"      },
  { name: "Structural Benchmark","years": "all",      type: "Export"      },
  { name: "Autodesk Construction Cloud", years: "all", type: "Connector" },
];

const useCases = [
  {
    role: "Structural Engineer",
    pain: "Manual A1–A3 carbon lookup for every steel beam and concrete element — 2–3 days per project.",
    gain: "Carbon data auto-linked to every structural member from Revit family. RIBA 2030 check in one click.",
  },
  {
    role: "Architect",
    pain: "Façade and envelope products specified without EPD data — flagged at planning stage.",
    gain: "EPD auto-suggested as each material is specified. IFC exported with DPP references embedded.",
  },
  {
    role: "Sustainability Consultant",
    pain: "Aggregating EPD data from 30+ products into a whole-building carbon figure takes 3 days.",
    gain: "Whole-building EN 15978 LCA generated directly from the BIM model in under 5 minutes.",
  },
  {
    role: "M&E Engineer",
    pain: "HVAC and mechanical products rarely have EPDs. Scope 3 embodied carbon is untracked.",
    gain: "MEP product EPD library with 2,000+ items. Unlinked products flagged for client chasing.",
  },
];

const metrics = [
  { value: "3×",     label: "faster RIBA 2030 reporting" },
  { value: "90%",    label: "less manual data transfer" },
  { value: "100%",   label: "of specified products linked to EPDs" },
  { value: "EN 15978", label: "certified whole-building LCA" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BimIntegrationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-900 py-24 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #0d9488 0%, transparent 60%)" }} />
          <div className="container-narrow text-center relative z-10">
            <span className="inline-block bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold px-3 py-1 rounded-full mb-5">
              BIM Integration
            </span>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Pull EPD carbon data directly<br className="hidden sm:block" /> into your BIM model
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-10">
              floilan connects to Revit, ArchiCAD, and IFC workflows — attaching live EPD data to
              every specified product and running whole-building EN 15978 carbon calculations
              as you design.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">
                Book a BIM demo <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Button>
              <Button href="/solutions/epd" variant="outline" size="lg">
                EPD Factory →
              </Button>
            </div>
          </div>
        </section>

        {/* ── Metrics ── */}
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

        {/* ── How it works ── */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">How BIM integration works</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                From product specification to planning submission — automated at every step.
              </p>
            </div>

            <div className="space-y-5">
              {workflow.map((s) => (
                <div key={s.step} className="flex items-start gap-6 bg-white rounded-2xl border border-neutral-100 p-7 hover:border-brand-200 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 rounded-2xl ${s.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Live BIM dashboard preview ── */}
        <section className="section-padding bg-neutral-900 text-white">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Live carbon dashboard — inside Revit</h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                The floilan Revit connector shows your running whole-building carbon figure as a panel
                inside Revit. No switching between tools.
              </p>
            </div>

            {/* Mock dashboard */}
            <div className="max-w-4xl mx-auto bg-neutral-800 rounded-3xl border border-neutral-700 overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3 bg-neutral-900 border-b border-neutral-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex items-center gap-2 ml-4">
                  <Layers className="w-4 h-4 text-brand-400" />
                  <span className="text-xs text-neutral-400 font-medium">floilan BIM Connector — Office Block A, Level 3</span>
                </div>
              </div>

              <div className="p-8 grid lg:grid-cols-3 gap-6">
                {/* Left — carbon summary */}
                <div className="lg:col-span-1 space-y-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Whole-building carbon</p>
                  <div className="bg-neutral-900 rounded-2xl p-5">
                    <p className="text-neutral-400 text-xs mb-1">Total embodied carbon (A1–A3)</p>
                    <p className="text-4xl font-bold text-brand-400">847</p>
                    <p className="text-neutral-400 text-xs">kg CO₂e / m² GIA</p>
                    <div className="mt-3 h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: "68%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                      <span>Current</span>
                      <span className="text-amber-400">RIBA 2030: 750 kg</span>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    <p className="text-amber-300 text-xs font-semibold mb-1">⚠ 13% over RIBA 2030 target</p>
                    <p className="text-neutral-400 text-xs">Structural steel contributing 34% of total. 3 lower-carbon alternatives available.</p>
                  </div>
                </div>

                {/* Right — product list */}
                <div className="lg:col-span-2">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-4">Specified products — EPD status</p>
                  <div className="space-y-2">
                    {[
                      { name: "S355 HEB200 Structural Steel", epd: "IBU — EPD-IES-0021409", carbon: "1.84 kg CO₂e/kg", status: "linked",   pct: 34 },
                      { name: "C30/37 Ready-Mix Concrete",   epd: "InformEPD — 000265",   carbon: "0.21 kg CO₂e/kg", status: "linked",   pct: 28 },
                      { name: "Kingspan Kooltherm K15",      epd: "BRE — EPD-BRE-0019",   carbon: "2.10 kg CO₂e/kg", status: "linked",   pct: 12 },
                      { name: "Schüco AWS 75 BS.SI Window",  epd: "Searching…",           carbon: "—",               status: "searching", pct: 0 },
                      { name: "Proctor Wraptite Membrane",   epd: "Not found",            carbon: "—",               status: "missing",  pct: 0 },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center justify-between bg-neutral-900 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            p.status === "linked"    ? "bg-green-400" :
                            p.status === "searching" ? "bg-amber-400 animate-pulse" :
                            "bg-red-400"
                          }`} />
                          <div className="min-w-0">
                            <p className="text-sm text-white font-medium truncate">{p.name}</p>
                            <p className="text-xs text-neutral-500 truncate">{p.epd}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className={`text-sm font-bold ${p.carbon === "—" ? "text-neutral-600" : "text-brand-400"}`}>{p.carbon}</p>
                          {p.pct > 0 && <p className="text-xs text-neutral-500">{p.pct}% of total</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <div className="w-2 h-2 rounded-full bg-green-400" /> EPD linked
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <div className="w-2 h-2 rounded-full bg-amber-400" /> Searching
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <div className="w-2 h-2 rounded-full bg-red-400" /> No EPD found
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">Everything in BIM integration</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl p-7 border border-neutral-100 hover:border-brand-200 hover:shadow-md transition-all group">
                  <div className="w-11 h-11 bg-neutral-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-50 transition-colors">
                    <f.icon className="w-5 h-5 text-neutral-500 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <span className="inline-block text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-100 px-2 py-0.5 rounded-full mb-3">
                    {f.badge}
                  </span>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases by role ── */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-12 text-center">Designed for every role in the project team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((u) => (
                <div key={u.role} className="bg-white rounded-2xl border border-neutral-100 p-8">
                  <p className="inline-block text-xs font-bold bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full mb-4">
                    {u.role}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wide">Without floilan</p>
                      <p className="text-sm text-red-800 leading-relaxed">{u.pain}</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wide">With floilan</p>
                      <p className="text-sm text-green-900 leading-relaxed">{u.gain}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Compatible software ── */}
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <h2 className="text-3xl font-bold mb-10 text-center">Compatible BIM software & tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {integrations.map((t) => (
                <div key={t.name} className="flex items-center justify-between bg-neutral-50 rounded-xl border border-neutral-100 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span className="text-sm font-semibold text-neutral-800">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">{t.years}</span>
                    <span className="text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-100 px-2 py-0.5 rounded-full">
                      {t.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Standards ── */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-10 text-center">Standards & frameworks supported</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { std: "EN 15804:2012+A2:2019", desc: "Product-level EPD standard — lifecycle modules A1–D" },
                { std: "EN 15978:2011",         desc: "Whole-building sustainability assessment" },
                { std: "ISO 14025:2006",         desc: "Environmental declarations (Type III EPD)" },
                { std: "RIBA 2030 Challenge",    desc: "UK embodied carbon targets per building type" },
                { std: "LEVEL(s) EU",            desc: "European whole-life carbon reporting framework" },
                { std: "IFC 4.3",                desc: "BIM open standard — DPP data embedded as properties" },
                { std: "BREEAM Mat 01–06",       desc: "Credits for EPD data and responsible sourcing" },
                { std: "LEED MR Credit",         desc: "Materials and resources credits via EPD data" },
                { std: "ESPR 2024",              desc: "EU mandatory DPP requirement — construction products" },
              ].map((s) => (
                <div key={s.std} className="bg-white rounded-xl border border-neutral-100 px-5 py-4">
                  <p className="font-semibold text-sm text-neutral-900 mb-1">{s.std}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding bg-neutral-900 text-white text-center">
          <div className="container-narrow">
            <Zap className="w-12 h-12 mx-auto mb-5 text-brand-400" />
            <h2 className="text-3xl font-bold mb-4">
              Stop entering EPD data manually.<br className="hidden sm:block" /> Connect your BIM model to live passports.
            </h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
              Book a 30-minute demo and we&apos;ll walk through your Revit model with the floilan
              connector installed. Live, not slides.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button href="/contact" size="lg">Book a BIM demo</Button>
              <Button href="/solutions/epd" variant="outline" size="lg">
                EPD Factory →
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
