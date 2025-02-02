"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Pagination, Button, Alert, Tag } from "antd";
import { PauseOutlined, CheckOutlined, PlayCircleOutlined } from "@ant-design/icons";
import Main from "@/components/ui/_wrappers/Main";
import Footer from "@/components/ui/_wrappers/Footer";
import { Question } from "@/components/ui/PracticeSession/Question";
import { SelectedOption } from "@/types";

export default function Index() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"error" | "info" | "success" | "warning" | undefined>("info");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [setStartTimestamp, setSetStarTimestamp] = useState(new Date());
    const [setFinishTimestamp, setSetFinishTimestamp] = useState(new Date());
    
    // Timer states
    const [expiryTimestamp, setExpiryTimestamp] = useState<number | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(10 * 60 * 1000);
    const [minutesLeft, setMinutesLeft] = useState<number>(10);
    const [secondsLeft, setSecondsLeft] = useState<number>(0);

    const [questions, setQuestions] = useState<
        { id: string; question: string; correctAnswer: string; choices: { id: string; text: string }[] }[]
    >([]);

    useEffect(() => {
        // Simulate fetching questions with a delay
        setTimeout(() => {
            const fetchedQuestions = [
                {
                    id: 'abb2eca4-c5ec-4633-874b-3081bad69363',
                    question: 'If 5x - 3 = 2x + 9, what is the value of x?',
                    correctAnswer: '4',
                    choices: [
                        { id: 'a', text: '2' },
                        { id: 'b', text: '4' },
                        { id: 'c', text: '3' },
                        { id: 'd', text: '1' }
                    ]
                },
                {
                    id: '9d63c71c-933c-491a-8092-8775ae13fcf6',
                    question: 'If 3x + 5 = 20, what is the value of x?',
                    correctAnswer: '5',
                    choices: [
                        { id: 'a', text: '2' },
                        { id: 'b', text: '4' },
                        { id: 'c', text: '3' },
                        { id: 'd', text: '1' }
                    ]
                }
            ];

            setQuestions(fetchedQuestions);
            setLoading(false); 

            // Set timer to start from exactly 10 minutes
            const now = Date.now();
            const nowTime = new Date();

            setExpiryTimestamp(now + remainingTime);
            setSetStarTimestamp(nowTime);
            setTimerRunning(true);
        }, 2000);
    }, []);

    useEffect(() => {
        if (!timerRunning || !expiryTimestamp || isPaused) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const timeDifference = expiryTimestamp - now;

            if (timeDifference <= 0) {
                clearInterval(interval);
                setMinutesLeft(0);
                setSecondsLeft(0);
                setTimerRunning(false);
                return;
            }

            setMinutesLeft(Math.floor(timeDifference / 60000));
            setSecondsLeft(Math.floor((timeDifference % 60000) / 1000));
            setRemainingTime(timeDifference); // Update remaining time
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRunning, expiryTimestamp, isPaused]);

    const handlePauseResume = () => {
        if (timerRunning) {
            setIsPaused(true);
            setTimerRunning(false); // Pause the timer
            setExpiryTimestamp(null);
        } else {
            setIsPaused(false);
            const now = Date.now();
            setExpiryTimestamp(now + remainingTime); // Resume from remaining time
            setTimerRunning(true);
        }
    };

    const handleOptionChange = (questionId: string, optionId: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSubmit = async () => {
        const now = new Date();  // Capture exact finish time
        setSetFinishTimestamp(now);
    
        const formattedSessionStartTime = setStartTimestamp.toISOString();
        const formattedSessionFinishedTimestamp = now.toISOString();
    
        const { minutesTaken, secondsTaken } = formatSetFinishTime();
    
        setMessage("Quiz results saved successfully!");
        setAlertType("success");
        setSuccessAlertVisible(true);
    
        const data = {
            sessionStartTime: formattedSessionStartTime,
            sessionFinishedTime: formattedSessionFinishedTimestamp,
            sessionDuration: {
                minutes: minutesTaken,
                seconds: secondsTaken,
            },
            sessionRemainingTime: {
                minutes: minutesLeft,
                seconds: secondsLeft
            },
        };
    
        console.log(data);
    };
    

    const formatSetFinishTime = () => {
        const now = new Date();

        const timeTaken = now.getTime() - setStartTimestamp.getTime();
        const minutesTaken = Math.floor(timeTaken / 60000);
        const secondsTaken = Math.floor((timeTaken % 60000) / 1000);

        return { minutesTaken, secondsTaken };
    };

    return (
        <div className={styles.practicePageWrapper}>
            {successAlertVisible && (
                <Alert
                    message={message}
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
            <div className={styles.header}>
                <div>
                    <Typography className={styles.headerText}>TEST SESSION</Typography>
                </div>
                <div>
                    {!loading && (
                        <Tag style={{ padding: '5px 15px', fontSize: '16px' }} color={"default"}>
                            {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}
                            :
                            {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                        </Tag>
                    )}
                </div>
                <div className={styles.buttonsContainer}>
                    <Button variant={"outlined"} color={"default"} onClick={handlePauseResume}>
                        {isPaused ? <PlayCircleOutlined /> : <PauseOutlined />}
                        {isPaused ? " Resume" : " Pause"}
                    </Button>
                    <Button variant={"solid"} color={"primary"} onClick={handleSubmit}>
                        <CheckOutlined />
                        Finish
                    </Button>
                </div>
            </div>
            <Main>
                <div className={styles.questionsWrapper}>
                    {loading ? (
                        <div className={styles.loadingText}>Fetching questions...</div>
                    ) : (
                        <Question
                            key={questions[currentPage - 1]?.id}
                            index={currentPage - 1}
                            questionText={questions[currentPage - 1]?.question}
                            options={questions[currentPage - 1]?.choices}
                            selectedOption={selectedOptions[questions[currentPage - 1].id] || null}
                            onOptionChange={(questionIndex, optionId) =>
                                handleOptionChange(questions[questionIndex].id, optionId)
                            }
                        />
                    )}
                </div>
            </Main>
            <Footer>
                <div className={styles.paginationContainer}>
                    <Pagination
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
