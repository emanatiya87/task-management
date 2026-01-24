"use server";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function GET() {
  try {
    await apiClient.post(`/auth/v1/logout`);

    // Delete cookies
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("access_token", "", { path: "/", maxAge: 0 });
    response.cookies.set("refresh_token", "", { path: "/", maxAge: 0 });
    response.cookies.set("userInfo", "", { path: "/", maxAge: 0 });

    return response;
  } catch (error) {
    console.log("error logout ", error);
  }
}
