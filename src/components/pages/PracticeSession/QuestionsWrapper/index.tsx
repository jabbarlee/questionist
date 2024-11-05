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
        },
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
          choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
          question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
          type: "multiple-choice"
        },
      ]);
      const [selectedChoices, setSelectedChoices] = useState<(string | null)[]>([]);

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

    const handleChoiceSelect = (choice: string, questionIndex: number) => {
        setSelectedChoices(prevChoices => {
            const updatedChoices = [...prevChoices];
            updatedChoices[questionIndex] = choice;
            return updatedChoices;
        });

        console.log(selectedChoices);
    };

  return (
    <div className={styles.practiceSession}>
      {questions ? (
        questions.map((questionData, index) => (
          <QuestionChip 
            key={index}
            type={questionData.type}
            question={questionData.question}
            choices={questionData.choices}
            selectedChoice={selectedChoices[index]}
            onSelectChoice={(choice: string) => handleChoiceSelect(choice, index)}
            questionIndex={index}
          />
        ))
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}
