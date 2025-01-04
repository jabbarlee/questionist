import { openai } from "@/config/openaiConfig";

export async function generateQuestion({
  topic,
  difficulty,
}: {
  topic: string;
  difficulty: string;
}) {
  const questions = [];

  const prompt = `Generate a ${difficulty} SAT math question on the topic of ${topic}. Specify if it's a "multiple-choice" question or an "open" question. Provide the correct answer to the question generated. 
    Format the response in JSON as follows:
    {
      "type": "multiple-choice" | "open",
      "question": "The generated question text.",
      "choices": ["Option A", "Option B", "Option C", "Option D"], // Include choices only if type is "multiple-choice"
      "correctAnswer": "The correct answer to the question."
    }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
              "You are an expert SAT math question generator. Only generate the question based on the criteria provided, without answers or explanations. The question should be unique and not copied from any existing source. " +
              "Do not repeat the same question. " ,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const questionData = JSON.parse(response.choices[0]?.message?.content?.trim() ?? "");

    if (questionData) {
      questions.push(questionData);
    }
  } catch (error) {
    console.error(`Error generating question for topic: ${topic}, error: ${error}`);
  }

  return questions;
}
