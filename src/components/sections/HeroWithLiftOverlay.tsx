"use client";

import { motion } from "motion/react";
import { HeroScrub } from "@/components/ui/hero-scrub";
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowUpDown,
  QrCode,
  Activity,
} from "lucide-react";

/* ── Floating stat pill ────────────────────────────────────────────── */
function StatPill({
  icon,
  label,
  value,
  delay,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-lg pointer-events-none ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="text-emerald-300">{icon}</span>
      <span className="text-white/70 text-xs font-medium">{label}</span>
      <span className="text-white text-xs font-bold">{value}</span>
    </motion.div>
  );
}

/* ── Floating compliance badge ─────────────────────────────────────── */
function ComplianceBadge({
  items,
  delay,
  className,
  style,
}: {
  items: { label: string; ok: boolean }[];
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl pointer-events-none ${className}`}
      style={style}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase mb-3">
        Lift Compliance Index
      </div>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 py-1">
          <CheckCircle2
            className={`h-3.5 w-3.5 shrink-0 ${item.ok ? "text-emerald-400" : "text-amber-400"}`}
          />
          <span className="text-white/80 text-[11px] font-medium">{item.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Floating metric card ──────────────────────────────────────────── */
function MetricCard({
  value,
  label,
  sub,
  icon,
  delay,
  className,
  style,
}: {
  value: string;
  label: string;
  sub?: string;
  icon: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl pointer-events-none w-44 ${className}`}
      style={style}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-emerald-300">{icon}</span>
        <span className="text-[10px] font-bold tracking-wider text-white/60 uppercase">{label}</span>
      </div>
      <div className="text-2xl font-black text-white leading-none">{value}</div>
      {sub && <div className="text-[10px] text-white/50 mt-1">{sub}</div>}
    </motion.div>
  );
}

/* ── Trust badges row ──────────────────────────────────────────────── */
const trustBadges = [
  { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "EN 81-20 Lift Safety" },
  { icon: <Zap className="h-3.5 w-3.5" />, label: "ESPR 2024 Ready" },
  { icon: <QrCode className="h-3.5 w-3.5" />, label: "Scannable DPPs" },
  { icon: <ArrowUpDown className="h-3.5 w-3.5" />, label: "Lift & Escalator Passports" },
];

/* ── Main export ───────────────────────────────────────────────────── */
export function HeroWithLiftOverlay() {
  return (
    <div className="relative">
      {/* HeroScrub — unchanged */}
      <HeroScrub
        frameCount={1}
        frameUrl={() =>
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85&fit=crop"
        }
        titleTop="Floilan"
        titleBottom="Passports"
        accentHex="#059669"
        bgClassName="bg-emerald-700"
      />

      {/* ── Overlaid content in the sticky viewport ── */}
      {/*
          These are layered OVER the sticky HeroScrub via a matching sticky
          container so they sit exactly in the same 100svh viewport.
          z-30 sits above HeroScrub's z-10 content.
      */}
      <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: "100svh" }}>
        <div className="sticky top-0 h-[100svh] w-full">

          {/* ── Trust badge strip — fills gap ABOVE the card ── */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 w-full px-6"
            style={{ top: "13%" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {trustBadges.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 border border-white/15 backdrop-blur-sm text-[11px] font-medium text-white/80"
              >
                <span className="text-emerald-300">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </motion.div>

          {/* ── Tagline — directly below trust badges ── */}
          <motion.p
            className="absolute left-1/2 -translate-x-1/2 text-center text-white/60 text-sm font-medium max-w-xl px-6"
            style={{ top: "19%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            Automate EU ESPR 2024 compliance for lifts, escalators, and building products —
            one scannable passport per asset.
          </motion.p>

          {/* ── Left compliance checklist ── */}
          <ComplianceBadge
            delay={1.1}
            className="hidden lg:block left-6 xl:left-12"
            style={{ top: "24%" }}
            items={[
              { label: "EN 81-20 Lift Safety", ok: true },
              { label: "EN 81-50 Test Methods", ok: true },
              { label: "Machinery Directive", ok: true },
              { label: "ESPR Article 12 DPP", ok: true },
              { label: "Supply Chain Trace", ok: true },
            ]}
          />

          {/* ── Right metric cards ── */}
          <MetricCard
            delay={1.2}
            value="2,450+"
            label="Lift Passports"
            sub="Generated this month"
            icon={<ArrowUpDown className="h-4 w-4" />}
            className="hidden lg:block right-6 xl:right-12"
            style={{ top: "22%" }}
          />

          <MetricCard
            delay={1.35}
            value="99.1%"
            label="Compliance Rate"
            sub="Across all registered lifts"
            icon={<Activity className="h-4 w-4" />}
            className="hidden lg:block right-6 xl:right-12"
            style={{ top: "38%" }}
          />

          {/* ── Floating stat pills — fills gap BELOW the card ── */}
          <StatPill
            delay={1.4}
            icon={<ShieldCheck className="h-3.5 w-3.5" />}
            label="Inspections automated"
            value="14,820"
            className="hidden md:flex bottom-[14%] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:left-[18%]"
          />

          <StatPill
            delay={1.5}
            icon={<QrCode className="h-3.5 w-3.5" />}
            label="QR scans today"
            value="3,291"
            className="hidden lg:flex bottom-[14%] right-[18%]"
          />

          {/* ── CTA row below card ── */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 bottom-[6%] w-full justify-center px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.55 }}
          >
            <a
              href="#cta"
              className="pointer-events-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-zinc-900 text-sm font-bold shadow-lg hover:bg-zinc-100 transition-colors"
              aria-label="Book a Demo"
            >
              Book a Demo
            </a>
            <a
              href="#features"
              className="pointer-events-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white text-sm font-semibold backdrop-blur-sm hover:bg-white/10 transition-colors"
              aria-label="Explore Platform"
            >
              Explore Platform
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
