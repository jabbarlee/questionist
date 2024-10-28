import ToggleButton from '@/components/ui/ToggleButton';
import React from 'react';
import styles from './index.module.css';

interface IndexProps {
  calculatorOption: string;
  difficultyOption: string;
  onCalculatorChange: (option: string) => void;
  onDifficultyChange: (option: string) => void;
}

export default function Index({
  calculatorOption,
  difficultyOption,
  onCalculatorChange,
  onDifficultyChange,
}: IndexProps) {
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
