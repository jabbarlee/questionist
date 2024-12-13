import React from "react";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Header } from './Header'

type Option = {
    id: string;
    text: string;
};

export const Question = ({
                             index,
                             questionText,
                             options,
                             selectedOption,
                             onOptionChange,
                         }: {
    index: number;
    questionText: string;
    options: Option[];
    selectedOption: string | null;
    onOptionChange: (questionIndex: number, optionId: string) => void;
}) => {
    return (
        <div className={styles.questionChip}>
            <Header index={index}/>

            <div className={styles.questionText}>
                {questionText}
            </div>

            <div className={styles.questionOptionsWrapper}>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`${styles.optionWrapper} ${
                            selectedOption === option.text ? styles.selectedOption : ""
                        }`}
                        onClick={() => onOptionChange(index, option.id)}
                    >
                        <div
                            className={`${styles.radioIndicator} ${
                                selectedOption === option.text ? styles.selected : ""
                            }`}
                        ></div>
                        <Typography className={styles.optionText}>
                            {option.text}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const QuestionResult = ({
                                   index,
                                   questionText,
                                   options,
                                   selectedOption,
                                   correctOption,
                               }: {
    index: number;
    questionText: string;
    options: Option[];
    selectedOption: string | null;
    correctOption: string | null;
}) => {
    return (
        <div className={styles.questionChip}>
            <Header index={index}/>

            <div className={styles.questionText}>
                {questionText}
            </div>

            {/* Options */}
            <div className={styles.questionOptionsWrapper}>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`${styles.optionWrapper} ${
                            selectedOption === option.text && correctOption === option.text
                                ? styles.correctOption // Green if selected and correct
                                : selectedOption === option.text
                                    ? styles.incorrectOption // Red if selected and incorrect
                                    : correctOption === option.text
                                        ? styles.correctOption // Green for correct answer
                                        : ""
                        }`}
                    >
                        {/* Read-only Radio Indicator */}
                        <div
                            className={`${styles.radioIndicator} ${
                                selectedOption === option.text && correctOption === option.text
                                    ? styles.selected
                                    : selectedOption === option.text
                                        ? styles.incorrect
                                        : correctOption === option.text
                                            ? styles.correct
                                            : ""
                            }`}
                        ></div>
                        <Typography className={styles.optionText}>
                            {option.text}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};