import { NextRequest, NextResponse } from "next/server";
import { getDoc, deleteDoc } from "@/lib/docs/store";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const doc = getDoc(params.id);
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, doc });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const existed = deleteDoc(params.id);
  if (!existed) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, deleted_id: params.id });
}
