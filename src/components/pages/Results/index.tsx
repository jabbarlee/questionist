"use client"

import React, {useEffect, useState} from 'react'
import { getAllResults } from "@/actions/firebase/getDoc";
import PracticeSession from "@/components/ui/Results/All";
import Page from "@/components/ui/_wrappers/Page";
import Header from "@/components/ui/_wrappers/Header";
import SessionsWrapper from "@/components/ui/_wrappers/SessionsWrapper";
import Main from "@/components/ui/_wrappers/Main";
import CircularProgress from "@mui/material/CircularProgress";

export default function index() {
    const [sessions, setSessions] = useState<object[] | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const allSessions = await getAllResults();

                setSessions(allSessions);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, []);

    console.log(sessions);

    return (
        <Page>
            <Header>Results</Header>
            <Main>
                {sessions ? (
                    <SessionsWrapper>
                        {sessions.map((session: any) => (
                            <PracticeSession session={session} />
                        ))}
                    </SessionsWrapper>
                ) : (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CircularProgress/>
                    </div>
                )}
            </Main>
        </Page>
    )
}