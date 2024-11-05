"use client";

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { fetchPracticeSessionConfig } from '@/actions/firebase/fetchPracticeSessionConfig';
import QuestionChip from '@/components/ui/QuestionChip';
import { fetchQuestion } from '@/utils/openai/fetchQuestion';
import ChipWrapper from '@/components/ui/_wrappers/ChipWrapper';
import Chip from '@/components/ui/Chip';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { QuestionData, PracticeSessionProps } from './types';

export default function PracticeSession({
  sessionId
} : PracticeSessionProps) {
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
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <Text heading={true}>Practice <span className={styles.sessionText}>session</span></Text>
        <div className={styles.chipsContainer}>
          <ChipWrapper>
            <Chip>
              {sessionData?.selectedSubtopics[0]}
            </Chip>
            <Chip>
              {sessionData?.selectedSubtopics[1]}
            </Chip>
          </ChipWrapper>
        </div>
      </header>

      <main className={styles.questionContainer}>
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
      </main>

      <footer className={styles.footer}>
        <Button buttonType='error'>Exit</Button>
        <Button buttonType='secondary'>Submit</Button>
      </footer>
    </div>
  );
}
