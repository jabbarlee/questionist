import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('session')?.value;
    console.log('Cookie: ', sessionCookie)

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {
        const response = await fetch(new URL('/api/firebase/verify-session', req.url), {
            headers: {
                Cookie: `session=${sessionCookie}`, // Manually forwarding session cookie
            },
        });
    
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
