import React from "react";
import styles from "./index.module.css";

export const Header = ({ index }: { index: number}) => {
    return (
        <div className={styles.questionHeader}>
            <div className={styles.questionNumber}>{index + 1}</div>
            <div className={styles.questionBar}></div>
            <button className={styles.markButton}>
                Mark
            </button>
        </div>
    );
};