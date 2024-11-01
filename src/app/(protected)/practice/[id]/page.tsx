import React from 'react'
import PracticeSessionPage from '@/components/pages/PracticeSession/PracticeSessionPage'

export default function page({ params } : { params: { id: string } }) {
    const { id } = params;
  return (
    <div>
      <PracticeSessionPage sessionId={id} />
    </div>
  )
}
