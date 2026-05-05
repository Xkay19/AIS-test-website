const clients = [
  { name: "NovaBatt UK",      width: 100 },
  { name: "FrameWorks Ltd",   width: 120 },
  { name: "Woven & Co.",      width: 95  },
  { name: "Tread Systems",    width: 110 },
  { name: "Nordic Form",      width: 100 },
  { name: "BrightSteel",      width: 105 },
  { name: "CircularBuild",    width: 115 },
];

const platformStats = [
  { value: "34",       label: "customers" },
  { value: "919,000+", label: "objects in service" },
  { value: "86%",      label: "client satisfaction" },
  { value: "200+",     label: "compliance rules checked" },
];

export function SocialProof() {
  return (
    <section className="border-y border-neutral-100 bg-white py-14">
      <div className="container-wide">
        {/* Client logos */}
        <p className="text-center text-xs text-neutral-400 mb-7 uppercase tracking-widest font-semibold">
          Trusted by manufacturers across the EU
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {clients.map((c) => (
            <div
              key={c.name}
              className="h-8 bg-neutral-100 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
              style={{ width: c.width }}
              aria-label={c.name}
            />
          ))}
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100 border border-neutral-100 rounded-2xl overflow-hidden bg-neutral-50">
          {platformStats.map((s) => (
            <div key={s.label} className="px-6 py-6 text-center">
              <p className="text-3xl font-bold text-neutral-900 mb-1">{s.value}</p>
              <p className="text-sm text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
