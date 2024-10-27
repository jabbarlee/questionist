"use client";

import React, { useState } from 'react';
import styles from './index.module.css';

interface ToggleButtonProps {
  options: string[];
  onChange?: (selectedOption: string) => void;
}

export default function ToggleButton({
  options,
  onChange,
}: ToggleButtonProps) {
  const [selected, setSelected] = useState<string>(options[0]);

  const handleClick = (option: string) => {
    setSelected(option);
    if (onChange) onChange(option);
  };

  return (
    <div className={styles.toggleContainer}>
      {options.map((option) => (
        <button
          key={option}
          className={`${styles.toggleButton} ${
            selected === option ? styles.active : ''
          }`}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
