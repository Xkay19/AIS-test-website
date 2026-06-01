export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: { id: string; name: string; plan: string; logo_url: string | null; created_at: string };
        Insert: { id?: string; name: string; plan?: string; logo_url?: string | null };
        Update: { name?: string; plan?: string; logo_url?: string | null };
      };
      profiles: {
        Row: { id: string; org_id: string | null; full_name: string | null; role: string; avatar_url: string | null; created_at: string };
        Insert: { id: string; org_id?: string | null; full_name?: string | null; role?: string };
        Update: { org_id?: string | null; full_name?: string | null; role?: string; avatar_url?: string | null };
      };
      digital_passports: {
        Row: {
          id: string; org_id: string; created_by: string | null;
          name: string; product_id: string | null; category: string;
          manufacturer: string | null; region: string | null; stage: string | null;
          espr_score: number | null; espr_grade: string | null; carbon_kg: number | null;
          image_url: string | null; qr_code_url: string | null;
          issued_at: string; valid_until: string | null; created_at: string; updated_at: string;
        };
        Insert: {
          org_id: string; name: string; category: string;
          product_id?: string | null; manufacturer?: string | null; region?: string | null;
          stage?: string | null; espr_score?: number | null; espr_grade?: string | null;
          carbon_kg?: number | null; image_url?: string | null;
        };
        Update: {
          name?: string; category?: string; espr_score?: number | null;
          espr_grade?: string | null; carbon_kg?: number | null; stage?: string | null;
        };
      };
      materials: {
        Row: { id: string; passport_id: string; name: string; qty: number | null; unit: string | null; recycled_pct: number | null; certifications: string[] | null; created_at: string };
        Insert: { passport_id: string; name: string; qty?: number | null; unit?: string | null; recycled_pct?: number | null; certifications?: string[] | null };
        Update: { name?: string; qty?: number | null; recycled_pct?: number | null };
      };
      compliance_records: {
        Row: { id: string; org_id: string; passport_id: string | null; check_name: string; regulation: string | null; status: string; notes: string | null; verified_at: string | null; created_at: string };
        Insert: { org_id: string; check_name: string; status?: string; passport_id?: string | null; regulation?: string | null; notes?: string | null };
        Update: { status?: string; notes?: string | null; verified_at?: string | null };
      };
      carbon_metrics: {
        Row: { id: string; org_id: string; recorded_on: string; total_kg: number; material_breakdown: Json | null; created_at: string };
        Insert: { org_id: string; recorded_on?: string; total_kg: number; material_breakdown?: Json | null };
        Update: { total_kg?: number; material_breakdown?: Json | null };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience aliases
export type Organization = Database["public"]["Tables"]["organizations"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type DigitalPassport = Database["public"]["Tables"]["digital_passports"]["Row"];
export type Material = Database["public"]["Tables"]["materials"]["Row"];
export type ComplianceRecord = Database["public"]["Tables"]["compliance_records"]["Row"];
export type CarbonMetric = Database["public"]["Tables"]["carbon_metrics"]["Row"];
