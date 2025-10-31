import { NextResponse } from "next/server";

export async function POST() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!baseUrl || !apiKey)
      return NextResponse.json({ error: "Missing env vars" }, { status: 500 });

    const cookies = require("next/headers").cookies();
    const refresh_token = cookies().get("refresh_token")?.value;

    if (!refresh_token) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const apiRes = await fetch(
      `${baseUrl}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
        },
        body: JSON.stringify({ refresh_token }),
      }
    );

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return NextResponse.json(
        { error: data.msg || "Token refresh failed" },
        { status: 401 }
      );
    }

    const { access_token, expires_in } = data;

    const res = NextResponse.json({ success: true });
    res.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 });
  }
}
