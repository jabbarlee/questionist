// import { NextRequest, NextResponse } from 'next/server';
// import { generateQuestion } from '@/utils/generateQuestion';

// export async function POST(req: NextRequest) {
//   const { subtopic, difficulty, calculatorOption } = await req.json();

//   if (!subtopic || !difficulty) {
//     return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
//   }

//   const questionText = await generateQuestion({ subtopic, difficulty, calculatorOption });

//   return NextResponse.json({ question: questionText });
// }
