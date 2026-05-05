import { Navbar }  from "@/components/layout/Navbar";
import { Footer }  from "@/components/layout/Footer";
import { Button }  from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const team = [
  { name: "Sarah Mitchell",  role: "CEO & Co-founder",   bio: "Former sustainability lead at Unilever. 12 years in EU regulatory compliance." },
  { name: "James Okafor",    role: "CTO & Co-founder",   bio: "Previously built supply chain data platforms at Amazon and RELEX Solutions." },
  { name: "Priya Nair",      role: "Head of Compliance", bio: "EU regulatory expert. Led ESPR implementation for a FTSE 250 manufacturer." },
  { name: "Tom Beech",       role: "Head of Product",    bio: "10 years in B2B SaaS. Previously at Akeneo and PTC Windchill." },
];

const values = [
  { title: "Transparency first",   body: "We believe product data should be open, accurate, and accessible — to buyers, regulators, and end consumers alike." },
  { title: "Regulation as an asset", body: "Compliance isn't a cost. Done right, it's a signal of quality that wins contracts and builds customer trust." },
  { title: "Practical over perfect", body: "We build tools that work in real supply chains, not just on whiteboards. Edge cases are our specialism." },
  { title: "Customer success = our success", body: "If you're not compliant and confident before your deadline, we haven't done our job." },
];

const milestones = [
  { year: "2021", event: "floilan founded in response to EU ESPR consultation" },
  { year: "2022", event: "First battery DPP prototype delivered to pilot partner" },
  { year: "2023", event: "Launched full platform. BBC News coverage." },
  { year: "2024", event: "Series A funding. Expanded to 5 industries." },
  { year: "2025", event: "EU Battery Regulation live. 10,000+ passports issued." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-50 via-white to-neutral-50 py-24">
          <div className="container-narrow text-center">
            <h1 className="text-5xl font-bold mb-6">We're making product compliance effortless</h1>
            <p className="text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              floilan was built because we saw how many manufacturers were unprepared for the EU's Digital Product Passport regulations — and how much manual work it took to even get close to compliant.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-5">Our mission</h2>
                <p className="text-neutral-500 leading-relaxed mb-5">
                  The EU's Ecodesign for Sustainable Products Regulation will require a Digital Product Passport for almost every physical product sold in Europe. For most manufacturers, that's a compliance nightmare they're not prepared for.
                </p>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  floilan exists to make that transition painless — and to turn compliance data into a competitive advantage for the companies that get ahead of it.
                </p>
                <Button href="/contact">
                  Work with us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <p className="text-5xl font-bold text-brand-600 mb-2">10,000+</p>
                <p className="text-neutral-600 text-sm mb-6">Digital Product Passports issued</p>
                <p className="text-3xl font-bold text-brand-600 mb-2">5</p>
                <p className="text-neutral-600 text-sm mb-6">Regulated industries covered</p>
                <p className="text-3xl font-bold text-brand-600 mb-2">100%</p>
                <p className="text-neutral-600 text-sm">Audit pass rate for floilan customers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-12 text-center">What we believe</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl border border-neutral-100 p-7">
                  <h3 className="font-semibold text-lg mb-3">{v.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-12 text-center">The team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 bg-brand-100 rounded-full mx-auto mb-4 flex items-center justify-center text-brand-700 text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-brand-600 text-sm mb-2">{member.role}</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-neutral-50">
          <div className="container-narrow">
            <h2 className="text-3xl font-bold mb-12 text-center">Our journey</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-brand-100" />
              <div className="space-y-8">
                {milestones.map((m) => (
                  <div key={m.year} className="flex items-start gap-6 pl-16 relative">
                    <div className="absolute left-5 top-1 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-brand-600 font-semibold text-sm mb-1">{m.year}</p>
                      <p className="text-neutral-700">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
