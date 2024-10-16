import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/config/firebaseAdmin"; 
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {

    console.log("Middleware executing...");

    const token = cookies().get("token")?.value; 
    console.log("Token:", token);
    const url = req.nextUrl.clone();

    console.log("Token from cookies:", token);

    if (!token) {
        if (url.pathname !== "/signin") {
            return NextResponse.redirect(new URL("/signin", req.url)); // Redirect if not authenticated
        }
    } else {
        try {
            await verifyIdToken(token); // Verify token
        } catch (error) {
            console.error("Token verification failed:", error); // Log the error
            return NextResponse.redirect(new URL("/signin", req.url)); // Redirect if token verification fails
        }
    }

    return NextResponse.next(); // Proceed if authenticated
}

export const config = {
    matcher: ["/dashboard"], // Protect specific routes
};
