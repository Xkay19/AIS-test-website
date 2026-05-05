import { Layers, ArrowRight } from "lucide-react";

const categories = [
  {
    label: "ERP Systems",
    tools: ["SAP S/4HANA", "Microsoft Dynamics 365", "Oracle NetSuite", "Sage 200"],
  },
  {
    label: "PIM / Data",
    tools: ["Akeneo PIM", "Pimcore", "inRiver", "Salsify"],
  },
  {
    label: "BIM / Design",
    tools: ["Autodesk Revit", "ArchiCAD", "Nemetschek Allplan", "IES VE"],
    featured: true,
    href: "/solutions/bim",
  },
  {
    label: "Carbon / LCA",
    tools: ["One Click LCA", "SimaPro", "EC3", "Tally"],
  },
  {
    label: "Supply Chain",
    tools: ["Sedex", "EcoVadis", "Sourcemap", "Assent"],
  },
  {
    label: "Office & Collab",
    tools: ["Microsoft 365", "SharePoint", "Slack", "Salesforce"],
  },
];

export function Integrations() {
  return (
    <section className="section-padding bg-neutral-50 border-t border-neutral-100">
      <div className="container-wide">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-50 text-brand-700 border border-brand-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Integrations
          </span>
          <h2 className="text-4xl font-bold mb-4">
            DPPs live inside your existing tools
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Connect floilan to your ERP, PIM, BIM software, and carbon tools.
            No ripping out what already works.
          </p>
        </div>

        {/* BIM featured spotlight */}
        <div className="bg-neutral-900 rounded-2xl p-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-brand-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-white font-semibold">BIM Integration</p>
              <span className="text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-400/30 px-2 py-0.5 rounded-full">New</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Pull EPD carbon data directly into Revit and ArchiCAD. Whole-building EN 15978 carbon calculated live as you design. RIBA 2030 checker included.
            </p>
          </div>
          <a
            href="/solutions/bim"
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex-shrink-0"
          >
            See BIM integration <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`bg-white rounded-2xl border p-7 transition-all ${
                cat.featured
                  ? "border-brand-200 shadow-md shadow-brand-50"
                  : "border-neutral-100 hover:border-brand-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">
                  {cat.label}
                </p>
                {cat.featured && cat.href && (
                  <a href={cat.href} className="text-xs text-brand-600 font-medium hover:underline flex items-center gap-1">
                    Full guide <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className={`inline-block text-sm px-3 py-1.5 rounded-lg font-medium border ${
                      cat.featured
                        ? "bg-brand-50 border-brand-100 text-brand-800"
                        : "bg-neutral-50 border-neutral-200 text-neutral-700"
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-neutral-500">
            Don&apos;t see your tool?{" "}
            <a href="/contact" className="text-brand-600 font-medium hover:underline">
              Ask us about custom integrations →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
