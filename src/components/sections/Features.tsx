import { QrCode, BarChart3, ShieldCheck, Bot, Plug, Globe, FileText, Code2 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "EPD Factory",
    description: "Upload any ISO 14025 EPD PDF and get a regulator-ready Digital Product Passport in under 5 minutes. No manual data entry.",
  },
  {
    icon: Code2,
    title: "EPD Data Extraction API",
    description: "REST API that parses EPD PDFs into structured JSON — carbon stages, material declarations, lifecycle modules. Build EPD-powered tools on top.",
  },
  {
    icon: QrCode,
    title: "QR & NFC Passports",
    description: "Generate scannable product passports instantly. Customers, auditors, and regulators access live data with a single scan.",
  },
  {
    icon: BarChart3,
    title: "Carbon Analytics",
    description: "Automated lifecycle carbon calculations at every production stage. No spreadsheets, no consultants needed.",
  },
  {
    icon: ShieldCheck,
    title: "Real-time Compliance",
    description: "Continuous checks against EU ESPR, Battery Regulation, and industry standards. Alerts before you fail an audit.",
  },
  {
    icon: Bot,
    title: "AI Compliance Assistant",
    description: "Ask plain English questions about any product's compliance status. Your 24/7 regulatory analyst.",
  },
  {
    icon: Plug,
    title: "API & Integrations",
    description: "REST API with connectors for Akeneo, Pimcore, Autodesk Revit, and Office 365. DPPs live inside your existing workflows.",
  },
  {
    icon: Globe,
    title: "Multi-language & Multi-market",
    description: "Publish passports in any EU language. Manage product data across markets from a single source of truth.",
  },
];

export function Features() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Everything you need to stay compliant</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            One platform. Every regulated product category. Zero manual spreadsheet work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 [&>:first-child]:lg:col-span-2 [&>:nth-child(2)]:lg:col-span-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-8 border border-neutral-100 hover:border-brand-200 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                <f.icon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
