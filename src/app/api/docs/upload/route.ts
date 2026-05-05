import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { classifyDocument, generateAiSummary } from "@/lib/docs/classifier";
import { saveDoc } from "@/lib/docs/store";
import type { DocRecord, DocError } from "@/lib/docs/schema";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ success: true; doc: DocRecord; ai_summary: string; parse_ms: number } | DocError>> {
  const t0 = Date.now();

  let buffer: Buffer;
  let fileName: string;
  let mimeType: string;

  const ct = req.headers.get("content-type") ?? "";

  if (ct.includes("multipart/form-data")) {
    const form = await req.formData().catch(() => null);
    if (!form) return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 });

    const file = form.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ success: false, error: "Field 'file' missing or not a file" }, { status: 400 });
    }

    buffer   = Buffer.from(await file.arrayBuffer());
    fileName = (file as File).name ?? "upload.pdf";
    mimeType = file.type || "application/octet-stream";
  } else if (ct.includes("application/pdf") || ct.includes("application/octet-stream")) {
    buffer   = Buffer.from(await req.arrayBuffer());
    fileName = req.headers.get("x-file-name") ?? "upload.pdf";
    mimeType = "application/pdf";
  } else {
    return NextResponse.json(
      { success: false, error: "Send multipart/form-data with field 'file', or raw PDF body" },
      { status: 415 }
    );
  }

  if (buffer.length < 4) {
    return NextResponse.json({ success: false, error: "File too small" }, { status: 400 });
  }
  if (buffer.length > 50 * 1024 * 1024) {
    return NextResponse.json({ success: false, error: "File too large (max 50 MB)" }, { status: 413 });
  }

  try {
    const r = await classifyDocument(buffer, fileName, mimeType);

    // Pull common metadata fields out of the extracted fields array
    const fieldVal = (key: string) => r.fields.find((f) => f.key === key)?.value ?? undefined;

    const doc: DocRecord = {
      doc_id:        randomUUID(),
      uploaded_at:   new Date().toISOString(),
      file_name:     fileName,
      file_size_kb:  Math.round(buffer.length / 1024),
      mime_type:     mimeType,

      doc_type:              r.type,
      doc_type_label:        r.label,
      confidence:            r.confidence,
      classification_reason: r.reason,

      title:       r.title,
      issuer:      r.issuer ?? undefined,
      subject:     fieldVal("product_name") ?? fieldVal("product_type"),
      issue_date:  r.issueDate ?? undefined,
      expiry_date: r.expiryDate ?? undefined,
      standard:    fieldVal("standard_applied") ?? fieldVal("declaration_number"),
      product_ref: fieldVal("registration_number") ?? fieldVal("product_ref"),
      supplier:    fieldVal("manufacturer") ?? fieldVal("supplier"),
      fields:      r.fields,

      status:          r.status,
      days_to_expiry:  r.daysToExpiry,

      linked_epd_ids:     [],
      linked_product_ids: [],
      tags: [r.label, ...(r.type !== "unknown" ? [r.type.toUpperCase()] : [])],

      text_preview: r.text.slice(0, 500),
    };

    saveDoc(doc);

    const ai_summary = generateAiSummary({
      type:         r.type,
      label:        r.label,
      title:        r.title,
      issuer:       r.issuer,
      issueDate:    r.issueDate,
      expiryDate:   r.expiryDate,
      status:       r.status,
      daysToExpiry: r.daysToExpiry,
      confidence:   r.confidence,
    });

    return NextResponse.json({
      success: true,
      doc,
      ai_summary,
      parse_ms: Date.now() - t0,
    });
  } catch (err) {
    console.error("[docs/upload]", err);
    return NextResponse.json(
      { success: false, error: "Classification failed", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "POST /api/docs/upload",
    description: "Upload a compliance document for AI classification and field extraction",
    accepts: ["multipart/form-data (field: file)", "raw PDF body with Content-Type: application/pdf"],
    curl: `curl -X POST http://localhost:3000/api/docs/upload -F "file=@your-document.pdf"`,
  });
}
