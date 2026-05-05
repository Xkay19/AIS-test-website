export type Industry =
  | "construction"
  | "batteries"
  | "tyres"
  | "furniture"
  | "fashion";

export interface DppField {
  label: string;
  value: string;
  unit?: string;
}

export interface ProductPassport {
  id:         string;
  sku:        string;
  name:       string;
  industry:   Industry;
  status:     "compliant" | "non-compliant" | "pending";
  fields:     DppField[];
  qrCode?:    string;
  updatedAt:  string;
}

export interface CaseStudy {
  slug:       string;
  company:    string;
  industry:   Industry;
  headline:   string;
  excerpt:    string;
  metric:     { value: string; label: string };
  content?:   string;
}

export interface NavItem {
  label:      string;
  href:       string;
  children?:  { label: string; href: string }[];
}
