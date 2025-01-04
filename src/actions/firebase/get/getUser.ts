import {doc, getDoc} from "firebase/firestore";
import {db} from "@/config/firebase";

export const getUser = async () => {
    try {
        const response = await fetch('/api/firebase/get/user');
        const { uid } = await response.json();

        if (!uid) {
            console.error("User ID is missing");
            return null;
        }

        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return null;
    }
}