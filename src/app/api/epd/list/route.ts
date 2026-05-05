import { NextResponse } from "next/server";
import { listEpds } from "@/lib/epd/store";

export async function GET(): Promise<NextResponse> {
  const epds = listEpds();
  return NextResponse.json({
    success: true,
    count:   epds.length,
    epds:    epds.map((e) => ({
      epd_id:       e.epd_id,
      product:      e.product.name,
      manufacturer: e.product.manufacturer,
      epd_number:   e.epd_info.epd_number,
      dpp_ready:    e.dpp_ready,
      extracted_at: e.extracted_at,
      validation:   e.validation
        ? { score: e.validation.score, passed: e.validation.passed, errors: e.validation.issues.filter((i) => i.severity === "error").length }
        : null,
    })),
  });
}
