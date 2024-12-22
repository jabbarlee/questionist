import React from "react";
import styles from "./index.module.css";

export const ScoreChip = (
    {
        children,
        success,
        error,
        text,
    }: {
        children: React.ReactNode,
        success?: boolean,
        error?: boolean,
        text: string,
    }) => {
    return (
        <div
            className={`
                ${styles.statBox} 
                ${success ? styles.correctStat : ""} 
                ${error ? styles.incorrectStat : ""}
            `}
        >
            <p className={`
                ${styles.statLabel} 
                ${success ? styles.correctLabel : ""} 
                ${error ? styles.incorrectLabel : ""}
            `}>
                {text}
            </p>
            <p className={`${styles.statValue} ${success ? styles.correctLabel : error ? styles.incorrectLabel : ""}`}>
                {children}
            </p>
        </div>
    );
};

export const ScoreProgress = (
    {
        progress,
    }: {
        progress: number,
    }
) => {
    const progressColor = progress === 100 ? styles.greenProgress :
        progress > 50 ? styles.purpleProgress :
            styles.redProgress;

    return (
        <div className={styles.progressWrapper}>
            <div className={styles.progressContainer}>
                <div className={`${styles.progressBar} ${progressColor}`} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.progress}>{progress} %</div>
        </div>
    );
}