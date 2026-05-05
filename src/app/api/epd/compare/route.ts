import { NextRequest, NextResponse } from "next/server";
import { getEpd } from "@/lib/epd/store";
import type { CompareResponse, ErrorResponse } from "@/lib/epd/schema";

export async function GET(req: NextRequest): Promise<NextResponse<CompareResponse | ErrorResponse>> {
  const ids = req.nextUrl.searchParams.get("ids");
  if (!ids) {
    return NextResponse.json<ErrorResponse>(
      { success: false, error: "Query param 'ids' is required. Example: ?ids=ds_epd_abc,ds_epd_xyz" },
      { status: 400 },
    );
  }

  const idList = ids.split(",").map((s) => s.trim()).filter(Boolean);
  if (idList.length < 2) {
    return NextResponse.json<ErrorResponse>(
      { success: false, error: "Provide at least 2 EPD IDs to compare." },
      { status: 400 },
    );
  }
  if (idList.length > 10) {
    return NextResponse.json<ErrorResponse>(
      { success: false, error: "Maximum 10 EPDs can be compared in one request." },
      { status: 400 },
    );
  }

  const epds = idList.map((id) => getEpd(id));
  const missing = idList.filter((_, i) => !epds[i]);
  if (missing.length > 0) {
    return NextResponse.json<ErrorResponse>(
      { success: false, error: `EPDs not found: ${missing.join(", ")}` },
      { status: 404 },
    );
  }

  const found = epds.filter(Boolean) as NonNullable<(typeof epds)[0]>[];

  // Sum lifecycle carbon (A1-A3 through C4, excluding D)
  function totalLifecycle(epd: (typeof found)[0]): number | null {
    const cv = epd.carbon?.values ?? {};
    const keys = ["a1_a3","a4","a5","b1","b2","b3","b4","b5","b6","b7","c1","c2","c3","c4"] as const;
    const sum = keys.reduce((acc, k) => acc + (cv[k] ?? 0), 0);
    return sum > 0 ? Math.round(sum * 100) / 100 : null;
  }

  const comparison: CompareResponse["comparison"] = {
    carbon_a1_a3: found.map((e) => ({
      epd_id:  e.epd_id,
      product: e.product.name,
      value:   e.carbon?.values?.a1_a3 ?? null,
      unit:    e.carbon?.unit ?? "kg CO2 eq.",
    })).sort((a, b) => (a.value ?? Infinity) - (b.value ?? Infinity)),

    carbon_total: found.map((e) => ({
      epd_id:  e.epd_id,
      product: e.product.name,
      value:   totalLifecycle(e),
      unit:    e.carbon?.unit ?? "kg CO2 eq.",
    })).sort((a, b) => (a.value ?? Infinity) - (b.value ?? Infinity)),

    materials: found.map((e) => ({
      epd_id:    e.epd_id,
      product:   e.product.name,
      materials: e.materials,
    })),
  };

  return NextResponse.json<CompareResponse>({
    success:    true,
    epds:       found,
    comparison,
  });
}
