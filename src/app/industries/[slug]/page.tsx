import { notFound }   from "next/navigation";
import { Navbar }     from "@/components/layout/Navbar";
import { Footer }     from "@/components/layout/Footer";
import { Button }     from "@/components/ui/Button";
import { CtaBanner }  from "@/components/sections/CtaBanner";
import { industries, type IndustrySlug } from "@/lib/industries";
import { Check, ArrowRight, AlertCircle } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries[params.slug as IndustrySlug];
  if (!industry) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-50 via-white to-neutral-50 py-24">
          <div className="container-wide">
            <div className="max-w-3xl">
              <span className={`inline-flex text-xs font-medium px-3 py-1.5 rounded-full border mb-6 ${industry.color}`}>
                {industry.regulation}
              </span>
              <h1 className="text-5xl font-bold mb-5">{industry.name}</h1>
              <p className="text-xl text-neutral-600 mb-8">{industry.heroText}</p>
              <div className="flex gap-4 flex-wrap">
                <Button href="/contact" size="lg">
                  Speak to an expert <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button href="/pricing" variant="outline" size="lg">View pricing</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Deadline banner */}
        <div className="bg-amber-50 border-y border-amber-200 py-4">
          <div className="container-wide flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Compliance deadline:</strong> {industry.deadline} — {" "}
              <a href="/contact" className="underline">get a readiness assessment today</a>
            </p>
          </div>
        </div>

        {/* Description + challenges */}
        <section className="section-padding bg-white">
          <div className="container-wide grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-5">The compliance challenge</h2>
              <p className="text-neutral-500 leading-relaxed mb-8">{industry.description}</p>
              <ul className="space-y-3">
                {industry.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-neutral-600">
                    <span className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-500 font-bold text-xs">✕</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-5">What floilan delivers</h2>
              <ul className="space-y-4 mb-8">
                {industry.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact">Get started <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="section-padding gradient-brand text-white">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-12 text-center">Measured outcomes</h2>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {industry.outcomes.map((o) => (
                <div key={o.label}>
                  <p className="text-5xl font-bold mb-2">{o.metric}</p>
                  <p className="text-white/70 text-sm">{o.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
