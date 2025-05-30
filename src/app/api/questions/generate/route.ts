import { NextRequest, NextResponse } from 'next/server';
import { fetchAllGeneratedQuestions } from '@/utils/openai/fetchAllGeneratedQuestions';

export async function POST(req: NextRequest) {
  const { topics, difficulty, numberOfQuestions } = await req.json();

  if (!topics || !difficulty) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const generatedQuestions = await fetchAllGeneratedQuestions({ topics, difficulty, numberOfQuestions });
    return NextResponse.json({ generatedQuestions });
  } catch (error) {
    console.error("Error generating question: ", error);
    return NextResponse.json({ error: 'Error generating question' }, { status: 500 });
  }
}
