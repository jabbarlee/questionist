import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { SessionData } from "@/types";

export const fetchPracticeSessionConfig = async (
  uid: string,
  sessionId: string
): Promise<SessionData | null> => {
  try {
    const sessionRef = doc(db, "users", uid, "practiceSessions", sessionId);
    const sessionSnap = await getDoc(sessionRef);

    if (sessionSnap.exists()) {
      const sessionData = sessionSnap.data();

      // Validate the structure of sessionData
      if (
        sessionData &&
        typeof sessionData.createdAt === "string" &&
        Array.isArray(sessionData.difficulty) &&
        typeof sessionData.numberOfQuestions === "number" &&
        typeof sessionData.sessionId === "string" &&
        typeof sessionData.sessionName === "string" &&
        Array.isArray(sessionData.topics)
      ) {
        return sessionData as SessionData;
      } else {
        console.error("Session data does not match expected structure.");
        return null;
      }
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching practice session config: ", error);
    return null;
  }
};
