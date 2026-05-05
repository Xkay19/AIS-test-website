import { NextResponse } from "next/server";
import { getExpiringDocs, listDocs } from "@/lib/docs/store";
import type { ExpiryResponse } from "@/lib/docs/schema";

export const runtime = "nodejs";

export async function GET(): Promise<NextResponse<ExpiryResponse>> {
  const { expiring_soon, expired } = getExpiringDocs();
  const total_active = listDocs().filter((d) => d.status === "active").length;

  return NextResponse.json({ success: true, expiring_soon, expired, total_active });
}
