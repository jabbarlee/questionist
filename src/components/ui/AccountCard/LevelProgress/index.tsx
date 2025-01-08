import styles from "./index.module.css";
import React from "react";
import { Typography } from "@mui/material";

export const LevelProgress = ({
                                  currentAxp,
                                  axpToNextLevel,
                                  currentLevelThreshold,
                              }: {
    currentAxp: number;
    axpToNextLevel: number;
    currentLevelThreshold: { lowerBound: number; upperBound: number };
}) => {
    const { lowerBound, upperBound } = currentLevelThreshold;

    // Calculate total AXP for the current level
    const totalLevelAxp = upperBound - lowerBound;

    // Calculate the current AXP progress within the current level's bounds
    const levelAxp = currentAxp - lowerBound;

    // Calculate the percentage completed for the progress bar
    const completedPercentage = (levelAxp / totalLevelAxp) * 100;

    return (
        <div className={styles.progressWrapper}>
            <div className={styles.progressContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${completedPercentage}%` }}
                />
            </div>
            <div className={styles.progress}>
                <Typography className={styles.progressAxpText}>
                    {currentAxp} / {upperBound}
                </Typography>
            </div>
        </div>
    );
};
