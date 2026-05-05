import { NextRequest, NextResponse } from "next/server";
import { searchDocs } from "@/lib/docs/store";
import type { SearchResponse, DocError } from "@/lib/docs/schema";

export const runtime = "nodejs";

export async function GET(req: NextRequest): Promise<NextResponse<SearchResponse | DocError>> {
  const query = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    return NextResponse.json({ success: false, error: "Missing query param ?q=" }, { status: 400 });
  }

  const docs = searchDocs(query);
  const results = docs.map((doc) => ({
    doc_id: doc.doc_id,
    title: doc.title ?? doc.file_name,
    doc_type: doc.doc_type,
    doc_type_label: doc.doc_type_label,
    score: doc.confidence,
    excerpt: doc.text_preview?.slice(0, 200) ?? "",
    status: doc.status,
  }));

  return NextResponse.json({ success: true, query, results });
}
