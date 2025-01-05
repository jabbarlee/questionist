import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const fetchLevelThresholds = async () => {
    const levelBadgesRef = doc(db, "appConfig", "levelBadges");
    const levelBadgesSnap = await getDoc(levelBadgesRef);

    if (!levelBadgesSnap.exists()) {
        throw new Error("Level badges not found.");
    }

    const { levelBadges } = levelBadgesSnap.data();
    if (!Array.isArray(levelBadges)) {
        throw new Error("Invalid structure: 'levelBadges' is not an array.");
    }

    // Ensure badges are sorted by level
    return levelBadges.sort((a: any, b: any) => a.level - b.level);
};