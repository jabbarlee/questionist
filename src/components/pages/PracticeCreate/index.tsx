"use client"

import React, { useState } from 'react';
import styles from './index.module.css';
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import { Button } from "antd";
import Header from "@/components/ui/_wrappers/Header";
import DifficultySelect from "@/components/ui/PracticeCreate/DifficultySelect";
import QuestionTypeSelect from "@/components/ui/PracticeCreate/QuestionTypeSelect";
import TopicsSelect from "@/components/ui/PracticeCreate/TopicsSelect";
import QuestionNumSelect from "@/components/ui/PracticeCreate/QuestionNumSelect";
import TestName from "@/components/ui/PracticeCreate/TestName";
import {storePracticeSession} from "@/actions/firebase/setDoc";
import { useRouter } from 'next/navigation';

export default function index() {
    const [difficulty, setDifficulty] = useState<string[] | null>([]);
    const [questionType, setQuestionType] = useState<string[] | null>([]);
    const [topics, setTopics] = useState<string[] | null>([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(null);
    const [testName, setTestName] = useState<string | null>(null);
    const [resMessage, setResMessage] = useState<string | null>(null);
    const [buttonColor, setButtonColor] = useState<string>('primary');
    const router = useRouter();


    const handleCreate = async () => {
        try {
            setResMessage('Creating...');

            const res = await storePracticeSession({
                topics: topics || [],
                difficulty: difficulty || [],
                sessionName: testName || '',
            });

            if (res.success) {
                setResMessage('Success!');
                setButtonColor('default');

                router.push(`/practice/session/${res.sessionId}`);
            } else {
                setResMessage('Error');
                console.log(res?.error);
                setButtonColor('danger');
            }
        } catch (error) {
            console.error('Error creating practice session', error);
        }
    }
    return (
        <Page>
            <Header>
                Customize a set
            </Header>
            <Main>
                <div className={styles.configWrapper}>
                    <DifficultySelect
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                    />
                    <QuestionTypeSelect
                        questionType={questionType}
                        setQuestionType={setQuestionType}
                    />
                    <TopicsSelect
                        topics={topics}
                        setTopics={setTopics}
                    />
                    <QuestionNumSelect
                        numberOfQuestions={numberOfQuestions}
                        setNumberOfQuestions={setNumberOfQuestions}
                    />
                    <TestName
                        testName={testName}
                        setTestName={setTestName}
                    />
                    <div>
                        <Button
                            color={'primary'}
                            variant={'solid'}
                            size={'large'}
                            style={{textDecoration: 'none'}}
                            disabled={!(difficulty?.length && questionType?.length && topics?.length && numberOfQuestions)}
                            onClick={handleCreate}
                        >
                            {resMessage ? resMessage : 'Create!'}
                        </Button>
                    </div>
                </div>
            </Main>
        </Page>
    );
}
