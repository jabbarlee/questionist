'use client'

import React, { useState, useEffect } from 'react'
import Text from '@/components/ui/Text'
import { fetchPracticeSessionConfig } from '@/actions/firebase/fetchPracticeSessionConfig'

export default function index({
    sessionId
} : {
    sessionId: string
}) {
    const [sessionData, setSessionData] = useState<any | null>(null);

    useEffect(() => {
        const sessionConfig = fetchPracticeSessionConfig(sessionId);

        sessionConfig.then((data) => {
            setSessionData(data);
        })
    }, [])

  return (
    <div>
        <Text heading={true}>Session {sessionId}</Text>
        <p>{sessionData?.selectedSubtopics}</p>
        <p>{sessionData?.createdAt}</p>
        <p>{sessionData?.calculatorOption}</p>

    </div>
  )
}
