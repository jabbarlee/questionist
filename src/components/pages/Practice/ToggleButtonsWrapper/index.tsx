import ToggleButton from '@/components/ui/ToggleButton';
import React from 'react';
import styles from './index.module.css';
import { ToggleButtonsWrapperProps } from './types';

export default function index({
  calculatorOption,
  difficultyOption,
  onCalculatorChange,
  onDifficultyChange,
}: ToggleButtonsWrapperProps) {
  return (
    <div className={styles.toggleButtonsWrapper}>
      <div className={styles.toggleButtonContainer}>
        <ToggleButton
          options={['No Calculator', 'Calculator']}
          value={calculatorOption}
          onChange={onCalculatorChange}
        />
      </div>
      <div className={styles.toggleButtonContainer}>
        <ToggleButton
          options={['Easy', 'Medium', 'Hard']}
          value={difficultyOption}
          onChange={onDifficultyChange}
        />
      </div>
    </div>
  );
}
