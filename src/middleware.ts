import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  // Handle /two-factor access
  if (url.pathname === "/two-factor") {
    const twoFactorCookie = request.cookies.get("better-auth.two_factor");
    if (!twoFactorCookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  const cookies = getSessionCookie(request);

  // Handle /profile access
  if (!cookies) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/two-factor"],
};
