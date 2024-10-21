// middleware.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/config/firebaseAdmin';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('session')?.value;

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {
        // Verify the session cookie
        await adminAuth.verifySessionCookie(sessionCookie);
    } catch (error) {
        console.error("Error verifying session cookie: ", error);
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/profile'], 
};
