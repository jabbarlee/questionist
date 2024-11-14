import { QuestionData } from "@/components/pages/PracticeSession/QuestionsWrapper/types";

export const handleChoiceSelect = (
    choice: string, 
    questionIndex: number, 
    setSelectedChoices: React.Dispatch<React.SetStateAction<(string)[]>>, 
    selectedChoices: (string | null)[], 
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    questions: QuestionData[]
) => {
    setError(null);

    setSelectedChoices(prevChoices => {
        const updatedChoices = [...prevChoices];
        updatedChoices[questionIndex] = choice;

        // Calculate the percentage of selected choices based on the updated state
        const selectedCount = updatedChoices.filter(choice => choice !== null).length;
        const totalQuestions = questions.length;
        const progressPercentage = Math.round((selectedCount / totalQuestions) * 100);

        setProgress(progressPercentage);

        return updatedChoices;
    });
  };