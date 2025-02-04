"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Pagination, Button, Alert, Tag } from "antd";
import { PauseOutlined, CheckOutlined, PlayCircleOutlined } from "@ant-design/icons";
import Main from "@/components/ui/_wrappers/Main";
import Footer from "@/components/ui/_wrappers/Footer";
import { Question } from "@/components/ui/PracticeSession/Question";
import { getSessionData } from '@/actions/firebase/get/getSessionData';
import { fetchQuestions } from "@/actions/firebase/get/fetchQuestions";
import { SessionData, QuestionProps, SelectedOption } from "@/types";
import { handleSessionSubmit } from "@/actions/handleSessionSubmit";
import { useRouter } from "next/navigation";

export default function Index({ sessionId }: { sessionId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"error" | "info" | "success" | "warning" | undefined>("info");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [setStartTimestamp, setSetStarTimestamp] = useState(new Date());
    const [setFinishTimestamp, setSetFinishTimestamp] = useState(new Date());
    const [expiryTimestamp, setExpiryTimestamp] = useState<number | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(10 * 60 * 1000);
    const [minutesLeft, setMinutesLeft] = useState<number>(10);
    const [secondsLeft, setSecondsLeft] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        getSessionData({ sessionId, setSessionData });
    }, [sessionId]);

    useEffect(() => {
        if (!sessionData) return;

        const fetchData = async () => {
            setLoading(true);
            const { questions } = await fetchQuestions({ sessionData });
            setQuestions(questions);
            setLoading(false);

            const now = Date.now();
            const nowTime = new Date();

            setExpiryTimestamp(now + remainingTime);
            setSetStarTimestamp(nowTime);
            setTimerRunning(true);
        };

        fetchData();
    }, [sessionData]);

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
            setRemainingTime(timeDifference);
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRunning, expiryTimestamp, isPaused]);

    const handlePauseResume = () => {
        if (timerRunning) {
            setIsPaused(true);
            setTimerRunning(false);
            setExpiryTimestamp(null);
        } else {
            setIsPaused(false);
            const now = Date.now();
            setExpiryTimestamp(now + remainingTime);
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

    const formatSetFinishTime = () => {
        const now = new Date();
        const timeTaken = now.getTime() - setStartTimestamp.getTime();
        const minutesTaken = Math.floor(timeTaken / 60000);
        const secondsTaken = Math.floor((timeTaken % 60000) / 1000);

        return { minutesTaken, secondsTaken };
    };

    const handleSubmit = async () => {
        const selectedChoices: SelectedOption[] = questions.map((question) => {
            const selectedOptionId = selectedOptions[question.id];
            const selectedOptionText = question.choices.find((opt) => opt.id === selectedOptionId)?.text || "";

            return {
                questionText: question.id,
                selectedOptionText,
            };
        });

        const now = new Date();
        setSetFinishTimestamp(now);

        const formattedSessionStartTime = setStartTimestamp.toISOString();
        const formattedSessionFinishedTimestamp = now.toISOString();
        const { minutesTaken, secondsTaken } = formatSetFinishTime();

        const data = {
            sessionStartTime: formattedSessionStartTime,
            sessionFinishedTime: formattedSessionFinishedTimestamp,
            sessionDuration: {
                minutes: minutesTaken,
                seconds: secondsTaken,
            },
            sessionRemainingTime: {
                minutes: minutesLeft,
                seconds: secondsLeft,
            },
        };

        const { success, errorMessage } = await handleSessionSubmit({
            sessionId,
            questions,
            selectedChoices,
            sessionTimingInfo: data,
        });

        if (success) {
            setSuccessAlertVisible(true);
            setAlertType("success");
            setMessage("Session submitted successfully! Redirecting to results page...");
            router.push("/results/" + sessionId);
        } else {
            setSuccessAlertVisible(true);
            setAlertType("error");
            setMessage("Error submitting session");
        }
    };

    return (
        <div className={styles.practicePageWrapper}>
            {successAlertVisible && (
                <Alert
                    message={message}
                    type={alertType}
                    banner
                    showIcon
                    style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
                />
            )}
            <div className={styles.header}>
                <Typography className={styles.headerText}>{sessionData?.sessionName}</Typography>
                {!loading && (
                    <Tag style={{ padding: "5px 15px", fontSize: "16px" }} color={"default"}>
                        {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                    </Tag>
                )}
                <div className={styles.buttonsContainer}>
                    <Button variant={"outlined"} color={"default"} onClick={handlePauseResume}>
                        {isPaused ? <PlayCircleOutlined /> : <PauseOutlined />} {isPaused ? "Resume" : "Pause"}
                    </Button>
                    <Button variant={"solid"} color={"primary"} onClick={handleSubmit}>
                        <CheckOutlined /> Finish
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
                            selectedOption={selectedOptions[questions[currentPage - 1]?.id] || null}
                            onOptionChange={(questionIndex, optionId) =>
                                handleOptionChange(questions[questionIndex].id, optionId)
                            }
                        />
                    )}
                </div>
            </Main>
            <Footer>
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={questions.length}
                    pageSize={1}
                    hideOnSinglePage={true}
                />
            </Footer>
        </div>
    );
}