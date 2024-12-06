"use client"

import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Pagination, Button } from "antd";
import { PauseOutlined, CheckOutlined } from "@ant-design/icons";
import Main from '@/components/ui/_wrappers/Main';
import Footer from '@/components/ui/_wrappers/Footer';
import Question from '@/components/ui/PracticeSession/Question';
import { fetchPracticeSessionConfig } from "@/actions/firebase/getDoc";
import { SessionData, QuestionProps } from "@/types";

interface SelectedOption {
    questionText: string;
    selectedOptionText: string;
}

export default function Index({ sessionId }: { sessionId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

    const handleOptionChange = (questionIndex: number, optionId: string, selectedOptionText: string) => {
        setSelectedOptions((prev) => {
            const updatedOptions = [...prev];
            const questionText = questions[questionIndex].questionText;

            // Update or insert the selected option for this question
            const existingIndex = updatedOptions.findIndex((opt) => opt.questionText === questionText);
            if (existingIndex > -1) {
                updatedOptions[existingIndex] = { questionText, selectedOptionText };
            } else {
                updatedOptions.push({ questionText, selectedOptionText });
            }

            return updatedOptions;
        });
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Fetch session data from Firebase
    useEffect(() => {
        const getSessionData = async () => {
            const fetchedSessionData = await fetchPracticeSessionConfig(sessionId);

            if (fetchedSessionData) {
                setSessionData(fetchedSessionData);
            } else {
                console.error("No session data found.");
            }
        };

        getSessionData();
    }, [sessionId]);

    // Fetch questions after session data is available
    useEffect(() => {
        if (!sessionData) return;

        const fetchQuestions = async () => {
            try {
                const response = await fetch('/api/questions/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        topics: sessionData.topics,
                        difficulty: sessionData.difficulty,
                        numberOfQuestions: sessionData.numberOfQuestions,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data.generatedQuestions);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                }
            } catch (error) {
                console.error('Request failed:', error);
            }
        };

        fetchQuestions();
    }, [sessionData]);

    const handleFinish = () => {
        console.log('Questions: ', questions);
        console.log('Selected options: ', selectedOptions);
    };

    return (
        <div className={styles.practicePageWrapper}>
            <div className={styles.header}>
                <div>
                    <Typography className={styles.headerText}>{sessionData?.sessionName}</Typography>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button variant={'outlined'} color={'default'}>
                        <PauseOutlined />
                        Pause
                    </Button>
                    <Button variant={'solid'} color={'primary'} onClick={handleFinish}>
                        <CheckOutlined />
                        Finish
                    </Button>
                </div>
            </div>
            <Main>
                <div className={styles.questionsWrapper}>
                    {questions.length > 0 ? (
                        <Question
                            key={currentPage - 1}
                            index={currentPage - 1}
                            questionText={questions[currentPage - 1]?.questionText}
                            options={questions[currentPage - 1]?.options}
                            selectedOption={
                                selectedOptions.find(
                                    (opt) => opt.questionText === questions[currentPage - 1].questionText
                                )?.selectedOptionText || null
                            }
                            onOptionChange={(questionIndex, optionId) => {
                                const selectedOptionText =
                                    questions[questionIndex].options.find((opt) => opt.id === optionId)?.text || '';
                                handleOptionChange(questionIndex, optionId, selectedOptionText);
                            }}
                        />

                    ) : (
                        <div className={styles.loadingText}>Loading...</div>
                    )}
                </div>
            </Main>
            <Footer>
                <div className={styles.paginationContainer}>
                    <Pagination
                        simple={{ readOnly: true }}
                        current={currentPage}
                        onChange={handlePageChange}
                        total={questions?.length}
                        pageSize={1}
                    />
                </div>
            </Footer>
        </div>
    );
}
