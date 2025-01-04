import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { QuestionProps, SelectedOption, SessionData } from '@/types';
import { getResults } from './getDoc';

export async function updateQuestions(
    sessionId: string,
    questions: QuestionProps[],
    selectedChoices: SelectedOption[]
) {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    if (questions.length !== selectedChoices.length) {
        return { success: false, error: 'You have not finished all the questions' };
    }

    if (questions.length === 0) {
        return { success: false, error: 'Session was not found' };
    }

    const questionsToUpdate = questions.map((question, index) => ({
        type: "multiple-choice",
        questionText: question.question,
        choices: question.choices.map((choice) => choice.text),
        correctAnswer: question.correctAnswer,
        selectedChoice: selectedChoices[index]?.selectedOptionText || null,
    }));

    try {
        // Reference the Firestore document
        const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);

        // Update the Firestore document
        await updateDoc(sessionDocRef, {
            questions: questionsToUpdate,
            updatedAt: new Date().toISOString(),
        });

        // const { success } = await getResults(sessionId);

        return { success: true, message: 'Session finished' };

    } catch (error) {
        console.error('Error updating questions in Firestore:', error);
        return { success: false, error: 'Failed to submit your session.' };
    }
}

function returnResults(results: boolean[]) {
    if (results.length === 0) {
        return { overallScore: 0, correctAnswers: 0, incorrectAnswers: 0, numOfQuestions: 0, axpGained: 0, brilliantsGained: 0 };
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

    return { overallScore: score, correctAnswers, incorrectAnswers, numOfQuestions, axpGained, brilliantsGained };
}

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

        const results = sessionData?.questions?.map((question: any) => {
            return question.selectedChoice === question.correctAnswer;
        }) || [];

        // Calculate scores
        const correctAnswers = results.filter(Boolean).length;
        const totalQuestions = results.length;
        const overallScore = Math.round((correctAnswers / totalQuestions) * 100);

        await updateDoc(sessionDocRef, {
            results: {
                correctAnswers,
                incorrectAnswers: totalQuestions - correctAnswers,
                numOfQuestions: totalQuestions,
                overallScore,
                updatedAt: new Date().toISOString(),
            },
        });

        return { success: true, message: 'Results updated successfully.' };
    } catch (error) {
        console.error('Error updating results in Firestore:', error);
        return { success: false, error: 'Failed to update results in Firestore.' };
    }
};

export async function favoriteSession(sessionId: string) {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    try {
        const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
        const sessionDoc = await getDoc(sessionDocRef);

        if (!sessionDoc.exists()) {
            return { success: false, message: 'Session not found' };
        }

        const currentFavoriteStatus = sessionDoc.data()?.favorite || false;
        const newFavoriteStatus = !currentFavoriteStatus;

        await updateDoc(sessionDocRef, { favorite: newFavoriteStatus });

        return { success: true, message: `Session ${newFavoriteStatus ? 'added to' : 'removed from'} favorites` };
    } catch (error) {
        console.error(error);

        return { success: false, message: 'Something went wrong' };
    }
}