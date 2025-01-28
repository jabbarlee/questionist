import { updateDoc, doc, getDoc } from "firebase/firestore";
import { fetchLevelThresholds } from "@/actions/firebase/get/fetchLevelThresholds"; // Fetch thresholds from Firestore
import { db } from "@/config/firebase";

export const handleLevelUp = async (userId: string, earnedAXP: number) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (!userData) throw new Error("User not found");

    let { level, axp, brilliants } = userData || {};
    if (level === undefined) level = 1; // Default to level 1 if undefined
    if (axp === undefined) axp = 0;   // Default to 0 AXP if undefined
    if (brilliants === undefined) brilliants = 0; // Default to 0 brilliants if undefined

    // Add the earned AXP
    axp += earnedAXP;

    // Fetch level thresholds
    const levelThresholds = await fetchLevelThresholds();

    let newLevel = level;
    let brilliantsEarned = 0;
    let leveledUp = false; // To track if the user leveled up

    // Process level progression
    while (
        levelThresholds[newLevel] &&
        axp >= levelThresholds[newLevel]?.reward?.axp
        ) {
        brilliantsEarned += levelThresholds[newLevel]?.reward?.brilliants || 0;
        newLevel++;
        leveledUp = true; // Indicate level-up occurred
    }

    // Cap level to the maximum defined in thresholds
    if (newLevel > levelThresholds.length) {
        newLevel = levelThresholds.length;
    }

    const progressToNextLevel = newLevel < levelThresholds.length
        ? Math.round(((axp - levelThresholds[newLevel - 1]?.reward.axp) /
            (levelThresholds[newLevel]?.reward.axp - levelThresholds[newLevel - 1]?.reward.axp)) * 100)
        : 100; // Max progress for highest level

    const axpToNextLevel = newLevel < levelThresholds.length
        ? levelThresholds[newLevel]?.reward.axp - axp
        : 0;

    // Update Firestore
    await updateDoc(userRef, {
        level: newLevel,
        axp,
        brilliants: brilliants + brilliantsEarned,
        progressToNextLevel,
        axpToNextLevel,
    });

    return {
        newLevel,
        axp,
        brilliants: brilliants + brilliantsEarned,
        progressToNextLevel,
        leveledUp, // Include the level-up flag in the return
    };
};
