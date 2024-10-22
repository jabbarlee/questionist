import { adminAuth } from '@/config/firebaseAdmin';

export const verifySessionCookie = async (sessionCookie: string) => {
    try {
        // Verify the session cookie and extract user claims
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
        return { success: true, decodedClaims };
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return { success: false, error: "Invalid or expired session" };
    }
};
