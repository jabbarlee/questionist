import React from 'react';
import styles from './index.module.css';
import { ToggleButtonProps } from './types';

export default function ToggleButton({
  options,
  value,
  onChange,
}: ToggleButtonProps) {
  return (
    <div className={styles.toggleContainer}>
      {options.map((option) => (
        <button
          key={option}
          className={`${styles.toggleButton} ${
            value === option ? styles.active : ''
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
