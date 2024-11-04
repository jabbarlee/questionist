"use client";

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { fetchPracticeSessionConfig } from '@/actions/firebase/fetchPracticeSessionConfig';
import QuestionChip from '@/components/ui/QuestionChip';
import { fetchQuestion } from '@/utils/openai/fetchQuestion';

interface QuestionData {
  type: 'multiple-choice' | 'open';
  question: string;
  choices?: string[];
}  

export default function PracticeSession({
  sessionId
} : {
  sessionId: string
}) {
    const [sessionData, setSessionData] = useState<any | null>(null);
    const [questions, setQuestions] = useState<QuestionData[]>([
        {
          choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
          question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
          type: "multiple-choice"
        },
        {
          choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
          question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
          type: "multiple-choice"
        },
        {
          question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
          type: "open"
        }
      ]);

    useEffect(() => {
        const fetchSessionConfig = async () => {
            const sessionConfig = await fetchPracticeSessionConfig(sessionId);
            setSessionData(sessionConfig);
        }

        fetchSessionConfig();
    }, [])
    
    // useEffect(() => {
    //     if (sessionData) {
    //         sessionData.selectedSubtopics.forEach((subtopic: string) => {
    //             fetchQuestion({
    //               subtopic,
    //               difficulty: sessionData.difficultyOption,
    //               calculatorOption: sessionData.calculatorOption,
    //               setQuestions: setQuestions
    //             });
    //           });
    //     }

    // }, [sessionData])
    
    console.log(questions);

  return (
    <div className={styles.practiceSession}>
      {questions.length === sessionData?.selectedSubtopics.length ? (
        questions.map((questionData, index) => (
          <QuestionChip 
            key={index}
            type={questionData.type}
            question={questionData.question}
            choices={questionData.choices}
          />
        ))
      ) : (
        <p>No questions available.</p>
      )}
      {/* <QuestionChip 
        type='open'
        question='A linear equation in the form of ax + by + c = 0. Choose the correct answer.'
        // choices={['x + by + c = 0', 'x + y + c = 0', 'x - y + c = 0', 'x - by + c = 0']}
      /> */}
    </div>
  );
}
