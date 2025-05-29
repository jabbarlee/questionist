"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Alert, Steps, Typography, Divider } from "antd";
import DifficultySelect from "@/components/ui/PracticeCreate/DifficultySelect";
import TopicsSelect from "@/components/ui/PracticeCreate/TopicsSelect";
import QuestionNumSelect from "@/components/ui/PracticeCreate/QuestionNumSelect";
import TestName from "@/components/ui/PracticeCreate/TestName";
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import { storePracticeSession } from "@/actions/firebase/set/storePracticeSession";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/context/UserContext";

const { Step } = Steps;

export default function PracticeCreate() {
  const { uid } = useCurrentUser();
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [difficulty, setDifficulty] = useState<string[] | null>([]);
  const [topics, setTopics] = useState<string[] | null>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(
    null
  );
  const [testName, setTestName] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    visible: boolean;
    type: "success" | "error" | "info" | "warning";
    message: string;
  }>({
    visible: false,
    type: "info",
    message: "",
  });

  const handleNext = () => {
    if (current === 0 && (!difficulty?.length || !numberOfQuestions)) {
      setAlert({
        visible: true,
        type: "error",
        message: "Please complete step 1 before continuing.",
      });
      return;
    }
    setAlert({ ...alert, visible: false });
    setCurrent(current + 1);
  };

  const handlePrev = () => {
    setAlert({ ...alert, visible: false });
    setCurrent(current - 1);
  };

  const handleCreate = async () => {
    if (!topics?.length || !testName) {
      setAlert({
        visible: true,
        type: "error",
        message: "Please complete step 2 before creating.",
      });
      return;
    }
    setAlert({ visible: true, type: "info", message: "Creating session..." });
    try {
      const res = await storePracticeSession({
        uid,
        topics,
        difficulty: difficulty || [],
        sessionName: testName || "",
        numberOfQuestions: numberOfQuestions || 0,
      });

      if (res.success) {
        setAlert({
          visible: true,
          type: "success",
          message: "Session created successfully! Redirecting...",
        });
        setTimeout(
          () => router.push(`/practice/session/${res.sessionId}`),
          1500
        );
      } else {
        setAlert({
          visible: true,
          type: "error",
          message: "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error creating practice session", error);
      setAlert({
        visible: true,
        type: "error",
        message: "Unexpected error occurred.",
      });
    }
  };

  const steps = [
    {
      title: "Session Setup",
      content: (
        <div className={styles.stepContent}>
          <QuestionNumSelect
            numberOfQuestions={numberOfQuestions}
            setNumberOfQuestions={setNumberOfQuestions}
          />
          <Divider />
          <DifficultySelect
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>
      ),
    },
    {
      title: "Details",
      content: (
        <div className={styles.stepContent}>
          <TopicsSelect
            topics={topics}
            setTopics={setTopics}
          />
          <Divider />
          <TestName testName={testName} setTestName={setTestName} />
        </div>
      ),
    },
  ];

  return (
    <Page>
      <Header>Create Practice Set</Header>
      <Main>
        <div className={styles.container}>
          <Steps current={current}>
            {steps.map((item, index) => (
              <Step key={index} title={item.title} />
            ))}
          </Steps>
          <div className={styles.contentCard}>{steps[current].content}</div>
          <div className={styles.buttonsContainer}>
            {current > 0 && <Button onClick={handlePrev}>Previous</Button>}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={handleCreate}>
                Create Practice Set
              </Button>
            )}
          </div>
          {alert.visible && (
            <Alert
              message={alert.message}
              type={alert.type}
              showIcon
              style={{ marginTop: 20 }}
            />
          )}
        </div>
      </Main>
    </Page>
  );
}
