import React from 'react';
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Radio } from "antd";

type Option = {
    id: string;
    text: string;
};

export default function Question({
                                     index,
                                     questionText,
                                     options,
                                     selectedOption,
                                     onOptionChange,
                                 }: {
    index: number;
    questionText: string;
    options: Option[];
    selectedOption: string | null; // The currently selected option for this question
    onOptionChange: (questionIndex: number, optionId: string) => void; // Callback to update the selected option
}) {
    return (
        <div className={styles.questionContainer}>
            <div className={styles.questionNumberHeading}>
                <Typography className={styles.questionNumberText}>
                    Question {index + 1}
                </Typography>
            </div>
            <div className={styles.questionWrapper}>
                <div className={styles.questionTextWrapper}>
                    <Typography className={styles.questionText}>
                        {questionText}
                    </Typography>
                </div>
                <div className={styles.questionOptionsWrapper}>
                    {options.map((option) => (
                        <div key={option.id} className={styles.optionWrapper}>
                            <div className={styles.radioOptionWrapper}>
                                <Radio
                                    checked={selectedOption === option.text} // Checked if selected option matches this option's text
                                    onChange={() => onOptionChange(index, option.id)} // Trigger state update
                                />
                                <Typography className={styles.option}>
                                    {option.text}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
