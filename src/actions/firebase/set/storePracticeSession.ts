import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { PracticeStartProps } from "@/types";
import { generatePracticeSessionId } from "@/utils/generatePracticeSessionId";

export const storePracticeSession = async ({
  uid,
  topics,
  difficulty,
  sessionName,
  numberOfQuestions,
}: PracticeStartProps) => {
  try {
    const sessionId = generatePracticeSessionId();

    const sessionRef = doc(db, "users", uid, "practiceSessions", sessionId);

    const sessionData = {
      sessionId,
      sessionName,
      difficulty,
      topics,
      numberOfQuestions,
      createdAt: new Date().toISOString(),
    };

    await setDoc(sessionRef, sessionData);

    return { success: true, sessionId };
  } catch (error) {
    return { success: false, sessionId: null, error: error };
  }
};
