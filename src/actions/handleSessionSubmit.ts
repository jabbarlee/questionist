import { updateQuestions } from "@/actions/firebase/updateDoc";
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
      return { success: true };

    } else {
      return { success: false, error: 'Error submitting session'  };
    }
}