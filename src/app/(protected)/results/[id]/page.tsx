import React from 'react'
import ResultsSession from '@/components/pages/ResultsSession';

export default function page({ params } : { params: { id: string } }) {
    const { id } = params;
  return (
    <div>
      <ResultsSession id={id}/>
    </div>
  )
}
