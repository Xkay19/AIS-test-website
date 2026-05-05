import { NextRequest, NextResponse } from "next/server";
import { extractEpd } from "@/lib/epd/extractor";
import { validateEpd, isDppReady } from "@/lib/epd/validator";
import { saveEpd } from "@/lib/epd/store";
import type { EpdRecord, ExtractResponse, ErrorResponse } from "@/lib/epd/schema";

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "ds_epd_";
  for (let i = 0; i < 12; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ExtractResponse | ErrorResponse>> {
  try {
    // ── 1. Parse multipart body ───────────────────────────────────────────────
    let buffer: Buffer;
    let fileName = "upload.pdf";

    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      if (!file || typeof file === "string") {
        return NextResponse.json<ErrorResponse>(
          { success: false, error: "No file provided. Send a PDF as form field 'file'." },
          { status: 400 },
        );
      }
      // File is a Blob/File object
      const blob = file as File;
      fileName = blob.name || "upload.pdf";
      buffer = Buffer.from(await blob.arrayBuffer());
    } else if (
      contentType.includes("application/pdf") ||
      contentType.includes("application/octet-stream")
    ) {
      // Raw binary body
      const ab = await req.arrayBuffer();
      buffer = Buffer.from(ab);
      fileName = req.headers.get("x-file-name") ?? "upload.pdf";
    } else {
      return NextResponse.json<ErrorResponse>(
        {
          success: false,
          error: "Unsupported content-type. Send multipart/form-data with field 'file', or raw PDF with Content-Type: application/pdf.",
        },
        { status: 415 },
      );
    }

    // ── 2. Basic sanity check (PDF magic bytes) ──────────────────────────────
    if (buffer.length < 4 || buffer.slice(0, 4).toString("ascii") !== "%PDF") {
      return NextResponse.json<ErrorResponse>(
        { success: false, error: "File does not appear to be a valid PDF (missing %PDF header)." },
        { status: 422 },
      );
    }

    // ── 3. Extract ────────────────────────────────────────────────────────────
    const { record, warnings, parse_ms } = await extractEpd(buffer, fileName);

    // ── 4. Validate ───────────────────────────────────────────────────────────
    const validation = validateEpd(record);
    record.validation = validation;
    record.dpp_ready  = isDppReady(record);

    // ── 5. Store ──────────────────────────────────────────────────────────────
    const epd: EpdRecord = {
      ...(record as EpdRecord),
      epd_id: generateId(),
    };
    saveEpd(epd);

    return NextResponse.json<ExtractResponse>(
      { success: true, epd, warnings, parse_ms },
      { status: 201 },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json<ErrorResponse>(
      { success: false, error: "Extraction failed.", detail: msg },
      { status: 500 },
    );
  }
}

// GET /api/epd/extract → usage instructions
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    endpoint:    "POST /api/epd/extract",
    description: "Upload an ISO 14025 EPD PDF and receive structured JSON data.",
    accepts: [
      "multipart/form-data  — field name: 'file'",
      "application/pdf      — raw binary body, optional header X-File-Name",
    ],
    returns: {
      success:   true,
      epd:       "Full EpdRecord object",
      warnings:  "Array of extraction warnings",
      parse_ms:  "Processing time in milliseconds",
    },
    example_curl: "curl -X POST https://floilan.com/api/epd/extract -F 'file=@KONE-EPD.pdf'",
  });
}
