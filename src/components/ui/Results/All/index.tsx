import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import { SessionData } from '@/types';
import Chip from "@/components/ui/Chip";
import { Button } from "antd";

interface PracticeSessionProps {
    session: SessionData;
}
const PracticeSession: React.FC<PracticeSessionProps> = ({ session }) => {
    const { createdAt, sessionName, topics, results, sessionId } = session;

    // Format the date
    const formattedDate = new Date(createdAt).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const progressColor =
        results?.overallScore === 100
            ? styles.greenProgress
            : results?.overallScore !== undefined && results?.overallScore < 50
                ? styles.redProgress
                : styles.purpleProgress;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.headerTextContainer}>
                    <Link href={`/results/${sessionId}`} style={{ textDecoration: 'none' }}>
                        <p className={styles.sessionName}>{sessionName}</p>
                    </Link>
                    <p className={styles.sessionId}>{sessionId}</p>
                </div>
                <Button variant={'outlined'} color={'danger'}>
                    Delete
                </Button>
            </div>
            <p className={styles.date}>{formattedDate}</p>
            {results && (
                <div className={styles.progressBarContainer}>
                    <div className={`${styles.progressBar} ${progressColor}`} style={{width: `${results?.overallScore}%`}}/>
                </div>
            )}
            {results && <p className={styles.score}>{results.overallScore}/100</p>}
            <div className={styles.topics}>
                {topics.map((topic, index) => (
                    <Chip key={index}>{topic}</Chip>
                ))}
            </div>
        </div>
    );
};

export default PracticeSession;