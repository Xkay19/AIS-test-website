const steps = [
  {
    step: "01",
    title: "Connect your product data",
    description: "Import from your PIM, ERP, or spreadsheet. floilan maps your existing data to DPP data fields automatically.",
  },
  {
    step: "02",
    title: "AI fills the compliance gaps",
    description: "Our AI identifies missing mandatory fields, suggests values, and flags non-compliant attributes before you publish.",
  },
  {
    step: "03",
    title: "Publish & distribute passports",
    description: "Generate QR codes and NFC tags. Embed passports on product pages. Share with buyers, auditors, or regulators via link.",
  },
  {
    step: "04",
    title: "Monitor & update automatically",
    description: "When regulations change, floilan alerts you and re-validates your passports. Stay compliant without manual effort.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Up and running in days, not months</h2>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto">
            No lengthy implementation. No consultants. Connect your data and your first DPPs are live within a week.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-brand-100 -translate-y-1/2 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm mb-5">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
