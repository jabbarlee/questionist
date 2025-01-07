import styles from "./index.module.css";
import React from "react";
import { Typography } from "@mui/material";

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
            <div className={styles.progress}>
                <Typography className={styles.progressAxpText}>
                    {currentAxp} / {axpToNextLevel + currentAxp}
                </Typography>
            </div>
        </div>
    );
}