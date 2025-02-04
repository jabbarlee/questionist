import { openai } from "@/config/openaiConfig";
import { v4 as uuidv4 } from 'uuid';

export async function generateQuestion({
  topics,
  difficulty,
  numberOfQuestions,
}: {
  topics: string[];
  difficulty: string;
  numberOfQuestions: number;
}) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert SAT math question generator. Ensure uniqueness, avoid repetition, maintain consistent difficulty, and respond strictly in JSON format using structured outputs.",
        },
        {
          role: "user",
          content: `Generate ${numberOfQuestions} unique, non-repetitive SAT math questions on the following topics: ${topics.join(", ")}. Each question should vary in structure and complexity but maintain a ${difficulty} difficulty level.`,
        },
      ],
      functions: [
        {
          name: "generate_sat_questions",
          description: "Generates SAT math questions with multiple-choice answers.",
          parameters: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string" },
                    question: { type: "string" },
                    choices: {
                      type: "array",
                      items: { type: "string" }
                    },
                    correctAnswer: { type: "string" }
                  },
                  required: ["type", "question", "choices", "correctAnswer"]
                }
              }
            },
            required: ["questions"]
          }
        }
      ],
      function_call: { name: "generate_sat_questions" },
      max_tokens: 1000,
      temperature: 0.7,
    });

    const rawQuestions = response.choices[0]?.message?.function_call?.arguments;

    if (!rawQuestions) {
      throw new Error("Invalid structured response received from OpenAI API.");
    }

    const parsedQuestions = JSON.parse(rawQuestions).questions;

    const formattedQuestions = parsedQuestions.map((questionData: any) => {
      const { question, choices, correctAnswer } = questionData;

      return {
        id: uuidv4(),
        question,
        correctAnswer,
        choices: choices.map((choice: string, index: number) => ({
          id: String.fromCharCode(97 + index), // 'a', 'b', 'c', 'd'
          text: choice,
        })),
      };
    });

    return formattedQuestions;
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
} 