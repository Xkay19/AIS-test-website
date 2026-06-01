"use client";

// Dashboard is always server-rendered on demand — never pre-rendered at build time
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Layers,
  ShieldCheck,
  TrendingUp,
  Network,
  BarChart2,
  Plug,
  Settings,
  Bell,
  HelpCircle,
  Plus,
  ChevronDown,
  ChevronLeft,
  Search,
  MoreHorizontal,
  QrCode,
  Info,
  Calendar,
  CheckCircle2,
  RefreshCcw,
  Wrench,
  Recycle,
  Wind,
  Award,
  Clock,
} from "lucide-react";

/* ─────────────────────────────────────────────
   SVG Charts
───────────────────────────────────────────── */
function LineChart() {
  // Approximate the line from the screenshot
  const points = [
    [0, 130], [40, 120], [80, 110], [120, 125], [160, 115],
    [200, 120], [240, 105], [280, 110], [320, 95], [360, 85],
    [400, 90], [440, 80], [480, 75], [520, 82], [560, 70],
  ];
  const w = 560;
  const h = 150;
  const maxY = 180;

  // Build smooth path
  const toSvg = ([x, y]: number[]) => `${x},${h - (y / maxY) * h}`;
  const d = points.map((p, i) => (i === 0 ? `M ${toSvg(p)}` : `L ${toSvg(p)}`)).join(" ");
  const area = `${d} L ${w},${h} L 0,${h} Z`;

  const yLabels = ["300k", "200k", "100k", "0"];
  const xLabels = ["May 12", "May 19", "May 26", "Jun 02", "Jun 09"];

  return (
    <div className="relative w-full">
      <div className="flex">
        {/* Y axis labels */}
        <div className="flex flex-col justify-between text-[10px] text-zinc-400 pr-3 py-1 h-[150px] text-right w-10 shrink-0">
          {yLabels.map((l) => <span key={l}>{l}</span>)}
        </div>
        {/* Chart */}
        <div className="flex-1 min-w-0">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[150px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((v) => (
              <line key={v} x1="0" y1={h * v} x2={w} y2={h * v} stroke="#f4f4f5" strokeWidth="1" />
            ))}
            {/* Area fill */}
            <path d={area} fill="url(#areaGrad)" />
            {/* Line */}
            <path d={d} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            {/* Dots */}
            {points.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
              <circle key={i} cx={x} cy={h - (y / maxY) * h} r="3" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
            ))}
          </svg>
          {/* X axis */}
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1 px-0.5">
            {xLabels.map((l) => <span key={l}>{l}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function DonutChart() {
  const segments = [
    { label: "Concrete", value: 48.9, count: "1,20,450", color: "#10b981", stroke: "#10b981" },
    { label: "Steel", value: 34.7, count: "85,300", color: "#6366f1", stroke: "#6366f1" },
    { label: "Battery Cells", value: 10.5, count: "25,640", color: "#a78bfa", stroke: "#a78bfa" },
    { label: "Aluminum", value: 5.2, count: "12,750", color: "#c4b5fd", stroke: "#c4b5fd" },
    { label: "Other", value: 0.7, count: "1,540", color: "#d1d5db", stroke: "#d1d5db" },
  ];

  const r = 52;
  const cx = 65;
  const cy = 65;
  const circumference = 2 * Math.PI * r;

  let cumulative = 0;
  const arcs = segments.map((seg) => {
    const offset = circumference * (1 - cumulative / 100);
    const dash = circumference * (seg.value / 100);
    cumulative += seg.value;
    return { ...seg, offset, dash };
  });

  return (
    <div className="flex items-center gap-6">
      <div className="shrink-0 relative">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f4f4f5" strokeWidth="18" />
          {arcs.map((arc, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={arc.stroke}
              strokeWidth="18"
              strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
              strokeDashoffset={arc.offset}
              style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-extrabold text-zinc-900">2,45,680</span>
          <span className="text-[9px] text-zinc-400">kg CO₂e</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 text-xs">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: seg.color }} />
              <span className="text-zinc-600">{seg.label}</span>
            </div>
            <span className="font-semibold text-zinc-800 tabular-nums">
              {seg.count} <span className="text-zinc-400 font-normal">({seg.value}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sidebar
───────────────────────────────────────────── */
const navItems = [
  { icon: <LayoutDashboard className="h-4 w-4" />, label: "Overview", active: true },
  { icon: <FileText className="h-4 w-4" />, label: "Digital Product Passports" },
  { icon: <Layers className="h-4 w-4" />, label: "Materials" },
  { icon: <ShieldCheck className="h-4 w-4" />, label: "Compliance" },
  { icon: <TrendingUp className="h-4 w-4" />, label: "Carbon Analytics" },
  { icon: <Network className="h-4 w-4" />, label: "Supply Chain" },
  { icon: <BarChart2 className="h-4 w-4" />, label: "Reports" },
  { icon: <Plug className="h-4 w-4" />, label: "Integrations" },
  { icon: <Settings className="h-4 w-4" />, label: "Settings" },
];

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside
      className={`shrink-0 h-screen sticky top-0 flex flex-col border-r border-zinc-100 bg-white transition-all duration-220 ${
        collapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-[60px] border-b border-zinc-100 shrink-0">
        <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
          <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        {!collapsed && (
          <span className="text-base font-black tracking-tight text-zinc-900 whitespace-nowrap">
            Floilan
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5" aria-label="Dashboard navigation">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
              item.active
                ? "bg-emerald-50 text-emerald-700"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
            aria-current={item.active ? "page" : undefined}
            title={collapsed ? item.label : undefined}
          >
            <span className={`shrink-0 ${item.active ? "text-emerald-600" : ""}`}>{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User profile */}
      <div className="border-t border-zinc-100 p-3 shrink-0">
        {!collapsed ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <div>
                <p className="text-xs font-bold text-zinc-900">Acme Construction</p>
                <p className="text-[10px] text-zinc-400">Enterprise Plan</p>
              </div>
            </div>
            <button className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-indigo-700">JC</span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-zinc-900 leading-tight">James Carter</p>
                  <p className="text-[10px] text-zinc-400 leading-tight">james@acmebuild.com</p>
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-indigo-700">JC</span>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="mt-2 flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition-colors"
        >
          <ChevronLeft className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   Top bar
───────────────────────────────────────────── */
function TopBar() {
  return (
    <header className="flex items-center justify-between gap-4 h-[60px] px-6 border-b border-zinc-100 bg-white shrink-0">
      <div>
        <h1 className="text-base font-bold text-zinc-900 leading-tight">
          Good morning, James 👋
        </h1>
        <p className="text-xs text-zinc-400">Here&apos;s what&apos;s happening with your product compliance today.</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" aria-hidden />
          <input
            type="search"
            placeholder="Search for materials, passports, reports..."
            className="h-9 w-72 pl-9 pr-10 text-xs rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
            aria-label="Search"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-zinc-400 font-mono bg-zinc-100 px-1 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
        <button className="relative h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors" aria-label="Notifications">
          <Bell className="h-4 w-4 text-zinc-500" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white" aria-label="2 unread notifications" />
        </button>
        <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors" aria-label="Help">
          <HelpCircle className="h-4 w-4 text-zinc-500" />
        </button>
        <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-colors shadow-sm">
          <Plus className="h-3.5 w-3.5" />
          New Passport
          <ChevronDown className="h-3 w-3 opacity-70" />
        </button>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Metric cards
───────────────────────────────────────────── */
type Trend = { value: string; up: boolean };

function MiniSparkline({ color = "#10b981", up = true }: { color?: string; up?: boolean }) {
  const pts = up
    ? [[0, 40], [20, 35], [40, 30], [60, 32], [80, 20], [100, 15]]
    : [[0, 15], [20, 20], [40, 18], [60, 25], [80, 22], [100, 30]];
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  return (
    <svg viewBox="0 0 100 50" className="w-20 h-8" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function MetricCard({
  title, value, sub, trend, extra, sparkColor,
}: {
  title: string; value: React.ReactNode; sub: string; trend?: Trend; extra?: React.ReactNode; sparkColor?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500">{title}</span>
        <button className="text-zinc-300 hover:text-zinc-500 transition-colors" aria-label="More options">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">{value}</div>
          <div className="text-xs text-zinc-400">{sub}</div>
        </div>
        {extra || <MiniSparkline color={sparkColor} up={trend?.up} />}
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className={trend.up ? "text-emerald-600" : "text-red-500"}>
            {trend.up ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-zinc-400 font-normal">vs Apr 12 — May 11</span>
        </div>
      )}
    </div>
  );
}

function ComplianceGauge({ score }: { score: number }) {
  const r = 36;
  const cx = 45;
  const cy = 45;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * (score / 100);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-[90px] h-[90px]">
        <svg viewBox="0 0 90 90" className="w-full h-full">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f4f4f5" strokeWidth="8" />
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke="#10b981" strokeWidth="8"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={circumference / 4}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-zinc-900 leading-none">{score}</span>
          <span className="text-[9px] text-zinc-400">/100</span>
        </div>
      </div>
      <span className="text-xs font-bold text-emerald-600">Excellent</span>
      <span className="text-[10px] text-zinc-400 text-center leading-tight">Your compliance status is above industry average.</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DPP Table
───────────────────────────────────────────── */
const dppRows = [
  {
    name: "Steel Beam – S355",
    id: "SB-355-2024-001",
    category: "Steel",
    categoryColor: "bg-blue-50 text-blue-700",
    manufacturer: "Acme Steel Works",
    region: "Europe",
    score: 95,
    grade: "Excellent",
    gradeColor: "text-emerald-600",
    carbon: "18,450",
    created: "Jun 12, 2024\n09:15 AM",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80&fit=crop",
  },
  {
    name: "Concrete – C30/37",
    id: "CON-C3037-2024-045",
    category: "Concrete",
    categoryColor: "bg-amber-50 text-amber-700",
    manufacturer: "BuildRight Materials",
    region: "Europe",
    score: 90,
    grade: "Excellent",
    gradeColor: "text-emerald-600",
    carbon: "12,750",
    created: "Jun 12, 2024\n08:47 AM",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=80&q=80&fit=crop",
  },
  {
    name: "EV Battery Cell – NMC 811",
    id: "BATT-NMC811-2024-009",
    category: "Battery",
    categoryColor: "bg-violet-50 text-violet-700",
    manufacturer: "VoltTech Energy",
    region: "Asia",
    score: 88,
    grade: "Good",
    gradeColor: "text-amber-600",
    carbon: "8,230",
    created: "Jun 11, 2024\n04:32 PM",
    img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=80&q=80&fit=crop",
  },
];

function ScoreCircle({ score, grade, color }: { score: number; grade: string; color: string }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const dash = c * (score / 100);
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 36 36" className="w-full h-full" aria-hidden>
          <circle cx="18" cy="18" r={r} fill="none" stroke="#f4f4f5" strokeWidth="3.5" />
          <circle cx="18" cy="18" r={r} fill="none" stroke="#10b981" strokeWidth="3.5"
            strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={c / 4} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-bold text-zinc-900">{score}</span>
        </div>
      </div>
      <span className={`text-xs font-semibold ${color}`}>{grade}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Compliance checklist
───────────────────────────────────────────── */
const checklistItems = [
  { label: "Durability", status: "compliant", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
  { label: "Reusability", status: "compliant", icon: <RefreshCcw className="h-4 w-4 text-emerald-500" /> },
  { label: "Upgradability", status: "compliant", icon: <TrendingUp className="h-4 w-4 text-emerald-500" /> },
  { label: "Reparability", status: "compliant", icon: <Wrench className="h-4 w-4 text-emerald-500" /> },
  { label: "Recycled Content", status: "progress", icon: <Recycle className="h-4 w-4 text-amber-500" /> },
  { label: "Carbon Footprint Disclosure", status: "compliant", icon: <Wind className="h-4 w-4 text-emerald-500" /> },
  { label: "Digital Product Passport", status: "compliant", icon: <Award className="h-4 w-4 text-emerald-500" /> },
];

/* ─────────────────────────────────────────────
   Main Dashboard Page
───────────────────────────────────────────── */
export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [dashData, setDashData] = useState<Record<string, unknown> | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => { setDashData(d); setLoadingData(false); })
      .catch(() => setLoadingData(false));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Merge live data over mock fallbacks
  const metrics = dashData?.metrics as Record<string, number> | undefined;
  const livePassports = dashData?.recentPassports as typeof dppRows | undefined;
  const liveCompliance = dashData?.compliance as { check_name: string; status: string }[] | undefined;
  const orgName = (dashData?.org as { name?: string })?.name;
  const userName = (dashData?.user as { fullName?: string })?.fullName;

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-5" aria-label="Dashboard content">

          {/* Date range */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm">
              <Calendar className="h-3.5 w-3.5 text-zinc-400" />
              May 12 — Jun 12, 2024
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </button>
          </div>

          {/* ── Metric cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <MetricCard
              title="Digital Product Passports"
              value="1,248"
              sub="Total Passports"
              trend={{ value: "18.2%", up: true }}
              sparkColor="#6366f1"
            />
            <MetricCard
              title="ESPR 2024 Compliance Score"
              value={<span className="sr-only">92/100</span>}
              sub=""
              extra={<ComplianceGauge score={92} />}
            />
            <MetricCard
              title="Total Carbon (kg CO₂e)"
              value="2,45,680"
              sub="Total Emissions"
              trend={{ value: "12.6%", up: false }}
              sparkColor="#10b981"
            />
            <MetricCard
              title="Materials in Scope"
              value="342"
              sub="Unique Materials"
              trend={{ value: "7.3%", up: true }}
              sparkColor="#8b5cf6"
            />
          </div>

          {/* ── Charts row ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-4">
            {/* Line chart */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900">Carbon Emissions Over Time</span>
                    <Info className="h-3.5 w-3.5 text-zinc-300" aria-hidden />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-black text-zinc-900">2,45,680 <span className="text-sm font-medium text-zinc-400">kg CO₂e</span></span>
                    <span className="text-xs font-semibold text-red-500">↓ 12.6%</span>
                    <span className="text-xs text-zinc-400">vs Apr 12 — May 11</span>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Daily <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              <LineChart />
            </div>

            {/* Donut chart */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900">Emissions by Material Type</span>
                  <Info className="h-3.5 w-3.5 text-zinc-300" aria-hidden />
                </div>
                <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  View full report
                </button>
              </div>
              <DonutChart />
            </div>
          </div>

          {/* ── Bottom row ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-4">
            {/* DPP Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <span className="text-sm font-bold text-zinc-900">Recent Digital Product Passports</span>
                <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  View all Passports
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs" aria-label="Recent Digital Product Passports">
                  <thead>
                    <tr className="border-b border-zinc-100">
                      {["Material / Product", "Category", "Manufacturer", "ESPR Score", "Carbon (kg CO₂e)", "Created At", "Passport QR"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-semibold text-zinc-400 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {dppRows.map((row) => (
                      <tr key={row.id} className="hover:bg-zinc-50/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={row.img} alt="" className="h-9 w-9 rounded-lg object-cover shrink-0" aria-hidden />
                            <div>
                              <div className="font-semibold text-zinc-900">{row.name}</div>
                              <div className="text-zinc-400 font-mono text-[10px]">{row.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${row.categoryColor}`}>
                            {row.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-zinc-700">{row.manufacturer}</div>
                          <div className="text-zinc-400">{row.region}</div>
                        </td>
                        <td className="px-4 py-3">
                          <ScoreCircle score={row.score} grade={row.grade} color={row.gradeColor} />
                        </td>
                        <td className="px-4 py-3 font-semibold text-zinc-800 tabular-nums">{row.carbon}</td>
                        <td className="px-4 py-3 text-zinc-500 whitespace-pre-line leading-tight">{row.created}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-zinc-900 rounded flex items-center justify-center">
                              <QrCode className="h-4 w-4 text-white" aria-label={`QR code for ${row.name}`} />
                            </div>
                            <button className="text-zinc-300 hover:text-zinc-500 transition-colors" aria-label="More options">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compliance checklist */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-zinc-900">ESPR 2024 Compliance Checklist</span>
                <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  View all
                </button>
              </div>
              <div className="flex flex-col divide-y divide-zinc-50">
                {checklistItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2.5 text-sm text-zinc-700 font-medium">
                      {item.icon}
                      {item.label}
                    </div>
                    {item.status === "compliant" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-2.5 w-2.5" aria-hidden /> Compliant
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        <Clock className="h-2.5 w-2.5" aria-hidden /> In Progress
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
