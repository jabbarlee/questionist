import React, { useState, useEffect } from 'react'
import Text from '@/components/ui/Text'
import TestPracticeWrapper from '@/components/pages/PracticeSession/TestPracticeWrapper'

export default function index({
    sessionId
} : {
    sessionId: string
}) {

  return (
    <div>
        <Text heading={true}>Practice</Text>
        <TestPracticeWrapper sessionId={sessionId}/>
    </div>
  )
}
