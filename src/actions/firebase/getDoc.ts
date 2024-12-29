import { getDoc, doc, collection, getDocs } from "firebase/firestore";
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
            const sessionData = sessionSnap.data();

            // Validate the structure of sessionData
            if (
                sessionData &&
                typeof sessionData.createdAt === "string" &&
                Array.isArray(sessionData.difficulty) &&
                typeof sessionData.numberOfQuestions === "number" &&
                typeof sessionData.sessionId === "string" &&
                typeof sessionData.sessionName === "string" &&
                Array.isArray(sessionData.topics)
            ) {
                return sessionData as SessionData;
            } else {
                console.error("Session data does not match expected structure.");
                return null;
            }
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error("Error fetching practice session config: ", error);
        return null;
    }
};

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

            const { success, message } = await updateResults(sessionId, results)

            if(success){
                const sessionData = sessionSnap.data() as SessionData;

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

export const getAllResults = async () => {
    try {
        // Fetch the user UID first
        const response = await fetch('/api/firebase/get/user');
        const { uid } = await response.json();

        if (!uid) {
            console.error("User ID is missing");
            return null;
        }

        const practiceSessionsRef = collection(doc(db, 'users', uid), 'practiceSessions');

        const querySnapshot = await getDocs(practiceSessionsRef);

        const practiceSessions: {id: string}[] = querySnapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID if needed
            ...doc.data()
        }));

        return practiceSessions;
    } catch (error) {
        console.error("Error fetching practice sessions: ", error);
        return null;
    }
};