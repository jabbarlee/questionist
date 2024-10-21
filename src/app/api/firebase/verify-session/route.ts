import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/config/firebaseAdmin";
import type { NextRequest } from "next/server";
import { getCookie } from "@/utils/getCookie";

export async function GET(request: NextRequest) {
    // const cookieStore = cookies();

    const session = await getCookie('session');
    console.log('Cookie: ', session)
  
    if (!session) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }
  
    // const decodedClaims = await adminAuth.verifySessionCookie(session, true);

    // console.log(decodedClaims)
  
    // if (!decodedClaims) {
    //   return NextResponse.json({ isLogged: false }, { status: 401 });
    // }
  
    return NextResponse.json({ isLogged: true }, { status: 200 });
}