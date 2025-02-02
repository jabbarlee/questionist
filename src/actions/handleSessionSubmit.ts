import { updateResults } from "@/actions/firebase/update/updateResults";
import { updateQuestions } from "@/actions/firebase/update/updateQuestions"
import { QuestionProps, SelectedOption } from "@/types";
import {handleLevelUp} from "@/actions/handleLevelUp";

type SessionTimingInfo = {
    sessionStartTime: string,
    sessionFinishedTime: string,
    sessionDuration: {
        minutes: number,
        seconds: number
    },
    sessionRemainingTime: {
        minutes: number,
        seconds: number
    }
}

export async function handleSessionSubmit({
    sessionId,
    questions,
    selectedChoices,
    sessionTimingInfo
} : {
    sessionId: string,
    questions: QuestionProps[],
    selectedChoices: SelectedOption[],
    sessionTimingInfo: SessionTimingInfo
}) {
    const res = await updateQuestions(sessionId, questions, selectedChoices, sessionTimingInfo);

    if (res?.success) {
        const { success, message } = await updateResults(sessionId);

        if(!success) {
            return { success: false, errorMessage: message };
        }

        return { success: true, message: "Session submitted successfully" };
    }

    return { success: false, errorMessage: "Failed to update questions" };
}