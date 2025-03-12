"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import styles from "./index.module.css";
import { Button, Divider, Modal, Tag, Radio } from "antd";
import { Typography } from "@mui/material";
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import { Card } from "@/components/ui/Card";
import { MathCards } from "./MathCards";
import { storePracticeSession } from "@/actions/firebase/set/storePracticeSession";
import { PracticeStartProps } from "@/types";

export default function PracticePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState<string>("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalSetTimeLimit, setModalSetTimeLimit] = useState<number>();
    const [modalSubTopics, setModalSubTopics] = useState<string[]>([]);
    const [modalQuestionNumber, setModalQuestionNumber] = useState<number>();
    const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");

    const router = useRouter();

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
                            <Button 
                                variant="solid" 
                                color="primary" 
                                onClick={() => handleDefinedSetStart({
                                    topics: modalSubTopics,
                                    difficulty: [selectedDifficulty],
                                    sessionName: modalText,
                                    numberOfQuestions: modalQuestionNumber ?? 5
                                })}
                            >
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
                                <div>
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
                            <div className={styles.dataWrapper}>
                                <Typography variant="h5">Difficulty</Typography>
                                <div className={styles.configDataWrapper}>
                                    <Radio.Group 
                                        defaultValue={selectedDifficulty} 
                                        size="large"
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                    >
                                        <Radio.Button value="Beginner">Beginner</Radio.Button>
                                        <Radio.Button value="Elementary">Elementary</Radio.Button>
                                        <Radio.Button value="Advanced">Advanced</Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                            <Divider style={{ margin: 0 }} />
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
