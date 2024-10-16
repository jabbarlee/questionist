// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/config/firebaseAdmin"; // Firebase admin for token verification

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    // If token is not present, redirect to login
    if (url.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    try {
      // Verify the token
      await verifyIdToken(token);
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(protected)/:path*"], // Protect routes that need authentication
};
