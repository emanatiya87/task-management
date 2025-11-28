import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    let data;

    try {
      const apiRes = await axios.post(
        `${baseUrl}/auth/v1/token?grant_type=password`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey!,
          },
        }
      );

      data = apiRes.data;
    } catch (error: any) {
      const msg = error.response?.data?.msg || "Login failed";
      return NextResponse.json({ error: msg }, { status: 401 });
    }

    // ----------------------
    // SUCCESS
    // ----------------------
    const { access_token, refresh_token, expires_in, user } = data;
    const identityData = user?.identities?.[0]?.identity_data ?? null;

    const res = NextResponse.json({ success: true });

    res.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      path: "/",
    });

    res.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    res.cookies.set("userInfo", JSON.stringify(identityData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
