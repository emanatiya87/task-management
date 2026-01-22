import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/dashboard", "/project"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // token من الكوكيز
  const token = request.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = pathname.startsWith("/registration");

  // 🚫 مش مسجل دخول + route محمي
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/registration/login", request.url));
  }

  // 🚫 مسجل دخول + رايح login أو signup
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/project/:path*", "/registration/:path*"],
};
