import { generatePracticeSessionId } from "./generatePracticeSessionId"
import { db } from "@/config/firebase";
import { setDoc,getDoc, doc } from 'firebase/firestore';

export const handlePracticeStart = async ({
    selectedSubtopics,
    calculatorOption,
    difficultyOption,
    router
} : {
    selectedSubtopics: string[],
    calculatorOption: string,
    difficultyOption: string,
    router: any
}) => {
    const practiceSessionId = generatePracticeSessionId();
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    const sessionRef = doc(db, 'users', uid, 'practiceSessions', practiceSessionId);
    const sessionSnap = await getDoc(sessionRef);

    const sessionData = {
        practiceSessionId,
        selectedSubtopics,
        calculatorOption,
        difficultyOption,
        createdAt: new Date().toISOString(),
    };

    await setDoc(sessionRef, sessionData);

    router.push(`/practice/${practiceSessionId}`);
}