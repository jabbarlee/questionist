import { SessionData, QuestionProps } from "@/types";

export const fetchQuestions = async ({ sessionData }: {
    sessionData: SessionData,
}) => {
    try {
        const response = await fetch("/api/questions/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topics: sessionData.topics,
                difficulty: sessionData.difficulty,
                numberOfQuestions: sessionData.numberOfQuestions,
            }),
        });

        if (response.ok) {
            const data = await response.json();

            return { questions: data.generatedQuestions };
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData.error);

            return { questions: [], error: errorData.error };
        }
    } catch (error) {
        console.error("Request failed:", error);

        return { questions: [], error: error };
    }
};