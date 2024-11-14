"use client";

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { fetchPracticeSessionConfig } from '@/actions/firebase/getDoc';
import QuestionChip from '@/components/ui/QuestionChip';
import { fetchQuestion } from '@/utils/openai/fetchQuestion';
import ChipWrapper from '@/components/ui/_wrappers/ChipWrapper';
import Chip from '@/components/ui/Chip';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Skeleton } from '@mui/material';
import { QuestionData, PracticeSessionProps } from './types';
import ButtonTextWrapper from '@/components/ui/_wrappers/ButtonTextWrapper';
import Footer from '@/components/ui/_wrappers/Footer';
import { updateQuestions } from '@/actions/firebase/updateDoc';
import { handleChoiceSelect } from '@/actions/handleChoiceSelect';
import Main from '@/components/ui/_wrappers/Main';
import Alert from '@mui/material/Alert';
import Header from '@/components/ui/_wrappers/Header';
import ChipsContainer from '@/components/ui/_wrappers/ChipsContainer';

export default function PracticeSession({
  sessionId
} : PracticeSessionProps) {
    const [sessionData, setSessionData] = useState<any | null>(null);
    const [questions, setQuestions] = useState<QuestionData[]>([
      {
        question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
        choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
        correctAnswer: "41,666.67 m/s",
        type: "multiple-choice",
      },
      {
        question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
        choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
        correctAnswer: "41,666.67 m/s",
        type: "multiple-choice",
      },
      {
        question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
        choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
        correctAnswer: "41,666.67 m/s",
        type: "multiple-choice",
      },
      {
        question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
        choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
        correctAnswer: "41,666.67 m/s",
        type: "multiple-choice",
      }
    ]);
    const [selectedChoices, setSelectedChoices] = useState<(string)[]>([]);
    const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      {error && (
        <div className={styles.alertContainer}>
          <Alert severity="warning">{error}</Alert>
        </div>
      )}
      <Header>
        <Text heading={true}>Practice <span className={styles.sessionText}>session</span></Text>
        <ChipsContainer>
            {sessionData && sessionData.selectedSubtopics.length > 0 ? (
              <ChipWrapper>
                  {sessionData.selectedSubtopics.map((subtopic: string, index: number) => (
                    <Chip key={index}>{subtopic}</Chip>
                  ))}
              </ChipWrapper>
            ) : (
              <div>
                <Skeleton variant="text"  />
              </div>
            )}
        </ChipsContainer>
      </Header>
      <Main>
        {questions ? (
          questions.map((questionData, index) => (
            <QuestionChip 
              key={index}
              type={questionData.type}
              question={questionData.question}
              choices={questionData.choices}
              selectedChoice={selectedChoices[index]}
              onSelectChoice={(choice: string) => handleChoiceSelect(choice, index, setSelectedChoices, selectedChoices, setError)}
              questionIndex={index}
            />
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </Main>
      <Footer>
        {selectedChoices.map((choice, index) => (
          <Chip key={index}>{choice}</Chip>
        ))}
        <Button buttonType='error'>
          <ButtonTextWrapper>
            <CancelOutlinedIcon fontSize='small'/>
            Exit
          </ButtonTextWrapper>
        </Button>
        <Button buttonType='secondary' onClick={async() => {
          setError(null);
          const res = await updateQuestions(sessionId, questions, selectedChoices);
          
          if (res?.success) {
            setError(null);
          } else {
            setError(res?.error || 'Something went wrong');
          }
        }}>
          <ButtonTextWrapper>
            <CheckIcon fontSize='small'/>
            Submit
          </ButtonTextWrapper>
        </Button>
      </Footer>
    </div>
  );
}
