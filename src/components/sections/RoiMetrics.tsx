"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 80,  suffix: "%",  label: "Reduction in compliance admin time" },
  { value: 3,   suffix: "x",  label: "Faster audit preparation" },
  { value: 100, suffix: "+",  label: "EU regulations mapped automatically" },
  { value: 40,  suffix: "%",  label: "Lower cost vs manual DPP creation" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        let start = 0;
        const step = () => {
          start += Math.ceil(target / 40);
          if (start >= target) { setCount(target); return; }
          setCount(start);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function RoiMetrics() {
  return (
    <section className="section-padding gradient-brand text-white">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">The business case is clear</h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Teams using floilan report measurable gains in compliance speed, cost, and audit readiness.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-5xl lg:text-6xl font-bold mb-3">
                <Counter target={m.value} suffix={m.suffix} />
              </div>
              <p className="text-white/70 text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
