import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { SessionData } from "@/types"; // Import SessionData type

export const fetchPracticeSessionConfig = async (sessionId: string): Promise<SessionData | null> => {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    try {
        const sessionRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
        const sessionSnap = await getDoc(sessionRef);

        if (sessionSnap.exists()) {
            const sessionData = sessionSnap.data() as SessionData; // Cast to SessionData type
            console.log({ sessionData });
            return sessionData;
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error("Error fetching practice session config: ", error);
        return null;
    }
}
