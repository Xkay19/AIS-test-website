import { NextRequest, NextResponse } from "next/server";
import { getEpd, deleteEpd } from "@/lib/epd/store";
import type { ErrorResponse } from "@/lib/epd/schema";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const epd = getEpd(params.id);
  if (!epd) {
    return NextResponse.json<ErrorResponse>(
      { success: false, error: `EPD '${params.id}' not found.` },
      { status: 404 },
    );
  }
  return NextResponse.json({ success: true, epd });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const deleted = deleteEpd(params.id);
  if (!deleted) {
    return NextResponse.json<ErrorResponse>(
      { success: false, error: `EPD '${params.id}' not found.` },
      { status: 404 },
    );
  }
  return NextResponse.json({ success: true, deleted_id: params.id });
}
