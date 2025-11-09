export const runtime = "nodejs"; // keep this

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ MUST AWAIT

    const accessCookie = cookieStore.get("access_token");
    const refreshCookie = cookieStore.get("refresh_token");

    return NextResponse.json({
      access: accessCookie?.value || null,
      refresh: refreshCookie?.value || null,
    });
  } catch (err) {
    console.error("TOKEN API ERROR:", err);
    return NextResponse.json({ access: null, refresh: null }, { status: 500 });
  }
}
