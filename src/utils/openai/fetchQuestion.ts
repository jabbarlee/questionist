import { v4 as uuidv4 } from 'uuid';
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
    const mockQuestions: any[] = [];

    // Randomly select topics and generate the required number of questions
    while (mockQuestions.length < numberOfQuestions) {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const questionsFromTopic = await generateQuestion({ topic: randomTopic, difficulty });

        console.log("Questions from topic: ", questionsFromTopic);

        // Add the questions to the mockQuestions array
        questionsFromTopic.forEach((questionData) => {
            const { type, question, choices, correctAnswer } = questionData;

            // Format the question object and assign a unique ID
            const formattedQuestion = {
                id: uuidv4(), // Generate a unique ID for the question
                question: question,
                correctAnswer,
                choices: type === "multiple-choice"
                    ? choices.map((choice: string, index: number) => ({
                        id: String.fromCharCode(97 + index), // 'a', 'b', 'c', 'd'
                        text: choice,
                    }))
                    : [], // If not multiple-choice, no options are needed
            };

            mockQuestions.push(formattedQuestion);

            console.log(formattedQuestion.choices)

            // If we have reached the required number of questions, stop
            if (mockQuestions.length >= numberOfQuestions) {
                console.log("Questions generated: ", mockQuestions);
                return;
            }
        });
    }

    return mockQuestions;
};
