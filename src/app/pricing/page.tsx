import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { Button }  from "@/components/ui/Button";
import { Check, X, FileText } from "lucide-react";

const plans = [
  {
    name:        "Starter",
    price:       "£299",
    period:      "/mo",
    description: "For small manufacturers getting their first DPPs live.",
    cta:         "Start free trial",
    href:        "/contact",
    highlight:   false,
    features: [
      { text: "Up to 100 product passports",  included: true },
      { text: "2 industries",                 included: true },
      { text: "QR code generation",           included: true },
      { text: "EU compliance checks",         included: true },
      { text: "Carbon analytics",             included: false },
      { text: "API access",                   included: false },
      { text: "AI compliance assistant",      included: false },
      { text: "Custom integrations",          included: false },
      { text: "Dedicated account manager",    included: false },
    ],
  },
  {
    name:        "Growth",
    price:       "£899",
    period:      "/mo",
    description: "For growing brands managing multiple product lines.",
    cta:         "Speak to sales",
    href:        "/contact",
    highlight:   true,
    badge:       "Most popular",
    features: [
      { text: "Up to 1,000 product passports", included: true },
      { text: "All industries",               included: true },
      { text: "QR & NFC generation",          included: true },
      { text: "EU compliance checks",         included: true },
      { text: "Carbon analytics",             included: true },
      { text: "API access",                   included: true },
      { text: "AI compliance assistant",      included: true },
      { text: "Custom integrations",          included: false },
      { text: "Dedicated account manager",    included: false },
    ],
  },
  {
    name:        "Enterprise",
    price:       "Custom",
    period:      "",
    description: "For large manufacturers with complex supply chains.",
    cta:         "Contact us",
    href:        "/contact",
    highlight:   false,
    features: [
      { text: "Unlimited product passports",  included: true },
      { text: "All industries",               included: true },
      { text: "QR & NFC generation",          included: true },
      { text: "EU compliance checks",         included: true },
      { text: "Carbon analytics",             included: true },
      { text: "API access",                   included: true },
      { text: "AI compliance assistant",      included: true },
      { text: "Custom integrations",          included: true },
      { text: "Dedicated account manager",    included: true },
    ],
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — all plans include a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What counts as a 'product passport'?",
    a: "Each unique SKU or product variant that has a published DPP record counts as one passport. Drafts and archived records don't count.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade at any time. If you upgrade mid-cycle, we prorate the difference.",
  },
  {
    q: "Do you offer annual pricing?",
    a: "Yes — annual billing gets you 2 months free (effectively a 17% discount).",
  },
  {
    q: "What integrations are included?",
    a: "Growth and Enterprise plans include our pre-built connectors for Akeneo, Pimcore, and Office 365. Custom integrations (ERP, Revit, etc.) are available on Enterprise.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-50 via-white to-neutral-50 py-20 text-center">
          <div className="container-narrow">
            <h1 className="text-5xl font-bold mb-5">Simple, transparent pricing</h1>
            <p className="text-xl text-neutral-500 max-w-xl mx-auto">
              Start with a 14-day free trial. No credit card. Cancel any time.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-8 relative ${
                    plan.highlight
                      ? "border-brand-500 shadow-xl shadow-brand-100"
                      : "border-neutral-200"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                  <p className="text-neutral-500 text-sm mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-neutral-400 text-sm">{plan.period}</span>
                  </div>

                  <Button
                    href={plan.href}
                    variant={plan.highlight ? "default" : "outline"}
                    className="w-full justify-center mb-8"
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-3 text-sm">
                        {f.included
                          ? <Check className="w-4 h-4 text-brand-600 flex-shrink-0" />
                          : <X     className="w-4 h-4 text-neutral-300 flex-shrink-0" />}
                        <span className={f.included ? "text-neutral-700" : "text-neutral-400"}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EPD add-on */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                    Add-on
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3">EPD Factory & Data Extraction API</h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Add EPD extraction capabilities to any floilan plan. Upload ISO 14025 EPD PDFs and
                  have them automatically converted into live Digital Product Passports — or consume
                  structured EPD data via REST API to power your own tools.
                </p>
                <ul className="space-y-2">
                  {[
                    "ISO 14025 PDF parsing — any programme operator",
                    "EN 15804 schema validation",
                    "Structured JSON output (40+ fields)",
                    "EPD → DPP one-click conversion",
                    "REST API with OpenAPI spec",
                    "EPD programme operator webhooks (IBU, EPD Norway, BRE)",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { tier: "EPD Factory",           price: "£149/mo", desc: "Up to 50 EPD extractions/mo. EPD → DPP conversion included. Suitable for manufacturers with a fixed product catalogue." },
                  { tier: "EPD API (Growth)",      price: "£299/mo", desc: "500 API calls/mo. Full REST API access with typed JSON responses. For developers building specifier tools, BIM plugins, or carbon platforms." },
                  { tier: "EPD API (Enterprise)",  price: "Custom",  desc: "Unlimited extractions. Programme operator webhooks. SLA, dedicated support, white-label option." },
                ].map((t) => (
                  <div key={t.tier} className="bg-white rounded-2xl border border-amber-200 p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-semibold text-neutral-900">{t.tier}</span>
                      <span className="text-xl font-bold text-amber-700">{t.price}</span>
                    </div>
                    <p className="text-sm text-neutral-500">{t.desc}</p>
                  </div>
                ))}
                <Button href="/contact" className="w-full justify-center">
                  Add EPD to my plan
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-neutral-50">
          <div className="container-narrow">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently asked questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-2xl border border-neutral-100 p-7">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
