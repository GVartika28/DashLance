import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authPages = new Set(["/login", "/signup"]);

function isProtectedPath(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/tasks") ||
    (pathname.startsWith("/api") && !pathname.startsWith("/api/auth"))
  );
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production" || req.url.startsWith("https://"),
  });

  // Debug logging for Railway
  console.log(`[Middleware] Path: ${pathname} | Token exists: ${!!token}`);
  if (!token && isProtectedPath(pathname)) {
    console.log(`[Middleware] Redirecting to login. NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}, SECRET_EXISTS: ${!!(process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET)}`);
  }

  if (authPages.has(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtectedPath(pathname) && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/tasks/:path*",
    "/api/:path*",
    "/login",
    "/signup",
  ],
};
