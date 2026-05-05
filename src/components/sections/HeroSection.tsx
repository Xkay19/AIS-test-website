import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

const industries = [
  { emoji: "🔋", label: "Batteries" },
  { emoji: "🏗️", label: "Construction" },
  { emoji: "👚", label: "Fashion" },
  { emoji: "🪑", label: "Furniture" },
  { emoji: "🛞", label: "Tyres" },
  { emoji: "💡", label: "Electronics" },
  { emoji: "🏠", label: "Buildings" },
  { emoji: "⚡", label: "EV Charging" },
];

const stats = [
  { value: "14,400+", label: "products passported" },
  { value: "< 5 min", label: "EPD to live DPP" },
  { value: "100%",    label: "ESPR schema coverage" },
  { value: "3 cases", label: "£2.1M+ customer value" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-neutral-50 -z-10" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-3xl -z-10" />

      <div className="container-wide py-20 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
          EU ESPR 2024 is live — compliance deadlines start 2025
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-slide-up max-w-4xl">
          Custom Digital Product Passports{" "}
          <span className="text-gradient">at scale</span>
        </h1>

        <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-2xl animate-slide-up">
          Build, publish, and manage EU-compliant Digital Product Passports for every regulated
          industry — from batteries to fashion. Make your products{" "}
          <span className="font-semibold text-neutral-800">compliant, transparent, and traceable.</span>
        </p>

        {/* Industry emoji strip */}
        <div className="flex flex-wrap items-center gap-2 mb-10 animate-fade-in">
          {industries.map((ind) => (
            <span
              key={ind.label}
              className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 text-neutral-700 text-sm px-3 py-1.5 rounded-full shadow-sm font-medium"
            >
              <span>{ind.emoji}</span>
              {ind.label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-slide-up">
          <Button href="/contact" size="lg">
            Book a demo <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button href="/solutions/epd-to-dpp" variant="outline" size="lg">
            <Play className="w-4 h-4 mr-2" /> See EPD → DPP pipeline
          </Button>
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 px-4 py-3 underline underline-offset-4"
          >
            Read case studies →
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl animate-fade-in">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/80 backdrop-blur border border-neutral-100 rounded-2xl px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-neutral-900 mb-0.5">{s.value}</p>
              <p className="text-xs text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
