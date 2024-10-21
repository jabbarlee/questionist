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
        const response = await fetch('http://localhost:3000/api/firebase/verify-session')

        const { isLogged } = await response.json();
        if (!isLogged) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
        
    } catch (error) {
        console.error("Error verifying session cookie: ", error);
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/profile'], 
};
