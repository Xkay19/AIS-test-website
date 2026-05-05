"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Zap, FileText } from "lucide-react";

const perks = [
  { icon: FileText, text: "AI-powered document classification" },
  { icon: ShieldCheck, text: "Full ESPR 2024 compliance tracking" },
  { icon: Zap, text: "EPD → DPP in under 5 minutes" },
];

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // placeholder — wire up real auth here
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div className="min-h-screen flex">

      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a5c2e] via-[#0d7a3b] to-[#1aad56] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white blur-3xl" />
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 text-white text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          floilan
        </Link>

        {/* Headline */}
        <div className="relative z-10">
          <p className="text-white/60 text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Turn Product Compliance Into Competitive Advantage
          </p>
          <h2 className="text-4xl font-bold text-white leading-tight mb-8">
            Your compliance <br />command centre.
          </h2>
          <ul className="space-y-4">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-sm">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 border-t border-white/20 pt-6">
          <p className="text-white/70 text-sm italic leading-relaxed">
            &ldquo;floilan cut our DPP generation time from 3 days to 4 hours.&rdquo;
          </p>
          <p className="text-white/50 text-xs mt-2">— Head of Sustainability, UK Steel Manufacturer</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link href="/" className="text-2xl font-bold text-neutral-900" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            floilan
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome back</h1>
          <p className="text-neutral-500 mb-10">
            Don&apos;t have an account?{" "}
            <Link href="/contact" className="text-brand-600 font-medium hover:underline">
              Request access
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Work email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-brand-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-neutral-300 accent-brand-600 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-neutral-600 cursor-pointer">
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium py-3 rounded-xl transition-all text-sm shadow-sm hover:shadow-md"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-neutral-400">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* SSO */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", icon: "G" },
              { label: "Microsoft", icon: "M" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                className="flex items-center justify-center gap-2 border border-neutral-200 hover:border-neutral-300 rounded-xl py-2.5 text-sm text-neutral-700 font-medium hover:bg-neutral-50 transition-all"
              >
                <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-600">
                  {p.icon}
                </span>
                {p.label}
              </button>
            ))}
          </div>

          <p className="mt-10 text-xs text-neutral-400 text-center">
            By signing in you agree to our{" "}
            <Link href="/terms" className="hover:underline text-neutral-500">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="hover:underline text-neutral-500">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
