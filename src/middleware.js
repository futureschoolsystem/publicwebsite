import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // 1. Handle CORS for all API routes so mobile apps & browsers can connect freely
  if (pathname.startsWith("/api/")) {
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
    return response;
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect authenticated users away from login page
  if (
    token &&
    (token.userName || token.registrationNo) &&
    pathname.startsWith("/login")
  ) {
    return NextResponse.redirect(new URL(`/${token.role}`, req.url));
  }

  // Skip static files and Next.js internals
  if (
    !pathname.startsWith("/student") &&
    !pathname.startsWith("/teacher") &&
    !pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  // Allow public access to login page
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Redirect if not authenticated (no token for either user type)
  if (
    !token ||
    (
      !token.userName &&
      !token.registrationNo
    )
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Only allow admins/teachers/students to their parts
  if (pathname.startsWith("/student") && token.role !== "student") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/teacher") && token.role !== "teacher") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
