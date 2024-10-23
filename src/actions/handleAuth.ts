"use server"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/config/firebase";
import { fetchUser, storeUserInfoInFirestore } from "@/actions/storeUserInfoInFirestore";
import { createSessionCookie } from "@/utils/firebase/createSessionCookie";

export async function handleSignIn({
    email,
    password,

} : {
    email: string,
    password: string,
}) {
    try{
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        let user = userCredential.user;

        if(user){
            const idToken = await user.getIdToken();

            const { success } = await createSessionCookie(idToken);
            
            if(!success) {
                console.error('Error creating session cookie');
                return { success: false };
            }

            return { success: true };
        }
    } catch (error) {
        console.error("Error signing in user: ", error); 
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
            if (error.code === 'auth/email-already-in-use') {
                return { success: false, error: 'A user with this email already exists' };
              }
        }

    } catch (error: any) {
        console.error("Error creating a new user: ", error);   
        return { success: false, error: 'We are having trouble signing you up' };
    }
}