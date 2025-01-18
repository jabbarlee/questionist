import {collection, doc, getDocs} from "firebase/firestore";
import {db} from "@/config/firebase";
import {SessionData} from "@/types";

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

export const fetchResults = async ({ setSessions }: { setSessions: React.Dispatch<React.SetStateAction<SessionData[]>>}) => {
    try {
        const allSessions = await getAllResults();

        // Transform the data to match the updated `SessionData` type
        const transformedSessions = allSessions?.map((session: any): SessionData => ({
            createdAt: session.createdAt || new Date().toISOString(),
            difficulty: session.difficulty || ["unknown"], // Default to "unknown" if not provided
            numberOfQuestions: session.numberOfQuestions || 0,
            questions: session.questions || [], // Default to an empty array
            results: session.results || {
                correctAnswers: 0,
                incorrectAnswers: 0,
                numOfQuestions: 0,
                overallScore: 0,
                axpGained: 0,
                brilliantsGained: 0,
            },
            sessionId: session.sessionId || "unknown",
            sessionName: session.sessionName || "Unnamed Session",
            topics: session.topics || ["General"], // Default to "General" topic
            favorite: session.favorite || false,
        }));

        setSessions(transformedSessions || []);
    } catch (error) {
        console.error("Error fetching results:", error);
    }
}