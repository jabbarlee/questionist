import { NextRequest, NextResponse } from "next/server";
import { fetchPracticeSessionConfig} from "@/actions/firebase/getDoc";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if(!sessionId){
        return NextResponse.json({ error: 'No session ID provided' }, { status: 401 });
    }

    try{
        const sessionData = await fetchPracticeSessionConfig(sessionId);

        if(!sessionData){
            return NextResponse.json({ error: 'No session data found' }, { status: 404 });
        }

        return NextResponse.json(sessionData, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 });
    }
}