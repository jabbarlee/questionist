import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const fetchPracticeSessionConfig = async (sessionId: string) => {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    try{
        const sessionRef = doc(db, 'users', uid, 'practiceSessions', sessionId);

        const sessionSnap = await getDoc(sessionRef);

        if (sessionSnap.exists()) {
            const sessionData = sessionSnap.data();
            console.log({sessionData})
            return sessionData;

        } else {
            console.error('No such document!');
            return null; 
        }
    }catch(error){
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
            const sessionData = sessionSnap.data();

            // Main logic
            sessionData.questions.forEach((element: any, index: number) => {
                console.log('Selected:', element.selectedChoice, 'Correct:', element.correctAnswer, 'Index:', index, 'Type:', element.type);

                if (element.selectedChoice === element.correctAnswer) {
                    results.push(true);
                } else {
                    results.push(false);
                }
            });

            return { results, sessionData, success: true };
        } else {
            console.error('No such document!');
            return { results: [], sessionData: null, success: false };
        }
    } catch (error) {
        console.error("Error fetching practice session config:", error);
        return { results: [], sessionData: null, success: false };
    }
};