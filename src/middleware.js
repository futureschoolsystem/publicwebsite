import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
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

 // Only allow admins to thier parts
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