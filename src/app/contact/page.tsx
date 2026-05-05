import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const details = [
  { icon: Mail,   label: "Email",   value: "hello@floilan.com" },
  { icon: Phone,  label: "Phone",   value: "+44 20 7946 0000" },
  { icon: MapPin, label: "Office",  value: "London, United Kingdom" },
  { icon: Clock,  label: "Hours",   value: "Mon–Fri, 9am–6pm GMT" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-50 via-white to-neutral-50 py-20">
          <div className="container-wide text-center">
            <h1 className="text-5xl font-bold mb-5">Talk to an expert</h1>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Whether you have a specific deadline approaching or just want to understand what DPPs mean for your business — we're here to help.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-wide grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: info */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
              <p className="text-neutral-500 mb-10 leading-relaxed">
                Fill in the form and one of our compliance specialists will get back to you within one business day. No hard sell — just a genuine conversation about your product data challenges.
              </p>

              <div className="space-y-6 mb-12">
                {details.map((d) => (
                  <div key={d.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <d.icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wide">{d.label}</p>
                      <p className="font-medium text-neutral-900">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
                <p className="text-sm text-brand-800 font-medium mb-1">Typical first meeting outcome:</p>
                <p className="text-sm text-brand-700">
                  A clear map of which EU regulations apply to your products, which deadlines are approaching, and a recommended action plan — completely free, no commitment.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
