import { NextRequest, NextResponse } from 'next/server';
import { generateQuestion } from '@/utils/openai/generateQuestion';

export async function POST(req: NextRequest) {
  const { topics, difficulty } = await req.json();

  if (!topics || !difficulty) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const question = await generateQuestion({ topics, difficulty });
    return NextResponse.json({ question });
  } catch (error) {
    console.error("Error generating question: ", error);
    return NextResponse.json({ error: 'Error generating question' }, { status: 500 });
  }
}
