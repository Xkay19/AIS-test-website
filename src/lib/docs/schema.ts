// ─── Document types recognisable by the AI classifier ────────────────────────
export type DocType =
  | "epd"                    // Environmental Product Declaration
  | "ce_declaration"         // CE Declaration of Performance
  | "reach_declaration"      // REACH substance declaration
  | "rohs_certificate"       // RoHS compliance certificate
  | "iso_14001"              // ISO 14001 environmental cert
  | "iso_9001"               // ISO 9001 quality cert
  | "supplier_declaration"   // Supply chain due diligence
  | "test_report"            // Third-party test / lab report
  | "bill_of_materials"      // BOM / material composition
  | "safety_data_sheet"      // SDS / MSDS
  | "carbon_report"          // Scope 1–3 / LCA carbon report
  | "audit_report"           // Third-party audit / inspection
  | "dpp"                    // Digital Product Passport export
  | "unknown";               // Could not classify

export type DocStatus = "active" | "expiring_soon" | "expired" | "unverified";

export interface ExtractedField {
  key:   string;
  label: string;
  value: string;
  confidence: "high" | "medium" | "low";
}

export interface DocRecord {
  doc_id:        string;
  uploaded_at:   string;
  file_name:     string;
  file_size_kb:  number;
  mime_type:     string;

  // AI classification
  doc_type:      DocType;
  doc_type_label: string;
  confidence:    number;          // 0–100
  classification_reason: string;

  // AI-extracted metadata
  title?:         string;
  issuer?:        string;
  subject?:       string;
  issue_date?:    string;
  expiry_date?:   string;
  standard?:      string;
  product_ref?:   string;
  supplier?:      string;
  fields:         ExtractedField[];

  // Status
  status:         DocStatus;
  days_to_expiry?: number | null;

  // Relationships
  linked_epd_ids:    string[];
  linked_product_ids: string[];
  tags:              string[];

  // Raw text (truncated, for search)
  text_preview?: string;
}

// ─── API response shapes ──────────────────────────────────────────────────────
export interface UploadResponse {
  success:   true;
  doc:       DocRecord;
  ai_summary: string;
  parse_ms:  number;
}

export interface SearchResult {
  doc_id:   string;
  title:    string;
  doc_type: DocType;
  doc_type_label: string;
  score:    number;
  excerpt:  string;
  status:   DocStatus;
}

export interface SearchResponse {
  success: true;
  query:   string;
  results: SearchResult[];
}

export interface ExpiryResponse {
  success: true;
  expiring_soon: DocRecord[];   // next 90 days
  expired:       DocRecord[];
  total_active:  number;
}

export type DocError = { success: false; error: string; detail?: string };
