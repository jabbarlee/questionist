"use client";

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { fetchPracticeSessionConfig } from '@/actions/firebase/fetchPracticeSessionConfig';
import QuestionChip from '@/components/ui/QuestionChip';

interface QuestionData {
  type: 'multiple-choice' | 'open';
  question: string;
  choices?: string[];
}  

export default function PracticeSession({
  sessionId
} : {
  sessionId: string
}) {
    const [sessionData, setSessionData] = useState<any | null>(null);

    useEffect(() => {

        const fetchSessionConfig = async () => {
            const sessionConfig = await fetchPracticeSessionConfig(sessionId);
            setSessionData(sessionConfig);
        }

        fetchSessionConfig();
    }, [])
    console.log(sessionData);

  return (
    <div className={styles.practiceSession}>
      
    </div>
  );
}
