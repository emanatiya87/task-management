import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!accessToken && refreshToken) {
    const refreshRes = await fetch(
      `${request.nextUrl.origin}/api/auth/refresh`,
      {
        method: "POST",
        headers: { Cookie: request.headers.get("cookie") || "" },
      }
    );

    if (refreshRes.ok) {
      return NextResponse.next();
    }
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/registration/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
