import React from 'react'
import Main from '@/components/ui/_wrappers/Main';
import { handleChoiceSelect } from '@/actions/handleChoiceSelect';
import { QuestionData } from '../../QuestionsWrapper/types';
import QuestionChip from '@/components/ui/QuestionChip';
import CircularProgress from '@mui/material/CircularProgress';

export default function index({
    questions,
    selectedChoices,
    setSelectedChoices,
    setError,
    sessionData
} : {
    questions: QuestionData[],
    selectedChoices: (string | null)[],
    setSelectedChoices: React.Dispatch<React.SetStateAction<string[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    sessionData: any
}) {
  return (
    <Main>
        {questions.length == sessionData?.selectedSubtopics.length ? (
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
          <CircularProgress/>
        )}
    </Main>
  )
}
