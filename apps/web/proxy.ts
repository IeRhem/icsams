import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("access_token")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("auth_token")?.value;

  const isAuthPage = pathname.startsWith("/auth/");

  // Protected dashboard routes
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/auth/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in, redirect away from login page
  if (token && isAuthPage) {
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
