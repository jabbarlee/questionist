import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { QuestionProps, SelectedOption } from '@/types';

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

        return { success: true, message: 'Session finished!' };
    } catch (error) {
        console.error('Error adding or updating questions:', error);
        return { success: false, error: 'Failed to submit your session.' };
    }
}
