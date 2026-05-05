import { NextResponse } from "next/server";
import { listDocs } from "@/lib/docs/store";

export const runtime = "nodejs";

export async function GET() {
  const docs = listDocs();

  const summary = {
    total: docs.length,
    by_type: {} as Record<string, number>,
    by_status: { active: 0, expiring_soon: 0, expired: 0, unverified: 0 },
  };

  for (const d of docs) {
    summary.by_type[d.doc_type] = (summary.by_type[d.doc_type] ?? 0) + 1;
    summary.by_status[d.status] = (summary.by_status[d.status] ?? 0) + 1;
  }

  return NextResponse.json({ success: true, summary, docs });
}
