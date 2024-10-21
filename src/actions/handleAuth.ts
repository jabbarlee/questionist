"use server"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { storeUserInfoInFirestore } from "@/actions/storeUserInfoInFirestore";
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
            await storeUserInfoInFirestore(user);
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
    password
} : {
    email: string,
    password: string
}) {
    try{
        //sign up a new user
        let newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
        let newUser = newUserCredential.user;
        
        //store info in firestore
        await storeUserInfoInFirestore(newUser);

    } catch (error) {
        console.error("Error creating a new user: ", error);   
    }
}