import { openai } from "@/config/openaiConfig";

export async function generateQuestion({
    subtopic,
    difficulty,
    calculatorOption,
  }: {
    subtopic: string;
    difficulty: string;
    calculatorOption: string;
  }) {
    try {
      const prompt = `Generate a ${difficulty} SAT math question on the topic of ${subtopic}. The question should ${
        calculatorOption === 'No Calculator'
          ? 'not require a calculator to solve'
          : 'be solvable with a calculator'
      }. Only include the question text, without answers or explanations.`;
  
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert SAT math question generator. Only generate the question based on the criteria provided, without answers or explanations.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 100, 
        temperature: 0.7, 
      });
  
      const questionText = response.choices[0]?.message?.content?.trim() ?? "Failed to generate question.";;
      return questionText || "Failed to generate question.";
    } catch (error) {
      console.error("Error generating question:", error);
      return "An error occurred while generating the question.";
    }
  }