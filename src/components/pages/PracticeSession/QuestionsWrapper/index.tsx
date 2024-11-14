"use client";

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { fetchPracticeSessionConfig } from '@/actions/firebase/getDoc';
import { fetchQuestion } from '@/utils/openai/fetchQuestion';
import { QuestionData, PracticeSessionProps } from './types';
import ChipContainer from '@/components/pages/PracticeSession/containers/ChipContainer';
import QuestionsContainer from '@/components/pages/PracticeSession/containers/QuestionsContainer';
import ButtonsContainer from '@/components/pages/PracticeSession/containers/ButtonsContainer';
import AlertContainer from '@/components/pages/PracticeSession/containers/AlertContainer';
import { useRouter } from 'next/navigation';

export default function PracticeSession({
  sessionId
} : PracticeSessionProps) {
    const router = useRouter()

    const [sessionData, setSessionData] = useState<any | null>(null);
    const [questions, setQuestions] = useState<QuestionData[]>([
      // {
      //   question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
      //   choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
      //   correctAnswer: "41,666.67 m/s",
      //   type: "multiple-choice",
      // },
      // {
      //   question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
      //   choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
      //   correctAnswer: "41,666.67 m/s",
      //   type: "multiple-choice",
      // },
      // {
      //   question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
      //   choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
      //   correctAnswer: "41,666.67 m/s",
      //   type: "multiple-choice",
      // },
      // {
      //   question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
      //   choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
      //   correctAnswer: "41,666.67 m/s",
      //   type: "multiple-choice",
      // }
    ]);
    const [selectedChoices, setSelectedChoices] = useState<(string)[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const fetchSessionConfig = async () => {
            const sessionConfig = await fetchPracticeSessionConfig(sessionId);
            setSessionData(sessionConfig);
        }

        fetchSessionConfig();
    }, [])
    
    useEffect(() => {
        if (sessionData) {
            sessionData.selectedSubtopics.forEach((subtopic: string) => {
                fetchQuestion({
                  subtopic,
                  difficulty: sessionData.difficultyOption,
                  calculatorOption: sessionData.calculatorOption,
                  setQuestions: setQuestions
                });
              });
        }

    }, [sessionData])

    const handleNavigate = (url: string) => {
      router.push(url);
    };

  return (
    <div className={styles.questionsWrapper}>
      {(error || message) && (
        <AlertContainer 
          error={error}
          message={message}
        />
      )}
      <ChipContainer 
        sessionData={sessionData}
      />
      <QuestionsContainer 
        questions={questions} 
        selectedChoices={selectedChoices} 
        setSelectedChoices={setSelectedChoices} 
        setError={setError} 
        setProgress={setProgress}
        sessionData={sessionData}
      />
      <ButtonsContainer 
        sessionId={sessionId} 
        questions={questions}
        progress={progress} 
        selectedChoices={selectedChoices} 
        setError={setError}
        setMessage={setMessage}
        handleNavigate={handleNavigate}
      />
    </div>
  );
}
