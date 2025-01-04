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

    try {
        const sessionRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
        const sessionSnap = await getDoc(sessionRef);

        if (sessionSnap.exists()) {
            const sessionData = sessionSnap.data() as SessionData;

            // Calculate results
            const results = sessionData?.questions?.map((question: any) => {
                return question.selectedChoice === question.correctAnswer;
            }) || [];

            const { success } = await updateResults(sessionId, results);

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

export const getUser = async () => {
    try {
        const response = await fetch('/api/firebase/get/user');
        const { uid } = await response.json();

        if (!uid) {
            console.error("User ID is missing");
            return null;
        }

        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return null;
    }
}