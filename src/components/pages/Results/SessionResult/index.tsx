'use client'

import React, { useState, useEffect} from 'react'
import styles from './index.module.css'
import Header from '@/components/ui/_wrappers/Header'
import Main from '@/components/ui/_wrappers/Main'
import Footer from '@/components/ui/_wrappers/Footer'
import Text from '@/components/ui/Text'
import QuestionChip from '@/components/ui/QuestionChip'
import CircularProgress from '@mui/material/CircularProgress'
import { getResults } from '@/actions/firebase/getDoc'

export default function index({ id }: { id: string }) {
  const [results, setResults] = useState<boolean[] | null>([]);
  const [sessionData, setSessionData] = useState<any | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const { results, sessionData, success } = await getResults(id);

      setResults(results);
      setSessionData(sessionData);
    }
    fetchResults();
  }, [id]);

  return (
    <div>
      <Header>
        <Text heading={true}>Results</Text>
      </Header>
      <Main>
        {sessionData?.questions ? (
          sessionData.questions.map((questionData: any, index: any) => (
            <QuestionChip 
              key={index}
              type={questionData.type}
              question={questionData.question}
              choices={questionData.choices}
              selectedChoice={questionData.selectedChoice}
              correctChoice={results?.[index]}
              questionIndex={index}
            />
          ))
        ) : (
          <CircularProgress/>
        )}
      </Main>
      {/* <ButtonsContainer 
        sessionId={sessionId} 
        questions={questions}
        progress={progress} 
        selectedChoices={selectedChoices} 
        setError={setError}
        setMessage={setMessage}
        handleNavigate={handleNavigate}
      /> */}
    </div>
  )
}
