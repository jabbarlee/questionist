import React from 'react'
import SessionResult from '@/components/pages/Results/SessionResult'

export default function page({ params } : { params: { id: string } }) {
    const { id } = params;
  return (
    <div>
      <SessionResult id={id}/>
    </div>
  )
}
