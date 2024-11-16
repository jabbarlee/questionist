import { getAuth, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { PracticeStartProps } from '@/types';
import { generatePracticeSessionId } from "../generatePracticeSessionId";

export const storeUserInfoInFirestore = async (user: User, fullName?: string) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (!userDocSnap.exists()) {
        // If the user document doesn't exist, create one with additional information
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || fullName || '', 
          createdAt: new Date(),
          role: 'student' 
        });

        return { success: true, message: 'Successfully signed up' };
      } else {
        console.log('User already exists in Firestore');
        return { success: false, error: 'User already exists with this email' };
      }
    } catch (error) {
      console.error("Error storing user info in Firestore: ", error);

      return { success: false, error: 'We are having trouble signing you up' };
    }
  };

export const storePracticeSession = async ({
    selectedSubtopics,
    calculatorOption,
    difficultyOption,
    router
} : PracticeStartProps) => {
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