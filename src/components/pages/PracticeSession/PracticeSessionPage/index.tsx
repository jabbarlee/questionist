import React from 'react';
import Text from '@/components/ui/Text';
import styles from './index.module.css';
import QuestionsWrapper from '../QuestionsWrapper';

export default function PracticeSessionPage({
    sessionId
} : {
    sessionId: string
}) {
  return (
    <div className={styles.practiceSessionPage}>
        <div className={styles.questionsWrapperContainer}>
            <QuestionsWrapper sessionId={sessionId}/>
        </div>
    </div>
  );
}
