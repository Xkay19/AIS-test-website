import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { DigitalPassport, ComplianceRecord, CarbonMetric } from "@/lib/supabase/types";

export async function GET() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("org_id, full_name, role")
    .eq("id", user.id)
    .single();

  const profile = profileData as { org_id: string | null; full_name: string | null; role: string } | null;

  if (!profile?.org_id) {
    return NextResponse.json({ error: "No organization linked" }, { status: 400 });
  }

  const orgId = profile.org_id;

  const [passportsRes, complianceRes, carbonRes, orgRes] = await Promise.all([
    supabase
      .from("digital_passports")
      .select("id, name, product_id, category, manufacturer, region, espr_score, espr_grade, carbon_kg, created_at, image_url")
      .eq("org_id", orgId)
      .order("created_at", { ascending: false })
      .limit(10),

    supabase
      .from("compliance_records")
      .select("check_name, status, regulation, verified_at")
      .eq("org_id", orgId)
      .order("check_name"),

    supabase
      .from("carbon_metrics")
      .select("recorded_on, total_kg, material_breakdown")
      .eq("org_id", orgId)
      .order("recorded_on", { ascending: true })
      .limit(30),

    supabase
      .from("organizations")
      .select("name, plan")
      .eq("id", orgId)
      .single(),
  ]);

  const passports = (passportsRes.data ?? []) as DigitalPassport[];
  const compliance = (complianceRes.data ?? []) as ComplianceRecord[];
  const carbonData = (carbonRes.data ?? []) as CarbonMetric[];

  const totalPassports = passports.length;
  const totalCarbon = passports.reduce((sum, p) => sum + (p.carbon_kg ?? 0), 0);
  const uniqueCategories = new Set(passports.map((p) => p.category)).size;
  const scoredPassports = passports.filter((p) => p.espr_score !== null);
  const avgEspr = scoredPassports.length > 0
    ? Math.round(scoredPassports.reduce((sum, p) => sum + (p.espr_score ?? 0), 0) / scoredPassports.length)
    : 0;

  const latestCarbon = carbonData[carbonData.length - 1];
  const materialBreakdown = latestCarbon?.material_breakdown ?? {
    Concrete: 0, Steel: 0, "Battery Cells": 0, Aluminum: 0, Other: 0,
  };

  return NextResponse.json({
    user: { id: user.id, email: user.email, fullName: profile.full_name },
    org: orgRes.data,
    metrics: { totalPassports, totalCarbonKg: totalCarbon, uniqueMaterials: uniqueCategories, esprScore: avgEspr },
    recentPassports: passports.slice(0, 5),
    compliance,
    carbonChart: carbonData,
    materialBreakdown,
  });
}
