"use server"

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { storeUserInfoInFirestore } from "@/actions/storeUserInfoInFirestore";
import { cookies } from "next/headers";

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
            console.log('User signed in successfully', user);

            //store token in cookies
            const token = await user.getIdToken();

            cookies().set({
                name: "token", 
                value: token,
                maxAge: 86400, 
                path: "/", 
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production", 
                sameSite: "strict", 
            });

            // Return success response
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