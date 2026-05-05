import type { EpdRecord, ModuleValues, Material } from "./schema";

// PDF text extraction is handled by a separate Node.js worker process (pdf-worker.mjs)
// to avoid ESM/CJS bundler conflicts in Next.js App Router.
import { execFile } from "child_process";
import { join } from "path";

const WORKER_PATH = join(process.cwd(), "src/lib/epd/pdf-worker.mjs");
const NODE_BIN = process.execPath;  // same node binary that's running Next.js

function extractTextFromPdf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = execFile(NODE_BIN, [WORKER_PATH], { maxBuffer: 50 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout);
    });
    child.stdin!.write(buffer);
    child.stdin!.end();
  });
}

// ─── Number normalisation ─────────────────────────────────────────────────────
// EPD PDFs mix "1,234.56" (EN) and "1.234,56" (DE/EU) formats.
function parseNum(raw: string): number | null {
  if (!raw || /^(MND|MNR|INA|-)$/i.test(raw.trim())) return null;
  const s = raw.trim()
    .replace(/\s/g, "")
    .replace(/[−–—]/g, "-");

  // Scientific notation — parseFloat handles it directly
  if (/[Ee][+-]?\d+/.test(s)) return parseFloat(s) || null;

  // European format: 1.234,56
  if (/^\-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) {
    return parseFloat(s.replace(/\./g, "").replace(",", "."));
  }
  return parseFloat(s.replace(/,/g, "")) || null;
}

// ─── Text utilities ───────────────────────────────────────────────────────────
function findLine(lines: string[], pattern: RegExp): string | null {
  return lines.find((l) => pattern.test(l)) ?? null;
}

function extractBetween(text: string, start: RegExp, end: RegExp): string {
  const si = text.search(start);
  if (si === -1) return "";
  const sub = text.slice(si);
  const ei = sub.search(end);
  return ei === -1 ? sub : sub.slice(0, ei);
}

// ─── Module-row parser ────────────────────────────────────────────────────────
// EPD tables look like:  21865  3383  2148  MND  5566  2828  ...  -5492
// Column order follows: A1-A3  A4  A5  B1  B2  B3  B4  B5  B6  B7  C1  C2  C3  C4  D
const MODULE_KEYS: Array<keyof ModuleValues> = [
  "a1_a3","a4","a5","b1","b2","b3","b4","b5","b6","b7","c1","c2","c3","c4","d"
];

function parseModuleRow(numbersOnLine: string[]): ModuleValues {
  const result: ModuleValues = {};
  MODULE_KEYS.forEach((key, i) => {
    result[key] = numbersOnLine[i] !== undefined ? parseNum(numbersOnLine[i]) : null;
  });
  return result;
}

// Extract numeric tokens including scientific notation (e.g. 3.45E-08, -0.340)
function numTokens(line: string): string[] {
  return (line.match(/[-−]?\d[\d.,]*(?:[Ee][+-]?\d+)?/g) ?? [])
    .filter((t) => t !== "-" && t !== "");
}

// ─── Section finders ──────────────────────────────────────────────────────────

function extractProductInfo(text: string, lines: string[]) {
  // EPD number patterns: EPD-XXX-0012345, S-P-12312, ITB-EPD-2023-xxx
  const epdNumMatch = text.match(
    /(?:EPD[-–]\w+[-–]\d{4,}|S[-–]P[-–]\d{4,}|ITB[-–]EPD[-–]\d{4,}[-–]\d{3,})/i
  );

  // Declared unit — capture only up to end-of-line (40 chars max)
  const duLine = findLine(lines, /declared unit|functional unit/i);
  const duMatch = duLine?.match(/(?:declared|functional)\s+unit[:\s]+(.{1,60})/i);

  // Reference service life
  const rslLine = findLine(lines, /reference service life|RSL/i);
  const rslMatch = rslLine?.match(/(?:reference service life|RSL)[:\s]+(.{1,40})/i);

  // Validity dates — "Valid until YYYY-MM-DD"
  const validLine = findLine(lines, /valid(?:ity)?\s*(?:until|to)?[\s:]?\s*\d{4}/i);
  // Grab full ISO date preferentially, fall back to year only
  const validMatch = validLine?.match(/(\d{4}-\d{2}-\d{2})/);

  const issueLine = findLine(lines, /date\s+of\s+issue|issued|publication\s+date/i);
  const issueMatch = issueLine?.match(/(\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})/);

  // Programme operator
  let programme = "";
  if (/IBU/i.test(text)) programme = "IBU — Institut Bauen und Umwelt";
  else if (/EPD Norway|Næringslivets|Norwegian/i.test(text)) programme = "EPD Norway";
  else if (/BRE|BREEAM/i.test(text)) programme = "BRE Global";
  else if (/International EPD System|environdec/i.test(text)) programme = "The International EPD System (environdec.com)";
  else if (/INIES/i.test(text)) programme = "INIES (France)";

  // Verifier — limit to 80 chars to avoid grabbing subsequent lines
  const verifierLine = findLine(lines, /verified?\s+by|independent\s+verif/i);
  const verifierMatch = verifierLine?.match(/(?:verified?\s+by|verif\w+)[:\s]+(.{4,80})/i);

  // Standard — match just the standard code
  const stdLine = findLine(lines, /EN\s*15804|ISO\s*14025/i);
  const stdMatch = stdLine?.match(/(EN\s*15804[^|,\n]{0,30})/i);

  // PCR — limit to 80 chars
  const pcrLine = findLine(lines, /PCR|product\s+category\s+rule/i);
  const pcrMatch = pcrLine?.match(/(?:PCR|product category rules?)[:\s]+(.{4,80})/i);

  // Geography
  const geoLine = findLine(lines, /geography|country\s+of\s+origin/i);
  const geoMatch = geoLine?.match(/(?:geography|country of origin)[:\s]+([A-Za-z ,/]{3,60})/i);

  return {
    epdNumber:   epdNumMatch?.[0] ?? null,
    declaredUnit: duMatch?.[1]?.trim() ?? null,
    rsl:          rslMatch?.[1]?.trim() ?? null,
    validUntil:   validMatch?.[0] ?? null,
    issueDate:    issueMatch?.[0] ?? null,
    programme,
    verifier:     verifierMatch?.[1]?.trim() ?? null,
    standard:     stdMatch?.[1]?.replace(/\s+/g, " ").trim() ?? null,
    pcr:          pcrMatch?.[1]?.trim() ?? null,
    geography:    geoMatch?.[1]?.trim() ?? null,
  };
}

// ─── Carbon / GWP extractor ───────────────────────────────────────────────────

function extractCarbon(text: string, lines: string[]) {
  // Find the GWP row — could be "GWP-total", "GWP total", "Global warming potential"
  const gwpIdx = lines.findIndex((l) =>
    /GWP[\s-]?total|GWP[\s-]?fossil|global\s+warm/i.test(l)
  );
  if (gwpIdx === -1) return null;

  const indicator = /GWP[\s-]?fossil/i.test(lines[gwpIdx]) ? "GWP-fossil"
    : /GWP[\s-]?biogenic/i.test(lines[gwpIdx]) ? "GWP-biogenic"
    : "GWP-total";

  // Unit — look near the GWP line
  const unitSearchArea = lines.slice(Math.max(0, gwpIdx - 3), gwpIdx + 6).join(" ");
  const unitMatch = unitSearchArea.match(/kg\s*CO[₂2]\s*(?:eq\.?|equiv\.?)/i);
  const unit = unitMatch ? unitMatch[0].replace(/\s+/g, " ").trim() : "kg CO2 eq.";

  // Skip header rows (A1-A3, A4... etc.) then grab the first row with ≥3 numbers
  let tokens: string[] = [];
  for (let i = gwpIdx + 1; i <= Math.min(gwpIdx + 6, lines.length - 1); i++) {
    // Skip lines that are only module headers
    if (/^(?:\s*(?:A\d|B\d|C\d|D)\s*[-–]?)+/i.test(lines[i]) && !/\d\.\d/.test(lines[i])) continue;
    tokens = numTokens(lines[i]);
    if (tokens.length >= 3) break;
  }

  return { indicator, unit, values: parseModuleRow(tokens) };
}

// ─── Other environmental indicators ──────────────────────────────────────────

const INDICATOR_PATTERNS: Array<{ key: string; label: string; pattern: RegExp; unit: string }> = [
  { key: "odp",           label: "Ozone depletion (ODP)",                pattern: /ODP|ozone\s+depletion/i,           unit: "kg CFC-11 eq." },
  { key: "ap",            label: "Acidification (AP)",                   pattern: /\bAP\b|acidification\s+pot/i,       unit: "mol H⁺ eq." },
  { key: "ep_freshwater", label: "Eutrophication freshwater (EP-fw)",    pattern: /EP[\s-]?fw|eutrophic.*fresh/i,       unit: "kg P eq." },
  { key: "ep_marine",     label: "Eutrophication marine (EP-mar)",       pattern: /EP[\s-]?mar|eutrophic.*mar/i,        unit: "kg N eq." },
  { key: "ep_terrestrial",label: "Eutrophication terrestrial (EP-ter)",  pattern: /EP[\s-]?ter|eutrophic.*terr/i,       unit: "mol N eq." },
  { key: "pocp",          label: "Photochemical ozone creation (POCP)",  pattern: /POCP|photochem/i,                    unit: "kg NMVOC eq." },
  { key: "adpe",          label: "Abiotic depletion elements (ADPE)",    pattern: /ADP[\s-]?e|abiotic.*element/i,       unit: "kg Sb eq." },
  { key: "adpf",          label: "Abiotic depletion fossils (ADPF)",     pattern: /ADP[\s-]?f|abiotic.*fossil/i,        unit: "MJ" },
  { key: "wdp",           label: "Water deprivation (WDP)",              pattern: /WDP|water\s+dep/i,                   unit: "m³ world eq." },
];

function extractIndicators(lines: string[]) {
  const result: Record<string, { label: string; unit: string; values: ModuleValues }> = {};

  for (const ind of INDICATOR_PATTERNS) {
    const idx = lines.findIndex((l) => ind.pattern.test(l));
    if (idx === -1) continue;
    let tokens: string[] = [];
    for (let i = idx + 1; i <= Math.min(idx + 5, lines.length - 1); i++) {
      if (/^(?:\s*(?:A\d|B\d|C\d|D)\s*[-–]?)+/i.test(lines[i]) && !/[\d]E[-+]?\d|[\d]\.\d/.test(lines[i])) continue;
      tokens = numTokens(lines[i]);
      if (tokens.length >= 1) break;
    }
    if (tokens.length === 0) continue;
    result[ind.key] = { label: ind.label, unit: ind.unit, values: parseModuleRow(tokens) };
  }

  return result;
}

// ─── Material composition ─────────────────────────────────────────────────────

const MATERIAL_NAMES = [
  "ferrous metal", "steel", "iron",
  "non-ferrous metal", "aluminium", "copper",
  "concrete", "inorganic", "cement", "mineral",
  "plastic", "polymer", "rubber",
  "electronic", "circuit", "pcb",
  "glass", "fibre",
  "lubricant", "oil", "grease",
  "wood", "timber",
  "cotton", "polyester", "nylon", "fibre",
  "battery", "lithium", "cobalt",
  "foam", "insulation",
];

function extractMaterials(text: string, lines: string[]): Material[] {
  const materials: Material[] = [];
  const seen = new Set<string>();

  // Strategy 1: look for "material name: XX% (NNN kg)" patterns
  const patternA = /([A-Za-z][A-Za-z\s\-/()]{2,40})\s*[:\s]\s*(\d{1,3}[.,]\d{1,2})\s*%?\s*[/(]\s*(\d[\d.,]*)\s*kg/gi;
  let m: RegExpExecArray | null;
  while ((m = patternA.exec(text)) !== null) {
    const name = m[1].trim();
    if (seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    materials.push({ name, percentage: parseNum(m[2]), mass_kg: parseNum(m[3]) });
  }
  if (materials.length > 0) return materials;

  // Strategy 2: line scan for material-like names with numbers nearby
  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    if (!MATERIAL_NAMES.some((mn) => lower.includes(mn))) continue;

    const nums = numTokens(lines[i]);
    if (nums.length === 0) {
      // Numbers may be on adjacent line
      const nextNums = i + 1 < lines.length ? numTokens(lines[i + 1]) : [];
      if (nextNums.length === 0) continue;
      const name = lines[i].replace(/\d[\d.,]*/g, "").trim();
      if (name.length < 3 || seen.has(name.toLowerCase())) continue;
      seen.add(name.toLowerCase());
      const pct = nextNums.find((n) => parseNum(n)! <= 100 && parseNum(n)! > 0);
      const mass = nextNums.find((n) => parseNum(n)! > 100);
      materials.push({ name, percentage: pct ? parseNum(pct) : null, mass_kg: mass ? parseNum(mass) : null });
    } else {
      const name = lines[i].replace(/\d[\d.,\s%kgKG]*/g, "").trim().replace(/[:\-]+$/, "").trim();
      if (name.length < 3 || seen.has(name.toLowerCase())) continue;
      seen.add(name.toLowerCase());
      const pct  = nums.find((n) => parseNum(n)! <= 100 && parseNum(n)! > 0);
      const mass = nums.find((n) => parseNum(n)! > 100);
      materials.push({ name, percentage: pct ? parseNum(pct) : null, mass_kg: mass ? parseNum(mass) : null });
    }
  }

  return materials.slice(0, 20);
}

// ─── Product name heuristic ───────────────────────────────────────────────────

function extractProductName(lines: string[]): string {
  // Skip very short lines and lines that look like headers/labels
  const skip = /^(environmental|product declaration|EPD|ISO|EN\s*\d|page|date|version|www\.|http)/i;
  for (let i = 0; i < Math.min(30, lines.length); i++) {
    const l = lines[i].trim();
    if (l.length < 5 || l.length > 120) continue;
    if (skip.test(l)) continue;
    if (/^\d+$/.test(l)) continue;
    return l;
  }
  return "Unknown Product";
}

function extractManufacturer(lines: string[]): string | null {
  const mfgLine = lines.find((l) =>
    /manufacturer|produced\s+by/i.test(l)
  );
  if (!mfgLine) return null;
  // Grab up to first comma or end of line, max 60 chars
  const match = mfgLine.match(/(?:manufacturer|produced by)[:\s]+([^,\n]{3,60})/i);
  return match?.[1]?.trim() ?? null;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function extractEpd(
  buffer: Buffer,
  fileName?: string,
): Promise<{ record: Partial<EpdRecord>; warnings: string[]; parse_ms: number }> {
  const t0 = Date.now();
  const warnings: string[] = [];

  const rawText: string = await extractTextFromPdf(buffer);
  const lines = rawText
    .split(/\r?\n/)
    .map((l: string) => l.trim())
    .filter((l: string) => l.length > 0);

  // ── 1. Product & EPD info ───────────────────────────────────────────────────
  const info = extractProductInfo(rawText, lines);
  const productName = extractProductName(lines);
  const manufacturer = extractManufacturer(lines);

  // ── 2. Carbon ──────────────────────────────────────────────────────────────
  const carbon = extractCarbon(rawText, lines);
  if (!carbon) warnings.push("GWP / carbon data not found — table may be image-based");

  // ── 3. Other indicators ─────────────────────────────────────────────────────
  const indicators = extractIndicators(lines);
  if (Object.keys(indicators).length === 0) {
    warnings.push("No environmental indicators extracted — they may be embedded images in the PDF");
  }

  // ── 4. Materials ───────────────────────────────────────────────────────────
  const materials: Material[] = extractMaterials(rawText, lines);
  if (materials.length === 0) warnings.push("Material composition data not found");

  // ── 5. Assemble record ─────────────────────────────────────────────────────
  const record: Partial<EpdRecord> = {
    extracted_at: new Date().toISOString(),
    source_file:  fileName,
    dpp_ready:    false,

    product: {
      name:                    productName,
      manufacturer:            manufacturer ?? undefined,
      declared_unit:           info.declaredUnit ?? undefined,
      reference_service_life:  info.rsl ?? undefined,
      geography:               info.geography ?? undefined,
    },

    epd_info: {
      programme_operator: info.programme || undefined,
      epd_number:         info.epdNumber ?? undefined,
      standard:           info.standard ?? undefined,
      issue_date:         info.issueDate ?? undefined,
      valid_until:        info.validUntil ?? undefined,
      verifier:           info.verifier ?? undefined,
      pcr:                info.pcr ?? undefined,
    },

    carbon: carbon
      ? { indicator: carbon.indicator, unit: carbon.unit, values: carbon.values }
      : { indicator: "GWP-total", unit: "kg CO2 eq.", values: {} },

    indicators,
    materials,
    resource_use: {},
    waste: {},
  };

  const parse_ms = Date.now() - t0;
  return { record, warnings, parse_ms };
}
