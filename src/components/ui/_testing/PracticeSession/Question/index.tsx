import React from 'react';
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Radio } from "antd";
import Main from '@/components/ui/_wrappers/Main';
import { CloseOutlined } from '@ant-design/icons';

type Option = {
    id: string;
    text: string;
};

export default function index({
  index,
  questionText,
  options,
} : {
    index: number,
    questionText: string,
    options: Option[]
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
                    {options.map((option: Option, index: number) => (
                        <div
                            key={option.id}
                            className={`${styles.optionWrapper} ${
                                index === 0
                                    ? styles.optionFirst
                                    : styles.optionNotFirst
                            }`}
                        >
                            <div className={styles.radioOptionWrapper}>
                                <Radio/>
                                <Typography className={styles.option}>
                                    {option.id}) {option.text}
                                </Typography>
                            </div>
                            <div className={styles.clearIcon}>
                                <CloseOutlined/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}