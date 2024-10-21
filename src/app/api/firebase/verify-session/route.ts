import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/config/firebaseAdmin";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const session = cookies().get("session")?.value || "";
  
    if (!session) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }
  
    const decodedClaims = await adminAuth.verifySessionCookie(session, true);
  
    if (!decodedClaims) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }
  
    return NextResponse.json({ isLogged: true }, { status: 200 });
}