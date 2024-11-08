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
import { QuestionData, PracticeSessionProps } from './types';
import ButtonTextWrapper from '@/components/ui/_wrappers/ButtonTextWrapper';
import Footer from '@/components/ui/_wrappers/Footer';
import { updateQuestions } from '@/actions/firebase/updateDoc';
import { handleChoiceSelect } from '@/actions/handleChoiceSelect';
import Main from '@/components/ui/_wrappers/Main';
import Header from '@/components/ui/_wrappers/Header';
import ChipsContainer from '@/components/ui/_wrappers/ChipsContainer';

export default function PracticeSession({
  sessionId
} : PracticeSessionProps) {
    const [sessionData, setSessionData] = useState<any | null>(null);
    const [questions, setQuestions] = useState<QuestionData[]>([
      {
        choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
        question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
        type: "multiple-choice",
        correctAnswer: "4,166.67 m/s"
      },
      {
        choices: ["4,166.67 m/s", "25,000 m/s", "41,666.67 m/s", "250,000 m/s"],
        question: "A rocket travels at a speed of 15,000 kilometers per hour. A scientist is measuring the speed of the rocket in meters per second. Which o…",
        type: "multiple-choice",
        correctAnswer: "4,166.67 m/s"
      }
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

  return (
    <div className={styles.pageContainer}>
      <Header>
        <Text heading={true}>Practice <span className={styles.sessionText}>session</span></Text>
        <ChipsContainer>
          <ChipWrapper>
            <Chip>
              {sessionData?.selectedSubtopics[0]}
            </Chip>
            <Chip>
              {sessionData?.selectedSubtopics[1]}
            </Chip>
          </ChipWrapper>
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
              onSelectChoice={(choice: string) => handleChoiceSelect(choice, index, setSelectedChoices, selectedChoices)}
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
        <Button buttonType='secondary' onClick={() => updateQuestions(sessionId, questions)}>
          <ButtonTextWrapper>
            <CheckIcon fontSize='small'/>
            Submit
          </ButtonTextWrapper>
        </Button>
      </Footer>
    </div>
  );
}
