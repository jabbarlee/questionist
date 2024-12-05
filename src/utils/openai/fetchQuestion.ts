import { generateQuestion } from './generateQuestion';

export const fetchGeneratedQuestions = async ({
    topics,
    difficulty,
    numberOfQuestions,
}: {
    topics: string[];
    difficulty: string;
    numberOfQuestions: number;
}) => {
    const mockQuestions: any[] = [];

    // Randomly select topics and generate the required number of questions
    while (mockQuestions.length < numberOfQuestions) {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const questionsFromTopic = await generateQuestion({ topic: randomTopic, difficulty });

        // Add the questions to the mockQuestions array
        questionsFromTopic.forEach((questionData) => {
            const { type, question, choices, correctAnswer } = questionData;

            // Format the question object
            const formattedQuestion = {
                questionText: question,
                correctAnswer,
                options: type === "multiple-choice"
                    ? choices.map((choice: string, index: number) => ({
                        id: String.fromCharCode(97 + index), // 'a', 'b', 'c', 'd'
                        text: choice,
                    }))
                    : [], // If not multiple-choice, no options are needed
            };

            mockQuestions.push(formattedQuestion);

            // If we have reached the required number of questions, stop
            if (mockQuestions.length >= numberOfQuestions) {
                return;
            }
        });
    }

    return mockQuestions;
};
