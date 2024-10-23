import { getAuth, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

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