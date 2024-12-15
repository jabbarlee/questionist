import React from "react";
import styles from "./index.module.css";

export const ScoreChip = (
    {
        children,
        success,
        error,
    }: {
        children: React.ReactNode,
        success?: boolean,
        error?: boolean,
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
                {success ? "Correct" : error ? "Incorrect" : "Total"}
            </p>
            <p className={`${styles.statValue} ${success ? styles.correctLabel : error ? styles.incorrectLabel : ""}`}>
                {children}
            </p>
        </div>
    );
};
