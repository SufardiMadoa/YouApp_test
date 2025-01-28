import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  if (!token) {
    // Redirect user to login page if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow access if authenticated
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect specific routes
};
