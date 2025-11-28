import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
export async function POST() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!baseUrl || !apiKey) {
      return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
    }

    const cookieStore = await cookies();
    const refresh_token = cookieStore.get("refresh_token")?.value;

    if (!refresh_token) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    let data;

    try {
      const apiRes = await axios.post(
        `${baseUrl}/auth/v1/token?grant_type=refresh_token`,
        { refresh_token },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey,
          },
        }
      );

      data = apiRes.data;
    } catch (error: any) {
      const msg = error.response?.data?.msg || "Token refresh failed";
      return NextResponse.json({ error: msg }, { status: 401 });
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
