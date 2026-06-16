import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as Record<string, unknown>));

  if (body.otp) {
    const ok = /^\d{6}$/.test(String(body.otp));
    return NextResponse.json({ success: ok });
  }

  return NextResponse.json({ sent: true });
}
