'use client';

import React from 'react';
import TopicsSelector from '../TopicsSelector';
import SubtopicsList from '../SubtopicsList';
import styles from './index.module.css';

interface TopicsWrapperProps {
  topicsData: { topic: string; subtopics: string[] }[];
  selectedTopicIndex: number;
  selectedSubtopics: string[];
  onTopicSelect: (index: number) => void;
  onSubtopicToggle: (subtopic: string) => void;
}

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
