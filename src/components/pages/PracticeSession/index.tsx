"use client"

import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Pagination, Button } from "antd";
import { PauseOutlined, CheckOutlined } from "@ant-design/icons";
import Main from '@/components/ui/_wrappers/Main';
import Footer from '@/components/ui/_wrappers/Footer';
import {Question} from '@/components/ui/PracticeSession/Question';
import { fetchPracticeSessionConfig } from "@/actions/firebase/getDoc";
import { SessionData, QuestionProps } from "@/types";
import { handleSessionSubmit } from "@/actions/handleSessionSubmit";
import { useRouter } from "next/navigation";

interface SelectedOption {
    questionText: string;
    selectedOptionText: string;
}

export default function Index({ sessionId }: { sessionId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [questions, setQuestions] = useState<QuestionProps[]>([
        {
            question: 'Another question',
            choices: [
                { id: 'a', text: 'a + b' },
                { id: 'b', text: '2a + b + 3c' },
                { id: 'c', text: '2b + 1' },
                { id: 'd', text: '4a + c' },
            ],
            correctAnswer: 'a + b'
        },
        {
            question: 'Another question',
            choices: [
                { id: 'a', text: 'a + b' },
                { id: 'b', text: '2a + b + 3c' },
                { id: 'c', text: '2b + 1' },
                { id: 'd', text: '4a + c' },
            ],
            correctAnswer: 'a + b'
        }
    ]);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter()

    const handleOptionChange = (questionIndex: number, optionId: string, selectedOptionText: string) => {
        setSelectedOptions((prev) => {
            const updatedOptions = [...prev];
            const questionText = questions[questionIndex].question;

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

            if(sessionData?.questions?.length === 0) {
                setQuestions(sessionData?.questions);
            }

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

    const handleNavigate = (url: string) => {
        router.push(url);
    };

    const handleSubmit = async () => {
        await handleSessionSubmit({
            sessionId,
            questions,
            selectedChoices: selectedOptions,
            setError,
            setMessage,
            handleNavigate,
        });

        console.log(selectedOptions)
        console.log(questions)
    };

    return (
        <div className={styles.practicePageWrapper}>
            <div className={styles.header}>
                <div>
                    <Typography className={styles.headerText}>{sessionData?.sessionName}</Typography>
                </div>
                <div>
                    <p>TIMER PLACEHOLDER</p>
                </div>
                <div>
                    {error && <div className={styles.errorText}>{error}</div>}
                    {message && <div className={styles.successText}>{message}</div>}
                </div>
                <div className={styles.buttonsContainer}>
                    <Button variant={'outlined'} color={'default'}>
                        <PauseOutlined />
                        Pause
                    </Button>
                    <Button variant={'solid'} color={'primary'} onClick={handleSubmit}>
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
                            questionText={questions[currentPage - 1]?.question || "Question not available"}
                            options={questions[currentPage - 1]?.choices || []} // Fallback to an empty array
                            selectedOption={
                                selectedOptions.find(
                                    (opt) => opt.questionText === questions[currentPage - 1]?.question
                                )?.selectedOptionText || null
                            }
                            onOptionChange={(questionIndex, optionId) => {
                                const selectedOptionText =
                                    questions[questionIndex]?.choices?.find((opt) => opt.id === optionId)?.text || '';
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
