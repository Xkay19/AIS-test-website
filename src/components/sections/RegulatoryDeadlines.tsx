import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

const deadlines = [
  {
    date:       "Feb 2025",
    regulation: "EU Battery Regulation Phase 1",
    category:   "Batteries",
    status:     "active",
    note:       "QR code + DPP mandatory for EV, LMT, and industrial batteries",
  },
  {
    date:       "Jan 2026",
    regulation: "ESPR Furniture Ecodesign",
    category:   "Furniture",
    status:     "upcoming",
    note:       "Durability, repairability, and material content disclosure required",
  },
  {
    date:       "Jul 2026",
    regulation: "ESPR Fashion & Textiles",
    category:   "Fashion",
    status:     "upcoming",
    note:       "Fibre composition, microplastic labelling, and care instructions",
  },
  {
    date:       "Jan 2027",
    regulation: "EU Battery Regulation Phase 2",
    category:   "Batteries",
    status:     "upcoming",
    note:       "Full DPP with carbon footprint, supply chain due diligence",
  },
  {
    date:       "2027",
    regulation: "ESPR Construction Products",
    category:   "Construction",
    status:     "upcoming",
    note:       "Environmental Product Declarations and end-of-life data mandatory",
  },
];

const statusConfig = {
  active:    { icon: AlertCircle,   color: "text-amber-600", bg: "bg-amber-50", label: "Live now" },
  upcoming:  { icon: Clock,         color: "text-brand-600", bg: "bg-brand-50", label: "Upcoming" },
  compliant: { icon: CheckCircle2,  color: "text-green-600", bg: "bg-green-50", label: "Compliant" },
};

export function RegulatoryDeadlines() {
  return (
    <section className="section-padding bg-neutral-950 text-white">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Regulatory deadlines tracker</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Don't get caught out. Here are the key EU DPP deadlines your business needs to prepare for.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {deadlines.map((d) => {
            const s = statusConfig[d.status as keyof typeof statusConfig];
            return (
              <div
                key={d.regulation}
                className="flex items-start gap-4 bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
              >
                <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold">{d.regulation}</span>
                    <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">{d.category}</span>
                  </div>
                  <p className="text-sm text-neutral-400">{d.note}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-white">{d.date}</p>
                  <p className={`text-xs ${s.color}`}>{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
