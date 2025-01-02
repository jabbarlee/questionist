"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Progress, Alert } from "antd";
import DifficultySelect from "@/components/ui/PracticeCreate/DifficultySelect";
import QuestionTypeSelect from "@/components/ui/PracticeCreate/QuestionTypeSelect";
import TopicsSelect from "@/components/ui/PracticeCreate/TopicsSelect";
import QuestionNumSelect from "@/components/ui/PracticeCreate/QuestionNumSelect";
import TestName from "@/components/ui/PracticeCreate/TestName";
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import { Potion, Bolt } from "@/data/icons/practice";

export default function PracticeCreate() {
    const [difficulty, setDifficulty] = useState<string[] | null>([]);
    const [questionType, setQuestionType] = useState<string[] | null>([]);
    const [topics, setTopics] = useState<string[] | null>([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(null);
    const [testName, setTestName] = useState<string | null>(null);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);

    const handleCreate = () => {
        if (difficulty && questionType && topics && numberOfQuestions && testName) {
            console.log("Creating practice session...");
        } else {
            setAlertVisible(true);
        }
    };

    const progress =
        [
            testName,
            difficulty?.length,
            questionType?.length,
            topics?.length,
            numberOfQuestions,
        ].filter(Boolean).length * 20;

    return (
        <Page>
            <Header>
                Create Practice Set
            </Header>
            <Main>
                <div className={styles.container}>
                    {/* Left: Configuration Section */}
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

                    {/* Right: Progress Section */}
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
                                    {...(progress !== 100 && { disabled: true })}
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
                    </div>
                </div>
            </Main>
        </Page>
    );
}
