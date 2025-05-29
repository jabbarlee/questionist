"use client";

import React from "react";
import styles from "./index.module.css";
import { Radio, Typography } from "antd";

type QuestionNumSelectProps = {
  numberOfQuestions: number | null;
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function QuestionNumSelect({
  numberOfQuestions,
  setNumberOfQuestions,
}: QuestionNumSelectProps) {
  const options = [
    { label: "Classic", value: 10, description: "10 questions" },
    { label: "Miniset", value: 5, description: "5 questions" },
  ];

  return (
    <div className={styles.wrapper}>
      <Typography className={styles.title}>Number of Questions</Typography>
      <div className={styles.cardGrid}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`${styles.card} ${
              numberOfQuestions === opt.value ? styles.selected : ""
            }`}
            onClick={() => setNumberOfQuestions(opt.value)}
          >
            <Radio
              checked={numberOfQuestions === opt.value}
              value={opt.value}
              className={styles.radio}
            />
            <div className={styles.textContent}>
              <div className={styles.label}>{opt.label}</div>
              <div className={styles.description}>{opt.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
