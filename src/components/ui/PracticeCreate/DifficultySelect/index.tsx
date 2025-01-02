import React from 'react'
import styles from './index.module.css'
import { Checkbox, Divider } from "antd";
import Typography from "@mui/material/Typography";
import { difficultyLevels } from "@/data/configData";

export default function index({
    difficulty,
    setDifficulty
}: {
    difficulty: string[] | null,
    setDifficulty: React.Dispatch<React.SetStateAction<string[] | null>>
}) {
    return (
        <div className={styles.configDifficulty}>
            <Typography className={styles.titleText}>Difficulty</Typography>
            <div className={styles.radioButtonsWrapper}>
                {difficultyLevels.map((level, index) => (
                    <div className={styles.radioWrapper} key={index}>
                        <Checkbox
                            checked={difficulty?.includes(level.difficulty)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setDifficulty([...(difficulty || []), level.difficulty]);
                                } else {
                                    setDifficulty(difficulty?.filter(d => d !== level.difficulty) || []);
                                }
                            }}
                        >
                            <Typography className={styles.radioText}>{level.difficulty}</Typography>
                            <Typography className={styles.radioSubText}>
                                {level.description}
                            </Typography>
                        </Checkbox>
                    </div>
                ))}
            </div>
        </div>
    )
}
