'use client'

import React, { useState, useEffect } from 'react';
import PageWrapper from '@/components/ui/_wrappers/Page/PageWrapper'
import Page from '@/components/ui/_wrappers/Page'
import Header from '@/components/ui/_wrappers/Header';
import Main from '@/components/ui/_wrappers/Main';
import ButtonsContainer from '@/components/pages/Results/containers/ButtonsContainer'
import Text from '@/components/ui/Text';
import QuestionChip from '@/components/ui/QuestionChip';
import CircularProgress from '@mui/material/CircularProgress';
import { getResults } from '@/actions/firebase/getDoc';

export default function Index({ id }: { id: string }) {
    const [sessionData, setSessionData] = useState<any | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const { sessionData: fetchedSessionData, success } = await getResults(id)

                if(success) {
                    setSessionData(fetchedSessionData)
                }
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, [id]);


    console.log("Current sessionData: ", sessionData)

    return (
        <PageWrapper>
            <Page>
                <Header>
                    <Text heading={true}>Results</Text>
                </Header>
                <Main>
                    {sessionData?.questions ? (
                        sessionData.questions.map((questionData: any, index: number) => (
                            <QuestionChip
                                key={index}
                                type={questionData.type}
                                question={questionData.question}
                                choices={questionData.choices}
                                selectedChoice={questionData.selectedChoice}
                                correctChoice={sessionData.questions[index]}
                                questionIndex={index}
                            />
                        ))
                    ) : (
                        <CircularProgress/>
                    )}

                </Main>
                <ButtonsContainer
                    progress={sessionData?.results?.overallScore}
                />
            </Page>
        </PageWrapper>
    );
}
