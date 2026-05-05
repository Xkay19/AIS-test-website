import { notFound }  from "next/navigation";
import { Navbar }    from "@/components/layout/Navbar";
import { Footer }    from "@/components/layout/Footer";
import { Button }    from "@/components/ui/Button";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { caseStudies, type CaseStudySlug } from "@/lib/case-studies";
import { ArrowLeft, Quote } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies[params.slug as CaseStudySlug];
  if (!cs) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-50 via-white to-neutral-50 py-20">
          <div className="container-narrow">
            <Button href="/case-studies" variant="ghost" size="sm" className="mb-8 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-1" /> All case studies
            </Button>
            <p className="text-brand-600 text-sm font-medium uppercase tracking-widest mb-3">{cs.industry}</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight">{cs.headline}</h1>
            <p className="text-xl text-neutral-500">{cs.company}</p>
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-white border-b border-neutral-100 py-10">
          <div className="container-narrow">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {cs.results.map((r) => (
                <div key={r.label} className="text-center">
                  <p className="text-3xl font-bold text-brand-600 mb-1">{r.metric}</p>
                  <p className="text-xs text-neutral-400">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="section-padding bg-white">
          <div className="container-narrow space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">The challenge</h2>
              <p className="text-neutral-600 leading-relaxed">{cs.challenge}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">The solution</h2>
              <p className="text-neutral-600 leading-relaxed">{cs.solution}</p>
            </div>

            {/* Quote */}
            <blockquote className="bg-brand-50 border border-brand-100 rounded-2xl p-8">
              <Quote className="w-8 h-8 text-brand-300 mb-4" />
              <p className="text-neutral-800 text-lg leading-relaxed mb-4 italic">"{cs.quote.text}"</p>
              <p className="text-sm text-neutral-500 font-medium">— {cs.quote.author}</p>
            </blockquote>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
