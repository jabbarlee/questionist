import React from "react";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Header } from './Header'
import { merriweather} from "@/data/fonts";
import { Radio } from "antd";

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
    options: { id: string; text: string }[];
    selectedOption: string | null;
    onOptionChange: (questionIndex: number, optionId: string) => void;
}) => {
    return (
        <div className={styles.questionChip}>
            <Header index={index}/>

            {/* Question Text */}
            <div className={`${styles.questionText}`}>
                {questionText}
            </div>

            {/* Options */}
            <div className={styles.optionWrapper}>
                <Radio.Group
                    value={selectedOption} // Bind selectedOption to control the selected state
                    onChange={(e) => onOptionChange(index, e.target.value)} // Handle option change
                >
                    {options.map((option) => (
                        <Radio
                            key={option.id}
                            value={option.id}
                        >
                            <Typography className={styles.optionText}>
                                {option.text}
                            </Typography>
                        </Radio>
                    ))}
                </Radio.Group>
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

            <div className={`${styles.questionText} ${merriweather.className}`}>
                {questionText}
            </div>

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
                                    ? styles.correct
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