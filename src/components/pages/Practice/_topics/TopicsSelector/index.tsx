import React from 'react';
import styles from './index.module.css';
import Text from '@/components/ui/Text';
import { TopicsSelectorProps } from './types';

export default function TopicsSelector({
  topics,
  selectedTopicIndex,
  onSelect,
} : TopicsSelectorProps) {
  return (
    <div className={styles.topicsSelector}>
      {topics.map((topic, index) => (
        <div
          key={topic}
          className={`${styles.topicItem} ${
            selectedTopicIndex === index ? styles.active : ''
          }`}
          onClick={() => {
            onSelect(index);
          }}
        >
          <Text>
            <span className={styles.topicText}>{topic}</span>
          </Text>
        </div>
      ))}
    </div>
  );
}
