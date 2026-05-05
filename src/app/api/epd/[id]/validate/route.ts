import { NextRequest, NextResponse } from "next/server";
import { getEpd, saveEpd } from "@/lib/epd/store";
import { validateEpd, isDppReady } from "@/lib/epd/validator";
import type { ErrorResponse } from "@/lib/epd/schema";

export async function POST(
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

  const validation = validateEpd(epd);
  epd.validation = validation;
  epd.dpp_ready  = isDppReady(epd);
  saveEpd(epd);

  return NextResponse.json({
    success:    true,
    epd_id:     params.id,
    validation,
    dpp_ready:  epd.dpp_ready,
  });
}

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
  if (!epd.validation) {
    return NextResponse.json(
      { success: false, error: "Not yet validated. POST to this endpoint first." },
      { status: 409 },
    );
  }
  return NextResponse.json({ success: true, epd_id: params.id, validation: epd.validation, dpp_ready: epd.dpp_ready });
}
