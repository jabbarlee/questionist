import { updateResults } from "@/actions/firebase/update/updateResults";
import { updateQuestions } from "@/actions/firebase/update/updateQuestions"
import { QuestionProps, SelectedOption } from "@/types";
import {handleLevelUp} from "@/actions/handleLevelUp";

export async function handleSessionSubmit({
    sessionId,
    questions,
    selectedChoices,
} : {
    sessionId: string,
    questions: QuestionProps[],
    selectedChoices: SelectedOption[],
}) {
    const res = await updateQuestions(sessionId, questions, selectedChoices);

    if (res?.success) {
        const { success, message, leveledUp } = await updateResults(sessionId);

        if(!success) {
            return { success: false, errorMessage: message };
        }

        return { success: true, message: "Session submitted successfully", leveledUp: leveledUp };
    }

    return { success: false, errorMessage: "Failed to update questions" };
}