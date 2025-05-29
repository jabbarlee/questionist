"use client";

import React from "react";
import styles from "./index.module.css";
import { Checkbox, Typography } from "antd";
import { difficultyLevels } from "@/data/configData";

type DifficultySelectProps = {
  difficulty: string[] | null;
  setDifficulty: React.Dispatch<React.SetStateAction<string[] | null>>;
};

export default function DifficultySelect({
  difficulty,
  setDifficulty,
}: DifficultySelectProps) {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      setDifficulty([...(difficulty || []), value]);
    } else {
      setDifficulty((difficulty || []).filter((d) => d !== value));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Typography className={styles.title}>Difficulty</Typography>
      <div className={styles.cardGrid}>
        {difficultyLevels.map((level) => (
          <label
            key={level.difficulty}
            className={`${styles.card} ${
              difficulty?.includes(level.difficulty) ? styles.selected : ""
            }`}
          >
            <Checkbox
              checked={difficulty?.includes(level.difficulty)}
              onChange={(e) => handleChange(level.difficulty, e.target.checked)}
              className={styles.checkbox}
            />
            <div className={styles.textContent}>
              <div className={styles.label}>{level.difficulty}</div>
              <div className={styles.description}>{level.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
