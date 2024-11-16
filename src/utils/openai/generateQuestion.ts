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
  const prompt = `Generate a ${difficulty} SAT math question on the topic of ${subtopic}. The question should ${
    calculatorOption === 'No Calculator' ? 'not require a calculator' : 'be solvable with a calculator'
  }. Specify if it's a "multiple-choice" question or an "open" question. Provide the correct answer to the question generated. 
    Format the response in JSON as follows:
  
  {
    "type": "multiple-choice" | "open",
    "question": "The generated question text.",
    "choices": ["Option A", "Option B", "Option C", "Option D"] // Include choices only if type is "multiple-choice",
    "correctAnswer": "The correct answer to the question."
  }`;

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
    max_tokens: 150,
    temperature: 0.7,
  });

  const questionData = JSON.parse(response.choices[0]?.message?.content?.trim() ?? '');
  return questionData;
}