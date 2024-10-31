import { generatePracticeSessionId } from "./generatePracticeSessionId"
import { db } from "@/config/firebase";
import { getDoc, doc } from 'firebase/firestore';

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


    console.log({
        'selectedSubtopics': selectedSubtopics,
        'calculatorOption': calculatorOption,
        difficultyOption,
        uid,
        practiceSessionId
    })
    // const sessionRef = doc(db, 'users', userId, 'practiceSessions', practiceSessionId);
    // const sessionSnap = await getDoc(sessionRef);

    // router.push(`/practice/${practiceSessionId}`);
}