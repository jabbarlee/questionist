import { setDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { levelBadges } from "@/data/levelBadges"; // Import the level badges array

export const insertLevelBadges = async () => {
    const levelBadgesRef = doc(db, "appConfig", "levelBadges"); // Reference the document

    // Set the document with the correct structure
    await setDoc(levelBadgesRef, { levelBadges });

    console.log("Level badges inserted successfully.");
    return { success: true, message: "Level badges inserted successfully" };
};