import {fetchPracticeSessionConfig} from "@/actions/firebase/get/fetchPracticeSessionConfig";
import { SessionData } from "@/types";

export const getSessionData = async ({ sessionId, setSessionData }: {
    sessionId: string;
    setSessionData: React.Dispatch<React.SetStateAction<SessionData | null>>;
}) => {
    const fetchedSessionData = await fetchPracticeSessionConfig(sessionId);
    if (fetchedSessionData) {
        setSessionData(fetchedSessionData);
    } else {
        console.error("No session data found.");
    }
};