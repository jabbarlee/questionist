import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { QuestionProps, SelectedOption } from '@/types';
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

        const { success } = await getResults(sessionId);

        return { success: true, message: 'Session finished!' };
    } catch (error) {
        console.error('Error adding or updating questions:', error);
        return { success: false, error: 'Failed to submit your session.' };
    }
}

export async function updateResults(sessionId: string, results: boolean[]){
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    function returnResults(results: boolean[]) {
        if (results.length === 0) {
            return { overallScore: 0, correctAnswers: 0, incorrectAnswers: 0, numOfQuestions: 0 };
        }

        const correctAnswers = results.filter((isCorrect) => isCorrect).length;
        const incorrectAnswers = results.length - correctAnswers;
        const score = Math.round((correctAnswers / results.length) * 100);
        const numOfQuestions = results.length

        return { overallScore: score, correctAnswers, incorrectAnswers, numOfQuestions };
    }


    try{
        const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);
        const overallScore = returnResults(results)

        await updateDoc(sessionDocRef, { results: overallScore });

        return { success: true, message: 'Results added to Firestore successfully' }
    } catch(error){
        console.error(error)

        return { success: false, message: 'Something went wrong' }
    }
}
