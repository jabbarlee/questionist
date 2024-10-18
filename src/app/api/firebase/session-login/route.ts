import { adminAuth } from '@/config/firebaseAdmin';
import { getAuth } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        const expiresIn = 60 * 60 * 24 * 5 * 1000; 

        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.json({ message: 'Session created', uid });
        response.cookies.set('session', sessionCookie, {
            path: '/',
            maxAge: expiresIn / 1000, 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return response;
        
    } catch (error) {
        console.error('Error verifying ID token or creating session:', error);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}
