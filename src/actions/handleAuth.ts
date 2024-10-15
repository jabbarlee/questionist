"use server"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { storeUserInfoInFirestore } from "@/actions/storeUserInfoInFirestore";

export async function handleSignIn({
    email,
    password
} : {
    email: string,
    password: string
}) {
    try{
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        let user = userCredential.user;

        if(user){
            await storeUserInfoInFirestore(user);
            console.log('User signed in successfully', user);
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