'use client';

import React from 'react';
import TopicsSelector from '../TopicsSelector';
import SubtopicsList from '../SubtopicsList';
import styles from './index.module.css';
import { TopicsWrapperProps } from './types';

export default function TopicsWrapper({
  topicsData,
  selectedTopicIndex,
  selectedSubtopics,
  onTopicSelect,
  onSubtopicToggle,
}: TopicsWrapperProps) {
  return (
    <div className={styles.wrapper}>
      <TopicsSelector
        topics={topicsData.map((topic) => topic.topic)}
        selectedTopicIndex={selectedTopicIndex}
        onSelect={onTopicSelect}
      />
      <SubtopicsList
        subtopics={topicsData[selectedTopicIndex].subtopics}
        selectedSubtopics={selectedSubtopics}
        onToggle={onSubtopicToggle}
      />
    </div>
  );
}
