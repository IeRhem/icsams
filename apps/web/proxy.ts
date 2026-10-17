import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    if (typeof payload.exp === "number") {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp <= now) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const rawToken =
    request.cookies.get("access_token")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("auth_token")?.value;

  const isAuthenticated = isTokenValid(rawToken);

  const isAuthPage = pathname.startsWith("/auth/");

  // Protected dashboard routes
  if (!isAuthenticated && !isAuthPage) {
    const loginUrl = new URL("/auth/login", request.url);
    const destination = `${pathname}${search}`;
    if (destination !== "/") {
      loginUrl.searchParams.set("redirect", destination);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in, redirect away from login page
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - static asset extensions (.svg, .png, .jpg, .jpeg, .webp, .ico)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
