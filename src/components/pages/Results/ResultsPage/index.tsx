'use client';

import React, { useEffect, useState } from 'react';
import Header from "@/components/ui/_wrappers/Header";
import Main from '@/components/ui/_wrappers/Main';
import Footer from '@/components/ui/_wrappers/Footer';
import Page from '@/components/ui/_wrappers/Page';
import PageWrapper from '@/components/ui/_wrappers/Page/PageWrapper';
import Text from '@/components/ui/Text';
import SessionResultCard from '@/components/ui/SessionResultCard';
import { fetchAllPracticeSessions } from "@/actions/firebase/getDoc";
import CircularProgress from "@mui/material/CircularProgress";

export default function Index() {
    const [sessions, setSessions] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllSessions = async () => {
            try {
                const fetchedSessions = await fetchAllPracticeSessions();
                setSessions(fetchedSessions);
            } catch (error) {
                console.error("Error fetching practice sessions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllSessions();
    }, []);

    return (
        <PageWrapper>
            <Page>
                <Header>
                    <Text heading={true}>Results</Text>
                </Header>
                <Main>
                    {isLoading ? (
                        <CircularProgress />
                    ) : sessions.length > 0 ? (
                        sessions.map((sessionData: any) => {
                            const overallScore = sessionData.results?.overallScore ?? 0; // Fallback if overallScore is undefined
                            const sessionId = sessionData.practiceSessionId ?? 'Unknown Session ID';
                            const createdAt = sessionData.createdAt ?? 'Unknown Date';
                            const selectedSubtopics = sessionData.selectedSubtopics ?? [];

                            return (
                                <SessionResultCard
                                    key={sessionId}
                                    progress={overallScore}
                                    sessionId={sessionId}
                                    date={createdAt}
                                    selectedSubtopics={selectedSubtopics}
                                />
                            );
                        })
                    ) : (
                        <Text subheading={true}>No practice sessions found.</Text>
                    )}
                </Main>
            </Page>
        </PageWrapper>
    );
}
