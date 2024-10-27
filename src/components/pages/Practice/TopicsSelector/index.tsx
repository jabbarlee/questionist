import React from 'react';
import styles from './index.module.css';

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
          {topic}
        </div>
      ))}
    </div>
  );
}
