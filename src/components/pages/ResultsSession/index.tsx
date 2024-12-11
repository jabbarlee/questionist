"use client";

import React, { useState, useEffect } from "react";
import Page from "@/components/ui/_wrappers/Page";
import Header from "@/components/ui/_wrappers/Header";
import { QuestionResult } from "@/components/ui/PracticeSession/Question";
import { getResults } from "@/actions/firebase/getDoc";
import { SessionData } from "@/types";
import CircularProgress from "@mui/material/CircularProgress";
import ScoreBoard from "@/components/ui/Results/Session/ScoreBoard";

export default function ResultsPage({ id }: { id: string }) {
    const [sessionData, setSessionData] = useState<SessionData | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const { sessionData: fetchedSessionData, success } = await getResults(id);

                if (success) {
                    setSessionData(fetchedSessionData);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, [id]);

    return (
        <Page>
            <Header>
                Results for session {sessionData?.sessionName || id}
            </Header>
            <ScoreBoard
                correctAnswers={sessionData?.results?.correctAnswers || 0}
                incorrectAnswers={sessionData?.results?.incorrectAnswers || 0}
                numOfQuestions={sessionData?.results?.numOfQuestions || 0}
                overallScore={sessionData?.results?.overallScore || 0}
            />
            <div>
                {sessionData?.questions ? (
                    sessionData.questions.map((questionData: any, index: number) => (
                        <QuestionResult
                            key={index}
                            index={index}
                            questionText={questionData.questionText}
                            options={questionData.choices.map((choice: string, idx: number) => ({
                                id: `option-${idx}`,
                                text: choice,
                            }))}
                            selectedOption={questionData.selectedChoice}
                            correctOption={questionData.correctAnswer}
                        />
                    ))
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <CircularProgress />
                    </div>
                )}
            </div>
        </Page>
    );
}
