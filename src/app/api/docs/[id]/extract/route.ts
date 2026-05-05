import { NextRequest, NextResponse } from "next/server";
import { getDoc } from "@/lib/docs/store";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const doc = getDoc(params.id);
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({
    success: true,
    doc_id: doc.doc_id,
    doc_type: doc.doc_type,
    doc_type_label: doc.doc_type_label,
    confidence: doc.confidence,
    classification_reason: doc.classification_reason,
    fields: doc.fields,
    metadata: {
      title: doc.title,
      issuer: doc.issuer,
      subject: doc.subject,
      issue_date: doc.issue_date,
      expiry_date: doc.expiry_date,
      standard: doc.standard,
      product_ref: doc.product_ref,
      supplier: doc.supplier,
    },
    status: doc.status,
    days_to_expiry: doc.days_to_expiry,
  });
}
