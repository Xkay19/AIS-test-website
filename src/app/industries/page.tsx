import { Navbar }     from "@/components/layout/Navbar";
import { Footer }     from "@/components/layout/Footer";
import { Industries } from "@/components/sections/Industries";
import { CtaBanner }  from "@/components/sections/CtaBanner";

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-brand-50 via-white to-neutral-50 py-20 text-center">
          <div className="container-narrow">
            <h1 className="text-5xl font-bold mb-5">Built for every regulated industry</h1>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Each sector has its own DPP requirements. floilan ships pre-configured templates, validation rules, and standards mappings for every one.
            </p>
          </div>
        </section>
        <Industries />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
