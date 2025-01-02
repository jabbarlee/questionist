"use client"

import React, { useState } from 'react';
import styles from './index.module.css';
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import {Alert, Button} from "antd";
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
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"error" | "info" | "success" | "warning" | undefined>('info');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const router = useRouter();


    const handleCreate = async () => {
        try {
            setAlertType('info');
            setSuccessAlertVisible(true);
            setAlertMessage('Creating session...');

            const res = await storePracticeSession({
                topics: topics || [],
                difficulty: difficulty || [],
                sessionName: testName || '',
                numberOfQuestions: numberOfQuestions || 0,
            });

            if (res.success) {
                setSuccessAlertVisible(true);
                setAlertType('success');
                setAlertMessage('Session created successfully! Redirecting...');
                router.push(`/practice/session/${res.sessionId}`);
            } else {
                setSuccessAlertVisible(true);
                setAlertType('error');
                setResMessage('Error');
                setButtonColor('danger');
            }
        } catch (error) {
            console.error('Error creating practice session', error);
        }
    }
    return (
        <Page>
            {successAlertVisible && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    banner
                    showIcon
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 1000,
                    }}
                />
            )}
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
