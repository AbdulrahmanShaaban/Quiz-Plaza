import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/verify"];
const PROTECTED_PREFIXES = ["/dashboard", "/profile", "/game/"];
const PROTECTED_EXACT = ["/rooms"];

function isProtectedPath(pathname: string): boolean {
  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  if (PROTECTED_EXACT.includes(pathname)) return false;
  if (/^\/rooms\/[^/]+$/.test(pathname)) return true;
  if (pathname.startsWith("/results/")) return true;
  return false;
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

async function validateSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("token")?.value;
  if (!token) return false;
  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: { cookie: `token=${token}` },
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const authenticated = await validateSession(request);

  if (isProtectedPath(pathname) && !authenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && authenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
