import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { SessionData } from "@/types";
import { updateResults } from "./updateDoc";

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

export const getResults = async (sessionId: string) => {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    const results: boolean[] = [];

    try {
        const sessionRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
        const sessionSnap = await getDoc(sessionRef);

        if (sessionSnap.exists()) {
            const sessionData = sessionSnap.data() as SessionData;

            // Main logic
            sessionData?.questions?.forEach((element: any, index: number) => {
                if (element.selectedChoice === element.correctAnswer) {
                    results.push(true);
                } else {
                    results.push(false);
                }
            });

            //TODO: add correctQuestions(num), overallScore (num), numberOfQuestions(num)
            const { success, message } = await updateResults(sessionId, results)

            if(success){
                const sessionData = sessionSnap.data() as SessionData;

                //TODO: only send sessionData
                return { sessionData: sessionData, success: true };
            }else{
                return { sessionData: null, success: true}
            }
        } else {
            console.error('No such document!');
            return { sessionData: null, success: false };
        }
    } catch (error) {
        console.error("Error fetching practice session config:", error);
        return { sessionData: null, success: false };
    }
};