'use client';

import React from 'react';
import Text from "@/components/ui/Text";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@/components/ui/Button";
import styles from './index.module.css';
import Chip from '@/components/ui/Chip'
import ChipWrapper from '@/components/ui/_wrappers/ChipWrapper'

export default function SessionResultCard({
  sessionId,
  date,
  progress,
  selectedSubtopics
}: {
    sessionId: string;
    date: string;
    progress: number;
    selectedSubtopics: string[];
}) {
    return (
        <div className={styles.sessionResultCardWrapper}>
            {/* Left Section: Session Info */}
            <div className={styles.sessionInfo}>
                <div className={styles.header}>
                    <Text className={styles.sessionIdText}>{sessionId}</Text>
                    <Button buttonType="error">Delete</Button>
                </div>
                <p className={styles.date}>
                    {date}
                </p>
                <div className={styles.progressWrapper}>
                    <LinearProgress
                        color={progress === 100 ? 'success' : 'primary'}
                        variant="determinate"
                        value={progress}
                        className={styles.progressBar}
                    />
                    <p className={styles.progressText}>{progress}/100</p>
                </div>
                <ChipWrapper>
                    {selectedSubtopics.map((subtopic, index) => (
                        <Chip key={index}>
                            {subtopic}
                        </Chip>
                    ))}
                </ChipWrapper>
            </div>
        </div>
    );
}
