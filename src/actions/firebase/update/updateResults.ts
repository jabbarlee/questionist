import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { SessionData } from "@/types";

// Function to calculate results and rewards
function returnResults(results: boolean[]) {
    if (results.length === 0) {
        return {
            overallScore: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            numOfQuestions: 0,
            axpGained: 0,
            brilliantsGained: 0,
        };
    }

    const correctAnswers = results.filter((isCorrect) => isCorrect).length;
    const incorrectAnswers = results.length - correctAnswers;
    const score = Math.round((correctAnswers / results.length) * 100);
    const numOfQuestions = results.length;
    let axpGained = correctAnswers * 20;
    let brilliantsGained = 0;

    // Check if all answers are correct
    if (correctAnswers === numOfQuestions) {
        axpGained += 50; // Add bonus 50 AXP
        brilliantsGained = 5; // Add 5 Brilliants
    }

    return {
        overallScore: score,
        correctAnswers,
        incorrectAnswers,
        numOfQuestions,
        axpGained,
        brilliantsGained,
    };
}

// Function to update Firestore with results
export const updateResults = async (sessionId: string) => {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    try {
        const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
        const sessionSnap = await getDoc(sessionDocRef);

        if (!sessionSnap.exists()) {
            return { success: false, error: 'Session not found' };
        }

        const sessionData = sessionSnap.data() as SessionData;

        // Map results based on correct answers
        const results = sessionData?.questions?.map((question: any) => {
            return question.selectedChoice === question.correctAnswer;
        }) || [];

        // Calculate scores and rewards
        const { overallScore, correctAnswers, incorrectAnswers, numOfQuestions, axpGained, brilliantsGained } =
            returnResults(results);

        // Update Firestore with the results, including axp and brilliants
        await updateDoc(sessionDocRef, {
            results: {
                correctAnswers,
                incorrectAnswers,
                numOfQuestions,
                overallScore,
                axpGained,
                brilliantsGained,
                updatedAt: new Date().toISOString(),
            },
        });

        return { success: true, message: 'Results updated successfully.' };
    } catch (error) {
        console.error('Error updating results in Firestore:', error);
        return { success: false, error: 'Failed to update results in Firestore.' };
    }
};
