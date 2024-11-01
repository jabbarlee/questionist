import { OpenAI } from "openai";

// Initialize OpenAI with your API key from environment variables
export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
