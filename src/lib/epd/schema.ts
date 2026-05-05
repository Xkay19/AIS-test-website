// ─── Lifecycle module identifiers ────────────────────────────────────────────
export type LifecycleModule =
  | "a1_a3" | "a4" | "a5"
  | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7"
  | "c1" | "c2" | "c3" | "c4"
  | "d";

// ─── Environmental indicators (EN 15804 mandatory set) ───────────────────────
export interface ModuleValues {
  a1_a3?: number | null;
  a4?:    number | null;
  a5?:    number | null;
  b1?:    number | null;
  b2?:    number | null;
  b3?:    number | null;
  b4?:    number | null;
  b5?:    number | null;
  b6?:    number | null;
  b7?:    number | null;
  c1?:    number | null;
  c2?:    number | null;
  c3?:    number | null;
  c4?:    number | null;
  d?:     number | null;
}

export interface EnvironmentalIndicator {
  label:  string;
  unit:   string;
  values: ModuleValues;
}

// ─── Material composition ─────────────────────────────────────────────────────
export interface Material {
  name:        string;
  percentage?: number | null;
  mass_kg?:    number | null;
}

// ─── Resource use ─────────────────────────────────────────────────────────────
export interface ResourceUse {
  renewable_primary_energy?:        ModuleValues;
  non_renewable_primary_energy?:    ModuleValues;
  secondary_material?:              ModuleValues;
  renewable_secondary_fuels?:       ModuleValues;
  non_renewable_secondary_fuels?:   ModuleValues;
  net_fresh_water?:                 ModuleValues;
}

// ─── Waste ───────────────────────────────────────────────────────────────────
export interface WasteOutput {
  hazardous?:     ModuleValues;
  non_hazardous?: ModuleValues;
  radioactive?:   ModuleValues;
}

// ─── Validation ──────────────────────────────────────────────────────────────
export type ValidationSeverity = "error" | "warning" | "info";

export interface ValidationIssue {
  field:    string;
  severity: ValidationSeverity;
  message:  string;
}

export interface ValidationResult {
  passed:      boolean;
  score:       number;     // 0–100
  issues:      ValidationIssue[];
  checked_at:  string;
  rules_run:   number;
  rules_passed: number;
}

// ─── Core EPD record ──────────────────────────────────────────────────────────
export interface EpdRecord {
  epd_id:       string;
  extracted_at: string;
  source_file?: string;
  dpp_ready:    boolean;

  product: {
    name:                   string;
    description?:           string;
    manufacturer?:          string;
    declared_unit?:         string;
    functional_unit?:       string;
    reference_service_life?: string;
    product_group?:         string;
    geography?:             string;
  };

  epd_info: {
    programme_operator?: string;
    epd_number?:         string;
    standard?:           string;
    issue_date?:         string;
    valid_until?:        string;
    verifier?:           string;
    pcr?:                string;
  };

  carbon: {
    indicator: "GWP-total" | "GWP-fossil" | "GWP-biogenic" | string;
    unit:      string;
    values:    ModuleValues;
  };

  indicators: {
    odp?:  EnvironmentalIndicator;
    ap?:   EnvironmentalIndicator;
    ep_freshwater?: EnvironmentalIndicator;
    ep_marine?:     EnvironmentalIndicator;
    ep_terrestrial?: EnvironmentalIndicator;
    pocp?: EnvironmentalIndicator;
    adpe?: EnvironmentalIndicator;
    adpf?: EnvironmentalIndicator;
    wdp?:  EnvironmentalIndicator;
    [key: string]: EnvironmentalIndicator | undefined;
  };

  materials:    Material[];
  resource_use: ResourceUse;
  waste:        WasteOutput;
  validation?:  ValidationResult;
}

// ─── API response shapes ──────────────────────────────────────────────────────
export interface ExtractResponse {
  success:    true;
  epd:        EpdRecord;
  warnings:   string[];
  parse_ms:   number;
}

export interface ErrorResponse {
  success:    false;
  error:      string;
  detail?:    string;
}

export interface CompareResponse {
  success:    true;
  epds:       EpdRecord[];
  comparison: {
    carbon_a1_a3: Array<{ epd_id: string; product: string; value: number | null; unit: string }>;
    carbon_total: Array<{ epd_id: string; product: string; value: number | null; unit: string }>;
    materials:    Array<{ epd_id: string; product: string; materials: Material[] }>;
  };
}
