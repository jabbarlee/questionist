import React from "react";
import styles from "./index.module.css";
import { ScoreChip, ScoreProgress } from "./ScoreChip";
import {Typography} from "@mui/material";
import {Button, Tag} from "antd";
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
                    {'You scored ' + overallScore + '%'}
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
                    <Tag
                        color={'success'}
                        className={styles.tag}
                    >
                        {correctAnswers}
                    </Tag>
                    <Tag
                        color={"error"}
                        className={styles.tag}
                    >
                        {incorrectAnswers}
                    </Tag>
                    <Tag
                        color={axpGained == 0 ? 'cyan' : 'cyan-inverse'}
                        className={styles.tag}
                    >
                        + {axpGained}
                    </Tag>
                    <Tag
                        color={brilliantsGained == 0 ? 'gold' : 'gold-inverse'}
                        className={styles.tag}
                    >
                        + {brilliantsGained}
                    </Tag>
                </div>
                <div className={styles.chipWrapper}>
                    <ScoreProgress progress={overallScore}/>
                </div>
            </div>
        </div>
    );
}
