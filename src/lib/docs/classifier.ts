import type { DocType, ExtractedField, DocStatus } from "./schema";
import { createRequire } from "module";
const _req = createRequire(import.meta.url);
const { PDFParse } = _req("pdf-parse") as {
  PDFParse: new (opts: { data: Buffer }) => { getText(): Promise<{ text: string }> };
};

// ─── Type classification rules ────────────────────────────────────────────────
const TYPE_RULES: Array<{
  type:    DocType;
  label:   string;
  score:   (text: string, name: string) => number;
  reason:  string;
}> = [
  {
    type: "epd", label: "Environmental Product Declaration",
    score: (t, n) =>
      (/environmental\s+product\s+declaration/i.test(t) ? 60 : 0) +
      (/EN\s*15804|ISO\s*14025/i.test(t) ? 20 : 0) +
      (/EPD[-–]\w{2,}/i.test(t) ? 10 : 0) +
      (/programme\s+operator|verified\s+by/i.test(t) ? 10 : 0) +
      (/epd/i.test(n) ? 5 : 0),
    reason: "Document contains EN 15804 / ISO 14025 standard references and EPD programme metadata.",
  },
  {
    type: "ce_declaration", label: "CE Declaration of Performance",
    score: (t, n) =>
      (/declaration\s+of\s+performance|DoP/i.test(t) ? 60 : 0) +
      (/CE\s+mark|construction\s+products\s+regulation|CPR/i.test(t) ? 25 : 0) +
      (/dop|ce[_\-\s]decl/i.test(n) ? 10 : 0),
    reason: "Declaration of Performance under EU Construction Products Regulation detected.",
  },
  {
    type: "reach_declaration", label: "REACH Substance Declaration",
    score: (t, n) =>
      (/REACH|registration.*evaluation.*authorisation/i.test(t) ? 55 : 0) +
      (/substance.*concern|SVHC|candidate\s+list/i.test(t) ? 30 : 0) +
      (/reach/i.test(n) ? 10 : 0),
    reason: "REACH regulation references and SVHC substance declaration language detected.",
  },
  {
    type: "rohs_certificate", label: "RoHS Compliance Certificate",
    score: (t, n) =>
      (/RoHS|restriction.*hazardous\s+substances/i.test(t) ? 65 : 0) +
      (/directive\s*2011\/65/i.test(t) ? 25 : 0) +
      (/rohs/i.test(n) ? 10 : 0),
    reason: "RoHS Directive 2011/65/EU compliance language and restricted substances detected.",
  },
  {
    type: "iso_14001", label: "ISO 14001 Certificate",
    score: (t, _n) =>
      (/ISO\s*14001/i.test(t) ? 70 : 0) +
      (/environmental\s+management\s+system/i.test(t) ? 20 : 0) +
      (/certificate\s+of\s+registration|accredited/i.test(t) ? 10 : 0),
    reason: "ISO 14001 Environmental Management System certification document.",
  },
  {
    type: "iso_9001", label: "ISO 9001 Certificate",
    score: (t, _n) =>
      (/ISO\s*9001/i.test(t) ? 70 : 0) +
      (/quality\s+management\s+system/i.test(t) ? 20 : 0) +
      (/certificate\s+of\s+registration|accredited/i.test(t) ? 10 : 0),
    reason: "ISO 9001 Quality Management System certification document.",
  },
  {
    type: "supplier_declaration", label: "Supplier Declaration",
    score: (t, n) =>
      (/supplier\s+declaration|declaration\s+of\s+conformity/i.test(t) ? 50 : 0) +
      (/due\s+diligence|OECD|conflict\s+minerals/i.test(t) ? 30 : 0) +
      (/supplier/i.test(n) ? 10 : 0),
    reason: "Supplier due diligence declaration with compliance attestation language.",
  },
  {
    type: "test_report", label: "Test Report",
    score: (t, n) =>
      (/test\s+report|laboratory\s+report|test\s+results/i.test(t) ? 50 : 0) +
      (/accredited\s+(?:by|laboratory)|ISO\s*17025/i.test(t) ? 30 : 0) +
      (/pass|fail|within\s+tolerance/i.test(t) ? 10 : 0) +
      (/test[_\-\s]?report/i.test(n) ? 10 : 0),
    reason: "Test report from an accredited laboratory with result data.",
  },
  {
    type: "bill_of_materials", label: "Bill of Materials",
    score: (t, n) =>
      (/bill\s+of\s+material|BOM|material\s+composition/i.test(t) ? 55 : 0) +
      (/part\s+number|component|assembly/i.test(t) ? 25 : 0) +
      (/bom|bill.*material/i.test(n) ? 10 : 0),
    reason: "Bill of materials with component, part number, and composition data.",
  },
  {
    type: "safety_data_sheet", label: "Safety Data Sheet",
    score: (t, n) =>
      (/safety\s+data\s+sheet|SDS|MSDS/i.test(t) ? 65 : 0) +
      (/GHS|hazard\s+statement|CAS\s+number/i.test(t) ? 25 : 0) +
      (/sds|msds/i.test(n) ? 10 : 0),
    reason: "Safety Data Sheet with GHS/CLP hazard classifications and CAS references.",
  },
  {
    type: "carbon_report", label: "Carbon Footprint Report",
    score: (t, n) =>
      (/carbon\s+footprint|scope\s+[123]|GHG\s+inventory/i.test(t) ? 50 : 0) +
      (/kg\s*CO[₂2]|tonnes?\s+CO[₂2]/i.test(t) ? 25 : 0) +
      (/ISO\s*14064|GHG\s+protocol/i.test(t) ? 15 : 0) +
      (/carbon|ghg/i.test(n) ? 10 : 0),
    reason: "Carbon footprint or GHG inventory report with CO₂e measurement data.",
  },
  {
    type: "audit_report", label: "Audit Report",
    score: (t, n) =>
      (/audit\s+report|inspection\s+report/i.test(t) ? 55 : 0) +
      (/findings|corrective\s+action|non[\s-]?conformance/i.test(t) ? 30 : 0) +
      (/audit/i.test(n) ? 10 : 0),
    reason: "Third-party audit or inspection report with findings and corrective actions.",
  },
];

// ─── Date extraction helpers ──────────────────────────────────────────────────
const ISO_DATE = /(\d{4}-\d{2}-\d{2})/g;
const UK_DATE  = /(\d{1,2})[./](\d{1,2})[./](\d{4})/g;

function extractDates(text: string): string[] {
  const dates: string[] = [];
  const m1 = Array.from(text.matchAll(ISO_DATE)).map((m) => m[1]);
  const m2 = Array.from(text.matchAll(UK_DATE)).map((m) => `${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`);
  dates.push(...m1, ...m2);
  return Array.from(new Set(dates)).sort();
}

function findExpiryDate(text: string, issueDate?: string): string | null {
  const expLine = text.split("\n").find((l) =>
    /valid(?:ity)?\s*(?:until|to|through)|expir(?:y|es?|ation)|best\s+before/i.test(l)
  );
  if (expLine) {
    const d = extractDates(expLine);
    if (d.length) return d[0];
  }
  // For EPDs: issue + 5 years
  if (issueDate && /epd|ISO\s*14025|EN\s*15804/i.test(text)) {
    const y = parseInt(issueDate.slice(0, 4));
    if (!isNaN(y)) return `${y + 5}${issueDate.slice(4)}`;
  }
  // For ISO certs: issue + 3 years
  if (issueDate && /ISO\s*9001|ISO\s*14001/i.test(text)) {
    const y = parseInt(issueDate.slice(0, 4));
    if (!isNaN(y)) return `${y + 3}${issueDate.slice(4)}`;
  }
  return null;
}

function issueDateFromText(text: string): string | null {
  const issueLine = text.split("\n").find((l) =>
    /date\s+of\s+issue|issued|publication\s+date|date\s+of\s+certification/i.test(l)
  );
  if (issueLine) {
    const d = extractDates(issueLine);
    if (d.length) return d[0];
  }
  const all = extractDates(text);
  return all.length ? all[0] : null;
}

function docStatus(expiryDate?: string | null): { status: DocStatus; days: number | null } {
  if (!expiryDate) return { status: "unverified", days: null };
  const exp  = new Date(expiryDate).getTime();
  const now  = Date.now();
  const days = Math.ceil((exp - now) / 86400000);
  if (days < 0)   return { status: "expired",       days };
  if (days < 90)  return { status: "expiring_soon", days };
  return { status: "active", days };
}

// ─── Field extractors by doc type ────────────────────────────────────────────
function extractFields(type: DocType, text: string): ExtractedField[] {
  const fields: ExtractedField[] = [];

  const add = (key: string, label: string, pattern: RegExp, conf: "high"|"medium"|"low" = "medium") => {
    const m = text.match(pattern);
    if (m?.[1]?.trim()) fields.push({ key, label, value: m[1].trim().slice(0, 120), confidence: conf });
  };

  if (type === "epd") {
    add("epd_number",    "EPD Number",         /EPD[-–]\w+[-–]\d{4,}/i,              "high");
    add("programme",     "Programme Operator", /programme\s+operator[:\s]+(.{4,60})/i);
    add("standard",      "Standard",           /(EN\s*15804[^|\n]{0,30})/i,           "high");
    add("declared_unit", "Declared Unit",      /declared\s+unit[:\s]+(.{1,50})/i);
    add("gwp_a1a3",      "GWP A1-A3 (CO₂e)",  /1\.?\s*840|21[,.]?865/,              "medium");
  }
  if (type === "iso_14001" || type === "iso_9001") {
    add("cert_number",   "Certificate Number", /certificate\s+(?:no\.?|number)[:\s]+([A-Z0-9\-/]{4,30})/i, "high");
    add("accredited_by", "Accredited By",      /accredited\s+by[:\s]+(.{4,60})/i);
    add("scope",         "Scope",              /scope[:\s]+(.{10,150})/i);
  }
  if (type === "reach_declaration") {
    add("svhc_status",   "SVHC Status",        /(no\s+SVHC|above\s+threshold|below\s+0\.1%)/i, "high");
    add("candidate_ref", "Candidate List Ref", /candidate\s+list[:\s]+(.{4,60})/i);
  }
  if (type === "test_report") {
    add("test_standard", "Test Standard",   /(IEC\s*\d+|EN\s*\d+|ASTM\s+[A-Z\d]+)/i);
    add("lab_name",      "Laboratory",      /(?:tested|conducted)\s+by[:\s]+(.{4,60})/i);
    add("conclusion",    "Conclusion",      /(pass(?:ed)?|fail(?:ed)?|compliant|non[\s-]?compliant)/i, "high");
  }
  if (type === "safety_data_sheet") {
    add("cas_number",    "CAS Number",      /CAS[:\s]+(\d{2,7}-\d{2}-\d)/i,             "high");
    add("ghs_pictogram", "GHS Hazard",      /GHS\d{2}|(?:flammable|toxic|corrosive)/i);
    add("flash_point",   "Flash Point",     /flash\s+point[:\s]+([^,\n]{3,30})/i);
  }

  // Common fields for all types
  const issuerMatch = text.match(/(?:issued\s+by|manufacturer|company|organisation)[:\s]+(.{3,60})/i);
  if (issuerMatch?.[1] && !fields.find((f) => f.key === "issuer")) {
    fields.push({ key: "issuer", label: "Issuer / Organisation", value: issuerMatch[1].trim().slice(0, 80), confidence: "medium" });
  }

  return fields.slice(0, 12);
}

// ─── Main classify function ───────────────────────────────────────────────────
export async function classifyDocument(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<{
  text:       string;
  type:       DocType;
  label:      string;
  confidence: number;
  reason:     string;
  fields:     ExtractedField[];
  title:      string;
  issuer:     string | null;
  issueDate:  string | null;
  expiryDate: string | null;
  status:     DocStatus;
  daysToExpiry: number | null;
}> {
  // Extract text
  let text = "";
  if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
    try {
      const parsed = await new PDFParse({ data: buffer }).getText();
      text = parsed.text ?? "";
    } catch {
      text = "";
    }
  }

  // Score each type
  const name = fileName.toLowerCase();
  const scored = TYPE_RULES.map((r) => ({
    ...r,
    points: r.score(text, name),
  })).sort((a, b) => b.points - a.points);

  const best = scored[0];
  const type: DocType = best.points >= 30 ? best.type : "unknown";
  const label = best.points >= 30 ? best.label : "Unclassified Document";
  const reason = best.points >= 30 ? best.reason : "No strong signals found. Manual review recommended.";
  const confidence = Math.min(100, best.points);

  // Extract metadata
  const issueDate  = issueDateFromText(text);
  const expiryDate = findExpiryDate(text, issueDate ?? undefined);
  const { status, days } = docStatus(expiryDate);
  const fields = extractFields(type, text);

  // Title heuristic: first non-trivial line or file name
  const firstLines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 5 && l.length < 120);
  const title = firstLines[0] ?? fileName.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");

  const issuerField = fields.find((f) => f.key === "issuer");
  const issuerMatch = text.match(/(?:issued\s+by|manufacturer|company)[:\s]+(.{3,60})/i);
  const issuer = issuerField?.value ?? issuerMatch?.[1]?.trim() ?? null;

  return {
    text:         text.slice(0, 3000),
    type, label, confidence, reason, fields,
    title, issuer, issueDate, expiryDate,
    status, daysToExpiry: days,
  };
}

// ─── AI summary generator ─────────────────────────────────────────────────────
export function generateAiSummary(doc: {
  type: DocType;
  label: string;
  title: string;
  issuer: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  status: DocStatus;
  daysToExpiry: number | null;
  confidence: number;
}): string {
  const parts: string[] = [];

  parts.push(`Classified as **${doc.label}** with ${doc.confidence}% confidence.`);

  if (doc.issuer) parts.push(`Issued by ${doc.issuer}.`);
  if (doc.issueDate) parts.push(`Issue date: ${doc.issueDate}.`);

  if (doc.status === "expired") {
    parts.push(`⚠ This document expired ${Math.abs(doc.daysToExpiry!)} days ago. Renewal is required.`);
  } else if (doc.status === "expiring_soon") {
    parts.push(`⚠ Expiring in ${doc.daysToExpiry} days (${doc.expiryDate}). Schedule renewal.`);
  } else if (doc.expiryDate) {
    parts.push(`Valid until ${doc.expiryDate}.`);
  }

  const actions: Record<DocType, string> = {
    epd:                "Link to product passports to enable ESPR DPP generation.",
    ce_declaration:     "Attach to product listings for EU market access.",
    reach_declaration:  "Required for ESPR DPP restricted substances field.",
    rohs_certificate:   "Required for electronics products sold in EU/UK.",
    iso_14001:          "Demonstrates environmental management — include in supplier scorecard.",
    iso_9001:           "Quality management certification — include in supplier scorecard.",
    supplier_declaration: "Upload to supplier portal for DPP due diligence field.",
    test_report:        "Attach to product record for compliance audit trail.",
    bill_of_materials:  "Use to auto-populate DPP material composition fields.",
    safety_data_sheet:  "Required for REACH restricted substances declaration.",
    carbon_report:      "Use to populate Scope 3 emissions in product carbon footprint.",
    audit_report:       "Store for regulatory audit readiness.",
    dpp:                "Archive as DPP version history.",
    unknown:            "Review manually and assign a document type.",
  };

  parts.push(actions[doc.type] ?? actions.unknown);
  return parts.join(" ");
}
