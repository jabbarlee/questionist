import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

type Question = {
  question: string;
  choices?: string[];
  correctAnswer: string;
  type: string;
};

export async function updateQuestions(sessionId: string, questions: Question[]) {
    const response = await fetch('/api/firebase/get/user');
    const { uid } = await response.json();

  try {
    const sessionDocRef = doc(db, 'users', uid, 'practiceSessions', sessionId);

    await updateDoc(sessionDocRef, { questions });

    console.log('Questions array added or updated successfully');
  } catch (error) {
    console.error('Error adding or updating questions:', error);
  }
}
