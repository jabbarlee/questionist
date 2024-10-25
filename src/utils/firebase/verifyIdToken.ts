"use server";

import { adminAuth } from "@/config/firebaseAdmin";

export const verifyIdToken = async (token: string) => {
    return await adminAuth.verifyIdToken(token);
}