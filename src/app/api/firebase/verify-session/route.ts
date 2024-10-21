import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/config/firebaseAdmin";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = req.cookies.get('session')?.value;
  
    if (!session) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }
  
    try{
      const response = await adminAuth.verifySessionCookie(session);
      return NextResponse.json({ isLogged: true }, { status: 200 });
    } catch (error) {
      console.error("Error verifying session cookie: ", error);
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }
}