"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const industries = ["Construction", "Batteries", "Tyres", "Furniture", "Fashion", "Other"];
const sizes      = ["1–10", "11–50", "51–200", "201–1000", "1000+"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white border border-neutral-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Message sent</h3>
        <p className="text-neutral-500">
          Thanks for getting in touch. A member of our team will be with you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="First name" name="first_name" required />
        <Field label="Last name"  name="last_name"  required />
      </div>
      <Field label="Work email"    name="email"   type="email"   required />
      <Field label="Company name"  name="company"                required />

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Industry</label>
        <select
          name="industry"
          required
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
        >
          <option value="">Select your industry</option>
          {industries.map((i) => <option key={i}>{i}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company size</label>
        <select
          name="size"
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
        >
          <option value="">Select team size</option>
          {sizes.map((s) => <option key={s}>{s} employees</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">How can we help?</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your products, your compliance challenges, or any upcoming deadlines..."
          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full justify-center" size="lg">
        {loading ? "Sending…" : "Send message"}
      </Button>

      <p className="text-xs text-neutral-400 text-center">
        We'll never share your details. See our{" "}
        <a href="/privacy" className="underline hover:text-neutral-700">Privacy Policy</a>.
      </p>
    </form>
  );
}

function Field({
  label, name, type = "text", required,
}: {
  label: string; name: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
    </div>
  );
}
