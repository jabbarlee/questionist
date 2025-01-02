import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import { SessionData } from '@/types';
import Chip from "@/components/ui/Chip";
import { Button } from "antd";
import { RightOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { favoriteSession } from "@/actions/firebase/updateDoc";

interface PracticeSessionProps {
    session: SessionData;
    refreshSessions: () => Promise<void>;
    showModal: (message: string) => void;
    favorite: boolean;
}

const SessionCard: React.FC<PracticeSessionProps> = ({ session, refreshSessions, showModal, favorite }) => {
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
            : results?.overallScore !== undefined && results?.overallScore < 30
                ? styles.redProgress
                : styles.purpleProgress;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.headerTextContainer}>
                    <Link href={`/results/${sessionId}`} style={{ textDecoration: 'none' }}>
                        <p className={styles.sessionName}>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {sessionName}
                                <RightOutlined style={{ fontSize: '16px' }} />
                            </div>
                        </p>
                    </Link>
                    <p className={styles.date}>{formattedDate}</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button variant="outlined" danger onClick={() => showModal(sessionId)}>
                        Delete
                    </Button>
                    <Button onClick={async () => {
                        const { success } = await favoriteSession(sessionId);

                        if (success) {
                            await refreshSessions();
                        }
                    }}>
                        {session?.favorite ?
                            <StarFilled style={{ color: "gold" }}/>
                                :
                            <StarOutlined />
                        }
                    </Button>
                </div>
            </div>
            {results && (
                <div className={styles.progressBarContainer}>
                    <div
                        className={`${styles.progressBar} ${progressColor}`}
                        style={{ width: `${results?.overallScore}%` }}
                    />
                </div>
            )}
            {results && <p className={styles.score}>{results.overallScore}%</p>}
            <div className={styles.topics}>
                {topics.map((topic, index) => (
                    <Chip key={index}>{topic}</Chip>
                ))}
            </div>
        </div>
    );
};

export default SessionCard;
