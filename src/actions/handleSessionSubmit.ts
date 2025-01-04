import { updateResults } from "@/actions/firebase/update/updateResults";
import { updateQuestions } from "@/actions/firebase/update/updateQuestions"
import { QuestionProps, SelectedOption } from "@/types";

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
        const { success } = await updateResults(sessionId);

        if(success) {
            return { success: true };
        }

        return { success: false, error: "Failed to update results" };
    }

    return { success: false, error: "Failed to update questions" };
}