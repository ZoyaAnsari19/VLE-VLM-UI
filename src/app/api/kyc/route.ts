import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as Record<string, unknown>));
  const ok = /^\d{12}$/.test(String(body.aadhaar || ""));
  return NextResponse.json({ success: ok, name: body.name || "" });
}
