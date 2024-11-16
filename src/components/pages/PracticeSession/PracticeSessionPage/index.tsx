import React from 'react';
import Text from '@/components/ui/Text';
import styles from './index.module.css';
import QuestionsWrapper from '../QuestionsWrapper';
import { PracticeSessionProps } from '../QuestionsWrapper/types';

export default function PracticeSessionPage({
    sessionId
} : PracticeSessionProps) {
  return (
    <div className={styles.pageWrapper}>
        <QuestionsWrapper sessionId={sessionId}/>
    </div>
  );
}
