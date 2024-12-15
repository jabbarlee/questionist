import React from "react";
import styles from "./index.module.css";

export const ResultChip = (
    {
        result
    }:{
        result: boolean
    }) => {
    return (
        <div className={result ? `${styles.correctWrapper}` : `${styles.incorrectWrapper}`}>
            <p
                className={result ?
                    `${styles.correct}` :
                    `${styles.incorrect}`
                }
            >
                {result ? "Correct" : "Incorrect"}
            </p>
        </div>
    );
};