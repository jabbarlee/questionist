import React from 'react';
import styles from './index.module.css';
import Text from '@/components/ui/Text';

interface TopicsSelectorProps {
  topics: string[];
  selectedTopic: string;
  onSelect: (topic: string) => void;
}

export default function TopicsSelector({
  topics,
  selectedTopic,
  onSelect,
}: TopicsSelectorProps) {
  return (
    <div className={styles.topicsSelector}>
      {topics.map((topic) => (
        <div
          key={topic}
          className={`${styles.topicItem} ${
            selectedTopic === topic ? styles.active : ''
          }`}
          onClick={() => onSelect(topic)}
        > 
          <Text><span className={styles.topicText}>{topic}</span></Text>
        </div>
      ))}
    </div>
  );
}
