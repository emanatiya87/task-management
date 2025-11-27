import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";

export async function GET() {
  // Delete cookies
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  response.cookies.set("refresh_token", "", { path: "/", maxAge: 0 });

  return response;
}
