import {collection, doc, getDocs} from "firebase/firestore";
import {db} from "@/config/firebase";

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