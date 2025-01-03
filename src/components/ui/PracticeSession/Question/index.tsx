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

            <div className={`${styles.questionText} ${merriweather.className}`}>
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
    options: { id: string; text: string }[];
    selectedOption: string | null;
    correctOption: string | null;
}) => {
    return (
        <div className={styles.questionChip}>
            <Header index={1}/>

            <div className={`${styles.questionText} ${merriweather.className}`}>
                {questionText}
            </div>

            {/* Options */}
            <Radio.Group className={styles.questionOptionsWrapper} value={selectedOption}>
                {options.map((option) => (
                    <Radio
                        key={option.id}
                        value={option.text}
                        className={`${styles.optionWrapper} ${
                            selectedOption === option.text && correctOption === option.text
                                ? styles.correctOption // Green for selected and correct
                                : selectedOption === option.text
                                    ? styles.incorrectOption // Red for selected and incorrect
                                    : correctOption === option.text
                                        ? styles.correctOption // Green for correct answer
                                        : ""
                        }`}
                    >
                        <Typography className={styles.optionText}>
                            {option.text}
                        </Typography>
                    </Radio>
                ))}
            </Radio.Group>
        </div>
    );
};
