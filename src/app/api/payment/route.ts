import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as Record<string, unknown>));
  const appId = "KM-2026-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return NextResponse.json({
    success: true,
    appId,
    amount: body.amount ?? 0,
    method: body.method ?? "UPI",
  });
}
