import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cases = [
  {
    industry: "Batteries",
    company:  "NovaBatt UK",
    headline: "EU Battery Passport live across 12,000 EV cells in 6 weeks",
    excerpt:  "NovaBatt needed to comply with EU Reg 2023/1542 before their OEM contract renewal. floilan delivered a complete DPP pipeline — from supply chain data collection to QR-tagged cells — without disrupting production.",
    metric:   { value: "6 wks", label: "time to compliance" },
    href:     "/case-studies/novabatt",
  },
  {
    industry: "Construction",
    company:  "FrameWorks Ltd",
    headline: "68% cut in embodied carbon reporting time for structural steel",
    excerpt:  "FrameWorks' sustainability team was spending 3 days per project manually assembling carbon data for planning submissions. floilan automated the entire process, pulling live data from their ERP.",
    metric:   { value: "68%", label: "time saved on EPD reports" },
    href:     "/case-studies/frameworks",
  },
  {
    industry: "Fashion",
    company:  "Woven & Co.",
    headline: "End-to-end fibre transparency for 2,400 SKUs across 14 suppliers",
    excerpt:  "Woven & Co. used floilan to build DPPs for their entire SS25 collection — tracking fibre origin, dye processes, and end-of-life pathways. Buyers can now scan any garment for full transparency.",
    metric:   { value: "2,400", label: "SKUs passported" },
    href:     "/case-studies/woven-co",
  },
];

export function CaseStudies() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-3">Real results, real industries</h2>
            <p className="text-neutral-500 max-w-lg">
              See how manufacturers and brands are using floilan to get ahead of EU compliance deadlines.
            </p>
          </div>
          <Link href="/case-studies" className="text-sm text-brand-600 font-medium flex items-center gap-1 whitespace-nowrap hover:gap-2 transition-all">
            All case studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <Link
              key={c.company}
              href={c.href}
              className="group flex flex-col border border-neutral-100 rounded-2xl overflow-hidden hover:border-brand-200 hover:shadow-md transition-all"
            >
              {/* Top colour bar */}
              <div className="h-2 gradient-brand" />

              <div className="p-7 flex flex-col flex-1">
                <p className="text-xs font-medium text-brand-600 uppercase tracking-widest mb-1">{c.industry}</p>
                <p className="text-sm font-semibold text-neutral-500 mb-3">{c.company}</p>
                <h3 className="font-semibold text-lg leading-snug mb-4">{c.headline}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed flex-1 mb-6">{c.excerpt}</p>

                <div className="flex items-center justify-between border-t border-neutral-100 pt-5">
                  <div>
                    <p className="text-2xl font-bold text-brand-600">{c.metric.value}</p>
                    <p className="text-xs text-neutral-400">{c.metric.label}</p>
                  </div>
                  <span className="text-brand-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read case study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
