import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const deletePracticeSession = async (sessionId: string) => {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    try {
        const sessionRef = doc(db, 'users', uid, 'practiceSessions', sessionId);

        if(!sessionRef) {
            return { success: false };
        }

        await deleteDoc(sessionRef);

        return { success: true };
    } catch (error) {
        return { success: false };
    }
}