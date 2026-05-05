import type { EpdRecord, ValidationIssue, ValidationResult } from "./schema";

// ─── Rule definitions ─────────────────────────────────────────────────────────

type Rule = {
  id:       string;
  label:    string;
  severity: "error" | "warning" | "info";
  check:    (epd: Partial<EpdRecord>) => boolean;
  message:  (epd: Partial<EpdRecord>) => string;
};

const RULES: Rule[] = [
  // ── Product info completeness ─────────────────────────────────────────────
  {
    id: "P001",
    label: "Product name present",
    severity: "error",
    check: (e) => !!e.product?.name && e.product.name !== "Unknown Product",
    message: () => "Product name is missing or could not be extracted.",
  },
  {
    id: "P002",
    label: "Declared unit present",
    severity: "error",
    check: (e) => !!e.product?.declared_unit,
    message: () => "Declared unit is required by EN 15804 §7.3.1.",
  },
  {
    id: "P003",
    label: "Manufacturer name present",
    severity: "warning",
    check: (e) => !!e.product?.manufacturer,
    message: () => "Manufacturer name not found. Required for traceability.",
  },

  // ── EPD metadata ──────────────────────────────────────────────────────────
  {
    id: "E001",
    label: "EPD reference number present",
    severity: "error",
    check: (e) => !!e.epd_info?.epd_number,
    message: () => "EPD registration number is required for traceability.",
  },
  {
    id: "E002",
    label: "Programme operator identified",
    severity: "error",
    check: (e) => !!e.epd_info?.programme_operator,
    message: () => "Programme operator (e.g. IBU, EPD Norway) must be identified.",
  },
  {
    id: "E003",
    label: "EN 15804 standard referenced",
    severity: "error",
    check: (e) => !!e.epd_info?.standard && /EN\s*15804|ISO\s*14025/i.test(e.epd_info.standard),
    message: () => "EN 15804 or ISO 14025 standard reference not found.",
  },
  {
    id: "E004",
    label: "Validity date present",
    severity: "warning",
    check: (e) => !!e.epd_info?.valid_until,
    message: () => "EPD validity date not extracted. EPDs expire after 5 years.",
  },
  {
    id: "E005",
    label: "Third-party verifier identified",
    severity: "warning",
    check: (e) => !!e.epd_info?.verifier,
    message: () => "Independent verifier not identified. EN 15804 requires third-party verification.",
  },

  // ── Carbon / GWP ─────────────────────────────────────────────────────────
  {
    id: "C001",
    label: "GWP data present",
    severity: "error",
    check: (e) => {
      const v = e.carbon?.values;
      return !!v && Object.values(v).some((x) => x !== null && x !== undefined);
    },
    message: () => "Global Warming Potential (GWP) data is mandatory under EN 15804.",
  },
  {
    id: "C002",
    label: "Manufacturing stage A1-A3 GWP present",
    severity: "error",
    check: (e) => e.carbon?.values?.a1_a3 != null,
    message: () => "GWP A1-A3 (manufacturing) is a mandatory EN 15804 module.",
  },
  {
    id: "C003",
    label: "GWP A1-A3 value is positive",
    severity: "error",
    check: (e) => {
      const v = e.carbon?.values?.a1_a3;
      return v == null || v > 0;
    },
    message: () => "GWP A1-A3 should be a positive number (production always has embodied carbon).",
  },
  {
    id: "C004",
    label: "End-of-life modules C1-C4 declared",
    severity: "warning",
    check: (e) => {
      const v = e.carbon?.values;
      return !!v && (v.c1 != null || v.c2 != null || v.c3 != null || v.c4 != null);
    },
    message: () => "End-of-life stage C1–C4 GWP values not found. Required for full lifecycle coverage.",
  },
  {
    id: "C005",
    label: "Module D (recycling benefit) declared",
    severity: "info",
    check: (e) => e.carbon?.values?.d != null,
    message: () => "Module D (beyond system boundary / recycling benefits) not declared.",
  },

  // ── Other EN 15804 mandatory indicators ──────────────────────────────────
  {
    id: "I001",
    label: "ODP indicator present",
    severity: "warning",
    check: (e) => !!e.indicators?.odp,
    message: () => "Ozone Depletion Potential (ODP) is a mandatory EN 15804 indicator.",
  },
  {
    id: "I002",
    label: "AP indicator present",
    severity: "warning",
    check: (e) => !!e.indicators?.ap,
    message: () => "Acidification Potential (AP) is a mandatory EN 15804 indicator.",
  },
  {
    id: "I003",
    label: "POCP indicator present",
    severity: "warning",
    check: (e) => !!e.indicators?.pocp,
    message: () => "Photochemical Ozone Creation Potential (POCP) is a mandatory EN 15804 indicator.",
  },

  // ── Materials ─────────────────────────────────────────────────────────────
  {
    id: "M001",
    label: "Material composition declared",
    severity: "warning",
    check: (e) => !!e.materials && e.materials.length > 0,
    message: () => "Material composition not found. Required for ESPR DPP schema.",
  },
  {
    id: "M002",
    label: "Material percentages sum to ~100%",
    severity: "warning",
    check: (e) => {
      const mats = e.materials;
      if (!mats || mats.length < 2) return true;
      const withPct = mats.filter((m) => m.percentage != null);
      if (withPct.length < 2) return true;
      const sum = withPct.reduce((acc, m) => acc + (m.percentage ?? 0), 0);
      return sum >= 90 && sum <= 110;
    },
    message: (e) => {
      const sum = (e.materials ?? [])
        .filter((m) => m.percentage != null)
        .reduce((acc, m) => acc + (m.percentage ?? 0), 0);
      return `Material percentages sum to ${sum.toFixed(1)}% — expected ~100%.`;
    },
  },

  // ── DPP readiness ─────────────────────────────────────────────────────────
  {
    id: "D001",
    label: "Sufficient data for DPP conversion",
    severity: "info",
    check: (e) => {
      const hasCarbon  = e.carbon?.values?.a1_a3 != null;
      const hasProduct = !!e.product?.name && e.product.name !== "Unknown Product";
      const hasEpd     = !!e.epd_info?.epd_number;
      return hasCarbon && hasProduct && hasEpd;
    },
    message: () => "Minimum fields for DPP conversion not yet met. Resolve errors above first.",
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
// Errors cost 10 pts each, warnings 3 pts, info 0 pts. Floor at 0.
function score(issues: ValidationIssue[]): number {
  const deductions = issues.reduce((acc, i) => {
    if (i.severity === "error")   return acc + 10;
    if (i.severity === "warning") return acc + 3;
    return acc;
  }, 0);
  return Math.max(0, 100 - deductions);
}

// ─── Main validator ───────────────────────────────────────────────────────────
export function validateEpd(epd: Partial<EpdRecord>): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const rule of RULES) {
    let passed: boolean;
    try {
      passed = rule.check(epd);
    } catch {
      passed = false;
    }

    if (!passed) {
      issues.push({
        field:    rule.id,
        severity: rule.severity,
        message:  `[${rule.id}] ${rule.message(epd)}`,
      });
    }
  }

  const s = score(issues);

  return {
    passed:       issues.filter((i) => i.severity === "error").length === 0,
    score:        s,
    issues,
    checked_at:   new Date().toISOString(),
    rules_run:    RULES.length,
    rules_passed: RULES.length - issues.length,
  };
}

// ─── DPP readiness check (quick boolean) ─────────────────────────────────────
export function isDppReady(epd: Partial<EpdRecord>): boolean {
  return (
    !!epd.product?.name &&
    epd.product.name !== "Unknown Product" &&
    !!epd.epd_info?.epd_number &&
    !!epd.epd_info?.programme_operator &&
    epd.carbon?.values?.a1_a3 != null
  );
}
