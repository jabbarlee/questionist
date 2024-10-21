import { cookies } from "next/headers";
import { adminAuth } from "@/config/firebaseAdmin";
import { verifyIdToken } from "@/utils/firebase/verifyIdToken";

export const createSessionCookie = async (idToken: string) => {
    const decodedToken = await verifyIdToken(idToken);

    if(!decodedToken) {
        console.error('Error verifying ID token');
        return { success: false };
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; 

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    cookies().set('session', sessionCookie, {
        path: '/',
        maxAge: expiresIn / 1000, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return { success: true };
}