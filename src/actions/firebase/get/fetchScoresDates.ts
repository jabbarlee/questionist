import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase"; // Firestore configuration
import dayjs from "dayjs";

type PracticeSession = {
    date: string; // Formatted date
    score: number; // Overall score
};

export async function fetchScoresDates(): Promise<PracticeSession[]> {
    try {
        // Fetch the current user's UID from the API
        const response = await fetch("/api/firebase/get/user");
        const { uid } = await response.json();

        // Reference to the practiceSessions subcollection for the specific user
        const sessionsRef = collection(db, "users", uid, "practiceSessions");

        // Create a query to fetch sessions in ascending order of 'createdAt'
        const q = query(sessionsRef, orderBy("createdAt", "asc"));

        // Fetch the documents
        const querySnapshot = await getDocs(q);

        // Map and format the documents
        const sessions = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                date: dayjs(data.createdAt).format("YYYY-MM-DD"), // Format Firestore timestamp to YYYY-MM-DD
                score: data.results?.overallScore || 0, // Default to 0 if no overallScore is present
            };
        });

        return sessions;
    } catch (error) {
        console.error("Error fetching practice sessions:", error);
        return [];
    }
}
