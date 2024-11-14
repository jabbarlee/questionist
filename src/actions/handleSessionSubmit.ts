import { updateQuestions } from "@/actions/firebase/updateDoc";
import { Question } from "@/types";

export async function handleSessionSubmit({
    sessionId,
    questions,
    selectedChoices,
    setError,
    setMessage,
    handleNavigate
} : {
    sessionId: string,
    questions: Question[],
    selectedChoices: string[],
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>,
    handleNavigate: (url: string) => void
}) {
    setError(null);
    const res = await updateQuestions(sessionId, questions, selectedChoices);
    
    if (res?.success) {
      setError(null);
      setMessage('Session submitted successfully');

      handleNavigate('/results/' + sessionId);
    } else {
      setError(res?.error || 'Something went wrong');
    }
}