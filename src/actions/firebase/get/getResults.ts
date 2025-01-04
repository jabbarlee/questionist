import {doc, getDoc} from "firebase/firestore";
import {db} from "@/config/firebase";
import {SessionData} from "@/types";
import {updateResults} from "@/actions/firebase/updateDoc";

export const getResults = async (sessionId: string) => {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    try {
        const sessionRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
        const sessionSnap = await getDoc(sessionRef);

        if (sessionSnap.exists()) {
            const sessionData = sessionSnap.data() as SessionData;

            // Calculate results
            const results = sessionData?.questions?.map((question: any) => {
                return question.selectedChoice === question.correctAnswer;
            }) || [];

            const { success } = await updateResults(sessionId);

            if (success) {
                console.log(`Results for session ${sessionId} updated successfully.`);
                const updatedSessionData = (await getDoc(sessionRef)).data() as SessionData;

                return { sessionData: updatedSessionData, success: true };
            } else {
                console.error('Failed to update session results.');
                return { sessionData: null, success: false };
            }
        } else {
            console.error('No such session document in Firestore!');
            return { sessionData: null, success: false };
        }
    } catch (error) {
        console.error("Error fetching session data or updating results:", error);
        return { sessionData: null, success: false };
    }
};