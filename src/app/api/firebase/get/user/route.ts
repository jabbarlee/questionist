import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/config/firebaseAdmin";

export async function GET(req: NextRequest) {

    const session = req.cookies.get('session')?.value;
    console.log({session})

    if (!session) {
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    try{
        const decodedClaims = await adminAuth.verifySessionCookie(session);
        const uid = decodedClaims.uid;
        return NextResponse.json({ uid });
    } catch (error) {
        return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
    }
}