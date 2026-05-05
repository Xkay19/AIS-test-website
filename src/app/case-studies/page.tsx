import { Navbar }      from "@/components/layout/Navbar";
import { Footer }      from "@/components/layout/Footer";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CtaBanner }   from "@/components/sections/CtaBanner";

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-brand-50 via-white to-neutral-50 py-20 text-center">
          <div className="container-narrow">
            <h1 className="text-5xl font-bold mb-5">Customer stories</h1>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Real manufacturers, real deadlines, real results. See how companies across industries are using floilan to get ahead of EU compliance.
            </p>
          </div>
        </section>
        <CaseStudies />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
