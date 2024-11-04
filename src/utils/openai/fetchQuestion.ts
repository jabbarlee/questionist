interface QuestionData {
  type: 'multiple-choice' | 'open';
  question: string;
  choices?: string[];
}

export const fetchQuestion = async ({ 
    subtopic, 
    difficulty, 
    calculatorOption,
    setQuestions
}: { 
    subtopic: string, 
    difficulty: string, 
    calculatorOption: string,
    setQuestions: React.Dispatch<any>
}) => {

    try {
      const response = await fetch('/api/questions/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subtopic, difficulty, calculatorOption }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate question');
      }

      const data = await response.json();
      const questionData: QuestionData = data.question; 

      setQuestions((prevQuestions: QuestionData[]) => [...prevQuestions, questionData]);
    } catch (error) {
      console.error("Error fetching question:", error);
    //   setError("Error generating question");
    } finally {
    //   setLoading(false);
    }
  };
