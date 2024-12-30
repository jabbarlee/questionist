import React from "react";
import styles from "./index.module.css";
import { ScoreChip, ScoreProgress } from "./ScoreChip";
import {Typography} from "@mui/material";
import {Button} from "antd";
import { SessionData } from "@/types";

export default function ScoreBoard({
    correctAnswers,
    incorrectAnswers,
    numOfQuestions,
    overallScore,
    axpGained,
    brilliantsGained,
    timerStat
}: {
    correctAnswers: number;
    incorrectAnswers: number;
    numOfQuestions: number;
    overallScore: number;
    timerStat?: string;
    axpGained: number
    brilliantsGained: number
}) {
    return (
        <div className={styles.scoreBoard}>
            <div className={styles.passedTextContainer}>
                <Typography className={styles.passedText}>
                    {overallScore >= 80 ? "You passed the test!" : "You need more practice!"}
                </Typography>
                <div>
                    <Button type={"link"} color={"primary"} size={"large"}>
                        Back to dashboard
                    </Button>
                    <Button type={"link"} color={"primary"} size={"large"}>
                        Practice again
                    </Button>
                </div>
            </div>

            <div className={styles.chipContainer}>
                <div className={styles.chipWrapper}>
                    <ScoreChip success text={"Correct"}>{correctAnswers}</ScoreChip>
                    <ScoreChip error text={"Incorrect"}>{incorrectAnswers}</ScoreChip>
                     <ScoreChip text={"AXP"}>+ {axpGained}</ScoreChip>
                    <ScoreChip text={"Brilliants"}>+ {brilliantsGained}</ScoreChip>
                </div>
                <div className={styles.chipWrapper}>
                    <ScoreProgress progress={overallScore}/>
                </div>
            </div>
        </div>
    );
}
