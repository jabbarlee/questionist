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

    console.log(typeof questionsToUpdate);

    try {
        const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);

        await updateDoc(sessionDocRef, { questions: questionsToUpdate });

        console.log('Questions array added or updated successfully');
    } catch (error) {
        console.error('Error adding or updating questions:', error);
    }
}

