'use client';

import React from 'react';
import TopicsSelector from '../TopicsSelector';
import SubtopicsList from '../SubtopicsList';
import styles from './index.module.css';

interface TopicsWrapperProps {
  topicsData: { [key: string]: string[] };
  selectedTopic: string;
  selectedSubtopics: string[];
  onTopicSelect: (topic: string) => void;
  onSubtopicToggle: (subtopic: string) => void;
}

export default function TopicsWrapper({
  topicsData,
  selectedTopic,
  selectedSubtopics,
  onTopicSelect,
  onSubtopicToggle,
}: TopicsWrapperProps) {
  return (
    <div className={styles.wrapper}>
      <TopicsSelector
        topics={Object.keys(topicsData)}
        selectedTopic={selectedTopic}
        onSelect={onTopicSelect}
      />
      <SubtopicsList
        subtopics={topicsData[selectedTopic]}
        selectedSubtopics={selectedSubtopics}
        onToggle={onSubtopicToggle}
      />
    </div>
  );
}
