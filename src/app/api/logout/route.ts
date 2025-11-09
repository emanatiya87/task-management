import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Delete cookies by setting maxAge=0
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  response.cookies.set("refresh_token", "", { path: "/", maxAge: 0 });

  return response;
}
