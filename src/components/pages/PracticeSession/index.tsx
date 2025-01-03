"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Pagination, Button, Alert } from "antd";
import { PauseOutlined, CheckOutlined } from "@ant-design/icons";
import Main from "@/components/ui/_wrappers/Main";
import Footer from "@/components/ui/_wrappers/Footer";
import { Question } from "@/components/ui/PracticeSession/Question";
import { fetchPracticeSessionConfig } from "@/actions/firebase/getDoc";
import { SessionData, QuestionProps } from "@/types";
import { SelectedOption } from "@/types";
import { handleSessionSubmit } from "@/actions/handleSessionSubmit";
import { useRouter } from "next/navigation";

export default function Index({ sessionId }: { sessionId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"error" | "info" | "success" | "warning" | undefined>("info");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();

    const handleOptionChange = (questionId: string, optionId: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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

    useEffect(() => {
        if (!sessionData) return;

        const fetchQuestions = async () => {
            if (sessionData?.questions) {
                setQuestions(sessionData.questions);
            }

            try {
                const response = await fetch("/api/questions/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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
                    console.error("Error:", errorData.error);
                }
            } catch (error) {
                console.error("Request failed:", error);
            }
        };

        fetchQuestions();
    }, [sessionData]);

    const handleSubmit = async () => {
        const selectedChoices: SelectedOption[] = questions.map((question) => {
            const selectedOptionId = selectedOptions[question.id];
            const selectedOptionText = question.choices.find((opt) => opt.id === selectedOptionId)?.text || "";

            return {
                questionText: question.id, // Use questionId for traceability
                selectedOptionText,
            };
        });

        const { success } = await handleSessionSubmit({
            sessionId,
            questions,
            selectedChoices,
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
                    <Typography className={styles.headerText}>{sessionData?.sessionName}</Typography>
                </div>
                <div>
                    <p>TIMER PLACEHOLDER</p>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button variant={"outlined"} color={"default"}>
                        <PauseOutlined />
                        Pause
                    </Button>
                    <Button variant={"solid"} color={"primary"} onClick={handleSubmit}>
                        <CheckOutlined />
                        Finish
                    </Button>
                </div>
            </div>
            <Main>
                <div className={styles.questionsWrapper}>
                    {questions.length > 0 ? (
                        <Question
                            key={questions[currentPage - 1]?.id}
                            index={currentPage - 1}
                            questionText={questions[currentPage - 1]?.question}
                            options={questions[currentPage - 1]?.choices}
                            selectedOption={selectedOptions[questions[currentPage - 1].id] || null}
                            onOptionChange={(questionIndex, optionId) =>
                                handleOptionChange(questions[questionIndex].id, optionId) // Ensure questionId is used
                            }
                        />
                    ) : (
                        <div className={styles.loadingText}>Loading...</div>
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
