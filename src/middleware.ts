import { getAuth } from 'firebase-admin/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('session')?.value || '';

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/signin', req.url));
    } else{
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/dashboard/:path*'], 
};