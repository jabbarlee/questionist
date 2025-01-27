"use client";

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Steps } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import styles from "./index.module.css";

const { Step } = Steps;

const StreakProgress: React.FC<{ userId: string }> = ({ userId }) => {
    const [currentStreak, setCurrentStreak] = useState(5);
    const streakGoal = 7;

    return (
        <div className={styles.container}>
            <Typography className={styles.heading} fontSize="24px">
                Streak
            </Typography>
            <Steps current={currentStreak - 1} size="small">
                {Array.from({ length: streakGoal }).map((_, index) => (
                    <Step
                        key={index}
                        title={
                            <p
                                style={{
                                    fontSize: "12px",
                                    margin: "0",
                                    color: index < currentStreak ? "#1890FF" : "gray",
                                }}
                            >
                                Day {index + 1}
                            </p>
                        }
                        status={index < currentStreak ? "finish" : "wait"}
                        style={{ padding: "0" }}
                    />
                ))}
            </Steps>
            {currentStreak === streakGoal ? (
                <Typography fontSize="14px" color="success.main">
                    🎉 Goal Achieved! Fantastic work!
                </Typography>
            ) : (
                <Typography fontSize="14px" color="text.secondary">
                    Keep it up! Almost there!
                </Typography>
            )}
        </div>
    );
};

export default StreakProgress;
