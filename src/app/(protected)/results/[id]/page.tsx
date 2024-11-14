import React from 'react'
import ResultPage from '@/components/pages/PracticeSessionResult/ResultPage'

export default function page({ params } : { params: { id: string } }) {
    const { id } = params;
  return (
    <div>
      <ResultPage id={id}/>
    </div>
  )
}
