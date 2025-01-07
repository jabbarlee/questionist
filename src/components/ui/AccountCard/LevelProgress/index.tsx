import styles from "./index.module.css";
import React from "react";
import { Typography } from "@mui/material";

export const LevelProgress = ({
    axpToNextLevel,
    currentAxp,
}: {
    axpToNextLevel: number;
    currentAxp: number;
}) => {
    // Calculate total experience required
    const totalAxp = axpToNextLevel + currentAxp;

    // Calculate the percentage completed
    const completedPercentage = (currentAxp / totalAxp) * 100;

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
                    {currentAxp} / {totalAxp}
                </Typography>
            </div>
        </div>
    );
};
