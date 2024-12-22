import React from "react";
import styles from "./index.module.css";
import { ScoreChip, ScoreProgress } from "./ScoreChip";
import {Typography} from "@mui/material";
import {Button} from "antd";

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
            <div className={styles.passedTextContainer}>
                <Typography className={styles.passedText}>
                    {overallScore >= 80 ? "You passed the test!" : "You need more practice!"}
                </Typography>
                <Button type={"link"} color={"primary"} size={"large"}>
                    Practice again
                </Button>
            </div>

            <div className={styles.chipContainer}>
                <div className={styles.chipWrapper}>
                    <ScoreChip success text={"Correct"}>{correctAnswers}</ScoreChip>
                    <ScoreChip error text={"Incorrect"}>{incorrectAnswers}</ScoreChip>
                    <ScoreChip text={"Total"}>{numOfQuestions}</ScoreChip>
                    <ScoreChip text={"Omitted"}>{1}</ScoreChip>
                </div>
                <div className={styles.chipWrapper}>
                    <ScoreProgress progress={80}/>
                </div>
            </div>
        </div>
    );
}
