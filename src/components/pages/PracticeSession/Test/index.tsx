"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Pagination, Button, Alert } from "antd";
import { PauseOutlined, CheckOutlined } from "@ant-design/icons";
import Main from "@/components/ui/_wrappers/Main";
import Footer from "@/components/ui/_wrappers/Footer";
import { Question } from "@/components/ui/PracticeSession/Question";
import { SessionData, QuestionProps } from "@/types";
import { SelectedOption } from "@/types";
import {Timer} from '@/components/ui/Timer'

export default function Index() {
    const [currentPage, setCurrentPage] = useState(1);
    const [questions, setQuestions] = useState<QuestionProps[]>(
    [
      {
        id: 'abb2eca4-c5ec-4633-874b-3081bad69363',
        question: 'If 5x - 3 = 2x + 9, what is the value of x?',
        correctAnswer: '4',
        choices:
          [
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
        choices:
          [
            { id: 'a', text: '2' },
            { id: 'b', text: '4' },
            { id: 'c', text: '3' },
            { id: 'd', text: '1' }
          ]
      },
      {
        id: '0eb798d2-8041-48e3-a38e-ff7d14577cf3',
        question: 'If 3x + 4 = 19, what is the value of x?',
        correctAnswer: '5',
        choices:
          [
            { id: 'a', text: '2' },
            { id: 'b', text: '4' },
            { id: 'c', text: '3' },
            { id: 'd', text: '1' }
          ]
      },
      {
        id: '3a9443be-a299-4202-ad94-c01ffcd50e19',
        question: 'If 5x + 3 = 23, what is the value of x?',
        correctAnswer: '4',
        choices:
          [
            { id: 'a', text: '2' },
            { id: 'b', text: '4' },
            { id: 'c', text: '3' },
            { id: 'd', text: '1' }
          ]
      },
      {
        id: '322fd2ad-f659-4ef9-ba7d-bbc22f492c9c',
        question: 'If 3x + 5 = 20, what is the value of x?',
        correctAnswer: '5',
        choices:
          [
            { id: 'a', text: '2' },
            { id: 'b', text: '4' },
            { id: 'c', text: '3' },
            { id: 'd', text: '1' }
          ]
      }
    ]);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"error" | "info" | "success" | "warning" | undefined>("info");
    const [message, setMessage] = useState<string | null>(null);
    const [timer, setTimer] = useState<Date | null>(null);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
        const selectedChoices: SelectedOption[] = questions.map((question) => {
            const selectedOptionId = selectedOptions[question.id];
            const selectedOptionText = question.choices.find((opt) => opt.id === selectedOptionId)?.text || "";

            return {
                questionText: question.id, // Use questionId for traceability
                selectedOptionText,
            };
        });

        console.log(selectedChoices)
    };

    useEffect(() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 600);
        setLoading(true);
        setTimerRunning(false)

        setTimeout(() => {
            //after 2 seconds it will start running

            time.setSeconds(time.getSeconds() + 600);
            setTimer(time);
            setLoading(false);
            setTimerRunning(true)

        }, 2000);
    }, [])

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
                    {timer && <Timer expiryTimestamp={timer} />}
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
