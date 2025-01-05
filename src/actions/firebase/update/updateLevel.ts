import {doc, getDoc} from "firebase/firestore";
import {db} from "@/config/firebase";
import {SessionData} from "@/types";
import {handleLevelUp} from "@/actions/handleLevelUp";


export const updateLevel = async({ sessionId } : { sessionId: string }) => {
    const response = await fetch('/api/firebase/get/user');
    const {uid} = await response.json();

    const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
    const sessionSnap = await getDoc(sessionDocRef);

    if (!sessionSnap.exists()) {
        return { success: false, error: 'Session not found' };
    }

    const sessionData = sessionSnap.data() as SessionData;

    await handleLevelUp(uid, sessionData?.results?.axpGained || 0);

    return { success: true, message: 'Level updated' };
}

export const updatePointsManual = async({ points } : { points: number }) => {
    const response = await fetch('/api/firebase/get/user');
    const {uid} = await response.json();

    await handleLevelUp(uid, points);

    return { success: true, message: 'Level updated' };
}