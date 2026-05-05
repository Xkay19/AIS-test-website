import Link from "next/link";
import { Building2, Battery, Circle, Sofa, Shirt, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Building2,
    name: "Construction",
    regulation: "EN 15804 / ESPR 2024",
    description: "Embodied carbon, material declarations, and end-of-life data for structural products.",
    href: "/industries/construction",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Battery,
    name: "Batteries",
    regulation: "EU Reg 2023/1542",
    description: "State of health, carbon footprint, and due diligence for EV and industrial batteries.",
    href: "/industries/batteries",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Circle,
    name: "Tyres",
    regulation: "EU Tyre Label Reg",
    description: "Rolling resistance, wet grip, noise ratings, and end-of-life tracking.",
    href: "/industries/tyres",
    color: "bg-slate-50 text-slate-600",
  },
  {
    icon: Sofa,
    name: "Furniture",
    regulation: "ESPR 2024",
    description: "Material composition, repairability scores, and disassembly instructions.",
    href: "/industries/furniture",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Shirt,
    name: "Fashion & Textiles",
    regulation: "ESPR / Ecodesign",
    description: "Fibre composition, microplastics, care labelling, and circularity data.",
    href: "/industries/fashion",
    color: "bg-rose-50 text-rose-600",
  },
];

export function Industries() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Built for your industry</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Each industry has its own regulatory framework. floilan ships pre-configured templates, standards mappings, and validation rules for every sector.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => (
            <Link
              key={ind.name}
              href={ind.href}
              className="bg-white rounded-2xl p-7 border border-neutral-100 hover:border-brand-200 hover:shadow-md transition-all group"
            >
              <div className={`w-11 h-11 rounded-lg ${ind.color} flex items-center justify-center mb-5`}>
                <ind.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1">{ind.regulation}</p>
              <h3 className="font-semibold text-lg mb-2">{ind.name}</h3>
              <p className="text-neutral-500 text-sm mb-4 leading-relaxed">{ind.description}</p>
              <span className="text-brand-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
