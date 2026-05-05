import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "Email and password are required." },
      { status: 422 },
    );
  }

  // TODO: replace with real credential lookup (database / auth provider)
  // Demo credentials: demo@circuland.co.uk / demo1234
  const DEMO_EMAIL    = process.env.DEMO_EMAIL    ?? "demo@circuland.co.uk";
  const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "demo1234";

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return NextResponse.json(
      { success: false, error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ success: true, email }, { status: 200 });
  res.cookies.set("session", Buffer.from(email).toString("base64"), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
