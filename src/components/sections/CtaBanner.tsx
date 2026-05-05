import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-12 lg:p-16 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Ready to meet your DPP deadline?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Speak to an expert today. We'll map your products to the right regulations and show you exactly what needs to happen before your deadline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg" variant="secondary">
              Speak to an Expert <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/demo" size="lg" variant="ghost-white">
              Watch 3-min demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
