import ToggleButton from '@/components/ui/ToggleButton';
import React from 'react';
import styles from './index.module.css';

export default function Index() {
  return (
    <div className={styles.toggleButtonsWrapper}>
      <div className={styles.toggleButtonContainer}>
        <ToggleButton options={['No Calculator', 'Calculator']} />
      </div>
      <div className={styles.toggleButtonContainer}>
        <ToggleButton options={['Easy', 'Medium', 'Hard']} />
      </div>
    </div>
  );
}
