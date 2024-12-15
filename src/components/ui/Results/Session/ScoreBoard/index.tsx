import React from "react";
import styles from "./index.module.css";
import { ScoreChip } from "./ScoreChip";

export default function ScoreBoard({
    correctAnswers,
    incorrectAnswers,
    numOfQuestions,
    overallScore,
    timerStat
}: {
    correctAnswers: number;
    incorrectAnswers: number;
    numOfQuestions: number;
    overallScore: number;
    timerStat?: string;
}) {
    return (
        <div className={styles.scoreBoard}>
            <h2 className={styles.title}>Stats</h2>
            <div className={styles.scoreBoardWrapper}>
                <div className={styles.statsContainer}>
                    <ScoreChip success>{correctAnswers}</ScoreChip>
                    <ScoreChip error>{incorrectAnswers}</ScoreChip>

                    <div className={styles.statBox}>
                        <p className={styles.statLabel}>Timer</p>
                        <p className={styles.statValue}>{timerStat || '21:20'}</p>
                    </div>
                </div>
                <div className={styles.overallScoreWrapper}>
                    <div>
                        <p className={styles.overallScoreLabel}>Overall Score</p>
                    </div>
                    <div className={styles.arcWrapper}>
                        <svg className={styles.arc} viewBox="0 0 36 36">
                            <path
                                className={styles.arcBackground}
                                d="M18 2 A16 16 0 1 1 17.99 2"
                            />
                            <path
                                className={styles.arcProgress}
                                d="M18 2 A16 16 0 1 1 17.99 2"
                                style={{
                                    strokeDasharray: `${(overallScore / 100) * 100} 100`,
                                }}
                            />
                        </svg>
                        <div className={styles.arcText}>
                            <span>{overallScore}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
