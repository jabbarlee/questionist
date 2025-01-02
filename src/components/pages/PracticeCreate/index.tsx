"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import {Button, Progress, Alert, Tag} from "antd";
import DifficultySelect from "@/components/ui/PracticeCreate/DifficultySelect";
import QuestionTypeSelect from "@/components/ui/PracticeCreate/QuestionTypeSelect";
import TopicsSelect from "@/components/ui/PracticeCreate/TopicsSelect";
import QuestionNumSelect from "@/components/ui/PracticeCreate/QuestionNumSelect";
import TestName from "@/components/ui/PracticeCreate/TestName";
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import { Potion, Bolt, Fire } from "@/data/icons/practice";
import { storePracticeSession } from "@/actions/firebase/setDoc";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import {PracticeStartProps} from "@/types";

export default function PracticeCreate() {
    const [difficulty, setDifficulty] = useState<string[] | null>([]);
    const [questionType, setQuestionType] = useState<string[] | null>([]);
    const [topics, setTopics] = useState<string[] | null>([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(null);
    const [testName, setTestName] = useState<string | null>(null);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<"info" | "error" | "success" | "warning" | undefined>();

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

            }
        } catch (error) {
            console.error('Error creating practice session', error);
        }
    }

    const progress =
        [
            testName,
            difficulty?.length,
            questionType?.length,
            topics?.length,
            numberOfQuestions,
        ].filter(Boolean).length * 20;


    const handleDefinedSetStart = async({
                                            topics,
                                            difficulty,
                                            sessionName,
                                            numberOfQuestions
                                        }: PracticeStartProps) => {
        try{
            const { success, sessionId } = await storePracticeSession({ topics, difficulty, sessionName, numberOfQuestions });

            if(success && sessionId){
                router.push(`/practice/session/${sessionId}`)
            }
        }catch(error){
            console.error('Error starting popular set: ', error)
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
                Create Practice Set
            </Header>
            <Main>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.card}>
                            <TestName testName={testName} setTestName={setTestName} />
                            <DifficultySelect difficulty={difficulty} setDifficulty={setDifficulty} />
                            <QuestionTypeSelect
                                questionType={questionType}
                                setQuestionType={setQuestionType}
                            />
                            <TopicsSelect topics={topics} setTopics={setTopics} />
                            <QuestionNumSelect
                                numberOfQuestions={numberOfQuestions}
                                setNumberOfQuestions={setNumberOfQuestions}
                            />
                        </div>
                        {alertVisible && (
                            <Alert
                                message="Please complete all fields before creating a practice set."
                                type="error"
                                showIcon
                                closable
                                onClose={() => setAlertVisible(false)}
                                className={styles.alert}
                            />
                        )}
                    </div>

                    <div className={styles.right}>
                        <div className={styles.card}>
                            <div className={styles.progressCardTextWrapper}>
                                <Progress
                                    type="circle"
                                    percent={progress}
                                    strokeColor={progress === 100 ? "#52c41a" : "#1890ff"}
                                />
                                <div className={styles.subHeadingTextWrapper}>
                                    <p className={styles.subHeading}>
                                        {progress === 100 ? "Ready to create practice set" : "Complete all fields to create practice set"}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <Button
                                    variant="solid"
                                    color="primary"
                                    size="large"
                                    className={styles.createButton}
                                    onClick={handleCreate}
                                    {...(progress !== 100 && {disabled: true})}
                                >
                                    <div className={styles.buttonTextWrapper}>
                                        <Bolt className={styles.iconBolt}/>
                                        Create
                                    </div>
                                </Button>
                                <Button
                                    variant="filled"
                                    color="primary"
                                    size="large"
                                    className={styles.createButton}
                                    onClick={handleCreate}
                                >
                                    <div className={styles.buttonTextWrapper}>
                                        <Potion className={styles.iconPotion}/>
                                        Randomize
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className={styles.definedSetsContainer}>
                            <div>
                                <Typography className={styles.setHeading}>
                                    <div className={styles.buttonTextWrapper}>
                                        <Fire/>
                                        Popular Sets
                                    </div>
                                </Typography>
                            </div>
                            <div className={styles.definedSetsWrapper}>
                                <div className={styles.card}>
                                    <Typography className={styles.setTitle}>Geometry Guru</Typography>
                                    <Typography className={styles.setDetails}>
                                        <Tag color={'volcano'}>Hard</Tag>
                                        <Tag>15 questions</Tag>
                                    </Typography>
                                    <Button
                                        color="primary"
                                        variant='filled'
                                        style={{textDecoration: 'none', width: '100%'}}
                                        size="large"
                                        onClick={() => handleDefinedSetStart({
                                            topics: ['geometry'],
                                            difficulty: ['hard'],
                                            sessionName: 'Geometry Guru',
                                            numberOfQuestions: 15
                                        })}
                                    >
                                        Start Now
                                    </Button>
                                </div>
                                <div className={styles.card}>
                                    <Typography className={styles.setTitle}>Triggster</Typography>
                                    <Typography className={styles.setDetails}>
                                        <Tag color={'magenta'}>Medium</Tag>
                                        <Tag>10 questions</Tag>
                                    </Typography>
                                    <Button
                                        color="primary"
                                        variant='filled'
                                        style={{textDecoration: 'none', width: '100%'}}
                                        size="large"
                                        onClick={() => handleDefinedSetStart({
                                            topics: ['trigonometry'],
                                            difficulty: ['medium'],
                                            sessionName: 'Triggster',
                                            numberOfQuestions: 10
                                        })}
                                    >
                                        Start Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        </Page>
    );
}
