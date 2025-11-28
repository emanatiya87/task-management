export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userInfo = cookieStore.get("userInfo");

    return NextResponse.json({
      userInfo: userInfo?.value || null,
    });
  } catch (err) {
    console.error("userInfo API ERROR:", err);
    return NextResponse.json({ userInfo: null }, { status: 500 });
  }
}
