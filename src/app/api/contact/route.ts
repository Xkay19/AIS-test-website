import { NextRequest, NextResponse } from "next/server";

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  industry: string;
  size: string;
  message: string;
  submitted_at: string;
}

const submissions: ContactSubmission[] = [];

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { first_name, last_name, email, company, industry, size, message } = body;

  if (!first_name || !last_name || !email || !company) {
    return NextResponse.json(
      { success: false, error: "first_name, last_name, email, and company are required." },
      { status: 422 },
    );
  }

  const submission: ContactSubmission = {
    id: `contact_${Date.now()}`,
    first_name,
    last_name,
    email,
    company,
    industry: industry ?? "",
    size: size ?? "",
    message: message ?? "",
    submitted_at: new Date().toISOString(),
  };

  submissions.push(submission);

  return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
}
