import { generateQuestion } from './generateQuestion';

export const fetchAllGeneratedQuestions = async ({
    topics,
    difficulty,
    numberOfQuestions,
  }: {
    topics: string[];
    difficulty: string;
    numberOfQuestions: number;
  }) => {
    try {
      const generatedQuestions = await generateQuestion({
        topics,
        difficulty,
        numberOfQuestions,
      });
  
      return generatedQuestions;
    } catch (error) {
      console.error("Error fetching generated questions:", error);
      return [];
    }
  };