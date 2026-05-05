"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const hourlyRates: Record<string, number> = {
  "Junior compliance officer": 35,
  "Senior compliance manager":  65,
  "External consultant":       150,
};

export function RoiCalculator() {
  const [skus,    setSkus]    = useState(100);
  const [hours,   setHours]   = useState(3);
  const [role,    setRole]    = useState("Senior compliance manager");
  const [audits,  setAudits]  = useState(4);

  const results = useMemo(() => {
    const rate        = hourlyRates[role];
    const manualCost  = skus * hours * rate + audits * 8 * rate;
    const platformFee = skus <= 100 ? 299 : skus <= 1000 ? 899 : 1800;
    const annualFee   = platformFee * 12;
    const saving      = manualCost - annualFee;
    const roi         = Math.round((saving / annualFee) * 100);
    const timeSaved   = Math.round(skus * hours * 0.8);
    return { manualCost, annualFee, saving, roi, timeSaved };
  }, [skus, hours, role, audits]);

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Calculate your ROI</h2>
          <p className="text-neutral-500 text-lg">
            See how much time and money floilan saves your compliance team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-8 space-y-7">
            <SliderField
              label="Number of product SKUs"
              value={skus}
              min={10} max={5000} step={10}
              format={(v) => v.toLocaleString()}
              onChange={setSkus}
            />
            <SliderField
              label="Hours to create one DPP manually"
              value={hours}
              min={0.5} max={20} step={0.5}
              format={(v) => `${v} hrs`}
              onChange={setHours}
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">Who handles compliance?</label>
              <div className="space-y-2">
                {Object.keys(hourlyRates).map((r) => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={() => setRole(r)}
                      className="accent-brand-600"
                    />
                    <span className="text-sm text-neutral-700">{r} (£{hourlyRates[r]}/hr)</span>
                  </label>
                ))}
              </div>
            </div>
            <SliderField
              label="Regulatory audits per year"
              value={audits}
              min={1} max={12} step={1}
              format={(v) => `${v}`}
              onChange={setAudits}
            />
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-100 p-8">
              <p className="text-sm text-neutral-500 mb-1">Current annual cost (manual)</p>
              <p className="text-4xl font-bold text-red-500">£{results.manualCost.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-100 p-8">
              <p className="text-sm text-neutral-500 mb-1">floilan annual cost</p>
              <p className="text-4xl font-bold text-neutral-900">£{results.annualFee.toLocaleString()}</p>
            </div>
            <div className="gradient-brand rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-1">Annual saving</p>
                  <p className="text-3xl font-bold">
                    {results.saving > 0 ? `£${results.saving.toLocaleString()}` : "Break even"}
                  </p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">ROI</p>
                  <p className="text-3xl font-bold">
                    {results.roi > 0 ? `${results.roi}%` : "—"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-white/70 text-sm mb-1">Compliance hours saved/year</p>
                  <p className="text-3xl font-bold">{results.timeSaved.toLocaleString()} hrs</p>
                </div>
              </div>
            </div>
            <Button href="/contact" size="lg" className="w-full justify-center">
              Get a detailed proposal <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  label, value, min, max, step, format, onChange,
}: {
  label: string;
  value: number;
  min: number; max: number; step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-neutral-700">{label}</label>
        <span className="text-sm font-semibold text-brand-600">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
      />
      <div className="flex justify-between text-xs text-neutral-400 mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
