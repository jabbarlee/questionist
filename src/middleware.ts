import { NextRequest, NextResponse } from "next/server";

const VERIFY_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-session`;

export async function middleware(req: NextRequest) {
  console.log("[Edge] VERIFY_URL =", VERIFY_URL);

  const session = req.cookies.get("session")?.value;
  if (!session) {
    console.log("[Edge] no session cookie");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    console.log("[Edge] calling", VERIFY_URL);
    const res = await fetch(VERIFY_URL, {
      headers: { cookie: `session=${session}` },
      cache: "no-store",
    });
    console.log("[Edge] status", res.status);

    if (!res.ok) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const { isLogged } = await res.json();
    if (!isLogged) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  } catch (err) {
    console.error("[Edge] fetch failed", err);
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard", "/practice", "/contracts"] };
