"use server"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/config/firebase";
import { storeUserInfoInFirestore } from "@/actions/firebase/storeUserInfoInFirestore";
import { createSessionCookie } from "@/utils/firebase/createSessionCookie";

export async function handleSignIn({
    email,
    password
}: {
    email: string,
    password: string
}) {
    try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        let user = userCredential.user;

        if (user) {
            const idToken = await user.getIdToken();
            const { success } = await createSessionCookie(idToken);
            
            if (!success) {
                console.error('Error creating session cookie');
                return { success: false, error: 'We are having trouble signing you in' };
            }

            return { success: true };
        }
    } catch (error: any) {
        console.error("Full error object: ", error);

        const errorMessages: { [key: string]: string } = {
            'auth/user-not-found': 'Email does not exist.',
            'auth/wrong-password': 'Incorrect password.',
            'auth/missing-password': 'Please provide the password.',
            'auth/invalid-email': 'Invalid email format.',
            'auth/user-disabled': 'This account has been disabled.',
            'auth/too-many-requests': 'Too many login attempts.',
            'auth/invalid-credential': 'Invalid credentials.',
        };

        const errorMessage = errorMessages[error.code] || `Unexpected error: ${error.message || 'An unexpected error occurred'}`;

        return { success: false, error: errorMessage };
    }
}

export async function handleSignUp({
    email,
    password,
    fullName
} : {
    email: string,
    password: string,
    fullName: string
}) {
    try{
        try{
            if (email?.length === 0 || password?.length === 0 || fullName?.length === 0) {
                return { success: false, error: 'Please fill in all fields' };
            }

            let newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
            let user = newUserCredential.user;
    
            if(user){
                const { error } = await storeUserInfoInFirestore(user, fullName);

                if(error) {
                    return { success: false, error };
                }
                const idToken = await user.getIdToken();
    
                const { success } = await createSessionCookie(idToken);
                
                if(!success) {
                    console.error('Error creating session cookie');
                    return { success: false, error: 'We are having trouble signing you up' };
                }
    
                return { success: true };
            }
        } catch (error: any) {
            const errorMessages: { [key: string]: string } = {
                'auth/email-already-in-use': 'This user already exists.',
                'auth/invalid-email': 'Invalid email format.',
                'auth/weak-password': 'Password should be at least 6 characters long.',
            };
    
            const errorMessage = errorMessages[error.code] || `Unexpected error: ${error.message || 'An unexpected error occurred'}`;
    
            return { success: false, error: errorMessage };
        }

    } catch (error: any) {
        console.error("Error creating a new user: ", error);   
        return { success: false, error: 'We are having trouble signing you up' };
    }
}