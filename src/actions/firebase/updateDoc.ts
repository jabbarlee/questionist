import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Question } from '@/types';
import { SelectedOption } from '@/types'

export async function updateQuestions(sessionId: string, questions: Question[], selectedChoices: SelectedOption[]) {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

    const questionsToUpdate = questions.map((question, index) => ({
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
        type: question.type,
        selectedChoice: selectedChoices[index].selectedOptionText,
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

