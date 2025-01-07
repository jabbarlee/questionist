import styles from "@/components/ui/Results/Session/ScoreBoard/ScoreChip/index.module.css";
import React from "react";

export const LevelProgress = (
    {
        axpToNextLevel,
        currentAxp,
        progress
    }: {
        axpToNextLevel: number,
        currentAxp: number,
        progress: number,
    }
) => {
    return (
        <div className={styles.progressWrapper}>
            <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${100 - progress}%` }} />
            </div>
            <div className={styles.progress}>{currentAxp}/{axpToNextLevel + currentAxp}</div>
        </div>
    );
}