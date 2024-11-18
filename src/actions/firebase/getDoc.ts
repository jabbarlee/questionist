import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import {updateResults} from "@/actions/firebase/updateDoc";

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
                if (element.selectedChoice === element.correctAnswer) {
                    results.push(true);
                } else {
                    results.push(false);
                }
            });

            //TODO: add correctQuestions(num), overallScore (num), numberOfQuestions(num)
            const { success, message } = await updateResults(sessionId, results)

            if(success){
                const sessionData = sessionSnap.data()

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

export const fetchAllPracticeSessions = async () => {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    try {
        // Get a reference to the `practiceSessions` collection
        const sessionCollectionRef = collection(db, 'users', uid, 'practiceSessions');

        // Fetch all documents in the collection
        const sessionSnap = await getDocs(sessionCollectionRef);

        const sessions: any[] = [];
        sessionSnap.forEach((doc) => {
            sessions.push({ id: doc.id, ...doc.data() });
        });

        return sessions
    } catch (error) {
        console.error('Error fetching practice sessions:', error);
        return [];
    }
};