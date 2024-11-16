import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Question } from '@/types';

export async function updateQuestions(sessionId: string, questions: Question[], selectedChoices: string[]) {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    const questionsToUpdate = questions.map((question, index) => ({
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
        type: question.type,
        selectedChoice: selectedChoices[index],
    }));

    try {
        const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);

        await updateDoc(sessionDocRef, { questions: questionsToUpdate });

        return { success: true, message: 'Session finished!' };
    } catch (error) {
        console.error('Error adding or updating questions:', error);

        return { success: false, error: 'Select your choices before submitting' };
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