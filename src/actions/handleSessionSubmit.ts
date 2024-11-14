import { updateQuestions } from "@/actions/firebase/updateDoc";
import { Question } from "@/types";

export async function handleSessionSubmit({
    sessionId,
    questions,
    selectedChoices,
    setError,
    setMessage
} : {
    sessionId: string,
    questions: Question[],
    selectedChoices: string[],
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>
}) {
    setError(null);
    const res = await updateQuestions(sessionId, questions, selectedChoices);
    
    if (res?.success) {
      setError(null);
      setMessage('Session submitted successfully');
    } else {
      setError(res?.error || 'Something went wrong');
    }
}