"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Progress, Alert, Tag } from "antd";
import DifficultySelect from "@/components/ui/PracticeCreate/DifficultySelect";
import QuestionTypeSelect from "@/components/ui/PracticeCreate/QuestionTypeSelect";
import TopicsSelect from "@/components/ui/PracticeCreate/TopicsSelect";
import QuestionNumSelect from "@/components/ui/PracticeCreate/QuestionNumSelect";
import TestName from "@/components/ui/PracticeCreate/TestName";
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import Footer from "@/components/ui/_wrappers/Footer";
import Page from "@/components/ui/_wrappers/Page";
import { Potion, Bolt, Fire } from "@/data/icons/practice";
import { storePracticeSession } from "@/actions/firebase/set/storePracticeSession";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { PracticeStartProps } from "@/types";
import { useCurrentUser } from "@/lib/context/UserContext";

export default function PracticeCreate() {
  const { uid } = useCurrentUser();

  const [difficulty, setDifficulty] = useState<string[] | null>([]);
  const [questionType, setQuestionType] = useState<string[] | null>([]);
  const [topics, setTopics] = useState<string[] | null>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(
    null
  );
  const [testName, setTestName] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [successAlertVisible, setSuccessAlertVisible] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<
    "info" | "error" | "success" | "warning" | undefined
  >();

  const router = useRouter();

  const handleCreate = async () => {
    try {
      setAlertType("info");
      setSuccessAlertVisible(true);
      setAlertMessage("Creating session...");

      const res = await storePracticeSession({
        uid: uid,
        topics: topics || [],
        difficulty: difficulty || [],
        sessionName: testName || "",
        numberOfQuestions: numberOfQuestions || 0,
      });

      if (res.success) {
        setSuccessAlertVisible(true);
        setAlertType("success");
        setAlertMessage("Session created successfully! Redirecting...");
        router.push(`/practice/session/${res.sessionId}`);
      } else {
        setSuccessAlertVisible(true);
        setAlertType("error");
      }
    } catch (error) {
      console.error("Error creating practice session", error);
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

  const handleDefinedSetStart = async ({
    topics,
    difficulty,
    sessionName,
    numberOfQuestions,
  }: PracticeStartProps) => {
    try {
      const { success, sessionId } = await storePracticeSession({
        uid: uid,
        topics,
        difficulty,
        sessionName,
        numberOfQuestions,
      });

      if (success && sessionId) {
        router.push(`/practice/session/${sessionId}`);
      }
    } catch (error) {
      console.error("Error starting popular set: ", error);
    }
  };

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
      <Header>Create Practice Set</Header>
      <Main>
        <div className={styles.container}>
          <div className={styles.card}>
            <TestName testName={testName} setTestName={setTestName} />
            <DifficultySelect
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
            <QuestionTypeSelect
              questionType={questionType}
              setQuestionType={setQuestionType}
            />
            <TopicsSelect topics={topics} setTopics={setTopics} />
            <QuestionNumSelect
              numberOfQuestions={numberOfQuestions}
              setNumberOfQuestions={setNumberOfQuestions}
            />
            <div className={styles.createSetFooter}>
              <div className={styles.progressContainer}>
                <div className={styles.progress}>
                  <Progress
                    percent={progress}
                    percentPosition={{ align: "center", type: "inner" }}
                    size={[500, 20]}
                  />
                </div>
                <div className={styles.progressText}>
                  <Typography variant="h6">
                    {progress === 100
                      ? "Ready to create!"
                      : "Complete the form to create a practice set."}
                  </Typography>
                </div>
              </div>
              <div className={styles.button}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    if (
                      testName &&
                      difficulty &&
                      questionType &&
                      topics &&
                      numberOfQuestions
                    ) {
                      handleCreate();
                    } else {
                      setAlertVisible(true);
                    }
                  }}
                >
                  Create Practice Set
                </Button>
              </div>
            </div>
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
      </Main>
    </Page>
  );
}
