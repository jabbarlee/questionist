"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import styles from "./index.module.css";
import { Button, Divider, Modal, Tag } from "antd";
import { Typography } from "@mui/material";
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import { Card } from "@/components/ui/Card";
import { MathCards } from "./MathCards";
import { storePracticeSession } from "@/actions/firebase/set/storePracticeSession";

export default function PracticePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState<string>("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalSetTimeLimit, setModalSetTimeLimit] = useState<number>();
    const [modalSubTopics, setModalSubTopics] = useState<string[]>();
    const [modalQuestionNumber, setModalQuestionNumber] = useState<number>();
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<"info" | "error" | "success" | "warning" | undefined>();


    const router = useRouter();

    const handleCreate = async ({
        topics,
        difficulty,
        testName,
        numberOfQuestions,
    }: {
        topics: string[],
        difficulty: string[] | null,
        testName: string,
        numberOfQuestions: number
    }) => {
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

    return (
        <Page>
            <Header>Practice</Header>
            <Main>
                <div className={styles.pageWrapper}>
                    <Modal 
                        centered
                        open={modalOpen}
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                        style={{ minWidth: '7ß00px' }}
                        footer={[
                            <Button variant="outlined" color="default" onClick={() => setModalOpen(false)}>
                              Cancel
                            </Button>,
                            <Button variant="solid" color="primary">
                              Practice
                            </Button>,
                        ]}
                    >
                        <div className={styles.modalWrapper}>
                            <div className={styles.modalTitleText}>
                                <Typography variant="h4">{modalText}</Typography>
                            </div>
                            <Divider style={{ margin: 0 }} />
                            <div className={styles.dataWrapper}>
                                <Typography variant="h5">Topics</Typography>
                                <div className={styles.tagsWrapper}>
                                    {modalSubTopics?.map((subtopic, index) => {
                                        return(
                                            <Tag
                                                style={{ padding: '5px 10px', fontSize: '16px' }}
                                            >
                                                {subtopic}
                                            </Tag>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.dataWrapper}>
                                <Typography variant="h5">Configuration</Typography>
                                <div className={styles.configDataWrapper}>
                                    <Tag 
                                        style={{ padding: '5px 10px', fontSize: '16px' }}
                                        color="geekblue"
                                    >
                                        {modalQuestionNumber} questions
                                    </Tag>
                                    <Tag
                                        style={{ padding: '5px 10px', fontSize: '16px' }}
                                        color="purple"
                                    >
                                        {modalSetTimeLimit} minutes
                                    </Tag>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <div className={styles.headerSideWrapper}>
                        <div className={styles.createYourOwnWrapper}>
                            <Card
                                heading="Customize practice set"
                                subHeading="Configure only the topics you want to practice"
                                isLarge
                                variant="secondary"
                            >
                                <Button variant="solid" color="primary" block size="large" href="/practice/create" style={{ textDecoration: 'none' }}>
                                    Start configuring
                                </Button>
                            </Card>
                        </div>
                        <div className={styles.createYourOwnWrapper}>
                            <Card
                                heading="Real-time exam mode"
                                subHeading="Practice it like it is the exam day? Try one for free"
                                isLarge
                                variant="premium"
                            >
                                <div className={styles.buttonWrapper}>
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        block
                                        size="large"
                                        className={styles.premiumButton}
                                    >
                                        Try for free
                                    </Button>
                                    <Button variant="outlined" color="default" block size="large">
                                        See pricing
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <Divider style={{ margin: 0 }} />
                    <div className={styles.footerWrapper}>
                        <Typography className={styles.heading} fontSize={"28px"}>
                            Core Sections
                        </Typography>
                    </div>

                    <MathCards
                        onCardClick={(
                            title: string, 
                            description: string, 
                            subTopics: string[], 
                            timeLimit: number, 
                            questions: number
                        ) => {
                            setModalOpen(true);
                            setModalText(title);
                            setModalDescription(description);
                            setModalSetTimeLimit(timeLimit);
                            setModalSubTopics(subTopics);
                            setModalQuestionNumber(questions);
                        }}
                    />
                </div>
            </Main>
        </Page>
    );
}
