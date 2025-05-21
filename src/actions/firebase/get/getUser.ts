import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { UserData } from "@/types";

export const getUser = async ({ uid }: { uid: string }) => {
  try {
    if (!uid) {
      console.error("User ID is missing");
      return null;
    }

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};

export const getUserUid = async () => {
  try {
    const response = await fetch("/api/firebase/get/user");
    const { uid } = await response.json();

    if (!uid) {
      console.error("User ID is missing");
      return null;
    }

    return uid;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};
