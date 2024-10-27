import React from 'react';
import styles from './index.module.css';
import Text from '@/components/ui/Text';

interface SubtopicsListProps {
  subtopics: string[];
  selectedSubtopics: string[];
  onToggle: (subtopic: string) => void;
}

export default function SubtopicsList({
  subtopics,
  selectedSubtopics,
  onToggle,
}: SubtopicsListProps) {
  return (
    <div className={styles.subtopicsList}>
      {subtopics.map((subtopic) => (
        <label key={subtopic} className={styles.subtopicItem}>
          <input
            type="checkbox"
            checked={selectedSubtopics.includes(subtopic)}
            onChange={() => onToggle(subtopic)}
          />
          <Text subheading={true}><span className={styles.subtopicText}>{subtopic}</span></Text>
        </label>
      ))}
    </div>
  );
}
